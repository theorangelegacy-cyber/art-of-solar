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
import { abs, breadcrumbSchema, faqSchema, ld, serviceSchema } from "@/data/schema";
import { IMG } from "@/data/images";
import { trackEvent } from "@/lib/leads";

const HERO_IMG = IMG.inspect;
const URL = `${SITE_URL}/solar-panel-repair`;
const TITLE = "Solar Panel Repair in Florida | Any Brand, Any Installer";
const DESC =
  "Solar panel repair from Orlando to Miami. Dead inverters, panels not producing, leaks at the mounts, storm damage. Written diagnosis before any repair.";

/**
 * The head term is "solar panel repair" and the site had no page holding it.
 * The six service pages each answer one cause; a homeowner watching a
 * monitoring app sit at zero does not yet know the cause, so they search the
 * symptom. This page starts at the symptom and hands them the right page.
 */
const SYMPTOMS: { h: string; p: string; service: string }[] = [
  {
    h: "The app says zero",
    p: "Production flatlined and the monitoring screen is blank or red. Nine times out of ten it is the inverter, a tripped breaker or a communications card, and all three are fixable.",
    service: "orphaned-solar-system-repair",
  },
  {
    h: "Half the array is down",
    p: "Some panels produce and some do not. That is a string fault, a failed optimizer or a connector that corroded open in the Florida damp. We trace it panel by panel.",
    service: "solar-system-inspection",
  },
  {
    h: "The inverter is dead",
    p: "No lights, an error code, or the fan has stopped. String, micro or hybrid, we repair or replace it and file the manufacturer warranty claim if the unit is still inside its term.",
    service: "orphaned-solar-system-repair",
  },
  {
    h: "A stain on the ceiling",
    p: "Water under the array is a solar problem, not a roofing one. It is nearly always a mount that missed the rafter or was sealed with caulk instead of proper flashing.",
    service: "solar-roof-leak-repair",
  },
  {
    h: "A storm went through",
    p: "Lifted panels, bent rails, cracked glass or a whole section that moved. We document the damage so it can go to your insurer, then put the array back properly.",
    service: "storm-damage-solar-repair",
  },
  {
    h: "Rails and clamps rusting",
    p: "Salt air eats the racking long before it touches a panel. Corroded rails, clamps and grounding lugs get replaced rather than reused, especially on the coast.",
    service: "solar-system-inspection",
  },
  {
    h: "The installer vanished",
    p: "The company that sold the system is gone, the loan payment is not, and nobody will take the call. We take over systems other companies abandoned, any brand.",
    service: "orphaned-solar-system-repair",
  },
  {
    h: "It was never switched on",
    p: "The panels went up, the paperwork stalled, and the system has never produced a watt. We finish the install, pass the inspection and get the utility to connect it.",
    service: "orphaned-solar-system-repair",
  },
];

const FAQS = [
  {
    q: "Do you repair solar panels you did not install?",
    a: "Almost everything we repair was installed by somebody else, including companies that no longer exist. Any brand of panel, any inverter, any racking. We are not going to tell you a system is unsupported because our name is not on it.",
  },
  {
    q: "What does solar panel repair cost in Florida?",
    a: "A diagnostic visit is a fixed fee and it comes with a written list of what is actually wrong. Small work like a tripped breaker, a bad connector or a failed optimizer usually lands in the low hundreds. An inverter replacement is the big one, and how big depends on whether the unit is still inside its manufacturer warranty. You get the number in writing before anyone starts.",
  },
  {
    q: "How fast can somebody get out here?",
    a: "For most of the route from Orlando to Miami we are talking days, not weeks. Tell us the town and what the system is doing and you get a real date on the first call rather than a place on a list.",
  },
  {
    q: "Is my warranty worth anything if the installer closed?",
    a: "Usually yes. The workmanship warranty from the installer normally dies with the company, but the manufacturer warranties on the panels, the inverter and the optimizers are separate and often still live. We file those claims for you, which is frequently the difference between a few hundred dollars and a few thousand.",
  },
  {
    q: "Can a broken panel be repaired, or does it have to be replaced?",
    a: "A panel with cracked glass or a burnt junction box gets replaced, because there is no safe repair for that. Most of what people call a broken panel is not the panel at all. It is the wiring, the optimizer or the connector behind it, and that is repairable. We test before we condemn anything.",
  },
  {
    q: "Does a solar repair need a permit?",
    a: "A like-for-like repair usually does not. Replacing an inverter, changing the racking or moving panels usually does, and in Broward and Miami-Dade the attachment rules are stricter again. We tell you which side of that line your job sits on, and we pull the permit when it is needed.",
  },
  {
    q: "My roof needs replacing too. What then?",
    a: "Then it is one job, not two. The array comes off for the roofer, the faults get fixed while the panels are on the ground where they are easy to work on, and everything goes back on new flashed mounts. It is the cheapest time to repair anything.",
  },
  {
    q: "Are you licensed?",
    a: "Yes. Moving or reconnecting a solar array in Florida is solar and electrical work, and it sits outside a roofing or handyman licence. Everything we do is done by a licensed and insured crew, permitted where the county requires it, and inspected.",
  },
];

export const Route = createFileRoute("/solar-panel-repair")({
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
          name: "Solar Panel Repair",
          description: DESC,
          url: URL,
          image: HERO_IMG,
        }),
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Solar panel repair", path: "/solar-panel-repair" },
        ]),
        faqSchema(FAQS),
      ),
    ],
  }),
  component: RepairPage,
});

function RepairPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <PageHero
        eyebrow="Solar panel repair · Orlando to Miami"
        title={
          <>
            Solar panel repair.{" "}
            <span className="text-orange">Any brand. Any installer. Any age.</span>
          </>
        }
        sub="Something on the roof stopped working and the company that sold it will not call you back. We diagnose it, price it in writing, and fix it. Licensed solar crew, ten counties, one number that answers."
        crumbs={[{ name: "Solar panel repair", to: "/solar-panel-repair" }]}
        image={HERO_IMG}
      >
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          {links.hasPhone && (
            <a
              href={links.call}
              onClick={() => trackEvent("call_click", { channel: "call", label: "repair-hero" })}
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
        <p className="eyebrow">Start with the symptom</p>
        <h2 className="mt-3 text-2xl font-extrabold text-navy sm:text-3xl">
          What is your system actually doing?
        </h2>
        <p className="mt-3 max-w-2xl text-base text-muted-foreground">
          Nobody rings up knowing their optimizer failed. They ring up because the app went to zero
          or the ceiling has a stain on it. Find the one that sounds like your roof and it takes you
          to the detail.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SYMPTOMS.map((s) => (
            <Link
              key={s.h}
              to="/services/$service"
              params={{ service: s.service }}
              className="card-lift rounded-3xl border border-line bg-white p-6 transition hover:border-orange"
            >
              <h3 className="text-lg font-extrabold text-navy">{s.h}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.p}</p>
              <span className="mt-4 inline-block text-sm font-bold text-orange-deep">
                What we do about it
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-steel py-12 sm:py-20">
        <div className="container-x grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="eyebrow">How a repair goes</p>
            <h2 className="mt-3 text-2xl font-extrabold text-navy sm:text-3xl">
              Diagnosis first, price second, tools third
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              The reason solar repair has a bad name in Florida is that a lot of outfits quote a
              number before they know what is wrong, then find the real fault halfway through and
              come back for more money. We do it the other way round.
            </p>
            <ol className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                {
                  h: "Tell us the symptom",
                  p: "A photo of the inverter and the monitoring screen is usually enough to narrow it down before we drive out.",
                },
                {
                  h: "We test the system",
                  p: "Inverter, strings, optimizers, breakers, connectors and the attachments. On the roof and at the panel.",
                },
                {
                  h: "Written diagnosis and price",
                  p: "A list of what is wrong, what it costs, and what can safely wait. Warranty claims filed where they apply.",
                },
                {
                  h: "Repair and verify",
                  p: "Parts fitted, system restarted, monitoring checked, and production confirmed in writing before we leave.",
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
          <div className="self-start rounded-3xl border border-line bg-white p-6">
            <p className="eyebrow">Straight answer</p>
            <h3 className="mt-3 text-xl font-extrabold text-navy">Is it worth repairing at all?</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Sometimes it is not, and you will hear that from us. A tired array with a dead inverter
              and corroded racking can cost more to nurse along than it will ever save. But that is
              the rare call. The common one is a system that is basically sound with one failed part
              on it, sitting idle while the loan payment goes out every month.
            </p>
            <dl className="mt-6 space-y-3 text-sm">
              <div className="rounded-2xl bg-steel p-4">
                <dt className="font-extrabold text-navy">Any brand</dt>
                <dd className="mt-1 text-muted-foreground">
                  Panels, string inverters, microinverters, optimizers and batteries.
                </dd>
              </div>
              <div className="rounded-2xl bg-steel p-4">
                <dt className="font-extrabold text-navy">Warranty claims filed</dt>
                <dd className="mt-1 text-muted-foreground">
                  Manufacturer cover usually survives the installer closing down.
                </dd>
              </div>
              <div className="rounded-2xl bg-steel p-4">
                <dt className="font-extrabold text-navy">Licensed and insured</dt>
                <dd className="mt-1 text-muted-foreground">
                  Certificate on request, permits pulled, inspections met.
                </dd>
              </div>
            </dl>
            {links.hasPhone && (
              <a
                href={links.call}
                onClick={() => trackEvent("call_click", { channel: "call", label: "repair-card" })}
                className="btn-base btn-primary mt-6 w-full"
              >
                Call {links.phoneDisplay}
              </a>
            )}
            <a
              href={links.email}
              onClick={() => trackEvent("email_click", { channel: "email", label: "repair-card" })}
              className="btn-base btn-navy mt-3 w-full"
            >
              Email a photo of the inverter
            </a>
          </div>
        </div>
      </section>

      <section className="container-x py-12 sm:py-20">
        <p className="eyebrow">While the panels are off anyway</p>
        <h2 className="mt-3 text-2xl font-extrabold text-navy sm:text-3xl">
          Repairing during a re-roof is the cheap way to do it
        </h2>
        <p className="mt-3 max-w-2xl text-base text-muted-foreground">
          If the roof is being replaced, the array is coming down regardless. Every fault on it is
          far easier and cheaper to fix on the ground than it will ever be at the top of a ladder.
          That is the moment to sort the rails, the connectors and the flashing in one go.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            to="/services/$service"
            params={{ service: "solar-panel-removal-and-reinstall" }}
            className="btn-base btn-navy w-full sm:w-auto"
          >
            Solar Panel Removal and Reinstall
          </Link>
          <Link to="/solar-panel-removal-cost" className="btn-base btn-ghost w-full sm:w-auto">
            What removal costs per panel
          </Link>
          <Link to="/solar-detach-and-reset" className="btn-base btn-ghost w-full sm:w-auto">
            Detach and reset for roofers
          </Link>
        </div>
      </section>

      <Faqs items={FAQS} heading="Solar panel repair: common questions" />

      {/*
        "Solar panel removal near me" is a town-by-town search, not a statewide
        one. Every city page below is written for its own town, so this block is
        the doorway into all fifty-five of them from the repair page.
      */}
      <section className="bg-steel py-12 sm:py-20">
        <div className="container-x">
          <p className="eyebrow">Solar panel removal near me</p>
          <h2 className="mt-3 text-2xl font-extrabold text-navy sm:text-3xl">
            Looking for solar panel removal near me? Find your town.
          </h2>
          <p className="mt-3 max-w-2xl text-base text-muted-foreground">
            We are a Florida crew running one route from Orlando down to Miami, not a national call
            centre that farms the job out to whoever answers. Every town below has its own page
            covering the permitting, the roof stock and what actually goes wrong there.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
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
          <Link to="/service-areas" className="btn-base btn-navy mt-8">
            Every town we cover
          </Link>
        </div>
      </section>

      <section id="quote" className="container-x py-12 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow">Get it looked at</p>
            <h2 className="mt-3 text-2xl font-extrabold text-navy sm:text-4xl">
              Tell us what it is doing
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              The address, roughly how many panels, and what the system is or is not doing. A photo
              of the inverter and the monitoring screen saves everybody a trip. You get a written
              answer, not a sales pitch.
            </p>
            {links.hasPhone && (
              <a
                href={links.call}
                onClick={() => trackEvent("call_click", { channel: "call", label: "repair-form" })}
                className="mt-5 block text-2xl font-extrabold text-navy hover:text-orange-deep"
              >
                {links.phoneDisplay}
              </a>
            )}
          </div>
          <LeadForm
            service="Solar panel repair"
            source="solar-panel-repair"
            heading="Repair request"
            sub="What is the system doing, and where is it? We come back with a written answer."
          />
        </div>
      </section>

      <CtaBlock
        heading="Solar on the roof doing nothing?"
        sub="One call and a licensed solar crew looks at it properly. Orlando to Miami, any brand."
      />
      <SiteFooter />
      <ContactDock />
    </div>
  );
}
