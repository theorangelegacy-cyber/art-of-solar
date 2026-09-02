import { BUSINESS, FACEBOOK_URL } from "@/data/seo";
import { trackEvent } from "@/lib/leads";

/** The message every contact button starts with. JP wrote it. */
export const MSG =
  "Hey, I was on your website. I need some help with my solar system. What are the next steps to get a quote?";

const digits = BUSINESS.phone.replace(/\D/g, "");
const msg = encodeURIComponent(MSG);

export const links = {
  hasPhone: digits.length >= 10,
  call: digits ? `tel:+${digits}` : "",
  sms: digits ? `sms:+${digits}?&body=${msg}` : "",
  whatsapp: digits ? `https://wa.me/${digits}?text=${msg}` : "",
  email: `mailto:${BUSINESS.email}?subject=${encodeURIComponent("Solar quote request")}&body=${msg}`,
  emailDisplay: BUSINESS.email,
  phoneDisplay: BUSINESS.phoneDisplay,
  facebook: FACEBOOK_URL,
  facebookMessage: `https://m.me/ArtofSolarEnergy?text=${msg}`,
};

const TextIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.6 8.6 0 0 1-3.9-.9L3 21l2-4.6A8.4 8.4 0 0 1 3 11.5a8.4 8.4 0 0 1 9-8.4 8.4 8.4 0 0 1 9 8.4z" />
    <path d="M8 11h.01M12 11h.01M16 11h.01" />
  </svg>
);
const MailIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);
export const FacebookIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.5-1.5h1.4V5c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8V11H8v3h2.5v7h3z" />
  </svg>
);

/**
 * Thumb-reach contact bar, phones and tablets only. Three ways to reach
 * Artem, each with the message already typed. Text needs the phone number
 * in src/data/seo.ts; until it is there the bar shows Email and Facebook.
 */
export function ContactDock() {
  const cell =
    "flex flex-1 flex-col items-center justify-center gap-1.5 py-3 text-[13px] font-bold tracking-wide transition hover:brightness-110 active:brightness-90";
  return (
    <>
      <div aria-hidden className="h-[72px] lg:hidden" />
      <nav
        aria-label="Message Art of Solar"
        className="fixed inset-x-0 bottom-0 z-50 flex border-t-2 border-orange bg-navy-deep text-white shadow-[0_-8px_24px_rgba(0,0,0,0.25)] [padding-bottom:env(safe-area-inset-bottom)] lg:hidden"
      >
        {links.hasPhone && (
          <a
            href={links.sms}
            onClick={() => trackEvent("text_click", { channel: "text", label: "dock" })}
            className={`${cell} bg-orange text-navy-deep`}
          >
            <TextIcon />
            Text
          </a>
        )}
        <a
          href={links.email}
          onClick={() => trackEvent("email_click", { channel: "email", label: "dock" })}
          className={`${cell} ${links.hasPhone ? "" : "bg-orange text-navy-deep"}`}
        >
          <MailIcon />
          Email
        </a>
        <a
          href={links.facebookMessage}
          target="_blank"
          rel="noreferrer"
          onClick={() => trackEvent("whatsapp_click", { channel: "facebook", label: "dock" })}
          className={`${cell} border-l border-white/10`}
        >
          <FacebookIcon />
          Facebook
        </a>
      </nav>
    </>
  );
}
