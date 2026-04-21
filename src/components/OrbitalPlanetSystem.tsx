import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* =====================================================================
   OrbitalPlanetSystem — Apple-grade preset planet selector
   - 5 planets shown as a horizontal selector (always visible)
   - One planet is always "focused" in the center, large, slowly rotating
   - Bullets render as readable, fixed-position cards around it
   - Tab through planets with arrow keys / clicks — feels 4D via depth, parallax,
     ring tilt, and crossfade
   ===================================================================== */

type Planet = {
  code: string;
  name: string;
  hue: number;
  ring?: boolean;
  bullets: string[];
  spec: string;
  desc: string;
};

const PLANETS: Planet[] = [
  {
    code: "WD/01", name: "Site Architecture", hue: 22,
    spec: "≤ 0.8s LCP · 100 Lighthouse",
    desc: "Conversion-engineered firm sites built like research instruments.",
    bullets: ["Sub-second LCP", "Schema-grade SEO", "Mobile-first IA", "Conversion math baked in"],
  },
  {
    code: "CB/02", name: "Intake Agent", hue: 152, ring: true,
    spec: "9.4× intake throughput",
    desc: "On-brand AI agents that intake, qualify, and route 24/7.",
    bullets: ["Branded voice profile", "Live qualification", "Calendar handoff in-thread", "Transcript → CRM"],
  },
  {
    code: "AT/03", name: "Workflow Substrate", hue: 195,
    spec: "≤ 3s end-to-end",
    desc: "Event-driven automations that draft, file, follow up, reconcile.",
    bullets: ["Intake → retainer flow", "Auto-drafted letters", "Status reconciliation", "Sub-3s latency"],
  },
  {
    code: "CR/04", name: "CRM Topology", hue: 38, ring: true,
    spec: "+34% close rate",
    desc: "Pipelines tuned to family-law lifecycles with full attribution.",
    bullets: ["Custom stages + scoring", "Referral attribution", "Weekly intelligence brief", "Zero-downtime migration"],
  },
  {
    code: "FL/05", name: "Family Law OS", hue: 270,
    spec: "Single source of truth",
    desc: "Matter, document, billing, and portal stack — purpose-built.",
    bullets: ["Matter timeline", "Secure portal + e-sign", "Document assembly", "Trust accounting"],
  },
];

export default function OrbitalPlanetSystem() {
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setActive((a) => (a + 1) % PLANETS.length);
      if (e.key === "ArrowLeft") setActive((a) => (a - 1 + PLANETS.length) % PLANETS.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const planet = PLANETS[active];

  return (
    <section className="relative py-20 md:py-28 border-t border-border overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-fine opacity-[0.04]" />
        <Starfield />
      </div>

      <div className="container">
        {/* Header */}
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 font-mono text-2xs tracking-mono uppercase text-accent mb-3">
              <span className="text-muted-foreground">§ 02</span>
              <span className="h-px w-8 bg-accent/50" />
              <span>Orbital System · Live</span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl text-foreground leading-[1.05]">
              Five disciplines. <span className="font-serif-italic text-foreground-dim">One gravitational field.</span>
            </h2>
          </div>
          <div className="flex items-center gap-3 font-mono text-2xs tracking-mono uppercase text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-ticker" />
              {String(active + 1).padStart(2, "0")} / {String(PLANETS.length).padStart(2, "0")} · {planet.code}
            </span>
          </div>
        </div>

        {/* Stage */}
        <div className="relative w-full border border-border bg-background-deep/60 overflow-hidden rounded-sm" style={{ minHeight: 560 }}>
          {/* corner ticks */}
          <span className="absolute top-0 left-0 h-3 w-3 border-t border-l border-border-bright/60 z-10" />
          <span className="absolute top-0 right-0 h-3 w-3 border-t border-r border-border-bright/60 z-10" />
          <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-border-bright/60 z-10" />
          <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-border-bright/60 z-10" />

          {/* HUD */}
          <div className="absolute top-3 left-3 z-30 font-mono text-2xs tracking-mono uppercase text-muted-foreground pointer-events-none">
            QOD-IV ▸ ORBITAL/{String(active + 1).padStart(2, "0")}
          </div>
          <div className="absolute top-3 right-3 z-30 font-mono text-2xs tracking-mono uppercase text-accent pointer-events-none">
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-ticker" />
              ORBITAL LOCK
            </span>
          </div>

          {/* Planet stage */}
          <div className="relative w-full" style={{ height: 480 }}>
            <PlanetStage planet={planet} reduced={reduced} indexKey={active} />
          </div>

          {/* Selector strip — bottom — explicit "click to focus" affordance */}
          <div className="relative border-t border-border bg-background/70 backdrop-blur-md">
            <div className="px-4 py-2 border-b border-border/60 flex items-center justify-between">
              <span className="font-mono text-2xs tracking-mono uppercase text-muted-foreground">
                Select discipline ↓
              </span>
              <span className="font-mono text-2xs tracking-mono uppercase text-muted-foreground hidden md:inline">
                ← → keyboard navigate
              </span>
            </div>
            <div className="flex overflow-x-auto">
              {PLANETS.map((p, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={p.code}
                    onClick={() => setActive(i)}
                    className={`group relative flex-1 min-w-[160px] px-4 py-5 text-left transition-all ${
                      isActive ? "bg-surface-1" : "hover:bg-surface-1/50"
                    } ${i > 0 ? "border-l border-border" : ""}`}
                    aria-current={isActive}
                  >
                    {/* active indicator bar */}
                    {isActive && (
                      <motion.span
                        layoutId="planetActiveBar"
                        className="absolute top-0 left-0 right-0 h-0.5"
                        style={{ background: `hsl(${p.hue} 80% 60%)`, boxShadow: `0 0 12px hsl(${p.hue} 80% 60% / 0.7)` }}
                      />
                    )}
                    <div className="flex items-center gap-3">
                      <span
                        className="h-2.5 w-2.5 rounded-full transition-all flex-shrink-0"
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
                        <div className={`font-display text-sm truncate transition-colors ${isActive ? "text-foreground" : "text-foreground-dim group-hover:text-foreground"}`}>
                          {p.name}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Below-stage detail row */}
        <AnimatePresence mode="wait">
          <motion.div
            key={planet.code}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="mt-8 grid md:grid-cols-12 gap-6"
          >
            <div className="md:col-span-7">
              <div className="font-mono text-2xs tracking-mono uppercase text-accent mb-2">
                {planet.code} · {planet.spec}
              </div>
              <h3 className="font-display text-2xl md:text-3xl text-foreground">{planet.name}</h3>
              <p className="mt-2 text-foreground-dim leading-relaxed max-w-2xl">{planet.desc}</p>
            </div>
            <div className="md:col-span-5 flex items-center md:justify-end gap-2 font-mono text-2xs tracking-mono uppercase text-muted-foreground">
              <span>← →</span>
              <span>navigate orbits</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* =====================================================================
   PlanetStage — the focused planet + readable bullet cards
   ===================================================================== */

function PlanetStage({ planet, reduced, indexKey }: { planet: Planet; reduced: boolean; indexKey: number }) {
  const [spin, setSpin] = useState(0);
  const [tilt, setTilt] = useState({ x: -12, y: 0 });
  const stageRef = useRef<HTMLDivElement>(null);

  // Slow auto spin + subtle parallax tilt from cursor
  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    let last = performance.now();
    const tick = (t: number) => {
      const dt = (t - last) / 1000;
      last = t;
      setSpin((s) => (s + 8 * dt) % 360);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  useEffect(() => {
    const el = stageRef.current;
    if (!el || reduced) return;
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = (e.clientX - rect.left) / rect.width - 0.5;
      const cy = (e.clientY - rect.top) / rect.height - 0.5;
      setTilt({ x: -12 - cy * 8, y: cx * 14 });
    };
    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, [reduced]);

  const PLANET_SIZE = 200;

  return (
    <div ref={stageRef} className="absolute inset-0 grid place-items-center [perspective:1600px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={planet.code}
          initial={{ scale: 0.6, opacity: 0, rotateY: -45 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          exit={{ scale: 0.6, opacity: 0, rotateY: 45 }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Halo */}
          <span
            aria-hidden
            className="absolute inset-0 rounded-full"
            style={{
              width: PLANET_SIZE, height: PLANET_SIZE,
              left: -PLANET_SIZE / 2, top: -PLANET_SIZE / 2,
              boxShadow: `0 0 80px hsl(${planet.hue} 80% 55% / 0.55), 0 0 160px hsl(${planet.hue} 80% 55% / 0.25)`,
            }}
          />

          {/* Saturn-style ring */}
          {planet.ring && (
            <span
              aria-hidden
              className="absolute rounded-full border-2 pointer-events-none"
              style={{
                width: PLANET_SIZE * 1.7,
                height: PLANET_SIZE * 0.42,
                left: -(PLANET_SIZE * 1.7) / 2,
                top: -(PLANET_SIZE * 0.42) / 2,
                borderColor: `hsl(${planet.hue} 70% 60% / 0.55)`,
                transform: `rotateX(${72 + tilt.x * 0.3}deg) rotateZ(${tilt.y * 0.3}deg)`,
                transformStyle: "preserve-3d",
                boxShadow: `0 0 24px hsl(${planet.hue} 70% 50% / 0.4)`,
              }}
            />
          )}

          {/* Planet body */}
          <div
            className="relative"
            style={{
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transformStyle: "preserve-3d",
              transition: "transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)",
            }}
          >
            <PlanetSphere hue={planet.hue} size={PLANET_SIZE} rotateY={spin} rotateX={0} />
          </div>

          {/* Bullet cards — fixed positions in a horseshoe around the planet */}
          <BulletCards bullets={planet.bullets} hue={planet.hue} planetSize={PLANET_SIZE} indexKey={indexKey} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* =====================================================================
   BulletCards — readable cards in fixed horseshoe positions
   ===================================================================== */

function BulletCards({
  bullets, hue, planetSize, indexKey,
}: { bullets: string[]; hue: number; planetSize: number; indexKey: number }) {
  // Fixed positions around planet — top-left, top-right, bottom-left, bottom-right
  // Use translate from the planet center
  const positions = useMemo(() => {
    const r = planetSize;
    return [
      { x: -r * 1.05, y: -r * 0.55, depth: -30 },  // top-left
      { x:  r * 1.05, y: -r * 0.55, depth: -15 },  // top-right
      { x: -r * 0.95, y:  r * 0.6,  depth:  15 },  // bottom-left
      { x:  r * 0.95, y:  r * 0.6,  depth:  30 },  // bottom-right
    ];
  }, [planetSize]);

  return (
    <>
      {bullets.slice(0, 4).map((b, i) => {
        const pos = positions[i];
        return (
          <motion.div
            key={`${indexKey}-${i}`}
            initial={{ opacity: 0, x: pos.x * 0.4, y: pos.y * 0.4 }}
            animate={{ opacity: 1, x: pos.x, y: pos.y }}
            transition={{ duration: 0.6, delay: 0.15 + i * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
            className="absolute pointer-events-none"
            style={{
              left: 0, top: 0,
              transform: `translate3d(0, 0, ${pos.depth}px)`,
              transformStyle: "preserve-3d",
            }}
          >
            <div
              className="relative -translate-x-1/2 -translate-y-1/2 px-4 py-2.5 rounded-sm bg-background/95 backdrop-blur-xl border whitespace-nowrap"
              style={{
                borderColor: `hsl(${hue} 70% 55% / 0.55)`,
                boxShadow: `0 0 24px hsl(${hue} 70% 50% / 0.35), 0 8px 32px hsl(230 40% 2% / 0.6), inset 0 1px 0 hsl(0 0% 100% / 0.06)`,
              }}
            >
              {/* connector line back to planet */}
              <span
                aria-hidden
                className="absolute top-1/2 h-px"
                style={{
                  background: `linear-gradient(90deg, transparent, hsl(${hue} 70% 60% / 0.7))`,
                  width: Math.abs(pos.x) * 0.3,
                  ...(pos.x < 0
                    ? { right: "100%", transform: "translateY(-50%)" }
                    : { left: "100%", transform: "translateY(-50%) scaleX(-1)" }),
                }}
              />
              <span className="font-mono text-[11px] tracking-mono uppercase text-foreground font-medium">
                <span className="mr-2" style={{ color: `hsl(${hue} 80% 70%)` }}>◇</span>
                {b}
              </span>
            </div>
          </motion.div>
        );
      })}
    </>
  );
}

/* =====================================================================
   PlanetSphere — CSS-only "3D" sphere with banding + terminator
   ===================================================================== */

function PlanetSphere({ hue, size, rotateX, rotateY }: { hue: number; size: number; rotateX: number; rotateY: number }) {
  const bg = useMemo(() => {
    const c1 = `hsl(${hue} 75% 62%)`;
    const c2 = `hsl(${hue} 70% 42%)`;
    const c3 = `hsl(${hue} 65% 22%)`;
    const c4 = `hsl(${hue} 55% 8%)`;
    return `
      radial-gradient(circle at 32% 28%, ${c1} 0%, ${c2} 30%, ${c3} 62%, ${c4} 100%),
      repeating-linear-gradient(45deg, hsl(${hue} 60% 30% / 0.18) 0 6px, transparent 6px 14px),
      repeating-linear-gradient(-30deg, hsl(${hue} 80% 60% / 0.14) 0 4px, transparent 4px 10px)
    `;
  }, [hue]);

  return (
    <div
      className="relative rounded-full overflow-hidden"
      style={{
        width: size,
        height: size,
        background: bg,
        backgroundSize: "100% 100%, 200% 100%, 200% 100%",
        backgroundPosition: `0 0, ${rotateY % 360}% 0, ${(rotateY * 1.4) % 360}% 0`,
        transform: `rotateX(${rotateX}deg)`,
        transformStyle: "preserve-3d",
        boxShadow: `inset -${size * 0.15}px -${size * 0.18}px ${size * 0.4}px hsl(${hue} 60% 4% / 0.85), inset ${size * 0.06}px ${size * 0.06}px ${size * 0.2}px hsl(${hue} 90% 75% / 0.35)`,
      }}
    >
      {/* specular highlight */}
      <span
        aria-hidden
        className="absolute rounded-full"
        style={{
          width: size * 0.32,
          height: size * 0.22,
          left: size * 0.18,
          top: size * 0.14,
          background: "radial-gradient(ellipse at center, hsl(0 0% 100% / 0.45), transparent 70%)",
          filter: "blur(6px)",
        }}
      />
    </div>
  );
}

/* =====================================================================
   Starfield
   ===================================================================== */

function Starfield() {
  const stars = useMemo(() => {
    return new Array(80).fill(0).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.6 + 0.2,
      delay: Math.random() * 4,
    }));
  }, []);
  return (
    <div className="absolute inset-0">
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-foreground animate-ticker"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            opacity: s.opacity,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
