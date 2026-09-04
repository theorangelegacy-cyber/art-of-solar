import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { CITIES, SERVICES, SITE_URL } from "@/data/seo";
import { RESCUES } from "@/data/rescues";
import { FL_COUNTIES } from "@/data/florida";

interface SitemapEntry {
  path: string;
  changefreq?: "daily" | "weekly" | "monthly" | "yearly";
  priority?: string;
}

/**
 * The day the site was built, baked in by vite.config.ts at build time.
 * It used to be "today" on every request, which told Google every page changed
 * every single day. Google says it ignores lastmod once it catches that.
 * Never read the clock here instead: the worker freezes the clock outside a
 * request and the sitemap came out stamped 1970-01-01.
 */
declare const __BUILD_DATE__: string;
const DEPLOYED = __BUILD_DATE__;

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const lastmod = DEPLOYED;

        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/contact", changefreq: "monthly", priority: "0.9" },
          { path: "/services", changefreq: "monthly", priority: "0.9" },
          { path: "/service-areas", changefreq: "monthly", priority: "0.9" },
          { path: "/about", changefreq: "monthly", priority: "0.6" },
          ...SERVICES.map((s) => ({
            path: `/services/${s.slug}`,
            changefreq: "monthly" as const,
            priority: "0.9",
          })),
          { path: "/counties", changefreq: "monthly" as const, priority: "0.9" },
          ...FL_COUNTIES.map((c) => ({
            path: `/counties/${c.slug}`,
            changefreq: "monthly" as const,
            priority: c.tier === 1 ? "0.85" : "0.7",
          })),
          { path: "/solar-panel-repair", changefreq: "monthly" as const, priority: "0.95" },
          { path: "/solar-panel-removal-cost", changefreq: "monthly" as const, priority: "0.95" },
          { path: "/solar-detach-and-reset", changefreq: "monthly" as const, priority: "0.95" },
          { path: "/florida-solar-permit-law", changefreq: "monthly" as const, priority: "0.9" },
          { path: "/solar-company-out-of-business", changefreq: "monthly" as const, priority: "0.9" },
          ...RESCUES.map((r) => ({
            path: `/solar-company-out-of-business/${r.slug}`,
            changefreq: "monthly" as const,
            priority: "0.8",
          })),
          ...CITIES.map((c) => ({
            path: `/service-areas/${c.slug}`,
            changefreq: "monthly" as const,
            priority: "0.8",
          })),
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${SITE_URL}${e.path}</loc>`,
            `    <lastmod>${lastmod}</lastmod>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
