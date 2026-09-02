"use client";

import { useState, type FormEvent } from "react";
import { links } from "@/components/ContactDock";
import { CITIES, SERVICES } from "@/data/seo";
import { leadErrorMessage, submitLead, trackEvent } from "@/lib/leads";

const TIMELINES = [
  "As soon as possible",
  "Within a month",
  "1 to 3 months",
  "Just getting quotes",
];

type Props = {
  /** Prefill from a city or service page. */
  city?: string;
  service?: string;
  /** Where on the site this form lives, for tracking. */
  source?: string;
  heading?: string;
  sub?: string;
};

export function LeadForm({
  city,
  service,
  source = "form",
  heading = "Get a written quote",
  sub = "Tell us what is going on with the roof or the panels. You get a real answer, not a sales call.",
}: Props) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");
  const [started, setStarted] = useState(false);

  const onFocus = () => {
    if (started) return;
    setStarted(true);
    trackEvent("form_start", { channel: "form", label: source, city, service });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    // Honeypot: bots fill every field, people never see this one.
    if (String(fd.get("company") ?? "").trim()) {
      setState("done");
      setReference("OK");
      return;
    }
    setState("sending");
    setError("");
    try {
      const r = await submitLead({
        full_name: String(fd.get("full_name") ?? ""),
        phone: String(fd.get("phone") ?? ""),
        email: String(fd.get("email") ?? "") || null,
        city: String(fd.get("city") ?? "") || null,
        service: String(fd.get("service") ?? "") || null,
        timeline: String(fd.get("timeline") ?? "") || null,
        project_details: String(fd.get("project_details") ?? "") || null,
      });
      setReference(r.reference);
      setState("done");
    } catch (err) {
      setError(leadErrorMessage(err, links.emailDisplay));
      setState("error");
    }
  };

  if (state === "done") {
    return (
      <div className="rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-8">
        <p className="eyebrow">Received</p>
        <h3 className="mt-3 text-2xl font-extrabold text-navy">Got it. We will be in touch.</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Your request is on file{reference ? ` (reference ${reference})` : ""}. If it is urgent,
          email{" "}
          <a href={links.email} className="font-semibold text-navy underline">
            {links.emailDisplay}
          </a>
          .
        </p>
      </div>
    );
  }

  const field =
    "mt-1.5 w-full rounded-xl border border-line bg-white px-3.5 py-3 text-base text-navy outline-none transition focus:border-orange focus:ring-4 focus:ring-orange/20";
  const label = "block text-sm font-semibold text-navy";

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-line bg-white p-5 shadow-sm sm:p-8"
      noValidate
    >
      <p className="eyebrow">Free quote</p>
      <h3 className="mt-3 text-2xl font-extrabold text-navy">{heading}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{sub}</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className={label}>
          Your name
          <input
            name="full_name"
            required
            autoComplete="name"
            className={field}
            onFocus={onFocus}
            placeholder="First and last name"
          />
        </label>
        <label className={label}>
          Phone
          <input
            name="phone"
            required
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            className={field}
            onFocus={onFocus}
            placeholder="(305) 555-0100"
          />
        </label>
        <label className={label}>
          Email <span className="font-normal text-muted-foreground">(optional)</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            className={field}
            onFocus={onFocus}
            placeholder="you@example.com"
          />
        </label>
        <label className={label}>
          City
          <select name="city" defaultValue={city ?? ""} className={field} onFocus={onFocus}>
            <option value="">Choose your city</option>
            {CITIES.map((c) => (
              <option key={c.slug} value={c.name}>
                {c.name}
              </option>
            ))}
            <option value="Other Florida city">Other Florida city</option>
          </select>
        </label>
        <label className={label}>
          What do you need?
          <select name="service" defaultValue={service ?? ""} className={field} onFocus={onFocus}>
            <option value="">Choose one</option>
            {SERVICES.map((s) => (
              <option key={s.slug} value={s.name}>
                {s.name}
              </option>
            ))}
            <option value="Not sure yet">Not sure yet</option>
          </select>
        </label>
        <label className={label}>
          When?
          <select name="timeline" defaultValue="" className={field} onFocus={onFocus}>
            <option value="">Choose one</option>
            {TIMELINES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
        <label className={`${label} sm:col-span-2`}>
          Details <span className="font-normal text-muted-foreground">(optional)</span>
          <textarea
            name="project_details"
            rows={4}
            className={field}
            onFocus={onFocus}
            placeholder="Roughly how many panels, who installed them, what is happening, and whether a roofer is already booked."
          />
        </label>
        <div className="hidden" aria-hidden>
          <label>
            Company
            <input name="company" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
      </div>

      {state === "error" && (
        <p role="alert" className="mt-4 rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={state === "sending"}
        className="btn-base btn-primary mt-6 w-full disabled:opacity-60 sm:w-auto"
      >
        {state === "sending" ? "Sending..." : "Send My Quote Request"}
      </button>
      <p className="mt-3 text-xs text-muted-foreground">
        No obligation. We only use this to reply about your solar system.
      </p>
    </form>
  );
}
