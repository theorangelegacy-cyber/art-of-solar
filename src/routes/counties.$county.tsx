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
import { CITY_BY_SLUG, SERVICES, SITE_URL } from "@/data/seo";
import {
  FL_COUNTY_BY_SLUG,
  REGION_NOTES,
  nearbyCounties,
  type FlCounty,
} from "@/data/florida";
import { abs, breadcrumbSchema, faqSchema, ld, serviceSchema } from "@/data/schema";
import { IMG, srcSet } from "@/data/images";
import { trackEvent } from "@/lib/leads";

/** A town slug, the way the city pages build theirs. */
function townSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/\./g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * The questions change with the county, which is the whole point. A Keys page
 * and a Liberty County page should not answer the same four things.
 */
function countyFaqs(c: FlCounty) {
  const faqs: { q: string; a: string }[] = [
    {
      q: `Do you remove and reinstall solar panels in ${c.name} County?`,
      a:
        c.tier === 1
          ? `Yes. ${c.name} County is on our home route, so this is normal week-to-week work for us. One crew, no travel surcharge, and we work directly with your roofer's schedule.`
          : `Yes, and we will be straight with you about how. ${c.name} County is outside our daily route, so work here is booked ahead and batched with other jobs in the area rather than done same-week. There is a minimum job size that makes the drive make sense. Call and we will tell you honestly what is realistic.`,
    },
    {
      q: `Who pulls the permit in ${c.name} County?`,
      a: c.hvhz
        ? `We do. ${c.name} County sits inside Florida's High-Velocity Hurricane Zone, so every attachment has to carry the right product approval and the reinstall is permitted and inspected. We pull the solar permit and meet the inspector.`
        : `We do. The reinstall needs a solar permit from ${c.seat} or the ${c.name} County building department, depending on the address, and in Florida only a licensed solar or electrical contractor can pull it. We handle it and meet the inspector.`,
    },
    {
      q: `Which utility handles the reconnection here?`,
      a: `Homes in ${c.name} County are generally served by ${c.utility}. Reconnection and net-metering paperwork goes to whichever one holds your account, and we file it so the system actually comes back online rather than sitting dark.`,
    },
    {
      q: `My installer went out of business. Can you still service the system?`,
      a: `Yes. Most of the systems we work on were installed by companies that no longer exist. We service any brand and any original installer, anywhere in ${c.name} County. The factory warranties on the panels and inverter are usually still good and we file those claims for you.`,
    },
  ];

  if (c.coastal) {
    faqs.push({
      q: `Does being on the coast change anything?`,
      a: `It changes what fails. Salt air eats rails, clamps and grounding hardware long before it touches a panel, so on any ${c.name} County job near the water we inspect every fastener before agreeing to put an array back on a new roof. Corroded hardware does not go back up.`,
    });
  } else {
    faqs.push({
      q: `What usually goes wrong on roofs here?`,
      a: `Inland counties like ${c.name} let us focus on the things that actually fail away from salt air: rail condition, flashing at the mounts, and whether the array was ever torqued to spec. A stain on a ceiling under an array is almost always a mount that was never flashed properly.`,
    });
  }

  return faqs;
}

export const Route = createFileRoute("/counties/$county")({
  loader: ({ params }) => {
    const county = FL_COUNTY_BY_SLUG[params.county];
    if (!county) throw notFound();
    return { county };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData)
      return { meta: [{ title: "Page not found" }, { name: "robots", content: "noindex" }] };
    const c = loaderData.county;
    const url = `${SITE_URL}/counties/${params.county}`;
    const title = `Solar Panel Removal & Reinstall in ${c.name} County, FL`;
    const clause = c.blurb.split(",")[0]!.trim();
    const hook =
      clause.length >= 25 && clause.length <= 70
        ? clause
        : `${c.name} County, ${c.region}`;
    const desc = `${hook}. Solar detach and reset, re-racking and repair across ${c.name} County. Licensed, written quote.`;
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
        { name: "geo.placename", content: `${c.name} County, FL` },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        ...ld(
          serviceSchema({
            name: "Solar Panel Removal, Reinstall & Repair",
            description: desc,
            url,
            image: IMG.og,
            cityName: c.seat,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Florida counties", path: "/counties" },
            { name: `${c.name} County`, path: `/counties/${c.slug}` },
          ]),
          faqSchema(countyFaqs(c)),
        ),
      ],
    };
  },
  component: CountyPage,
});

function CountyPage() {
  const { county: c } = Route.useLoaderData();
  const near = nearbyCounties(c);
  const home = c.tier === 1;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <PageHero
        eyebrow={`${c.region} · county seat ${c.seat}`}
        title={
          <>
            Solar panel removal, reinstall &amp; repair in{" "}
            <span className="text-orange">{c.name} County</span>
          </>
        }
        sub={c.blurb}
        crumbs={[
          { name: "Florida counties", to: "/counties" },
          { name: `${c.name} County`, to: `/counties/${c.slug}` },
        ]}
        image={IMG.hero}
      >
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          {links.hasPhone && (
            <a
              href={links.call}
              onClick={() =>
                trackEvent("call_click", { channel: "call", label: `county-${c.slug}` })
              }
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

      {/* The honest bit. This is what keeps 67 county pages from being spam. */}
      <section className="container-x py-10 sm:py-14">
        <div
          className={`rounded-3xl border p-6 sm:p-8 ${
            home ? "border-orange/40 bg-orange-soft" : "border-line bg-steel"
          }`}
        >
          <p className="eyebrow">{home ? "Home route" : "How we cover this county"}</p>
          <h2 className="mt-3 text-2xl font-extrabold text-navy sm:text-3xl">
            {home
              ? `${c.name} County is on our daily run`
              : `We travel to ${c.name} County, and here is the honest version`}
          </h2>
          <p className="mt-4 max-w-3xl text-base text-muted-foreground">
            {home
              ? `Our crew works Orlando down to Miami every week, and ${c.name} County is part of that route. That means normal scheduling, no travel surcharge, any size job, and we can line up with your roofer's tear-off date rather than the other way round.`
              : `Our crew is based in Broward and works Orlando down to Miami week to week. ${c.name} County is outside that daily run, so we do not pretend to have a van around the corner. What we do instead is batch work here: jobs get booked ahead, grouped with others in the area, and there is a minimum size that makes the drive worth making for both of us. Call and we will tell you straight whether your job fits and when we could realistically be there.`}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            {links.hasPhone && (
              <a
                href={links.call}
                onClick={() =>
                  trackEvent("call_click", { channel: "call", label: `county-honest-${c.slug}` })
                }
                className="btn-base btn-primary w-full sm:w-auto"
              >
                Call {links.phoneDisplay}
              </a>
            )}
            <a
              href={links.email}
              onClick={() =>
                trackEvent("email_click", { channel: "email", label: `county-${c.slug}` })
              }
              className="btn-base btn-navy w-full sm:w-auto"
            >
              Email the details
            </a>
          </div>
        </div>
      </section>

      <section className="container-x pb-10 sm:pb-14">
        <div className="rounded-3xl border border-line bg-white p-6 sm:p-8">
          <p className="eyebrow">{c.region}</p>
          <h2 className="mt-3 text-2xl font-extrabold text-navy sm:text-3xl">
            What solar looks like in this part of Florida
          </h2>
          <p className="mt-4 max-w-3xl text-base text-muted-foreground">{REGION_NOTES[c.region]}</p>
        </div>
      </section>

      <section className="container-x grid gap-8 pb-12 sm:pb-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="eyebrow">What we check here</p>
          <h2 className="mt-3 text-2xl font-extrabold text-navy sm:text-3xl">
            {c.name} County roofs, specifically
          </h2>
          <ul className="mt-6 grid gap-3">
            {[
              c.hvhz
                ? `${c.name} County is inside Florida's High-Velocity Hurricane Zone. Every attachment carries the right product approval and the reinstall is permitted and inspected.`
                : `The reinstall is permitted through ${c.seat} or the county building department, and in Florida only a licensed solar or electrical contractor can pull that permit.`,
              c.coastal
                ? `Salt air. Every rail, clamp and grounding lug gets checked for corrosion before an array goes back on a new roof.`
                : `Inland, so the failures are rail condition, flashing at the mounts and torque, not corrosion.`,
              `Power here comes from ${c.utility}, and we file the reconnection and net-metering paperwork with whichever one holds your account.`,
              `Never the old mounts. Every attachment on your new roof is new and flashed, so your roofer's warranty stays intact.`,
              `Any brand, any original installer, in business or not. Most systems we touch were put up by companies that are gone.`,
            ].map((b) => (
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
          <p className="eyebrow">Towns in {c.name} County</p>
          <h3 className="mt-3 text-xl font-extrabold text-navy">Where we get called</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {c.towns.map((t) => {
              const slug = townSlug(t);
              const hasPage = Boolean(CITY_BY_SLUG[slug]);
              return (
                <li key={t}>
                  {hasPage ? (
                    <Link
                      to="/service-areas/$city"
                      params={{ city: slug }}
                      className="inline-flex rounded-xl border border-line bg-steel px-3 py-1.5 text-sm font-semibold text-navy transition hover:border-orange hover:text-orange-deep"
                    >
                      {t}
                    </Link>
                  ) : (
                    <span className="inline-flex rounded-xl border border-line bg-steel px-3 py-1.5 text-sm text-muted-foreground">
                      {t}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">
            County seat is {c.seat}. If your town is not listed it does not matter, the whole county
            is the same call.
          </p>
          <img
            src={IMG.rerack}
            srcSet={srcSet(IMG.rerack)}
            sizes="(min-width: 1024px) 40vw, 100vw"
            alt="Solar array reinstalled on new flashed mounts"
            width={800}
            height={600}
            loading="lazy"
            className="mt-5 aspect-[4/3] w-full rounded-2xl border border-line object-cover"
          />
        </div>
      </section>

      <section className="bg-steel py-12 sm:py-20">
        <div className="container-x">
          <p className="eyebrow">What we do</p>
          <h2 className="mt-3 text-2xl font-extrabold text-navy sm:text-3xl">
            Services across {c.name} County
          </h2>
          {home ? (
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((s) => (
                <Link
                  key={s.slug}
                  to="/services/$service"
                  params={{ service: s.slug }}
                  className="card-lift group rounded-3xl border border-line bg-white p-6"
                >
                  <p className="text-[11px] font-extrabold tracking-[0.14em] text-orange-deep uppercase">
                    {s.eyebrow}
                  </p>
                  <h3 className="mt-1.5 text-lg font-extrabold text-navy group-hover:text-orange-deep">
                    {s.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.short}</p>
                </Link>
              ))}
            </div>
          ) : (
            /* Travel counties get the list, not six repeated paragraphs. Less
               boilerplate means the county's own writing carries the page. */
            <ul className="mt-6 flex flex-wrap gap-2">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    to="/services/$service"
                    params={{ service: s.slug }}
                    className="inline-flex rounded-2xl border border-line bg-white px-4 py-2 text-sm font-semibold text-navy transition hover:border-orange hover:text-orange-deep"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/solar-panel-removal-cost" className="btn-base btn-navy w-full sm:w-auto">
              What it costs per panel
            </Link>
            <Link
              to="/solar-company-out-of-business"
              className="btn-base btn-ghost w-full sm:w-auto"
            >
              Installer out of business?
            </Link>
          </div>
        </div>
      </section>

      <Faqs items={countyFaqs(c)} heading={`${c.name} County: common questions`} />

      <section className="container-x py-6 sm:py-10">
        <p className="eyebrow">Nearby</p>
        <h2 className="mt-3 text-2xl font-extrabold text-navy sm:text-3xl">
          Counties around {c.name}
        </h2>
        <ul className="mt-6 flex flex-wrap gap-2">
          {near.map((k) => (
            <li key={k.slug}>
              <Link
                to="/counties/$county"
                params={{ county: k.slug }}
                className="inline-flex rounded-2xl border border-line bg-white px-4 py-2 text-sm font-semibold text-navy transition hover:border-orange hover:text-orange-deep"
              >
                {k.name} County
              </Link>
            </li>
          ))}
        </ul>
        <Link to="/counties" className="btn-base btn-ghost mt-6">
          All 67 Florida counties
        </Link>
      </section>

      <section id="quote" className="bg-steel py-12 sm:py-20">
        <div className="container-x grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow">Get a quote</p>
            <h2 className="mt-3 text-2xl font-extrabold text-navy sm:text-4xl">
              Tell us about the roof
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              The address, roughly how many panels, and what is happening. A photo of the array from
              the street gets you an accurate number fastest.{" "}
              {home
                ? "We are in this county most weeks."
                : "We will tell you honestly when we could be in the area."}
            </p>
            {links.hasPhone && (
              <a
                href={links.call}
                onClick={() =>
                  trackEvent("call_click", { channel: "call", label: `county-form-${c.slug}` })
                }
                className="mt-5 block text-2xl font-extrabold text-navy hover:text-orange-deep"
              >
                {links.phoneDisplay}
              </a>
            )}
          </div>
          <LeadForm
            city={`${c.name} County`}
            source={`county:${c.slug}`}
            heading={`Quote for ${c.name} County`}
          />
        </div>
      </section>

      <CtaBlock
        heading="New roof, dead system, or a leak at the mounts?"
        sub="Licensed solar crew, any brand, any original installer. Written quote before a panel moves."
      />
      <SiteFooter />
      <ContactDock />
    </div>
  );
}
