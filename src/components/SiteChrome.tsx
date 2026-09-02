"use client";

import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";

import { FacebookIcon, links } from "@/components/ContactDock";
import { BRAND, CITIES, COUNTIES, SERVICES, TRUST, citiesInCounty } from "@/data/seo";
import { trackEvent } from "@/lib/leads";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { to: "/services", label: "Services" },
  { to: "/service-areas", label: "Service Areas" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2 sm:gap-2.5">
      <img src="/logo-art-of-solar.svg" alt="" aria-hidden className="h-8 w-8 shrink-0 sm:h-9 sm:w-9" />
      <span
        className={`text-sm leading-none font-extrabold tracking-tight sm:text-base ${light ? "text-white" : "text-navy"}`}
      >
        Art of <span className="text-orange">Solar</span>
        <span
          className={`mt-1 hidden text-[10px] font-bold tracking-[0.16em] uppercase sm:block ${light ? "text-white/60" : "text-muted-foreground"}`}
        >
          Re-rack &amp; repair
        </span>
      </span>
    </span>
  );
}

export function HazardBar({ className = "" }: { className?: string }) {
  return <div aria-hidden className={`hazard h-1.5 w-full ${className}`} />;
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur">
      <HazardBar />
      <div className="container-x flex h-16 items-center justify-between gap-3">
        <Link to="/" className="min-w-0" aria-label={`${BRAND} home`}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {navLinks.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm font-semibold text-navy/80 transition-colors hover:text-orange-deep [&.active]:text-orange-deep"
            >
              {item.label}
            </Link>
          ))}
          {links.hasPhone && (
            <a
              href={links.call}
              onClick={() => trackEvent("call_click", { channel: "call", label: "header" })}
              className="text-base font-extrabold text-navy hover:text-orange-deep"
            >
              {links.phoneDisplay}
            </a>
          )}
          <Link
            to="/contact"
            onClick={() => trackEvent("quote_click", { channel: "form", label: "header" })}
            className="btn-base btn-primary px-5 py-2.5 text-sm"
          >
            Get a Free Quote
          </Link>
        </nav>

        <div className="flex shrink-0 items-center gap-2 lg:hidden">
          {links.hasPhone ? (
            <a
              href={links.call}
              onClick={() => trackEvent("call_click", { channel: "call", label: "header" })}
              className="btn-base btn-primary px-3 py-1.5 text-xs sm:px-3.5 sm:py-2 sm:text-sm"
            >
              Call now
            </a>
          ) : (
            <Link
              to="/contact"
              onClick={() => trackEvent("quote_click", { channel: "form", label: "header" })}
              className="btn-base btn-primary px-3 py-1.5 text-xs sm:px-3.5 sm:py-2 sm:text-sm"
            >
              Free Quote
            </Link>
          )}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-white text-navy transition-colors hover:bg-steel sm:h-10 sm:w-10"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[86vw] max-w-sm border-l border-line bg-white">
              <SheetTitle className="sr-only">Site navigation</SheetTitle>
              <div className="flex h-full flex-col">
                <div className="mb-6">
                  <Logo />
                </div>
                <nav className="flex flex-col gap-1" aria-label="Mobile">
                  <SheetClose asChild>
                    <Link
                      to="/"
                      className="rounded-xl px-3 py-3 text-base font-semibold text-navy transition-colors hover:bg-steel"
                    >
                      Home
                    </Link>
                  </SheetClose>
                  {navLinks.map((item) => (
                    <SheetClose key={item.to} asChild>
                      <Link
                        to={item.to}
                        className="rounded-xl px-3 py-3 text-base font-semibold text-navy transition-colors hover:bg-steel"
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  ))}
                  <a
                    href={links.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-xl px-3 py-3 text-base font-semibold text-navy transition-colors hover:bg-steel"
                  >
                    <FacebookIcon /> Facebook
                  </a>
                </nav>
                <div className="mt-auto space-y-3 pt-6">
                  <SheetClose asChild>
                    <Link to="/contact" className="btn-base btn-primary w-full">
                      Get a Free Quote
                    </Link>
                  </SheetClose>
                  {links.hasPhone && (
                    <a href={links.call} className="btn-base btn-navy w-full">
                      Call {links.phoneDisplay}
                    </a>
                  )}
                  <a href={links.email} className="btn-base btn-ghost w-full">
                    Email us
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export function TrustStrip() {
  return (
    <section className="border-b border-line bg-steel">
      <div className="container-x grid grid-cols-2 gap-x-4 gap-y-3 py-4 sm:grid-cols-4 sm:py-5">
        {TRUST.map((t) => (
          <p key={t} className="flex items-start gap-2 text-xs font-semibold text-navy sm:text-sm">
            <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-orange text-[10px] font-black text-navy-deep">
              ✓
            </span>
            {t}
          </p>
        ))}
      </div>
    </section>
  );
}

export function PageHero({
  eyebrow,
  title,
  sub,
  crumbs,
  image,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: ReactNode;
  crumbs?: { name: string; to: string }[];
  /** Optional job photo behind the hero, dimmed. */
  image?: string;
  children?: ReactNode;
}) {
  return (
    <section className="blueprint relative isolate overflow-hidden text-white">
      {image && (
        <img
          src={image}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/85 to-navy-deep/40" />
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-orange/20 blur-3xl" />
      <div className="relative container-x py-12 sm:py-20">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mb-4 text-xs text-white/60">
            <Link to="/" className="hover:text-white">
              Home
            </Link>
            {crumbs.map((c, i) => (
              <span key={c.to}>
                {" / "}
                {i === crumbs.length - 1 ? (
                  <span className="text-white/85">{c.name}</span>
                ) : (
                  <Link to={c.to} className="hover:text-white">
                    {c.name}
                  </Link>
                )}
              </span>
            ))}
          </nav>
        )}
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-3xl leading-[1.08] font-extrabold sm:text-5xl">
          {title}
        </h1>
        {sub && <p className="mt-4 max-w-2xl text-base text-white/80 sm:text-lg">{sub}</p>}
        {children}
      </div>
    </section>
  );
}

export function CtaBlock({ heading, sub }: { heading: string; sub: string }) {
  return (
    <section className="container-x py-10 sm:py-16">
      <div className="relative overflow-hidden rounded-3xl bg-navy p-6 text-center text-white sm:p-12">
        <div className="pointer-events-none absolute -top-16 -left-16 h-56 w-56 rounded-full bg-sky/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 -bottom-16 h-56 w-56 rounded-full bg-orange/25 blur-3xl" />
        <h2 className="relative text-2xl font-extrabold sm:text-4xl">{heading}</h2>
        <p className="relative mx-auto mt-3 max-w-xl text-sm text-white/80 sm:text-base">{sub}</p>
        <div className="relative mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          {links.hasPhone && (
            <a
              href={links.call}
              onClick={() => trackEvent("call_click", { channel: "call", label: "cta-block" })}
              className="btn-base btn-primary w-full sm:w-auto"
            >
              Call {links.phoneDisplay}
            </a>
          )}
          <Link
            to="/contact"
            onClick={() => trackEvent("quote_click", { channel: "form", label: "cta-block" })}
            className={`btn-base w-full sm:w-auto ${links.hasPhone ? "btn-ghost-light" : "btn-primary"}`}
          >
            Get My Free Quote
          </Link>
          <a
            href={links.facebookMessage}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackEvent("whatsapp_click", { channel: "facebook", label: "cta-block" })}
            className="btn-base btn-ghost-light w-full sm:w-auto"
          >
            <FacebookIcon /> Message on Facebook
          </a>
        </div>
      </div>
    </section>
  );
}

export function Faqs({
  items,
  heading = "Common questions",
}: {
  items: { q: string; a: string }[];
  heading?: string;
}) {
  return (
    <section className="container-x py-10 sm:py-16">
      <p className="eyebrow">FAQ</p>
      <h2 className="mt-3 text-2xl font-extrabold text-navy sm:text-3xl">{heading}</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {items.map((f) => (
          <div key={f.q} className="rounded-2xl border border-line bg-white p-5 sm:p-6">
            <h3 className="text-base font-bold text-navy">{f.q}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-navy-deep text-white">
      <HazardBar />
      <div className="container-x py-12">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Logo light />
            <p className="mt-4 max-w-sm text-sm text-white/70">
              Private, highly experienced solar installer. Solar panel removal and reinstall,
              re-racks, repairs, inspections and new systems for Florida homeowners, roofers and
              installers. Licensed and insured. Orlando to Miami.
            </p>
            {links.hasPhone && (
              <a
                href={links.call}
                onClick={() => trackEvent("call_click", { channel: "call", label: "footer" })}
                className="mt-4 block text-xl font-extrabold text-orange"
              >
                {links.phoneDisplay}
              </a>
            )}
            <a
              href={links.email}
              onClick={() => trackEvent("email_click", { channel: "email", label: "footer" })}
              className="mt-2 inline-block text-sm font-semibold text-white underline-offset-4 hover:underline"
            >
              {links.emailDisplay}
            </a>
            <a
              href={links.facebook}
              target="_blank"
              rel="noreferrer"
              className="mt-3 flex w-fit items-center gap-2 rounded-xl border border-white/15 px-3 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              <FacebookIcon /> Art of Solar on Facebook
            </a>
            <div className="mt-5 flex flex-col gap-1.5 text-sm">
              <Link to="/contact" className="text-white/80 hover:text-white">
                Get a free quote
              </Link>
              <Link to="/services" className="text-white/80 hover:text-white">
                All services
              </Link>
              <Link to="/service-areas" className="text-white/80 hover:text-white">
                Service areas
              </Link>
              <Link to="/about" className="text-white/80 hover:text-white">
                About Art of Solar
              </Link>
            </div>
          </div>

          <div>
            <h2 className="text-xs font-extrabold tracking-[0.16em] text-orange uppercase">
              Services
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    to="/services/$service"
                    params={{ service: s.slug }}
                    className="text-white/80 hover:text-white"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-extrabold tracking-[0.16em] text-orange uppercase">
              Service areas
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              {COUNTIES.map((k) => {
                const first = citiesInCounty(k.name)[0];
                return (
                  <li key={k.slug}>
                    {first ? (
                      <Link
                        to="/service-areas/$city"
                        params={{ city: first.slug }}
                        className="text-white/80 hover:text-white"
                      >
                        {k.name} County
                      </Link>
                    ) : (
                      <span className="text-white/80">{k.name} County</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="text-xs font-bold tracking-[0.14em] text-white/50 uppercase">
            Cities we serve
          </p>
          <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-white/60">
            {CITIES.map((c) => (
              <li key={c.slug}>
                <Link to="/service-areas/$city" params={{ city: c.slug }} className="hover:text-white">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex flex-col gap-2 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Art of Solar. All rights reserved.</p>
          <Link to="/privacy-policy" className="hover:text-white">
            Privacy policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
