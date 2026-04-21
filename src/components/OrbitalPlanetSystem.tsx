import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import quantumOrangeImg from "@/assets/quantum-orange.jpg";

/* =====================================================================
   OrbitalPlanetSystem
   - 5 planets orbit a central Quantum Orange "sun"
   - Click a planet → camera-zoom focus, planet enlarges, bullets become
     small cards orbiting it. Drag the focused planet to rotate (Google
     Earth style). Click sun / esc / X to return to system view.
   ===================================================================== */

type Planet = {
  code: string;
  name: string;
  hue: number;          // base hue for the planet surface
  ring?: boolean;
  size: number;         // diameter in px (system view)
  orbit: number;        // orbit radius in px
  period: number;       // seconds for one revolution
  phase: number;        // initial angle (deg)
  bullets: string[];
  spec: string;
  desc: string;
};

const PLANETS: Planet[] = [
  {
    code: "WD/01", name: "Site Architecture", hue: 22, size: 56, orbit: 130, period: 38, phase: 0,
    spec: "≤ 0.8s LCP · 100 Lighthouse",
    desc: "Conversion-engineered firm sites built like research instruments.",
    bullets: ["Sub-second LCP", "Schema-grade SEO", "Mobile-first IA", "Conversion math baked in"],
  },
  {
    code: "CB/02", name: "Intake Agent", hue: 152, size: 44, orbit: 195, period: 56, phase: 72, ring: true,
    spec: "9.4× intake throughput",
    desc: "On-brand AI agents that intake, qualify, and route 24/7.",
    bullets: ["Branded voice profile", "Live qualification", "Calendar handoff in-thread", "Transcript → CRM"],
  },
  {
    code: "AT/03", name: "Workflow Substrate", hue: 195, size: 64, orbit: 270, period: 78, phase: 144,
    spec: "≤ 3s end-to-end",
    desc: "Event-driven automations that draft, file, follow up, reconcile.",
    bullets: ["Intake → retainer flow", "Auto-drafted letters", "Status reconciliation", "Sub-3s latency"],
  },
  {
    code: "CR/04", name: "CRM Topology", hue: 38, size: 50, orbit: 345, period: 102, phase: 216, ring: true,
    spec: "+34% close rate",
    desc: "Pipelines tuned to family-law lifecycles with full attribution.",
    bullets: ["Custom stages + scoring", "Referral attribution", "Weekly intelligence brief", "Zero-downtime migration"],
  },
  {
    code: "FL/05", name: "Family Law OS", hue: 270, size: 72, orbit: 425, period: 134, phase: 288,
    spec: "Single source of truth",
    desc: "Matter, document, billing, and portal stack — purpose-built.",
    bullets: ["Matter timeline", "Secure portal + e-sign", "Document assembly", "Trust accounting"],
  },
];

export default function OrbitalPlanetSystem() {
  const [focused, setFocused] = useState<number | null>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setFocused(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const focusedPlanet = focused !== null ? PLANETS[focused] : null;

  return (
    <section className="relative py-20 md:py-24 border-t border-border overflow-hidden">
      {/* starfield */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-fine opacity-[0.04]" />
        <Starfield />
      </div>

      <div className="container">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 font-mono text-2xs tracking-mono uppercase text-accent mb-3">
              <span className="text-muted-foreground">§ 02</span>
              <span className="h-px w-8 bg-accent/50" />
              <span>Orbital System · Live</span>
            </div>
            <h2 className="font-display text-2xl md:text-4xl text-foreground leading-[1.05]">
              Five disciplines. <span className="font-serif-italic">One gravitational field.</span>
            </h2>
            <p className="mt-3 text-foreground-dim text-sm md:text-base max-w-xl">
              Click any planet to enter its orbit. Drag to rotate.
            </p>
          </div>
          <div className="flex items-center gap-4 font-mono text-2xs tracking-mono uppercase text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-ticker" />
              {focused === null ? "System view" : `Focused · ${focusedPlanet?.code}`}
            </span>
          </div>
        </div>

        {/* Stage */}
        <div className="relative w-full aspect-square md:aspect-[16/10] max-h-[820px] border border-border bg-background-deep/60 overflow-hidden">
          {/* corner ticks */}
          <span className="absolute top-0 left-0 h-3 w-3 border-t border-l border-border-bright/60" />
          <span className="absolute top-0 right-0 h-3 w-3 border-t border-r border-border-bright/60" />
          <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-border-bright/60" />
          <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-border-bright/60" />

          {/* HUD overlay */}
          <div className="absolute top-3 left-3 z-30 font-mono text-2xs tracking-mono uppercase text-muted-foreground pointer-events-none">
            QOD-IV ▸ ORBITAL/05
          </div>
          <div className="absolute top-3 right-3 z-30 font-mono text-2xs tracking-mono uppercase text-accent pointer-events-none">
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-ticker" />
              {focused === null ? "OBSERVING SYSTEM" : "ORBITAL LOCK"}
            </span>
          </div>
          <div className="absolute bottom-3 left-3 z-30 font-mono text-2xs tracking-mono-tight text-muted-foreground/70 pointer-events-none">
            DRAG · ROTATE  ·  CLICK · FOCUS  ·  ESC · RELEASE
          </div>

          {/* The orbital scene */}
          <SystemView
            focused={focused}
            onFocus={(i) => setFocused(i)}
            onRelease={() => setFocused(null)}
            reduced={reduced}
          />
        </div>

        {/* Sub-panel: focused detail (echoes side panel) */}
        <AnimatePresence mode="wait">
          {focusedPlanet && (
            <motion.div
              key={focusedPlanet.code}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.4 }}
              className="mt-6 border border-border p-6 md:p-8 grid md:grid-cols-12 gap-6 bg-surface-1/40"
            >
              <div className="md:col-span-7">
                <div className="font-mono text-2xs tracking-mono uppercase text-accent mb-2">{focusedPlanet.code} · {focusedPlanet.spec}</div>
                <h3 className="font-display text-2xl md:text-3xl text-foreground">{focusedPlanet.name}</h3>
                <p className="mt-2 text-foreground-dim leading-relaxed max-w-2xl">{focusedPlanet.desc}</p>
              </div>
              <div className="md:col-span-5 flex items-center justify-end">
                <button
                  onClick={() => setFocused(null)}
                  className="inline-flex items-center gap-3 rounded-sm border border-border px-4 py-2.5 font-mono text-2xs tracking-mono uppercase text-foreground hover:border-accent hover:text-accent transition-all"
                >
                  ← Return to system
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* =====================================================================
   SystemView — the actual orbital stage
   ===================================================================== */

function SystemView({
  focused, onFocus, onRelease, reduced,
}: {
  focused: number | null;
  onFocus: (i: number) => void;
  onRelease: () => void;
  reduced: boolean;
}) {
  const stageRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={stageRef}
      className="absolute inset-0 grid place-items-center [perspective:1400px]"
    >
      {/* Sun (center) — actual high-def quantum orange */}
      <button
        onClick={onRelease}
        aria-label="Return to system view"
        className="absolute z-20 group"
        style={{
          width: 120, height: 120, borderRadius: "9999px",
          transition: "transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)",
          transform: focused !== null ? "scale(0.55)" : "scale(1)",
          filter: "drop-shadow(0 0 24px hsl(var(--primary) / 0.55)) drop-shadow(0 0 48px hsl(28 100% 62% / 0.25))",
        }}
      >
        <img
          src={quantumOrangeImg}
          alt=""
          width={240}
          height={240}
          className="absolute inset-0 h-full w-full rounded-full object-cover animate-spin-slow"
          style={{ animationDuration: "80s" }}
          draggable={false}
        />
        <span aria-hidden className="absolute inset-0 rounded-full" style={{ boxShadow: "inset 0 0 28px hsl(28 100% 62% / 0.35)" }} />
        <span aria-hidden className="absolute -inset-3 rounded-full border border-accent/40 animate-spin-slow" style={{ borderStyle: "dashed" }} />
        <span aria-hidden className="absolute -inset-7 rounded-full border border-primary/20 animate-spin-slow" style={{ borderStyle: "dashed", animationDuration: "60s", animationDirection: "reverse" }} />
        <span className="sr-only">Quantum Orange · core</span>
      </button>

      {/* Orbit rings — fade out when focused */}
      <div
        className="absolute inset-0 grid place-items-center pointer-events-none transition-opacity duration-500"
        style={{ opacity: focused === null ? 1 : 0.15 }}
      >
        {PLANETS.map((p, i) => (
          <div
            key={`ring-${i}`}
            className="absolute rounded-full border border-border"
            style={{
              width: p.orbit * 2,
              height: p.orbit * 2,
              borderStyle: "dashed",
              borderColor: "hsl(var(--border) / 0.6)",
            }}
          />
        ))}
      </div>

      {/* Planets */}
      {PLANETS.map((p, i) => (
        <PlanetNode
          key={p.code}
          planet={p}
          index={i}
          isFocused={focused === i}
          isOtherFocused={focused !== null && focused !== i}
          onFocus={() => onFocus(i)}
          reduced={reduced}
        />
      ))}
    </div>
  );
}

/* =====================================================================
   PlanetNode — orbits the sun, scales up + decouples on focus
   ===================================================================== */

function PlanetNode({
  planet: p, index, isFocused, isOtherFocused, onFocus, reduced,
}: {
  planet: Planet;
  index: number;
  isFocused: boolean;
  isOtherFocused: boolean;
  onFocus: () => void;
  reduced: boolean;
}) {
  // Orbit angle (deg) — driven by RAF when not focused
  const [angle, setAngle] = useState(p.phase);
  // Self-rotation angle (deg)
  const [spin, setSpin] = useState(0);
  // User-controlled rotation (drag) when focused
  const [dragRot, setDragRot] = useState({ x: -8, y: 0 });
  const dragState = useRef<{ active: boolean; lx: number; ly: number }>({ active: false, lx: 0, ly: 0 });

  // Animate orbit + spin
  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    let last = performance.now();
    const tick = (t: number) => {
      const dt = (t - last) / 1000;
      last = t;
      if (!isFocused) {
        setAngle((a) => (a + (360 / p.period) * dt) % 360);
      }
      if (!dragState.current.active) {
        setSpin((s) => (s + (isFocused ? 8 : 18) * dt) % 360);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isFocused, p.period, reduced]);

  // Drag handlers (only when focused)
  const onPointerDown = (e: React.PointerEvent) => {
    if (!isFocused) return;
    (e.target as Element).setPointerCapture(e.pointerId);
    dragState.current = { active: true, lx: e.clientX, ly: e.clientY };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragState.current.active) return;
    const dx = e.clientX - dragState.current.lx;
    const dy = e.clientY - dragState.current.ly;
    dragState.current.lx = e.clientX;
    dragState.current.ly = e.clientY;
    setDragRot((r) => ({ x: clamp(r.x - dy * 0.5, -60, 60), y: r.y + dx * 0.6 }));
  };
  const onPointerUp = (e: React.PointerEvent) => {
    dragState.current.active = false;
    try { (e.target as Element).releasePointerCapture(e.pointerId); } catch {}
  };

  // Position of the planet within the system
  // - Default: orbit position around (0,0)
  // - Focused: snap to center, scale up
  const orbitX = Math.cos((angle * Math.PI) / 180) * p.orbit;
  const orbitY = Math.sin((angle * Math.PI) / 180) * p.orbit * 0.35; // squashed for ellipse perspective

  const focusScale = isFocused ? Math.min(2.6, 220 / p.size) : 1;
  const surfaceSize = p.size * focusScale;

  return (
    <motion.div
      className="absolute"
      animate={{
        x: isFocused ? 0 : orbitX,
        y: isFocused ? 0 : orbitY,
        opacity: isOtherFocused ? 0.12 : 1,
        filter: isOtherFocused ? "blur(2px)" : "blur(0px)",
      }}
      transition={
        isFocused
          ? { duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }
          : { duration: 0 } // RAF-driven
      }
      style={{ left: "50%", top: "50%", marginLeft: -surfaceSize / 2, marginTop: -surfaceSize / 2, zIndex: isFocused ? 25 : 10 }}
    >
      <div
        onClick={() => !isFocused && onFocus()}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        data-cursor="pointer"
        className={`relative grid place-items-center transition-[width,height] duration-700 ease-out ${isFocused ? "cursor-grab active:cursor-grabbing" : "cursor-pointer"}`}
        style={{
          width: surfaceSize,
          height: surfaceSize,
          touchAction: isFocused ? "none" : "auto",
        }}
      >
        {/* Glow halo */}
        <span
          aria-hidden
          className="absolute inset-0 rounded-full transition-all duration-700"
          style={{
            boxShadow: isFocused
              ? `0 0 60px hsl(${p.hue} 80% 55% / 0.55), 0 0 120px hsl(${p.hue} 80% 55% / 0.25)`
              : `0 0 18px hsl(${p.hue} 70% 50% / 0.35)`,
          }}
        />

        {/* Optional ring (Saturn-style) */}
        {p.ring && (
          <span
            aria-hidden
            className="absolute rounded-full border-2"
            style={{
              width: surfaceSize * 1.7,
              height: surfaceSize * 0.42,
              borderColor: `hsl(${p.hue} 70% 60% / 0.55)`,
              transform: `rotateX(${isFocused ? 70 + dragRot.x : 70}deg) rotateZ(${isFocused ? -dragRot.y * 0.4 : 0}deg)`,
              transformStyle: "preserve-3d",
            }}
          />
        )}

        {/* Planet body */}
        <PlanetSphere
          hue={p.hue}
          size={surfaceSize}
          rotateY={isFocused ? dragRot.y : spin}
          rotateX={isFocused ? dragRot.x : -8}
        />

        {/* Label (system view) */}
        {!isFocused && (
          <div
            className="absolute whitespace-nowrap pointer-events-none"
            style={{ top: surfaceSize + 8, left: "50%", transform: "translateX(-50%)" }}
          >
            <div className="font-mono text-2xs tracking-mono uppercase text-accent">{p.code}</div>
            <div className="font-mono text-2xs tracking-mono-tight text-muted-foreground text-center mt-0.5">{p.name}</div>
          </div>
        )}

        {/* Orbiting bullet cards (focus view) */}
        {isFocused && (
          <OrbitingCards bullets={p.bullets} radius={surfaceSize * 0.85} hue={p.hue} reduced={reduced} />
        )}
      </div>
    </motion.div>
  );
}

/* =====================================================================
   PlanetSphere — CSS-only "3D" sphere with banding + terminator
   ===================================================================== */

function PlanetSphere({ hue, size, rotateX, rotateY }: { hue: number; size: number; rotateX: number; rotateY: number }) {
  // Procedural surface using layered radial + linear gradients tinted by hue.
  // The "rotateY" shifts a background-position for a parallax look.
  const bg = useMemo(() => {
    const c1 = `hsl(${hue} 75% 62%)`;
    const c2 = `hsl(${hue} 70% 42%)`;
    const c3 = `hsl(${hue} 65% 22%)`;
    const c4 = `hsl(${hue} 55% 12%)`;
    return `
      radial-gradient(circle at 32% 30%, ${c1} 0%, ${c2} 28%, ${c3} 60%, ${c4} 100%),
      repeating-linear-gradient(${45}deg, hsl(${hue} 60% 30% / 0.18) 0 6px, transparent 6px 14px),
      repeating-linear-gradient(${-30}deg, hsl(${hue} 80% 60% / 0.14) 0 4px, transparent 4px 10px)
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
        transition: "transform 0.05s linear",
      }}
    >
      {/* Atmosphere rim */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-full"
        style={{
          boxShadow: `inset 0 0 ${size * 0.22}px hsl(${hue} 90% 80% / 0.35), inset 0 0 ${size * 0.5}px hsl(${hue} 80% 10% / 0.6)`,
        }}
      />
      {/* Day/night terminator */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle at 30% 30%, transparent 35%, hsl(230 40% 5% / 0.7) 90%)",
        }}
      />
      {/* Specular highlight */}
      <span
        aria-hidden
        className="absolute rounded-full"
        style={{
          width: size * 0.28, height: size * 0.18,
          left: size * 0.18, top: size * 0.16,
          background: `radial-gradient(ellipse, hsl(${hue} 100% 92% / 0.55), transparent 70%)`,
          filter: "blur(2px)",
        }}
      />
    </div>
  );
}

/* =====================================================================
   OrbitingCards — bullets as small panels orbiting the focused planet
   ===================================================================== */

function OrbitingCards({ bullets, radius, hue, reduced }: { bullets: string[]; radius: number; hue: number; reduced: boolean }) {
  const [t, setT] = useState(0);

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      setT((now - start) / 1000);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  const orbitRadius = radius + 80;

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ transformStyle: "preserve-3d" }}>
      {bullets.map((b, i) => {
        const baseAngle = (i / bullets.length) * Math.PI * 2;
        const angle = baseAngle + t * 0.25;
        const x = Math.cos(angle) * orbitRadius;
        const y = Math.sin(angle) * orbitRadius * 0.42;
        const depth = Math.sin(angle); // -1 (back) to 1 (front)
        const scale = 0.85 + (depth + 1) * 0.18;
        const opacity = 0.35 + (depth + 1) * 0.32;

        return (
          <div
            key={i}
            className="absolute left-1/2 top-1/2"
            style={{
              transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
              opacity,
              zIndex: depth > 0 ? 30 : 5,
              transition: "opacity 0.3s",
            }}
          >
            <div
              className="px-3 py-2 border bg-background/90 backdrop-blur-sm"
              style={{
                borderColor: `hsl(${hue} 70% 50% / 0.5)`,
                boxShadow: depth > 0 ? `0 0 16px hsl(${hue} 70% 50% / 0.3)` : "none",
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="font-mono text-2xs tracking-mono uppercase whitespace-nowrap" style={{ color: `hsl(${hue} 80% 75%)` }}>
                ◇ {b}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* =====================================================================
   Starfield — sparse twinkling stars behind the system
   ===================================================================== */

function Starfield() {
  const stars = useMemo(() => {
    return Array.from({ length: 80 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      r: Math.random() * 1.2 + 0.3,
      d: Math.random() * 4 + 2,
      g: Math.random() * 4,
    }));
  }, []);
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
      {stars.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.r * 0.15} fill="hsl(var(--foreground) / 0.7)">
          <animate attributeName="opacity" values="0.2;1;0.2" dur={`${s.d}s`} begin={`${s.g}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </svg>
  );
}

/* utils */
function clamp(n: number, min: number, max: number) { return Math.max(min, Math.min(max, n)); }
