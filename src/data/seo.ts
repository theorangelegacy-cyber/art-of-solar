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
  /**
   * Page title and meta description, written per service.
   *
   * Without these the pages fell back to a pattern, and the pattern produced
   * 200-plus character descriptions that Google chopped mid-sentence, all six
   * ending in the same generic tail. Titles near 55 characters, descriptions
   * near 150, and every one a whole sentence.
   */
  metaTitle: string;
  metaDesc: string;
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
    metaTitle: "Solar Panel Removal & Reinstall for a New Roof | Florida",
    metaDesc: "Panels off before tear-off, back on after your roof passes, on new flashed mounts. Licensed Florida solar crew, Orlando to Miami. Written quote first.",
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
    metaTitle: "Orphaned Solar System Repair | Installer Gone, Florida",
    metaDesc: "Your installer closed and nobody answers. We take over abandoned solar systems anywhere in Florida, any brand. Written diagnosis before any repair.",
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
    metaTitle: "Solar Panel Roof Leak Repair | Florida Mounts & Flashing",
    metaDesc: "Water coming in around the solar mounts is a solar problem, not a roofing one. We reseal and re-flash the attachments. Orlando to Miami, licensed.",
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
    metaTitle: "Solar Panel Inspection & Diagnostics | Florida",
    metaDesc: "Production dropped, an error code appeared, or you are buying a house with solar on it. We test the whole system and give you the truth in writing.",
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
    metaTitle: "Storm Damage Solar Repair & Insurance Claims | Florida",
    metaDesc: "Cracked panels, lifted rails, water in the inverter. We document the damage the way adjusters need it and rebuild the system. Orlando to Miami.",
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
    metaTitle: "New Solar, Pool Heating & Solar Hot Water | Florida",
    metaDesc: "Survey, design and install for home solar, solar pool heating and solar hot water. Built by the crew that repairs everyone else's work. Florida.",
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
  /**
   * The long one: permitting route, roof stock, and what actually goes wrong on
   * roofs in THIS town. Roughly 120 original words, written by hand.
   *
   * Measured by shingling, two city pages shared 93% of their five-word phrases
   * before this field existed. One short paragraph could never move that. This
   * is the field that does.
   */
  detail: string;
  /** The neighbourhoods, and what the phone actually rings about here. */
  seen: string;
  /** On or near the water, so attachments and corrosion get looked at harder. */
  coastal?: boolean;
};

function city(
  name: string,
  county: string,
  blurb: string,
  detail: string,
  seen: string,
  coastal = false,
): City {
  return {
    name,
    county,
    blurb,
    detail,
    seen,
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
    "Orlando permits run through the City of Orlando building department rather than Orange County, and the two want different submittals, so the first thing we establish is which side of the line an address sits on. The roof stock splits hard: pre-war and mid-century bungalows through Colonialtown, Audubon Park and College Park with small planes and original decking, against everything east and south built on engineered truss with concrete tile. On the older houses nobody has seen the deck since the panels went up, so what is under the array is a genuine question. OUC covers most of the city, and its reconnection paperwork is not the same form as Duke's.",
    "We get called across Baldwin Park, Lake Nona, Dr Phillips, College Park and the Milk District, and the job changes with the postcode. Downtown and the older neighbourhoods bring re-roofs where nobody has seen the deck in fifteen years. Lake Nona and Laureate Park bring newer arrays with association rules about the layout. The steadiest stream is homeowners who bought during the boom, never met the installer, and have now discovered the company does not exist.",
  ),
  city(
    "Winter Park",
    "Orange",
    "Winter Park has some of the oldest housing stock we work on, and plenty of it is barrel tile over a roof that has already been replaced once or twice. Tile has to be lifted and set back by hand, and it breaks when a crew is in a hurry. The city also runs its own electric utility, so reconnection here is not the same form as the county next door.",
    "Winter Park runs its own building department and its own electric utility, which is unusual enough that contractors from outside regularly file the wrong paperwork and lose a fortnight. The housing here is among the oldest we work on: 1920s through 1950s, a great deal of it barrel tile that has already been through one or two replacements. Aged tile does not come off and go back the way it came unless somebody is patient with it, and the city cares about what is visible from the street. Mature oak canopy is the other factor, and shade is worth ruling out before anyone quotes a repair.",
    "Most Winter Park calls come off the older streets around Park Avenue and the chain of lakes, and almost all of them involve tile. The two questions we get most are whether the tile will survive a detach, which it will if it is lifted rather than walked on, and why the city utility paperwork is different from a neighbour's a mile away in Orlando.",
  ),
  city(
    "Winter Garden",
    "Orange",
    "Winter Garden is mostly newer construction, which usually means shingle over a clean truss layout and a straightforward detach. The catch is the HOA density out here: a lot of these neighbourhoods have rules about where an array can sit once it goes back up. We put the reinstall layout in writing so nothing gets argued after the fact.",
    "Winter Garden permits through the city, with Orange County covering the unincorporated stretches out toward Horizon West. Almost everything here went up after 2000, which means engineered truss, dimensional shingle or flat concrete tile, and clean roof planes that detach predictably. The complication is not the roof, it is the association: most of these neighbourhoods have rules about where an array can sit, and a reinstall layout that differs from the original will get challenged. We put the layout in writing before anything comes off. Solar penetration here is high because a lot of it came bundled with the build.",
    "The calls cluster around Horizon West, Independence and the newer Hamlin developments, plus the older streets near Plant Street downtown. Nearly all of it is a re-roof on a house young enough that the array is barely used, so the whole job is protecting equipment that still has twenty years in it. The association layout question comes up on most of them.",
  ),
  city(
    "Apopka",
    "Orange",
    "Apopka has a wide spread of roof ages, from older ranch homes north of 441 to whole subdivisions that went up in the last fifteen years. The older Apopka roofs are where we most often find mounts that were never flashed properly, and that shows up as a ceiling stain long before anyone thinks to blame the solar.",
    "Apopka permits through the city, with Orange County handling the unincorporated areas north and west. The roof stock is genuinely mixed: 1960s and 1970s ranch housing along the older corridors, and whole subdivisions from the last fifteen years further out. The older Apopka roofs are where we most often find solar mounts that were never properly flashed, and that shows up as a ceiling stain long before anybody thinks to blame the array. Because the town has grown outward rather than upward, almost everything is single-storey and walkable, which keeps the labour side of a detach sensible.",
    "Apopka calls run from the older streets off 441 through Rock Springs and the Kelly Park growth area. The recurring one is a ceiling stain under an array on a 1970s roof, which is nearly always a mount that was never flashed, and the homeowner has usually been told by two people that it is a roofing problem. It is not.",
  ),
  city(
    "Ocoee",
    "Orange",
    "Ocoee sits right on the turnpike run, so we can usually get a crew here without stacking a travel day onto the quote. Most Ocoee arrays we see are shingle installs from the last solar boom, which reuse their rails well and keep the reinstall price at the lower end of the range.",
    "Ocoee permits through the city and sits right on the turnpike and 429 corridor, which means we can reach it without stacking a travel day onto the quote. The housing is dominated by late-1990s and 2000s subdivisions on dimensional shingle with generous roof planes, so most arrays here have room around them and reuse their rails well. That combination puts Ocoee at the lower end of the price range for a detach and reset. What we find most often is a system installed during the boom by a dealer network that has since folded, with monitoring nobody ever handed over.",
    "Most Ocoee calls come from the subdivisions between Silver Star and the turnpike. Almost all of them are boom-era systems with monitoring nobody ever handed over, so the first job is often just working out what the array is actually doing before anyone can say what it needs. Straightforward roofs, straightforward work, and quotes that come back quickly.",
  ),
  city(
    "Sanford",
    "Seminole",
    "Sanford mixes a genuinely historic downtown with newer builds out toward the airport, and the old houses are the interesting ones: steep pitches, small roof planes and not much room to work around an array. Steep, cut-up roofs take longer to detach, and a quote that ignores that will change on the day.",
    "Sanford runs its own building department and the historic district downtown adds review on anything visible from the street. That district is the interesting work: 1900s through 1930s houses with steep pitches, small cut-up planes and original decking, where a detach takes materially longer than the panel count suggests. Out toward the airport and Lake Mary Boulevard it is ordinary late-century suburban shingle. Homes here fall under Duke or FPL depending on the address, and both want the interconnection updated after a system has been off for more than a few days.",
    "The historic district generates the interesting calls: steep old roofs where a detach takes longer than the panel count suggests, and homeowners who need the city to be happy with what goes back up. Out by the airport and Lake Mary Boulevard it is ordinary re-roof work. Duke or FPL depending on the street, and both need the interconnection refreshed after a long outage.",
  ),
  city(
    "Lake Mary",
    "Seminole",
    "Lake Mary is heavy on 1990s and 2000s subdivisions, so we see a lot of dimensional shingle with room to spare on the roof plane. These are clean, predictable detach and reset jobs, which is why Lake Mary quotes come back fast and land near the middle of the range.",
    "Lake Mary permits through the city and the housing is unusually consistent: 1990s and 2000s subdivisions, dimensional shingle, generous roof planes, mostly two-storey but with straightforward access. Detach and reset here is about as predictable as this work gets, which is why quotes come back fast and land near the middle of the range. The systems tend to be boom-era, sold through dealers, and the failure we see most is an optimizer or two reporting faults that were never chased down because the company that installed it stopped answering the phone.",
    "Lake Mary calls come almost entirely off the 1990s and 2000s subdivisions around Heathrow, Timacuan and Greenwood Lakes. The pattern is consistent: a dealer-sold system with one or two optimizers reporting faults nobody chased, on a roof that is now due. We usually end up doing the diagnosis and the detach in the same visit.",
  ),
  city(
    "Altamonte Springs",
    "Seminole",
    "Altamonte has a lot of roofs coming due for replacement at exactly the same time the solar on them is hitting ten years old. That pairing is worth knowing about, because if the inverter is near the end of its life it is far cheaper to deal with while the array is already down.",
    "Altamonte Springs permits through the city. The defining feature here is timing: a large share of the housing stock reached roof replacement age at almost exactly the moment the boom-era solar on it hit ten years old. That means we are frequently on an Altamonte roof for a re-roof and find an inverter near the end of its service life at the same time. Doing both while the array is already down costs far less than paying twice, and we will say so in writing rather than quietly reinstalling something that is about to fail.",
    "The recurring Altamonte call is a re-roof that turns into a conversation about the inverter, because a lot of this housing hit roof age and ten-year solar age at the same moment. We would rather show the homeowner both numbers while the array is down than reinstall something that fails in eighteen months and costs a second crane day.",
  ),
  city(
    "Oviedo",
    "Seminole",
    "Oviedo has tree cover most of Florida would envy, and shade is the first thing we check here. Half the Oviedo systems we get called out to for underproduction do not have a fault at all, they have twenty years of oak growth. We tell you which one it is before quoting anything.",
    "Oviedo permits through the city and has tree cover most of Florida would envy, which is the first thing we check. A solid share of the Oviedo calls we get for underproduction turn out to be twenty years of oak growth rather than any hardware fault, and telling somebody to call an arborist is a cheaper and more honest answer than selling them an inverter. Where there is a real fault the housing itself is easy: mostly 1990s onward, dimensional shingle, walkable pitches. Duke and FPL split the town depending on the address.",
    "Oviedo calls are disproportionately underproduction, and a real share of them turn out to be tree growth rather than hardware. We check that first and say so, because an honest no-fault answer keeps the phone ringing later. The rest is ordinary re-roof work through the Alafaya and Twin Rivers neighbourhoods.",
  ),
  city(
    "Longwood",
    "Seminole",
    "Longwood roofs skew older and the lots are wooded, so access is often the real constraint rather than the array. If a lift cannot reach the right side of the house that is a genuine cost, and we would rather say so at the quote than discover it on the morning of the tear-off.",
    "Longwood permits through the city and the historic district adds review on the older core. The lots here are heavily wooded and the housing skews older than the rest of Seminole County, so access is very often the real constraint rather than the roof itself. If a lift cannot get to the right side of a house, that is a genuine cost, and we would rather establish it at the quote than discover it on the morning of a tear-off. Shade is worth ruling out on any underproducing Longwood system before anyone quotes hardware.",
    "Longwood calls come off wooded lots where access decides the price more than the roof does. Historic district properties add review on anything visible. The other regular is a shaded array that the homeowner has been quoted a full replacement for, when the actual problem is twenty years of canopy that nobody has trimmed.",
  ),
  city(
    "Casselberry",
    "Seminole",
    "Casselberry is mostly modest single-storey homes, which is the cheapest possible detach and reset: walkable pitch, short carry, no fall-protection setup eating half a day. Small systems here often come in well under what people expect after reading national price guides.",
    "Casselberry permits through the city. The housing is mostly modest single-storey homes from the 1960s through 1980s, which makes for the cheapest possible detach and reset: walkable pitch, short carry from roof to truck, no fall-protection setup eating half a day. Small systems here regularly come in well under what people expect after reading national price guides, and we would rather tell somebody that than let them assume it is unaffordable. The roofs are old enough now that what is under the array is worth looking at properly once it comes off.",
    "Casselberry calls are small systems on modest single-storey houses, and the most common reaction we get is surprise at how affordable a detach and reset actually is on a roof like that. The other regular is a 1970s roof where the array comes off and the decking underneath turns out to be the real story.",
  ),
  city(
    "Kissimmee",
    "Osceola",
    "A big share of Kissimmee sits on the Kissimmee Utility Authority rather than the statewide utility, so reconnection paperwork runs a different route. There is also a lot of short-term rental property here, and those owners care most about days offline. We schedule around the booking calendar where we can.",
    "Kissimmee permits through the city and a large share of the population buys power from Kissimmee Utility Authority rather than Duke, which routes the reconnection paperwork somewhere completely different. The other thing that shapes work here is vacation rental: whole districts along 192 and out toward Celebration are managed properties where a week of downtime costs real money. On those we build the schedule backwards from the booking calendar rather than the roofer's convenience. The housing itself is mostly newer shingle on clean planes, which is straightforward once the timing is agreed.",
    "The two Kissimmee streams are vacation rental managers who need downtime pinned to the day, and homeowners on KUA who cannot work out why their reconnection paperwork goes somewhere different from a friend's in Orlando. Poinciana, Buenaventura Lakes and the 192 corridor produce most of the volume.",
  ),
  city(
    "St. Cloud",
    "Osceola",
    "St. Cloud has grown fast, so brand new arrays sit a street away from twenty-year-old roofs. A new system on an old roof is the one worth planning early: if the roof has five years left, doing the roof and the detach together costs far less than paying for the array to come down twice.",
    "St. Cloud permits through the city and has grown fast enough that brand new arrays sit a street away from twenty-year-old roofs. That mismatch is the whole conversation here. If a roof has five years left and the array is new, doing the roof and the detach together costs far less than paying for the panels to come down twice, and we will lay both numbers out rather than just quoting the job in front of us. The older core near the lake is 1950s and 1960s single-storey housing; everything east is recent subdivision shingle.",
    "St. Cloud calls are usually a homeowner with a five-year-old array on a twenty-year-old roof, asking whether to do it now or wait. We give them both numbers. The older streets near East Lake Toho bring the occasional deck surprise once the panels are off, and we flag that as a possibility at the quote.",
  ),
  city(
    "Titusville",
    "Brevard",
    "Titusville is coastal-adjacent and salt air reaches further inland here than people expect. Corrosion on rails, clamps and grounding hardware is what we check on every Titusville array, because a corroded attachment is the one that fails in a storm rather than on a sunny afternoon.",
    "Titusville permits through the city and salt air reaches further inland here than almost anywhere on our route, which surprises people who assume they are far enough back from the water. Corrosion on rails, clamps and grounding lugs is the first thing we inspect on any Titusville array, because a corroded attachment is the one that fails in a storm rather than on a quiet afternoon. The housing is largely 1960s through 1980s single-storey, much of it now on its second or third roof, and the older systems here are genuinely old by Florida standards.",
    "Titusville calls are corrosion more often than anything else, and homeowners are regularly shocked at how far inland the salt has reached. Grounding lugs and rail splices go first. The other stream is genuinely old systems, some of the earliest residential solar on our route, where the panels are fine and everything holding them is tired.",
    true,
  ),
  city(
    "Cocoa",
    "Brevard",
    "Cocoa spans the mainland and the beachside, and those are two different jobs. Beachside means salt exposure, tougher attachment hardware and a harder look at every fastener. We price them separately instead of pretending the whole city is one market.",
    "Cocoa permits through the city, with Brevard County covering the unincorporated stretches, and the job changes completely depending on whether an address is mainland or beachside. Beachside means full salt exposure, tougher attachment hardware and a hard look at every fastener before anything goes back on a new roof. The mainland is ordinary suburban shingle work. We quote them separately rather than pretending one town is one market, because a number that ignores which side of the river a house sits on is a number that changes on the day.",
    "Cocoa calls split at the river. Beachside brings salt and wind questions and hardware that has to be replaced rather than reused. Mainland Cocoa and Cocoa West bring ordinary re-roof detach work on 1970s and 1980s single-storey housing. We quote them differently because they are different jobs, and saying so up front saves an argument later.",
    true,
  ),
  city(
    "Merritt Island",
    "Brevard",
    "Merritt Island sits between two bodies of water, so every array here lives in salt air year round. Stainless and coated hardware is not an upgrade on this island, it is the baseline, and reusing corroded clamps on a new roof is how a system ends up on the ground after a storm.",
    "Merritt Island permits through Brevard County and sits between two bodies of water, so every array on it lives in salt air year round with no inland side to hide on. Stainless and coated hardware is not an upgrade here, it is the baseline, and reusing corroded clamps on a new roof is how a system ends up on the ground after a storm. The housing is largely 1960s and 1970s single-storey with wide roof planes, so the work itself is straightforward once the hardware decisions are made honestly.",
    "Merritt Island calls almost always start with corrosion, because there is no inland side of this island to hide on. We turn down reusing hardware here more than anywhere else on the route. The housing itself is easy work, wide 1960s and 1970s roof planes with good access, so the cost sits in the parts rather than the labour.",
    true,
  ),
  city(
    "Melbourne",
    "Brevard",
    "Melbourne has a large installed base of residential solar and a matching number of systems whose original installer no longer exists. It is one of the places we are called most often for orphaned system work rather than roof work, and the two frequently turn out to be the same visit.",
    "Melbourne permits through the city and has one of the largest and oldest residential solar populations on our whole route. That means first-generation string inverters, racking systems from manufacturers that no longer exist, and a matching number of installers who left the trade. When a rail system is discontinued, a reinstall cannot simply reuse what came off, and that is a line item people are not expecting to see. More Melbourne calls are orphaned-system work than roof work, and often the two turn out to be the same visit.",
    "Melbourne is our heaviest town for orphaned systems. The regular call is a dead string inverter on a system nobody will touch, from an installer who left the trade years ago, and a homeowner who has been told the whole array needs replacing. It almost never does. Discontinued racking is the one that genuinely costs money.",
    true,
  ),
  city(
    "Palm Bay",
    "Brevard",
    "Palm Bay is enormous and mostly newer single-family homes, which means a lot of shingle and a lot of solar that went up during the boom. Straightforward detach and reset country, and because there is so much of it we can often line up two jobs in a day and pass the saving on.",
    "Palm Bay permits through the city and is enormous, mostly single-family and mostly newer shingle, with an unusually high concentration of boom-era solar. That combination makes it some of the most efficient work we do: clean roof planes, walkable pitches, and enough volume that we can frequently line up two jobs in a day and pass the saving on. The systems here are young enough that the honest finding is usually one failed component rather than a worn-out array, which is a much cheaper conversation than most people are braced for.",
    "Palm Bay volume comes off the enormous grid of newer single-family housing south and west of the city centre. Systems here are young, so the honest answer on most service calls is one failed component rather than a worn-out array. Because there is so much of it we can often line up two jobs in a day, and that shows up in the price.",
  ),
  city(
    "Vero Beach",
    "Indian River",
    "Vero Beach has a strong barrel-tile tradition on the mainland and a barrier island where salt drives every hardware decision. Tile plus salt is the most demanding combination we work in, and it is where reusing the old mounts on a new roof causes the most damage.",
    "Vero Beach permits through the city, and older paperwork on a house here often references the municipal electric utility that was sold to FPL some years back, which will stall a reconnection if nobody catches it. The mainland is strong barrel-tile country over older decking; the barrier island adds full salt exposure on top. Tile plus salt plus an array that was mounted without proper flashing is exactly the combination that produces the ceiling stains we get called about, and it is why we will not put recovered mounts back on a new Vero roof.",
    "Vero calls are tile on the mainland and salt on the island, and frequently both on the same street. The recurring one is a ceiling stain under an array on an older tile roof where the original mounts were bedded rather than properly flashed. The other is a reconnection stalled because the paperwork names a utility that no longer exists.",
    true,
  ),
  city(
    "Sebastian",
    "Indian River",
    "Sebastian is largely single-storey and walkable, which keeps the labour side of a detach and reset low. What we watch here is river-side salt exposure on the eastern edge of town, where hardware ages noticeably faster than a few miles inland.",
    "Sebastian permits through the city and is largely single-storey and walkable, which keeps the labour side of a detach and reset at the low end. What we watch here is river-side salt exposure along the eastern edge of town, where hardware ages noticeably faster than a few miles inland and the difference is visible on the grounding lugs. The housing is mostly 1980s onward on dimensional shingle with room around the arrays. Straightforward work, sensible pricing, and a corrosion inspection that actually matters rather than being a line on a checklist.",
    "Sebastian calls come off the grid of single-storey housing between the river and I-95. Easy roofs, short carries, sensible prices. The corrosion check matters on the eastern streets nearer the water, where hardware ages visibly faster than it does a couple of miles inland, and homeowners are usually surprised by the difference.",
    true,
  ),
  city(
    "Port St. Lucie",
    "St. Lucie",
    "Port St. Lucie is one of the fastest-growing cities in the state and it has solar on a huge number of newer shingle roofs. Because the housing stock is young, the array is often in better shape than anything else up there, and the honest answer is frequently that the panels are fine and the problem is one part.",
    "Port St. Lucie runs its own building department and has grown so fast and so uniformly that whole districts share a builder and a roof age. Once we have quoted one street the next is quick, which is genuinely useful to homeowners here. Because the housing is young, the array is very often in better shape than anything else on the roof, and the honest finding on most service calls is that the panels are fine and one component has failed. That is a far cheaper answer than the full-replacement quote people are usually braced for.",
    "Port St. Lucie generates more calls than any other town on the Treasure Coast, mostly from the vast newer grids west of the turnpike. The pattern is remarkably consistent: young roof, young array, one failed part. We can usually give a firm number quickly here because the housing repeats, and that speed is worth real money to a homeowner mid-re-roof.",
  ),
  city(
    "Fort Pierce",
    "St. Lucie",
    "Fort Pierce runs its own municipal utility, so reconnection here goes through a different desk than the county to the south. There is also a lot of older housing near the water, where we check attachment corrosion before we check anything else.",
    "Fort Pierce runs its own municipal utility, so reconnection here goes through a different desk than the rest of St. Lucie County and contractors who assume FPL lose time. There is a lot of older housing close to the water, and on those we check attachment corrosion before we check anything else. The historic core has small cut-up roof planes that slow a detach down more than the panel count suggests. Further west it is ordinary suburban shingle. Two quite different jobs inside one city, quoted separately.",
    "Fort Pierce calls split between older housing near the water, where corrosion leads, and the newer western neighbourhoods where it is ordinary re-roof work. The recurring administrative one is a reconnection that stalled because somebody filed with FPL instead of the city utility. The historic core roofs are slower than their size suggests.",
    true,
  ),
  city(
    "Stuart",
    "Martin",
    "Stuart has a lot of tile, a lot of water, and a lot of homes where the roof and the array were done years apart by two companies that never spoke to each other. Untangling that is normal work for us: we document what is actually up there before anybody quotes a price.",
    "Stuart permits through the city, with Martin County covering the surrounding area, and the coastal construction control line adds requirements on properties near the water. A great many Stuart houses had the roof and the array done years apart by two companies that never spoke to each other, so a large share of the work here arrives as a dispute rather than a job: the roofer blames the solar company, the solar company is gone, and somebody has to open it up and find out. Documenting what is actually on the roof is usually the first thing we do.",
    "Stuart calls frequently arrive as a dispute rather than a job. A leak appeared, the roofer blames the solar company, the solar company has gone, and nobody will open it up. That is exactly the work we do: document what is up there, find the actual penetration, and put it in writing so the homeowner has something to act on.",
    true,
  ),
  city(
    "Palm City",
    "Martin",
    "Palm City is heavy on larger homes with cut-up roof planes and multiple arrays facing different ways. More roof planes means more rails, more penetrations and more time, and that is the single biggest reason a Palm City quote can sit above a same-size system elsewhere.",
    "Palm City permits through Martin County and is heavy on larger homes with cut-up roof planes and arrays split across several faces at different pitches. More planes means more rails, more penetrations and more places for a previous crew to have cut a corner, and it is the single biggest reason a Palm City quote can sit above a same-size system elsewhere. We count the planes and the penetrations rather than the panels when we price it. The housing is mostly 1990s onward on concrete tile, well built and slow to work carefully.",
    "Palm City calls are big roofs with arrays split across three or four faces, and the quote is driven by planes and penetrations rather than panel count. Homeowners here are often comparing us against a number somebody gave over the phone, and the honest conversation is why that number was never going to hold once a crew was on the roof.",
  ),
  city(
    "Jensen Beach",
    "Martin",
    "Jensen Beach is coastal through and through, so corrosion and wind attachment carry the whole conversation. We would rather replace tired clamps during the reinstall than lay a new roof underneath hardware that is already on its way out.",
    "Jensen Beach permits through Martin County and is coastal through and through, so corrosion and wind attachment carry the whole conversation rather than sitting at the end of it. We would far rather replace tired clamps during a reinstall than lay a new roof underneath hardware that is already going, and we will put that in the quote as its own line so nobody is surprised. The housing is a mix of older single-storey near the water and newer tile inland, and the salt does not care which one you own.",
    "Jensen Beach calls lead with corrosion almost every time. The regular conversation is whether tired clamps get replaced during the reinstall or gambled on for another decade under a brand-new roof. We put replacement on the quote as its own line so it is a decision rather than a surprise, and most people take it once they see the hardware.",
    true,
  ),
  city(
    "Hobe Sound",
    "Martin",
    "Hobe Sound runs from modest inland homes to large properties near the water, so quotes here vary more than almost anywhere else on our route. Access is often the deciding factor, because long driveways and mature landscaping change how a crew can stage a detach.",
    "Hobe Sound permits through Martin County and runs from modest inland housing to substantial properties near the water, so quotes here vary more than almost anywhere else on our route. Access is very often the deciding factor rather than the roof: long driveways, mature landscaping and gated approaches change how a crew can stage a detach and where an array can safely sit for a fortnight. We settle that at the quote rather than on the morning, because guessing it is how a fixed price stops being fixed.",
    "Hobe Sound quotes vary more than anywhere else we work, because the properties do. Long driveways, gated approaches and mature landscaping decide where a truck goes and where an array can safely sit for a fortnight, and those answers change the price more than the roof does. We settle all of it at the quote rather than on the morning.",
    true,
  ),
  city(
    "Jupiter",
    "Palm Beach",
    "Jupiter is tile country with serious wind exposure, and roofs here are often replaced before they truly need to be because an insurer asked for it. So we do a lot of detach and reset on arrays that are barely used, where the whole job is about protecting equipment that is still nearly new.",
    "Jupiter permits through the town and the coastal construction control line adds requirements near the water. This is tile country with serious wind exposure, and roofs here are frequently replaced before they truly need to be because an insurer asked rather than because the roof failed. That means a large share of our Jupiter work is detach and reset on arrays that are barely used, where the entire job is about protecting equipment that is still nearly new. Aged barrel tile is the cost driver, not the panels, and any quote that does not mention tile breakage is incomplete.",
    "Jupiter calls are overwhelmingly insurance-driven re-roofs on tile, with the array barely used and simply in the way. Abacoa, Jupiter Farms and the older streets near the inlet all produce them. The recurring question is why tile breakage is a line on our quote and not on somebody else's, and the answer is that it happens whether it is priced or not.",
    true,
  ),
  city(
    "Palm Beach Gardens",
    "Palm Beach",
    "Palm Beach Gardens has a high concentration of managed communities, and getting a reinstall layout approved matters as much as getting it engineered. We put the panel layout in writing before the roof comes off, so nothing is a surprise to the association afterwards.",
    "Palm Beach Gardens permits through the city and has one of the highest concentrations of managed communities on our route, which means getting a reinstall layout approved matters as much as getting it engineered. We put the panel layout in writing before the roof comes off so nothing is a surprise to the association afterwards, because an array that goes back in a different arrangement than it came off will get challenged. The housing is mostly 1990s onward concrete tile on generous footprints, well built, and slow to do properly.",
    "Gardens calls come off the managed communities around PGA Boulevard and Mirasol, and the association is usually as much of the job as the roof. We produce the reinstall layout in writing early because a changed arrangement will be challenged, and a challenge mid-job means panels sitting on a driveway while a committee meets.",
  ),
  city(
    "West Palm Beach",
    "Palm Beach",
    "West Palm Beach has one of the widest roof ranges we work in, from small older homes west of the tracks to substantial properties near the water. The older West Palm roofs are where we most often find that the original solar penetrations were never properly flashed.",
    "West Palm Beach permits through the city and has one of the widest ranges of roof stock we work in: small older homes west of the tracks, mid-century housing through the historic districts, and substantial properties near the water. The older West Palm roofs are where we most often find that the original solar penetrations were never properly flashed, and on a house that age the deck under the array is a genuine question rather than a formality. Coastal salt applies to a good share of the city and the historic districts review what is visible.",
    "West Palm calls run from the historic districts through Northwood to the newer western neighbourhoods, and the roof under an array can be almost anything. On the older houses the real question is the deck. The recurring one is original solar penetrations that were never flashed, found during a re-roof, with a stain that has been blamed on the roof for years.",
    true,
  ),
  city(
    "Wellington",
    "Palm Beach",
    "Wellington is mostly newer and mostly tile, with large single-storey footprints that are pleasant to work on and slow to re-tile. Tile is the cost driver here, not the panels, and a quote that never mentions tile breakage is not a complete quote.",
    "Wellington permits through the village and is mostly newer construction on large single-storey footprints, much of it flat or barrel concrete tile. That is pleasant to work on and slow to re-tile, and tile is the cost driver here rather than the panels. Association approval is effectively a second permit across most of the village. Being inland, corrosion drops well down the list and the failures we find are rail condition, flashing at the mounts, and arrays that were never torqued to specification by whoever installed them.",
    "Wellington calls are large single-storey tile roofs inside equestrian and golf communities, so association approval and tile handling drive the job. Homeowners here are frequently surprised that tile, not panels, is where the money goes. Being inland, corrosion barely features and the failures are rail condition and flashing quality.",
  ),
  city(
    "Royal Palm Beach",
    "Palm Beach",
    "Royal Palm Beach is largely 1990s and 2000s suburban stock, which detaches and resets predictably. It is also far enough inland that salt corrosion stops being the first thing we look at, and rail condition and flashing take over as the main questions.",
    "Royal Palm Beach permits through the village and is largely 1990s and 2000s suburban stock on dimensional shingle and flat tile, which detaches and resets predictably. It is far enough inland that salt corrosion stops being the first thing we look at and rail condition takes over as the main question. The systems here are mostly boom-era, sold through dealer networks that have since closed, so monitoring access is frequently the first thing we have to rebuild before anybody can tell what the array is actually doing.",
    "Royal Palm calls come off the 1990s and 2000s subdivisions and are consistently boom-era systems whose monitoring nobody ever transferred. Rebuilding access so the homeowner can actually see what the array is doing is often the first useful thing we do, and sometimes it turns out nothing needs fixing at all.",
  ),
  city(
    "Lake Worth Beach",
    "Palm Beach",
    "Lake Worth Beach has its own municipal electric utility, which catches out contractors who assume the whole county runs on one system. Reconnection paperwork here goes to the city, and getting that wrong is how a reinstalled system sits dark for weeks.",
    "Lake Worth Beach runs its own municipal electric utility, which catches out contractors who assume all of Palm Beach County is on FPL. Reconnection paperwork here goes to the city, and getting that wrong is exactly how a reinstalled system sits dark for weeks while everyone blames the hardware. The housing is a mix of older bungalows through the historic districts and newer stock further west, and the historic areas review what is visible from the street. Coastal exposure applies on the eastern side of the city.",
    "The recurring Lake Worth Beach call is a reinstalled system sitting dark because the reconnection went to FPL instead of the city. That is a fixable administrative problem and we sort it, but it costs weeks if nobody spots it. The historic bungalow streets add review on what is visible and older decking under the arrays.",
    true,
  ),
  city(
    "Boynton Beach",
    "Palm Beach",
    "Boynton Beach has a big spread of older condos and single-family homes, and a lot of solar that went up fast during the boom years. Fast installs are the ones where we most often find mounts that were never flashed and rails that were never torqued to spec.",
    "Boynton Beach permits through the city and has a wide spread of older condominium and single-family housing alongside a lot of solar that went up fast during the boom years. Fast installs are precisely the ones where we find mounts that were never flashed and rails that were never torqued to specification, and Boynton has more than its share. On the eastern side salt exposure adds corrosion to the list. The older roofs here are old enough that what is under an array once it comes off is worth a proper look.",
    "Boynton calls come off the older eastern neighbourhoods and the newer western developments in roughly equal measure. The pattern from the boom years is consistent: fast installs, mounts that were never flashed, rails never torqued. On the east side salt has been quietly working on the hardware since.",
    true,
  ),
  city(
    "Delray Beach",
    "Palm Beach",
    "Delray Beach mixes historic bungalows near the ocean with newer builds further west, so the roof under an array can be anything from original wood to a modern truss. We look at what is under the panels before quoting, because on the older ones the deck is the real story.",
    "Delray Beach permits through the city and the historic districts review anything visible from the street. The housing mixes 1920s through 1950s bungalows near the ocean with newer construction further west, so the roof under an array can be anything from original wood decking to a modern engineered truss. We look at what is underneath before quoting, because on the older ones the deck is the real story and finding it out on the day turns a fixed price into an argument. Coastal salt applies across most of the city.",
    "Delray calls run from the bungalows near the beach to the newer developments west of the turnpike. On the old houses the deck under the array is the real story and we say so at the quote rather than discovering it with panels on the driveway. The historic districts review what is visible, which shapes where the array can go back.",
    true,
  ),
  city(
    "Boca Raton",
    "Palm Beach",
    "Boca Raton is dense with barrel tile and dense with associations, which makes it one of the more demanding places to reset an array cleanly. Tile that has baked in the sun for twenty years does not go back the way it came off unless somebody is patient with it, and we price for that instead of hoping.",
    "Boca Raton permits through the city and is dense with both barrel tile and community associations, which makes it one of the more demanding places on our route to reset an array cleanly. Tile that has baked in the sun for twenty years does not go back the way it came off unless somebody is patient with it, and we price for that patience rather than hoping. Association approval of the reinstall layout is effectively a second permit. Coastal exposure applies through the eastern half and the older roofs hide their real condition well.",
    "Boca calls are tile and associations, usually together. The recurring one is a twenty-year-old barrel tile roof where the homeowner has been quoted by someone who plans to walk the tile rather than lift it. We price the patience instead, and the difference shows up in how much tile survives. Coastal streets add corrosion on top.",
    true,
  ),
  city(
    "Deerfield Beach",
    "Broward",
    "Deerfield Beach sits inside Florida's High-Velocity Hurricane Zone, so every attachment on a reinstall has to carry the right product approval and the whole thing gets inspected. That is stricter than anything north of the county line, and it is not optional.",
    "Deerfield Beach permits through the city and sits inside Florida's High-Velocity Hurricane Zone, which changes the specification completely. Every attachment on a reinstall has to carry documented product approval and the work is genuinely inspected rather than waved through, which is stricter than anything a few miles north in Palm Beach County. Add full coastal salt exposure and nothing recovered off an old Deerfield roof goes back onto a new one. The housing is largely 1960s through 1980s, much of it now well past one roof replacement.",
    "Deerfield calls lead with hurricane-zone paperwork and salt in equal measure. The regular conversation is why hardware that came off the old roof cannot go back on the new one, and the answer is that it will not pass an inspection here even if it looks fine. The 1970s and 1980s housing is now well past one roof replacement.",
    true,
  ),
  city(
    "Pompano Beach",
    "Broward",
    "Pompano Beach combines the hurricane-zone rules with heavy salt exposure, which is the toughest specification we work to. Hardware that is perfectly legal in Orlando does not meet the standard here, and reusing old clamps on a new Pompano roof is not something we will do.",
    "Pompano Beach permits through the city and combines hurricane-zone attachment rules with heavy salt exposure, which is the toughest specification we work to outside the Keys. Hardware that is perfectly legal in Orlando does not meet the standard here, and we will not reuse old clamps on a new Pompano roof regardless of how they look. The housing is dominated by mid-century single-storey stock and a lot of low-slope roofs, which are quick to walk but unforgiving about flashing quality at every penetration.",
    "Pompano calls combine the strictest attachment rules with the harshest salt on our Broward stretch, so this is where we say no to reusing hardware most often. Low-slope mid-century roofs are the other feature: fast to walk, unforgiving about flashing, and every penetration matters more than it would on a steeper roof.",
    true,
  ),
  city(
    "Coral Springs",
    "Broward",
    "Coral Springs is planned, newer and consistent, so detach and reset here is about as predictable as this work gets. It is still inside the hurricane zone, which means the attachments and the permit are held to the tougher Broward standard even when the roof itself is simple.",
    "Coral Springs permits through the city and is planned, newer and consistent, so a detach and reset here is about as predictable as this work gets: dimensional shingle and flat tile on clean roof planes with room around the arrays. It is still inside the hurricane zone, which means the attachments and the permit are held to the tougher Broward standard even when the roof itself is simple. Association rules cover most of the city, so the reinstall layout gets agreed in writing before anything comes off.",
    "Coral Springs calls are predictable in the best way: planned neighbourhoods, consistent roofs, clean planes, arrays with room around them. The association layout question comes up on nearly all of them, and hurricane-zone product approval applies even though the roof itself is simple. Quotes here come back fast and hold.",
  ),
  city(
    "Fort Lauderdale",
    "Broward",
    "Fort Lauderdale runs from waterfront properties to older inland neighbourhoods, and the hurricane-zone attachment rules apply to all of it. On the water we are dealing with salt as well, so corrosion checks and product-approved hardware come as a pair rather than separately.",
    "Fort Lauderdale permits through the city and runs from waterfront properties on the finger isles to older inland neighbourhoods, with hurricane-zone attachment rules applying to all of it. On the water we are dealing with salt as well, so corrosion inspection and product-approved hardware come as a pair rather than separately. The historic districts review what is visible. A meaningful share of our Fort Lauderdale work is fixing somebody else's failed reinstall: arrays that went back on without approved attachments and got red-tagged by an inspector who knew exactly what to look for.",
    "Fort Lauderdale calls range from the finger isles to Victoria Park to the older inland neighbourhoods. A meaningful share is fixing somebody else's failed reinstall, red-tagged because the attachments were never approved. Waterfront addresses add corrosion to the list, and the historic districts add review on anything visible from the street.",
    true,
  ),
  city(
    "Plantation",
    "Broward",
    "Plantation is where Art of Solar is registered, so this is home ground and the response is fastest here. It is mature suburban housing, largely single-storey, inside the hurricane zone: simple roofs held to strict attachment rules.",
    "Plantation is where Art of Solar is registered, so this is home ground and the response here is the fastest we offer anywhere. The city runs its own building department and sits inside the hurricane zone, so attachments need documented approval and the reinstall is properly inspected. The housing is mature suburban stock, largely single-storey, on generous lots with easy access, which makes for simple roofs held to strict rules. We know which counter wants what here, which saves a week that other contractors lose.",
    "Plantation is home ground and it shows in the response times. Calls come off the mature neighbourhoods either side of Broward Boulevard, mostly single-storey with easy access. The regular work is re-roof detach and reset plus orphaned systems from installers who left the state, and we know exactly which counter wants what here.",
  ),
  city(
    "Sunrise",
    "Broward",
    "Sunrise is dense mid-century and later suburban housing with a lot of low-slope, walkable roofs. Low slope is quick to work on but unforgiving about flashing, so the quality of the new mounts matters more here than the difficulty of the climb.",
    "Sunrise permits through the city and is dense mid-century and later suburban housing with a great many low-slope, walkable roofs. Low slope is quick to work on but genuinely unforgiving about flashing: a mount that would shrug off a mistake on a steep roof will let water in on a shallow one. So the quality of the new attachments matters more here than the difficulty of the climb, and that is where the money in a Sunrise quote goes. Hurricane-zone product approval applies to every one of them.",
    "Sunrise calls are low-slope roofs where flashing quality decides everything. The regular one is a leak under an array on a shallow roof, where a mount that would have got away with it on a steeper pitch has been letting water in for years. Sawgrass and the older central neighbourhoods produce most of the volume.",
  ),
  city(
    "Davie",
    "Broward",
    "Davie has an unusual mix for Broward: large lots, outbuildings and the occasional ground mount alongside ordinary suburban roofs. Ground mounts and barn roofs are their own quote, and we would rather look at one in person than guess from a satellite image.",
    "Davie permits through the town and has an unusual mix for Broward: large lots, outbuildings, barns and the occasional ground-mounted array alongside ordinary suburban roofs. Ground mounts and barn roofs are their own quote and honestly often easier than a two-storey tile roof, with no fall protection setup and no tile to break. What we will not do is price one from a satellite image, because the access and the mounting are the whole job. Hurricane-zone rules still apply to anything attached to a structure.",
    "Davie calls include things the rest of Broward does not: barns, workshops, outbuildings and the occasional ground-mounted array on acreage. Those are quoted in person because access and mounting are the whole job. The suburban half is ordinary re-roof work, and hurricane-zone rules apply to anything attached to a structure.",
  ),
  city(
    "Weston",
    "Broward",
    "Weston is newer, tile-heavy and almost entirely association-governed, so a reinstall has to satisfy the hurricane-zone inspector and the community rules at the same time. We handle the permit side and put the layout in writing for the association.",
    "Weston permits through the city and is newer, tile-heavy and almost entirely association-governed, so a reinstall here has to satisfy the hurricane-zone inspector and the community rules at the same time. Those two do not always want the same thing, and reconciling them is part of what we handle rather than leaving it with the homeowner. The housing is consistent 1990s and 2000s concrete tile on large footprints, well built, and the arrays on it are mostly boom-era with monitoring nobody ever transferred.",
    "Weston calls are consistent 1990s and 2000s tile inside association-governed communities, so the reinstall has to satisfy an inspector and a committee at the same time. Reconciling those two is part of what we handle. The arrays are mostly boom-era with monitoring that was never transferred to the homeowner.",
  ),
  city(
    "Pembroke Pines",
    "Broward",
    "Pembroke Pines has a very large installed base of residential solar, and a lot of it went up through dealer networks that no longer exist. It is one of our busiest areas for orphaned system work, and often the roof job and the repair turn out to be the same visit.",
    "Pembroke Pines permits through the city and has a very large installed base of residential solar, a lot of it sold through dealer networks that no longer exist. It is one of our busiest places in Broward for orphaned-system work, and frequently the roof job and the repair turn out to be the same visit: the array comes off for a re-roof and the inverter faults are found while it is down. The housing is consistent late-century suburban stock, and hurricane-zone attachment rules apply to every reinstall.",
    "Pembroke Pines is one of our busiest Broward towns for orphaned systems. The typical call is a dealer-sold array with a faulting inverter and no one to file the claim, and frequently the re-roof and the repair end up being the same visit because the faults are found once the array is down and testable.",
  ),
  city(
    "Miramar",
    "Broward",
    "Miramar is mostly newer construction with clean roof planes, which keeps detach and reset straightforward. Being inside the hurricane zone, the attachments still have to be product-approved and inspected, so simple does not mean casual here.",
    "Miramar permits through the city and is mostly newer construction with clean roof planes and generous space around the arrays, which keeps a detach and reset straightforward. Being inside the hurricane zone, the attachments still have to be product-approved and the reinstall inspected, so simple does not mean casual here. The western half is recent subdivision tile; the older eastern side is mid-century single-storey. Solar penetration is high because a lot of it came bundled with the newer builds rather than being bought separately.",
    "Miramar calls come mostly off the newer western developments, where roof planes are clean and arrays have room. Solar penetration is high here because much of it came bundled with the build rather than being bought separately, which means a lot of homeowners have never spoken to the installer at all.",
  ),
  city(
    "Hollywood",
    "Broward",
    "Hollywood has older housing close to the ocean, which is the combination that ages solar hardware fastest: salt, sun, and roofs that have already been replaced once. We check every fastener on a Hollywood array before agreeing to put it back on a new roof.",
    "Hollywood permits through the city and has older housing close to the ocean, which is the combination that ages solar hardware fastest anywhere in Broward: salt, sun, and roofs that have already been replaced once. We check every fastener on a Hollywood array before agreeing to put it back on a new roof, and we say no often enough here that it is worth stating up front. The historic districts review what is visible from the street, and hurricane-zone product approval applies to every attachment regardless.",
    "Hollywood calls are older housing close to the ocean, which is the fastest-ageing combination in Broward. We decline to reuse hardware here more often than almost anywhere. Historic districts review what is visible, and the recurring conversation is a homeowner who has been told the array is fine when every fastener holding it is not.",
    true,
  ),
  city(
    "Miami",
    "Miami-Dade",
    "Miami is the strictest jurisdiction we work in. High-Velocity Hurricane Zone rules govern every attachment, the product approvals get checked, and the reinstall is properly inspected. It also has enormous barrel-tile stock, so this is where careful tile handling matters most of all.",
    "Miami permits through the city and is the strictest jurisdiction we work in anywhere. Product approval is checked against Miami-Dade's own Notice of Acceptance list, the engineering has to match rather than approximate, and inspectors here have seen every shortcut in the trade. Barrel tile over sloped concrete dominates, much of it original to 1950s and 1960s construction, and it does not survive an impatient crew. A real share of our Miami time goes on fixing failed reinstalls that were red-tagged, and on tile that was walked on rather than lifted.",
    "Miami calls include a real share of failed reinstalls: arrays that went back on without approved attachments and got red-tagged, and tile that was walked on rather than lifted. Little Havana, Coconut Grove and the Upper Eastside all produce them. Fixing somebody else's job to a standard that will actually pass is normal work here.",
    true,
  ),
  city(
    "Miami Gardens",
    "Miami-Dade",
    "Miami Gardens is largely single-storey older housing, which is easy to work on and often has roofs that are overdue. When a roof is that tired, taking the array down is usually the moment you find out what the deck underneath is really like.",
    "Miami Gardens permits through the city and is largely single-storey older housing, which is easy to work on and often has roofs that are genuinely overdue. When a roof is that tired, taking the array down is usually the moment the homeowner finds out what the deck underneath is really like, and we would rather tell them at the quote that it is a possibility than discover it with the panels already on the driveway. Hurricane-zone attachment rules apply to every reinstall regardless of how modest the house is.",
    "Miami Gardens calls are modest single-storey houses with roofs that are genuinely overdue, and the array coming off is often the moment the homeowner learns what the deck is like. We raise that as a possibility at the quote so it is a known risk rather than a bad surprise once the panels are on the driveway.",
  ),
  city(
    "Hialeah",
    "Miami-Dade",
    "Hialeah is dense, tile-heavy, and full of homes where there is genuinely tight space to stage a detach. Where a crew can park and where the panels can safely sit for a week are real questions here, and we sort them out before the day rather than on it.",
    "Hialeah permits through the city and is dense, tile-heavy, and full of homes where there is genuinely tight space to stage a detach. Where a crew can park, how a lift gets to the roof, and where an array can safely sit for a fortnight are real questions here rather than afterthoughts, and we settle them before the day rather than on it. The housing is largely 1950s through 1970s single-storey barrel tile, and hurricane-zone product approval applies to every attachment that goes back on.",
    "Hialeah calls always come with a staging question before a roofing question. Tight lots, narrow driveways, nowhere obvious for an array to sit for a fortnight. We settle where the truck goes and where the panels live before the day, because working that out on site is how a fixed price stops being fixed.",
  ),
  city(
    "Doral",
    "Miami-Dade",
    "Doral is newer, planned and tile, with a lot of two-storey homes. Two storeys means fall protection and a longer carry, and that is the honest reason a Doral quote sits above a single-storey system of the same size.",
    "Doral permits through the city and is newer, planned and tile, with a high proportion of two-storey homes. Two storeys means a full fall-protection setup and a much longer carry for every panel, and that is the honest reason a Doral quote sits above a single-storey system of the same size. The housing is consistent and well built, mostly 2000s onward, and the arrays are boom-era with association rules over the layout. Hurricane-zone product approval applies and the inspectors here check it properly.",
    "Doral calls are two-storey tile inside managed communities, so fall protection, a long carry and association approval all feature. Homeowners here are frequently comparing our number against a single-storey quote from elsewhere and the honest explanation is height. The housing is consistent enough that quoting is quick once we have seen one.",
  ),
  city(
    "Miami Beach",
    "Miami-Dade",
    "Miami Beach is salt air, wind exposure and the toughest attachment rules in the state all at once. Hardware corrodes visibly faster here, and anything we put back on a new roof is product-approved and new, never recovered off the old one.",
    "Miami Beach permits through the city and is salt air, wind exposure and the toughest attachment rules in the state all at once. Hardware corrodes visibly faster here than anywhere else on our route, so anything we put back on a new roof is product-approved and new, never recovered off the old one. The historic districts review what is visible from the street, which on a barrier island is most things. Access and staging on tight lots is a genuine part of the cost and it goes in the quote rather than appearing later.",
    "Miami Beach calls are corrosion and access in equal measure. Hardware ages faster here than anywhere on the route, and there is rarely anywhere to stage. Historic districts review what is visible, which on a barrier island is most of the roof. Anything going back on a new Beach roof is new and approved, never recovered.",
    true,
  ),
  city(
    "Coral Gables",
    "Miami-Dade",
    "Coral Gables has beautiful old barrel-tile roofs and a design review culture to match, so how an array looks when it goes back matters as much as how it performs. We agree the reinstall layout with you in writing before the panels come down.",
    "Coral Gables permits through the city and has a design review culture stricter than almost anywhere in Florida, so how an array looks when it goes back matters as much as how it performs. We agree the reinstall layout with the homeowner in writing before the panels come down, because a changed arrangement will be challenged. The housing is beautiful old barrel tile over 1920s through 1950s construction, brittle in the sun and unforgiving of a rushed crew. Hurricane-zone product approval applies to every attachment on top of the aesthetic review.",
    "Gables calls are beautiful old barrel tile and a design review culture to match, so how the array looks going back matters as much as how it performs. We agree the layout in writing before anything comes down. The tile is brittle after decades in the sun and it does not forgive a crew that is in a hurry.",
    true,
  ),
  city(
    "Kendall",
    "Miami-Dade",
    "Kendall is sprawling suburban housing with a very large amount of residential solar, much of it sold through companies that have since closed. Between re-roofs and orphaned systems it is one of the areas we are called to most often in Miami-Dade.",
    "Kendall permits through Miami-Dade County and is sprawling suburban housing with a very large amount of residential solar, much of it sold through companies that have since closed. Between re-roofs and orphaned systems it is one of the areas we are called to most often in the county. The housing is mostly 1970s through 1990s on barrel and flat tile with reasonable access, so the work itself is manageable. Hurricane-zone attachment rules apply and the county inspects the reinstall rather than taking anyone's word for it.",
    "Kendall is one of the areas we are called to most often in Miami-Dade, between re-roofs and orphaned systems. The typical call is a 1980s or 1990s tile roof with a dealer-sold array on it and no one left to service it. Access is reasonable and the housing repeats, so quoting is quicker here than in the older parts of the county.",
  ),
  city(
    "Cutler Bay",
    "Miami-Dade",
    "Cutler Bay was largely rebuilt after Hurricane Andrew, so the housing stock is newer and built to a tougher standard than the age of the neighbourhood suggests. Those roofs take attachments well and the product approvals are straightforward to satisfy.",
    "Cutler Bay permits through the town and was largely rebuilt after Hurricane Andrew, so the housing stock is newer and built to a considerably tougher standard than the age of the neighbourhood suggests. Those decks take attachments well and the product approvals are straightforward to satisfy. Coastal exposure applies on the eastern side toward the bay, so corrosion still gets checked. The arrays here are mostly recent, which means the honest finding on a service call is usually one failed component rather than a system at the end of its life.",
    "Cutler Bay calls are post-Andrew housing, which is newer and stronger than the neighbourhood age suggests, with recent arrays on it. The honest finding on most service calls here is one failed component rather than a system at the end of its life. Eastern streets toward the bay still get the corrosion check.",
    true,
  ),
  city(
    "Homestead",
    "Miami-Dade",
    "Homestead runs its own municipal electric utility, so reconnection here does not go through the same channel as the rest of the county. It is also the southern end of our route, and we plan Homestead work in blocks so nobody pays for the drive twice.",
    "Homestead runs its own municipal electric utility, so reconnection here does not go through the same channel as the rest of Miami-Dade and assuming otherwise costs weeks. The city permits its own work and sits inside the hurricane zone. Much of the housing was rebuilt after Andrew to a tougher standard, with newer agricultural and ranch property surrounding it where ground mounts are more common than rooftop arrays. It is the southern end of our route, so we plan Homestead work in blocks and nobody pays for the drive twice.",
    "Homestead calls regularly stall on the utility question, because reconnection here goes to the city rather than the county's usual channel and assuming otherwise costs weeks. Beyond that it is post-Andrew housing plus agricultural property where ground mounts are more common than roof arrays. We plan Homestead work in blocks so nobody pays for the drive twice.",
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
      a: `Yes, week in week out. ${c.name} is on our home route, so this is normal scheduling with no travel loading, and we work backwards from your roofer's tear-off date rather than the other way round.`,
    },
    {
      q: `Is a permit needed to reinstall solar in ${c.name}?`,
      a: k.hvhz
        ? `Yes. ${c.name} sits inside Florida's High-Velocity Hurricane Zone, so every attachment needs documented product approval and the reinstall is genuinely inspected. We pull the permit and meet the inspector.`
        : `Almost always. We pull the solar permit through ${k.name} County or your city, whichever holds it for your address, and we meet the inspector so you do not have to take a day off for it.`,
    },
    {
      q: c.coastal
        ? `Does being near the water change the job in ${c.name}?`
        : `What usually fails on ${c.name} roofs?`,
      a: c.coastal
        ? `It changes what fails first. Salt eats rails, clamps and grounding lugs long before it touches a panel, so nothing corroded goes back onto a new ${c.name} roof no matter how it looks from the ground.`
        : `Away from salt air it is rail condition, flashing at the mounts, and whether the array was ever torqued to spec. A stain on a ceiling under an array in ${c.name} is almost always a mount that was never flashed properly.`,
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
