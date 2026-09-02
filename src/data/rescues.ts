/**
 * Orphaned-system rescue pages.
 *
 * When a solar company shuts down, its customers go looking for it by name:
 * "Titan Solar out of business", "who services my Sunnova system now".
 * That search is the highest-intent one in this whole niche and almost nobody
 * in South Florida answers it. One page per dead installer, plus a hub.
 *
 * Every fact below is public record. Keep it plain and dated. Art of Solar is
 * not connected to any of these companies and never was; every page says so.
 */

export type Rescue = {
  slug: string;
  /** Company name exactly as a homeowner would type it. */
  name: string;
  /** Extra spellings people search, used in the page copy and the meta. */
  aka: string[];
  /** One line for cards and lists. */
  short: string;
  /** What actually happened, dated. */
  what: string;
  /** What it means for the equipment on the roof. */
  impact: string;
  /** The specific things we see on these systems. */
  signs: string[];
};

export const RESCUES: Rescue[] = [
  {
    slug: "titan-solar-power",
    name: "Titan Solar Power",
    aka: ["Titan Solar", "Titan Solar Power LLC"],
    short: "Closed in June 2024. Thousands of Florida roofs were left mid-warranty.",
    what: "Titan Solar Power stopped work in June 2024 and filed for Chapter 7 bankruptcy. It was one of the biggest installers in the country, working through dealers, so plenty of Florida homeowners never dealt with Titan directly and only found out when nobody answered the service line.",
    impact:
      "Chapter 7 means the company is gone for good, so its own labor and roof-penetration warranty is gone with it. The panels, inverters and optimizers on your roof still carry their own factory warranties, and those are usually 10 to 25 years. Somebody licensed has to file them for you.",
    signs: [
      "Monitoring app still shows the old company name and nobody replies",
      "One string or one row of panels stopped producing and never came back",
      "Optimizers reporting faults that were never chased down",
      "Permit or final inspection left open with the county",
      "Mounts that were never flashed properly and are now staining a ceiling",
    ],
  },
  {
    slug: "vision-solar",
    name: "Vision Solar",
    aka: ["Vision Solar LLC"],
    short: "Filed for bankruptcy in January 2024 after state lawsuits.",
    what: "Vision Solar filed for bankruptcy in January 2024. Before that it had been sued by attorneys general in several states, Florida included, over how its systems were sold. Many of its jobs were finished in a hurry or never finished at all.",
    impact:
      "A lot of Vision Solar systems in Florida were left with paperwork problems rather than equipment problems: permits never closed, interconnection never finished, or a system that was switched on but never approved. That is fixable, but it needs a licensed solar contractor to walk it through the county and the utility.",
    signs: [
      "System runs but was never approved for permission to operate",
      "Open permit sitting on the property record",
      "Net metering never set up, so the meter never credits you",
      "Production far below what the sales sheet promised",
      "Nobody ever came back for the final inspection",
    ],
  },
  {
    slug: "lumio",
    name: "Lumio",
    aka: ["Lumio Holdings", "Lumio Solar"],
    short: "Filed for bankruptcy in 2024 after rolling up several installers.",
    what: "Lumio Holdings filed for bankruptcy in 2024. The company had grown by buying up smaller installers, and service records were spread across the companies it absorbed, so many homeowners cannot even find out who physically did the work on their roof.",
    impact:
      "With Lumio the biggest problem is usually records. We start by reading the equipment itself, the panel labels, the inverter serial and the monitoring account, instead of chasing paperwork that no longer exists. From there the factory warranties can still be claimed.",
    signs: [
      "No idea which crew actually installed the system",
      "Monitoring login that no longer works or was never handed over",
      "Inverter faulting with nobody to call",
      "Missing as-built drawings when you try to re-roof",
      "A second company already looked at it and would not take it on",
    ],
  },
  {
    slug: "sunnova",
    name: "Sunnova",
    aka: ["Sunnova Energy", "Sunnova Energy International"],
    short: "Filed for Chapter 11 in June 2025. Leases and PPAs across Florida.",
    what: "Sunnova Energy International filed for Chapter 11 bankruptcy protection in June 2025. Sunnova was one of the largest lease and power-purchase-agreement providers in the country, so a lot of Florida homeowners have a Sunnova agreement on a system that some other company physically installed.",
    impact:
      "A lease or PPA is a contract about who owns the system, and that is separate from who can service it. Read your agreement before anyone touches the array, because on some leases the equipment is not yours. We will tell you straight whether we can work on it and what your agreement allows.",
    signs: [
      "You pay a monthly solar bill to a company you cannot reach",
      "Service requests going unanswered for months",
      "System down but you are still being billed for it",
      "Nobody will re-roof the house because of the lease",
      "You are selling the house and the agreement is blocking the closing",
    ],
  },
  {
    slug: "sunpower",
    name: "SunPower",
    aka: ["SunPower Corporation"],
    short: "Filed for Chapter 11 in August 2024. Big installed base in Florida.",
    what: "SunPower filed for Chapter 11 bankruptcy protection in August 2024. It was one of the best-known names in home solar for two decades, and its panels are on a lot of Florida roofs, so the shutdown left a large installed base with no first-party service.",
    impact:
      "SunPower hardware is good hardware and most of it is still under a long factory warranty. What went away was the company that used to handle the claim for you. Some SunPower equipment uses its own connectors and monitoring, so it needs someone who has actually worked on it before.",
    signs: [
      "Monitoring account stopped reporting or will not let you in",
      "A microinverter or two offline and no way to file the claim",
      "Told your warranty is void when it probably is not",
      "Need a re-roof and cannot find anyone who will touch the array",
      "Panels producing, but well under what they used to",
    ],
  },
  {
    slug: "adt-solar",
    name: "ADT Solar",
    aka: ["ADT Solar", "Sunpro Solar"],
    short: "ADT shut its solar arm in 2024. Many jobs began as Sunpro.",
    what: "ADT announced in January 2024 that it was closing ADT Solar and getting out of the residential solar business. The division had been built on Sunpro Solar, so plenty of Florida systems were sold under one name and installed under the other.",
    impact:
      "The security side of ADT is a different company from the solar side that closed, which confuses a lot of homeowners into thinking someone is still coming. Nobody is. The equipment warranties are still live and the system can be taken over, but it needs a licensed solar contractor to do it.",
    signs: [
      "Paperwork says Sunpro but the sticker says ADT, or the other way round",
      "Service line sends you to home security and nowhere else",
      "Panels fine, inverter dead, no claim ever filed",
      "Roof penetrations leaking under the array",
      "Warranty book with a phone number that no longer works",
    ],
  },
  {
    slug: "pink-energy",
    name: "Pink Energy",
    aka: ["Pink Energy", "PowerHome Solar"],
    short: "Closed in October 2022. Formerly PowerHome Solar.",
    what: "Pink Energy, which most customers first knew as PowerHome Solar, shut down and filed for Chapter 7 bankruptcy in October 2022. Its systems have now been unserviced for years, so they are usually the roughest ones we see.",
    impact:
      "After this long, the problem is rarely just one part. These systems normally need a full inspection first: what is actually installed, what is still under a factory warranty, what has to be replaced, and whether the roof under the array is still sound. We put all of that in writing before any work is quoted.",
    signs: [
      "System has been partly or fully down for years",
      "Panels visibly dirty, shifted or missing clamps",
      "Water staining on the ceiling under the array",
      "Sold as a whole-home backup that never worked that way",
      "Financing still being paid on a system producing almost nothing",
    ],
  },
  {
    slug: "meraki-solar",
    name: "Meraki Solar",
    aka: ["Meraki Solar", "Meraki Installers"],
    short: "Sold its assets in July 2024 and liquidated in 2025.",
    what: "Meraki, a Pensacola-based installer, sold its assets in July 2024 and was wound up through a creditor liquidation filed in Escambia County in August 2025. Its customers are spread across Florida.",
    impact:
      "When a company is liquidated rather than simply closed, service obligations do not automatically follow the assets to the buyer. In practice that means no one is coming unless you hire someone. The factory warranties on the hardware are unaffected.",
    signs: [
      "Told your service moved to another company that then declined the job",
      "Install finished but the utility interconnection never completed",
      "Monitoring never handed over to you",
      "Inverter under warranty with no one to file it",
      "Re-roof coming up and no as-built drawings anywhere",
    ],
  },
];

export const RESCUE_BY_SLUG: Record<string, Rescue> = Object.fromEntries(
  RESCUES.map((r) => [r.slug, r]),
);

/** Questions people actually ask once their installer is gone. */
export const RESCUE_FAQS = [
  {
    q: "My solar company went out of business. Is my warranty gone?",
    a: "Only part of it. The workmanship warranty belonged to the company that closed, so that one is usually gone. The factory warranties on the panels, the inverter and the optimizers belong to the manufacturers, and those are still good, normally 10 to 25 years. They just need a licensed solar contractor to file the claim, because manufacturers will not take one from a homeowner.",
  },
  {
    q: "Can you take over a system another company installed?",
    a: "Yes. That is most of what we do. Any brand, any original installer, in business or not. We inspect what is actually on the roof, tell you in writing what is wrong and what is still covered, and then quote the repair.",
  },
  {
    q: "Do I have to replace the whole system?",
    a: "Almost never. In most orphaned systems the panels are fine and the problem is one inverter, a handful of optimizers, a bad connector, or a mount that was never flashed. Anyone who opens with a full replacement quote before inspecting it is selling, not diagnosing.",
  },
  {
    q: "What does it cost to find out what is wrong?",
    a: "We quote the inspection up front and it is a flat number, not an hourly meter. You get a written report of what is installed, what is failing, what is still under a factory warranty and what the repair costs. The report is yours whether or not you hire us for the fix.",
  },
  {
    q: "I still owe money on a system that does not work. What now?",
    a: "The loan and the equipment are two separate things, and the loan does not go away because the installer did. Get the system producing again first, because that is the part you can actually control, then take the written inspection report to the lender or the finance company. A report from a licensed contractor is worth far more than a phone call.",
  },
  {
    q: "Are you connected to any of these companies?",
    a: "No. Art of Solar has never been part of, owned by, or a dealer for any of them. We are an independent licensed and insured Florida solar contractor that services other people's systems.",
  },
];
