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
const URL = `${SITE_URL}/solar-panel-removal-cost`;
const TITLE = "Solar Panel Removal & Reinstall Cost in Florida (2026)";
const DESC =
  "What it really costs to take solar panels off for a new roof in Florida and put them back: per-panel prices and what a fair quote includes.";

const FAQS = [
  {
    q: "How much does it cost to remove and reinstall solar panels in Florida?",
    a: "Most Florida homes land between $250 and $500 per panel for the full detach and reset, which puts a typical 20 to 30 panel system somewhere around $5,000 to $12,000. The spread is that wide because a single-story tile roof and a two-story tile roof are completely different jobs. The only number that means anything is the one written against your actual roof after somebody has counted the panels and looked at the rails.",
  },
  {
    q: "Why is it priced per panel and not as one flat fee?",
    a: "Because panels are the unit of work. Each one gets unclipped, carried down, labelled, stored, carried back up, re-clipped and re-torqued. A 12-panel system is genuinely half the labour of a 24-panel system. Per-panel pricing is also the easiest way for you to compare two quotes honestly.",
  },
  {
    q: "What makes the price go up?",
    a: "Height and pitch first, because a steep two-story roof needs more fall protection and slows everything down. Then tile, which has to be lifted and re-set by hand and breaks if it is rushed. Then rail type, since some older racking cannot be reused and has to be replaced. Then access, because a crew that cannot get a lift or a ladder to the right side of the house loses hours. Battery systems and ground mounts are their own quote.",
  },
  {
    q: "Is the permit included in the price?",
    a: "In our quotes, yes. Florida counties treat a reinstall as new work, so it needs a permit and an inspection. If a quote you are comparing does not mention the permit, ask, because it is either being left out of the price or being skipped altogether.",
  },
  {
    q: "Do I pay for new mounts as well?",
    a: "Yes, and you want to. The old mounts belong to the old roof and they come off with it. Every attachment on the new roof should be new and flashed, or the roofer will not warranty the roof around them. Good quotes list the new attachments as a line item.",
  },
  {
    q: "Can I just leave the panels on and roof around them?",
    a: "No. A roofer cannot lay a proper new roof under a live array, and most will not warranty a roof they could not fully tear off. Trying to work around the panels usually costs more than removing them, because it turns one clean job into a slow one.",
  },
  {
    q: "Will my insurance or the roofer pay for it?",
    a: "If the roof is being replaced on an insurance claim, the solar detach and reset is often a covered line item on that claim, because the panels have to move for the covered repair to happen. We write our quotes so they can be handed straight to an adjuster. Roofers almost never carry the cost themselves, but many will coordinate it.",
  },
  {
    q: "How long does the whole thing take?",
    a: "Detach is usually one day. Then the roof happens on the roofer's schedule. Reinstall is usually one day once the roof passes its final inspection, plus the time it takes the county to inspect the solar side. Most homeowners are without production for a week or two, not a month.",
  },
];

const DRIVERS = [
  {
    h: "Panel count",
    p: "The main lever. Every panel is handled four times, so the count sets the labour more than anything else.",
  },
  {
    h: "Roof type",
    p: "Shingle is the baseline. Tile costs more because tiles are lifted and re-set by hand and break when rushed. Metal has its own attachment hardware.",
  },
  {
    h: "Height and pitch",
    p: "One story walkable is the easy end. Two stories and a steep pitch means more fall protection and slower work all day.",
  },
  {
    h: "Racking and rails",
    p: "Some older rail systems cannot be safely reused. If yours is one of them, new rails go on the quote as their own line.",
  },
  {
    h: "Permit and inspection",
    p: "Florida counties treat a reinstall as new work. Fees and the inspection visit belong in the price, not as a surprise later.",
  },
  {
    h: "Storage and time on site",
    p: "Panels have to sit somewhere safe while the roof is done. A long roof job means more days of secure storage.",
  },
];

export const Route = createFileRoute("/solar-panel-removal-cost")({
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
          name: "Solar Panel Removal & Reinstall",
          description: DESC,
          url: URL,
          image: HERO_IMG,
        }),
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Removal and reinstall cost", path: "/solar-panel-removal-cost" },
        ]),
        faqSchema(FAQS),
      ),
    ],
  }),
  component: CostPage,
});

function CostPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <PageHero
        eyebrow="Florida pricing, straight"
        title={
          <>
            What it costs to take the panels off{" "}
            <span className="text-orange">and put them back right.</span>
          </>
        }
        sub="Nobody in this trade likes publishing numbers. Here they are anyway. Real Florida ranges, what moves them, and what a fair quote has on it, so you can tell a good price from a guess."
        crumbs={[{ name: "Removal and reinstall cost", to: "/solar-panel-removal-cost" }]}
        image={HERO_IMG}
      >
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          {links.hasPhone && (
            <a
              href={links.call}
              onClick={() => trackEvent("call_click", { channel: "call", label: "cost-hero" })}
              className="btn-base btn-primary w-full sm:w-auto"
            >
              Call {links.phoneDisplay}
            </a>
          )}
          <a href="#quote" className="btn-base btn-ghost-light w-full sm:w-auto">
            Get My Number In Writing
          </a>
        </div>
      </PageHero>
      <TrustStrip />

      <section className="container-x py-12 sm:py-20">
        <p className="eyebrow">The range</p>
        <h2 className="mt-3 text-2xl font-extrabold text-navy sm:text-3xl">
          Florida detach and reset, 2026
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            {
              n: "$250 – $500",
              l: "per panel",
              p: "The whole job for one panel: off, stored, new flashed mount, back on, reconnected.",
            },
            {
              n: "$5,000 – $12,000",
              l: "typical 20–30 panel home",
              p: "Where most Florida houses land once the roof type and height are known.",
            },
            {
              n: "1 day + 1 day",
              l: "your time offline",
              p: "One day to take it down, one to put it back, with the roof job in between.",
            },
          ].map((c) => (
            <div key={c.l} className="rounded-3xl border border-line bg-white p-6">
              <p className="text-3xl font-extrabold text-navy sm:text-4xl">{c.n}</p>
              <p className="mt-1 text-xs font-bold tracking-[0.14em] text-orange-deep uppercase">
                {c.l}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">{c.p}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-sm text-muted-foreground">
          These are honest ranges for Orlando down to Miami, not a quote. A quote needs a panel
          count, a roof type and a look at the rails. We give you that in writing, free, before
          anything is touched.
        </p>
      </section>

      <section className="bg-steel py-12 sm:py-20">
        <div className="container-x">
          <p className="eyebrow">What moves the number</p>
          <h2 className="mt-3 text-2xl font-extrabold text-navy sm:text-3xl">
            Six things that decide your price
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {DRIVERS.map((d) => (
              <div key={d.h} className="rounded-3xl border border-line bg-white p-6">
                <h3 className="text-lg font-extrabold text-navy">{d.h}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x grid gap-8 py-12 sm:py-20 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="eyebrow">Read the quote</p>
          <h2 className="mt-3 text-2xl font-extrabold text-navy sm:text-3xl">
            What a fair quote actually has on it
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            A one-line price with a number and nothing else is not a quote, it is a guess you are
            being asked to trust. Here is what should be written down before you sign anything.
          </p>
          <ul className="mt-6 grid gap-3">
            {[
              "The panel count, in writing, not an estimate off a satellite photo",
              "New flashed attachments listed as their own line, not folded into labour",
              "The permit and the inspection, named and priced",
              "Who stores the panels and where, and who carries the risk while they are down",
              "What happens if a panel or a tile breaks during the work",
              "A restart and production check after the reinstall, in writing",
              "The licence number of whoever is actually doing the solar work",
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
          <p className="eyebrow">Red flags</p>
          <h3 className="mt-3 text-xl font-extrabold text-navy">When to walk away</h3>
          <ul className="mt-4 space-y-3 text-sm text-navy">
            {[
              "A price given over the phone with no panel count",
              "No mention of a permit anywhere in the paperwork",
              "The roofer says his guys will handle the panels",
              "Reusing the old mounts on the new roof",
              "Cash up front before anything is scheduled",
              "No licence number you can look up",
            ].map((t) => (
              <li key={t} className="flex gap-3 rounded-2xl bg-steel p-4">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-navy text-xs font-black text-white">
                  !
                </span>
                {t}
              </li>
            ))}
          </ul>
          <Link to="/florida-solar-permit-law" className="btn-base btn-navy mt-6 w-full">
            Who can legally touch it
          </Link>
        </div>
      </section>

      <Faqs items={FAQS} heading="Removal and reinstall cost: common questions" />

      <section className="container-x py-6 sm:py-10">
        <p className="eyebrow">Where we quote</p>
        <h2 className="mt-3 text-2xl font-extrabold text-navy sm:text-3xl">
          Written quotes across Orlando to Miami
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
            <p className="eyebrow">Get your number</p>
            <h2 className="mt-3 text-2xl font-extrabold text-navy sm:text-4xl">
              A real price, in writing, free
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              Send the address and roughly how many panels. A photo of the array from the street
              gets you an accurate number fastest.
            </p>
            {links.hasPhone && (
              <a
                href={links.call}
                onClick={() => trackEvent("call_click", { channel: "call", label: "cost-form" })}
                className="mt-5 block text-2xl font-extrabold text-navy hover:text-orange-deep"
              >
                {links.phoneDisplay}
              </a>
            )}
          </div>
          <LeadForm
            service="Removal and reinstall quote"
            source="cost-guide"
            heading="What will mine cost?"
          />
        </div>
      </section>

      <CtaBlock
        heading="Getting a new roof with solar on it?"
        sub="One licensed crew for the solar side, lined up with your roofer's schedule. Orlando to Miami."
      />
      <SiteFooter />
      <ContactDock />
    </div>
  );
}
