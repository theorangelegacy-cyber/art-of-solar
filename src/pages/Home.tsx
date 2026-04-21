import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { lazy, Suspense, useRef } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { CornerFrame, Readout, SectionHead, Stat, TelemetryStrip, LabRow } from "@/components/HUD";

const QuantumOrangeScene = lazy(() => import("@/components/three/QuantumOrangeScene"));

const services = [
  { code: "WD/01", title: "Site Architecture",     desc: "Conversion-engineered firm sites. Sub-second hero, schema-grade SEO, native mobile discipline.", spec: "≤ 0.8s LCP · 100 Lighthouse" },
  { code: "CB/02", title: "Intake Agent",          desc: "On-brand AI agents that intake, qualify, and route 24/7. Trained on your firm's voice and disqualifiers.",   spec: "9.4× intake throughput" },
  { code: "AT/03", title: "Workflow Substrate",    desc: "Event-driven automations that draft, file, follow up, and reconcile — without human cycles.",        spec: "≤ 3s end-to-end" },
  { code: "CR/04", title: "CRM Topology",          desc: "Pipelines tuned to family-law lifecycles: lead → consult → retainer → referral, with full attribution.", spec: "+34% close rate" },
  { code: "FL/05", title: "Family Law OS",         desc: "Matter, document, billing, and client-portal stack purpose-built for the discipline.",                spec: "Single source of truth" },
];

export default function Home() {
  const scrollProg = useScrollProgress();

  return (
    <div>
      {/* ============================================================
          HERO
          ============================================================ */}
      <section className="relative min-h-[100svh] overflow-hidden">
        {/* 3D scene */}
        <div className="absolute inset-0">
          <Suspense fallback={
            <div className="absolute inset-0 grid place-items-center text-accent font-mono text-2xs tracking-mono uppercase">
              <span className="inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-accent animate-ticker" />Calibrating field</span>
            </div>
          }>
            <QuantumOrangeScene scrollProgress={scrollProg} className="absolute inset-0" />
          </Suspense>
        </div>

        {/* grid floor */}
        <div className="absolute inset-x-0 bottom-0 h-[55vh] grid-floor opacity-40 pointer-events-none" />

        {/* ============== HUD CHROME LAYER (the nerd details) ============== */}
        {/* Outer frame brackets */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top-left bracket */}
          <div className="absolute top-20 left-4 md:top-24 md:left-8">
            <div className="h-3 w-3 border-l border-t border-border-bright/60" />
            <div className="mt-2 font-mono text-2xs tracking-mono uppercase text-muted-foreground">QOD-IV ▸ HERO</div>
          </div>
          {/* Top-right bracket */}
          <div className="absolute top-20 right-4 md:top-24 md:right-8 text-right">
            <div className="h-3 w-3 border-r border-t border-border-bright/60 ml-auto" />
            <div className="mt-2 font-mono text-2xs tracking-mono uppercase text-muted-foreground">FRAME 0001/∞</div>
          </div>
          {/* Bottom-left bracket */}
          <div className="absolute bottom-6 left-4 md:left-8">
            <div className="font-mono text-2xs tracking-mono-tight uppercase text-muted-foreground/70 mb-2">38.8951°N · 77.0364°W</div>
            <div className="h-3 w-3 border-l border-b border-border-bright/60" />
          </div>
          {/* Bottom-right bracket */}
          <div className="absolute bottom-6 right-4 md:right-8 text-right">
            <div className="font-mono text-2xs tracking-mono-tight uppercase text-muted-foreground/70 mb-2">Σ · {new Date().toISOString().slice(0, 10)}</div>
            <div className="h-3 w-3 border-r border-b border-border-bright/60 ml-auto" />
          </div>
        </div>

        {/* Left HUD column */}
        <div className="hidden lg:flex absolute top-32 left-8 z-10 flex-col gap-3 pointer-events-none">
          <Readout k="COHERENCE"     v="98.6%"    status="active" />
          <Readout k="ENTANGLED"     v="142 firms"   status="ok" />
          <Readout k="LATENCY"       v="12 ms"      status="ok" />
          <Readout k="THROUGHPUT"    v="9.4× baseline" status="ok" />
        </div>

        {/* Right HUD callouts pointing to the orange */}
        <div className="hidden lg:block absolute top-1/2 right-8 z-10 -translate-y-1/2 pointer-events-none">
          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-3">
              <div className="font-mono text-2xs tracking-mono uppercase text-right">
                <div className="text-accent">α · CORE</div>
                <div className="text-muted-foreground">orange substrate</div>
              </div>
              <svg width="44" height="14"><line x1="0" y1="7" x2="44" y2="7" stroke="hsl(var(--border-bright))" strokeWidth="1" strokeDasharray="2 2"/><circle cx="0" cy="7" r="1.5" fill="hsl(var(--accent))"/></svg>
            </div>
            <div className="flex items-start gap-3">
              <div className="font-mono text-2xs tracking-mono uppercase text-right">
                <div className="text-accent">β · ORBIT</div>
                <div className="text-muted-foreground">capability rings</div>
              </div>
              <svg width="44" height="14"><line x1="0" y1="7" x2="44" y2="7" stroke="hsl(var(--border-bright))" strokeWidth="1" strokeDasharray="2 2"/><circle cx="0" cy="7" r="1.5" fill="hsl(var(--accent))"/></svg>
            </div>
            <div className="flex items-start gap-3">
              <div className="font-mono text-2xs tracking-mono uppercase text-right">
                <div className="text-accent">γ · FIELD</div>
                <div className="text-muted-foreground">legal substrate</div>
              </div>
              <svg width="44" height="14"><line x1="0" y1="7" x2="44" y2="7" stroke="hsl(var(--border-bright))" strokeWidth="1" strokeDasharray="2 2"/><circle cx="0" cy="7" r="1.5" fill="hsl(var(--accent))"/></svg>
            </div>
          </div>
        </div>

        {/* Hero content */}
        <div className="container relative z-10 flex min-h-[100svh] flex-col justify-end pb-24 md:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 font-mono text-2xs tracking-mono uppercase text-accent mb-6">
              <span className="text-muted-foreground">§ 00</span>
              <span className="h-px w-10 bg-accent/50" />
              <span>Quantum Legal Infrastructure</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.96] tracking-tight text-foreground">
              The firm,<br />
              <span className="font-serif-italic text-foreground/95">re-rendered</span> <span className="text-gradient-orange">in real time.</span>
            </h1>
            <p className="mt-6 max-w-xl text-foreground-dim text-base md:text-lg leading-relaxed">
              We collapse five disconnected systems — site, intake, automation, CRM, case OS — into one entangled substrate. Engineered for family-law firms operating beyond linear time.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link to="/contact" className="group inline-flex items-center gap-3 rounded-sm bg-primary px-5 py-3 font-mono text-2xs tracking-mono uppercase text-primary-foreground hover:shadow-glow-orange transition-all">
                Initiate Contact
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
              <Link to="/services" className="inline-flex items-center gap-3 rounded-sm border border-border bg-transparent px-5 py-3 font-mono text-2xs tracking-mono uppercase text-foreground hover:border-accent hover:text-accent transition-all">
                01 · Capability matrix
              </Link>
            </div>

            {/* mini telemetry strip */}
            <div className="mt-10 pt-6 border-t border-border max-w-2xl">
              <TelemetryStrip items={[
                { k: "Build", v: "QOD-IV" },
                { k: "Channel", v: "Open" },
                { k: "Tier", v: "Family · I" },
                { k: "Window", v: "≤ 24h" },
              ]} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          CAPABILITY MATRIX
          ============================================================ */}
      <section className="relative py-28 md:py-36 border-t border-border">
        <div className="container">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
            <SectionHead
              index="01"
              kicker="Capability Matrix"
              title={<>Five disciplines.<br /><span className="font-serif-italic text-foreground-dim">One unified field.</span></>}
              desc="Every layer is a complete system on its own — and exponentially more powerful inside the entangled stack."
            />
            <Link to="/services" className="font-mono text-2xs tracking-mono uppercase text-accent hover:text-foreground underline-trace">
              Open full matrix →
            </Link>
          </div>

          <div className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3 border border-border">
            {services.map((s, i) => (
              <motion.div
                key={s.code}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.06 }}
                className="group relative bg-background hover:bg-surface-1 transition-colors p-7 md:p-8 min-h-[240px]"
              >
                {/* corner ticks */}
                <span className="absolute top-0 left-0 h-2 w-2 border-t border-l border-border-bright/40" />
                <span className="absolute top-0 right-0 h-2 w-2 border-t border-r border-border-bright/40" />
                <span className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-border-bright/40" />
                <span className="absolute bottom-0 right-0 h-2 w-2 border-b border-r border-border-bright/40" />

                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xs tracking-mono uppercase text-accent">{s.code}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-accent/60 group-hover:bg-accent group-hover:animate-ticker" />
                </div>
                <h3 className="font-display text-xl md:text-2xl mt-6 text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm text-foreground-dim leading-relaxed">{s.desc}</p>
                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                  <span className="font-mono text-2xs tracking-mono uppercase text-muted-foreground">{s.spec}</span>
                  <Link to="/services" className="font-mono text-2xs tracking-mono uppercase text-accent group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                    Layer →
                  </Link>
                </div>
              </motion.div>
            ))}

            {/* Trailing tile to fill grid */}
            <div className="bg-background p-7 md:p-8 min-h-[240px] flex flex-col justify-between">
              <div className="font-mono text-2xs tracking-mono uppercase text-muted-foreground">XX/06 · ROADMAP</div>
              <div>
                <div className="font-display text-xl text-foreground">Custom layer</div>
                <p className="mt-2 text-sm text-foreground-dim">Need a discipline that isn't here? We build it inside the same entangled field.</p>
                <Link to="/contact" className="mt-4 inline-block font-mono text-2xs tracking-mono uppercase text-accent">Request →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          DOCTRINE / WHY ONE SYSTEM
          ============================================================ */}
      <section className="relative py-28 md:py-36 overflow-hidden">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <SectionHead
                index="02"
                kicker="Doctrine"
                title={<>Most firms wire seven tools.<br /><span className="font-serif-italic text-foreground-dim">We collapse them into one.</span></>}
                desc="The friction in your firm isn't talent — it's the seams between systems. We remove the seams."
              />
              <Link to="/about" className="mt-8 inline-flex items-center gap-2 font-mono text-2xs tracking-mono uppercase text-accent underline-trace">
                Read the doctrine →
              </Link>
            </div>

            <div className="lg:col-span-7">
              <div>
                <LabRow n="P/01" title="Entanglement"
                  body="Every layer informs every other in real time. A new lead in the chatbot updates the CRM, fires the intake automation, and reflects on the dashboard before the page reloads." />
                <LabRow n="P/02" title="Coherence"
                  body="One source of truth across web, intake, case, billing, and reporting. No reconciliation work. No version drift. No 'which spreadsheet is right?'" />
                <LabRow n="P/03" title="Velocity"
                  body="Sub-3-second response on every workflow. Every touchpoint optimized for speed-to-action — because in family law, momentum is mercy." />
                <LabRow n="P/04" title="Discipline"
                  body="Bold visuals serve clarity. Nothing in our work is decoration. Every pixel earns its position." />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          PROOF / TELEMETRY
          ============================================================ */}
      <section className="relative py-24 md:py-28 border-y border-border bg-surface-1/30">
        <div className="container">
          <div className="flex items-center justify-between mb-10">
            <div className="font-mono text-2xs tracking-mono uppercase text-accent flex items-center gap-3">
              <span className="text-muted-foreground">§ 03</span>
              <span className="h-px w-8 bg-accent/50" />
              <span>Field Telemetry · Live</span>
            </div>
            <div className="hidden md:flex items-center gap-2 font-mono text-2xs tracking-mono uppercase text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-ticker" />
              Sampled across 142 entangled firms
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
            <Stat value="142"   label="Entangled firms"    sub="Tier-1 family practice" />
            <Stat value="9.4×"  label="Intake throughput"  sub="vs. baseline stack" />
            <Stat value="< 3s"  label="Response latency"   sub="Median, end-to-end" />
            <Stat value="98.6%" label="System coherence"   sub="30-day rolling avg" />
          </div>

          <div className="mt-12 overflow-hidden border-t border-border pt-6">
            <div className="marquee flex gap-12 whitespace-nowrap font-mono text-2xs tracking-mono uppercase text-muted-foreground/70">
              {Array(2).fill(0).flatMap((_, k) =>
                ["Family Law ATL", "Divorce Group MIA", "Custody Partners NYC", "Mediation Co SEA", "Prenup Studio LAX", "Family Advocates DC", "Justice Lab CHI", "Resolution House BOS", "Hearth & Court PHX"].map((t, i) => (
                  <span key={`${k}-${i}`} className="inline-flex items-center gap-12">
                    <span><span className="text-accent mr-2">◇</span>{t}</span>
                  </span>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          CTA
          ============================================================ */}
      <section className="relative py-28 md:py-36">
        <div className="container">
          <CornerFrame size={20} thickness={1}>
            <div className="relative overflow-hidden p-10 md:p-20 text-center bg-surface-1/40">
              <div className="absolute inset-0 bg-grid-fine opacity-40 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-aurora pointer-events-none" />
              <div className="relative">
                <div className="font-mono text-2xs tracking-mono uppercase text-accent mb-5">§ 04 · Open Channel</div>
                <h2 className="font-display text-4xl md:text-6xl tracking-tight">
                  Stop running a firm.<br />
                  <span className="font-serif-italic text-foreground-dim">Start running a system.</span>
                </h2>
                <p className="mt-5 max-w-xl mx-auto text-foreground-dim">
                  30 minutes. We map your firm and show you exactly what the entangled version looks like.
                </p>
                <Link to="/contact" className="mt-10 inline-flex items-center gap-3 rounded-sm bg-primary px-6 py-3.5 font-mono text-2xs tracking-mono uppercase text-primary-foreground hover:shadow-glow-orange transition-all">
                  Initiate Contact →
                </Link>
              </div>
            </div>
          </CornerFrame>
        </div>
      </section>
    </div>
  );
}
