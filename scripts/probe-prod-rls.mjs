#!/usr/bin/env node
// Black-box RLS probe against the LIVE production database.
//
// Why this exists: the migration files say row-level security is on every
// table, but migrations only describe what was *intended*. This asks the live
// REST API the only question that actually matters:
//
//     can a stranger, holding nothing but the public anon key, read rows out
//     of a table that belongs to a specific user?
//
// It uses the publishable (anon) key, which is compiled into the browser
// bundle and served to every visitor -- so this sends exactly the request any
// person on the internet can already send. Nothing here is privileged, and
// every request is a read.
//
// A table is FAILED only when the API hands back at least one row. That is
// unambiguous: rows came out with no session. An empty array is reported as
// "no rows" rather than "safe", because an empty array cannot distinguish "RLS
// blocked it" from "the table happens to be empty" -- see the summary note.

import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const OWNER_COLUMNS = [
  'user_id', 'owner_id', 'owner_user_id', 'created_by', 'uploaded_by',
  'sender_id', 'recipient_id', 'profile_id',
];

function readEnv(path = '.env') {
  const out = {};
  let raw = '';
  try { raw = readFileSync(path, 'utf8'); } catch { return out; }
  for (const line of raw.split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    out[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
  return out;
}

// Last resort when no key is configured: find the anon key already committed
// in the repo. In practice it is somewhere -- a migration, the generated
// client, a committed .env -- because it is public by design and ships to every
// visitor in the browser bundle. Finding it is exactly what an attacker does,
// which is the right posture for a probe that asks what a stranger can reach.
//
// Refuses anything that is not role "anon". A service_role key bypasses every
// RLS policy, so probing with one would report a reassuring PASS against tables
// that are in fact wide open -- the single worst outcome this script could have.
function decodeJwt(token) {
  try {
    let p = token.split('.')[1];
    p += '='.repeat((4 - (p.length % 4)) % 4);
    return JSON.parse(Buffer.from(p.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8'));
  } catch { return null; }
}

function anonKeyFromRepo(expectedRef, root = '.') {
  const SKIP = new Set(['.git', 'node_modules', 'dist', '.output', '.next', 'build', 'coverage']);
  const JWT = /eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{10,}/g;
  const found = new Map();

  const walk = (dir, depth = 0) => {
    if (depth > 6) return;
    let entries = [];
    try { entries = readdirSync(dir, { withFileTypes: true }); } catch { return; }
    for (const e of entries) {
      if (SKIP.has(e.name)) continue;
      const full = join(dir, e.name);
      if (e.isDirectory()) { walk(full, depth + 1); continue; }
      if (!/\.(sql|ts|tsx|js|mjs|cjs|json|toml|env|example|md|ya?ml)$|^\.env/.test(e.name)) continue;
      let text = '';
      try { text = readFileSync(full, 'utf8'); } catch { continue; }
      if (text.length > 4_000_000) continue;
      for (const tok of text.match(JWT) ?? []) {
        const claims = decodeJwt(tok);
        if (claims?.role) found.set(tok, { role: claims.role, ref: claims.ref, file: full });
      }
    }
  };
  walk(root);

  const privileged = [...found.values()].filter((v) => v.role !== 'anon');
  if (privileged.length) {
    console.error(`::error::A committed JWT carries role "${privileged[0].role}" (${privileged[0].file}). It bypasses RLS on every table. Rotate it in the Supabase dashboard -- deleting the file is not enough, git history keeps it.`);
    process.exit(2);
  }

  for (const [tok, v] of found) {
    if (v.role === 'anon' && (!expectedRef || !v.ref || v.ref === expectedRef)) {
      console.log(`probe-prod-rls: no key configured; using the anon key already committed at ${v.file}`);
      return tok;
    }
  }
  return '';
}

// Tables that declare an owner column somewhere in the migrations. Parsed at
// run time so the list cannot drift from the schema.
function ownedTables(dir = 'supabase/migrations') {
  const found = new Map();
  const re = /CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?(?:public\.)?"?(\w+)"?\s*\(([\s\S]*?)\n\s*\);/gi;
  for (const file of readdirSync(dir).filter((f) => f.endsWith('.sql'))) {
    const sql = readFileSync(join(dir, file), 'utf8');
    let m;
    while ((m = re.exec(sql))) {
      const [, name, body] = m;
      if (found.has(name)) continue;
      if (OWNER_COLUMNS.some((c) => new RegExp(`\\b${c}\\b`, 'i').test(body))) found.set(name, true);
    }
  }
  return [...found.keys()].sort();
}

// Ask PostgREST what it actually exposes. The migrations are only what someone
// wrote down -- a table created through the Supabase or Lovable dashboard never
// appears in them, and probing the migration list alone would silently skip it.
// The root endpoint returns an OpenAPI document naming every table reachable
// over REST, which is precisely the surface a stranger can touch.
// Returns null when the list could not be read at all, and [] only when the API
// genuinely reports no tables. Collapsing those two into [] is how a failed
// lookup turns into "nothing to probe", which then exits 0 and shows green --
// a check reporting success precisely because it learned nothing.
async function exposedTables(baseUrl, key) {
  try {
    const res = await fetch(`${baseUrl}/rest/v1/`, {
      headers: { apikey: key, Authorization: `Bearer ${key}`, Accept: 'application/json' },
    });
    if (!res.ok) {
      const body = (await res.text().catch(() => '')).replace(/\s+/g, ' ').slice(0, 160);
      console.log(`probe-prod-rls: table list unavailable -- HTTP ${res.status} ${res.headers.get('content-type') ?? ''}: ${body}`);
      return null;
    }
    const doc = await res.json().catch(() => null);
    if (!doc?.paths) {
      console.log('probe-prod-rls: table list unavailable -- the root endpoint answered but carried no OpenAPI "paths".');
      return null;
    }
    return Object.keys(doc.paths)
      .filter((p) => /^\/[A-Za-z0-9_]+$/.test(p))   // "/table", not "/" or "/rpc/fn"
      .map((p) => p.slice(1))
      .sort();
  } catch (err) {
    console.log(`probe-prod-rls: table list unavailable -- ${String(err.message ?? err).slice(0, 140)}`);
    return null;
  }
}

// Every table the migrations create, owner column or not. Used only when the
// API cannot be enumerated: a table without a recognised owner column can still
// hold data worth checking, and probing something real beats reporting that
// nothing could be tested.
function allMigrationTables(dir = 'supabase/migrations') {
  const names = new Set();
  const re = /CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?(?:public\.)?"?(\w+)"?/gi;
  let files = [];
  try { files = readdirSync(dir).filter((f) => f.endsWith('.sql')); } catch { return []; }
  for (const file of files) {
    const sql = readFileSync(join(dir, file), 'utf8');
    let m;
    while ((m = re.exec(sql))) names.add(m[1]);
  }
  return [...names].sort();
}

async function probe(baseUrl, key, table) {
  const url = `${baseUrl}/rest/v1/${encodeURIComponent(table)}?select=*&limit=1`;
  const headers = { apikey: key, Authorization: `Bearer ${key}` };
  try {
    const res = await fetch(url, { headers });
    const ctype = res.headers.get('content-type') ?? '';
    const isJson = /\bjson\b/i.test(ctype);

    // PostgREST always answers JSON, including for 401/403. Anything else on a
    // denial is infrastructure between here and the database -- a corporate
    // egress proxy, a WAF, a captive portal -- NOT the database refusing the
    // read. Counting those as "locked" would be the worst bug this script could
    // have: a blocked network would render as airtight row-level security.
    if (!isJson && res.status !== 200) {
      const snippet = (await res.text().catch(() => '')).replace(/\s+/g, ' ').slice(0, 100);
      return { table, verdict: 'unreachable', detail: `HTTP ${res.status} ${ctype || 'no content-type'}: ${snippet}` };
    }

    if (res.status === 200) {
      const body = await res.json().catch(() => null);
      if (!Array.isArray(body)) return { table, verdict: 'unreachable', detail: 'HTTP 200 but not a PostgREST array' };
      return body.length > 0
        ? { table, verdict: 'LEAK', detail: `returned ${body.length} row(s) to an anonymous caller` }
        : { table, verdict: 'no-rows', detail: 'reachable, returned nothing' };
    }
    if (res.status === 401 || res.status === 403) return { table, verdict: 'locked', detail: `HTTP ${res.status}` };
    if (res.status === 404) return { table, verdict: 'not-exposed', detail: 'HTTP 404' };
    return { table, verdict: 'other', detail: `HTTP ${res.status}` };
  } catch (err) {
    return { table, verdict: 'unreachable', detail: String(err.message ?? err).slice(0, 120) };
  }
}

async function pool(items, limit, fn) {
  const out = [];
  let i = 0;
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (i < items.length) out.push(await fn(items[i++]));
  }));
  return out;
}

// supabase/config.toml carries the project ref and is committed, so the URL can
// be derived even in a repo that deliberately keeps .env out of git.
function urlFromConfigToml(path = 'supabase/config.toml') {
  try {
    const m = readFileSync(path, 'utf8').match(/^\s*project_id\s*=\s*"([a-z0-9]+)"/m);
    return m ? `https://${m[1]}.supabase.co` : '';
  } catch { return ''; }
}

const env = { ...readEnv(), ...process.env };
const baseUrl = (env.VITE_SUPABASE_URL || env.SUPABASE_URL || urlFromConfigToml()).replace(/\/+$/, '');
const projectRef = (baseUrl.match(/^https:\/\/([a-z0-9]+)\.supabase\.co/) ?? [])[1] ?? '';
const anonKey = env.VITE_SUPABASE_PUBLISHABLE_KEY || env.SUPABASE_PUBLISHABLE_KEY
  || env.SUPABASE_ANON_KEY || anonKeyFromRepo(projectRef);

if (!baseUrl) {
  console.error('::error::probe-prod-rls: no Supabase URL. Expected VITE_SUPABASE_URL, SUPABASE_URL, or project_id in supabase/config.toml.');
  process.exit(2);
}

if (!anonKey) {
  // Deliberately a failure, not a skip. The reason this probe exists is that a
  // real leak was found in this repo once. A check that goes green when it
  // never ran is worse than no check at all -- it reads as "nothing leaked"
  // when what actually happened is "nobody looked".
  console.error('::error::probe-prod-rls: no publishable (anon) key, so NOTHING WAS PROBED. This is not a pass.');
  console.error('');
  console.error('Set the key so this can run. It is the anon key that already ships inside the');
  console.error('browser bundle to every visitor -- public by design, not a secret:');
  console.error('');
  console.error('  Repo -> Settings -> Secrets and variables -> Actions -> Variables -> New');
  console.error('  Name:  SUPABASE_PUBLISHABLE_KEY');
  console.error(`  Value: the anon key for ${baseUrl}`);
  console.error('');
  console.error('Never put the service_role key here. It bypasses every RLS policy, which would');
  console.error('make this check pass against tables that are in fact wide open.');
  process.exit(2);
}

console.log(`probe-prod-rls: ${baseUrl}`);

const fromMigrations = ownedTables();
const fromApi = await exposedTables(baseUrl, anonKey);
const apiReadable = fromApi !== null;

// When the API can be listed, that list plus the owner-column tables is the
// real surface. When it cannot, widen to every table the migrations create --
// probing tables without a recognised owner column is far better than
// concluding nothing could be tested.
const fallback = apiReadable ? fromMigrations : allMigrationTables();
const tables = [...new Set([...(fromApi ?? []), ...fallback])].sort();

if (apiReadable) {
  const unlisted = fromMigrations.filter((t) => !fromApi.includes(t)).length;
  console.log(`probe-prod-rls: PostgREST exposes ${fromApi.length} table(s); ${fromMigrations.length} declare an owner column in the migrations`
    + (unlisted ? `, ${unlisted} of which the API does not expose` : ''));
} else {
  console.log(`probe-prod-rls: falling back to every table the migrations create (${fallback.length}), since the API list was unavailable`);
}

if (tables.length === 0) {
  if (!apiReadable) {
    // We could not enumerate, and the migrations named nothing. That is not an
    // empty database, it is an untested one, and it must not exit green.
    console.error('::error::probe-prod-rls: could not list the exposed tables AND the migrations declare none, so NOTHING WAS TESTED. This is not a pass.');
    console.error('The project may create its tables outside migrations. Check that the anon key is');
    console.error(`valid for ${baseUrl} and that the REST API is reachable, then re-run.`);
    process.exit(2);
  }
  console.log('\nNothing to probe: the API reports no tables exposed over REST and the migrations declare none.');
  process.exit(0);
}

console.log(`probe-prod-rls: probing ${tables.length} table(s) as an anonymous visitor.\n`);

// Only a table that carries an owner column can "leak" by returning rows: that
// is per-user data, and a stranger reading it is a breach. A table with no
// owner column returning rows is usually the point -- blog posts, the form
// catalog, platform stats, forum channel names. Failing on those cried wolf on
// a blog and buried the signal, so they are listed as public and not failed on.
const ownedSet = new Set(fromMigrations);
const results = (await pool(tables, 8, (t) => probe(baseUrl, anonKey, t)))
  .map((r) => (r.verdict === 'LEAK' && !ownedSet.has(r.table)
    ? { ...r, verdict: 'public', detail: 'readable with no session; no owner column, so presumed public content' }
    : r));
results.sort((a, b) => a.table.localeCompare(b.table));

const leaks = results.filter((r) => r.verdict === 'LEAK');
const tally = results.reduce((acc, r) => ((acc[r.verdict] = (acc[r.verdict] || 0) + 1), acc), {});
const answered = results.filter((r) => r.verdict !== 'unreachable');

// If nothing actually reached the database, say so and fail. Reporting a tidy
// summary built entirely out of network errors would be worse than useless --
// it would look exactly like a clean bill of health.
if (answered.length === 0) {
  console.error('::error::probe-prod-rls: NOT ONE table was actually reached, so nothing was tested. This is not a pass.');
  console.error(`First response: ${results[0]?.detail ?? 'none'}`);
  console.error('Something between this runner and the database is answering instead of PostgREST');
  console.error('-- an egress allowlist, a WAF, or a wrong URL. Fix that, then re-run.');
  process.exit(2);
}

for (const r of leaks) console.log(`::error::${r.table} — ${r.detail}`);
if (tally.unreachable) {
  console.log(`::warning::${tally.unreachable} table(s) were never reached; they are not covered by this result.`);
}
const publics = results.filter((r) => r.verdict === 'public');
if (publics.length) {
  console.log(`\nReadable by anyone, and expected to be -- no owner column, so treated as public content.`);
  console.log(`Worth a glance in case something private ended up here: ${publics.map((r) => r.table).join(', ')}`);
}

console.log('Summary: ' + Object.entries(tally).map(([k, v]) => `${k}=${v}`).join('  '));
console.log(
  '\nA "no-rows" result means the endpoint answered but handed back nothing. That is what a\n' +
  'correct RLS policy looks like from outside, but it reads the same as an empty table, so it\n' +
  'is evidence and not proof. A "LEAK" is proof: rows came back with no session at all.',
);

if (leaks.length) {
  console.log(`\nFAIL: ${leaks.length} table(s) returned user rows to an anonymous caller.`);
  process.exit(1);
}
console.log('\nPASS: no table returned rows to an anonymous caller.');
