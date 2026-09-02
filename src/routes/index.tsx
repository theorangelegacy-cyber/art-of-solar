import { createFileRoute, Link } from "@tanstack/react-router";
import { ContactDock, FacebookIcon, links } from "@/components/ContactDock";
import {
  CtaBlock,
  Faqs,
  SiteFooter,
  SiteHeader,
  TrustStrip,
} from "@/components/SiteChrome";
import { LeadForm } from "@/components/LeadForm";
import {
  COUNTIES,
  EXTENDED_AREAS,
  GENERAL_FAQS,
  SERVICES,
  SITE_URL,
  citiesInCounty,
} from "@/data/seo";
import { abs, faqSchema, ld } from "@/data/schema";
import { GALLERY, IMG } from "@/data/images";
import { trackEvent } from "@/lib/leads";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Solar Panel Removal, Reinstall & Repair | Art of Solar FL" },
      {
        name: "description",
        content:
          "Solar panel removal and reinstall for new roofs, re-racking, leak repair and service for solar systems whose installer went out of business. Licensed and insured. Orlando to Miami.",
      },
      { property: "og:title", content: "Art of Solar | Solar Re-Rack, Repair & Service, Orlando to Miami" },
      {
        property: "og:description",
        content:
          "New roof? Installer gone? Leak at a mount? We detach, reinstall and repair solar systems across Florida. Any roof. Any installer.",
      },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:image", content: abs(IMG.og) },
      { name: "twitter:title", content: "Art of Solar | Solar Re-Rack, Repair & Service" },
      {
        name: "twitter:description",
        content: "Solar panel removal, reinstall and repair. Orlando to Miami.",
      },
      { name: "twitter:image", content: abs(IMG.og) },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
    scripts: [...ld(faqSchema(GENERAL_FAQS))],
  }),
  component: Home,
});

const REASONS = [
  {
    n: "01",
    h: "You are getting a new roof",
    p: "The panels come off before tear-off and go back on after the final inspection. Your roofer will not touch them. We will, on their schedule, on new flashed mounts.",
    slug: "solar-panel-removal-and-reinstall",
    cta: "Detach & reset",
  },
  {
    n: "02",
    h: "Your installer went out of business",
    p: "The company that sold you the system is gone and the warranty went with them. The loan payment did not. We service orphaned systems every week. Any brand. Any installer. No judgment.",
    slug: "orphaned-solar-system-repair",
    cta: "Orphaned system repair",
  },
  {
    n: "03",
    h: "Something is wrong up there",
    p: "A stain under the array, an inverter throwing codes, production that fell off a cliff, storm damage. We find it, price it in writing, and fix it. No upsell.",
    slug: "solar-roof-leak-repair",
    cta: "Leaks, inspections & storm repair",
  },
];

const STEPS = [
  { h: "Send the basics", p: "Address, rough panel count, a photo or two, and what is going on." },
  { h: "Written quote", p: "A fixed price and a plan before anyone touches a panel." },
  { h: "We do the work", p: "Licensed and insured crew, permits pulled, roofer coordinated." },
  { h: "Verified producing", p: "System back on, monitoring checked, photos in your inbox." },
];

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-navy-deep text-white">
        <img
          src={IMG.hero}
          alt="Art of Solar array reinstalled on a tile roof in South Florida"
          width={1800}
          height={1350}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/85 to-navy-deep/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-transparent to-transparent" />
        <div className="relative container-x grid items-end gap-10 py-16 sm:py-28 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="eyebrow rise">Solar re-rack, repair &amp; service · Orlando to Miami</p>
            <h1 className="rise-2 mt-5 max-w-2xl text-4xl leading-[1.03] font-extrabold sm:text-6xl">
              Solar panel removal, reinstall &amp; repair.{" "}
              <span className="text-orange">Any roof. No excuses.</span>
            </h1>
            <p className="rise-3 mt-5 max-w-xl text-base text-white/85 sm:text-lg">
              Your roofer says the panels have to come off. Your installer vanished with the
              warranty. There is a stain on the ceiling under the array and nobody will own it.
              Art of Solar takes the system down, re-racks it right, and turns it back on.
              Licensed, insured, and we actually pick up.
            </p>
            <div className="rise-3 mt-8 flex flex-col gap-3 sm:flex-row">
              {links.hasPhone && (
                <a
                  href={links.call}
                  onClick={() => trackEvent("call_click", { channel: "call", label: "hero" })}
                  className="btn-base btn-primary w-full sm:w-auto"
                >
                  Call {links.phoneDisplay}
                </a>
              )}
              <Link
                to="/contact"
                onClick={() => trackEvent("quote_click", { channel: "form", label: "hero" })}
                className={`btn-base w-full sm:w-auto ${links.hasPhone ? "btn-ghost-light" : "btn-primary"}`}
              >
                Get My Free Quote
              </Link>
              <Link to="/services" className="btn-base btn-ghost-light w-full sm:w-auto">
                See what we fix
              </Link>
            </div>
            <p className="mt-4 text-sm text-white/60">
              Written quote before a panel moves. Every photo on this site is our own work.
            </p>
          </div>

          <div className="rise-3 grid grid-cols-3 gap-3 lg:grid-cols-1">
            {[
              { k: "10", v: "Florida counties on one route" },
              { k: "0", v: "Stock photos. Every picture is our job." },
              { k: "1", v: "Crew, one standard, one person who answers" },
            ].map((s) => (
              <div
                key={s.v}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur sm:p-5"
              >
                <p className="text-2xl font-extrabold text-orange sm:text-4xl">{s.k}</p>
                <p className="mt-1 text-xs text-white/75 sm:text-sm">{s.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TrustStrip />

      {/* Three reasons */}
      <section className="container-x py-12 sm:py-20">
        <p className="eyebrow">Why people call us</p>
        <h2 className="mt-3 max-w-2xl text-2xl font-extrabold text-navy sm:text-4xl">
          Three ways solar goes wrong. One crew that fixes all of them.
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {REASONS.map((r) => (
            <Link
              key={r.n}
              to="/services/$service"
              params={{ service: r.slug }}
              className="card-lift group flex flex-col rounded-3xl border border-line bg-white p-6 sm:p-7"
            >
              <span className="text-sm font-black tracking-widest text-orange">{r.n}</span>
              <h3 className="mt-3 text-xl font-extrabold text-navy">{r.h}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{r.p}</p>
              <span className="mt-5 text-sm font-bold text-sky group-hover:underline">
                {r.cta} →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="bg-steel py-12 sm:py-20">
        <div className="container-x">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Services</p>
              <h2 className="mt-3 text-2xl font-extrabold text-navy sm:text-4xl">
                Everything between the roof and the panels
              </h2>
            </div>
            <Link to="/services" className="btn-base btn-ghost w-full sm:w-auto">
              All services
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <Link
                key={s.slug}
                to="/services/$service"
                params={{ service: s.slug }}
                className="card-lift group overflow-hidden rounded-3xl border border-line bg-white"
              >
                <img
                  src={s.img}
                  alt={s.name}
                  loading="lazy"
                  width={1400}
                  height={1050}
                  className="aspect-[16/10] w-full object-cover"
                />
                <div className="p-5 sm:p-6">
                  <p className="text-[11px] font-extrabold tracking-[0.14em] text-orange-deep uppercase">
                    {s.eyebrow}
                  </p>
                  <h3 className="mt-1.5 text-lg font-extrabold text-navy">{s.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.short}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent work */}
      <section className="container-x py-12 sm:py-20">
        <p className="eyebrow">Real work, not stock photos</p>
        <h2 className="mt-3 max-w-3xl text-2xl font-extrabold text-navy sm:text-4xl">
          13 modules relocated. Whole system rebuilt for a re-roof.
        </h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="grid grid-cols-2 gap-3">
            <figure className="overflow-hidden rounded-2xl border border-line">
              <img
                src={IMG.before}
                alt="Aerial view of the original solar layout split across two roof faces"
                loading="lazy"
                width={1200}
                height={900}
                className="aspect-square w-full object-cover"
              />
              <figcaption className="bg-navy px-3 py-2 text-xs font-bold tracking-wider text-white uppercase">
                Before: split across two faces
              </figcaption>
            </figure>
            <figure className="overflow-hidden rounded-2xl border border-line">
              <img
                src={IMG.after}
                alt="Aerial view of the rebuilt solar system fitted on the southwest roof face"
                loading="lazy"
                width={1200}
                height={900}
                className="aspect-square w-full object-cover"
              />
              <figcaption className="bg-orange px-3 py-2 text-xs font-bold tracking-wider text-navy-deep uppercase">
                After: one face, more sun
              </figcaption>
            </figure>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-base text-muted-foreground sm:text-lg">
              Tile roof, full re-roof. We pulled the entire system, then rebuilt it on the
              southwest face where it should have been from day one: 13 modules moved off the
              northeast side that was never earning its keep. Two modules on the back of the house
              were set offset on purpose so one stopped shading the other. Hidden from the street,
              producing more than before, and the roofer never had to touch a panel.
            </p>
            <ul className="mt-5 grid gap-2 text-sm font-semibold text-navy sm:grid-cols-2">
              {[
                "Detached before tear-off",
                "New flashed mounts on the new tile",
                "Layout redesigned for the sun, not the sales quota",
                "Restarted, verified, photographed",
              ].map((t) => (
                <li key={t} className="flex gap-2">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-orange text-xs font-black text-navy-deep">
                    ✓
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <a
              href={links.facebook}
              target="_blank"
              rel="noreferrer"
              className="mt-6 flex w-fit items-center gap-2 text-sm font-bold text-sky hover:underline"
            >
              <FacebookIcon /> More jobs on our Facebook page →
            </a>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {GALLERY.map((g) => (
            <img
              key={g.src}
              src={g.src}
              alt={g.alt}
              loading="lazy"
              width={1200}
              height={900}
              className="aspect-[4/3] w-full rounded-2xl border border-line object-cover"
            />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-steel py-12 sm:py-20">
        <div className="container-x">
          <p className="eyebrow">How it works</p>
          <h2 className="mt-3 text-2xl font-extrabold text-navy sm:text-4xl">Simple on purpose</h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <li key={s.h} className="relative rounded-3xl border border-line bg-white p-6">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-orange text-base font-black text-navy-deep">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg font-extrabold text-navy">{s.h}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{s.p}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Service area */}
      <section className="blueprint relative isolate overflow-hidden py-12 text-white sm:py-20">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-sky/25 blur-3xl" />
        <div className="relative container-x">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Service area</p>
              <h2 className="mt-3 text-2xl font-extrabold sm:text-4xl">
                Orlando down to Miami, and every city in between
              </h2>
              <p className="mt-3 max-w-xl text-sm text-white/75 sm:text-base">
                Ten counties on one route. If your roof is on the I-4, Turnpike or I-95 corridor,
                we come to it. {EXTENDED_AREAS.join(", ")} by arrangement.
              </p>
            </div>
            <Link to="/service-areas" className="btn-base btn-primary w-full sm:w-auto">
              Find your city
            </Link>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {COUNTIES.map((k) => (
              <div key={k.slug} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-extrabold text-orange">{k.name} County</p>
                <ul className="mt-2 flex flex-wrap gap-x-2 gap-y-1 text-xs text-white/75">
                  {citiesInCounty(k.name).map((c) => (
                    <li key={c.slug}>
                      <Link
                        to="/service-areas/$city"
                        params={{ city: c.slug }}
                        className="hover:text-white hover:underline"
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About teaser */}
      <section className="container-x py-12 sm:py-20">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <img
            src={IMG.crew}
            alt="Art of Solar crew on a roof with a ladder during a solar reinstall"
            loading="lazy"
            width={1400}
            height={1050}
            className="aspect-[4/3] w-full rounded-3xl border border-line object-cover"
          />
          <div>
            <p className="eyebrow">About</p>
            <h2 className="mt-3 text-2xl font-extrabold text-navy sm:text-4xl">
              Built for the customers the solar boom left behind
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              Art of Solar is a private, highly experienced installer specializing in residential
              photovoltaic, pool and hot water systems. Artem Sevbo built the business on re-racks:
              taking systems down for roof work and putting them back up right, and servicing the
              arrays that other companies walked away from. Roofers, installers and homeowners
              across Florida call when the panels are in the way or the last company is gone.
            </p>
            <ul className="mt-5 space-y-2 text-sm font-semibold text-navy">
              {[
                "Licensed and insured crews on every job",
                "Works alongside any roofer or installer",
                "Permits, city inspections and utility paperwork handled",
                "Straight answers, written quotes, photos of the finished work",
              ].map((t) => (
                <li key={t} className="flex gap-2">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-orange text-xs font-black text-navy-deep">
                    ✓
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <Link to="/about" className="btn-base btn-navy mt-6 w-full sm:w-auto">
              More about Art of Solar
            </Link>
          </div>
        </div>
      </section>

      <Faqs items={GENERAL_FAQS} />

      {/* Lead form */}
      <section id="quote" className="bg-steel py-12 sm:py-20">
        <div className="container-x grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow">Get started</p>
            <h2 className="mt-3 text-2xl font-extrabold text-navy sm:text-4xl">
              Tell us about the roof and the panels
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              The more you send, the faster the quote. A photo of the array from the street and a
              photo of the inverter is usually enough to start.
            </p>
            {links.hasPhone && (
              <a
                href={links.call}
                onClick={() => trackEvent("call_click", { channel: "call", label: "home-form" })}
                className="mt-5 block text-2xl font-extrabold text-navy hover:text-orange-deep"
              >
                {links.phoneDisplay}
              </a>
            )}
            <p className="mt-5 text-sm text-muted-foreground">
              Prefer email?{" "}
              <a
                href={links.email}
                onClick={() => trackEvent("email_click", { channel: "email", label: "home-form" })}
                className="font-semibold text-navy underline"
              >
                {links.emailDisplay}
              </a>
            </p>
          </div>
          <LeadForm source="home" />
        </div>
      </section>

      <CtaBlock
        heading="Panels in the way? Installer gone?"
        sub="One message and you have a licensed solar crew that answers. Orlando to Miami."
      />

      <SiteFooter />
      <ContactDock />
    </div>
  );
}
