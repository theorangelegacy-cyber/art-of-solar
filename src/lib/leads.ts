/**
 * Lead capture and contact-tap tracking for Art of Solar.
 *
 * Two public endpoints, both Postgres functions. The site has no direct
 * access to either table:
 *
 *   submitLead()   -> submit_sevbo_lead()   writes a row to sevbo_leads
 *   trackEvent()   -> track_sevbo_event()   writes a row to sevbo_events
 *
 * The publishable key below can call those two functions and nothing else.
 * It cannot read, edit or delete a lead, and it reaches no other table.
 *
 * Schema: supabase/migrations/20260901_sevbo_leads.sql
 */

// Written with bracket access so Vite statically replaces them.
// The fallbacks mean everything works with no .env configured at all.
const SUPABASE_URL =
  import.meta.env["VITE_SUPABASE_URL"] || "https://isghtmwaxyocvxorprhw.supabase.co";
const SUPABASE_KEY =
  import.meta.env["VITE_SUPABASE_PUBLISHABLE_KEY"] ||
  "sb_publishable_shnRYTdCfZpev1ntRI2olA_QnL1NHiZ";

function rpcUrl(fn: string) {
  return `${SUPABASE_URL}/rest/v1/rpc/${fn}`;
}

function headers() {
  return {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    "Content-Type": "application/json",
  };
}

/* ------------------------------------------------------------------ */
/* attribution                                                         */
/* ------------------------------------------------------------------ */

/** One id per browser tab, so we can tell 20 taps from 20 people. */
function sessionId(): string {
  if (typeof window === "undefined") return "";
  try {
    const KEY = "sevbo_sid";
    let id = window.sessionStorage.getItem(KEY);
    if (!id) {
      id =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      window.sessionStorage.setItem(KEY, id);
    }
    return id;
  } catch {
    return "";
  }
}

function attribution() {
  if (typeof window === "undefined") return {};
  const q = new URLSearchParams(window.location.search);
  return {
    page_path: window.location.pathname.slice(0, 400),
    page_url: window.location.href.slice(0, 800),
    referrer: document.referrer.slice(0, 800) || null,
    utm_source: q.get("utm_source"),
    utm_medium: q.get("utm_medium"),
    utm_campaign: q.get("utm_campaign"),
    gclid: q.get("gclid"),
    user_agent: navigator.userAgent.slice(0, 500),
    session_id: sessionId(),
  };
}

/* ------------------------------------------------------------------ */
/* event tracking                                                      */
/* ------------------------------------------------------------------ */

export type SevboEvent =
  | "page_view"
  | "form_start"
  | "form_submit"
  | "call_click"
  | "text_click"
  | "whatsapp_click"
  | "email_click"
  | "quote_click";

/**
 * Records one interaction. Never throws and never blocks: a tap on Call
 * must open the dialler whether or not this request succeeds.
 */
export function trackEvent(
  event: SevboEvent,
  extra: {
    channel?: string;
    label?: string;
    city?: string | undefined;
    service?: string | undefined;
  } = {},
): void {
  if (typeof window === "undefined") return;

  const payload = { event, ...extra, ...attribution() };
  const body = JSON.stringify({ payload });

  try {
    void fetch(rpcUrl("track_sevbo_event"), {
      method: "POST",
      headers: headers(),
      body,
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* tracking is never allowed to break the page */
  }

  // Mirror into Google Analytics / Ads / Meta if any of them are installed later.
  const w = window as unknown as Record<string, ((...a: unknown[]) => void) | undefined>;
  w["gtag"]?.("event", event, { event_category: "contact", ...extra });
  if (event === "form_submit") w["fbq"]?.("track", "Lead");
}

/* ------------------------------------------------------------------ */
/* lead submission                                                     */
/* ------------------------------------------------------------------ */

export type LeadInput = {
  full_name: string;
  phone: string;
  email?: string | null;
  city?: string | null;
  service?: string | null;
  timeline?: string | null;
  project_details?: string | null;
};

export type LeadResult = { ok: true; reference: string };

/**
 * Saves one lead. Throws on failure so the caller can show the email
 * instead of silently losing the enquiry.
 */
export async function submitLead(input: LeadInput): Promise<LeadResult> {
  const payload = { ...input, ...attribution() };

  const res = await fetch(rpcUrl("submit_sevbo_lead"), {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ payload }),
  });

  const body = await res.json().catch(() => null);
  if (!res.ok) throw new Error(body?.message ?? `HTTP ${res.status}`);

  trackEvent("form_submit", {
    channel: "form",
    city: input.city ?? undefined,
    service: input.service ?? undefined,
  });
  return body as LeadResult;
}

/** Turns a thrown submitLead error into something a homeowner can act on. */
export function leadErrorMessage(err: unknown, email: string): string {
  const m = String((err as Error)?.message ?? "");
  if (m.includes("rate_limited"))
    return `We already have a few requests from this connection. Please email ${email} and we will take it from there.`;
  if (m.includes("phone_invalid"))
    return "That phone number does not look complete. Please check it and try again.";
  return `That did not send. Please email ${email} and we will take the details directly.`;
}

/* ------------------------------------------------------------------ */
/* private inbox reads (token required, never used on public pages)    */
/* ------------------------------------------------------------------ */

export type LeadRow = {
  id: string;
  created_at: string;
  full_name: string;
  phone: string;
  email: string | null;
  city: string | null;
  service: string | null;
  timeline: string | null;
  project_details: string | null;
  page_url: string | null;
  utm_source: string | null;
  status: string;
};

export async function fetchRecentLeads(token: string, limit = 100): Promise<LeadRow[]> {
  const res = await fetch(rpcUrl("sevbo_recent_leads"), {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ p_token: token, p_limit: limit }),
  });
  const body = await res.json().catch(() => null);
  if (!res.ok) throw new Error(body?.message ?? `HTTP ${res.status}`);
  return body as LeadRow[];
}
