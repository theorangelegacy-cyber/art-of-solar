import { createFileRoute } from "@tanstack/react-router";
import { ContactDock, links } from "@/components/ContactDock";
import { PageHero, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { BRAND, SITE_URL } from "@/data/seo";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: `Privacy Policy | ${BRAND}` },
      {
        name: "description",
        content: `How ${BRAND} handles the information you send through this website.`,
      },
      { name: "robots", content: "noindex, follow" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/privacy-policy` }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <PageHero eyebrow="Legal" title="Privacy policy" crumbs={[{ name: "Privacy policy", to: "/privacy-policy" }]} />
      <section className="container-x max-w-3xl py-12 text-base text-muted-foreground sm:py-16">
        <p>
          This page explains what {BRAND} collects when you use this website and what we do with
          it. Short version: we only collect what we need to reply to you about your solar system.
        </p>
        <h2 className="mt-8 text-xl font-extrabold text-navy">What we collect</h2>
        <p className="mt-2">
          When you send a quote request we receive the name, phone number, email, city, service and
          details you type in. We also record which page the request came from, the address of the
          site that referred you (if any), any advertising tags in the link you used, and a
          general description of your browser so we can tell a phone from a laptop.
        </p>
        <p className="mt-2">
          We count page views and taps on the quote, call, text and email buttons so we know which
          pages are useful. That count is not tied to your name unless you send a form.
        </p>
        <h2 className="mt-8 text-xl font-extrabold text-navy">What we do with it</h2>
        <p className="mt-2">
          We use it to reply to you, to prepare a quote, and to do the work you ask for. We do not
          sell it, rent it, or share it with anyone except the people who need it to do your job,
          such as a roofer you have already booked.
        </p>
        <h2 className="mt-8 text-xl font-extrabold text-navy">Cookies and storage</h2>
        <p className="mt-2">
          The site stores a random id in your browser for the length of your visit so repeated taps
          from one person are not counted as several people. It is deleted when you close the tab.
          No advertising cookies are set by this site.
        </p>
        <h2 className="mt-8 text-xl font-extrabold text-navy">Your choices</h2>
        <p className="mt-2">
          Email{" "}
          <a href={links.email} className="font-semibold text-navy underline">
            {links.emailDisplay}
          </a>{" "}
          to ask what we hold about you or to have it deleted.
        </p>
        <p className="mt-8 text-sm">Last updated September 2026.</p>
      </section>
      <SiteFooter />
      <ContactDock />
    </div>
  );
}
