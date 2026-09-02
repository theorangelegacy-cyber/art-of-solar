/**
 * Every county in Florida, and how honest we are about each one.
 *
 * The whole risk with a statewide build-out is doorway pages: hundreds of
 * near-identical pages implying a local crew in towns nobody has ever driven
 * to. Google filters those, and worse, they generate calls that waste
 * everybody's morning.
 *
 * So every county carries a TIER, and the page says out loud which one it is:
 *
 *   1  Home route. Orlando down to Miami. One crew, fast response, normal
 *      pricing, any size job.
 *   2  Travel work. We genuinely do go, but it is booked ahead, batched with
 *      other jobs in the area, and there is a minimum that makes the drive
 *      make sense.
 *
 * That is the truth of the business, it reads better than pretending, and it
 * is the thing that keeps 67 county pages from looking like spam.
 *
 * Every blurb here is written once, by hand, about the roofs in that county.
 * Never generate these from a template. That is the entire point of the file.
 */

export type Region =
  | "Central Florida"
  | "Space Coast"
  | "Treasure Coast"
  | "South Florida"
  | "Southwest Florida"
  | "Tampa Bay"
  | "Nature Coast"
  | "North Central Florida"
  | "Northeast Florida"
  | "Panhandle"
  | "Florida Keys";

export type FlCounty = {
  name: string;
  slug: string;
  /** County seat. */
  seat: string;
  region: Region;
  /** 1 = home route, one crew. 2 = travel work, booked ahead. */
  tier: 1 | 2;
  /** Who most homes here buy power from. Hedged where it genuinely varies. */
  utility: string;
  /** Gulf or Atlantic frontage, so salt and wind get looked at harder. */
  coastal?: boolean;
  /** High-Velocity Hurricane Zone. In Florida that is Miami-Dade and Broward, nowhere else. */
  hvhz?: boolean;
  /** The towns worth naming on the page. */
  towns: string[];
  /** The long one: roof stock, permitting, utility and the local hazard. ~100 original words. */
  detail: string;
  /** What we actually get called for here. Second hand-written field, unique per county. */
  seen: string;
  /** Two or three true sentences about the roofs and solar here. Unique, always. */
  blurb: string;
};

export const FL_COUNTIES: FlCounty[] = [
  /* ---------------------------------------------------------------- tier 1 */
  {
    name: "Orange",
    slug: "orange-county",
    detail: "Orange County permitting runs through either the City of Orlando or the county building department depending on which side of a line the house sits, and the two do not want the same paperwork. The roof stock is genuinely split: pre-1970 bungalows around Colonialtown and Audubon Park with small roof planes and original decking, against Lake Nona and Horizon West where everything is engineered truss and concrete tile from the last fifteen years. On the old houses the question is always what the deck looks like once the array is off, because nobody has seen it since the panels went up. On the new ones it is tile breakage and getting the reinstall approved.",
    seen: "Most Orange County calls are re-roofs where the homeowner found out about the panels a week before tear-off. Second most: an OUC customer whose system came back on but never got reconnected properly on paper.",
    seat: "Orlando",
    region: "Central Florida",
    tier: 1,
    utility: "OUC and Duke Energy",
    towns: ["Orlando", "Winter Park", "Winter Garden", "Apopka", "Ocoee"],
    blurb:
      "Orange County is the northern end of our home route and we are in it constantly. Roofs run from 1950s bungalows near downtown Orlando to tile-and-truss builds out by Lake Nona, so the same size array can be two very different jobs. A lot of the county sits on OUC rather than the big statewide utility, which changes where the reconnection paperwork goes.",
  },
  {
    name: "Seminole",
    slug: "seminole-county",
    detail: "Seminole permits are county-run for most addresses, with Sanford, Oviedo and Winter Springs handling their own. The housing is dominated by two building waves, mid-1990s and early 2000s, so an enormous number of roofs across the county are hitting replacement age within a few years of each other. Where those houses got solar during the boom, the array is a decade younger than the roof under it. That mismatch is the single most common reason we are on a Seminole roof: perfectly good panels sitting on shingles that have run out.",
    seen: "Seminole calls skew toward roofs that hit twenty years at the same moment the inverter did. If both are due, doing them together saves paying for the array to come down twice.",
    seat: "Sanford",
    region: "Central Florida",
    tier: 1,
    utility: "Duke Energy and FPL",
    towns: ["Sanford", "Lake Mary", "Altamonte Springs", "Oviedo", "Longwood", "Casselberry"],
    blurb:
      "Seminole County is heavy on 1990s and 2000s subdivisions, which makes for clean, predictable detach and reset work on dimensional shingle. The wooded lots north of Orlando are the exception: access is often the real constraint rather than the array itself. Homes here are split between Duke Energy and FPL, and both want the interconnection updated after a long outage.",
  },
  {
    name: "Osceola",
    slug: "osceola-county",
    detail: "Osceola runs its permits through the county for most of the unincorporated area, with Kissimmee and St. Cloud operating their own departments. Kissimmee Utility Authority covers a big share of the population and its interconnection process is separate from Duke Energy's, which catches out contractors who assume one form fits the county. The other thing that shapes work here is vacation rental: whole subdivisions around Highway 192 and Celebration are managed properties where a week of downtime costs real money, so the schedule gets built backwards from the booking calendar rather than the roofer's convenience.",
    seen: "Osceola is short-term rentals and new subdivisions. The rental owners want days offline pinned down before they book anything; the subdivision owners usually cannot name who installed the system.",
    seat: "Kissimmee",
    region: "Central Florida",
    tier: 1,
    utility: "KUA and Duke Energy",
    towns: ["Kissimmee", "St. Cloud"],
    blurb:
      "Osceola has grown fast enough that brand new arrays sit a street away from twenty-year-old roofs. There is a lot of short-term rental property here too, and those owners care most about days offline, so we schedule around booking calendars where we can. Kissimmee is mostly on its own utility authority, which routes the reconnection paperwork differently from the rest of the county.",
  },
  {
    name: "Brevard",
    slug: "brevard-county",
    detail: "Brevard permits through the county or through Melbourne, Palm Bay, Titusville and Cocoa depending on the address, and the coastal building requirements tighten as you move east toward the barrier island. The county has one of the oldest residential solar populations in Florida, which means we see first-generation string inverters and racking systems that are no longer manufactured. When a rail system is discontinued, a reinstall cannot simply reuse what came off, and that is a line item people are not expecting. Salt intrusion this far up the coast is under-appreciated: we routinely find grounding lugs corroded through on systems only eight or nine years old.",
    seen: "Brevard is our heaviest county for orphaned systems. Half the calls are a dead inverter with no one to file the claim, and the other half are corroded clamps found during a re-roof.",
    seat: "Titusville",
    region: "Space Coast",
    tier: 1,
    utility: "FPL",
    coastal: true,
    towns: ["Titusville", "Cocoa", "Merritt Island", "Melbourne", "Palm Bay"],
    blurb:
      "The Space Coast has one of the largest installed bases of home solar on our route, and a matching number of systems whose original installer no longer exists. Salt air reaches further inland here than people expect, so corroded rails, clamps and grounding hardware are the first thing we check. Palm Bay alone is big enough that we can often line up two jobs in a day.",
  },
  {
    name: "Indian River",
    slug: "indian-river-county",
    detail: "Indian River permits through the county, with Vero Beach and Sebastian running their own departments. Vero's municipal electric system was sold to FPL some years ago, so older paperwork on a house here can reference a utility that no longer exists, which slows a reconnection down if nobody catches it. The mainland is heavily barrel tile over older decking; the barrier island adds full salt exposure on top. Tile plus salt plus an array that was mounted without proper flashing is the combination that produces the ceiling stains we get called about.",
    seen: "Indian River calls are tile, tile and more tile, plus barrier-island hardware that has quietly rusted through. Broken tile during a rushed reset is the complaint we most often get called in to fix.",
    seat: "Vero Beach",
    region: "Treasure Coast",
    tier: 1,
    utility: "FPL",
    coastal: true,
    towns: ["Vero Beach", "Sebastian"],
    blurb:
      "Indian River pairs a strong barrel-tile tradition on the mainland with a barrier island where salt drives every hardware decision. Tile plus salt is the most demanding combination we work in, and it is where reusing the old mounts on a new roof does the most damage. Sebastian is largely single-storey and walkable, which keeps the labour side sensible.",
  },
  {
    name: "St. Lucie",
    slug: "st-lucie-county",
    detail: "St. Lucie permits through Port St. Lucie's own building department for most of the population, and through the county or Fort Pierce elsewhere. Port St. Lucie's growth has been so fast and so uniform that whole districts share a roof age and a builder, which makes quoting unusually predictable once we have done one street. Fort Pierce Utilities Authority handles its own interconnection and it is not the same process as FPL's. Because the housing is young, the honest finding on most service calls here is that the array is fine and one component has failed, which is a much cheaper conversation than people expect.",
    seen: "Port St. Lucie generates more underproduction calls than damage calls. The systems are young enough that it is nearly always one failed part rather than a worn-out array.",
    seat: "Fort Pierce",
    region: "Treasure Coast",
    tier: 1,
    utility: "FPL and Fort Pierce Utilities Authority",
    coastal: true,
    towns: ["Port St. Lucie", "Fort Pierce"],
    blurb:
      "Port St. Lucie is one of the fastest-growing cities in the state and it has solar on a huge number of newer shingle roofs. Because the housing stock is young, the array is often in better shape than anything else up there, and the honest answer is frequently that the panels are fine and one part has failed. Fort Pierce runs its own municipal utility, so reconnection there goes through a different desk.",
  },
  {
    name: "Martin",
    slug: "martin-county",
    detail: "Martin County permits through the county or Stuart, and the coastal construction control line adds requirements on properties near the water. The housing runs from modest inland Palm City subdivisions to substantial waterfront homes with four or five separate roof planes and arrays split across them. More planes means more rails, more penetrations and more places for a previous crew to have cut a corner. A large share of Martin work arrives as a dispute rather than a job: the roofer says the solar company caused the leak, the solar company is gone, and somebody has to open it up and find out.",
    seen: "Martin County calls tend to arrive with a folder: two contractors, three dates and nobody sure who touched the roof last. Documenting what is actually up there is usually the first billable hour.",
    seat: "Stuart",
    region: "Treasure Coast",
    tier: 1,
    utility: "FPL",
    coastal: true,
    towns: ["Stuart", "Palm City", "Jensen Beach", "Hobe Sound"],
    blurb:
      "Martin County has a lot of tile, a lot of water, and a lot of homes where the roof and the array were done years apart by two companies that never spoke to each other. Larger properties with cut-up roof planes are common, and more roof planes means more rails, more penetrations and more time. Untangling who did what is normal work for us here.",
  },
  {
    name: "Palm Beach",
    slug: "palm-beach-county",
    detail: "Palm Beach County permitting is county-run outside the municipalities and separately handled inside them, and there are a lot of municipalities. Add community association approval on top in most of the western communities and a reinstall layout can need sign-off twice before a panel moves. The county is dominated by barrel and flat concrete tile over trusses, much of it now twenty to thirty years old and brittle in the sun. Insurance-driven roof replacement runs constantly here, so a large share of our detach and reset work is on arrays that are barely used and simply in the way.",
    seen: "Palm Beach is insurance-driven re-roofs on tile, with an association wanting the reinstall layout in writing before anything comes down. Also a steady run of leaks under arrays that were never flashed.",
    seat: "West Palm Beach",
    region: "South Florida",
    tier: 1,
    utility: "FPL (Lake Worth Beach runs its own utility)",
    coastal: true,
    towns: [
      "Jupiter",
      "Palm Beach Gardens",
      "West Palm Beach",
      "Wellington",
      "Royal Palm Beach",
      "Lake Worth Beach",
      "Boynton Beach",
      "Delray Beach",
      "Boca Raton",
    ],
    blurb:
      "Palm Beach County is dense with barrel tile and dense with associations, which makes it one of the more demanding places to reset an array cleanly. Roofs here are frequently replaced before they truly need to be because an insurer asked, so we do a lot of detach and reset on arrays that are barely used. Lake Worth Beach has its own municipal electric utility, which catches out contractors who assume the whole county runs on one system.",
  },
  {
    name: "Broward",
    slug: "broward-county",
    detail: "Broward sits inside the High-Velocity Hurricane Zone, which changes the job at every level. Attachments need documented Florida Product Approval or a Miami-Dade Notice of Acceptance, the engineering is checked rather than glanced at, and the reinstall is genuinely inspected. Most municipalities run their own building departments, so the process varies street to street across thirty-odd cities. Being registered in Plantation means we know which counters want what. The roof stock is mixed shingle and tile with a lot of 1970s and 1980s single-storey housing, and salt reaches inland much further than the beach cities.",
    seen: "Broward is home ground, so we get everything: same-week detach and reset, emergency leak calls, and takeovers of systems from installers who left the state. Hurricane-zone paperwork is routine here.",
    seat: "Fort Lauderdale",
    region: "South Florida",
    tier: 1,
    utility: "FPL",
    coastal: true,
    hvhz: true,
    towns: [
      "Fort Lauderdale",
      "Pembroke Pines",
      "Hollywood",
      "Coral Springs",
      "Pompano Beach",
      "Davie",
      "Plantation",
      "Sunrise",
      "Miramar",
      "Deerfield Beach",
      "Weston",
    ],
    blurb:
      "Broward is inside Florida's High-Velocity Hurricane Zone, so every attachment on a reinstall has to carry the right product approval and the whole thing is inspected. That is stricter than anything north of the county line, and it is not optional. Art of Solar is registered in Plantation, so this is home ground and the response here is the fastest we offer.",
  },
  {
    name: "Miami-Dade",
    slug: "miami-dade-county",
    detail: "Miami-Dade is the strictest permitting jurisdiction in Florida and the one the rest of the country copies. Product approval is checked against the county's own Notice of Acceptance list, the engineering has to match, and inspectors here have seen every shortcut. Barrel tile over sloped concrete is the dominant roof, much of it original to 1950s and 1960s construction, and it does not survive an impatient crew. We spend a meaningful share of our Miami time fixing failed reinstalls: arrays that went back on without approved attachments and got red-tagged, or tile that was walked on rather than lifted.",
    seen: "Miami-Dade calls are heavy on inspection failures and tile damage from crews who did not know the product-approval rules. Fixing somebody else's failed reinstall is a large share of the work here.",
    seat: "Miami",
    region: "South Florida",
    tier: 1,
    utility: "FPL (Homestead runs its own utility)",
    coastal: true,
    hvhz: true,
    towns: [
      "Miami",
      "Hialeah",
      "Miami Gardens",
      "Doral",
      "Miami Beach",
      "Coral Gables",
      "Kendall",
      "Cutler Bay",
      "Homestead",
    ],
    blurb:
      "Miami-Dade is the strictest jurisdiction we work in. Hurricane-zone rules govern every attachment, the product approvals get checked, and the reinstall is properly inspected. It also holds enormous barrel-tile stock, so careful tile handling matters more here than anywhere, and Homestead runs its own municipal utility at the southern end.",
  },

  /* ---------------------------------------------------------------- tier 2 */
  {
    name: "Alachua",
    slug: "alachua-county",
    detail: "Alachua permits through the county or the City of Gainesville, and Gainesville Regional Utilities runs its own interconnection with its own forms and its own queue. Gainesville adopted residential solar earlier than almost anywhere else in Florida thanks to a feed-in tariff programme in the late 2000s, so the county holds an unusually old installed base: original inverters well past their design life, racking from manufacturers that no longer exist, and installers who left the trade a decade ago. Those are rewarding systems to take over, because the panels themselves are usually still producing close to spec.",
    seen: "Alachua calls are old systems: early racking, first-generation inverters, and Gainesville's own utility paperwork that nobody outside the city knows how to file.",
    seat: "Gainesville",
    region: "North Central Florida",
    tier: 2,
    utility: "Gainesville Regional Utilities, Duke Energy and Clay Electric",
    towns: ["Gainesville", "Alachua", "Newberry", "High Springs"],
    blurb:
      "Gainesville adopted home solar earlier than most of Florida, so Alachua County has a lot of arrays that are now genuinely old: original inverters, early racking, and installers who moved on years ago. Gainesville runs its own city utility, which means the reconnection paperwork here is nothing like the investor-utility process most contractors know. Worth batching a trip for, and we do.",
  },
  {
    name: "Baker",
    slug: "baker-county",
    detail: "Baker County permits through the county from Macclenny, and most homes buy power from an electric cooperative rather than an investor-owned utility. Co-op interconnection agreements are their own document and the review queue moves at its own pace, so on a reinstall here the paperwork, not the roof, sets the schedule. The housing is overwhelmingly single-storey on large lots, which is straightforward work once a crew is on site. The honest constraint is distance: this is a two-hour-plus drive from anywhere we normally work, so it is batched with anything else we have going on around Jacksonville.",
    seen: "Baker calls are rare and usually cooperative-interconnected. When they come, they come with a permit question rather than a hardware question.",
    seat: "Macclenny",
    region: "Northeast Florida",
    tier: 2,
    utility: "Okefenokee REMC and Clay Electric",
    towns: ["Macclenny", "Glen St. Mary"],
    blurb:
      "Baker County is rural, mostly single-storey, and served largely by electric cooperatives rather than a big utility. Co-op interconnection rules are their own animal and slower to move, so a reinstall here is planned around the paperwork rather than the roof. Small county, long drive, so we batch it with work around Jacksonville.",
  },
  {
    name: "Bay",
    slug: "bay-county",
    detail: "Bay County permits through the county or Panama City, Panama City Beach, Lynn Haven and Callaway. Hurricane Michael flattened a great deal of the county in 2018 and the rebuild that followed was built to current code rather than the code of the original neighbourhood, so a house here is frequently far stronger than its street suggests. Those decks take attachments well. Beach-side addresses still get the full corrosion inspection, because Gulf salt is no gentler than Atlantic salt and the hardware ages identically. This is a long drive from our base and it is booked in blocks.",
    seen: "Bay County is post-Michael rebuilds. The roofs are good; the arrays that went back on them during the rush are the part we get asked to check.",
    seat: "Panama City",
    region: "Panhandle",
    tier: 2,
    utility: "FPL and Gulf Coast Electric Cooperative",
    coastal: true,
    towns: ["Panama City", "Panama City Beach", "Lynn Haven", "Callaway"],
    blurb:
      "Bay County was rebuilt at scale after Hurricane Michael, so a great deal of its roof stock is newer and built to a tougher standard than the age of the neighbourhoods suggests. Those roofs take attachments well. Beach-side addresses still get the full corrosion look, because Gulf salt is no gentler than Atlantic salt.",
  },
  {
    name: "Bradford",
    slug: "bradford-county",
    detail: "Bradford permits through the county at Starke and most homes are on an electric cooperative. It is one of the smallest counties in Florida by population and the solar reflects that: what we see is ground-mounted arrays on acreage and panels on metal-roofed outbuildings rather than suburban rooftop systems. Ground mounts are a genuinely different quote, usually simpler than a two-storey tile roof, and metal roofing needs its own attachment hardware rather than the standoffs that work on shingle. Realistically this is a scheduled trip stacked with work in Alachua or Clay.",
    seen: "Bradford calls are ground mounts and metal outbuildings rather than houses. Different hardware, usually easier work than a two-storey tile roof.",
    seat: "Starke",
    region: "North Central Florida",
    tier: 2,
    utility: "Clay Electric and Duke Energy",
    towns: ["Starke", "Lawtey", "Hampton"],
    blurb:
      "Bradford is one of the smallest counties in the state and almost entirely rural. What solar exists is mostly on ground mounts and metal-roofed outbuildings rather than suburban shingle, and those are a different quote from a house. We come for scheduled work, usually stacked with a run through Alachua or Clay.",
  },
  {
    name: "Calhoun",
    slug: "calhoun-county",
    detail: "Calhoun permits through the county at Blountstown and power comes mostly from a rural cooperative. This is deep Panhandle with a few thousand households, and the solar that exists is largely off-grid or agricultural: pump systems, barn roofs, battery banks on property well away from a service drop. That is real work and we do it, but it is nothing like a suburban detach and reset and it gets quoted differently. It is also among the longest drives in the state from South Florida, so we will tell you honestly on the first call whether the job justifies it.",
    seen: "Calhoun is off-grid and agricultural. When we get a call here it is normally a battery or pump system rather than a grid-tied roof array.",
    seat: "Blountstown",
    region: "Panhandle",
    tier: 2,
    utility: "West Florida Electric Cooperative and Duke Energy",
    towns: ["Blountstown", "Altha"],
    blurb:
      "Calhoun is deep Panhandle and thinly populated, with most power coming from a rural cooperative. Solar here tends to be off-grid or ground-mounted on acreage rather than rooftop arrays in subdivisions. It is a long way from our base, so this is planned work with a real minimum, and we will say so honestly on the first call.",
  },
  {
    name: "Charlotte",
    slug: "charlotte-county",
    detail: "Charlotte County permits through the county or Punta Gorda. Hurricane Ian came ashore essentially on top of this county in 2022 and the volume of roof replacement since has been extraordinary, which matters for a specific reason: a great many arrays came off in the rebuild and went back on by whoever was available that week. We are now finding the results. Clamps that were never re-torqued, rails reused past their service life, and old mounts refitted to new roofs without flashing. The panels are usually fine. What is under them frequently is not.",
    seen: "Charlotte County is Ian aftermath. Arrays that came off fast and went back on faster, and are now showing loose clamps and unflashed mounts.",
    seat: "Punta Gorda",
    region: "Southwest Florida",
    tier: 2,
    utility: "FPL and Lee County Electric Cooperative",
    coastal: true,
    towns: ["Punta Gorda", "Port Charlotte", "Englewood"],
    blurb:
      "Charlotte County took a direct hit from Hurricane Ian, and a huge amount of roof replacement followed it. That means an unusual concentration of arrays that came off, went back on in a hurry, and were never properly checked afterwards. Loose clamps and unflashed mounts from a rushed reinstall are exactly what we get called about here.",
  },
  {
    name: "Citrus",
    slug: "citrus-county",
    detail: "Citrus permits through the county at Inverness, with Crystal River handling its own. The housing skews heavily toward retirement communities: single-storey, shallow walkable pitch, modest system sizes, and short carries from roof to truck. That is the least expensive detach and reset there is, and quotes here regularly land below what people expect after reading national cost guides. The Gulf side around Crystal River and Homosassa still gets a corrosion inspection, and much of the coastal property is low-lying, which affects where panels can safely be stored during a roof job.",
    seen: "Citrus calls are retirement housing: small systems, walkable roofs, and owners who want a fixed number before anyone climbs a ladder.",
    seat: "Inverness",
    region: "Nature Coast",
    tier: 2,
    utility: "Duke Energy and Withlacoochee River Electric",
    coastal: true,
    towns: ["Inverness", "Crystal River", "Homosassa", "Beverly Hills"],
    blurb:
      "Citrus County skews heavily toward retirement housing: single-storey, walkable pitch, modest systems. That is the easy end of a detach and reset, and quotes here often come in below what people expect after reading national price guides. The Gulf side around Crystal River still gets the corrosion check.",
  },
  {
    name: "Clay",
    slug: "clay-county",
    detail: "Clay County permits through the county at Green Cove Springs, with Orange Park and Keystone Heights running their own. The utility split is the thing to get right here: a large share of the county is on Clay Electric Cooperative while addresses closer to Jacksonville fall under JEA, and the two handle reconnection and net metering completely differently. The housing is mostly late-1990s onward commuter suburbs with clean shingle roof planes, which detaches predictably. Fleming Island and the newer Oakleaf developments are the most consistent work.",
    seen: "Clay County calls usually start with confusion over which utility holds the interconnection, because the co-op and the Jacksonville municipal system handle it completely differently.",
    seat: "Green Cove Springs",
    region: "Northeast Florida",
    tier: 2,
    utility: "Clay Electric Cooperative and JEA",
    towns: ["Orange Park", "Green Cove Springs", "Middleburg", "Fleming Island"],
    blurb:
      "Clay County is commuter suburbs south of Jacksonville, largely newer shingle on clean roof planes, which detaches predictably. The wrinkle is the utility: much of the county is on an electric cooperative rather than the Jacksonville municipal system, and the two handle reconnection completely differently.",
  },
  {
    name: "Collier",
    slug: "collier-county",
    detail: "Collier permits through the county or Naples and Marco Island, and community association approval is effectively a second permit across most of the county. Roofs are predominantly concrete and clay tile on large footprints, often with arrays split across several planes at different pitches. Nothing about a Collier quote is quick, and any contractor who gives you a number over the phone here has not looked at the roof. Naples and Marco sit directly on the Gulf, so corrosion inspection and wind-rated attachment are both in play, and the drive across Alligator Alley is genuinely manageable from Broward.",
    seen: "Collier calls are large tile roofs, multiple arrays on different faces, and an association that wants drawings. Never a quick quote, often a good job.",
    seat: "Naples",
    region: "Southwest Florida",
    tier: 2,
    utility: "FPL and Lee County Electric Cooperative",
    coastal: true,
    towns: ["Naples", "Marco Island", "Immokalee", "Golden Gate"],
    blurb:
      "Collier County is tile-heavy, association-heavy and full of large homes with complicated roof planes, which is our kind of work but never a quick quote. Naples and Marco Island sit right on the Gulf, so corrosion and wind attachment carry the conversation. Worth the drive across Alligator Alley when the job is the right size.",
  },
  {
    name: "Columbia",
    slug: "columbia-county",
    detail: "Columbia permits through the county at Lake City. Two interstates cross here, which gives the county more commercial and light-industrial roof stock than its population would suggest, alongside a lot of rural acreage. Three separate providers cover different parts of the county, so the first question on any reinstall is who actually holds the interconnection agreement, and the answer is not always what the homeowner thinks. Metal roofing is common on the agricultural buildings and it needs entirely different attachment hardware from the shingle work we do further south.",
    seen: "Columbia calls split between commercial roofs near the interstate junction and rural acreage. Three providers cover the county, so the interconnection question comes first.",
    seat: "Lake City",
    region: "North Central Florida",
    tier: 2,
    utility: "Duke Energy, Clay Electric and Suwannee Valley Electric",
    towns: ["Lake City", "Fort White"],
    blurb:
      "Columbia County sits where two interstates cross, so it has more commercial roof stock than its population suggests, alongside rural acreage. Three different power providers cover it, which means the first question on any reinstall here is who actually holds the interconnection.",
  },
  {
    name: "DeSoto",
    slug: "desoto-county",
    detail: "DeSoto permits through the county at Arcadia. This is inland agricultural Southwest Florida and it has taken repeated storm damage, most recently from Ian passing directly over it, which put a great many roofs back to bare deck. Where solar was involved the array came off in a hurry and went back on faster still. Ranch buildings, packing houses and ground-mounted systems on acreage feature as heavily as houses. What we mostly get asked to do here is find out what a rushed reinstall did to the attachments before the next storm finds out for us.",
    seen: "DeSoto is storm-damaged agricultural country. Roofs went back to bare deck and the arrays went back on in a hurry, which is what we are called to inspect.",
    seat: "Arcadia",
    region: "Southwest Florida",
    tier: 2,
    utility: "FPL, Peace River Electric and Duke Energy",
    towns: ["Arcadia"],
    blurb:
      "DeSoto is agricultural inland Southwest Florida, and it saw serious storm damage that put a lot of roofs back to bare deck. Where solar was involved, the array usually came off fast and went back on faster. We get called in afterwards to find out what that did to the attachments.",
  },
  {
    name: "Dixie",
    slug: "dixie-county",
    detail: "Dixie permits through the county at Cross City and most homes are on a rural cooperative. The Gulf side at Horseshoe Beach and Suwannee is largely raised stilt construction, which changes everything about how a crew stages a detach: there is no simple ladder set, storage has to be planned, and the working height is higher than the roof pitch suggests. Inland is acreage with ground mounts and metal roofs. Small population, long drive, and honest scheduling rather than a promise we cannot keep.",
    seen: "Dixie calls are coastal stilt houses and inland acreage. Raised construction changes staging completely and it goes in the quote up front.",
    seat: "Cross City",
    region: "Nature Coast",
    tier: 2,
    utility: "Central Florida Electric Cooperative and Duke Energy",
    coastal: true,
    towns: ["Cross City", "Horseshoe Beach", "Suwannee"],
    blurb:
      "Dixie County is quiet Gulf coastline and small inland towns, with power mostly from a cooperative. Coastal properties here are often raised, which changes how a crew stages a detach entirely. Long drive, planned work, and we will be straight with you about scheduling.",
  },
  {
    name: "Duval",
    slug: "duval-county",
    detail: "Duval permits through the City of Jacksonville, which is consolidated with the county, so there is mercifully one building department for almost the whole area. JEA is the municipal utility and its interconnection process is its own thing. Jacksonville has a large residential solar population and a genuine shortage of companies willing to take over another firm's array, which is most of why we get called this far north. The Beaches communities add salt exposure and their own building requirements; the inland west side is ordinary suburban shingle work at scale.",
    seen: "Duval is one of our busiest northern counties: a large installed base, JEA's own interconnection process, and very few companies willing to take over another firm's array.",
    seat: "Jacksonville",
    region: "Northeast Florida",
    tier: 2,
    utility: "JEA",
    coastal: true,
    towns: ["Jacksonville", "Jacksonville Beach", "Atlantic Beach", "Neptune Beach"],
    blurb:
      "Jacksonville is the biggest city in the state by land area and almost all of Duval County is on JEA, a municipal utility with its own interconnection process. There is a large installed base of residential solar here and a real shortage of companies willing to service somebody else's array. Beaches addresses get the salt-air check.",
  },
  {
    name: "Escambia",
    slug: "escambia-county",
    detail: "Escambia permits through the county or the City of Pensacola. The utility here was Gulf Power until it merged into FPL, and older paperwork on a house still references the old company, which will stall a reconnection if nobody catches it. Pensacola Beach is barrier island with the highest wind exposure in the Panhandle and hardware that ages accordingly. This is the single longest drive we make inside Florida, and we would rather book it properly as part of a Panhandle run than pretend we can be there on Thursday.",
    seen: "Escambia calls are beach-side corrosion and old Gulf Power paperwork. The longest drive we make in Florida, so it is always batched.",
    seat: "Pensacola",
    region: "Panhandle",
    tier: 2,
    utility: "FPL and Escambia River Electric Cooperative",
    coastal: true,
    towns: ["Pensacola", "Pensacola Beach", "Century"],
    blurb:
      "Escambia is the far western end of the state and its power was Gulf Power until the FPL merger, so paperwork here still surprises people who only work the east coast. Pensacola Beach is barrier island, which means the hardest wind and salt exposure in the Panhandle. This is our longest drive in Florida and it is booked well ahead.",
  },
  {
    name: "Flagler",
    slug: "flagler-county",
    detail: "Flagler permits through the county at Bunnell or through Palm Coast, which is most of the population. Palm Coast is unusual in Florida: a planned community built in waves on a consistent street grid with a narrow range of house types, mostly shingle. That consistency cuts both ways. Quoting is fast once we have done one, and when a roof generation reaches end of life the whole neighbourhood follows within two or three years, so we often end up doing several houses on the same street in the same season.",
    seen: "Palm Coast is uniform enough that when one roof generation starts failing, the whole street follows within a couple of years. We tend to get several calls from the same neighbourhood.",
    seat: "Bunnell",
    region: "Northeast Florida",
    tier: 2,
    utility: "FPL and Duke Energy",
    coastal: true,
    towns: ["Palm Coast", "Flagler Beach", "Bunnell"],
    blurb:
      "Palm Coast is almost the whole of Flagler County and it is unusually consistent: planned streets, similar houses, mostly shingle, a lot of them the same age. That consistency makes quoting straightforward and it also means when one roof generation starts failing, the whole neighbourhood follows within a couple of years.",
  },
  {
    name: "Franklin",
    slug: "franklin-county",
    detail: "Franklin permits through the county at Apalachicola, with Carrabelle running its own. This is oyster coast and barrier island, and metal roofing is far more common here than anywhere in peninsular Florida. Metal changes the attachment specification completely: standing-seam clamps rather than penetrating standoffs, and no flashing question at all if it is done right. St. George Island is raised coastal construction with the wind exposure to match. Small county, long haul, planned work only, and we say so rather than dress it up.",
    seen: "Franklin calls are metal roofs on raised coastal houses. Metal attachment hardware rules out most of what works on shingle, and that surprises people.",
    seat: "Apalachicola",
    region: "Panhandle",
    tier: 2,
    utility: "Duke Energy and Talquin Electric",
    coastal: true,
    towns: ["Apalachicola", "Carrabelle", "St. George Island"],
    blurb:
      "Franklin County is oyster coast and barrier island, with a lot of raised coastal houses and metal roofs. Metal changes the attachment hardware completely and rules out most of what works on shingle. Small county, long haul, planned work only.",
  },
  {
    name: "Gadsden",
    slug: "gadsden-county",
    detail: "Gadsden permits through the county at Quincy and power is mostly cooperative. This is rolling North Florida just west of Tallahassee with older housing stock and, crucially, very heavy tree canopy. Shade is the first thing worth checking on any underproducing system here, because a good proportion of the calls we get in this part of the state turn out to be twenty years of growth rather than a hardware fault. Telling somebody their system is fine and they need a tree surgeon is a cheaper answer than a repair quote, and it is often the right one.",
    seen: "Gadsden calls are usually underproduction that turns out to be tree shade rather than a fault. We check that before quoting, because it saves the homeowner money.",
    seat: "Quincy",
    region: "Panhandle",
    tier: 2,
    utility: "Talquin Electric Cooperative and Duke Energy",
    towns: ["Quincy", "Havana", "Chattahoochee"],
    blurb:
      "Gadsden County is rural North Florida just west of Tallahassee, largely served by a cooperative. Older housing stock and tree cover mean shade is often the real reason a system underproduces here, not a fault. We check that before quoting anything, because it saves people money.",
  },
  {
    name: "Gilchrist",
    slug: "gilchrist-county",
    detail: "Gilchrist permits through the county at Trenton and most homes are on a cooperative. It is small, rural and agricultural, and the solar reflects that: ground-mounted arrays on acreage, panels on barn and shop roofs, and very little suburban rooftop work. Ground mounts are honestly easier than a two-storey tile roof, with no fall protection setup and no tile to break, and they are quoted accordingly. Realistically we come here as part of a run through Alachua and Levy rather than on its own.",
    seen: "Gilchrist is ground mounts on acreage. Honestly easier work than a two-storey tile roof, and quoted differently.",
    seat: "Trenton",
    region: "North Central Florida",
    tier: 2,
    utility: "Central Florida Electric Cooperative and Clay Electric",
    towns: ["Trenton", "Bell", "Fanning Springs"],
    blurb:
      "Gilchrist is small, rural and agricultural, and the solar we see is mostly ground-mounted on acreage. Ground mounts are their own quote, and honestly they are usually easier work than a two-storey tile roof. Batched with runs through Alachua and Levy.",
  },
  {
    name: "Glades",
    slug: "glades-county",
    detail: "Glades permits through the county at Moore Haven. This is the west rim of Lake Okeechobee and one of the least populated counties in Florida, served largely by a rural cooperative. Solar here is overwhelmingly agricultural: irrigation pumps, ranch buildings, remote battery systems well away from a service drop. It is genuinely different work from a suburban roof and it gets a different quote. It is also reachable from our South Florida base more easily than the mileage suggests, which is worth knowing.",
    seen: "Glades calls are agricultural and often off-grid. Real work, genuinely different from suburban rooftop, and always scheduled ahead.",
    seat: "Moore Haven",
    region: "Southwest Florida",
    tier: 2,
    utility: "Glades Electric Cooperative and FPL",
    towns: ["Moore Haven", "Buckhead Ridge"],
    blurb:
      "Glades County sits on the west side of Lake Okeechobee and is one of the least populated counties in Florida. Solar here is overwhelmingly agricultural and off-grid rather than suburban rooftop. Real work, genuinely different work, and always scheduled ahead.",
  },
  {
    name: "Gulf",
    slug: "gulf-county",
    detail: "Gulf permits through the county at Port St. Joe. Hurricane Michael came ashore here in 2018 and the county took the worst of it, so much of what stands now was built or substantially rebuilt afterwards to current code. Those roofs are strong and take attachments well. Cape San Blas and the beach communities are raised coastal construction with salt exposure as harsh as anywhere in Florida, and hardware there ages fast enough that we check every fastener rather than sampling. Long drive, batched with other Panhandle work.",
    seen: "Gulf County is Michael rebuild plus Cape San Blas salt. Newer roofs, harsh exposure, and hardware that ages fast.",
    seat: "Port St. Joe",
    region: "Panhandle",
    tier: 2,
    utility: "Duke Energy and Gulf Coast Electric Cooperative",
    coastal: true,
    towns: ["Port St. Joe", "Wewahitchka", "Cape San Blas"],
    blurb:
      "Gulf County took the worst of Hurricane Michael and much of what stands now was built or rebuilt afterwards. Newer roofs, tougher standards, and a lot of raised coastal construction on Cape San Blas. Salt exposure here is as harsh as anywhere in the state.",
  },
  {
    name: "Hamilton",
    slug: "hamilton-county",
    detail: "Hamilton permits through the county at Jasper and sits directly on the Georgia line. It is among the most rural counties in Florida, served by cooperatives, and what solar exists tends to be on farm buildings and remote property rather than subdivisions. Co-op interconnection paperwork sets the schedule rather than the roof. This is the far northern edge of anything we realistically do, and any job here is planned well ahead with a minimum that makes the drive make sense for both of us.",
    seen: "Hamilton calls are farm buildings on cooperative interconnection. The far north end of anything we do.",
    seat: "Jasper",
    region: "North Central Florida",
    tier: 2,
    utility: "Suwannee Valley Electric Cooperative and Duke Energy",
    towns: ["Jasper", "Jennings", "White Springs"],
    blurb:
      "Hamilton County is on the Georgia line and about as rural as Florida gets. What solar exists is cooperative-interconnected and often on farm buildings. This is the far north end of anything we do and it is planned work with a minimum.",
  },
  {
    name: "Hardee",
    slug: "hardee-county",
    detail: "Hardee permits through the county at Wauchula. Citrus and cattle country inland from the Gulf, and it has taken repeated hurricane damage in recent years with roof replacement running more or less continuously since. Where arrays were involved they came off and went back on with whatever crew was free, which is exactly the work we are called to inspect afterwards. Packing houses and agricultural buildings feature alongside houses, and those are metal roofs needing their own hardware rather than shingle standoffs.",
    seen: "Hardee has had repeated storm damage and constant roof replacement. Arrays came off and went back on with whoever was available, and that is what we inspect.",
    seat: "Wauchula",
    region: "Southwest Florida",
    tier: 2,
    utility: "Duke Energy and Peace River Electric",
    towns: ["Wauchula", "Bowling Green", "Zolfo Springs"],
    blurb:
      "Hardee County is citrus and cattle country inland from the Gulf, and it has taken repeated storm damage in recent years. Roof replacement has been constant, which means arrays coming off and going back on with whoever was available. That is exactly the work we get called to inspect afterwards.",
  },
  {
    name: "Hendry",
    slug: "hendry-county",
    detail: "Hendry permits through the county at LaBelle, with Clewiston running its own. Sugar and agriculture on the southern rim of Lake Okeechobee, and three separate providers cover different parts of the county, so establishing who holds the interconnection is genuinely the first step rather than a formality. The mix of work here leans agricultural and commercial more than residential. The useful thing about Hendry is proximity: it is close enough to our South Florida base that scheduling is easier than the rural setting suggests.",
    seen: "Hendry calls come in from three different providers depending on the address, so establishing who holds the interconnection is step one. Reachable from our South Florida base without much trouble.",
    seat: "LaBelle",
    region: "Southwest Florida",
    tier: 2,
    utility: "FPL, Lee County Electric Cooperative and Glades Electric",
    towns: ["LaBelle", "Clewiston"],
    blurb:
      "Hendry County is sugar and agriculture on the southern rim of Lake Okeechobee. Three different providers cover it depending on the address, so the first thing to establish on any reinstall is who actually holds the interconnection. Reachable from our South Florida base without much trouble.",
  },
  {
    name: "Hernando",
    slug: "hernando-county",
    detail: "Hernando permits through the county at Brooksville. Spring Hill accounts for most of the housing and it is remarkably consistent: single-storey, shallow-pitch shingle built through the 1980s and 1990s on a grid, much of it now well past one roof replacement. Short carries, walkable pitches and modest system sizes make this some of the least expensive detach and reset work we do. The Gulf edge is thinly built but the coastal building requirements still apply there, and the low-lying ground affects where panels can safely sit while a roof is done.",
    seen: "Spring Hill is most of what we see in Hernando: single-storey shingle at the age where the roof needs replacing and the array has to come off.",
    seat: "Brooksville",
    region: "Nature Coast",
    tier: 2,
    utility: "Duke Energy and Withlacoochee River Electric",
    coastal: true,
    towns: ["Brooksville", "Spring Hill", "Weeki Wachee"],
    blurb:
      "Spring Hill is most of Hernando County's housing: single-storey, shingle, built in waves, and a lot of it now at the age where the roof needs replacing. Straightforward detach and reset work with short carries and walkable pitches. The Gulf edge is thinly built but coastal rules still apply there.",
  },
  {
    name: "Highlands",
    slug: "highlands-county",
    detail: "Highlands permits through the county at Sebring, with Avon Park and Lake Placid handling their own. This is inland central Florida with a heavy retirement population, which means single-storey housing, modest arrays and owners who want a fixed written number before anyone climbs a ladder. Being inland, salt corrosion drops off the list entirely and the failures we find are rail condition, flashing at the mounts, and arrays that were never torqued to specification. Highlands also sits on the edge of ground we already travel, so scheduling here is better than the map suggests.",
    seen: "Highlands calls are retirement housing on the edge of our existing travel, so scheduling is easier here than the drive time suggests.",
    seat: "Sebring",
    region: "Central Florida",
    tier: 2,
    utility: "Duke Energy and Glades Electric",
    towns: ["Sebring", "Avon Park", "Lake Placid"],
    blurb:
      "Highlands County is inland central Florida, retirement-heavy, single-storey and manageable. It sits on the edge of the area we already travel to, so scheduling here is easier than the drive time suggests. Inland means the failures are rail condition and flashing rather than corrosion.",
  },
  {
    name: "Hillsborough",
    slug: "hillsborough-county",
    detail: "Hillsborough permits through the county or the City of Tampa, Temple Terrace and Plant City. Tampa Electric is the utility for most of the county and its interconnection process is separate from both Duke and FPL, which trips up contractors coming from elsewhere. Hillsborough has one of the largest residential solar populations in Florida, a great deal of it sold through dealer networks that have since collapsed, so orphaned system work is a bigger share of what we do here than roof work. The volume is enough to justify batching several jobs into one trip.",
    seen: "Hillsborough gives us enough volume to batch a proper run rather than a single call-out. Heavy on orphaned systems from dealer networks that closed.",
    seat: "Tampa",
    region: "Tampa Bay",
    tier: 2,
    utility: "Tampa Electric and Withlacoochee River Electric",
    coastal: true,
    towns: ["Tampa", "Brandon", "Plant City", "Riverview"],
    blurb:
      "Tampa is one of the biggest solar markets in the state and Hillsborough County has the installed base to match, including a lot of systems sold by companies that have since closed. It is also its own utility territory with its own interconnection process. Big enough that we can batch a proper run of work rather than a single call-out.",
  },
  {
    name: "Holmes",
    slug: "holmes-county",
    detail: "Holmes permits through the county at Bonifay and sits against the Alabama line. Power is largely cooperative. Metal roofing is genuinely common here in a way it is not in peninsular Florida, and metal needs standing-seam clamps or an entirely different mounting approach rather than the standoffs and flashing that work on shingle. The housing is rural and single-storey, which makes the work itself simple once a crew arrives. Distance is the honest constraint and it is booked as part of a Panhandle run.",
    seen: "Holmes calls are metal roofs in rural country. Different hardware, long drive, planned work.",
    seat: "Bonifay",
    region: "Panhandle",
    tier: 2,
    utility: "West Florida Electric Cooperative and FPL",
    towns: ["Bonifay", "Esto", "Ponce de Leon"],
    blurb:
      "Holmes County is small, rural and cooperative-served, up against the Alabama line. Metal roofs are common here in a way they are not further south, and metal needs different attachment hardware from shingle. Long drive, planned work.",
  },
  {
    name: "Jackson",
    slug: "jackson-county",
    detail: "Jackson permits through the county at Marianna. Hurricane Michael stayed a major hurricane well inland and did serious damage here, which still surprises people who assume the Panhandle interior was spared, and roof replacement has been running ever since. Where solar was on those roofs it came off fast. We are usually called in afterwards to establish what that did to the attachments and the flashing. Power is mostly cooperative, so interconnection follows co-op rules and its own timetable rather than an investor utility's.",
    seen: "Jackson County was hit hard by Michael well inland, which still surprises people. Roof replacement has run ever since, and the arrays on those roofs are what we check.",
    seat: "Marianna",
    region: "Panhandle",
    tier: 2,
    utility: "West Florida Electric Cooperative and FPL",
    towns: ["Marianna", "Graceville", "Sneads"],
    blurb:
      "Jackson County was badly hit by Hurricane Michael well inland, which surprised a lot of people, and roof replacement has been running ever since. Where solar was on those roofs it came off in a hurry. We are usually there to check what that did to the mounts and the flashing.",
  },
  {
    name: "Jefferson",
    slug: "jefferson-county",
    detail: "Jefferson permits through the county at Monticello and is one of very few Florida counties running from the Georgia line all the way to the Gulf, with fewer than fifteen thousand people in it. Monticello has a genuinely historic core: steep pitches, small cut-up roof planes, and in places local review of anything visible from the street. Steep and cut up means a detach takes materially longer than the panel count implies, and we price it that way rather than discovering it on the day.",
    seen: "Jefferson calls are historic housing around Monticello: steep pitches and small roof planes that slow a detach right down.",
    seat: "Monticello",
    region: "Panhandle",
    tier: 2,
    utility: "Talquin Electric Cooperative and Duke Energy",
    coastal: true,
    towns: ["Monticello", "Lloyd"],
    blurb:
      "Jefferson County runs from the Georgia line all the way to the Gulf and has fewer than fifteen thousand people in it. Historic housing around Monticello means steep pitches and small roof planes, which slows a detach down considerably. Planned work, batched with Leon or Madison.",
  },
  {
    name: "Lafayette",
    slug: "lafayette-county",
    detail: "Lafayette permits through the county at Mayo and is the second least populated county in Florida. Power is cooperative. The solar here is farm infrastructure rather than rooftop: irrigation pumps, remote battery banks, panels on shop and barn roofs. That is real work and we quote it properly, but it has almost nothing in common with a suburban detach and reset. It is genuinely a special trip and we will say so on the phone rather than take a booking we cannot serve well.",
    seen: "Lafayette calls are farm and pump systems, not rooftop arrays. Genuinely a special trip and we say so rather than pretend.",
    seat: "Mayo",
    region: "North Central Florida",
    tier: 2,
    utility: "Suwannee Valley Electric Cooperative and Tri-County Electric",
    towns: ["Mayo"],
    blurb:
      "Lafayette is the second least populated county in Florida and is almost entirely agricultural. Solar here means farm buildings, pump systems and ground mounts, not suburban rooftops. Genuinely a special trip, and we will tell you that rather than pretend otherwise.",
  },
  {
    name: "Lake",
    slug: "lake-county",
    detail: "Lake permits through the county at Tavares or through Clermont, Leesburg, Eustis and Mount Dora. The county has two completely different halves. The Clermont and Four Corners side has exploded with newer construction, much of it with solar included from the builder, on clean shingle planes that detach easily. The older lakeside towns to the north are 1920s to 1960s housing with steeper pitches and original decking underneath. Lake borders our home route, so response here is closer to Tier 1 than most of the state.",
    seen: "Lake County borders our home route, so response here is closer to Tier 1 than most of the state. Clermont is newer shingle; the lakeside towns are slower, more careful work.",
    seat: "Tavares",
    region: "Central Florida",
    tier: 2,
    utility: "Duke Energy and SECO Energy",
    towns: ["Clermont", "Leesburg", "Eustis", "Mount Dora", "Tavares"],
    blurb:
      "Lake County has grown enormously on the Orlando side, and Clermont in particular is full of newer homes with solar on clean shingle roofs. It borders our home route, so response here is closer to Tier 1 than most of the state. Older lakeside housing around Mount Dora and Eustis is the slower, more careful end of the work.",
  },
  {
    name: "Lee",
    slug: "lee-county",
    detail: "Lee permits through the county at Fort Myers or through Cape Coral, Bonita Springs, Sanibel and Fort Myers Beach, and the coastal municipalities added requirements after Ian. Cape Coral alone is one of the largest residential solar markets on the Gulf coast. The rebuild after Ian generated an enormous number of hurried reinstalls, and those are what we are called to now: reused mounts, missing flashing, clamps that were never re-torqued, and arrays sitting on new roofs with old penetrations. Most Lee calls start with a ceiling stain rather than a production drop.",
    seen: "Lee County is the largest concentration of rushed post-Ian reinstalls in the state. Cape Coral alone keeps us busy, and most calls start with a stain on a ceiling.",
    seat: "Fort Myers",
    region: "Southwest Florida",
    tier: 2,
    utility: "FPL and Lee County Electric Cooperative",
    coastal: true,
    towns: ["Fort Myers", "Cape Coral", "Bonita Springs", "Sanibel", "Fort Myers Beach"],
    blurb:
      "Lee County was the centre of Hurricane Ian's damage and the volume of roof replacement since has been extraordinary. Cape Coral alone is one of the largest solar markets on the Gulf coast. A lot of arrays came off in a hurry during that rebuild and went back on without a proper reset, and those are the roofs we get called to.",
  },
  {
    name: "Leon",
    slug: "leon-county",
    detail: "Leon permits through the county or the City of Tallahassee. Tallahassee runs its own municipal electric utility and its interconnection process looks nothing like FPL's, which regularly catches out contractors from further south. The other defining feature is canopy: Leon has some of the heaviest tree cover in Florida and shade is very often the actual explanation for an underproducing system rather than any hardware fault. We check that first, because telling someone to call an arborist is cheaper than selling them an inverter.",
    seen: "Leon calls involve Tallahassee's city utility, which looks nothing like FPL's process, and heavy tree canopy that is often the real reason a system underproduces.",
    seat: "Tallahassee",
    region: "Panhandle",
    tier: 2,
    utility: "City of Tallahassee and Talquin Electric",
    towns: ["Tallahassee", "Woodville"],
    blurb:
      "Tallahassee runs its own city electric utility, which means the interconnection process here looks nothing like FPL's and catches out contractors from further south. Heavy tree canopy across Leon County makes shade the first thing worth checking on any underproducing system. Planned trips, usually batched with Gadsden or Wakulla.",
  },
  {
    name: "Levy",
    slug: "levy-county",
    detail: "Levy permits through the county at Bronson, with Chiefland, Williston and Cedar Key handling their own. Most homes are on a rural cooperative. Cedar Key is its own problem: a raised island community with narrow lots where staging a detach, getting a truck close and finding safe storage for panels is genuinely most of the planning. Inland Levy is acreage with ground mounts and metal-roofed buildings. Cooperative interconnection sets the timetable and we schedule around it rather than around the roof.",
    seen: "Levy calls are rural acreage and Cedar Key, where staging any roof work on a raised island lot is its own puzzle.",
    seat: "Bronson",
    region: "Nature Coast",
    tier: 2,
    utility: "Central Florida Electric Cooperative and Duke Energy",
    coastal: true,
    towns: ["Chiefland", "Williston", "Cedar Key", "Bronson"],
    blurb:
      "Levy County is rural Gulf coast with a lot of acreage and a fair amount of off-grid and ground-mounted solar. Cedar Key is a raised island community where staging any roof work is its own puzzle. Cooperative interconnection, planned scheduling.",
  },
  {
    name: "Liberty",
    slug: "liberty-county",
    detail: "Liberty permits through the county at Bristol and is the least populated county in Florida, most of it national forest. Power comes from a rural cooperative. What solar exists is off-grid or agricultural rather than grid-tied rooftop: hunt camps, remote buildings, battery systems well away from any service drop. This is the far edge of anything we realistically cover from South Florida and we treat it as such. Any job here is scheduled well ahead with a minimum that makes the drive honest for both sides.",
    seen: "Liberty calls are off-grid and agricultural, in the least populated county in the state. Scheduled trips with a real minimum.",
    seat: "Bristol",
    region: "Panhandle",
    tier: 2,
    utility: "Talquin Electric Cooperative and Duke Energy",
    towns: ["Bristol", "Hosford"],
    blurb:
      "Liberty County is the least populated county in Florida, almost entirely forest, and served by a rural cooperative. What solar exists is off-grid or agricultural. This is the far edge of anything we do and it is a scheduled trip with a real minimum.",
  },
  {
    name: "Madison",
    slug: "madison-county",
    detail: "Madison permits through the county at Madison and sits on the Georgia line. Power is cooperative. Older rural housing here uses a great deal of metal roofing, and metal is a different specification from top to bottom: different clamps, different load path, no flashing question if it is done properly and a serious leak if it is not. Getting that right first time matters more than speed. Realistically this county is covered as part of a run through Jefferson or Hamilton rather than on its own.",
    seen: "Madison calls are metal roofs on older rural housing. Metal attachment hardware is a different specification and worth getting right first time.",
    seat: "Madison",
    region: "North Central Florida",
    tier: 2,
    utility: "Tri-County Electric Cooperative and Duke Energy",
    towns: ["Madison", "Greenville", "Lee"],
    blurb:
      "Madison County is rural North Florida on the Georgia line, cooperative-served, with older housing and a lot of metal roofing. Metal attachment hardware is a different specification from shingle and it is worth getting right the first time. Batched with Jefferson or Hamilton.",
  },
  {
    name: "Manatee",
    slug: "manatee-county",
    detail: "Manatee permits through the county at Bradenton or through Bradenton, Palmetto and Anna Maria. The county splits cleanly in two. Lakewood Ranch and the east side are newer concrete tile on large modern footprints with recent solar, quoted as tile work. The barrier islands at Anna Maria and Holmes Beach are older, lower and fully exposed, where hardware ages fast and access is tight. We quote them as two different markets because that is what they are, and pretending otherwise produces a number that changes on the day.",
    seen: "Manatee splits cleanly: newer tile around Lakewood Ranch, and exposed older housing on the Anna Maria islands. We quote them as two different jobs.",
    seat: "Bradenton",
    region: "Tampa Bay",
    tier: 2,
    utility: "FPL and Peace River Electric",
    coastal: true,
    towns: ["Bradenton", "Palmetto", "Lakewood Ranch", "Anna Maria"],
    blurb:
      "Manatee County has grown fast around Lakewood Ranch, which means a large stock of newer tile roofs with recent solar on them. The barrier islands at Anna Maria are the opposite: older, exposed, and hard on hardware. Two different jobs in one county, quoted separately.",
  },
  {
    name: "Marion",
    slug: "marion-county",
    detail: "Marion permits through the county at Ocala or through the City of Ocala. Three providers cover the county and Ocala runs its own municipal electric utility, so the reconnection route can change from one street to the next. The dominant housing is retirement: single-storey, walkable, modest systems, and a large share of it in planned communities with their own approval process for anything on a roof. That combination makes for cheap, predictable labour and slow, fiddly paperwork, and the paperwork is usually what sets the timeline.",
    seen: "Marion calls are modest single-storey systems on walkable roofs, and a reconnection route that changes street by street between the Ocala city utility and the county.",
    seat: "Ocala",
    region: "North Central Florida",
    tier: 2,
    utility: "Duke Energy, Ocala Electric Utility and SECO Energy",
    towns: ["Ocala", "Belleview", "Dunnellon", "The Villages area"],
    blurb:
      "Marion County has an enormous retirement population and with it a lot of modest, single-storey systems on walkable roofs. That is the cheapest end of a detach and reset. Ocala runs its own city utility while the surrounding county does not, so the reconnection route changes street by street.",
  },
  {
    name: "Monroe",
    slug: "monroe-county",
    detail: "Monroe permits through the county or through Key West, Marathon, Islamorada and Key Colony Beach, and the building requirements are among the most demanding in the United States. Wind design loads here are the highest in Florida and everything on a roof has to be documented to match. Nothing recovered off an old roof goes back onto a new one in the Keys. Beyond the engineering, access is the real cost: narrow lots, no staging room, ferry-and-bridge logistics for materials, and nowhere obvious to store an array for a fortnight. An honest Keys quote says all of that up front.",
    seen: "Keys calls are corrosion and access. Nothing recovered off an old roof goes back onto a new one, and staging on a narrow island lot is half the quote.",
    seat: "Key West",
    region: "Florida Keys",
    tier: 2,
    utility: "Keys Energy Services and Florida Keys Electric Cooperative",
    coastal: true,
    towns: ["Key West", "Marathon", "Key Largo", "Islamorada"],
    blurb:
      "The Keys are the harshest environment for solar hardware in the state: salt on every side, the highest wind design loads in Florida, and building rules to match. Nothing recovered off an old roof goes back on a new one here. Access and staging on a narrow island lot is half the job, and we quote the Keys accordingly.",
  },
  {
    name: "Nassau",
    slug: "nassau-county",
    detail: "Nassau permits through the county at Fernandina Beach or through the City of Fernandina Beach. Three providers cover different parts of the county, so the interconnection question comes before anything else. Amelia Island is full salt exposure with historic districts that review what is visible from the street; the western half toward Callahan and Hilliard is rural pine country on cooperative power. Two genuinely different jobs inside one small county, and worth being clear about which one your address is.",
    seen: "Nassau calls are Amelia Island salt on one side and ordinary suburban shingle on the other, with three different providers depending on the address.",
    seat: "Fernandina Beach",
    region: "Northeast Florida",
    tier: 2,
    utility: "FPL, JEA and Okefenokee REMC",
    coastal: true,
    towns: ["Fernandina Beach", "Yulee", "Callahan", "Amelia Island"],
    blurb:
      "Nassau County is the top-right corner of Florida, with Amelia Island on one side and rural pine country on the other. Three different providers cover it depending on the address. Island properties get the full salt-air inspection; the inland half is ordinary suburban shingle work.",
  },
  {
    name: "Okaloosa",
    slug: "okaloosa-county",
    detail: "Okaloosa permits through the county at Crestview or through Destin, Fort Walton Beach and Niceville. The county splits between a dense beach resort economy along the coast and a large military and commuter community inland around Eglin and Crestview. Coastal condos and beach houses take a hammering from salt and the hardware shows it within a few years. The inland half is ordinary suburban shingle work. Far west of our base, so this gets planned in blocks with Santa Rosa and Escambia rather than as a single call-out.",
    seen: "Okaloosa splits between beach resort property taking a hammering from salt and a large inland military community with straightforward roofs.",
    seat: "Crestview",
    region: "Panhandle",
    tier: 2,
    utility: "FPL, Choctawhatchee Electric and Gulf Power territory",
    coastal: true,
    towns: ["Crestview", "Fort Walton Beach", "Destin", "Niceville"],
    blurb:
      "Okaloosa County splits between beach resort property at Destin and Fort Walton and a large inland military community around Crestview and Eglin. Beach-side condos and houses take a hammering from salt; the inland half is straightforward. Long drive, planned in blocks.",
  },
  {
    name: "Okeechobee",
    slug: "okeechobee-county",
    detail: "Okeechobee permits through the county or the City of Okeechobee. It sits on the north rim of the lake, inland and agricultural, and the useful thing about it is proximity: it is genuinely close to the Treasure Coast end of our home route, so response here is better than most travel counties. The work leans toward ranch buildings, agricultural structures and ground-mounted systems rather than suburban rooftop arrays, with cooperative and FPL territory both in play depending on the address.",
    seen: "Okeechobee sits close enough to our Treasure Coast route that response is better than most travel counties. Ranch buildings feature more than suburban roofs.",
    seat: "Okeechobee",
    region: "Treasure Coast",
    tier: 2,
    utility: "FPL and Glades Electric Cooperative",
    towns: ["Okeechobee"],
    blurb:
      "Okeechobee sits on the north rim of the lake, inland and agricultural, and it is genuinely close to our Treasure Coast route. Response here is better than most Tier 2 counties for that reason. Ranch buildings and ground mounts feature more than suburban rooftops.",
  },
  {
    name: "Pasco",
    slug: "pasco-county",
    detail: "Pasco permits through the county at Dade City and New Port Richey, with Zephyrhills and Dade City running their own. Two different housing stories again: Wesley Chapel and Land O' Lakes are among the fastest-growing places in Florida with newer roofs and recent solar, while the older Gulf side around New Port Richey and Hudson is modest 1970s single-storey housing where a great many roofs are overdue. Both are straightforward to work on for opposite reasons, and the coastal side adds a salt inspection.",
    seen: "Pasco calls are newer roofs around Wesley Chapel and overdue ones around New Port Richey. Both are easy to work on, for opposite reasons.",
    seat: "Dade City",
    region: "Tampa Bay",
    tier: 2,
    utility: "Duke Energy and Withlacoochee River Electric",
    coastal: true,
    towns: ["New Port Richey", "Wesley Chapel", "Land O' Lakes", "Dade City", "Zephyrhills"],
    blurb:
      "Pasco County has been one of the fastest-growing places in Florida, so Wesley Chapel and Land O' Lakes are full of newer roofs with recent solar. The older coastal side around New Port Richey is the opposite: modest single-storey homes, many overdue a roof. Both are easy to work on for different reasons.",
  },
  {
    name: "Pinellas",
    slug: "pinellas-county",
    detail: "Pinellas permits through the county or through St. Petersburg, Clearwater, Largo and a dozen more. It is the most densely populated county in Florida and it is a peninsula, so almost every address carries coastal exposure. The defining practical problem here is space: lots are small, driveways are short, and finding somewhere safe to store an array for the duration of a roof job is a real planning question rather than an afterthought. We settle that before the day rather than on it.",
    seen: "Pinellas calls always come with a staging question: tight lots, nowhere obvious to store panels, and coastal exposure on nearly every address.",
    seat: "Clearwater",
    region: "Tampa Bay",
    tier: 2,
    utility: "Duke Energy",
    coastal: true,
    towns: ["St. Petersburg", "Clearwater", "Largo", "Palm Harbor", "Dunedin"],
    blurb:
      "Pinellas is the most densely populated county in Florida and it is a peninsula, so almost everything here is coastal exposure. Lots are tight, which makes staging a detach and finding somewhere safe to store panels a real planning question rather than an afterthought. Big enough market to batch several jobs in a trip.",
  },
  {
    name: "Polk",
    slug: "polk-county",
    detail: "Polk permits through the county at Bartow or through Lakeland, Winter Haven and Haines City. Lakeland Electric is a municipal utility serving a large slice of the county while the rest is on Duke or Tampa Electric, so the interconnection route depends entirely on the address. The growth corridor around Davenport, Haines City and Four Corners has gone up fast with solar included from the builder, producing whole subdivisions of near-identical roofs and arrays. Once we have quoted one of those, the next twenty are quick.",
    seen: "Polk calls cluster around Davenport and Haines City where whole subdivisions went up with solar included. Lakeland's own utility changes the paperwork on some addresses.",
    seat: "Bartow",
    region: "Central Florida",
    tier: 2,
    utility: "Duke Energy, Lakeland Electric and TECO",
    towns: ["Lakeland", "Winter Haven", "Bartow", "Haines City", "Davenport"],
    blurb:
      "Polk County sits between Tampa and Orlando and has grown hard on both ends, especially around Davenport and Haines City where whole subdivisions went up with solar included. Lakeland runs its own municipal utility while the rest of the county does not, so the interconnection route depends on the address.",
  },
  {
    name: "Putnam",
    slug: "putnam-county",
    detail: "Putnam permits through the county at Palatka. Three providers cover different parts of it. This is St. Johns River country: older housing, a lot of it on wooded lots, and heavy canopy means shade is worth ruling out before anyone quotes a repair on an underproducing system. The housing stock is older than most of Florida, so what is under an array once it comes off is a genuine question rather than a formality. Covered as part of a run through Clay or Alachua.",
    seen: "Putnam calls are older river housing with heavy tree cover, so shade gets ruled out before anyone quotes a repair.",
    seat: "Palatka",
    region: "Northeast Florida",
    tier: 2,
    utility: "Clay Electric Cooperative, Duke Energy and FPL",
    towns: ["Palatka", "Interlachen", "Crescent City"],
    blurb:
      "Putnam County is river country along the St. Johns, rural and older, with a mix of three providers depending on where you stand. Tree cover is heavy, so shade is worth ruling out before anyone quotes a repair on an underproducing system. Batched with Clay or Alachua runs.",
  },
  {
    name: "St. Johns",
    slug: "st-johns-county",
    detail: "St. Johns permits through the county at St. Augustine or through the City of St. Augustine and St. Augustine Beach, and the historic districts review anything visible from the street. This is one of the wealthiest and fastest-growing counties in Florida: Nocatee and Ponte Vedra are full of newer homes with solar, on clean modern roof planes. Historic St. Augustine is the opposite in every respect, slow going on any roof for good reason. Coastal salt applies across most of the county and three utilities split the map.",
    seen: "St. Johns calls are newer homes at Nocatee and Ponte Vedra, plus the opposite extreme in historic St. Augustine where every roof is slow going.",
    seat: "St. Augustine",
    region: "Northeast Florida",
    tier: 2,
    utility: "FPL, JEA and Clay Electric",
    coastal: true,
    towns: ["St. Augustine", "Ponte Vedra Beach", "St. Augustine Beach", "Nocatee"],
    blurb:
      "St. Johns County is one of the wealthiest and fastest-growing in the state, and places like Nocatee and Ponte Vedra are full of newer homes with solar on them. Historic St. Augustine is the other extreme: old, protected, and slow going on any roof. Coastal salt applies to most of it.",
  },
  {
    name: "Santa Rosa",
    slug: "santa-rosa-county",
    detail: "Santa Rosa permits through the county at Milton, with Gulf Breeze and Jay handling their own. The county runs from a busy Gulf shoreline at Navarre and Gulf Breeze up into rural pine country around Milton and Jay. The beach half sees serious salt and wind exposure with hardware ageing to match; the north half is ordinary suburban and rural work on cooperative power. Like the rest of the western Panhandle, this is a planned trip batched with Escambia and Okaloosa rather than a same-week call-out.",
    seen: "Santa Rosa splits between Gulf Breeze and Navarre salt exposure and rural work up around Milton. Far west, planned in blocks.",
    seat: "Milton",
    region: "Panhandle",
    tier: 2,
    utility: "FPL, Gulf Power territory and Escambia River Electric",
    coastal: true,
    towns: ["Milton", "Navarre", "Gulf Breeze", "Pace"],
    blurb:
      "Santa Rosa County runs from a busy Gulf shoreline at Navarre and Gulf Breeze up into rural pine country around Milton. The beach half sees serious salt and wind; the north half is ordinary suburban and rural work. Far west, planned in blocks with Escambia.",
  },
  {
    name: "Sarasota",
    slug: "sarasota-county",
    detail: "Sarasota permits through the county or through Sarasota, Venice and North Port. There is a strong design culture here, and in much of the county how an array looks going back matters nearly as much as how it performs, so we agree the reinstall layout in writing before anything comes down. North Port grew explosively and then took heavy damage from Ian, which left a crop of rushed reinstalls behind it. Siesta Key and the barrier islands are the full corrosion and wind specification.",
    seen: "Sarasota calls care as much about how the array looks going back as how it performs. North Port adds rushed storm reinstalls to the mix.",
    seat: "Sarasota",
    region: "Southwest Florida",
    tier: 2,
    utility: "FPL",
    coastal: true,
    towns: ["Sarasota", "Venice", "North Port", "Siesta Key", "Osprey"],
    blurb:
      "Sarasota County is tile-heavy with a strong design culture, so how an array looks when it goes back matters here as much as how it performs. North Port grew fast and took heavy storm damage, which left a lot of rushed reinstalls behind it. The keys and barrier islands are the full corrosion specification.",
  },
  {
    name: "Sumter",
    slug: "sumter-county",
    detail: "Sumter permits through the county at Bushnell and through Wildwood, and a very large share of the population lives in The Villages, which adds its own architectural approval on top. The practical effect is unusual and genuinely useful: thousands of near-identical single-storey homes on similar roofs with similar arrays. Once we have quoted and completed one, the next is fast, and batching several jobs into a single day here is normal rather than exceptional. That efficiency shows up in the price.",
    seen: "The Villages means near-identical single-storey homes, so once we have quoted one the next is fast and batching several in a day is normal.",
    seat: "Bushnell",
    region: "Central Florida",
    tier: 2,
    utility: "SECO Energy and Duke Energy",
    towns: ["The Villages", "Bushnell", "Wildwood"],
    blurb:
      "Sumter County is dominated by The Villages, which means an enormous number of near-identical single-storey homes, many with solar, all on similar roofs. That consistency is genuinely useful: once we have quoted one, quoting the next is fast, and batching several in a day is normal here.",
  },
  {
    name: "Suwannee",
    slug: "suwannee-county",
    detail: "Suwannee permits through the county at Live Oak. Power is largely cooperative and interconnection follows co-op rules. This is river country: agricultural acreage, farm buildings, and a good deal of metal roofing alongside conventional housing. Ground-mounted arrays are as common as rooftop ones and they are quoted differently, usually more simply. Distance means this is scheduled work batched with anything else we have running through North Central Florida rather than a standalone trip.",
    seen: "Suwannee calls are ground mounts and metal roofs on river-country acreage, both quoted differently from a shingle house.",
    seat: "Live Oak",
    region: "North Central Florida",
    tier: 2,
    utility: "Suwannee Valley Electric Cooperative and Duke Energy",
    towns: ["Live Oak", "Branford", "Wellborn"],
    blurb:
      "Suwannee County is rural North Florida on the river, cooperative-served, with farm buildings and acreage rather than subdivisions. Ground mounts and metal roofs feature heavily and both are quoted differently from a shingle house. Scheduled work.",
  },
  {
    name: "Taylor",
    slug: "taylor-county",
    detail: "Taylor permits through the county at Perry. This is Big Bend coastline and timber country, and it has taken repeated direct hurricane landfalls in recent years, which has shaped both the roof stock and the appetite for anything that penetrates a roof. Coastal property at Steinhatchee and Keaton Beach is largely raised stilt construction, which changes staging, working height and fall protection entirely. Long haul from our base, cooperative interconnection, and planned trips only.",
    seen: "Taylor County has taken repeated direct hurricane hits and much of the coast is raised stilt construction, which changes how a crew works a roof entirely.",
    seat: "Perry",
    region: "Nature Coast",
    tier: 2,
    utility: "Tri-County Electric Cooperative and Duke Energy",
    coastal: true,
    towns: ["Perry", "Steinhatchee", "Keaton Beach"],
    blurb:
      "Taylor County is Big Bend coastline and timber country, and it has taken repeated direct hurricane hits in recent years. Coastal properties are largely raised stilt construction, which changes everything about how a crew works a roof. Long haul, planned trips only.",
  },
  {
    name: "Union",
    slug: "union-county",
    detail: "Union permits through the county at Lake Butler and is the smallest county in Florida by land area. Power is cooperative. Solar here is sparse and mostly on farm property and outbuildings rather than suburban roofs, so ground mounts and metal roofing feature more than shingle. Co-op interconnection paperwork sets the schedule. It is genuinely a scheduled trip, normally batched with Bradford or Alachua, and we would rather say that than imply a crew nearby.",
    seen: "Union calls are sparse and cooperative-interconnected on farm property. Batched with Bradford or Alachua runs.",
    seat: "Lake Butler",
    region: "North Central Florida",
    tier: 2,
    utility: "Clay Electric Cooperative and Duke Energy",
    towns: ["Lake Butler", "Raiford", "Worthington Springs"],
    blurb:
      "Union County is the smallest county in Florida by land area and almost entirely rural. Solar here is sparse and mostly cooperative-interconnected on farm property. Genuinely a scheduled trip, batched with Bradford or Alachua.",
  },
  {
    name: "Volusia",
    slug: "volusia-county",
    detail: "Volusia permits through the county at DeLand or through Daytona Beach, Ormond Beach, New Smyrna Beach, Port Orange and Deltona. It borders the north end of our home route, so response here is meaningfully quicker than most travel counties. Deltona is a huge stock of similar single-storey homes built in waves, which quotes fast. The beach side from Ormond down through New Smyrna is older, fully exposed housing where hardware corrodes early and mounts get looked at hard before anything goes back on.",
    seen: "Volusia borders our home route so response is quicker than most travel counties. Deltona is uniform housing; the beach side is older and harder on hardware.",
    seat: "DeLand",
    region: "Space Coast",
    tier: 2,
    utility: "FPL and Duke Energy",
    coastal: true,
    towns: ["Daytona Beach", "DeLand", "Ormond Beach", "New Smyrna Beach", "Deltona"],
    blurb:
      "Volusia County borders our home route at the north end, so response here is quicker than most of Tier 2. Deltona is a huge stock of similar single-storey homes; the beach side from Ormond down to New Smyrna is older, exposed and hard on hardware. Both are regular work for us.",
  },
  {
    name: "Wakulla",
    slug: "wakulla-county",
    detail: "Wakulla permits through the county at Crawfordville and power is largely cooperative. It is coastal Big Bend immediately south of Tallahassee and increasingly a commuter county, so newer subdivision housing sits alongside low-lying coastal property at St. Marks and Panacea. The coastal side is raised construction on flood-prone ground, which affects staging and where an array can safely be stored during a roof job. Batched with a Leon trip when we make the run.",
    seen: "Wakulla calls are low-lying coastal property with raised construction and careful staging, usually batched with a Tallahassee trip.",
    seat: "Crawfordville",
    region: "Panhandle",
    tier: 2,
    utility: "Talquin Electric Cooperative and Duke Energy",
    coastal: true,
    towns: ["Crawfordville", "St. Marks", "Panacea"],
    blurb:
      "Wakulla County is coastal Big Bend just south of Tallahassee, largely cooperative-served and increasingly a commuter county. Low-lying coastal property means raised construction and careful staging. Batched with Leon when we make the trip.",
  },
  {
    name: "Walton",
    slug: "walton-county",
    detail: "Walton permits through the county at DeFuniak Springs and Santa Rosa Beach, and the 30A corridor adds architectural review that is stricter than most of Florida. That stretch of coast holds some of the most valuable property in the state, much of it with standing-seam metal roofs and design rules about anything visible. Metal attachment hardware and design approval are both in play on the coast. Inland Walton around DeFuniak Springs and Freeport is a completely different, rural job on cooperative power.",
    seen: "Walton calls along 30A are metal roofs, high specification and design review. Inland Walton is a completely different, rural job.",
    seat: "DeFuniak Springs",
    region: "Panhandle",
    tier: 2,
    utility: "FPL, Choctawhatchee Electric and West Florida Electric",
    coastal: true,
    towns: ["Santa Rosa Beach", "DeFuniak Springs", "Freeport", "Miramar Beach"],
    blurb:
      "Walton County has one of the most valuable stretches of coastline in Florida along 30A, full of high-specification homes with metal roofs and strict design rules. Metal attachment hardware and design review are both in play here. Inland Walton around DeFuniak Springs is a completely different, rural job.",
  },
  {
    name: "Washington",
    slug: "washington-county",
    detail: "Washington permits through the county at Chipley. Power is largely cooperative. Hurricane Michael did serious damage here well away from the coast, and the rebuild means a good share of the roof stock is newer and stronger than the age of the neighbourhoods suggests. Those decks take attachments well. Metal roofing is common on agricultural buildings and needs its own hardware. Long drive, planned work, and honest scheduling rather than a promise we would have to break.",
    seen: "Washington calls are inland Michael rebuilds. Newer roofs than the neighbourhood age suggests, long drive, honest scheduling.",
    seat: "Chipley",
    region: "Panhandle",
    tier: 2,
    utility: "West Florida Electric Cooperative and FPL",
    towns: ["Chipley", "Vernon", "Wausau"],
    blurb:
      "Washington County is inland Panhandle, rural and cooperative-served, and it was hit hard by Hurricane Michael well away from the coast. Rebuilt roofs are newer and better than the neighbourhood age suggests. Long drive, planned work, honest scheduling.",
  },
];

export const FL_COUNTY_BY_SLUG: Record<string, FlCounty> = Object.fromEntries(
  FL_COUNTIES.map((c) => [c.slug, c]),
);

export const REGIONS: Region[] = [
  "Central Florida",
  "Space Coast",
  "Treasure Coast",
  "South Florida",
  "Southwest Florida",
  "Tampa Bay",
  "Nature Coast",
  "North Central Florida",
  "Northeast Florida",
  "Panhandle",
  "Florida Keys",
];

export function countiesInRegion(region: Region): FlCounty[] {
  return FL_COUNTIES.filter((c) => c.region === region);
}

/** Counties near this one: same region first, then the rest of the tier. */
export function nearbyCounties(c: FlCounty, n = 8): FlCounty[] {
  const same = countiesInRegion(c.region).filter((x) => x.slug !== c.slug);
  const rest = FL_COUNTIES.filter((x) => x.region !== c.region && x.tier === c.tier);
  return [...same, ...rest].slice(0, n);
}

/**
 * One written paragraph per region, shown on every county page in it.
 *
 * Sixty-seven pages off one template share too much boilerplate, and the
 * county blurb alone is not enough to carry them apart. Eleven regional
 * paragraphs plus the per-county blurb is what gets each page over the line.
 * Same rule as the blurbs: written once, by hand, never generated.
 */
export const REGION_NOTES: Record<Region, string> = {
  "Central Florida":
    "Central Florida is where the state's solar boom hit suburban tract housing hardest. Whole subdivisions went up between 2015 and 2022 with panels included in the mortgage, sold by dealer networks that no longer exist. The roofs are young, the arrays are young, and the failures we find are almost never the panels: they are inverters, optimizers and attachments that were never torqued properly by a crew that was paid by the install.",
  "Space Coast":
    "The Space Coast has been putting solar on roofs longer than most of Florida, so Brevard and Volusia hold a genuinely old installed base alongside new construction. Salt reaches well inland along this stretch of coast, further than homeowners expect, and it attacks the cheap parts first: clamps, grounding lugs and rail splices. A twelve-year-old array here is usually structurally fine and electrically tired.",
  "Treasure Coast":
    "The Treasure Coast takes hurricanes head on, which means insurance-driven roof replacement runs constantly here whether the roof needed it or not. A lot of what we detach and reset on this stretch is barely-used equipment coming off a roof that was replaced because an underwriter said so. That is easy work done carefully, and it is the bulk of what we do between Vero Beach and Stuart.",
  "South Florida":
    "South Florida is the strictest place in the state to put anything back on a roof. Miami-Dade and Broward sit inside the High-Velocity Hurricane Zone, so attachments need documented product approval and the reinstall is genuinely inspected rather than waved through. Add barrel tile, dense association rules and salt on three sides, and the gap between a proper reset and a rushed one shows up fast.",
  "Southwest Florida":
    "Southwest Florida is still working through Hurricane Ian. The volume of roof replacement across Lee, Charlotte and Sarasota since has been unlike anything else in the state, and a great many arrays came off in a hurry and went back on with whoever was available that week. Loose clamps, reused mounts and unflashed penetrations from that period are what we are called out to now, usually when a ceiling starts staining.",
  "Tampa Bay":
    "Tampa Bay has the second-largest concentration of residential solar in Florida and three different utilities carving up the map, so the first question on any reinstall here is who actually holds the interconnection. Lots on the Pinellas side are tight, which makes staging a detach and finding somewhere safe to store panels a real planning problem rather than an afterthought.",
  "Nature Coast":
    "The Nature Coast is low-density Gulf shoreline and retirement housing, which is the gentlest work in the state: single-storey, walkable pitch, short carries, modest systems. Quotes here routinely come in under what people expect from national price guides. The catch is distance between jobs, so this is country we cover in batches rather than one call at a time.",
  "North Central Florida":
    "North Central Florida is cooperative country. Most homes here buy power from a rural electric co-op rather than a big investor utility, and co-op interconnection rules move at their own pace, so a reinstall is planned around the paperwork as much as the roof. Ground mounts on acreage are as common as rooftop arrays, and they are a different, usually easier, job.",
  "Northeast Florida":
    "Northeast Florida runs on municipal power around Jacksonville and cooperatives everywhere else, so the reconnection route changes depending on which side of a county line the house sits. There is a large installed base here and a genuine shortage of companies willing to take over somebody else's array, which is most of why we get called this far north.",
  Panhandle:
    "The Panhandle is still rebuilding from Hurricane Michael, which means an unusual amount of the roof stock is newer and built to a tougher standard than the age of the neighbourhoods suggests. Those roofs take attachments well. Metal roofing is far more common here than in peninsular Florida, and metal needs completely different hardware from shingle. This is our longest drive in the state and it is booked well ahead.",
  "Florida Keys":
    "The Keys are the harshest environment for solar hardware anywhere in Florida: salt on every side, the highest wind design loads in the state, and building rules written to match. Nothing recovered off an old roof goes back onto a new one down here. Access and staging on a narrow island lot is genuinely half the job, and any honest quote for the Keys says so up front.",
};
