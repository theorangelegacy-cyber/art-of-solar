/**
 * Every picture on the site, in one place. All of these are Art of Solar's
 * own job photos from the Facebook page, re-encoded by scripts/photos.mjs
 * from the originals in public/img/fb. No stock photos anywhere.
 */
export const IMG = {
  hero: "/img/hero.webp",
  rerack: "/img/rerack.webp",
  orphan: "/img/orphan.webp",
  leak: "/img/leak.webp",
  inspect: "/img/inspect.webp",
  storm: "/img/storm.webp",
  newInstall: "/img/new-install.webp",
  crew: "/img/crew.webp",
  logoPhoto: "/img/logo-photo.webp",
  before: "/img/before.webp",
  after: "/img/after.webp",
  /** Social share card, 1200 x 630. */
  og: "/img/og.png",
};

export const GALLERY: { src: string; alt: string }[] = [
  { src: "/img/g1.webp", alt: "Solar array reinstalled on a terracotta tile roof in South Florida" },
  { src: "/img/g2.webp", alt: "Rooftop solar panels re-racked on a tile roof with palm trees behind" },
  { src: "/img/g3.webp", alt: "Solar panels set on new mounts on a shingle roof" },
  { src: "/img/g4.webp", alt: "Drone view of a solar array on a barrel tile roof" },
  { src: "/img/g5.webp", alt: "Solar panels on a flat tile roof after a re-roof" },
  { src: "/img/g6.webp", alt: "Solar array wrapped around a hip roof after reinstall" },
  { src: "/img/g7.webp", alt: "Rows of solar panels on a tile roof after a re-rack" },
  { src: "/img/g8.webp", alt: "Solar panels reinstalled on a new shingle roof, aerial view" },
  { src: "/img/g9.webp", alt: "Solar array on a tile roof next to a pool" },
  { src: "/img/g10.webp", alt: "Solar panels along a roof ridge with a view of the neighborhood" },
];

/**
 * Photos that are narrower than 1024 to begin with, so no -1024 copy exists.
 * Never list an image here that has one: the browser would fetch a 404.
 */
const NO_1024 = new Set(["/img/logo-photo.webp"]);

/**
 * Offer a phone-sized and a tablet-sized copy of a photo alongside the full one.
 *
 * The site used to hand every visitor the same 1400 to 1800 pixel file, phone
 * included. scripts/resize.mjs writes the -640 and -1024 copies; this tells the
 * browser they exist so it can pick the small one. Roughly 2.9 MB saved on a
 * phone across the whole set.
 */
export function srcSet(src: string): string {
  if (!src.endsWith(".webp")) return "";
  const base = src.slice(0, -".webp".length);
  const parts = [`${base}-640.webp 640w`];
  if (!NO_1024.has(src)) parts.push(`${base}-1024.webp 1024w`);
  parts.push(`${src} 1800w`);
  return parts.join(", ");
}

/** One card in a grid: full width on a phone, half on a tablet, a third on a laptop. */
export const CARD_SIZES = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw";
/** Something that spans the page. */
export const FULL_SIZES = "100vw";
