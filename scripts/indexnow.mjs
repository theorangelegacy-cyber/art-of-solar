/**
 * Tell Bing (and Yandex, Seznam, Naver) about every page on the site, right now.
 *
 * Google has no equivalent: its only free push button is Search Console, which
 * needs a signed-in Google account. IndexNow needs nothing but a key file that
 * lives in public/, so this can run on its own after any deploy.
 *
 *   node scripts/indexnow.mjs            submit every url in the sitemap
 *   node scripts/indexnow.mjs /a /b      submit just those paths
 *
 * The key file must stay in public/ or the whole thing is rejected.
 */

const HOST = "theartofsolar.com";
const KEY = "910f1cb1a5115ebba5acc10a0a531f70";
const SITE = `https://${HOST}`;

async function urlsFromSitemap() {
  const res = await fetch(`${SITE}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap returned ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const args = process.argv.slice(2);
const urlList = args.length
  ? args.map((p) => (p.startsWith("http") ? p : `${SITE}${p.startsWith("/") ? p : `/${p}`}`))
  : await urlsFromSitemap();

if (!urlList.length) {
  console.error("nothing to submit");
  process.exit(1);
}

// IndexNow takes up to 10,000 per call, but keep batches small and readable.
const BATCH = 100;
let sent = 0;

for (let i = 0; i < urlList.length; i += BATCH) {
  const urlBatch = urlList.slice(i, i + BATCH);
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: `${SITE}/${KEY}.txt`,
      urlList: urlBatch,
    }),
  });
  const body = await res.text();
  console.log(`batch ${i / BATCH + 1}: ${res.status} ${res.statusText} ${body.slice(0, 120)}`);
  if (res.status === 200 || res.status === 202) sent += urlBatch.length;
}

console.log(`\naccepted ${sent} of ${urlList.length} urls`);
