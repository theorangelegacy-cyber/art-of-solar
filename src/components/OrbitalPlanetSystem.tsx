import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* =====================================================================
   DisciplineGrid — clean 2D futuristic interactive selector
   ===================================================================== */

type Discipline = {
  code: string;
  name: string;
  hue: number;
  spec: string;
  desc: string;
  features: string[];
};

const DISCIPLINES: Discipline[] = [
  {
    code: "01", name: "Website", hue: 22,
    spec: "Loads in under 1 second",
    desc: "A fast, modern website built to turn visitors into clients.",
    features: ["Lightning-fast load", "Built for Google", "Mobile-first design", "Designed to convert"],
  },
  {
    code: "02", name: "AI Intake", hue: 152,
    spec: "9× more leads captured",
    desc: "An AI assistant that answers, qualifies, and books leads 24/7.",
    features: ["Sounds like your firm", "Qualifies in real time", "Books on your calendar", "Sends notes to CRM"],
  },
  {
    code: "03", name: "Automations", hue: 195,
    spec: "Runs in under 3 seconds",
    desc: "Workflows that draft, file, follow up, and reconcile — automatically.",
    features: ["Intake → retainer", "Auto-drafted letters", "Status updates", "No manual handoff"],
  },
  {
    code: "04", name: "CRM", hue: 38,
    spec: "+34% close rate",
    desc: "A pipeline built for family law — every lead tracked, every step measured.",
    features: ["Custom stages", "Lead scoring", "Referral tracking", "Weekly reports"],
  },
  {
    code: "05", name: "Family Law OS", hue: 270,
    spec: "One system, end-to-end",
    desc: "Matter, documents, billing, and client portal — all in one place.",
    features: ["Matter timeline", "Client portal + e-sign", "Document assembly", "Trust accounting"],
  },
];

const nextIndex = (index: number) => (index + 1) % DISCIPLINES.length;

export default function OrbitalPlanetSystem() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setActive((a) => nextIndex(a));
      if (e.key === "ArrowLeft") setActive((a) => (a - 1 + DISCIPLINES.length) % DISCIPLINES.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const d = DISCIPLINES[active];
  const next = DISCIPLINES[nextIndex(active)];
  const goNext = () => setActive((a) => nextIndex(a));

  return (
    <section className="relative py-20 md:py-28 border-t border-border overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-grid-fine opacity-[0.04]" />

      <div className="container">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 font-mono text-2xs tracking-mono uppercase text-accent mb-3">
              <span className="text-muted-foreground">§ 02</span>
              <span className="h-px w-8 bg-accent/50" />
              <span>What we build</span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl text-foreground leading-[1.05]">
              Five systems. <span className="font-serif-italic text-foreground-dim">One firm.</span>
            </h2>
          </div>
          <div className="font-mono text-2xs tracking-mono uppercase text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-ticker" />
              {String(active + 1).padStart(2, "0")} / {String(DISCIPLINES.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="relative border border-border bg-background-deep/60 rounded-sm overflow-hidden">
          <span className="absolute top-0 left-0 h-3 w-3 border-t border-l border-border-bright/60 z-10" />
          <span className="absolute top-0 right-0 h-3 w-3 border-t border-r border-border-bright/60 z-10" />
          <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-border-bright/60 z-10" />
          <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-border-bright/60 z-10" />

          <div className="grid md:grid-cols-12">
            <div className="md:col-span-4 border-b md:border-b-0 md:border-r border-border">
              {DISCIPLINES.map((p, i) => {
                const isActive = i === active;
                return (
                  <div
                    key={p.code}
                    className={`relative border-b border-border last:border-b-0 ${isActive ? "bg-surface-1" : "hover:bg-surface-1/40"}`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="disciplineBar"
                        className="absolute left-0 top-0 bottom-0 w-0.5"
                        style={{
                          background: `hsl(${p.hue} 80% 60%)`,
                          boxShadow: `0 0 12px hsl(${p.hue} 80% 60% / 0.7)`,
                        }}
                      />
                    )}

                    <button
                      onClick={() => setActive(i)}
                      className="w-full text-left px-5 py-5 pr-28 transition-all"
                      aria-current={isActive}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="h-2.5 w-2.5 rounded-full flex-shrink-0 transition-all"
                          style={{
                            background: `hsl(${p.hue} 80% 60%)`,
                            boxShadow: isActive
                              ? `0 0 16px hsl(${p.hue} 80% 60% / 0.9), 0 0 4px hsl(${p.hue} 80% 60%)`
                              : `0 0 4px hsl(${p.hue} 80% 60% / 0.4)`,
                          }}
                        />
                        <div className="min-w-0">
                          <div className={`font-mono text-2xs tracking-mono uppercase ${isActive ? "text-accent" : "text-muted-foreground"}`}>
                            {p.code}
                          </div>
                          <div className={`font-display text-base md:text-lg transition-colors underline underline-offset-4 ${isActive ? "text-foreground" : "text-foreground-dim group-hover:text-foreground"}`}>
                            {p.name}
                          </div>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={goNext}
                      className="absolute right-4 top-1/2 -translate-y-1/2 inline-flex items-center gap-2 rounded-sm border border-border bg-background/70 px-2.5 py-2 text-2xs font-mono uppercase tracking-mono text-muted-foreground transition-all hover:bg-surface-1 hover:text-foreground"
                      aria-label={`Go to ${next.name}`}
                    >
                      <span className="underline underline-offset-4">Click here</span>
                      <span className="grid h-6 w-6 place-items-center rounded-sm border border-border text-foreground">↗</span>
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="md:col-span-8 relative min-h-[440px] p-6 md:p-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={d.code}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
                >
                  <div className="font-mono text-2xs tracking-mono uppercase mb-3" style={{ color: `hsl(${d.hue} 80% 65%)` }}>
                    {d.code} · {d.spec}
                  </div>
                  <h3 className="font-display text-3xl md:text-5xl text-foreground leading-[1.05]">
                    {d.name}
                  </h3>
                  <p className="mt-4 text-foreground-dim text-base md:text-lg leading-relaxed max-w-xl">
                    {d.desc}
                  </p>

                  <div className="mt-8 grid sm:grid-cols-2 gap-2">
                    {d.features.map((f, i) => (
                      <button
                        key={f}
                        onClick={goNext}
                        className="flex items-center justify-between gap-4 px-4 py-3 rounded-sm border bg-background/60 text-left transition-all hover:bg-surface-1"
                        style={{ borderColor: `hsl(${d.hue} 60% 45% / 0.35)` }}
                      >
                        <motion.div
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 + i * 0.06 }}
                          className="flex items-center gap-3 min-w-0"
                        >
                          <span
                            className="h-1.5 w-1.5 rounded-full flex-shrink-0"
                            style={{
                              background: `hsl(${d.hue} 80% 65%)`,
                              boxShadow: `0 0 8px hsl(${d.hue} 80% 60% / 0.7)`,
                            }}
                          />
                          <span className="text-sm text-foreground underline underline-offset-4">{f}</span>
                        </motion.div>
                        <span className="inline-flex items-center gap-2 flex-shrink-0 text-2xs font-mono uppercase tracking-mono text-muted-foreground">
                          <span>Click here</span>
                          <span className="grid h-6 w-6 place-items-center rounded-sm border border-border text-foreground">↗</span>
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="mt-10 flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-2 font-mono text-2xs tracking-mono uppercase text-muted-foreground">
                      <span className="hidden md:inline">← →</span>
                      <span className="hidden md:inline">keyboard navigate</span>
                      <span className="md:hidden">tap to switch</span>
                    </div>

                    <button
                      onClick={goNext}
                      className="inline-flex items-center gap-3 rounded-sm border border-border bg-surface-1 px-4 py-3 font-mono text-2xs uppercase tracking-mono text-foreground transition-all hover:bg-background"
                    >
                      <span className="underline underline-offset-4">Next: {next.name}</span>
                      <span className="grid h-7 w-7 place-items-center rounded-sm border border-border">→</span>
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
