import { createFileRoute, Link } from "@tanstack/react-router";
import { ContactDock, FacebookIcon, links } from "@/components/ContactDock";
import { PageHero, SiteFooter, SiteHeader, TrustStrip } from "@/components/SiteChrome";
import { LeadForm } from "@/components/LeadForm";
import { COUNTIES, SITE_URL } from "@/data/seo";
import { abs, breadcrumbSchema, ld } from "@/data/schema";
import { IMG } from "@/data/images";
import { trackEvent } from "@/lib/leads";

export const Route = createFileRoute("/contact")({
  head: () => {
    const url = `${SITE_URL}/contact`;
    const title = "Free Solar Re-Rack or Repair Quote | Art of Solar";
    const desc =
      "Send the address, panel count and a photo. Get a written quote for solar panel removal and reinstall, leak repair or orphaned system service anywhere from Orlando to Miami.";
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
            { name: "Contact", path: "/contact" },
          ]),
        ),
      ],
    };
  },
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <PageHero
        eyebrow="Free quote"
        title={
          <>
            Tell us about the roof and the panels.{" "}
            <span className="text-orange">We answer in writing.</span>
          </>
        }
        sub="Homeowners, roofers and installers. Any brand, any original company. Orlando to Miami."
        crumbs={[{ name: "Contact", to: "/contact" }]}
      />
      <TrustStrip />

      <section className="container-x grid gap-8 py-12 sm:py-20 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-line bg-white p-6">
            <p className="eyebrow">Email</p>
            <a
              href={links.email}
              onClick={() => trackEvent("email_click", { channel: "email", label: "contact-page" })}
              className="mt-3 block text-lg font-extrabold break-all text-navy hover:text-orange-deep"
            >
              {links.emailDisplay}
            </a>
            {links.hasPhone && (
              <>
                <p className="eyebrow mt-5">Call or text</p>
                <a
                  href={links.call}
                  onClick={() => trackEvent("call_click", { channel: "call", label: "contact-page" })}
                  className="mt-3 block text-2xl font-extrabold text-navy hover:text-orange-deep"
                >
                  {links.phoneDisplay}
                </a>
              </>
            )}
            <p className="eyebrow mt-5">Facebook</p>
            <a
              href={links.facebookMessage}
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                trackEvent("whatsapp_click", { channel: "facebook", label: "contact-page" })
              }
              className="btn-base btn-navy mt-3 w-full"
            >
              <FacebookIcon /> Message Art of Solar
            </a>
            <a
              href={links.facebook}
              target="_blank"
              rel="noreferrer"
              className="mt-2 block text-sm font-semibold text-sky hover:underline"
            >
              See our jobs on Facebook →
            </a>
          </div>

          <div className="rounded-3xl border border-line bg-white p-6">
            <p className="eyebrow">What helps</p>
            <ul className="mt-3 space-y-2 text-sm text-navy">
              {[
                "The address, so we know the county and the utility",
                "Roughly how many panels are on the roof",
                "A photo of the array from the street",
                "A photo of the inverter or the monitoring screen",
                "Who installed it, if you know, and whether a roofer is already booked",
              ].map((t) => (
                <li key={t} className="flex gap-2">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-orange text-xs font-black text-navy-deep">
                    ✓
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl bg-navy p-6 text-white">
            <p className="eyebrow">Service area</p>
            <p className="mt-3 text-sm text-white/80">
              {COUNTIES.map((k) => k.name).join(", ")} counties.
            </p>
            <Link to="/service-areas" className="mt-3 inline-block text-sm font-bold text-orange hover:underline">
              See every city →
            </Link>
          </div>
        </div>

        <LeadForm source="contact" />
      </section>

      <SiteFooter />
      <ContactDock />
    </div>
  );
}
