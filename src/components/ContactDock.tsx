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
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
    <path d="M17.5 14.4c-.3-.2-1.8-.9-2-1s-.5-.2-.7.1-.8 1-.9 1.2-.3.2-.6.1a8 8 0 0 1-2.4-1.5 9 9 0 0 1-1.6-2c-.2-.4 0-.5.1-.7l.5-.6.3-.5v-.5l-1-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.4-1.1 1.2-1.1 2.8s1.2 3.3 1.3 3.5 2.3 3.6 5.6 5c3.3 1.3 3.3.9 3.9.8s1.8-.7 2-1.4.3-1.3.2-1.5zM12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2z" />
  </svg>
);
export const FacebookIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.5-1.5h1.4V5c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8V11H8v3h2.5v7h3z" />
  </svg>
);

/**
 * Thumb-reach contact bar, phones and tablets only. Four ways to reach
 * Artem, each with the message already typed. Call lives in the header
 * and the hero so the bar stays four wide and readable on a phone.
 */
export function ContactDock() {
  const cell =
    "flex flex-1 flex-col items-center justify-center gap-1.5 py-3 text-[12px] font-bold tracking-wide transition hover:brightness-110 active:brightness-90 sm:text-[13px]";
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
        {links.hasPhone && (
          <a
            href={links.whatsapp}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackEvent("whatsapp_click", { channel: "whatsapp", label: "dock" })}
            className={`${cell} bg-[#25D366] text-navy-deep`}
          >
            <WhatsAppIcon />
            WhatsApp
          </a>
        )}
        <a
          href={links.email}
          onClick={() => trackEvent("email_click", { channel: "email", label: "dock" })}
          className={`${cell} ${links.hasPhone ? "border-l border-white/10" : "bg-orange text-navy-deep"}`}
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
