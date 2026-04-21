/* =====================================================================
   Alien character SVG primitives. Cute, geometric, brand-matched.
   All colors via CSS vars so they fit the design system.
   ===================================================================== */

type AlienProps = { className?: string; eyeBlink?: boolean; tone?: "green" | "orange" | "violet" };

export function AlienBlob({ className, tone = "green" }: AlienProps) {
  const body =
    tone === "orange" ? "hsl(var(--primary) / 0.95)" :
    tone === "violet" ? "hsl(265 70% 60%)" :
    "hsl(var(--accent))";
  const shadow =
    tone === "orange" ? "hsl(var(--primary-deep))" :
    tone === "violet" ? "hsl(265 70% 30%)" :
    "hsl(152 90% 28%)";
  return (
    <svg viewBox="0 0 64 80" className={className} aria-hidden>
      <defs>
        <radialGradient id={`g-${tone}`} cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor={body} />
          <stop offset="100%" stopColor={shadow} />
        </radialGradient>
      </defs>
      {/* antenna */}
      <line x1="32" y1="6" x2="32" y2="16" stroke={body} strokeWidth="1.5" />
      <circle cx="32" cy="5" r="2.5" fill="hsl(var(--primary))">
        <animate attributeName="r" values="2.5;3.2;2.5" dur="1.4s" repeatCount="indefinite" />
      </circle>
      {/* head */}
      <ellipse cx="32" cy="32" rx="20" ry="22" fill={`url(#g-${tone})`} />
      {/* cheek dots */}
      <circle cx="18" cy="40" r="2" fill="hsl(var(--primary) / 0.6)" />
      <circle cx="46" cy="40" r="2" fill="hsl(var(--primary) / 0.6)" />
      {/* eyes (big anime) */}
      <ellipse cx="25" cy="30" rx="4.5" ry="6" fill="hsl(230 40% 5%)" />
      <ellipse cx="39" cy="30" rx="4.5" ry="6" fill="hsl(230 40% 5%)" />
      <circle cx="26" cy="28" r="1.5" fill="hsl(var(--foreground))" />
      <circle cx="40" cy="28" r="1.5" fill="hsl(var(--foreground))" />
      <circle cx="24.5" cy="31" r="0.6" fill="hsl(var(--foreground))" />
      <circle cx="38.5" cy="31" r="0.6" fill="hsl(var(--foreground))" />
      {/* smile */}
      <path d="M 26 42 Q 32 47 38 42" stroke="hsl(230 40% 5%)" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      {/* tiny arms */}
      <path d="M 12 50 Q 8 56 14 60" stroke={body} strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <path d="M 52 50 Q 56 56 50 60" stroke={body} strokeWidth="2.4" fill="none" strokeLinecap="round" />
      {/* base shadow */}
      <ellipse cx="32" cy="74" rx="14" ry="2" fill="hsl(230 40% 5% / 0.5)" />
    </svg>
  );
}

export function UFO({ className, beam = true }: { className?: string; beam?: boolean }) {
  return (
    <svg viewBox="0 0 140 80" className={className} aria-hidden>
      <defs>
        <linearGradient id="ufo-body" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="hsl(220 25% 50%)" />
          <stop offset="60%" stopColor="hsl(220 25% 22%)" />
          <stop offset="100%" stopColor="hsl(220 25% 12%)" />
        </linearGradient>
        <radialGradient id="ufo-dome" cx="40%" cy="30%" r="70%">
          <stop offset="0%" stopColor="hsl(var(--accent) / 0.95)" />
          <stop offset="100%" stopColor="hsl(152 90% 22%)" />
        </radialGradient>
        <linearGradient id="ufo-beam" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--primary) / 0.55)" />
          <stop offset="100%" stopColor="hsl(var(--primary) / 0)" />
        </linearGradient>
      </defs>
      {/* beam */}
      {beam && (
        <path d="M 50 42 L 90 42 L 110 78 L 30 78 Z" fill="url(#ufo-beam)">
          <animate attributeName="opacity" values="0.55;0.85;0.55" dur="1.2s" repeatCount="indefinite" />
        </path>
      )}
      {/* dome */}
      <ellipse cx="70" cy="28" rx="22" ry="16" fill="url(#ufo-dome)" />
      {/* pilot silhouette */}
      <ellipse cx="70" cy="28" rx="6" ry="7" fill="hsl(230 40% 8%)" />
      <circle cx="68" cy="26" r="1.2" fill="hsl(var(--foreground))" />
      <circle cx="72" cy="26" r="1.2" fill="hsl(var(--foreground))" />
      {/* hull */}
      <ellipse cx="70" cy="44" rx="48" ry="10" fill="url(#ufo-body)" />
      <ellipse cx="70" cy="42" rx="48" ry="3" fill="hsl(220 25% 60% / 0.4)" />
      {/* lights */}
      {[28, 44, 60, 76, 92, 108].map((cx, i) => (
        <circle key={cx} cx={cx} cy="48" r="1.8" fill="hsl(var(--primary))">
          <animate attributeName="opacity" values="1;0.2;1" dur="0.9s" begin={`${i * 0.12}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </svg>
  );
}

export function SpaceBat({ className, flap = true }: { className?: string; flap?: boolean }) {
  return (
    <svg viewBox="0 0 80 60" className={className} aria-hidden>
      <defs>
        <linearGradient id="bat-wing" x1="0" x2="1">
          <stop offset="0%" stopColor="hsl(265 60% 35%)" />
          <stop offset="100%" stopColor="hsl(265 60% 18%)" />
        </linearGradient>
      </defs>
      <g style={flap ? { transformOrigin: "40px 30px", animation: "bat-flap 0.5s ease-in-out infinite" } : {}}>
        {/* left wing */}
        <path d="M 40 30 Q 18 12 4 22 Q 14 30 8 38 Q 22 36 40 30 Z" fill="url(#bat-wing)" />
        {/* right wing */}
        <path d="M 40 30 Q 62 12 76 22 Q 66 30 72 38 Q 58 36 40 30 Z" fill="url(#bat-wing)" />
      </g>
      {/* body */}
      <ellipse cx="40" cy="32" rx="6" ry="9" fill="hsl(265 50% 14%)" />
      {/* ears */}
      <path d="M 36 24 L 34 18 L 38 22 Z" fill="hsl(265 50% 14%)" />
      <path d="M 44 24 L 46 18 L 42 22 Z" fill="hsl(265 50% 14%)" />
      {/* glowing eyes */}
      <circle cx="37.5" cy="28" r="1.4" fill="hsl(var(--primary))">
        <animate attributeName="opacity" values="1;0.4;1" dur="1.4s" repeatCount="indefinite" />
      </circle>
      <circle cx="42.5" cy="28" r="1.4" fill="hsl(var(--primary))">
        <animate attributeName="opacity" values="1;0.4;1" dur="1.4s" begin="0.2s" repeatCount="indefinite" />
      </circle>
      {/* fang */}
      <path d="M 39 32 L 40 35 L 41 32" stroke="hsl(var(--foreground))" strokeWidth="0.6" fill="hsl(var(--foreground))" />
    </svg>
  );
}
