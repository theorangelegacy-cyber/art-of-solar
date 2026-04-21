import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const QuantumOrangeScene = lazy(() => import("@/components/three/QuantumOrangeScene"));

const schema = z.object({
  name: z.string().trim().min(1, "Name required").max(120),
  firm: z.string().trim().min(1, "Firm required").max(160),
  role: z.string().trim().max(120).optional().or(z.literal("")),
  email: z.string().trim().email("Valid email required").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  practice_focus: z.string().trim().max(160).optional().or(z.literal("")),
  message: z.string().trim().min(1, "Message required").max(4000),
  // honeypot
  website: z.string().max(0).optional(),
});

type FormVals = z.infer<typeof schema>;

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  const {
    register, handleSubmit, formState: { errors, isSubmitting }, reset,
  } = useForm<FormVals>({ resolver: zodResolver(schema), defaultValues: { website: "" } });

  const onSubmit = async (vals: FormVals) => {
    if (vals.website) return; // honeypot
    const { error } = await supabase.from("leads").insert({
      name: vals.name,
      firm: vals.firm,
      role: vals.role || null,
      email: vals.email,
      phone: vals.phone || null,
      practice_focus: vals.practice_focus || null,
      message: vals.message,
      source: "contact_form",
    });
    if (error) {
      toast({ title: "Transmission failed", description: error.message, variant: "destructive" });
      return;
    }
    setSubmitted(true);
    reset();
    toast({ title: "▸ Transmission confirmed", description: "We'll respond within one business day." });
  };

  return (
    <div>
      <section className="relative pt-32 pb-12">
        <div className="container">
          <div className="font-mono-tel text-[10px] tracking-[0.4em] text-accent mb-4">▸ OPEN CHANNEL</div>
          <h1 className="font-display text-4xl md:text-6xl">Initiate contact.</h1>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Tell us about your firm. We'll respond within one business day with the next step — or skip ahead and book a 30-minute mapping call.
          </p>
          <button
            onClick={() => setBookingOpen(true)}
            className="mt-6 inline-flex items-center gap-3 rounded-md border border-accent/60 bg-accent/10 px-6 py-3 font-mono-tel text-xs uppercase tracking-[0.25em] text-accent hover:shadow-glow-green transition-all"
          >
            ▸ Book Mapping Call
          </button>
        </div>
      </section>

      <section className="relative pb-28">
        <div className="container grid lg:grid-cols-12 gap-10 items-stretch">
          {/* Orange */}
          <div className="lg:col-span-5 h-[420px] lg:h-auto lg:min-h-[600px] holo-panel rounded-2xl overflow-hidden scanlines relative">
            <Suspense fallback={null}>
              <QuantumOrangeScene intensity="compact" enablePostprocessing={false} className="absolute inset-0" />
            </Suspense>
            <div className="absolute bottom-4 left-4 right-4 font-mono-tel text-[10px] tracking-[0.3em] text-accent/80 flex justify-between">
              <span>CHANNEL OPEN</span>
              <span className="animate-flicker">▸ AWAITING SIGNAL</span>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="holo-panel rounded-2xl p-10 text-center"
              >
                <div className="font-mono-tel text-[10px] tracking-[0.4em] text-accent mb-3">▸ TRANSMISSION CONFIRMED</div>
                <h2 className="font-display text-3xl md:text-4xl mb-3">Signal received.</h2>
                <p className="text-muted-foreground">We'll be in touch within one business day. Check your inbox.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 font-mono-tel text-xs tracking-[0.3em] text-accent underline-trace"
                >
                  ◇ SEND ANOTHER
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="holo-panel rounded-2xl p-6 md:p-10 space-y-5">
                {/* honeypot */}
                <input type="text" tabIndex={-1} autoComplete="off" className="hidden" {...register("website")} />

                <div className="grid md:grid-cols-2 gap-5">
                  <Field label="Name" error={errors.name?.message}>
                    <input className={inputCls} {...register("name")} placeholder="Jane Doe" maxLength={120} />
                  </Field>
                  <Field label="Firm" error={errors.firm?.message}>
                    <input className={inputCls} {...register("firm")} placeholder="Doe Family Law" maxLength={160} />
                  </Field>
                  <Field label="Role" error={errors.role?.message} optional>
                    <input className={inputCls} {...register("role")} placeholder="Managing Partner" maxLength={120} />
                  </Field>
                  <Field label="Email" error={errors.email?.message}>
                    <input type="email" className={inputCls} {...register("email")} placeholder="jane@firm.com" maxLength={255} />
                  </Field>
                  <Field label="Phone" error={errors.phone?.message} optional>
                    <input className={inputCls} {...register("phone")} placeholder="(555) 555-0101" maxLength={40} />
                  </Field>
                  <Field label="Practice Focus" error={errors.practice_focus?.message} optional>
                    <input className={inputCls} {...register("practice_focus")} placeholder="Custody, divorce, mediation" maxLength={160} />
                  </Field>
                </div>

                <Field label="Message" error={errors.message?.message}>
                  <textarea
                    rows={5}
                    className={`${inputCls} resize-y`}
                    {...register("message")}
                    placeholder="Tell us about your current stack and what you want to change."
                    maxLength={4000}
                  />
                </Field>

                <div className="flex items-center justify-between gap-4 pt-2">
                  <p className="font-mono-tel text-[10px] tracking-[0.25em] text-muted-foreground">
                    ◇ ENCRYPTED · NO SPAM · 1-DAY RESPONSE
                  </p>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-3 rounded-md border border-primary bg-primary px-6 py-3 font-mono-tel text-xs uppercase tracking-[0.25em] text-primary-foreground hover:shadow-glow-orange disabled:opacity-60 transition-all"
                  >
                    {isSubmitting ? "Transmitting…" : "▸ Transmit"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {bookingOpen && <BookingModal onClose={() => setBookingOpen(false)} />}
    </div>
  );
}

const inputCls = "w-full rounded-md border border-border bg-background/60 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 transition-colors";

function Field({ label, error, optional, children }: { label: string; error?: string; optional?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="font-mono-tel text-[10px] tracking-[0.3em] text-accent/90 mb-1.5 inline-block">
        {label.toUpperCase()} {optional && <span className="text-muted-foreground">(opt)</span>}
      </span>
      {children}
      {error && <span className="mt-1 block font-mono-tel text-[10px] text-destructive">{error}</span>}
    </label>
  );
}

function BookingModal({ onClose }: { onClose: () => void }) {
  // Placeholder — drop your real Calendly URL here.
  const calendlyUrl = "";
  return (
    <div className="fixed inset-0 z-[120] grid place-items-center bg-background-deep/80 p-4 backdrop-blur-sm" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="holo-panel relative w-full max-w-3xl rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 grid h-9 w-9 place-items-center rounded-md border border-border text-foreground hover:bg-accent/10"
        >
          ✕
        </button>
        <div className="p-6 md:p-8 border-b border-border/40">
          <div className="font-mono-tel text-[10px] tracking-[0.4em] text-accent mb-2">▸ MAPPING CALL</div>
          <h3 className="font-display text-2xl md:text-3xl">Book a 30-minute session.</h3>
        </div>
        <div className="aspect-video bg-background-deep">
          {calendlyUrl ? (
            <iframe src={calendlyUrl} className="h-full w-full" title="Booking" />
          ) : (
            <div className="h-full w-full grid place-items-center p-8 text-center">
              <div>
                <p className="text-muted-foreground mb-3">Booking embed not configured yet.</p>
                <p className="font-mono-tel text-[10px] tracking-[0.3em] text-accent">
                  Drop your Calendly URL into <code className="text-foreground">BookingModal</code> in <code className="text-foreground">src/pages/Contact.tsx</code>.
                </p>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
