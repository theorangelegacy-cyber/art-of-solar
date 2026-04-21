import { useEffect, useState } from "react";
import { AlienBlob, UFO, SpaceBat } from "./AlienCharacters";

/* =====================================================================
   AlienOverlay — global pointer-events-none layer of alien shenanigans.
   - Edge peekers (corners of the viewport, blink + wave)
   - Background falling/drifting aliens (parallax)
   - UFO flyby (random interval)
   - UFO laser duel with a Space Bat (scripted scene)
   Disabled on prefers-reduced-motion.
   ===================================================================== */

export default function AlienOverlay() {
  const [enabled, setEnabled] = useState(false);
  const [ufoTrip, setUfoTrip] = useState(0);
  const [duel, setDuel] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setEnabled(true);

    // Trigger periodic UFO flyby every ~22s
    const ufoTimer = window.setInterval(() => setUfoTrip((n) => n + 1), 22000);
    // Trigger laser duel every ~38s, offset
    const duelTimer = window.setInterval(() => setDuel((n) => n + 1), 38000);
    // First trips after short delay
    const k1 = window.setTimeout(() => setUfoTrip(1), 6000);
    const k2 = window.setTimeout(() => setDuel(1), 14000);
    return () => {
      clearInterval(ufoTimer); clearInterval(duelTimer);
      clearTimeout(k1); clearTimeout(k2);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden" aria-hidden>
      {/* === BACKGROUND DRIFTERS (behind content) === */}
      <div className="absolute inset-0 -z-10">
        {[
          { left: "8%",  delay:  "0s",  dur: "26s", scale: 0.35, tone: "green" as const },
          { left: "28%", delay:  "6s",  dur: "32s", scale: 0.25, tone: "orange" as const },
          { left: "55%", delay: "12s",  dur: "28s", scale: 0.30, tone: "violet" as const },
          { left: "78%", delay:  "3s",  dur: "34s", scale: 0.22, tone: "green" as const },
          { left: "90%", delay: "18s",  dur: "30s", scale: 0.28, tone: "orange" as const },
        ].map((d, i) => (
          <div
            key={i}
            className="absolute -top-20 opacity-30"
            style={{
              left: d.left,
              animation: `alien-drift ${d.dur} linear ${d.delay} infinite`,
              transform: `scale(${d.scale})`,
            }}
          >
            <AlienBlob className="h-24 w-20" tone={d.tone} />
          </div>
        ))}
      </div>

      {/* === EDGE PEEKERS === */}
      {/* Bottom-left peeker — pops up periodically */}
      <div className="absolute bottom-0 left-2 md:left-6" style={{ animation: "alien-peek-bl 14s ease-in-out infinite" }}>
        <div style={{ animation: "alien-wobble 2.4s ease-in-out infinite" }}>
          <AlienBlob className="h-20 w-16 md:h-24 md:w-20" tone="green" />
        </div>
      </div>

      {/* Bottom-right peeker — slower */}
      <div className="absolute bottom-0 right-2 md:right-6" style={{ animation: "alien-peek-br 19s ease-in-out infinite", animationDelay: "5s" }}>
        <div style={{ animation: "alien-wobble 3.1s ease-in-out infinite" }}>
          <AlienBlob className="h-16 w-14 md:h-20 md:w-16" tone="orange" />
        </div>
      </div>

      {/* Top-right corner peeker — peeks down, waves */}
      <div className="absolute top-14 right-3 md:top-20 md:right-8 hidden sm:block" style={{ animation: "alien-peek-tr 24s ease-in-out infinite", animationDelay: "9s" }}>
        <AlienBlob className="h-14 w-12" tone="violet" />
      </div>

      {/* === UFO FLYBY (left → right, with abducting beam) === */}
      {ufoTrip > 0 && (
        <div
          key={`ufo-${ufoTrip}`}
          className="absolute"
          style={{
            top: `${15 + ((ufoTrip * 13) % 30)}%`,
            left: 0,
            animation: "ufo-flyby 14s cubic-bezier(0.25, 0.65, 0.4, 1) forwards",
          }}
        >
          <div style={{ animation: "ufo-bob 2.2s ease-in-out infinite" }}>
            <UFO className="h-20 w-36 md:h-24 md:w-44" />
          </div>
        </div>
      )}

      {/* === LASER DUEL: UFO vs SpaceBat === */}
      {duel > 0 && (
        <div key={`duel-${duel}`} className="absolute inset-0">
          {/* UFO comes in from top-left, parks */}
          <div
            className="absolute"
            style={{
              top: "12%",
              left: "8%",
              animation: "duel-ufo 12s ease-out forwards",
            }}
          >
            <UFO className="h-20 w-36 md:h-24 md:w-44" beam={false} />
          </div>

          {/* Bat enters from bottom-right, flaps in */}
          <div
            className="absolute"
            style={{
              bottom: "18%",
              right: "10%",
              animation: "duel-bat 12s ease-out forwards",
            }}
          >
            <SpaceBat className="h-14 w-20 md:h-16 md:w-24" />
          </div>

          {/* Laser beam — fires after UFO + bat are in position */}
          <svg className="absolute inset-0 h-full w-full" style={{ animation: "duel-laser 12s linear forwards", opacity: 0 }}>
            <defs>
              <linearGradient id="laser-grad" x1="0" x2="1">
                <stop offset="0%"   stopColor="hsl(var(--primary))" stopOpacity="0" />
                <stop offset="20%"  stopColor="hsl(var(--primary))" stopOpacity="1" />
                <stop offset="80%"  stopColor="hsl(var(--accent))"  stopOpacity="1" />
                <stop offset="100%" stopColor="hsl(var(--accent))"  stopOpacity="0" />
              </linearGradient>
            </defs>
            <line
              x1="14%" y1="20%" x2="86%" y2="74%"
              stroke="url(#laser-grad)" strokeWidth="2.5" strokeLinecap="round"
              style={{ filter: "drop-shadow(0 0 6px hsl(var(--primary)))" }}
            />
            {/* explosion at bat */}
            <g style={{ animation: "duel-boom 12s linear forwards", opacity: 0, transformOrigin: "86% 74%" }}>
              <circle cx="86%" cy="74%" r="14" fill="hsl(var(--primary) / 0.4)" />
              <circle cx="86%" cy="74%" r="6"  fill="hsl(var(--accent))" />
              {[...Array(8)].map((_, i) => {
                const a = (i / 8) * Math.PI * 2;
                return (
                  <line
                    key={i}
                    x1="86%" y1="74%"
                    x2={`${86 + Math.cos(a) * 4}%`}
                    y2={`${74 + Math.sin(a) * 6}%`}
                    stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round"
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
