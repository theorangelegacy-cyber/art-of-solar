import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const links = [
  { to: "/", label: "Index", code: "00" },
  { to: "/services", label: "Capability", code: "01" },
  { to: "/about", label: "Doctrine", code: "02" },
  { to: "/contact", label: "Channel", code: "03" },
];

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* hairline always visible */}
      <div className={`transition-all duration-300 ${scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border" : "bg-transparent"}`}>
        <div className="container">
          <nav className="flex h-14 md:h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group" aria-label="Quantum Orange Dynamics — Home">
              <span className="relative inline-flex h-7 w-7 items-center justify-center">
                <span className="absolute inset-0 rounded-full bg-gradient-orange shadow-glow-orange-soft animate-pulse-soft" />
                <span className="absolute -inset-1 rounded-full border border-accent/30 animate-spin-slow" style={{ borderStyle: "dashed" }} />
                <span className="relative h-1 w-1 rounded-full bg-background" />
              </span>
              <div className="leading-none">
                <div className="font-display text-[13px] tracking-tight text-foreground">Quantum Orange<span className="text-primary"> ▸</span></div>
                <div className="font-mono text-2xs tracking-mono uppercase text-muted-foreground mt-1">Dynamics · QOD-IV</div>
              </div>
            </Link>

            <ul className="hidden md:flex items-center gap-1">
              {links.map((l) => (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    end={l.to === "/"}
                    className={({ isActive }) =>
                      `group inline-flex items-center gap-2 rounded-sm px-3 py-2 font-mono text-2xs tracking-mono uppercase transition-colors underline-trace ${
                        isActive ? "text-accent" : "text-foreground-dim hover:text-foreground"
                      }`
                    }
                    data-active={undefined}
                  >
                    <span className="text-muted-foreground/70 group-hover:text-accent/70 transition-colors">{l.code}</span>
                    <span>{l.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="hidden md:flex items-center gap-3">
              <div className="font-mono text-2xs tracking-mono uppercase text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-accent animate-ticker" />Uplink stable</span>
              </div>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-sm border border-primary/60 bg-primary/10 px-3.5 py-2 font-mono text-2xs tracking-mono uppercase text-primary-glow hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
              >
                Initiate
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
            </div>

            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-sm border border-border text-foreground"
            >
              <div className="space-y-1">
                <span className={`block h-px w-4 bg-foreground transition-transform ${open ? "translate-y-[5px] rotate-45" : ""}`} />
                <span className={`block h-px w-4 bg-foreground transition-opacity ${open ? "opacity-0" : ""}`} />
                <span className={`block h-px w-4 bg-foreground transition-transform ${open ? "-translate-y-[5px] -rotate-45" : ""}`} />
              </div>
            </button>
          </nav>
        </div>
      </div>

      {/* Mobile sheet */}
      <div className={`md:hidden overflow-hidden bg-background/95 backdrop-blur-xl border-b border-border transition-[max-height,opacity] duration-400 ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="container py-3">
          <ul className="space-y-0">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === "/"}
                  className={({ isActive }) =>
                    `flex items-center justify-between border-t border-border first:border-t-0 py-3 font-mono text-2xs tracking-mono uppercase ${
                      isActive ? "text-accent" : "text-foreground-dim"
                    }`
                  }
                >
                  <span><span className="text-muted-foreground mr-2">{l.code}</span>{l.label}</span>
                  <span>→</span>
                </NavLink>
              </li>
            ))}
            <li className="pt-3">
              <Link to="/contact" className="block rounded-sm border border-primary bg-primary/15 py-3 text-center font-mono text-2xs tracking-mono uppercase text-primary-glow">
                Initiate Contact →
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
