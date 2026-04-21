import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { CornerFrame, Readout, SectionHead } from "@/components/HUD";

const QuantumOrangeScene = lazy(() => import("@/components/three/QuantumOrangeScene"));

const schema = z.object({
  name: z.string().trim().min(1, "Name required").max(120),
  firm: z.string().trim().min(1, "Firm required").max(160),
  role: z.string().trim().max(120).optional().or(z.literal("")),
  email: z.string().trim().email("Valid email required").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  practice_focus: z.string().trim().max(160).optional().or(z.literal("")),
  message: z.string().trim().min(1, "Message required").max(4000),
  website: z.string().max(0).optional(),
});
type FormVals = z.infer<typeof schema>;

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } =
    useForm<FormVals>({ resolver: zodResolver(schema), defaultValues: { website: "" } });

  const onSubmit = async (vals: FormVals) => {
    if (vals.website) return;
    const { error } = await supabase.from("leads").insert({
      name: vals.name, firm: vals.firm, role: vals.role || null,
      email: vals.email, phone: vals.phone || null,
      practice_focus: vals.practice_focus || null,
      message: vals.message, source: "contact_form",
    });
    if (error) {
      toast({ title: "Transmission failed", description: error.message, variant: "destructive" });
      return;
    }
    setSubmitted(true); reset();
    toast({ title: "Transmission confirmed", description: "Response within one business day." });
  };

  return (
    <div>
      {/* HERO */}
      <section className="relative pt-32 pb-12">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <SectionHead
                index="03"
                kicker="Open Channel"
                title="Initiate contact."
                desc="Tell us about your firm. We respond within one business day with the next step. Or skip ahead and book a 30-minute mapping call."
              />
            </div>
            <div className="lg:col-span-4 flex flex-col items-start lg:items-end gap-3">
              <button
                onClick={() => setBookingOpen(true)}
                className="inline-flex items-center gap-3 rounded-sm border border-accent/60 bg-accent/10 px-5 py-3 font-mono text-2xs tracking-mono uppercase text-accent hover:bg-accent hover:text-accent-foreground transition-all"
              >
                Book Mapping Call →
              </button>
              <div className="font-mono text-2xs tracking-mono uppercase text-muted-foreground">Window ≤ 24h · Encrypted</div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative pb-28">
        <div className="container grid lg:grid-cols-12 gap-6 items-stretch">
          {/* Orange instrument panel */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <CornerFrame>
              <div className="relative h-[420px] lg:min-h-[600px] overflow-hidden bg-surface-1 scanlines">
                <Suspense fallback={null}>
                  <QuantumOrangeScene intensity="compact" enablePostprocessing={false} className="absolute inset-0" />
                </Suspense>
                <div className="absolute top-3 left-3 font-mono text-2xs tracking-mono uppercase text-muted-foreground">CHANNEL · OPEN</div>
                <div className="absolute top-3 right-3 font-mono text-2xs tracking-mono uppercase text-accent">
                  <span className="inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-accent animate-ticker" />AWAITING SIGNAL</span>
                </div>
                <div className="absolute bottom-3 left-3 font-mono text-2xs tracking-mono-tight text-muted-foreground/70">38.8951°N · 77.0364°W</div>
                <div className="absolute bottom-3 right-3 font-mono text-2xs tracking-mono-tight text-muted-foreground/70">QOD-IV · ENCRYPTED</div>
              </div>
            </CornerFrame>

            <div className="grid grid-cols-3 border border-border">
              <div className="p-3 border-r border-border">
                <Readout k="Coherence" v="98.6%" status="active" />
              </div>
              <div className="p-3 border-r border-border">
                <Readout k="Latency" v="12ms" status="ok" />
              </div>
              <div className="p-3">
                <Readout k="Tier" v="Family · I" status="ok" />
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            {submitted ? (
              <CornerFrame>
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative bg-surface-1/40 p-10 md:p-14 text-center min-h-[500px] flex flex-col justify-center"
                >
                  <div className="font-mono text-2xs tracking-mono uppercase text-accent mb-4">// TRANSMISSION CONFIRMED</div>
                  <h2 className="font-display text-3xl md:text-4xl mb-3">Signal received.</h2>
                  <p className="text-foreground-dim max-w-md mx-auto">We'll respond within one business day. Check your inbox.</p>
                  <div className="mt-8 mx-auto h-px w-32 bg-border" />
                  <button onClick={() => setSubmitted(false)} className="mt-6 font-mono text-2xs tracking-mono uppercase text-accent underline-trace mx-auto">
                    Send another →
                  </button>
                </motion.div>
              </CornerFrame>
            ) : (
              <CornerFrame>
                <form onSubmit={handleSubmit(onSubmit)} className="relative bg-surface-1/40 p-6 md:p-10 space-y-5">
                  {/* HUD strip */}
                  <div className="flex items-center justify-between border-b border-border pb-3 mb-2 font-mono text-2xs tracking-mono uppercase text-muted-foreground">
                    <span>// FORM · QOD-CH/01</span>
                    <span className="text-accent inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-accent animate-ticker" />ENCRYPTED</span>
                  </div>

                  <input type="text" tabIndex={-1} autoComplete="off" className="hidden" {...register("website")} />

                  <div className="grid md:grid-cols-2 gap-5">
                    <Field n="01" label="Name"           error={errors.name?.message}>
                      <input className={inputCls} {...register("name")} placeholder="Jane Doe" maxLength={120} />
                    </Field>
                    <Field n="02" label="Firm"           error={errors.firm?.message}>
                      <input className={inputCls} {...register("firm")} placeholder="Doe Family Law" maxLength={160} />
                    </Field>
                    <Field n="03" label="Role" optional  error={errors.role?.message}>
                      <input className={inputCls} {...register("role")} placeholder="Managing Partner" maxLength={120} />
                    </Field>
                    <Field n="04" label="Email"          error={errors.email?.message}>
                      <input type="email" className={inputCls} {...register("email")} placeholder="jane@firm.com" maxLength={255} />
                    </Field>
                    <Field n="05" label="Phone" optional error={errors.phone?.message}>
                      <input className={inputCls} {...register("phone")} placeholder="(555) 555-0101" maxLength={40} />
                    </Field>
                    <Field n="06" label="Practice Focus" optional error={errors.practice_focus?.message}>
                      <input className={inputCls} {...register("practice_focus")} placeholder="Custody, divorce, mediation" maxLength={160} />
                    </Field>
                  </div>

                  <Field n="07" label="Message" error={errors.message?.message}>
                    <textarea rows={5} className={`${inputCls} resize-y`}
                      {...register("message")}
                      placeholder="Current stack. What you want to change. Anything we should know."
                      maxLength={4000} />
                  </Field>

                  <div className="flex items-center justify-between gap-4 pt-3 border-t border-border">
                    <p className="font-mono text-2xs tracking-mono uppercase text-muted-foreground">// No spam · 1-day response</p>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-3 rounded-sm bg-primary px-5 py-3 font-mono text-2xs tracking-mono uppercase text-primary-foreground hover:shadow-glow-orange disabled:opacity-60 transition-all"
                    >
                      {isSubmitting ? "Transmitting…" : "Transmit →"}
                    </button>
                  </div>
                </form>
              </CornerFrame>
            )}
          </div>
        </div>
      </section>

      {bookingOpen && <BookingModal onClose={() => setBookingOpen(false)} />}
    </div>
  );
}

const inputCls = "w-full rounded-sm border border-border bg-background/70 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/40 transition-colors font-mono";

function Field({ n, label, error, optional, children }: { n: string; label: string; error?: string; optional?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="flex items-center justify-between font-mono text-2xs tracking-mono uppercase mb-1.5">
        <span className="text-accent"><span className="text-muted-foreground mr-2">{n}</span>{label}</span>
        {optional && <span className="text-muted-foreground/70">opt</span>}
      </span>
      {children}
      {error && <span className="mt-1 block font-mono text-2xs text-destructive">// {error}</span>}
    </label>
  );
}

function BookingModal({ onClose }: { onClose: () => void }) {
  const calendlyUrl = "";
  return (
    <div className="fixed inset-0 z-[120] grid place-items-center bg-background-deep/85 p-4 backdrop-blur-sm" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <CornerFrame>
          <div className="relative overflow-hidden bg-surface-1">
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-3 right-3 z-10 grid h-8 w-8 place-items-center rounded-sm border border-border bg-background/70 text-foreground hover:bg-accent/10"
            >
              ✕
            </button>
            <div className="p-6 md:p-8 border-b border-border">
              <div className="font-mono text-2xs tracking-mono uppercase text-accent mb-2">// Mapping Call · 30 min</div>
              <h3 className="font-display text-2xl md:text-3xl">Book a session.</h3>
            </div>
            <div className="aspect-video bg-background-deep">
              {calendlyUrl ? (
                <iframe src={calendlyUrl} className="h-full w-full" title="Booking" />
              ) : (
                <div className="h-full w-full grid place-items-center p-8 text-center">
                  <div>
                    <p className="text-foreground-dim mb-3">Booking embed not configured yet.</p>
                    <p className="font-mono text-2xs tracking-mono uppercase text-accent">
                      Drop your Calendly URL into <code className="text-foreground">BookingModal</code> in <code className="text-foreground">src/pages/Contact.tsx</code>.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CornerFrame>
      </motion.div>
    </div>
  );
}
