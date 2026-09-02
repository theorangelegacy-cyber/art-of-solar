import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { fetchRecentLeads, type LeadRow } from "@/lib/leads";

/**
 * Private lead inbox. Not linked from anywhere, hidden from search engines,
 * and useless without the admin token. The token is only ever stored in
 * this browser.
 */
export const Route = createFileRoute("/leads")({
  ssr: false,
  head: () => ({
    meta: [{ title: "Leads | Art of Solar" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: LeadsPage,
});

const KEY = "sevbo_admin_token";

function LeadsPage() {
  const [token, setToken] = useState("");
  const [rows, setRows] = useState<LeadRow[] | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(KEY);
      if (saved) {
        setToken(saved);
        void load(saved);
      }
    } catch {
      /* private mode */
    }
  }, []);

  async function load(t: string) {
    setBusy(true);
    setError("");
    try {
      const data = await fetchRecentLeads(t, 200);
      setRows(data);
      try {
        window.localStorage.setItem(KEY, t);
      } catch {
        /* ignore */
      }
    } catch (e) {
      setRows(null);
      setError(String((e as Error).message ?? e).includes("unauthorized") ? "That key is not right." : "Could not load leads.");
    } finally {
      setBusy(false);
    }
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void load(token.trim());
  };

  const signOut = () => {
    try {
      window.localStorage.removeItem(KEY);
    } catch {
      /* ignore */
    }
    setRows(null);
    setToken("");
  };

  return (
    <main className="min-h-screen bg-steel px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-extrabold text-navy">Art of Solar leads</h1>
          {rows && (
            <div className="flex gap-2">
              <button onClick={() => void load(token)} className="btn-base btn-navy px-4 py-2 text-sm">
                Refresh
              </button>
              <button onClick={signOut} className="btn-base btn-ghost px-4 py-2 text-sm">
                Sign out
              </button>
            </div>
          )}
        </div>

        {!rows && (
          <form onSubmit={onSubmit} className="mt-6 max-w-md rounded-3xl border border-line bg-white p-6">
            <label className="block text-sm font-semibold text-navy">
              Inbox key
              <input
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-line px-3.5 py-3 text-base outline-none focus:border-orange focus:ring-4 focus:ring-orange/20"
                autoComplete="off"
              />
            </label>
            {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
            <button disabled={busy} className="btn-base btn-primary mt-4 w-full">
              {busy ? "Opening..." : "Open inbox"}
            </button>
          </form>
        )}

        {rows && rows.length === 0 && (
          <p className="mt-6 text-sm text-muted-foreground">No leads yet.</p>
        )}

        {rows && rows.length > 0 && (
          <div className="mt-6 grid gap-3">
            {rows.map((r) => (
              <article key={r.id} className="rounded-2xl border border-line bg-white p-4 sm:p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="text-lg font-extrabold text-navy">{r.full_name}</h2>
                  <time className="text-xs text-muted-foreground">
                    {new Date(r.created_at).toLocaleString("en-US", { timeZone: "America/New_York" })}
                  </time>
                </div>
                <p className="mt-1 text-sm">
                  <a href={`tel:${r.phone}`} className="font-semibold text-sky underline">
                    {r.phone}
                  </a>
                  {r.email && (
                    <>
                      {" · "}
                      <a href={`mailto:${r.email}`} className="font-semibold text-sky underline">
                        {r.email}
                      </a>
                    </>
                  )}
                </p>
                <p className="mt-1 text-sm text-navy">
                  {[r.city, r.service, r.timeline].filter(Boolean).join(" · ")}
                </p>
                {r.project_details && (
                  <p className="mt-2 rounded-xl bg-steel p-3 text-sm whitespace-pre-wrap text-navy">
                    {r.project_details}
                  </p>
                )}
                <p className="mt-2 text-xs text-muted-foreground">
                  From {r.page_url ?? "unknown page"}
                  {r.utm_source ? ` · ${r.utm_source}` : ""}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
