import { Link } from "react-router-dom";
import { Readout } from "./HUD";

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-32 border-t border-border">
      <div className="container py-12">
        {/* top strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
          <div className="flex items-center gap-3">
            <span className="relative inline-flex h-5 w-5">
              <span className="absolute inset-0 rounded-full bg-gradient-orange shadow-glow-orange-soft" />
              <span className="absolute -inset-1 rounded-full border border-accent/30 animate-spin-slow" style={{ borderStyle: "dashed" }} />
            </span>
            <span className="font-display text-sm">Quantum Orange Dynamics</span>
            <span className="font-mono text-2xs tracking-mono uppercase text-muted-foreground">// QOD-IV · Build 4.0.7</span>
          </div>
          <div className="flex items-center gap-5">
            <Readout k="Coherence" v="98.6%" status="active" />
            <Readout k="Uplink" v="Stable" status="ok" />
          </div>
        </div>

        <div className="grid gap-10 md:grid-cols-12 mt-10">
          <div className="md:col-span-5">
            <div className="font-mono text-2xs tracking-mono uppercase text-accent">Mission</div>
            <p className="mt-3 text-foreground/90 max-w-md text-[15px] leading-relaxed">
              We engineer single-system legal infrastructure for family-law firms operating at the limit of human throughput.
            </p>
          </div>
          <div className="md:col-span-3">
            <div className="font-mono text-2xs tracking-mono uppercase text-accent mb-3">Map</div>
            <ul className="space-y-2 text-sm">
              <li><Link className="text-foreground-dim hover:text-foreground" to="/">00 · Index</Link></li>
              <li><Link className="text-foreground-dim hover:text-foreground" to="/services">01 · Capability</Link></li>
              <li><Link className="text-foreground-dim hover:text-foreground" to="/about">02 · Doctrine</Link></li>
              <li><Link className="text-foreground-dim hover:text-foreground" to="/contact">03 · Channel</Link></li>
            </ul>
          </div>
          <div className="md:col-span-4">
            <div className="font-mono text-2xs tracking-mono uppercase text-accent mb-3">Telemetry</div>
            <ul className="space-y-1 font-mono text-2xs tracking-mono-tight text-muted-foreground">
              <li title="Celestial coordinates of Uranus (J2000 Equatorial)">COORD · URANUS · RA 03h 42m 12s · Dec +19° 48′ 22″</li>
              <li>SECTOR · LEGAL/FAMILY · TIER-1</li>
              <li>RESPONSE WINDOW · ≤24H</li>
              <li>CONTACT · hello@quantumorange.dynamics</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-t border-border pt-6 font-mono text-2xs tracking-mono uppercase text-muted-foreground">
          <div>© {year} Quantum Orange Dynamics · All entanglements reserved</div>
          <div className="flex items-center gap-4">
            <span>Built in superposition</span>
            <span className="h-1 w-1 rounded-full bg-accent animate-ticker" />
          </div>
        </div>
      </div>
    </footer>
  );
}
