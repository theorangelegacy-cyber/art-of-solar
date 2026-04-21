import { Link } from "react-router-dom";

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-24 border-t border-border/60">
      <div className="container py-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="h-3 w-3 rounded-full bg-gradient-orange shadow-glow-orange" />
              <span className="font-display tracking-[0.2em] text-sm">QUANTUM ORANGE</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Quantum-grade infrastructure for modern family law firms.
            </p>
          </div>
          <div>
            <div className="font-mono-tel text-[10px] tracking-[0.3em] text-accent mb-3">NAVIGATE</div>
            <ul className="space-y-2 text-sm">
              <li><Link className="hover:text-accent" to="/">Home</Link></li>
              <li><Link className="hover:text-accent" to="/services">Services</Link></li>
              <li><Link className="hover:text-accent" to="/about">About</Link></li>
              <li><Link className="hover:text-accent" to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-mono-tel text-[10px] tracking-[0.3em] text-accent mb-3">TELEMETRY</div>
            <ul className="space-y-1 font-mono-tel text-[11px] text-muted-foreground">
              <li>COORDS · 38.8951° N, 77.0364° W</li>
              <li>UPLINK · STABLE</li>
              <li>COHERENCE · 98.6%</li>
            </ul>
          </div>
          <div>
            <div className="font-mono-tel text-[10px] tracking-[0.3em] text-accent mb-3">CONTACT</div>
            <ul className="space-y-2 text-sm">
              <li><a className="hover:text-accent" href="mailto:hello@quantumorange.dynamics">hello@quantumorange.dynamics</a></li>
              <li><Link className="hover:text-accent" to="/contact">Open Channel ▸</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-t border-border/40 pt-6">
          <div className="font-mono-tel text-[10px] tracking-[0.3em] text-muted-foreground">
            © {year} QUANTUM ORANGE DYNAMICS · ALL ENTANGLEMENTS RESERVED
          </div>
          <div className="font-mono-tel text-[10px] tracking-[0.3em] text-muted-foreground">
            BUILT IN SUPERPOSITION
          </div>
        </div>
      </div>
    </footer>
  );
}
