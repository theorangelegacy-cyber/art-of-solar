import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ContactDock } from "@/components/ContactDock";
import {
  CtaBlock,
  Faqs,
  PageHero,
  SiteFooter,
  SiteHeader,
  TrustStrip,
} from "@/components/SiteChrome";
import { LeadForm } from "@/components/LeadForm";
import {
  CITY_BY_SLUG,
  SERVICES,
  SITE_URL,
  cityFaqs,
  countyOf,
  nearbyCities,
} from "@/data/seo";
import { abs, breadcrumbSchema, faqSchema, ld, serviceSchema } from "@/data/schema";
import { IMG } from "@/data/images";

export const Route = createFileRoute("/service-areas/$city")({
  loader: ({ params }) => {
    const city = CITY_BY_SLUG[params.city];
    if (!city) throw notFound();
    return { city };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData)
      return { meta: [{ title: "Page not found" }, { name: "robots", content: "noindex" }] };
    const c = loaderData.city;
    const k = countyOf(c);
    const url = `${SITE_URL}/service-areas/${params.city}`;
    const title = `${c.name} Solar Panel Removal & Repair | Art of Solar`;
    const desc = `Solar panel removal and reinstall for new roofs, re-racking, leak repair and orphaned system service in ${c.name}, ${k.name} County. Licensed and insured. Written quote first.`;
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
        { name: "geo.placename", content: `${c.name}, FL` },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        ...ld(
          serviceSchema({
            name: "Solar Panel Removal, Reinstall & Repair",
            description: desc,
            url,
            image: IMG.og,
            cityName: c.name,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Service Areas", path: "/service-areas" },
            { name: c.name, path: `/service-areas/${c.slug}` },
          ]),
          faqSchema(cityFaqs(c)),
        ),
      ],
    };
  },
  component: CityPage,
});

function CityPage() {
  const { city: c } = Route.useLoaderData();
  const k = countyOf(c);
  const nearby = nearbyCities(c);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <PageHero
        eyebrow={`${k.name} County · Florida`}
        title={
          <>
            Solar panel removal, reinstall &amp; repair in{" "}
            <span className="text-orange">{c.name}, FL</span>
          </>
        }
        sub={`New roof coming, installer out of business, or a leak at the mounts? Art of Solar detaches, re-racks, reinstalls and repairs solar systems for ${c.name} homeowners, roofers and installers. Licensed and insured, any brand, any original installer.`}
        crumbs={[
          { name: "Service Areas", to: "/service-areas" },
          { name: c.name, to: `/service-areas/${c.slug}` },
        ]}
        image={IMG.hero}
      >
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <a href="#quote" className="btn-base btn-primary w-full sm:w-auto">
            Get My Free Quote in {c.name}
          </a>
          <Link to="/services" className="btn-base btn-ghost-light w-full sm:w-auto">
            All services
          </Link>
        </div>
      </PageHero>
      <TrustStrip />

      <section className="container-x py-12 sm:py-20">
        <p className="eyebrow">Services in {c.name}</p>
        <h2 className="mt-3 text-2xl font-extrabold text-navy sm:text-3xl">
          What we do for {c.name} solar owners
        </h2>
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
                alt={`${s.name} in ${c.name}`}
                loading="lazy"
                width={640}
                height={400}
                className="aspect-[16/10] w-full object-cover"
              />
              <div className="p-5">
                <h3 className="text-base font-extrabold text-navy sm:text-lg">
                  {s.name} in {c.name}
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{s.short}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-steel py-12 sm:py-20">
        <div className="container-x grid gap-8 md:grid-cols-2">
          <div>
            <p className="eyebrow">Local details</p>
            <h2 className="mt-3 text-2xl font-extrabold text-navy sm:text-3xl">
              Working in {k.name} County
            </h2>
            <p className="mt-3 text-base text-muted-foreground">{k.note}</p>
            <dl className="mt-5 grid gap-3 text-sm">
              <div className="rounded-2xl border border-line bg-white p-4">
                <dt className="text-xs font-bold tracking-[0.14em] text-muted-foreground uppercase">
                  Utility
                </dt>
                <dd className="mt-1 font-semibold text-navy">{k.utility}</dd>
              </div>
              <div className="rounded-2xl border border-line bg-white p-4">
                <dt className="text-xs font-bold tracking-[0.14em] text-muted-foreground uppercase">
                  Permits
                </dt>
                <dd className="mt-1 font-semibold text-navy">
                  {k.hvhz
                    ? "High-Velocity Hurricane Zone: permitted, inspected, product-approved attachments only."
                    : "Solar reinstall permits pulled and inspections scheduled by us."}
                </dd>
              </div>
            </dl>
          </div>
          <div>
            <p className="eyebrow">How it goes</p>
            <h2 className="mt-3 text-2xl font-extrabold text-navy sm:text-3xl">
              Four steps, no surprises
            </h2>
            <ol className="mt-5 space-y-3">
              {[
                { h: "Send the basics", p: `Address in ${c.name}, rough panel count, a photo or two.` },
                { h: "Written quote", p: "Fixed price and a plan before anyone touches a panel." },
                { h: "We do the work", p: "Licensed crew, permits pulled, roofer coordinated." },
                { h: "Verified producing", p: "System on, monitoring checked, photos sent." },
              ].map((s, i) => (
                <li key={s.h} className="flex gap-3 rounded-2xl border border-line bg-white p-4">
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange text-sm font-black text-navy-deep">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-bold text-navy">{s.h}</p>
                    <p className="text-sm text-muted-foreground">{s.p}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <Faqs items={cityFaqs(c)} heading={`Solar questions from ${c.name}`} />

      <section className="container-x py-6 sm:py-10">
        <p className="eyebrow">Nearby</p>
        <h2 className="mt-3 text-xl font-extrabold text-navy sm:text-2xl">
          Also serving homes near {c.name}
        </h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {nearby.map((n) => (
            <li key={n.slug}>
              <Link
                to="/service-areas/$city"
                params={{ city: n.slug }}
                className="inline-block rounded-xl border border-line bg-white px-3 py-1.5 text-sm font-semibold text-navy transition hover:border-orange hover:bg-orange-soft"
              >
                {n.name}
              </Link>
            </li>
          ))}
          <li>
            <Link
              to="/service-areas"
              className="inline-block rounded-xl bg-navy px-3 py-1.5 text-sm font-semibold text-white"
            >
              All service areas
            </Link>
          </li>
        </ul>
      </section>

      <section id="quote" className="bg-steel py-12 sm:py-20">
        <div className="container-x grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow">Get a quote</p>
            <h2 className="mt-3 text-2xl font-extrabold text-navy sm:text-4xl">
              Solar help in {c.name}, in writing
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              Tell us what is going on with the roof or the panels. A photo of the array from the
              street and a photo of the inverter is usually enough to start.
            </p>
          </div>
          <LeadForm city={c.name} source={`city:${c.slug}`} />
        </div>
      </section>

      <CtaBlock
        heading={`Solar crew for ${c.name}`}
        sub="Licensed and insured. Any brand, any roofer, any original installer."
      />
      <SiteFooter />
      <ContactDock />
    </div>
  );
}
