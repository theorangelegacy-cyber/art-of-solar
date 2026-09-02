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
const URL = `${SITE_URL}/solar-detach-and-reset`;
const TITLE = "Solar Detach & Reset for Roofers | Florida Subcontractor";
const DESC =
  "Solar detach and reset subcontractor for Florida roofing contractors. We pull the array, you tear off, we reset on new flashed mounts and pull the solar permit. Orlando to Miami, on your schedule. Licensed and insured.";

const FAQS = [
  {
    q: "What does detach and reset mean?",
    a: "It is the roofing trade's name for taking a solar array off a roof before tear-off and putting it back after the new roof passes inspection. Same job as removal and reinstall, different word. If it is on a supplement or an insurance scope, it is usually written as solar detach and reset, or D and R.",
  },
  {
    q: "Why can my crew not just do it?",
    a: "Florida treats moving an array as solar contracting, and reconnecting it to the grid as electrical work. Neither is inside a roofing licence. If your guys do it, the panel warranty, the inverter warranty and your own roof warranty are all exposed, and the reinstall has no permit behind it.",
  },
  {
    q: "How fast can you get on a roof?",
    a: "Tell us the tear-off date and we work backwards from it. Detach is normally one day and we aim to be off the roof the day before your crew arrives. Reset happens as soon as the roof passes its final inspection. We do not hold your job hostage.",
  },
  {
    q: "Who pulls the permit?",
    a: "We do, for the solar side. You keep your roofing permit, we carry the solar one, and we meet that inspector ourselves. Two permits, two trades, no overlap and nothing left open on the property record.",
  },
  {
    q: "Do you quote the homeowner or me?",
    a: "Whichever you prefer. Some roofers want it inside their number so the homeowner sees one price. Others want us to bill the homeowner directly so it stays off their books. Both are normal, just tell us which on the first call.",
  },
  {
    q: "Will this work on an insurance job?",
    a: "Yes, and it comes up constantly. Solar detach and reset is often a legitimate line on a roof claim, because the array physically has to move for the covered repair to happen. We write our quotes so they can be handed straight to an adjuster without being reworked.",
  },
  {
    q: "What about the old mounts?",
    a: "They go in the skip with the old roof. Every attachment on your new roof is new and flashed by us, so your roof warranty is not sitting on top of somebody else's ten-year-old penetrations.",
  },
  {
    q: "Do you poach the homeowner?",
    a: "No. We do solar. You do roofs. We are not going to quote your customer a roof and we are not interested in one. Roofers send us repeat work precisely because that line never gets crossed.",
  },
];

export const Route = createFileRoute("/solar-detach-and-reset")({
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
          name: "Solar Detach & Reset",
          description: DESC,
          url: URL,
          image: HERO_IMG,
        }),
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Detach and reset for roofers", path: "/solar-detach-and-reset" },
        ]),
        faqSchema(FAQS),
      ),
    ],
  }),
  component: RooferPage,
});

function RooferPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <PageHero
        eyebrow="For roofing contractors"
        title={
          <>
            Solar detach and reset,{" "}
            <span className="text-orange">on your tear-off schedule.</span>
          </>
        }
        sub="You cannot legally touch the panels and you should not want to. Give us the tear-off date. We pull the array, carry the solar permit, and set it back on new flashed mounts after your final inspection. Orlando to Miami."
        crumbs={[{ name: "Detach and reset for roofers", to: "/solar-detach-and-reset" }]}
        image={HERO_IMG}
      >
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          {links.hasPhone && (
            <a
              href={links.call}
              onClick={() => trackEvent("call_click", { channel: "call", label: "roofer-hero" })}
              className="btn-base btn-primary w-full sm:w-auto"
            >
              Call {links.phoneDisplay}
            </a>
          )}
          <a href="#quote" className="btn-base btn-ghost-light w-full sm:w-auto">
            Book A Job
          </a>
        </div>
      </PageHero>
      <TrustStrip />

      <section className="container-x grid gap-8 py-12 sm:py-20 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="eyebrow">Why bring us in</p>
          <h2 className="mt-3 text-2xl font-extrabold text-navy sm:text-3xl">
            The array stops being your problem
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Solar on a re-roof turns a clean job into a scheduling headache and a liability you did
            not price for. Every year more Florida roofs have panels on them, and every year more
            roofers get stuck holding a warranty argument they had nothing to do with.
          </p>
          <ul className="mt-6 grid gap-3">
            {[
              "We carry the solar licence and the solar permit, you keep yours",
              "Detach is done and off the roof before your crew shows up",
              "Panels labelled, photographed and stored, with the risk on us",
              "New flashed attachments on your new roof, never the old mounts",
              "Reset as soon as your roof passes final, not two weeks later",
              "Written production check after restart, so nobody blames the roof",
              "One number that answers, not a call centre",
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
          <p className="eyebrow">Straight deal</p>
          <h3 className="mt-3 text-xl font-extrabold text-navy">We do not do roofs</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            That is the whole point. We are not going to turn up at your customer's house and quote
            them a roof, now or later. Solar is what we do, and roofers are where a lot of our work
            comes from. That only keeps working if the line never moves.
          </p>
          <dl className="mt-6 space-y-3 text-sm">
            <div className="rounded-2xl bg-steel p-4">
              <dt className="font-extrabold text-navy">Bill you or bill them</dt>
              <dd className="mt-1 text-muted-foreground">
                Inside your number or straight to the homeowner. Your call, job by job.
              </dd>
            </div>
            <div className="rounded-2xl bg-steel p-4">
              <dt className="font-extrabold text-navy">Adjuster-ready quotes</dt>
              <dd className="mt-1 text-muted-foreground">
                Written so it can go on a claim scope without being reworked.
              </dd>
            </div>
            <div className="rounded-2xl bg-steel p-4">
              <dt className="font-extrabold text-navy">Licensed and insured</dt>
              <dd className="mt-1 text-muted-foreground">
                Certificate on request before we set foot on your job.
              </dd>
            </div>
          </dl>
          {links.hasPhone && (
            <a
              href={links.call}
              onClick={() => trackEvent("call_click", { channel: "call", label: "roofer-card" })}
              className="btn-base btn-primary mt-6 w-full"
            >
              Call {links.phoneDisplay}
            </a>
          )}
          <a
            href={links.email}
            onClick={() => trackEvent("email_click", { channel: "email", label: "roofer-card" })}
            className="btn-base btn-navy mt-3 w-full"
          >
            Email the job details
          </a>
        </div>
      </section>

      <section className="bg-steel py-12 sm:py-20">
        <div className="container-x">
          <p className="eyebrow">How we slot in</p>
          <h2 className="mt-3 text-2xl font-extrabold text-navy sm:text-3xl">
            Four steps around your crew
          </h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                h: "You send the date",
                p: "Address, tear-off date, panel count if you have it. A photo of the array is enough for a quote.",
              },
              {
                h: "We detach",
                p: "Array down, labelled and stored, usually one day, finished before your crew arrives.",
              },
              {
                h: "You roof it",
                p: "Clean deck, no panels, no working around an obstacle course. Your permit, your inspection.",
              },
              {
                h: "We reset",
                p: "New flashed mounts, rails, panels, reconnect, restart, and a written production check.",
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
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/florida-solar-permit-law" className="btn-base btn-navy w-full sm:w-auto">
              Why your licence does not cover it
            </Link>
            <Link
              to="/solar-panel-removal-cost"
              className="btn-base btn-ghost w-full sm:w-auto"
            >
              What it costs per panel
            </Link>
          </div>
        </div>
      </section>

      <Faqs items={FAQS} heading="Roofers ask us this" />

      <section className="container-x py-6 sm:py-10">
        <p className="eyebrow">Where we work</p>
        <h2 className="mt-3 text-2xl font-extrabold text-navy sm:text-3xl">
          Detach and reset across Orlando to Miami
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
            <p className="eyebrow">Book a job</p>
            <h2 className="mt-3 text-2xl font-extrabold text-navy sm:text-4xl">
              Send us the tear-off date
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              Address, date, roughly how many panels, and whether you want it billed to you or to
              the homeowner. We come back with a fixed number the same day where we can.
            </p>
            {links.hasPhone && (
              <a
                href={links.call}
                onClick={() => trackEvent("call_click", { channel: "call", label: "roofer-form" })}
                className="mt-5 block text-2xl font-extrabold text-navy hover:text-orange-deep"
              >
                {links.phoneDisplay}
              </a>
            )}
          </div>
          <LeadForm
            service="Detach and reset for a roofer"
            source="roofers"
            heading="Roofer job request"
            sub="Tell us the address and the tear-off date. We work backwards from your schedule."
          />
        </div>
      </section>

      <CtaBlock
        heading="Got solar on a re-roof this week?"
        sub="One call and the array stops being your problem. Licensed solar crew, Orlando to Miami."
      />
      <SiteFooter />
      <ContactDock />
    </div>
  );
}
