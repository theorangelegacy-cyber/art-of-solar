import { createFileRoute, Link, notFound } from "@tanstack/react-router";
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
import { COUNTIES, SITE_URL, citiesInCounty } from "@/data/seo";
import { RESCUES, RESCUE_BY_SLUG, RESCUE_FAQS } from "@/data/rescues";
import { abs, breadcrumbSchema, faqSchema, ld, serviceSchema } from "@/data/schema";
import { trackEvent } from "@/lib/leads";

const HERO_IMG = "/img/rerack.webp";

export const Route = createFileRoute("/solar-company-out-of-business/$brand")({
  loader: ({ params }) => {
    const rescue = RESCUE_BY_SLUG[params.brand];
    if (!rescue) throw notFound();
    return { rescue };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData)
      return { meta: [{ title: "Page not found" }, { name: "robots", content: "noindex" }] };
    const r = loaderData.rescue;
    const url = `${SITE_URL}/solar-company-out-of-business/${params.brand}`;
    const title = `${r.name} Out of Business? Solar Repair & Service in Florida`;
    const desc = `${r.name} closed. Your panels did not. Independent licensed solar contractor taking over ${r.name} systems across Florida, Orlando to Miami. Written inspection, factory warranties still filed.`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: url },
        { property: "og:image", content: abs(HERO_IMG) },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
        { name: "twitter:image", content: abs(HERO_IMG) },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        ...ld(
          serviceSchema({
            name: `${r.name} System Repair & Takeover`,
            description: desc,
            url,
            image: HERO_IMG,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Solar company out of business", path: "/solar-company-out-of-business" },
            { name: r.name, path: `/solar-company-out-of-business/${r.slug}` },
          ]),
          faqSchema(RESCUE_FAQS),
        ),
      ],
    };
  },
  component: RescuePage,
});

function RescuePage() {
  const { rescue: r } = Route.useLoaderData();
  const others = RESCUES.filter((x) => x.slug !== r.slug);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <PageHero
        eyebrow="Orphaned system rescue"
        title={
          <>
            {r.name} is gone.{" "}
            <span className="text-orange">Your panels are still on the roof.</span>
          </>
        }
        sub={`${r.what} We are an independent Florida solar contractor. We take over systems like yours, tell you in writing what is actually wrong, and get them producing again.`}
        crumbs={[
          { name: "Installer out of business", to: "/solar-company-out-of-business" },
          { name: r.name, to: `/solar-company-out-of-business/${r.slug}` },
        ]}
        image={HERO_IMG}
      >
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          {links.hasPhone && (
            <a
              href={links.call}
              onClick={() => trackEvent("call_click", { channel: "call", label: `rescue-${r.slug}` })}
              className="btn-base btn-primary w-full sm:w-auto"
            >
              Call {links.phoneDisplay}
            </a>
          )}
          <a href="#quote" className="btn-base btn-ghost-light w-full sm:w-auto">
            Get My System Checked
          </a>
        </div>
      </PageHero>
      <TrustStrip />

      <section className="container-x grid gap-8 py-12 sm:py-20 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="eyebrow">What it means for your roof</p>
          <h2 className="mt-3 text-2xl font-extrabold text-navy sm:text-3xl">
            What happens to a {r.name} system now
          </h2>
          <p className="mt-4 text-base text-muted-foreground">{r.impact}</p>

          <p className="mt-8 text-xs font-bold tracking-[0.14em] text-muted-foreground uppercase">
            What we usually find on these systems
          </p>
          <ul className="mt-3 grid gap-3">
            {r.signs.map((b) => (
              <li
                key={b}
                className="flex gap-3 rounded-2xl border border-line bg-white p-4 text-sm text-navy"
              >
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-orange text-xs font-black text-navy-deep">
                  ✓
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div className="self-start rounded-3xl border border-line bg-white p-6">
          <p className="eyebrow">Straight answer first</p>
          <h3 className="mt-3 text-xl font-extrabold text-navy">
            We have never been part of {r.name}
          </h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Art of Solar is an independent, licensed and insured Florida solar contractor. We were
            never a {r.name} dealer, subcontractor or affiliate, and we are not taking over its
            obligations. What we do is service the equipment that company left on your roof, the
            same way we service every other brand.
          </p>
          <dl className="mt-6 space-y-3 text-sm">
            <div className="rounded-2xl bg-steel p-4">
              <dt className="font-extrabold text-navy">Panels and inverter warranty</dt>
              <dd className="mt-1 text-muted-foreground">
                Held by the manufacturer, not the installer. Usually still good.
              </dd>
            </div>
            <div className="rounded-2xl bg-steel p-4">
              <dt className="font-extrabold text-navy">Workmanship warranty</dt>
              <dd className="mt-1 text-muted-foreground">
                Belonged to {r.name}. Gone when the company went.
              </dd>
            </div>
            <div className="rounded-2xl bg-steel p-4">
              <dt className="font-extrabold text-navy">Your loan or lease</dt>
              <dd className="mt-1 text-muted-foreground">
                Separate contract. It does not end because the installer did.
              </dd>
            </div>
          </dl>
          {links.hasPhone && (
            <a
              href={links.call}
              onClick={() =>
                trackEvent("call_click", { channel: "call", label: `rescue-card-${r.slug}` })
              }
              className="btn-base btn-primary mt-6 w-full"
            >
              Call {links.phoneDisplay}
            </a>
          )}
          <a
            href={links.email}
            onClick={() =>
              trackEvent("email_click", { channel: "email", label: `rescue-card-${r.slug}` })
            }
            className="btn-base btn-navy mt-3 w-full"
          >
            Email us instead
          </a>
        </div>
      </section>

      <section className="bg-steel py-12 sm:py-20">
        <div className="container-x">
          <p className="eyebrow">How a takeover goes</p>
          <h2 className="mt-3 text-2xl font-extrabold text-navy sm:text-3xl">Step by step</h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                h: "Read the equipment",
                p: "Panel labels, inverter serial, optimizer count, monitoring. We work from the roof, not from paperwork that no longer exists.",
              },
              {
                h: "Written inspection",
                p: "What is installed, what is failing, what is still under a factory warranty, and what the roof under the array looks like.",
              },
              {
                h: "Claim what is covered",
                p: "Manufacturers only take claims from a licensed contractor. We file them so parts come free where they should.",
              },
              {
                h: "Fix and verify",
                p: "Repair, restart, and prove production in writing before we leave. Then you have one number that answers.",
              },
            ].map((st, i) => (
              <li key={st.h} className="rounded-3xl border border-line bg-white p-6">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-navy text-base font-black text-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg font-extrabold text-navy">{st.h}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{st.p}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Faqs items={RESCUE_FAQS} heading={`${r.name} customers ask us this`} />

      <section className="container-x py-6 sm:py-10">
        <p className="eyebrow">Where we do this</p>
        <h2 className="mt-3 text-2xl font-extrabold text-navy sm:text-3xl">
          {r.name} system service across Orlando to Miami
        </h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {COUNTIES.map((k) => (
            <div key={k.slug} className="rounded-2xl border border-line bg-white p-4">
              <p className="text-sm font-extrabold text-navy">{k.name} County</p>
              <ul className="mt-2 flex flex-wrap gap-x-2 gap-y-1 text-xs text-muted-foreground">
                {citiesInCounty(k.name).map((c) => (
                  <li key={c.slug}>
                    <Link
                      to="/service-areas/$city"
                      params={{ city: c.slug }}
                      className="hover:text-orange-deep hover:underline"
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="quote" className="bg-steel py-12 sm:py-20">
        <div className="container-x grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow">Get it looked at</p>
            <h2 className="mt-3 text-2xl font-extrabold text-navy sm:text-4xl">
              Tell us what the system is doing
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              The address, roughly how many panels, and what stopped working. A photo of the
              inverter screen helps most. You get a written answer, not a sales pitch.
            </p>
            <div className="mt-6">
              <p className="text-xs font-bold tracking-[0.14em] text-muted-foreground uppercase">
                Other installers we take over from
              </p>
              <ul className="mt-2 space-y-1.5 text-sm">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link
                      to="/solar-company-out-of-business/$brand"
                      params={{ brand: o.slug }}
                      className="font-semibold text-navy hover:text-orange-deep"
                    >
                      {o.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <LeadForm
            service={`${r.name} takeover`}
            source={`out-of-business:${r.slug}`}
          />
        </div>
      </section>

      <CtaBlock
        heading="Your installer is gone. We are not."
        sub="One licensed crew that answers the phone, any brand, any original company. Orlando to Miami."
      />
      <SiteFooter />
      <ContactDock />
    </div>
  );
}
