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
