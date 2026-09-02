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
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-9.403h-.004a9.87 9.87 0 0 0-7.078 2.937A9.87 9.87 0 0 0 2.052 15.58a9.858 9.858 0 0 0 1.51 5.302l-1.015 3.714 3.802-.998a9.84 9.84 0 0 0 4.708 1.196h.004a9.87 9.87 0 0 0 7.078-2.937 9.87 9.87 0 0 0 2.937-7.078 9.87 9.87 0 0 0-2.937-7.078 9.87 9.87 0 0 0-7.078-2.937m-.004 1.77a8.1 8.1 0 0 1 5.804 2.407 8.1 8.1 0 0 1 2.407 5.801 8.1 8.1 0 0 1-2.407 5.802 8.1 8.1 0 0 1-5.804 2.407h-.003a8.09 8.09 0 0 1-3.87-.985l-.278-.148-2.795.733.746-2.72-.157-.252a8.08 8.08 0 0 1-.987-4.164 8.1 8.1 0 0 1 2.407-5.802 8.1 8.1 0 0 1 5.804-2.407z" />
  </svg>
);
export const FacebookIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.5-1.5h1.4V5c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8V11H8v3h2.5v7h3z" />
  </svg>
);

/**
 * Thumb-reach contact banner, phones and tablets only. Facebook sits on the
 * far left; Email, Text and WhatsApp fill the rest. Each tap opens with the
 * message already typed.
 */
export function ContactDock() {
  const cell =
    "flex flex-1 flex-col items-center justify-center gap-1.5 py-3 text-[12px] font-bold tracking-wide transition hover:brightness-110 active:brightness-90 sm:text-[13px]";
  return (
    <>
      <div aria-hidden className="h-[72px] lg:hidden" />
      <nav
        aria-label="Message Art of Solar"
        className="animate-flash-banner fixed inset-x-0 bottom-0 z-50 flex border-t-2 border-orange bg-navy-deep text-white shadow-[0_-8px_24px_rgba(0,0,0,0.25)] [padding-bottom:env(safe-area-inset-bottom)] lg:hidden"
      >
        <a
          href={links.facebook}
          target="_blank"
          rel="noreferrer"
          onClick={() => trackEvent("whatsapp_click", { channel: "facebook", label: "dock" })}
          className={`${cell} border-r border-white/10`}
        >
          <FacebookIcon />
          Facebook
        </a>

        <a
          href={links.email}
          onClick={() => trackEvent("email_click", { channel: "email", label: "dock" })}
          className={`${cell} ${links.hasPhone ? "" : "bg-orange text-navy-deep"}`}
        >
          <MailIcon />
          Email
        </a>

        {links.hasPhone && (
          <>
            <a
              href={links.sms}
              onClick={() => trackEvent("text_click", { channel: "text", label: "dock" })}
              className={`${cell} border-l border-white/10`}
            >
              <TextIcon />
              Text
            </a>
            <a
              href={links.whatsapp}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent("whatsapp_click", { channel: "whatsapp", label: "dock" })}
              className={`${cell} border-l border-white/10 bg-orange text-navy-deep`}
            >
              <WhatsAppIcon />
              WhatsApp
            </a>
          </>
        )}
      </nav>
    </>
  );
}
