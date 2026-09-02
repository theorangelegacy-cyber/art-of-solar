import { createFileRoute, Link } from "@tanstack/react-router";
import { ContactDock, FacebookIcon, links } from "@/components/ContactDock";
import { CtaBlock, PageHero, SiteFooter, SiteHeader, TrustStrip } from "@/components/SiteChrome";
import { EXTENDED_AREAS, OWNER, SERVICES, SITE_URL } from "@/data/seo";
import { abs, breadcrumbSchema, ld } from "@/data/schema";
import { IMG } from "@/data/images";
import { trackEvent } from "@/lib/leads";

export const Route = createFileRoute("/about")({
  head: () => {
    const url = `${SITE_URL}/about`;
    const title = "About Art of Solar | Artem Sevbo, Florida Solar Re-Rack Pro";
    const desc =
      "Art of Solar is a private, highly experienced solar installer run by Artem Sevbo. Re-racks, repairs and new systems for homeowners, roofers and installers. Orlando to Miami.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: url },
        { property: "og:image", content: abs(IMG.og) },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
        { name: "twitter:image", content: abs(IMG.og) },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        ...ld(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ),
      ],
    };
  },
  component: AboutPage,
});

const VALUES = [
  {
    h: "Any installer, any brand",
    p: "Almost everything we touch was installed by someone else. That is the job. We do not turn work away because another company put it up, and we do not lecture you about who you hired.",
  },
  {
    h: "The roofer is a partner, not a problem",
    p: "We take the array down on their schedule and put it back on new attachments after their inspection. Roofing companies keep our number for this reason.",
  },
  {
    h: "Written before it is real",
    p: "Every job starts with a written quote. Every job ends with photos of the finished work. No surprises in between, no upsell at the end.",
  },
  {
    h: "Licensed, insured, permitted",
    p: "All work is done by licensed and insured crews, permitted where the county requires it, and inspected. That is what protects your roof warranty and your home.",
  },
];

const CAPABILITIES = [
  "New projects",
  "Troubleshooting",
  "Remove & reinstall",
  "System design",
  "Inverter repair",
  "Site survey / analysis",
  "City inspections",
  "Consulting",
  "Roofing",
  "Windows",
];

function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <PageHero
        eyebrow="About Art of Solar"
        title={
          <>
            The solar crew for the customers{" "}
            <span className="text-orange">the boom left behind.</span>
          </>
        }
        sub="A lot of companies got into solar, sold thousands of systems across Florida, and got out. The panels are still on the roofs. The loans are still being paid. The homeowners still need service. That is who we work for."
        crumbs={[{ name: "About", to: "/about" }]}
        image={IMG.crew}
      />
      <TrustStrip />

      <section className="container-x grid items-center gap-8 py-12 sm:py-20 lg:grid-cols-2">
        <img
          src={IMG.crew}
          alt={`${OWNER} and crew on a roof during a solar reinstall`}
          width={1400}
          height={1050}
          className="aspect-[4/3] w-full rounded-3xl border border-line object-cover"
        />
        <div>
          <p className="eyebrow">Who you are dealing with</p>
          <h2 className="mt-3 text-2xl font-extrabold text-navy sm:text-4xl">{OWNER}</h2>
          <p className="mt-4 text-base text-muted-foreground">
            Art of Solar is a private, highly experienced installer specializing in residential
            photovoltaic, pool and hot water systems. Artem specializes in re-racks: taking solar
            arrays down for roof work and putting them back up right, and repairing the systems
            that other companies walked away from. He works directly with homeowners, and with
            roofers and installers who need a solar crew on their jobs.
          </p>
          <p className="mt-3 text-base text-muted-foreground">
            Art of Solar, LLC has been Artem's company since 2020, based in Broward County. Before
            that he spent years on the roofs and in the homes for the big names, installing for
            Namaste Solar and selling for ADT Solar and Vivint Solar. He has seen exactly how the
            fast-growth companies build, which is why he knows where to look when yours fails.
          </p>
          <p className="mt-3 text-base text-muted-foreground">
            The main route runs from Orlando down to Miami, with {EXTENDED_AREAS.join(", ")} by
            arrangement. One crew, one standard, one person who answers.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            {links.hasPhone && (
              <a
                href={links.call}
                onClick={() => trackEvent("call_click", { channel: "call", label: "about" })}
                className="btn-base btn-primary w-full sm:w-auto"
              >
                Call {links.phoneDisplay}
              </a>
            )}
            <Link
              to="/contact"
              className={`btn-base w-full sm:w-auto ${links.hasPhone ? "btn-ghost" : "btn-primary"}`}
            >
              Get a Free Quote
            </Link>
            <a
              href={links.facebook}
              target="_blank"
              rel="noreferrer"
              className="btn-base btn-ghost w-full sm:w-auto"
            >
              <FacebookIcon /> Facebook
            </a>
          </div>
        </div>
      </section>

      <section className="bg-steel py-12 sm:py-20">
        <div className="container-x">
          <p className="eyebrow">How we work</p>
          <h2 className="mt-3 text-2xl font-extrabold text-navy sm:text-4xl">
            Four things you can count on
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {VALUES.map((v) => (
              <div key={v.h} className="rounded-3xl border border-line bg-white p-6 sm:p-7">
                <h3 className="text-lg font-extrabold text-navy">{v.h}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-12 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-3xl bg-navy p-6 text-white sm:p-8">
            <img
              src={IMG.logoPhoto}
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover opacity-40"
            />
            <div className="relative">
              <p className="eyebrow">For roofers &amp; installers</p>
              <h2 className="mt-3 text-2xl font-extrabold">Need the solar side handled?</h2>
              <p className="mt-3 text-sm text-white/80 sm:text-base">
                Roofing companies and installers bring us in when a job has solar on it: detach
                before tear-off, safe storage, reset on new flashed attachments after the final
                inspection, restart and verification. Your customer, your schedule, our crew.
              </p>
              <Link to="/contact" className="btn-base btn-primary mt-6 w-full sm:w-auto">
                Talk to us
              </Link>
            </div>
          </div>
          <div className="rounded-3xl border border-line bg-white p-6 sm:p-8">
            <p className="eyebrow">Everything we do</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {CAPABILITIES.map((c) => (
                <li
                  key={c}
                  className="rounded-xl border border-line bg-steel px-3 py-1.5 text-sm font-semibold text-navy"
                >
                  {c}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs font-bold tracking-[0.14em] text-muted-foreground uppercase">
              Service pages
            </p>
            <ul className="mt-2 space-y-2">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    to="/services/$service"
                    params={{ service: s.slug }}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-line px-4 py-3 text-sm font-semibold text-navy transition hover:border-orange hover:bg-orange-soft"
                  >
                    {s.name}
                    <span className="text-orange">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
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
