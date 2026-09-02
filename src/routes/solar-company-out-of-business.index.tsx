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
import { COUNTIES, SITE_URL, citiesInCounty } from "@/data/seo";
import { RESCUES, RESCUE_FAQS } from "@/data/rescues";
import { abs, breadcrumbSchema, faqSchema, ld, serviceSchema } from "@/data/schema";
import { trackEvent } from "@/lib/leads";

const HERO_IMG = "/img/rerack.webp";
const URL = `${SITE_URL}/solar-company-out-of-business`;
const TITLE = "Solar Company Out of Business? Florida Solar Repair & Takeover";
const DESC =
  "Your solar installer closed and nobody answers. We take over orphaned solar systems across Florida, Orlando to Miami. Any brand, any original company. Written inspection, factory warranties still filed. Licensed and insured.";

export const Route = createFileRoute("/solar-company-out-of-business/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: URL },
      { property: "og:image", content: abs(HERO_IMG) },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
      { name: "twitter:image", content: abs(HERO_IMG) },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      ...ld(
        serviceSchema({
          name: "Orphaned Solar System Takeover",
          description: DESC,
          url: URL,
          image: HERO_IMG,
        }),
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Solar company out of business", path: "/solar-company-out-of-business" },
        ]),
        faqSchema(RESCUE_FAQS),
      ),
    ],
  }),
  component: RescueHub,
});

function RescueHub() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <PageHero
        eyebrow="Orphaned system rescue"
        title={
          <>
            Your solar company closed.{" "}
            <span className="text-orange">Somebody still has to fix the roof.</span>
          </>
        }
        sub="More than a hundred solar companies shut down in a single year, and Florida took a lot of that damage. If your installer stopped answering, the equipment on your roof did not stop being yours. We take these systems over. Any brand, any original company."
        crumbs={[
          { name: "Installer out of business", to: "/solar-company-out-of-business" },
        ]}
        image={HERO_IMG}
      >
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          {links.hasPhone && (
            <a
              href={links.call}
              onClick={() => trackEvent("call_click", { channel: "call", label: "rescue-hub" })}
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

      <section className="container-x py-12 sm:py-20">
        <p className="eyebrow">Find your installer</p>
        <h2 className="mt-3 text-2xl font-extrabold text-navy sm:text-3xl">
          Companies we take systems over from
        </h2>
        <p className="mt-3 max-w-2xl text-base text-muted-foreground">
          These are the names we hear most from Florida homeowners. If yours is not here it does not
          matter, we service every brand and every original installer. Pick the closest one or just
          call.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {RESCUES.map((r) => (
            <Link
              key={r.slug}
              to="/solar-company-out-of-business/$brand"
              params={{ brand: r.slug }}
              className="group rounded-3xl border border-line bg-white p-6 transition hover:border-orange hover:shadow-lg"
            >
              <h3 className="text-lg font-extrabold text-navy group-hover:text-orange-deep">
                {r.name}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{r.short}</p>
              <p className="mt-4 text-sm font-bold text-orange-deep">
                What to do now &rarr;
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-steel py-12 sm:py-20">
        <div className="container-x grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="eyebrow">The part nobody tells you</p>
            <h2 className="mt-3 text-2xl font-extrabold text-navy sm:text-3xl">
              Half your warranty is probably still alive
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              A solar system carries two different warranties and people lose track of that when the
              installer disappears. The workmanship warranty, which covers the labour and the holes
              in your roof, belonged to the company that closed. That one is gone. The factory
              warranties on the panels, the inverter and the optimizers belong to the manufacturers
              who built them, and those run 10 to 25 years no matter who installed them.
            </p>
            <p className="mt-4 text-base text-muted-foreground">
              The catch is that manufacturers will not accept a warranty claim from a homeowner. It
              has to come from a licensed solar contractor with the serial numbers and a written
              diagnosis. That is the piece we do, and it is why the repair often costs far less than
              people expect.
            </p>
          </div>
          <div className="self-start rounded-3xl border border-line bg-white p-6">
            <p className="eyebrow">Before you call anyone</p>
            <ul className="mt-4 space-y-3 text-sm text-navy">
              {[
                "Take a photo of the inverter screen, faults and all",
                "Find the panel brand on the label at the edge of a panel",
                "Check whether you own the system or lease it, the paperwork says",
                "Note the month it stopped producing, if you know it",
                "Do not let anyone quote a full replacement before inspecting it",
              ].map((t) => (
                <li key={t} className="flex gap-3 rounded-2xl bg-steel p-4">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-orange text-xs font-black text-navy-deep">
                    ✓
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <a
              href={links.email}
              onClick={() => trackEvent("email_click", { channel: "email", label: "rescue-hub" })}
              className="btn-base btn-navy mt-6 w-full"
            >
              Send us the photos
            </a>
          </div>
        </div>
      </section>

      <Faqs items={RESCUE_FAQS} heading="Orphaned solar systems: common questions" />

      <section className="container-x py-6 sm:py-10">
        <p className="eyebrow">Where we do this</p>
        <h2 className="mt-3 text-2xl font-extrabold text-navy sm:text-3xl">
          Orphaned system service across Orlando to Miami
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
              The address, roughly how many panels, who installed it if you know, and what stopped
              working. You get a written answer from a licensed crew, not a sales pitch.
            </p>
          </div>
          <LeadForm service="Orphaned system takeover" source="out-of-business:hub" />
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
