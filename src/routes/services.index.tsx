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
import { GENERAL_FAQS, SERVICES, SITE_URL } from "@/data/seo";
import { abs, breadcrumbSchema, ld } from "@/data/schema";
import { IMG } from "@/data/images";

export const Route = createFileRoute("/services/")({
  head: () => {
    const url = `${SITE_URL}/services`;
    const title = "Solar Re-Rack, Repair & Install Services | Art of Solar";
    const desc =
      "Solar panel removal and reinstall for new roofs, orphaned system repair, leak repair at the mounts, inspections, storm repair and new systems. Orlando to Miami.";
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
            { name: "Services", path: "/services" },
          ]),
        ),
      ],
    };
  },
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <PageHero
        eyebrow="Services"
        title={
          <>
            Everything between the roof and the panels,{" "}
            <span className="text-orange">handled by a solar crew.</span>
          </>
        }
        sub="Five things we do all day, on systems we did not install, for homeowners, roofers and installers from Orlando to Miami."
        crumbs={[{ name: "Services", to: "/services" }]}
      />
      <TrustStrip />

      <section className="container-x py-12 sm:py-20">
        <div className="grid gap-6">
          {SERVICES.map((s, i) => (
            <article
              key={s.slug}
              className="card-lift grid overflow-hidden rounded-3xl border border-line bg-white md:grid-cols-[0.8fr_1.2fr]"
            >
              <img
                src={s.img}
                alt={s.name}
                loading={i === 0 ? "eager" : "lazy"}
                width={640}
                height={400}
                className="aspect-[16/10] h-full w-full object-cover"
              />
              <div className="p-6 sm:p-8">
                <p className="text-[11px] font-extrabold tracking-[0.14em] text-orange-deep uppercase">
                  {s.eyebrow}
                </p>
                <h2 className="mt-2 text-2xl font-extrabold text-navy sm:text-3xl">{s.name}</h2>
                <p className="mt-3 text-base text-muted-foreground">{s.intro}</p>
                <ul className="mt-4 grid gap-1.5 text-sm text-navy sm:grid-cols-2">
                  {s.bullets.slice(0, 4).map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-sm bg-orange" />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    to="/services/$service"
                    params={{ service: s.slug }}
                    className="btn-base btn-navy w-full sm:w-auto"
                  >
                    {s.name} details
                  </Link>
                  <Link to="/contact" className="btn-base btn-ghost w-full sm:w-auto">
                    Get a quote
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Faqs items={GENERAL_FAQS} />
      <CtaBlock
        heading="Not sure which one you need?"
        sub="Send a photo of the roof and the inverter. We tell you what is going on and what it costs, in writing."
      />
      <SiteFooter />
      <ContactDock />
    </div>
  );
}
