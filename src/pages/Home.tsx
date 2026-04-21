import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { lazy, Suspense, useRef } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";

const QuantumOrangeScene = lazy(() => import("@/components/three/QuantumOrangeScene"));

const services = [
  {
    title: "Website Design",
    code: "WD-01",
    desc: "Conversion-engineered sites that look like the future arrived early.",
    glyph: (
      <svg viewBox="0 0 64 64" className="h-10 w-10"><rect x="6" y="10" width="52" height="40" rx="3" stroke="currentColor" fill="none" strokeWidth="1.5"/><line x1="6" y1="20" x2="58" y2="20" stroke="currentColor" strokeWidth="1.5"/><circle cx="11" cy="15" r="1" fill="currentColor"/><circle cx="15" cy="15" r="1" fill="currentColor"/><circle cx="19" cy="15" r="1" fill="currentColor"/></svg>
    ),
  },
  {
    title: "Chatbots",
    code: "CB-02",
    desc: "AI agents that intake, qualify, and route 24/7. Trained on your firm.",
    glyph: (
      <svg viewBox="0 0 64 64" className="h-10 w-10"><path d="M10 20c0-4 3-8 8-8h28c5 0 8 4 8 8v16c0 4-3 8-8 8H30l-12 8v-8h-0c-5 0-8-4-8-8V20z" stroke="currentColor" fill="none" strokeWidth="1.5"/><circle cx="24" cy="28" r="2" fill="currentColor"/><circle cx="40" cy="28" r="2" fill="currentColor"/></svg>
    ),
  },
  {
    title: "Automation",
    code: "AT-03",
    desc: "Workflows that intake, draft, file, and follow up — without humans.",
    glyph: (
      <svg viewBox="0 0 64 64" className="h-10 w-10"><circle cx="14" cy="14" r="5" stroke="currentColor" fill="none" strokeWidth="1.5"/><circle cx="50" cy="14" r="5" stroke="currentColor" fill="none" strokeWidth="1.5"/><circle cx="32" cy="50" r="5" stroke="currentColor" fill="none" strokeWidth="1.5"/><line x1="14" y1="19" x2="32" y2="45" stroke="currentColor" strokeWidth="1.5"/><line x1="50" y1="19" x2="32" y2="45" stroke="currentColor" strokeWidth="1.5"/><line x1="19" y1="14" x2="45" y2="14" stroke="currentColor" strokeWidth="1.5"/></svg>
    ),
  },
  {
    title: "CRM Management",
    code: "CR-04",
    desc: "Pipelines tuned to family law: leads, consults, retainers, referrals.",
    glyph: (
      <svg viewBox="0 0 64 64" className="h-10 w-10"><rect x="8" y="14" width="20" height="36" rx="2" stroke="currentColor" fill="none" strokeWidth="1.5"/><rect x="32" y="14" width="20" height="22" rx="2" stroke="currentColor" fill="none" strokeWidth="1.5"/><line x1="12" y1="22" x2="24" y2="22" stroke="currentColor"/><line x1="12" y1="28" x2="24" y2="28" stroke="currentColor"/><line x1="36" y1="22" x2="48" y2="22" stroke="currentColor"/></svg>
    ),
  },
  {
    title: "Family Law Software",
    code: "FL-05",
    desc: "Purpose-built case, document, and client-portal stack for family law.",
    glyph: (
      <svg viewBox="0 0 64 64" className="h-10 w-10"><path d="M32 10l4 8 9 1-7 6 2 9-8-5-8 5 2-9-7-6 9-1 4-8z" stroke="currentColor" fill="none" strokeWidth="1.5"/><line x1="14" y1="48" x2="50" y2="48" stroke="currentColor" strokeWidth="1.5"/><line x1="14" y1="54" x2="50" y2="54" stroke="currentColor" strokeWidth="1.5"/></svg>
    ),
  },
];

function HudReadout({ label, value, delay = 0 }: { label: string; value: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.6 }}
      className="font-mono-tel text-[10px] tracking-[0.25em] text-accent/90"
    >
      <span className="text-muted-foreground">{label}</span>{" "}
      <span className="text-glow-green">{value}</span>
    </motion.div>
  );
}

export default function Home() {
  const scrollProg = useScrollProgress();
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      {/* HERO */}
      <section ref={heroRef} className="relative min-h-[100svh] overflow-hidden">
        <div className="absolute inset-0">
          <Suspense fallback={<div className="absolute inset-0 grid place-items-center text-accent font-mono-tel text-xs">CALIBRATING…</div>}>
            <QuantumOrangeScene scrollProgress={scrollProg} className="absolute inset-0" />
          </Suspense>
        </div>

        {/* grid floor */}
        <div className="absolute inset-x-0 bottom-0 h-[40vh] grid-floor opacity-50 pointer-events-none" />

        {/* HUD overlays */}
        <div className="absolute top-28 left-6 md:left-12 space-y-2 pointer-events-none">
          <HudReadout label="COHERENCE" value="98.6%" delay={0.2}/>
          <HudReadout label="ENTANGLED FIRMS" value="142" delay={0.4}/>
          <HudReadout label="UPLINK" value="STABLE" delay={0.6}/>
        </div>
        <div className="absolute top-28 right-6 md:right-12 space-y-2 text-right pointer-events-none">
          <HudReadout label="SECTOR" value="LEGAL/FAMILY" delay={0.3}/>
          <HudReadout label="CHANNEL" value="OPEN" delay={0.5}/>
        </div>

        <div className="container relative z-10 flex min-h-[100svh] flex-col justify-end pb-20 md:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
            className="max-w-3xl"
          >
            <div className="font-mono-tel text-[11px] tracking-[0.4em] text-accent mb-4">
              ▸ QUANTUM LEGAL INFRASTRUCTURE
            </div>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-foreground">
              Practice law at the<br />
              <span className="text-gradient-aurora text-glow-orange">speed of light.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base md:text-lg text-muted-foreground">
              Websites, chatbots, automation, CRMs, and case software engineered as one entangled system — for family law firms that refuse to operate in linear time.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 rounded-md border border-primary bg-primary px-6 py-3 font-mono-tel text-xs uppercase tracking-[0.25em] text-primary-foreground hover:shadow-glow-orange transition-all"
              >
                ▸ Initiate Contact
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-3 rounded-md border border-accent/50 bg-transparent px-6 py-3 font-mono-tel text-xs uppercase tracking-[0.25em] text-accent hover:bg-accent/10 hover:shadow-glow-green transition-all"
              >
                View Capabilities
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="relative py-24 md:py-32">
        <div className="container">
          <div className="mb-12 max-w-2xl">
            <div className="font-mono-tel text-[10px] tracking-[0.4em] text-accent mb-3">▸ CAPABILITIES · 4D STACK</div>
            <h2 className="font-display text-3xl md:text-5xl">Five disciplines, one orbital system.</h2>
            <p className="mt-4 text-muted-foreground">Each capability is a layer in the same field. Everything talks to everything.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <CapabilityCard key={s.code} {...s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* QUANTUM STACK */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="font-mono-tel text-[10px] tracking-[0.4em] text-accent mb-3">▸ THE QUANTUM STACK</div>
              <h2 className="font-display text-3xl md:text-5xl mb-6">
                Five layers.<br/>
                <span className="text-gradient-orange">One unified field.</span>
              </h2>
              <p className="text-muted-foreground mb-8 max-w-lg">
                Most firms wire 7 disconnected tools. We collapse them into one entangled stack — every layer informed by every other in real time.
              </p>
              <ul className="space-y-3">
                {["Website ↔ CRM in superposition", "Chatbot intake updates pipeline instantly", "Automation runs without observer", "Case data echoes across every layer", "Clients see one coherent firm"].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-sm">
                    <span className="mt-1 h-2 w-2 rounded-full bg-accent shadow-glow-green shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-[480px]">
              <OrbitalStack />
            </div>
          </div>
        </div>
      </section>

      {/* PROOF */}
      <section className="relative py-20 border-y border-border/60 overflow-hidden">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            {[
              { v: "142", l: "ENTANGLED FIRMS" },
              { v: "9.4×", l: "INTAKE THROUGHPUT" },
              { v: "<3s", l: "RESPONSE LATENCY" },
              { v: "98.6%", l: "SYSTEM COHERENCE" },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <div className="font-display text-3xl md:text-5xl text-gradient-aurora">{s.v}</div>
                <div className="font-mono-tel text-[10px] tracking-[0.3em] text-muted-foreground mt-2">{s.l}</div>
              </div>
            ))}
          </div>
          <div className="relative overflow-hidden">
            <div className="marquee flex gap-12 whitespace-nowrap font-mono-tel text-[11px] tracking-[0.35em] text-muted-foreground/70">
              {Array(2).fill(0).flatMap((_, k) =>
                ["FAMILY LAW · ATL", "DIVORCE GROUP · MIA", "CUSTODY PARTNERS · NYC", "MEDIATION CO · SEA", "PRENUP STUDIO · LAX", "FAMILY ADVOCATES · DC", "JUSTICE LAB · CHI"].map((t, i) => (
                  <span key={`${k}-${i}`} className="flex items-center gap-12">
                    <span>◇ {t}</span>
                  </span>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-28 md:py-36">
        <div className="container">
          <div className="holo-panel relative overflow-hidden rounded-2xl p-10 md:p-16 text-center scanlines noise">
            <div className="absolute inset-0 bg-gradient-aurora pointer-events-none" />
            <div className="relative">
              <div className="font-mono-tel text-[10px] tracking-[0.4em] text-accent mb-4">▸ READY TO ENTANGLE</div>
              <h2 className="font-display text-3xl md:text-6xl">
                Stop running a firm.<br/>
                <span className="text-gradient-orange">Start running a system.</span>
              </h2>
              <p className="mt-6 max-w-xl mx-auto text-muted-foreground">
                One conversation. We map your firm in 30 minutes and show you exactly what your future stack looks like.
              </p>
              <Link
                to="/contact"
                className="mt-8 inline-flex items-center gap-3 rounded-md border border-primary bg-primary px-7 py-4 font-mono-tel text-xs uppercase tracking-[0.3em] text-primary-foreground hover:shadow-glow-orange transition-all"
              >
                ▸ Initiate Contact
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function CapabilityCard({
  title, code, desc, glyph, index,
}: { title: string; code: string; desc: string; glyph: JSX.Element; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(0)`;
    const glow = el.querySelector<HTMLDivElement>("[data-glow]");
    if (glow) {
      glow.style.background = `radial-gradient(400px circle at ${e.clientX - r.left}px ${e.clientY - r.top}px, hsl(22 100% 55% / 0.18), transparent 60%)`;
    }
  };
  const onLeave = () => {
    const el = ref.current; if (!el) return;
    el.style.transform = "perspective(900px) rotateY(0) rotateX(0)";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.07 }}
    >
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="holo-panel relative h-full rounded-xl p-6 transition-transform duration-300 will-change-transform overflow-hidden group"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div data-glow className="pointer-events-none absolute inset-0" />
        <div className="relative flex items-start justify-between">
          <div className="text-primary-glow">{glyph}</div>
          <span className="font-mono-tel text-[10px] tracking-[0.3em] text-accent/80">{code}</span>
        </div>
        <h3 className="relative mt-6 font-display text-xl">{title}</h3>
        <p className="relative mt-2 text-sm text-muted-foreground">{desc}</p>
        <div className="relative mt-6 h-[1px] w-full bg-gradient-to-r from-primary/40 via-accent/40 to-transparent" />
        <Link to="/services" className="relative mt-4 inline-flex font-mono-tel text-[10px] tracking-[0.3em] text-accent hover:text-accent-glow">
          EXPLORE LAYER →
        </Link>
      </div>
    </motion.div>
  );
}

function OrbitalStack() {
  const layers = ["WEBSITE", "CHATBOT", "AUTOMATION", "CRM", "CASE OS"];
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="relative h-full w-full max-w-[480px] aspect-square">
        {/* core */}
        <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 rounded-full bg-gradient-orange shadow-glow-orange animate-pulse-glow" />
        {layers.map((l, i) => {
          const size = 40 + (i + 1) * 16;
          const dur = 18 + i * 6;
          return (
            <div
              key={l}
              className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/25"
              style={{ width: `${size}%`, height: `${size}%`, animation: `spin-slow ${dur}s linear infinite${i % 2 ? " reverse" : ""}` }}
            >
              <span
                className="absolute font-mono-tel text-[10px] tracking-[0.3em] text-accent/90 -translate-x-1/2"
                style={{ top: "-10px", left: "50%" }}
              >
                ◇ {l}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
