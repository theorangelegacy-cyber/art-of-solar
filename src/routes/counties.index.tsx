import { createFileRoute, Link } from "@tanstack/react-router";
import { ContactDock, links } from "@/components/ContactDock";
import {
  CtaBlock,
  Faqs,
  PageHero,
  SiteFooter,
  SiteHeader,
  TrustStrip,
} from "@/components/SiteChrome";
import { LeadForm } from "@/components/LeadForm";
import { SITE_URL } from "@/data/seo";
import { FL_COUNTIES, REGIONS, countiesInRegion } from "@/data/florida";
import { abs, breadcrumbSchema, faqSchema, ld, serviceSchema } from "@/data/schema";
import { IMG } from "@/data/images";
import { trackEvent } from "@/lib/leads";

const URL = `${SITE_URL}/counties`;
const TITLE = "Solar Panel Removal & Reinstall: All 67 Florida Counties";
const DESC =
  "Where Art of Solar works, county by county across Florida. Orlando to Miami is our weekly route; the rest of the state is travel work, booked ahead.";

const FAQS = [
  {
    q: "Do you really cover the whole of Florida?",
    a: "We cover it, but not all of it the same way, and we would rather say so than waste your morning. Orlando down to Miami is our home route: one crew, normal scheduling, any size job. Everywhere else in Florida is travel work. We genuinely go, but it is booked ahead, batched with other jobs in the area, and there is a minimum size that makes the drive make sense for both of us.",
  },
  {
    q: "What counts as the home route?",
    a: "Ten counties: Orange, Seminole, Osceola, Brevard, Indian River, St. Lucie, Martin, Palm Beach, Broward and Miami-Dade. That is the corridor our crew works week to week, and the response there is the fastest we offer.",
  },
  {
    q: "So should I bother calling from Pensacola?",
    a: "Call. The worst that happens is we tell you honestly that the job is too small to justify the drive and point you at what to ask a local contractor. If it is the right size, or if it can be grouped with other work in the Panhandle, we will book it in properly rather than string you along.",
  },
  {
    q: "Is there a travel charge?",
    a: "Not on the home route. Outside it, the drive is priced into the quote rather than added as a surprise line at the end, and you see the whole number in writing before anything is scheduled.",
  },
  {
    q: "Do you work on systems other companies installed?",
    a: "Almost always. Any brand, any original installer, in business or not. Most of the systems we service were sold by companies that have since closed, anywhere in the state.",
  },
];

export const Route = createFileRoute("/counties/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: URL },
      { property: "og:image", content: abs(IMG.og) },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
      { name: "twitter:image", content: abs(IMG.og) },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      ...ld(
        serviceSchema({
          name: "Solar Panel Removal, Reinstall & Repair",
          description: DESC,
          url: URL,
          image: IMG.og,
        }),
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Florida counties", path: "/counties" },
        ]),
        faqSchema(FAQS),
      ),
    ],
  }),
  component: CountiesIndex,
});

function CountiesIndex() {
  const home = FL_COUNTIES.filter((c) => c.tier === 1);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <PageHero
        eyebrow="Florida, county by county"
        title={
          <>
            All 67 counties.{" "}
            <span className="text-orange">Ten of them every week.</span>
          </>
        }
        sub="Here is exactly where we work and how, without the usual pretending. Orlando down to Miami is our crew's weekly route. The rest of Florida we travel to, booked ahead and batched. Both are real, and they are not the same thing."
        crumbs={[{ name: "Florida counties", to: "/counties" }]}
        image={IMG.hero}
      >
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          {links.hasPhone && (
            <a
              href={links.call}
              onClick={() => trackEvent("call_click", { channel: "call", label: "counties-hero" })}
              className="btn-base btn-primary w-full sm:w-auto"
            >
              Call {links.phoneDisplay}
            </a>
          )}
          <a href="#quote" className="btn-base btn-ghost-light w-full sm:w-auto">
            Get My Free Quote
          </a>
        </div>
      </PageHero>
      <TrustStrip />

      <section className="container-x py-12 sm:py-20">
        <p className="eyebrow">Home route</p>
        <h2 className="mt-3 text-2xl font-extrabold text-navy sm:text-3xl">
          The ten counties we are in every week
        </h2>
        <p className="mt-3 max-w-2xl text-base text-muted-foreground">
          One crew, normal scheduling, no travel surcharge, any size job, and we can line up with
          your roofer's tear-off date.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {home.map((c) => (
            <Link
              key={c.slug}
              to="/counties/$county"
              params={{ county: c.slug }}
              className="card-lift group rounded-3xl border border-orange/40 bg-orange-soft p-6"
            >
              <p className="text-[11px] font-extrabold tracking-[0.14em] text-orange-deep uppercase">
                {c.region}
              </p>
              <h3 className="mt-1.5 text-lg font-extrabold text-navy group-hover:text-orange-deep">
                {c.name} County
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {c.towns.slice(0, 4).join(", ")}
                {c.towns.length > 4 ? " and more" : ""}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-steel py-12 sm:py-20">
        <div className="container-x">
          <p className="eyebrow">The rest of Florida</p>
          <h2 className="mt-3 text-2xl font-extrabold text-navy sm:text-3xl">
            Travel work, booked ahead
          </h2>
          <p className="mt-3 max-w-3xl text-base text-muted-foreground">
            We are not going to tell you there is a van around the corner in Pensacola. What we do
            instead is batch work by area: jobs get booked ahead, grouped with others nearby, and
            there is a minimum size that makes the drive make sense. Call and we will tell you
            straight whether your job fits and when we could realistically be there.
          </p>

          {REGIONS.map((region) => {
            const list = countiesInRegion(region).filter((c) => c.tier === 2);
            if (!list.length) return null;
            return (
              <div key={region} className="mt-8">
                <h3 className="text-xs font-extrabold tracking-[0.16em] text-orange-deep uppercase">
                  {region}
                </h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {list.map((c) => (
                    <li key={c.slug}>
                      <Link
                        to="/counties/$county"
                        params={{ county: c.slug }}
                        className="inline-flex rounded-2xl border border-line bg-white px-4 py-2 text-sm font-semibold text-navy transition hover:border-orange hover:text-orange-deep"
                      >
                        {c.name} County
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <Faqs items={FAQS} heading="Covering Florida: common questions" />

      <section id="quote" className="container-x py-12 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow">Get a quote</p>
            <h2 className="mt-3 text-2xl font-extrabold text-navy sm:text-4xl">
              Wherever you are in Florida, ask
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              Send the address, roughly how many panels, and what is going on. You get a straight
              answer about whether we are the right crew for it, and a written quote if we are.
            </p>
            {links.hasPhone && (
              <a
                href={links.call}
                onClick={() => trackEvent("call_click", { channel: "call", label: "counties-form" })}
                className="mt-5 block text-2xl font-extrabold text-navy hover:text-orange-deep"
              >
                {links.phoneDisplay}
              </a>
            )}
          </div>
          <LeadForm source="counties-index" heading="Where is the roof?" />
        </div>
      </section>

      <CtaBlock
        heading="Not sure if we cover you?"
        sub="One call and you get a straight answer, not a runaround. Licensed and insured."
      />
      <SiteFooter />
      <ContactDock />
    </div>
  );
}
