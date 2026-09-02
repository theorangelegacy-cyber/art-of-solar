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
import { COUNTIES, SERVICE_BY_SLUG, SERVICES, SITE_URL, citiesInCounty } from "@/data/seo";
import { abs, breadcrumbSchema, faqSchema, ld, serviceSchema } from "@/data/schema";

export const Route = createFileRoute("/services/$service")({
  loader: ({ params }) => {
    const service = SERVICE_BY_SLUG[params.service];
    if (!service) throw notFound();
    return { service };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData)
      return { meta: [{ title: "Page not found" }, { name: "robots", content: "noindex" }] };
    const s = loaderData.service;
    const url = `${SITE_URL}/services/${params.service}`;
    const title = `${s.name} in Florida | Art of Solar`;
    const desc = `${s.short} Licensed and insured. Orlando to Miami. Written quote before a panel moves.`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: url },
        { property: "og:image", content: abs(s.img) },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
        { name: "twitter:image", content: abs(s.img) },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        ...ld(
          serviceSchema({ name: s.name, description: desc, url, image: s.img }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: s.name, path: `/services/${s.slug}` },
          ]),
          faqSchema(s.faqs),
        ),
      ],
    };
  },
  component: ServicePage,
});

function ServicePage() {
  const { service: s } = Route.useLoaderData();
  const others = SERVICES.filter((x) => x.slug !== s.slug);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <PageHero
        eyebrow={s.eyebrow}
        title={s.name}
        sub={s.intro}
        crumbs={[
          { name: "Services", to: "/services" },
          { name: s.name, to: `/services/${s.slug}` },
        ]}
        image={s.img}
      >
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <a href="#quote" className="btn-base btn-primary w-full sm:w-auto">
            Get My Free Quote
          </a>
          <Link to="/service-areas" className="btn-base btn-ghost-light w-full sm:w-auto">
            Where we work
          </Link>
        </div>
      </PageHero>
      <TrustStrip />

      <section className="container-x grid gap-8 py-12 sm:py-20 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="eyebrow">What is included</p>
          <h2 className="mt-3 text-2xl font-extrabold text-navy sm:text-3xl">
            What we actually do on a {s.phrase} job
          </h2>
          <ul className="mt-6 grid gap-3">
            {s.bullets.map((b) => (
              <li key={b} className="flex gap-3 rounded-2xl border border-line bg-white p-4 text-sm text-navy">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-orange text-xs font-black text-navy-deep">
                  ✓
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>
        <img
          src={s.img}
          alt={s.name}
          width={800}
          height={600}
          className="aspect-[4/3] w-full self-start rounded-3xl border border-line object-cover"
        />
      </section>

      <section className="bg-steel py-12 sm:py-20">
        <div className="container-x">
          <p className="eyebrow">How it goes</p>
          <h2 className="mt-3 text-2xl font-extrabold text-navy sm:text-3xl">Step by step</h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {s.steps.map((st, i) => (
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

      <Faqs items={s.faqs} heading={`${s.name}: common questions`} />

      <section className="container-x py-6 sm:py-10">
        <p className="eyebrow">Where we do this</p>
        <h2 className="mt-3 text-2xl font-extrabold text-navy sm:text-3xl">
          {s.name} across Orlando to Miami
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
            <p className="eyebrow">Get a quote</p>
            <h2 className="mt-3 text-2xl font-extrabold text-navy sm:text-4xl">
              Ready when your roof is
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              Tell us the address, the panel count if you know it, and what is happening. You get a
              written quote, not a sales pitch.
            </p>
            <div className="mt-6">
              <p className="text-xs font-bold tracking-[0.14em] text-muted-foreground uppercase">
                Other services
              </p>
              <ul className="mt-2 space-y-1.5 text-sm">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link
                      to="/services/$service"
                      params={{ service: o.slug }}
                      className="font-semibold text-navy hover:text-orange-deep"
                    >
                      {o.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <LeadForm service={s.name} source={`service:${s.slug}`} />
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
