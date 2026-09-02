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
import { trackEvent } from "@/lib/leads";

const HERO_IMG = "/img/rerack.webp";
const URL = `${SITE_URL}/florida-solar-permit-law`;
const TITLE = "Who Can Legally Remove Solar Panels in Florida? Permits & Licence";
const DESC =
  "Florida law says a roofer cannot detach or reinstall your solar array. It takes a licensed solar or electrical contractor, and the reinstall needs a permit and an inspection. Here is the rule, in plain words, and what happens when it is ignored.";

const FAQS = [
  {
    q: "Can my roofer remove my solar panels in Florida?",
    a: "Not legally, unless that roofing company also holds a solar contractor or electrical contractor licence, and most do not. Under Florida's contractor law the installation, alteration, repair, relocation and replacement of solar panels and the equipment that goes with them is solar contracting work. Taking an array off a roof and putting it back is exactly that. A roofing licence does not cover it.",
  },
  {
    q: "Do I need a permit to remove and reinstall solar panels?",
    a: "For the reinstall, yes, in practically every Florida county. Putting the array back means new structural attachments through a roof and reconnecting a system that feeds the grid, so the county treats it as new work: permit, plan, inspection. The permit can only be pulled by a licensed solar contractor or electrical contractor.",
  },
  {
    q: "What licence should I be looking for?",
    a: "A certified solar contractor licence, or a certified electrical contractor licence. Ask for the number, then look it up on the state licence search. Any legitimate contractor hands the number over without hesitating. Someone who talks around the question is telling you the answer.",
  },
  {
    q: "What actually goes wrong if an unlicensed crew does it?",
    a: "Four things, and they tend to arrive together. The panel and inverter manufacturers can refuse warranty claims on equipment that was reinstalled by an unlicensed contractor. The roofer will not warranty a roof with penetrations he did not make and cannot inspect. The county can red-tag an unpermitted reinstall, which surfaces when you sell the house. And your insurer can push back on a claim for a system that was never permitted.",
  },
  {
    q: "The roofer says he does it all the time. Is that fine?",
    a: "It is common, and it is still not allowed. A cottage industry of unlicensed crews has grown up around solar removal in Florida precisely because so many roofs now have panels on them. It usually looks fine on the day. The problems arrive later, at a warranty claim, a home sale or a leak.",
  },
  {
    q: "Does a small repair need a permit too?",
    a: "Swapping a like-for-like part on an existing permitted system often does not. Anything that changes the structural attachments, the wiring, or the way the system connects to the grid usually does. When we quote, we tell you which side of that line your job falls on before we start.",
  },
  {
    q: "Who pulls the permit, me or you?",
    a: "We do. We pull the solar permit, we file the paperwork, and we meet the inspector. You do not have to take a day off for a county appointment.",
  },
];

export const Route = createFileRoute("/florida-solar-permit-law")({
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
          name: "Permitted Solar Panel Removal & Reinstall",
          description: DESC,
          url: URL,
          image: HERO_IMG,
        }),
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Florida permit and licence rules", path: "/florida-solar-permit-law" },
        ]),
        faqSchema(FAQS),
      ),
    ],
  }),
  component: LawPage,
});

function LawPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <PageHero
        eyebrow="Florida rules, plain words"
        title={
          <>
            Your roofer is not allowed{" "}
            <span className="text-orange">to touch your solar panels.</span>
          </>
        }
        sub="This surprises almost everybody, including a lot of roofers. Florida treats taking an array down and putting it back as solar work, which needs a solar or electrical licence and a permit. Here is the rule and what it costs you when somebody ignores it."
        crumbs={[{ name: "Florida permit and licence rules", to: "/florida-solar-permit-law" }]}
        image={HERO_IMG}
      >
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          {links.hasPhone && (
            <a
              href={links.call}
              onClick={() => trackEvent("call_click", { channel: "call", label: "law-hero" })}
              className="btn-base btn-primary w-full sm:w-auto"
            >
              Call {links.phoneDisplay}
            </a>
          )}
          <Link to="/solar-panel-removal-cost" className="btn-base btn-ghost-light w-full sm:w-auto">
            What it costs
          </Link>
        </div>
      </PageHero>
      <TrustStrip />

      <section className="container-x grid gap-8 py-12 sm:py-20 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="eyebrow">The rule</p>
          <h2 className="mt-3 text-2xl font-extrabold text-navy sm:text-3xl">
            Why a roofing licence does not cover panels
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Florida's contractor law defines solar contracting as the installation, alteration,
            repair, maintenance, relocation or replacement of solar panels and the equipment that
            goes with them. Lifting an array off a roof and setting it back down is relocation and
            replacement in the same job. That is solar work by definition, whoever is holding the
            wrench.
          </p>
          <p className="mt-4 text-base text-muted-foreground">
            There is an electrical side too. Disconnecting a grid-tied array from the utility, even
            for a few days, and reconnecting it afterwards is electrical work. It needs an active
            licence. A roofing licence is a licence to build roofs, and it stops at the panel.
          </p>
          <p className="mt-4 text-base text-muted-foreground">
            So the reinstall needs a permit, and in Florida that permit can only be pulled by a
            licensed solar contractor or a licensed electrical contractor. If nobody pulled a
            permit on your job, nobody licensed did the work.
          </p>
        </div>

        <div className="self-start rounded-3xl border border-line bg-white p-6">
          <p className="eyebrow">Who does what</p>
          <dl className="mt-4 space-y-3 text-sm">
            {[
              {
                t: "Roofing contractor",
                d: "The roof itself: tear-off, deck, underlayment, shingles or tile, flashing on the roof he builds. Not the panels.",
              },
              {
                t: "Solar contractor",
                d: "The array: detach, store, new attachments, rails, panels, reconnection, permit and inspection. This is us.",
              },
              {
                t: "Electrical contractor",
                d: "Can also carry the disconnect and reconnect side. Some jobs use both, and that is fine.",
              },
              {
                t: "Nobody else",
                d: "Handymen, general labourers and a roofer's own crew are not licensed for any of it, however confident they sound.",
              },
            ].map((r) => (
              <div key={r.t} className="rounded-2xl bg-steel p-4">
                <dt className="font-extrabold text-navy">{r.t}</dt>
                <dd className="mt-1 text-muted-foreground">{r.d}</dd>
              </div>
            ))}
          </dl>
          {links.hasPhone && (
            <a
              href={links.call}
              onClick={() => trackEvent("call_click", { channel: "call", label: "law-card" })}
              className="btn-base btn-primary mt-6 w-full"
            >
              Call {links.phoneDisplay}
            </a>
          )}
          <a
            href={links.email}
            onClick={() => trackEvent("email_click", { channel: "email", label: "law-card" })}
            className="btn-base btn-navy mt-3 w-full"
          >
            Email us instead
          </a>
        </div>
      </section>

      <section className="bg-steel py-12 sm:py-20">
        <div className="container-x">
          <p className="eyebrow">What it costs you later</p>
          <h2 className="mt-3 text-2xl font-extrabold text-navy sm:text-3xl">
            Four bills that show up after an unlicensed reinstall
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                h: "The equipment warranty",
                p: "Panel and inverter makers can refuse a claim on gear reinstalled by an unlicensed contractor. That is 10 to 25 years of cover, gone for a few hundred saved.",
              },
              {
                h: "The roof warranty",
                p: "A roofer will not warranty a roof with penetrations he did not make and did not inspect. Your brand-new roof ends up uncovered where it matters most.",
              },
              {
                h: "The county",
                p: "An unpermitted reinstall can be red-tagged. It usually surfaces at the worst moment, in the middle of selling the house.",
              },
              {
                h: "The insurance claim",
                p: "If the array is damaged in a storm, an insurer can ask who installed it and under which permit. There is no good answer to that if there was not one.",
              },
            ].map((c, i) => (
              <div key={c.h} className="rounded-3xl border border-line bg-white p-6">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-navy text-base font-black text-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg font-extrabold text-navy">{c.h}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{c.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-12 sm:py-20">
        <p className="eyebrow">Protect yourself</p>
        <h2 className="mt-3 text-2xl font-extrabold text-navy sm:text-3xl">
          Three questions before anyone climbs the ladder
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            {
              q: "What is your licence number?",
              a: "Solar contractor or electrical contractor. Ask for it and look it up. A real one is handed over in seconds.",
            },
            {
              q: "Who is pulling the permit?",
              a: "There should be a name and a county. If the answer is that no permit is needed for a reinstall, that is the wrong answer.",
            },
            {
              q: "Are the mounts new and flashed?",
              a: "Old mounts belong to the old roof. New flashed attachments are what keep the roofer's warranty alive.",
            },
          ].map((c) => (
            <div key={c.q} className="rounded-3xl border border-line bg-white p-6">
              <h3 className="text-lg font-extrabold text-navy">{c.q}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.a}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-sm text-muted-foreground">
          Art of Solar is a licensed and insured Florida solar contractor. We pull the permit, we
          meet the inspector, and every attachment on your new roof is new and flashed. Ask us those
          three questions too.
        </p>
      </section>

      <Faqs items={FAQS} heading="Florida solar permits and licences: common questions" />

      <section className="container-x py-6 sm:py-10">
        <p className="eyebrow">Where we pull permits</p>
        <h2 className="mt-3 text-2xl font-extrabold text-navy sm:text-3xl">
          Permitted solar work across Orlando to Miami
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
            <p className="eyebrow">Do it properly</p>
            <h2 className="mt-3 text-2xl font-extrabold text-navy sm:text-4xl">
              Licensed, permitted, inspected
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              Tell us the address and roughly how many panels. You get a written quote with the
              permit named in it, and a licence number you can look up.
            </p>
          </div>
          <LeadForm
            service="Permitted removal and reinstall"
            source="permit-law"
            heading="Get it done to code"
          />
        </div>
      </section>

      <CtaBlock
        heading="Roofer says he will handle the panels?"
        sub="Send him to us instead. Licensed solar crew, permit pulled, roof warranty intact. Orlando to Miami."
      />
      <SiteFooter />
      <ContactDock />
    </div>
  );
}
