import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="container">
        <nav className={`glass rounded-2xl flex items-center justify-between px-4 md:px-6 py-3`}>
          <Link to="/" className="flex items-center gap-3 group" aria-label="Quantum Orange Dynamics home">
            <span className="relative inline-flex h-8 w-8 items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-gradient-orange shadow-glow-orange animate-pulse-glow" />
              <span className="absolute inset-0 rounded-full border border-accent/40 animate-spin-slow" style={{ borderStyle: "dashed" }} />
              <span className="relative h-2 w-2 rounded-full bg-accent shadow-glow-green" />
            </span>
            <div className="leading-tight">
              <div className="font-display text-[13px] md:text-sm tracking-[0.18em]">QUANTUM ORANGE</div>
              <div className="font-mono-tel text-[10px] text-accent/80 tracking-[0.3em]">DYNAMICS · v4.0</div>
            </div>
          </Link>

          <ul className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === "/"}
                  className={({ isActive }) =>
                    `font-mono-tel text-xs uppercase tracking-[0.25em] transition-colors underline-trace ${
                      isActive ? "text-accent" : "text-foreground/80 hover:text-foreground"
                    }`
                  }
                  data-active={undefined}
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <Link
            to="/contact"
            className="hidden md:inline-flex items-center gap-2 rounded-md border border-primary/60 bg-primary/10 px-4 py-2 font-mono-tel text-[11px] uppercase tracking-[0.25em] text-primary-glow hover:bg-primary/20 hover:shadow-glow-orange transition-all"
          >
            ▸ Initiate Contact
          </Link>

          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-foreground"
          >
            <span className="sr-only">Menu</span>
            <div className="space-y-1.5">
              <span className={`block h-[2px] w-5 bg-foreground transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`} />
              <span className={`block h-[2px] w-5 bg-foreground transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`block h-[2px] w-5 bg-foreground transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
            </div>
          </button>
        </nav>

        {/* Mobile sheet */}
        <div
          className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-500 ${open ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"}`}
        >
          <ul className="holo-panel rounded-2xl p-4 space-y-1">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === "/"}
                  className={({ isActive }) =>
                    `block rounded-md px-4 py-3 font-mono-tel text-xs uppercase tracking-[0.25em] ${
                      isActive ? "bg-primary/15 text-accent" : "text-foreground/80"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
            <li>
              <Link
                to="/contact"
                className="block rounded-md bg-primary/20 border border-primary/60 px-4 py-3 text-center font-mono-tel text-xs uppercase tracking-[0.25em] text-primary-glow"
              >
                ▸ Initiate Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
