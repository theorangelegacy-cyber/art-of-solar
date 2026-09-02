import { Link } from "@tanstack/react-router";
import { BUSINESS, FACEBOOK_URL } from "@/data/seo";
import { trackEvent } from "@/lib/leads";

const MSG = "Hi, I was on your website. I need help with my solar panels.";
const digits = BUSINESS.phone.replace(/\D/g, "");

export const links = {
  hasPhone: digits.length >= 10,
  call: digits ? `tel:+${digits}` : "",
  sms: digits ? `sms:+${digits}?&body=${encodeURIComponent(MSG)}` : "",
  whatsapp: digits ? `https://wa.me/${digits}?text=${encodeURIComponent(MSG)}` : "",
  email: `mailto:${BUSINESS.email}?subject=${encodeURIComponent("Solar quote request")}&body=${encodeURIComponent(MSG)}`,
  emailDisplay: BUSINESS.email,
  phoneDisplay: BUSINESS.phoneDisplay,
  facebook: FACEBOOK_URL,
  facebookMessage: "https://m.me/ArtofSolarEnergy",
};

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
    <path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.3 0 .7-.2 1l-2.2 2.2z" />
  </svg>
);
const TextIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
    <path d="M12 3C6.9 3 3 6.6 3 11c0 2.3 1.1 4.3 2.9 5.7L5 21l4.6-2.1c.8.2 1.6.3 2.4.3 5.1 0 9-3.6 9-8s-3.9-8-9-8z" />
  </svg>
);
const MailIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);
const QuoteIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M4 4h16v16H4z" />
    <path d="M8 9h8M8 13h8M8 17h5" />
  </svg>
);
export const FacebookIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.5-1.5h1.4V5c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8V11H8v3h2.5v7h3z" />
  </svg>
);

/**
 * Thumb-reach contact bar, phones and tablets only. Desktop has the header
 * button. Call and Text appear on their own once a phone number is set;
 * until then Facebook Messenger takes the second slot.
 */
export function ContactDock() {
  const cell =
    "flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-bold tracking-wide uppercase";
  return (
    <>
      <div aria-hidden className="h-[64px] lg:hidden" />
      <nav
        aria-label="Quick contact"
        className="fixed inset-x-0 bottom-0 z-50 flex border-t-2 border-orange bg-navy-deep text-white shadow-[0_-8px_24px_rgba(0,0,0,0.25)] [padding-bottom:env(safe-area-inset-bottom)] lg:hidden"
      >
        {links.hasPhone && (
          <a
            href={links.call}
            onClick={() => trackEvent("call_click", { channel: "call", label: "dock" })}
            className={`${cell} bg-orange text-navy-deep`}
          >
            <PhoneIcon />
            Call
          </a>
        )}
        <Link
          to="/contact"
          onClick={() => trackEvent("quote_click", { channel: "form", label: "dock" })}
          className={`${cell} ${links.hasPhone ? "" : "bg-orange text-navy-deep"}`}
        >
          <QuoteIcon />
          Free quote
        </Link>
        {links.hasPhone ? (
          <a
            href={links.sms}
            onClick={() => trackEvent("text_click", { channel: "text", label: "dock" })}
            className={cell}
          >
            <TextIcon />
            Text
          </a>
        ) : (
          <a
            href={links.facebookMessage}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackEvent("whatsapp_click", { channel: "facebook", label: "dock" })}
            className={cell}
          >
            <FacebookIcon />
            Message
          </a>
        )}
        <a
          href={links.email}
          onClick={() => trackEvent("email_click", { channel: "email", label: "dock" })}
          className={cell}
        >
          <MailIcon />
          Email
        </a>
      </nav>
    </>
  );
}
