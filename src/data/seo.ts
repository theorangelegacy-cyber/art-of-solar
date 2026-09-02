/**
 * Single source of truth for the business, the services, and every city page.
 * Change a name, phone or city here and the whole site follows.
 */

/** The real domain. Canonicals, sitemap and schema all hang off this. */
export const SITE_URL = "https://theartofsolar.com";
export const BRAND = "Art of Solar";
export const OWNER = "Artem Sevbo";
export const FACEBOOK_URL = "https://www.facebook.com/ArtofSolarEnergy";

export const BUSINESS = {
  name: BRAND,
  owner: OWNER,
  /**
   * Artem's phone number goes here, digits and formatting, e.g. "+1-561-555-0100"
   * and "(561) 555-0100". Call and Text buttons switch on by themselves the
   * moment it is filled in. Leave blank until it is real.
   */
  phone: "+1-305-790-7079",
  phoneDisplay: "(305) 790-7079",
  email: "info@artofsolarenergy.com",
  facebook: FACEBOOK_URL,
  /** Art of Solar, LLC is registered in Plantation (Broward County). Service-area business, no showroom. */
  locality: "Plantation",
  postalCode: "33317",
  region: "FL",
  country: "US",
  foundingYear: "2020",
  priceRange: "$$",
  logo: `${SITE_URL}/logo-art-of-solar.svg`,
  /** Straight from the Facebook page, plus what the work actually is. */
  description:
    "Private, highly experienced solar installer specializing in residential photovoltaic, pool and hot water systems. Solar panel removal and reinstall for re-roofs, re-racking, troubleshooting, inverter repair, leak repair at the mounts, and service for orphaned systems whose installer went out of business. Licensed and insured. Orlando to Miami.",
};

export const TRUST = [
  "Licensed & insured",
  "Any roofer. Any installer. Any brand.",
  "Orlando to Miami, one crew",
  "Written quote before a panel moves",
];

export type Service = {
  slug: string;
  name: string;
  /** used inside sentences, lowercase */
  phrase: string;
  eyebrow: string;
  short: string;
  img: string;
  intro: string;
  bullets: string[];
  steps: { h: string; p: string }[];
  faqs: { q: string; a: string }[];
};

export const SERVICES: Service[] = [
  {
    slug: "solar-panel-removal-and-reinstall",
    name: "Solar Panel Removal & Reinstall",
    phrase: "solar panel removal and reinstall",
    eyebrow: "Detach & reset for a new roof",
    short:
      "Panels off before tear-off, back on after the final inspection, on new flashed mounts. Your roofer will not touch them. We will.",
    img: "/img/rerack.webp",
    intro:
      "Getting a new roof with solar on it? The array, rails and wiring have to come off first and go back on right, or the new roof leaks and the system never produces the same again. We detach, label, store and reinstall the whole system, re-flash every penetration, and turn it back on. Then we prove it is producing before we leave.",
    bullets: [
      "Full photo record of the array before a single bolt is touched",
      "Panels, optimizers and rails removed, labeled and stored safely",
      "Your roofer's schedule is our schedule: tear-off and reinstall line up",
      "Brand-new flashed attachments on the finished roof, never the old mounts",
      "Rails re-set to spec, panels re-mounted, wiring reconnected and torqued",
      "System restarted, monitoring checked, production verified in writing",
    ],
    steps: [
      {
        h: "Site check and written quote",
        p: "We count panels, look at the rail type and roof, and send a fixed quote.",
      },
      { h: "Detach", p: "Array comes down, documented and labeled, usually in one day." },
      {
        h: "Your roofer works",
        p: "Roof gets replaced and passes its inspection with the roof clear.",
      },
      {
        h: "Reset and restart",
        p: "New attachments, rails and panels go back, and we turn the system on and verify it.",
      },
    ],
    faqs: [
      {
        q: "Can my roofer just take the panels off?",
        a: "Almost no roofer will, and the ones who try usually void something. The panel warranty, the inverter warranty and the roof warranty all assume a solar-licensed crew did the solar part. We handle the solar side and work directly with the roofer's schedule.",
      },
      {
        q: "How long is the system offline?",
        a: "The length of the roof job plus about a day on each side. We reinstall as soon as the roof passes its final inspection.",
      },
      {
        q: "Do you use the old mounts?",
        a: "Never. Old mounts go with the old roof. Every attachment on the new roof is new and flashed, so the roofer's warranty stays intact.",
      },
      {
        q: "Will it need a permit?",
        a: "In most Florida counties, yes. We pull the solar permit and meet the inspector so you do not have to.",
      },
    ],
  },
  {
    slug: "orphaned-solar-system-repair",
    name: "Orphaned Solar System Repair",
    phrase: "orphaned solar system repair",
    eyebrow: "Your installer is gone. We are not.",
    short:
      "Thousands of Florida homeowners are paying for solar that nobody will service. We fix the systems other companies abandoned.",
    img: "/img/orphan.webp",
    intro:
      "A lot of companies rushed into solar, sold thousands of systems across Florida, and shut the doors. The loan payment did not stop. The panels are still on your roof. If your installer vanished, you still own a system that needs troubleshooting, inverter repair and someone who answers the phone. That is us.",
    bullets: [
      "Troubleshooting of dead inverters, tripped breakers, failed optimizers and bad connections",
      "Inverter repair or replacement, string, micro or hybrid",
      "Monitoring app set up again under your own login, not the dead company's",
      "Manufacturer warranty claims filed on panels, inverters and optimizers",
      "Utility reconnection and net-metering paperwork when the system was never turned on",
      "Straight answers on whether a system is worth fixing",
    ],
    steps: [
      {
        h: "Tell us what you have",
        p: "Send a photo of your inverter and the monitoring screen, or we come out and look.",
      },
      {
        h: "Diagnosis and quote",
        p: "You get a written list of what is wrong and what it costs to fix.",
      },
      {
        h: "Repair",
        p: "Parts ordered, warranty claims filed, system repaired by a licensed crew.",
      },
      {
        h: "Back online",
        p: "Production verified, monitoring working, and you finally know who to call.",
      },
    ],
    faqs: [
      {
        q: "My installer went out of business. Is my warranty gone?",
        a: "The installer's workmanship warranty usually is. The manufacturer warranties on the panels, inverter and optimizers are usually still valid, and we file them for you.",
      },
      {
        q: "My system was never turned on. Can you finish it?",
        a: "Often, yes. We inspect the install, fix what is missing, pass the city inspection and handle the utility interconnection so it can finally produce.",
      },
      {
        q: "Do you work on every brand?",
        a: "We work on the common residential brands of panels, string inverters, microinverters and optimizers. Tell us what you have and we will confirm.",
      },
      {
        q: "I am still paying the loan on a system that does not work.",
        a: "That is the most common call we get. Getting the system producing again is almost always far cheaper than the payments you are making for nothing.",
      },
    ],
  },
  {
    slug: "solar-roof-leak-repair",
    name: "Roof Leak & Mount Repair",
    phrase: "roof leak repair around solar mounts",
    eyebrow: "Leaks at the attachments",
    short:
      "Water coming in around the solar attachments is a solar problem, not a roofing problem. We fix the mounts and the flashing.",
    img: "/img/leak.webp",
    intro:
      "A stain on the ceiling under the solar array almost always traces back to a rushed attachment: a lag bolt that missed the rafter, a mount with no flashing, or sealant that gave up in the Florida sun. The roofer blames the solar company, the solar company is gone, and the ceiling keeps getting worse. We lift only the panels that are in the way, fix the attachment properly and put everything back.",
    bullets: [
      "Leak tracing to the exact attachment that is letting water in",
      "Panels and rails lifted only where needed",
      "Missed-rafter and stripped lag bolts relocated and sealed",
      "Proper flashing installed where the original crew used only caulk",
      "Tile, shingle and metal roof attachment types",
      "Photos of the finished repair for your records or insurance",
    ],
    steps: [
      {
        h: "Find the leak",
        p: "We inspect from the attic and the roof to locate the failed attachment.",
      },
      { h: "Written repair quote", p: "You know the price before any panel is lifted." },
      {
        h: "Repair",
        p: "Mount relocated or re-flashed, roof surface repaired, panels re-set.",
      },
      { h: "Verify", p: "Water test where possible, photos of the repair, system checked." },
    ],
    faqs: [
      {
        q: "Should I call a roofer or a solar company?",
        a: "If the leak is at a solar attachment, the panels have to come up to fix it and most roofers will not touch them. Start with us. If it turns out to be a roofing issue, we tell you and we can handle that too.",
      },
      {
        q: "Will my roof warranty cover it?",
        a: "Usually not if the leak is at a solar attachment installed by a different company. Fixing it properly is what protects the rest of the roof.",
      },
      {
        q: "How fast can you come out?",
        a: "Active leaks get priority. Contact us with photos and we schedule the earliest slot on the route.",
      },
    ],
  },
  {
    slug: "solar-system-inspection",
    name: "Solar Inspections & Diagnostics",
    phrase: "solar system inspection",
    eyebrow: "Is it actually producing?",
    short:
      "Production dropped, an error code showed up, or you are buying a house with solar on it. We check the whole system and tell you the truth.",
    img: "/img/inspect.webp",
    intro:
      "A solar array can look fine from the driveway and be producing half of what it should. We inspect the panels, rails, attachments, wiring, inverter and monitoring, then hand you a plain-language report of what is working, what is not, and what it costs to fix. Site surveys, system analysis and city inspection sign-offs included.",
    bullets: [
      "Production check against what the system size should be making",
      "Inverter and optimizer error codes read and explained",
      "Roof attachments checked for movement, corrosion and missing flashing",
      "Wiring, conduit and disconnects inspected for heat damage and loose terminals",
      "Pre-purchase solar inspections for home buyers and real estate agents",
      "Written report with photos you can send to an insurer, a seller or a lender",
    ],
    steps: [
      {
        h: "Book it",
        p: "Tell us the address, the system size if you know it, and what you are seeing.",
      },
      { h: "Inspection", p: "Roof, attic, electrical and monitoring in one visit." },
      {
        h: "Report",
        p: "Photos, findings and a priced list of fixes, in words a homeowner can follow.",
      },
      {
        h: "Your call",
        p: "Fix it with us, use the report with a seller or insurer, or just keep it on file.",
      },
    ],
    faqs: [
      {
        q: "How do I know my system is underproducing?",
        a: "Compare a recent sunny month against the same month last year in your monitoring app, or against your electric bill. If you cannot get into the app, that is the first thing we fix.",
      },
      {
        q: "I am buying a home with solar. Should I get it inspected?",
        a: "Yes. You are inheriting the system, the roof attachments and often a loan or lease. An inspection tells you what you are actually buying.",
      },
      { q: "Do you inspect systems you did not install?", a: "That is most of what we do." },
    ],
  },
  {
    slug: "storm-damage-solar-repair",
    name: "Storm Damage & Insurance Repairs",
    phrase: "storm damage solar repair",
    eyebrow: "After the hurricane",
    short:
      "Cracked panels, lifted rails, water in the inverter. We document it the way adjusters need and put the system back together.",
    img: "/img/storm.webp",
    intro:
      "After a storm the roof gets looked at and the solar gets forgotten, until the insurance check is already spent. We assess wind and water damage to the array, document it the way adjusters need, and repair or re-rack the system once the roof is handled.",
    bullets: [
      "Damage assessment with photos and a written scope for your claim",
      "Cracked or delaminated panel replacement",
      "Bent rails, pulled attachments and lifted arrays re-set to spec",
      "Inverters and disconnects checked for water intrusion",
      "Full detach and reset when the roof itself has to be replaced",
      "Coordination with your roofer and your adjuster",
    ],
    steps: [
      { h: "Assess", p: "We inspect the array and write up the damage with photos." },
      {
        h: "Claim support",
        p: "You get a scope and quote in the format your insurer expects.",
      },
      {
        h: "Repair or re-rack",
        p: "Panels replaced, rails reset, or the whole array detached for the new roof.",
      },
      { h: "Restart", p: "System tested, monitoring confirmed, everything producing again." },
    ],
    faqs: [
      {
        q: "Does homeowners insurance cover solar panels?",
        a: "In Florida, roof-mounted solar is usually covered under the dwelling portion of the policy, but every policy is different. Our written scope helps the adjuster see the solar damage as its own line item.",
      },
      {
        q: "The roofer says the panels have to come off. Now what?",
        a: "That is a detach and reset job. We take the array down, the roofer does the roof, and we put it back on new attachments.",
      },
      {
        q: "Can panels be reused after a hurricane?",
        a: "Often yes, if the glass is intact and the electrical tests pass. We test each one rather than guessing.",
      },
    ],
  },
  {
    slug: "new-solar-pool-and-hot-water-systems",
    name: "New Solar, Pool & Hot Water Systems",
    phrase: "new solar installation",
    eyebrow: "Design, install, inspect",
    short:
      "Site survey, system design and install for photovoltaic, solar pool heating and solar hot water. Built by the crew that fixes everyone else's.",
    img: "/img/new-install.webp",
    intro:
      "We spend most of our week fixing systems that were sold fast and built wrong. So when we design and install a new one, it is built the way we wish the last company had built yours: right attachments, right layout for the roof face, clean wiring, permitted, inspected, and producing what the paperwork says. Photovoltaic, solar pool heating and solar hot water.",
    bullets: [
      "Site survey and shade analysis before any proposal",
      "System design sized to your bill and your roof, not to a sales quota",
      "Residential photovoltaic, solar pool heating and solar hot water",
      "Permits pulled and city inspections passed by us",
      "Utility interconnection and net-metering paperwork handled",
      "Roofing and windows available through the same company, so a re-roof plus solar is one call",
    ],
    steps: [
      { h: "Survey", p: "Roof, shade, electrical panel and your last twelve months of bills." },
      { h: "Design and quote", p: "A layout drawing and a written price, no pressure." },
      { h: "Install", p: "Licensed crew, permitted, inspected." },
      { h: "Power on", p: "Utility approval, monitoring set up under your login, production verified." },
    ],
    faqs: [
      {
        q: "Do you install new systems or only fix old ones?",
        a: "Both. New projects, system design, site surveys and city inspections have always been part of the business. The repair work is just what most people find us for.",
      },
      {
        q: "Solar pool heating or a heat pump?",
        a: "Depends on the pool, the roof face and how many months you want to swim. We will tell you which one actually pays back instead of selling you the bigger ticket.",
      },
      {
        q: "Can you do the roof and the solar together?",
        a: "Yes. Roofing and windows are part of what we do, so a re-roof with new or reinstalled solar can be one contract and one crew.",
      },
    ],
  },
];

export const SERVICE_BY_SLUG: Record<string, Service> = Object.fromEntries(
  SERVICES.map((s) => [s.slug, s]),
);

export type County = {
  name: string;
  slug: string;
  utility: string;
  note: string;
  hvhz?: boolean;
};

/** Ordered north to south, Orlando down to Miami. */
export const COUNTIES: County[] = [
  {
    name: "Orange",
    slug: "orange-county",
    utility: "OUC and Duke Energy",
    note: "Orlando and most of Orange County are served by OUC or Duke Energy. Roof jobs run through Orange County or City of Orlando permitting, and the roof usually has to pass its final inspection before the panels go back up.",
  },
  {
    name: "Seminole",
    slug: "seminole-county",
    utility: "Duke Energy and FPL",
    note: "Seminole County homes are split between Duke Energy and FPL. Both need the interconnection paperwork updated when a system is reinstalled or repaired after a long outage.",
  },
  {
    name: "Osceola",
    slug: "osceola-county",
    utility: "KUA and Duke Energy",
    note: "Kissimmee homes are mostly on KUA, with Duke Energy covering much of the rest of Osceola County. Newer subdivisions here have a lot of solar that was sold by companies that no longer exist.",
  },
  {
    name: "Brevard",
    slug: "brevard-county",
    utility: "FPL",
    note: "The Space Coast is FPL territory. Coastal wind exposure means attachments and flashing get checked carefully on every reinstall.",
  },
  {
    name: "Indian River",
    slug: "indian-river-county",
    utility: "FPL",
    note: "Vero Beach and Sebastian are served by FPL. Barrier island homes see the hardest wind and salt, so we look closely at rail corrosion and mount condition.",
  },
  {
    name: "St. Lucie",
    slug: "st-lucie-county",
    utility: "FPL and Fort Pierce Utilities Authority",
    note: "Port St. Lucie is on FPL, while Fort Pierce runs its own utility. Port St. Lucie has one of the highest concentrations of rooftop solar on the Treasure Coast, and a lot of it was installed by companies that have since closed.",
  },
  {
    name: "Martin",
    slug: "martin-county",
    utility: "FPL",
    note: "Stuart, Palm City, Jensen Beach and Hobe Sound are all FPL. Martin County roofs are often tile, which changes how the mounts and flashing are done on a reinstall.",
  },
  {
    name: "Palm Beach",
    slug: "palm-beach-county",
    utility: "FPL (Lake Worth Beach runs its own utility)",
    note: "Palm Beach County is FPL territory except Lake Worth Beach, which has its own electric utility. Many communities here have HOA rules about how the array looks when it goes back on the new roof, and we follow them.",
  },
  {
    name: "Broward",
    slug: "broward-county",
    utility: "FPL",
    hvhz: true,
    note: "Broward County is inside Florida's High-Velocity Hurricane Zone. Solar attachments, rails and flashing on a reinstall have to meet the stricter product approval rules that apply here.",
  },
  {
    name: "Miami-Dade",
    slug: "miami-dade-county",
    utility: "FPL (Homestead runs its own utility)",
    hvhz: true,
    note: "Miami-Dade is the original High-Velocity Hurricane Zone county. Every mount that goes onto a new roof here needs a Miami-Dade or Florida product approval, and the inspection is strict about it.",
  },
];

/** Cities outside the main route that the Facebook page already lists. */
export const EXTENDED_AREAS = ["Tampa", "Lakeland", "Sebring", "Fort Myers", "Naples"];

export const COUNTY_BY_NAME: Record<string, County> = Object.fromEntries(
  COUNTIES.map((c) => [c.name, c]),
);

export type City = {
  slug: string;
  name: string;
  county: string;
  /**
   * Two or three true sentences about the roofs and the solar in THIS town.
   *
   * This field exists for one reason. Fifty-five city pages built from one
   * template with only the name swapped are, to Google, one page repeated
   * fifty-five times, and it keeps one and drops the rest. Every city needs
   * something real of its own. Keep these accurate and about the work.
   */
  blurb: string;
  /** On or near the water, so attachments and corrosion get looked at harder. */
  coastal?: boolean;
};

function city(name: string, county: string, blurb: string, coastal = false): City {
  return {
    name,
    county,
    blurb,
    coastal,
    slug: name
      .toLowerCase()
      .replace(/\./g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, ""),
  };
}

export const CITIES: City[] = [
  city(
    "Orlando",
    "Orange",
    "Orlando roofs run from 1950s bungalows in Colonialtown to tile-and-truss builds out by Lake Nona, so no two removals here get quoted the same way. A lot of the city sits under OUC rather than the big statewide utility, which changes who the reconnection paperwork goes to. We work Orlando constantly, so the drive never becomes a surcharge.",
  ),
  city(
    "Winter Park",
    "Orange",
    "Winter Park has some of the oldest housing stock we work on, and plenty of it is barrel tile over a roof that has already been replaced once or twice. Tile has to be lifted and set back by hand, and it breaks when a crew is in a hurry. The city also runs its own electric utility, so reconnection here is not the same form as the county next door.",
  ),
  city(
    "Winter Garden",
    "Orange",
    "Winter Garden is mostly newer construction, which usually means shingle over a clean truss layout and a straightforward detach. The catch is the HOA density out here: a lot of these neighbourhoods have rules about where an array can sit once it goes back up. We put the reinstall layout in writing so nothing gets argued after the fact.",
  ),
  city(
    "Apopka",
    "Orange",
    "Apopka has a wide spread of roof ages, from older ranch homes north of 441 to whole subdivisions that went up in the last fifteen years. The older Apopka roofs are where we most often find mounts that were never flashed properly, and that shows up as a ceiling stain long before anyone thinks to blame the solar.",
  ),
  city(
    "Ocoee",
    "Orange",
    "Ocoee sits right on the turnpike run, so we can usually get a crew here without stacking a travel day onto the quote. Most Ocoee arrays we see are shingle installs from the last solar boom, which reuse their rails well and keep the reinstall price at the lower end of the range.",
  ),
  city(
    "Sanford",
    "Seminole",
    "Sanford mixes a genuinely historic downtown with newer builds out toward the airport, and the old houses are the interesting ones: steep pitches, small roof planes and not much room to work around an array. Steep, cut-up roofs take longer to detach, and a quote that ignores that will change on the day.",
  ),
  city(
    "Lake Mary",
    "Seminole",
    "Lake Mary is heavy on 1990s and 2000s subdivisions, so we see a lot of dimensional shingle with room to spare on the roof plane. These are clean, predictable detach and reset jobs, which is why Lake Mary quotes come back fast and land near the middle of the range.",
  ),
  city(
    "Altamonte Springs",
    "Seminole",
    "Altamonte has a lot of roofs coming due for replacement at exactly the same time the solar on them is hitting ten years old. That pairing is worth knowing about, because if the inverter is near the end of its life it is far cheaper to deal with while the array is already down.",
  ),
  city(
    "Oviedo",
    "Seminole",
    "Oviedo has tree cover most of Florida would envy, and shade is the first thing we check here. Half the Oviedo systems we get called out to for underproduction do not have a fault at all, they have twenty years of oak growth. We tell you which one it is before quoting anything.",
  ),
  city(
    "Longwood",
    "Seminole",
    "Longwood roofs skew older and the lots are wooded, so access is often the real constraint rather than the array. If a lift cannot reach the right side of the house that is a genuine cost, and we would rather say so at the quote than discover it on the morning of the tear-off.",
  ),
  city(
    "Casselberry",
    "Seminole",
    "Casselberry is mostly modest single-storey homes, which is the cheapest possible detach and reset: walkable pitch, short carry, no fall-protection setup eating half a day. Small systems here often come in well under what people expect after reading national price guides.",
  ),
  city(
    "Kissimmee",
    "Osceola",
    "A big share of Kissimmee sits on the Kissimmee Utility Authority rather than the statewide utility, so reconnection paperwork runs a different route. There is also a lot of short-term rental property here, and those owners care most about days offline. We schedule around the booking calendar where we can.",
  ),
  city(
    "St. Cloud",
    "Osceola",
    "St. Cloud has grown fast, so brand new arrays sit a street away from twenty-year-old roofs. A new system on an old roof is the one worth planning early: if the roof has five years left, doing the roof and the detach together costs far less than paying for the array to come down twice.",
  ),
  city(
    "Titusville",
    "Brevard",
    "Titusville is coastal-adjacent and salt air reaches further inland here than people expect. Corrosion on rails, clamps and grounding hardware is what we check on every Titusville array, because a corroded attachment is the one that fails in a storm rather than on a sunny afternoon.",
    true,
  ),
  city(
    "Cocoa",
    "Brevard",
    "Cocoa spans the mainland and the beachside, and those are two different jobs. Beachside means salt exposure, tougher attachment hardware and a harder look at every fastener. We price them separately instead of pretending the whole city is one market.",
    true,
  ),
  city(
    "Merritt Island",
    "Brevard",
    "Merritt Island sits between two bodies of water, so every array here lives in salt air year round. Stainless and coated hardware is not an upgrade on this island, it is the baseline, and reusing corroded clamps on a new roof is how a system ends up on the ground after a storm.",
    true,
  ),
  city(
    "Melbourne",
    "Brevard",
    "Melbourne has a large installed base of residential solar and a matching number of systems whose original installer no longer exists. It is one of the places we are called most often for orphaned system work rather than roof work, and the two frequently turn out to be the same visit.",
    true,
  ),
  city(
    "Palm Bay",
    "Brevard",
    "Palm Bay is enormous and mostly newer single-family homes, which means a lot of shingle and a lot of solar that went up during the boom. Straightforward detach and reset country, and because there is so much of it we can often line up two jobs in a day and pass the saving on.",
  ),
  city(
    "Vero Beach",
    "Indian River",
    "Vero Beach has a strong barrel-tile tradition on the mainland and a barrier island where salt drives every hardware decision. Tile plus salt is the most demanding combination we work in, and it is where reusing the old mounts on a new roof causes the most damage.",
    true,
  ),
  city(
    "Sebastian",
    "Indian River",
    "Sebastian is largely single-storey and walkable, which keeps the labour side of a detach and reset low. What we watch here is river-side salt exposure on the eastern edge of town, where hardware ages noticeably faster than a few miles inland.",
    true,
  ),
  city(
    "Port St. Lucie",
    "St. Lucie",
    "Port St. Lucie is one of the fastest-growing cities in the state and it has solar on a huge number of newer shingle roofs. Because the housing stock is young, the array is often in better shape than anything else up there, and the honest answer is frequently that the panels are fine and the problem is one part.",
  ),
  city(
    "Fort Pierce",
    "St. Lucie",
    "Fort Pierce runs its own municipal utility, so reconnection here goes through a different desk than the county to the south. There is also a lot of older housing near the water, where we check attachment corrosion before we check anything else.",
    true,
  ),
  city(
    "Stuart",
    "Martin",
    "Stuart has a lot of tile, a lot of water, and a lot of homes where the roof and the array were done years apart by two companies that never spoke to each other. Untangling that is normal work for us: we document what is actually up there before anybody quotes a price.",
    true,
  ),
  city(
    "Palm City",
    "Martin",
    "Palm City is heavy on larger homes with cut-up roof planes and multiple arrays facing different ways. More roof planes means more rails, more penetrations and more time, and that is the single biggest reason a Palm City quote can sit above a same-size system elsewhere.",
  ),
  city(
    "Jensen Beach",
    "Martin",
    "Jensen Beach is coastal through and through, so corrosion and wind attachment carry the whole conversation. We would rather replace tired clamps during the reinstall than lay a new roof underneath hardware that is already on its way out.",
    true,
  ),
  city(
    "Hobe Sound",
    "Martin",
    "Hobe Sound runs from modest inland homes to large properties near the water, so quotes here vary more than almost anywhere else on our route. Access is often the deciding factor, because long driveways and mature landscaping change how a crew can stage a detach.",
    true,
  ),
  city(
    "Jupiter",
    "Palm Beach",
    "Jupiter is tile country with serious wind exposure, and roofs here are often replaced before they truly need to be because an insurer asked for it. So we do a lot of detach and reset on arrays that are barely used, where the whole job is about protecting equipment that is still nearly new.",
    true,
  ),
  city(
    "Palm Beach Gardens",
    "Palm Beach",
    "Palm Beach Gardens has a high concentration of managed communities, and getting a reinstall layout approved matters as much as getting it engineered. We put the panel layout in writing before the roof comes off, so nothing is a surprise to the association afterwards.",
  ),
  city(
    "West Palm Beach",
    "Palm Beach",
    "West Palm Beach has one of the widest roof ranges we work in, from small older homes west of the tracks to substantial properties near the water. The older West Palm roofs are where we most often find that the original solar penetrations were never properly flashed.",
    true,
  ),
  city(
    "Wellington",
    "Palm Beach",
    "Wellington is mostly newer and mostly tile, with large single-storey footprints that are pleasant to work on and slow to re-tile. Tile is the cost driver here, not the panels, and a quote that never mentions tile breakage is not a complete quote.",
  ),
  city(
    "Royal Palm Beach",
    "Palm Beach",
    "Royal Palm Beach is largely 1990s and 2000s suburban stock, which detaches and resets predictably. It is also far enough inland that salt corrosion stops being the first thing we look at, and rail condition and flashing take over as the main questions.",
  ),
  city(
    "Lake Worth Beach",
    "Palm Beach",
    "Lake Worth Beach has its own municipal electric utility, which catches out contractors who assume the whole county runs on one system. Reconnection paperwork here goes to the city, and getting that wrong is how a reinstalled system sits dark for weeks.",
    true,
  ),
  city(
    "Boynton Beach",
    "Palm Beach",
    "Boynton Beach has a big spread of older condos and single-family homes, and a lot of solar that went up fast during the boom years. Fast installs are the ones where we most often find mounts that were never flashed and rails that were never torqued to spec.",
    true,
  ),
  city(
    "Delray Beach",
    "Palm Beach",
    "Delray Beach mixes historic bungalows near the ocean with newer builds further west, so the roof under an array can be anything from original wood to a modern truss. We look at what is under the panels before quoting, because on the older ones the deck is the real story.",
    true,
  ),
  city(
    "Boca Raton",
    "Palm Beach",
    "Boca Raton is dense with barrel tile and dense with associations, which makes it one of the more demanding places to reset an array cleanly. Tile that has baked in the sun for twenty years does not go back the way it came off unless somebody is patient with it, and we price for that instead of hoping.",
    true,
  ),
  city(
    "Deerfield Beach",
    "Broward",
    "Deerfield Beach sits inside Florida's High-Velocity Hurricane Zone, so every attachment on a reinstall has to carry the right product approval and the whole thing gets inspected. That is stricter than anything north of the county line, and it is not optional.",
    true,
  ),
  city(
    "Pompano Beach",
    "Broward",
    "Pompano Beach combines the hurricane-zone rules with heavy salt exposure, which is the toughest specification we work to. Hardware that is perfectly legal in Orlando does not meet the standard here, and reusing old clamps on a new Pompano roof is not something we will do.",
    true,
  ),
  city(
    "Coral Springs",
    "Broward",
    "Coral Springs is planned, newer and consistent, so detach and reset here is about as predictable as this work gets. It is still inside the hurricane zone, which means the attachments and the permit are held to the tougher Broward standard even when the roof itself is simple.",
  ),
  city(
    "Fort Lauderdale",
    "Broward",
    "Fort Lauderdale runs from waterfront properties to older inland neighbourhoods, and the hurricane-zone attachment rules apply to all of it. On the water we are dealing with salt as well, so corrosion checks and product-approved hardware come as a pair rather than separately.",
    true,
  ),
  city(
    "Plantation",
    "Broward",
    "Plantation is where Art of Solar is registered, so this is home ground and the response is fastest here. It is mature suburban housing, largely single-storey, inside the hurricane zone: simple roofs held to strict attachment rules.",
  ),
  city(
    "Sunrise",
    "Broward",
    "Sunrise is dense mid-century and later suburban housing with a lot of low-slope, walkable roofs. Low slope is quick to work on but unforgiving about flashing, so the quality of the new mounts matters more here than the difficulty of the climb.",
  ),
  city(
    "Davie",
    "Broward",
    "Davie has an unusual mix for Broward: large lots, outbuildings and the occasional ground mount alongside ordinary suburban roofs. Ground mounts and barn roofs are their own quote, and we would rather look at one in person than guess from a satellite image.",
  ),
  city(
    "Weston",
    "Broward",
    "Weston is newer, tile-heavy and almost entirely association-governed, so a reinstall has to satisfy the hurricane-zone inspector and the community rules at the same time. We handle the permit side and put the layout in writing for the association.",
  ),
  city(
    "Pembroke Pines",
    "Broward",
    "Pembroke Pines has a very large installed base of residential solar, and a lot of it went up through dealer networks that no longer exist. It is one of our busiest areas for orphaned system work, and often the roof job and the repair turn out to be the same visit.",
  ),
  city(
    "Miramar",
    "Broward",
    "Miramar is mostly newer construction with clean roof planes, which keeps detach and reset straightforward. Being inside the hurricane zone, the attachments still have to be product-approved and inspected, so simple does not mean casual here.",
  ),
  city(
    "Hollywood",
    "Broward",
    "Hollywood has older housing close to the ocean, which is the combination that ages solar hardware fastest: salt, sun, and roofs that have already been replaced once. We check every fastener on a Hollywood array before agreeing to put it back on a new roof.",
    true,
  ),
  city(
    "Miami",
    "Miami-Dade",
    "Miami is the strictest jurisdiction we work in. High-Velocity Hurricane Zone rules govern every attachment, the product approvals get checked, and the reinstall is properly inspected. It also has enormous barrel-tile stock, so this is where careful tile handling matters most of all.",
    true,
  ),
  city(
    "Miami Gardens",
    "Miami-Dade",
    "Miami Gardens is largely single-storey older housing, which is easy to work on and often has roofs that are overdue. When a roof is that tired, taking the array down is usually the moment you find out what the deck underneath is really like.",
  ),
  city(
    "Hialeah",
    "Miami-Dade",
    "Hialeah is dense, tile-heavy, and full of homes where there is genuinely tight space to stage a detach. Where a crew can park and where the panels can safely sit for a week are real questions here, and we sort them out before the day rather than on it.",
  ),
  city(
    "Doral",
    "Miami-Dade",
    "Doral is newer, planned and tile, with a lot of two-storey homes. Two storeys means fall protection and a longer carry, and that is the honest reason a Doral quote sits above a single-storey system of the same size.",
  ),
  city(
    "Miami Beach",
    "Miami-Dade",
    "Miami Beach is salt air, wind exposure and the toughest attachment rules in the state all at once. Hardware corrodes visibly faster here, and anything we put back on a new roof is product-approved and new, never recovered off the old one.",
    true,
  ),
  city(
    "Coral Gables",
    "Miami-Dade",
    "Coral Gables has beautiful old barrel-tile roofs and a design review culture to match, so how an array looks when it goes back matters as much as how it performs. We agree the reinstall layout with you in writing before the panels come down.",
    true,
  ),
  city(
    "Kendall",
    "Miami-Dade",
    "Kendall is sprawling suburban housing with a very large amount of residential solar, much of it sold through companies that have since closed. Between re-roofs and orphaned systems it is one of the areas we are called to most often in Miami-Dade.",
  ),
  city(
    "Cutler Bay",
    "Miami-Dade",
    "Cutler Bay was largely rebuilt after Hurricane Andrew, so the housing stock is newer and built to a tougher standard than the age of the neighbourhood suggests. Those roofs take attachments well and the product approvals are straightforward to satisfy.",
    true,
  ),
  city(
    "Homestead",
    "Miami-Dade",
    "Homestead runs its own municipal electric utility, so reconnection here does not go through the same channel as the rest of the county. It is also the southern end of our route, and we plan Homestead work in blocks so nobody pays for the drive twice.",
  ),
];

export const CITY_BY_SLUG: Record<string, City> = Object.fromEntries(
  CITIES.map((c) => [c.slug, c]),
);

export function citiesInCounty(county: string): City[] {
  return CITIES.filter((c) => c.county === county);
}

export function countyOf(c: City): County {
  return COUNTY_BY_NAME[c.county] ?? COUNTIES[0]!;
}

/** Same county first, then the counties on either side, up to n. */
export function nearbyCities(c: City, n = 8): City[] {
  const idx = COUNTIES.findIndex((k) => k.name === c.county);
  const order = [c.county, COUNTIES[idx - 1]?.name, COUNTIES[idx + 1]?.name].filter(
    Boolean,
  ) as string[];
  const out: City[] = [];
  for (const county of order) {
    for (const x of citiesInCounty(county)) {
      if (x.slug !== c.slug && out.length < n) out.push(x);
    }
  }
  return out;
}

export function cityFaqs(c: City): { q: string; a: string }[] {
  const k = countyOf(c);
  return [
    {
      q: `Do you remove and reinstall solar panels in ${c.name}?`,
      a: `Yes. We detach, store and reinstall solar arrays for roof replacements across ${c.name} and the rest of ${k.name} County, and we coordinate directly with your roofer.`,
    },
    {
      q: `My solar installer in ${c.name} went out of business. Can you service the system?`,
      a: `Yes. Most of the systems we service were installed by companies that are gone. We troubleshoot, repair and maintain solar arrays in ${c.name} no matter who put them up.`,
    },
    {
      q: `Who handles the utility paperwork in ${c.name}?`,
      a: `We do. Homes in ${c.name} are generally served by ${k.utility}. We handle the interconnection and reconnection forms when a system is reinstalled or brought back online.`,
    },
    {
      q: `Is a permit needed to reinstall solar in ${c.name}?`,
      a: k.hvhz
        ? `Yes. ${c.name} sits inside Florida's High-Velocity Hurricane Zone, so the reinstall is permitted and inspected and every attachment has to carry the right product approval. We pull the permit and meet the inspector.`
        : `In almost every case, yes. We pull the solar permit in ${k.name} County and schedule the inspection so you do not have to.`,
    },
  ];
}

export const GENERAL_FAQS = [
  {
    q: "What area do you cover?",
    a: "Florida from Orlando down to Miami: Orange, Seminole, Osceola, Brevard, Indian River, St. Lucie, Martin, Palm Beach, Broward and Miami-Dade counties. Tampa, Lakeland, Sebring, Fort Myers and Naples by arrangement. Outside that, ask and we will tell you honestly.",
  },
  {
    q: "Do you only work on systems you installed?",
    a: "No. Almost everything we do is on systems other companies installed, including companies that have gone out of business. Any brand, any installer, no judgment.",
  },
  {
    q: "Do you work with my roofer?",
    a: "Yes, any licensed roofer. We take the panels down before tear-off, they replace the roof, and we put the array back on new attachments after their final inspection. Roofing companies keep our number for exactly this.",
  },
  {
    q: "Do you also do new installs?",
    a: "Yes. New projects, system design, site surveys, city inspections and inverter repair have always been part of the business, along with solar pool heating and solar hot water. Roofing and windows too, so a re-roof with solar can be one call.",
  },
  {
    q: "How do I get a price?",
    a: "Send the address, a rough panel count and a photo or two through the quote form, or message the Facebook page. You get a written quote before anyone touches a panel.",
  },
  {
    q: "Are you licensed and insured?",
    a: "Yes. All work is done by licensed and insured crews, permitted where the county requires it, and inspected.",
  },
];
