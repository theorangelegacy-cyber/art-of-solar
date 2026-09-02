import { createFileRoute, Link } from "@tanstack/react-router";
import { ContactDock } from "@/components/ContactDock";
import {
  CtaBlock,
  Faqs,
  PageHero,
  SiteFooter,
  SiteHeader,
  TrustStrip,
} from "@/components/SiteChrome";
import { COUNTIES, EXTENDED_AREAS, GENERAL_FAQS, SITE_URL, citiesInCounty } from "@/data/seo";
import { abs, breadcrumbSchema, ld } from "@/data/schema";
import { IMG } from "@/data/images";

export const Route = createFileRoute("/service-areas/")({
  head: () => {
    const url = `${SITE_URL}/service-areas`;
    const title = "Service Areas: Orlando to Miami | Art of Solar";
    const desc =
      "Solar panel removal, reinstall and repair in Orange, Seminole, Osceola, Brevard, Indian River, St. Lucie, Martin, Palm Beach, Broward and Miami-Dade counties.";
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
            { name: "Service Areas", path: "/service-areas" },
          ]),
        ),
      ],
    };
  },
  component: AreasPage,
});

function AreasPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <PageHero
        eyebrow="Service areas"
        title={
          <>
            Orlando down to Miami. <span className="text-orange">Ten counties, one crew.</span>
          </>
        }
        sub="If your roof is anywhere along the I-4, Florida's Turnpike or I-95 corridor between Orlando and Homestead, we come to it. Pick your city for local details."
        crumbs={[{ name: "Service Areas", to: "/service-areas" }]}
      />
      <TrustStrip />

      <section className="container-x py-12 sm:py-20">
        <div className="grid gap-5 md:grid-cols-2">
          {COUNTIES.map((k, i) => (
            <div key={k.slug} className="rounded-3xl border border-line bg-white p-6 sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl font-extrabold text-navy sm:text-2xl">{k.name} County</h2>
                <span className="rounded-full bg-orange-soft px-3 py-1 text-[11px] font-extrabold tracking-wider text-orange-deep uppercase">
                  {i === 0 ? "North end" : i === COUNTIES.length - 1 ? "South end" : `Stop ${i + 1}`}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{k.note}</p>
              <p className="mt-2 text-xs font-semibold text-navy">Utility: {k.utility}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {citiesInCounty(k.name).map((c) => (
                  <li key={c.slug}>
                    <Link
                      to="/service-areas/$city"
                      params={{ city: c.slug }}
                      className="inline-block rounded-xl border border-line bg-steel px-3 py-1.5 text-sm font-semibold text-navy transition hover:border-orange hover:bg-orange-soft"
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted-foreground">
          Not on the list? {EXTENDED_AREAS.join(", ")} are reached by arrangement. Florida is a
          big state and we travel. Ask, and we will tell you honestly whether your address is on
          the route.
        </p>
      </section>

      <Faqs items={GENERAL_FAQS} />
      <CtaBlock
        heading="Your city, your roof, our crew"
        sub="Send the address and a photo. You get a written quote before a panel moves."
      />
      <SiteFooter />
      <ContactDock />
    </div>
  );
}
