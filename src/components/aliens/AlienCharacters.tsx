/* =====================================================================
   Alien character SVG primitives — v3 refined: softer gradients,
   crisper line weights, premium feel.
   ===================================================================== */

type AlienProps = { className?: string; eyeBlink?: boolean; tone?: "green" | "orange" | "violet" };

export function AlienBlob({ className, tone = "green" }: AlienProps) {
  const body =
    tone === "orange" ? "hsl(19 100% 60%)" :
    tone === "violet" ? "hsl(265 75% 65%)" :
    "hsl(152 85% 55%)";
  const shadow =
    tone === "orange" ? "hsl(14 90% 22%)" :
    tone === "violet" ? "hsl(265 70% 25%)" :
    "hsl(152 90% 18%)";
  const hi =
    tone === "orange" ? "hsl(35 100% 80%)" :
    tone === "violet" ? "hsl(280 80% 82%)" :
    "hsl(152 100% 80%)";
  return (
    <svg viewBox="0 0 64 80" className={className} aria-hidden>
      <defs>
        <radialGradient id={`g-${tone}`} cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor={hi} />
          <stop offset="35%" stopColor={body} />
          <stop offset="100%" stopColor={shadow} />
        </radialGradient>
        <filter id={`glow-${tone}`}>
          <feGaussianBlur stdDeviation="1.2" />
        </filter>
      </defs>
      {/* antenna */}
      <line x1="32" y1="6" x2="32" y2="16" stroke={body} strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="32" cy="5" r="2.2" fill="hsl(var(--primary))" filter={`url(#glow-${tone})`}>
        <animate attributeName="r" values="2.2;3;2.2" dur="1.6s" repeatCount="indefinite" />
      </circle>
      {/* head — softer ellipse */}
      <ellipse cx="32" cy="32" rx="20" ry="22" fill={`url(#g-${tone})`} />
      {/* subtle specular */}
      <ellipse cx="24" cy="22" rx="6" ry="4" fill="hsl(0 0% 100% / 0.18)" filter={`url(#glow-${tone})`} />
      {/* cheek dots — softer */}
      <circle cx="18" cy="42" r="1.8" fill="hsl(var(--primary) / 0.5)" />
      <circle cx="46" cy="42" r="1.8" fill="hsl(var(--primary) / 0.5)" />
      {/* eyes */}
      <ellipse cx="25" cy="30" rx="4.2" ry="5.6" fill="hsl(230 50% 4%)" />
      <ellipse cx="39" cy="30" rx="4.2" ry="5.6" fill="hsl(230 50% 4%)" />
      <circle cx="26.2" cy="28" r="1.4" fill="hsl(0 0% 100%)" />
      <circle cx="40.2" cy="28" r="1.4" fill="hsl(0 0% 100%)" />
      <circle cx="24.8" cy="31" r="0.5" fill="hsl(0 0% 100% / 0.7)" />
      <circle cx="38.8" cy="31" r="0.5" fill="hsl(0 0% 100% / 0.7)" />
      {/* smile */}
      <path d="M 26 42 Q 32 47 38 42" stroke="hsl(230 50% 4%)" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      {/* arms */}
      <path d="M 12 50 Q 7 56 13 60" stroke={body} strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M 52 50 Q 57 56 51 60" stroke={body} strokeWidth="2.2" fill="none" strokeLinecap="round" />
      {/* base shadow */}
      <ellipse cx="32" cy="74" rx="13" ry="1.8" fill="hsl(230 40% 5% / 0.45)" />
    </svg>
  );
}

export function UFO({ className, beam = true }: { className?: string; beam?: boolean }) {
  return (
    <svg viewBox="0 0 140 80" className={className} aria-hidden>
      <defs>
        <linearGradient id="ufo-body-v3" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="hsl(220 30% 70%)" />
          <stop offset="40%" stopColor="hsl(220 25% 35%)" />
          <stop offset="100%" stopColor="hsl(220 30% 10%)" />
        </linearGradient>
        <radialGradient id="ufo-dome-v3" cx="38%" cy="28%" r="75%">
          <stop offset="0%" stopColor="hsl(152 100% 85%)" />
          <stop offset="40%" stopColor="hsl(152 90% 50%)" />
          <stop offset="100%" stopColor="hsl(152 90% 18%)" />
        </radialGradient>
        <linearGradient id="ufo-beam-v3" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--primary) / 0.55)" />
          <stop offset="100%" stopColor="hsl(var(--primary) / 0)" />
        </linearGradient>
        <filter id="ufo-glow">
          <feGaussianBlur stdDeviation="0.8" />
        </filter>
      </defs>
      {/* beam */}
      {beam && (
        <path d="M 50 42 L 90 42 L 110 78 L 30 78 Z" fill="url(#ufo-beam-v3)" style={{ filter: "blur(1px)" }}>
          <animate attributeName="opacity" values="0.5;0.9;0.5" dur="1.4s" repeatCount="indefinite" />
        </path>
      )}
      {/* dome */}
      <ellipse cx="70" cy="28" rx="22" ry="16" fill="url(#ufo-dome-v3)" />
      {/* dome highlight */}
      <ellipse cx="62" cy="20" rx="6" ry="3" fill="hsl(0 0% 100% / 0.5)" filter="url(#ufo-glow)" />
      {/* pilot */}
      <ellipse cx="70" cy="28" rx="5.5" ry="6.5" fill="hsl(230 50% 6%)" />
      <circle cx="68.2" cy="26" r="1" fill="hsl(0 0% 100%)" />
      <circle cx="71.8" cy="26" r="1" fill="hsl(0 0% 100%)" />
      {/* hull */}
      <ellipse cx="70" cy="44" rx="48" ry="9" fill="url(#ufo-body-v3)" />
      {/* hull highlight rim */}
      <ellipse cx="70" cy="40" rx="48" ry="2.2" fill="hsl(220 25% 75% / 0.5)" />
      {/* lights */}
      {[28, 44, 60, 76, 92, 108].map((cx, i) => (
        <g key={cx}>
          <circle cx={cx} cy="48" r="2.2" fill="hsl(var(--primary))" filter="url(#ufo-glow)" opacity="0.7">
            <animate attributeName="opacity" values="0.7;0.15;0.7" dur="1.0s" begin={`${i * 0.13}s`} repeatCount="indefinite" />
          </circle>
          <circle cx={cx} cy="48" r="1.4" fill="hsl(35 100% 75%)">
            <animate attributeName="opacity" values="1;0.3;1" dur="1.0s" begin={`${i * 0.13}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}
    </svg>
  );
}

export function SpaceBat({ className, flap = true }: { className?: string; flap?: boolean }) {
  return (
    <svg viewBox="0 0 80 60" className={className} aria-hidden>
      <defs>
        <linearGradient id="bat-wing-v3" x1="0" x2="1">
          <stop offset="0%" stopColor="hsl(265 70% 45%)" />
          <stop offset="100%" stopColor="hsl(265 70% 12%)" />
        </linearGradient>
        <filter id="bat-glow">
          <feGaussianBlur stdDeviation="1" />
        </filter>
      </defs>
      <g style={flap ? { transformOrigin: "40px 30px", animation: "bat-flap 0.5s ease-in-out infinite" } : {}}>
        <path d="M 40 30 Q 18 10 4 22 Q 14 30 8 38 Q 22 36 40 30 Z" fill="url(#bat-wing-v3)" />
        <path d="M 40 30 Q 62 10 76 22 Q 66 30 72 38 Q 58 36 40 30 Z" fill="url(#bat-wing-v3)" />
      </g>
      <ellipse cx="40" cy="32" rx="6" ry="9" fill="hsl(265 60% 10%)" />
      <path d="M 36 24 L 34 18 L 38 22 Z" fill="hsl(265 60% 10%)" />
      <path d="M 44 24 L 46 18 L 42 22 Z" fill="hsl(265 60% 10%)" />
      {/* glowing eyes */}
      <circle cx="37.5" cy="28" r="1.6" fill="hsl(var(--primary))" filter="url(#bat-glow)" opacity="0.8">
        <animate attributeName="opacity" values="0.8;0.3;0.8" dur="1.4s" repeatCount="indefinite" />
      </circle>
      <circle cx="42.5" cy="28" r="1.6" fill="hsl(var(--primary))" filter="url(#bat-glow)" opacity="0.8">
        <animate attributeName="opacity" values="0.8;0.3;0.8" dur="1.4s" begin="0.2s" repeatCount="indefinite" />
      </circle>
      <circle cx="37.5" cy="28" r="1" fill="hsl(35 100% 80%)" />
      <circle cx="42.5" cy="28" r="1" fill="hsl(35 100% 80%)" />
      <path d="M 39 32 L 40 35 L 41 32" stroke="hsl(0 0% 100%)" strokeWidth="0.6" fill="hsl(0 0% 100%)" />
    </svg>
  );
}
