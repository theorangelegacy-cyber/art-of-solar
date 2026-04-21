import { ReactNode } from "react";

/* =============================================================
   HUD primitives — corner brackets, instrument readouts, callouts.
   These are the "team of ten thousand IQ nerds" details.
   ============================================================= */

/** Corner brackets that frame any boxed element. */
export function CornerFrame({
  children,
  className = "",
  size = 14,
  color = "hsl(var(--border-bright))",
  thickness = 1,
}: {
  children: ReactNode;
  className?: string;
  size?: number;
  color?: string;
  thickness?: number;
}) {
  const s = `${size}px`;
  const t = `${thickness}px`;
  return (
    <div className={`relative ${className}`}>
      {children}
      <span aria-hidden className="pointer-events-none absolute" style={{ top: 0, left: 0, width: s, height: s, borderTop: `${t} solid ${color}`, borderLeft: `${t} solid ${color}` }} />
      <span aria-hidden className="pointer-events-none absolute" style={{ top: 0, right: 0, width: s, height: s, borderTop: `${t} solid ${color}`, borderRight: `${t} solid ${color}` }} />
      <span aria-hidden className="pointer-events-none absolute" style={{ bottom: 0, left: 0, width: s, height: s, borderBottom: `${t} solid ${color}`, borderLeft: `${t} solid ${color}` }} />
      <span aria-hidden className="pointer-events-none absolute" style={{ bottom: 0, right: 0, width: s, height: s, borderBottom: `${t} solid ${color}`, borderRight: `${t} solid ${color}` }} />
    </div>
  );
}

/** Tiny telemetry-style key/value — used in HUDs and footers. */
export function Readout({
  k,
  v,
  status,
  className = "",
}: {
  k: string;
  v: ReactNode;
  status?: "ok" | "warn" | "active";
  className?: string;
}) {
  const dotColor =
    status === "warn" ? "bg-primary" :
    status === "active" ? "bg-accent animate-ticker" :
    "bg-accent/80";
  return (
    <div className={`flex items-center gap-2 font-mono text-2xs tracking-mono uppercase ${className}`}>
      {status && <span className={`h-1.5 w-1.5 rounded-full ${dotColor}`} />}
      <span className="text-muted-foreground">{k}</span>
      <span className="text-foreground/90">{v}</span>
    </div>
  );
}

/** A label that sits at one end of an SVG leader line, calling out a part of an image. */
export function Callout({
  label,
  value,
  align = "left",
  className = "",
}: {
  label: string;
  value?: string;
  align?: "left" | "right";
  className?: string;
}) {
  return (
    <div className={`pointer-events-none ${className}`}>
      <div className={`font-mono text-2xs tracking-mono uppercase leading-tight ${align === "right" ? "text-right" : ""}`}>
        <div className="text-accent">{label}</div>
        {value && <div className="text-muted-foreground mt-0.5">{value}</div>}
      </div>
    </div>
  );
}

/** Section heading with index, title, and optional kicker. Used everywhere for rhythm. */
export function SectionHead({
  index,
  kicker,
  title,
  desc,
  align = "left",
  className = "",
}: {
  index: string;
  kicker?: string;
  title: ReactNode;
  desc?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={`${align === "center" ? "text-center mx-auto" : ""} max-w-3xl ${className}`}>
      <div className={`flex items-center gap-3 ${align === "center" ? "justify-center" : ""} font-mono text-2xs tracking-mono uppercase text-accent mb-5`}>
        <span className="text-muted-foreground">§ {index}</span>
        <span className="h-px w-8 bg-accent/50" />
        {kicker && <span>{kicker}</span>}
      </div>
      <h2 className="font-display text-3xl md:text-5xl text-foreground leading-[1.02]">
        {title}
      </h2>
      {desc && <p className="mt-4 text-foreground-dim text-base md:text-lg max-w-2xl">{desc}</p>}
    </div>
  );
}

/** Numeric stat with mono caption, used in proof bands. */
export function Stat({ value, label, sub }: { value: string; label: string; sub?: string }) {
  return (
    <div>
      <div className="font-display text-4xl md:text-5xl text-foreground tracking-tight">{value}</div>
      <div className="mt-2 font-mono text-2xs tracking-mono uppercase text-muted-foreground">{label}</div>
      {sub && <div className="mt-1 font-mono text-2xs tracking-mono-tight text-foreground-dim/70">{sub}</div>}
    </div>
  );
}

/** Telemetry strip — a row of pulsing readouts, often placed top of a section. */
export function TelemetryStrip({ items }: { items: { k: string; v: string }[] }) {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-2xs tracking-mono uppercase text-muted-foreground">
      {items.map((it, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="h-1 w-1 rounded-full bg-accent animate-ticker" style={{ animationDelay: `${i * 0.18}s` }} />
          <span>{it.k}</span>
          <span className="text-foreground/85">{it.v}</span>
        </div>
      ))}
    </div>
  );
}

/** Lab-style numbered list item. */
export function LabRow({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-5 py-5 border-t border-border first:border-t-0">
      <div className="font-mono text-2xs tracking-mono uppercase text-accent pt-1">{n}</div>
      <div>
        <div className="font-display text-lg text-foreground">{title}</div>
        <div className="mt-1.5 text-sm text-foreground-dim leading-relaxed max-w-prose">{body}</div>
      </div>
    </div>
  );
}
