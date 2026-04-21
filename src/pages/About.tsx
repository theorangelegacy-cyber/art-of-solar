import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CornerFrame, SectionHead, Stat } from "@/components/HUD";

const principles = [
  { code: "P/01", title: "Entanglement", body: "Every layer of the firm informs every other in real time. The seams disappear; the firm acts as one body." },
  { code: "P/02", title: "Coherence",    body: "One source of truth across web, intake, case, billing, and reporting. No reconciliation, no drift, no doubt." },
  { code: "P/03", title: "Velocity",     body: "Sub-3-second response on every workflow. In family law, momentum is mercy — for the client and the firm." },
  { code: "P/04", title: "Discipline",   body: "Bold visuals serve clarity. Nothing in our work is decoration. Every pixel earns its position." },
];

const phases = [
  { y: "Φ/01", label: "Discover", desc: "30-minute mapping call. We diagram your firm in detail and surface every leak in the funnel." },
  { y: "Φ/02", label: "Design",   desc: "We architect the entangled system end-to-end — site, intake, automation, CRM, case OS." },
  { y: "Φ/03", label: "Deploy",   desc: "Launch in waves. Zero downtime. Old stack runs in parallel until coherence is proven." },
  { y: "Φ/04", label: "Evolve",   desc: "Continuous tuning under contract. Compounding gains, monthly intelligence brief." },
];

export default function About() {
  return (
    <div>
      {/* MANIFESTO */}
      <section className="relative pt-32 pb-20">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-10 items-end mb-14">
            <div className="lg:col-span-9">
              <SectionHead
                index="02"
                kicker="Doctrine · 001"
                title={<>We don't build websites.<br /><span className="font-serif-italic text-foreground-dim">We build legal singularities.</span></>}
              />
            </div>
            <div className="lg:col-span-3 lg:text-right">
              <div className="font-mono text-2xs tracking-mono uppercase text-muted-foreground">QOD-IV ▸ Doctrine 001</div>
              <div className="font-mono text-2xs tracking-mono-tight text-muted-foreground/70 mt-1">Pub. 2026.04 · Rev. C</div>
            </div>
          </div>

          <p className="text-lg md:text-xl text-foreground/90 leading-relaxed max-w-3xl">
            Quantum Orange Dynamics exists because family law deserves better infrastructure than the cobbled-together stacks most firms tolerate. We build one system, not five — engineered with the discipline of a research lab and the ambition of a moonshot.
          </p>
          <p className="mt-5 text-foreground-dim max-w-3xl leading-relaxed">
            Every firm we build for becomes a node in the same field: faster intake, cleaner pipelines, less waste, more time spent on clients instead of on tools. The compounding is structural — and once you see it, you can't unsee it.
          </p>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="relative py-24 border-t border-border">
        <div className="container">
          <div className="font-mono text-2xs tracking-mono uppercase text-accent mb-3">§ 01 · Principles</div>
          <h2 className="font-display text-3xl md:text-5xl mb-12 max-w-2xl">Four constants that govern the work.</h2>

          <div className="grid gap-px bg-border md:grid-cols-2 border border-border">
            {principles.map((p, i) => (
              <motion.div
                key={p.code}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.07 }}
                className="relative bg-background p-7 md:p-10"
              >
                <span className="absolute top-0 left-0 h-2 w-2 border-t border-l border-border-bright/40" />
                <span className="absolute top-0 right-0 h-2 w-2 border-t border-r border-border-bright/40" />
                <span className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-border-bright/40" />
                <span className="absolute bottom-0 right-0 h-2 w-2 border-b border-r border-border-bright/40" />

                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xs tracking-mono uppercase text-accent">{p.code}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-accent/70" />
                </div>
                <h3 className="font-display text-2xl md:text-3xl mt-6">{p.title}</h3>
                <p className="mt-3 text-foreground-dim leading-relaxed max-w-md">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PHASES */}
      <section className="relative py-28">
        <div className="container">
          <div className="font-mono text-2xs tracking-mono uppercase text-accent mb-3">§ 02 · Engagement Phases</div>
          <h2 className="font-display text-3xl md:text-5xl mb-12 max-w-2xl">Discover. Design. Deploy. Evolve.</h2>

          <div className="relative">
            <svg viewBox="0 0 1000 120" className="w-full h-24 md:h-32">
              <defs>
                <linearGradient id="path-grad" x1="0" x2="1">
                  <stop offset="0%"   stopColor="hsl(var(--accent))" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" />
                </linearGradient>
              </defs>
              <path d="M 20 60 Q 250 -10, 500 60 T 980 60" stroke="url(#path-grad)" strokeWidth="1.2" fill="none" strokeDasharray="5 5"/>
              {[20, 340, 660, 980].map((x, i) => (
                <g key={i}>
                  <circle cx={x} cy={i % 2 === 0 ? 60 : 60} r="3.5" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="1" />
                  <circle cx={x} cy={i % 2 === 0 ? 60 : 60} r="1.5" fill="hsl(var(--primary))" />
                </g>
              ))}
            </svg>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
              {phases.map((m, i) => (
                <motion.div
                  key={m.y}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="border-t border-border pt-4"
                >
                  <div className="font-mono text-2xs tracking-mono uppercase text-accent">{m.y}</div>
                  <div className="font-display text-2xl mt-1">{m.label}</div>
                  <p className="mt-2 text-sm text-foreground-dim leading-relaxed">{m.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TEAM POSTURE */}
      <section className="relative py-24 border-t border-border bg-surface-1/30">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5">
              <div className="font-mono text-2xs tracking-mono uppercase text-accent mb-3">§ 03 · Team Posture</div>
              <h2 className="font-display text-3xl md:text-4xl">A small team operating like a research lab.</h2>
              <p className="mt-4 text-foreground-dim max-w-md leading-relaxed">
                Engineers who care about milliseconds. Designers who reject decoration. Strategists who measure outcomes, not opinions. We work with a maximum of twelve firms at a time — by design.
              </p>
            </div>
            <div className="lg:col-span-7 grid grid-cols-2 gap-6">
              <Stat value="12" label="Max active firms" sub="Capacity ceiling, by design" />
              <Stat value="≤ 24h" label="Response window" sub="Every business day" />
              <Stat value="100%" label="Migration uptime" sub="Across deployed firms" />
              <Stat value="6 wk" label="Median time to live" sub="Discovery → Phase Φ/03" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-28">
        <div className="container">
          <CornerFrame>
            <div className="relative overflow-hidden p-10 md:p-16 text-center bg-surface-1/40">
              <div className="absolute inset-0 bg-grid-fine opacity-30" />
              <div className="relative">
                <h2 className="font-display text-3xl md:text-5xl">Bring your firm into the field.</h2>
                <Link to="/contact" className="mt-8 inline-flex items-center gap-3 rounded-sm bg-primary px-6 py-3.5 font-mono text-2xs tracking-mono uppercase text-primary-foreground hover:shadow-glow-orange">
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
