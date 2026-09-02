import { BRAND, BUSINESS, CITIES, COUNTIES, OWNER, SERVICES, SITE_URL } from "./seo";
import { IMG } from "./images";

/** Turn a site-relative path into a full https:// address. */
export function abs(path: string): string {
  if (!path) return SITE_URL;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}

const AREA_SERVED = [
  ...COUNTIES.map((k) => ({ "@type": "AdministrativeArea", name: `${k.name} County, FL` })),
  ...CITIES.map((c) => ({ "@type": "City", name: `${c.name}, FL` })),
];

/** The company itself. Referenced by @id from every other block. */
export const ORGANIZATION_ID = `${SITE_URL}/#business`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["HomeAndConstructionBusiness", "LocalBusiness"],
    "@id": ORGANIZATION_ID,
    name: BRAND,
    url: SITE_URL,
    logo: BUSINESS.logo,
    image: abs(IMG.og),
    ...(BUSINESS.phone ? { telephone: BUSINESS.phone } : {}),
    email: BUSINESS.email,
    priceRange: BUSINESS.priceRange,
    description: BUSINESS.description,
    founder: { "@type": "Person", name: OWNER },
    foundingDate: BUSINESS.foundingYear,
    sameAs: [BUSINESS.facebook],
    address: {
      "@type": "PostalAddress",
      addressLocality: BUSINESS.locality,
      postalCode: BUSINESS.postalCode,
      addressRegion: BUSINESS.region,
      addressCountry: BUSINESS.country,
    },
    areaServed: AREA_SERVED,
    knowsAbout: [
      "Solar panel removal and reinstall",
      "Solar detach and reset for roof replacement",
      "Solar re-racking",
      "Orphaned solar system repair",
      "Solar roof leak repair",
      "Solar system inspection",
      "Hurricane damage solar repair",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Solar re-rack and service",
      itemListElement: SERVICES.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.name,
          description: s.short,
          url: `${SITE_URL}/services/${s.slug}`,
        },
      })),
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: BRAND,
    publisher: { "@id": ORGANIZATION_ID },
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${SITE_URL}${t.path}`,
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** A single service, optionally pinned to one city. */
export function serviceSchema(opts: {
  name: string;
  description: string;
  url: string;
  image?: string;
  cityName?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: opts.name,
    name: opts.cityName ? `${opts.name} in ${opts.cityName}, FL` : opts.name,
    description: opts.description,
    url: opts.url,
    ...(opts.image ? { image: abs(opts.image) } : {}),
    provider: { "@id": ORGANIZATION_ID },
    areaServed: opts.cityName ? { "@type": "City", name: `${opts.cityName}, FL` } : AREA_SERVED,
  };
}

/** Build the <script> entries TanStack head() expects. */
export function ld(...blocks: unknown[]) {
  return blocks.map((b) => ({
    type: "application/ld+json",
    children: JSON.stringify(b),
  }));
}
