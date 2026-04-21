import { useEffect, useState } from "react";
import { AlienBlob, UFO, SpaceBat } from "./AlienCharacters";

/* =====================================================================
   AlienOverlay v3 — subtle, premium, less cluttered.
   Fewer concurrent elements, smaller scale, softer opacity, longer intervals.
   ===================================================================== */

export default function AlienOverlay() {
  const [enabled, setEnabled] = useState(false);
  const [ufoTrip, setUfoTrip] = useState(0);
  const [duel, setDuel] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setEnabled(true);

    const ufoTimer = window.setInterval(() => setUfoTrip((n) => n + 1), 38000);
    const duelTimer = window.setInterval(() => setDuel((n) => n + 1), 65000);
    const k1 = window.setTimeout(() => setUfoTrip(1), 12000);
    const k2 = window.setTimeout(() => setDuel(1), 28000);
    return () => {
      clearInterval(ufoTimer); clearInterval(duelTimer);
      clearTimeout(k1); clearTimeout(k2);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden" aria-hidden>
      {/* === DRIFTERS — fewer, slower, much softer === */}
      <div className="absolute inset-0 -z-10">
        {[
          { left: "12%", delay:  "0s",  dur: "48s", scale: 0.20, tone: "green"  as const, opacity: 0.18 },
          { left: "62%", delay: "18s",  dur: "56s", scale: 0.16, tone: "violet" as const, opacity: 0.14 },
          { left: "85%", delay:  "9s",  dur: "52s", scale: 0.18, tone: "orange" as const, opacity: 0.16 },
        ].map((d, i) => (
          <div
            key={i}
            className="absolute -top-20"
            style={{
              left: d.left,
              opacity: d.opacity,
              animation: `alien-drift ${d.dur} linear ${d.delay} infinite`,
              transform: `scale(${d.scale})`,
              filter: "blur(0.4px)",
            }}
          >
            <AlienBlob className="h-24 w-20" tone={d.tone} />
          </div>
        ))}
      </div>

      {/* === EDGE PEEKERS — small, classy === */}
      <div className="absolute bottom-0 left-2 md:left-6 opacity-90" style={{ animation: "alien-peek-bl 22s ease-in-out infinite" }}>
        <div style={{ animation: "alien-wobble 3s ease-in-out infinite" }}>
          <AlienBlob className="h-14 w-12 md:h-16 md:w-14" tone="green" />
        </div>
      </div>

      <div className="absolute bottom-0 right-2 md:right-6 opacity-90" style={{ animation: "alien-peek-br 28s ease-in-out infinite", animationDelay: "9s" }}>
        <div style={{ animation: "alien-wobble 3.6s ease-in-out infinite" }}>
          <AlienBlob className="h-12 w-10 md:h-14 md:w-12" tone="orange" />
        </div>
      </div>

      {/* === UFO FLYBY === */}
      {ufoTrip > 0 && (
        <div
          key={`ufo-${ufoTrip}`}
          className="absolute"
          style={{
            top: `${18 + ((ufoTrip * 13) % 24)}%`,
            left: 0,
            animation: "ufo-flyby 16s cubic-bezier(0.25, 0.65, 0.4, 1) forwards",
            opacity: 0.92,
          }}
        >
          <div style={{ animation: "ufo-bob 2.4s ease-in-out infinite" }}>
            <UFO className="h-16 w-28 md:h-20 md:w-36" />
          </div>
        </div>
      )}

      {/* === LASER DUEL === */}
      {duel > 0 && (
        <div key={`duel-${duel}`} className="absolute inset-0">
          <div
            className="absolute"
            style={{
              top: "14%",
              left: "10%",
              animation: "duel-ufo 14s ease-out forwards",
            }}
          >
            <UFO className="h-16 w-28 md:h-20 md:w-36" beam={false} />
          </div>

          <div
            className="absolute"
            style={{
              bottom: "20%",
              right: "12%",
              animation: "duel-bat 14s ease-out forwards",
            }}
          >
            <SpaceBat className="h-12 w-16 md:h-14 md:w-20" />
          </div>

          {/* Premium laser — thin, glowing, with bloom */}
          <svg className="absolute inset-0 h-full w-full" style={{ animation: "duel-laser 14s linear forwards", opacity: 0 }}>
            <defs>
              <linearGradient id="laser-grad-core" x1="0" x2="1">
                <stop offset="0%"   stopColor="#ffffff" stopOpacity="0" />
                <stop offset="15%"  stopColor="#ffffff" stopOpacity="1" />
                <stop offset="85%"  stopColor="#5dffb0" stopOpacity="1" />
                <stop offset="100%" stopColor="#5dffb0" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="laser-grad-glow" x1="0" x2="1">
                <stop offset="0%"   stopColor="hsl(var(--primary))" stopOpacity="0" />
                <stop offset="20%"  stopColor="hsl(var(--primary))" stopOpacity="0.7" />
                <stop offset="80%"  stopColor="hsl(var(--accent))"  stopOpacity="0.7" />
                <stop offset="100%" stopColor="hsl(var(--accent))"  stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* outer glow */}
            <line
              x1="16%" y1="22%" x2="84%" y2="72%"
              stroke="url(#laser-grad-glow)" strokeWidth="6" strokeLinecap="round"
              style={{ filter: "blur(3px)", opacity: 0.6 }}
            />
            {/* mid */}
            <line
              x1="16%" y1="22%" x2="84%" y2="72%"
              stroke="url(#laser-grad-glow)" strokeWidth="2.5" strokeLinecap="round"
              style={{ filter: "drop-shadow(0 0 4px hsl(var(--accent)))" }}
            />
            {/* hot core */}
            <line
              x1="16%" y1="22%" x2="84%" y2="72%"
              stroke="url(#laser-grad-core)" strokeWidth="0.8" strokeLinecap="round"
            />
            {/* impact burst */}
            <g style={{ animation: "duel-boom 14s linear forwards", opacity: 0, transformOrigin: "84% 72%" }}>
              <circle cx="84%" cy="72%" r="22" fill="hsl(var(--primary) / 0.25)" style={{ filter: "blur(4px)" }} />
              <circle cx="84%" cy="72%" r="12" fill="hsl(var(--accent) / 0.7)" style={{ filter: "blur(2px)" }} />
              <circle cx="84%" cy="72%" r="4"  fill="#ffffff" />
              {[...Array(10)].map((_, i) => {
                const a = (i / 10) * Math.PI * 2;
                return (
                  <line
                    key={i}
                    x1="84%" y1="72%"
                    x2={`${84 + Math.cos(a) * 5}%`}
                    y2={`${72 + Math.sin(a) * 7}%`}
                    stroke="hsl(var(--accent))" strokeWidth="1" strokeLinecap="round"
                    style={{ filter: "drop-shadow(0 0 3px hsl(var(--accent)))" }}
                  />
                );
              })}
            </g>
          </svg>
        </div>
      )}
    </div>
  );
}
