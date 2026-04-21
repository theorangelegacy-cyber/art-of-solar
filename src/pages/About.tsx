import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const principles = [
  { code: "P-01", title: "Entanglement", body: "Every layer of your firm informs every other in real time." },
  { code: "P-02", title: "Coherence", body: "One source of truth. One brand. One conversion engine." },
  { code: "P-03", title: "Velocity", body: "We operate in compressed time. Decisions land before friction does." },
  { code: "P-04", title: "Discipline", body: "Bold visuals serve clarity. Nothing in our work is decoration." },
];

const milestones = [
  { y: "01", label: "DISCOVER", desc: "Map your firm in detail. Surface every leak." },
  { y: "02", label: "DESIGN", desc: "Architect the entangled system, end-to-end." },
  { y: "03", label: "DEPLOY", desc: "Launch in waves. Zero downtime, instant lift." },
  { y: "04", label: "EVOLVE", desc: "Continuous tuning. Compound returns, monthly." },
];

export default function About() {
  return (
    <div>
      <section className="relative pt-32 pb-20">
        <div className="container max-w-5xl">
          <div className="font-mono-tel text-[10px] tracking-[0.4em] text-accent mb-4">▸ MANIFESTO · 001</div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95]">
            We don't build websites.<br/>
            <span className="text-gradient-aurora">We build legal singularities.</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-3xl">
            Quantum Orange Dynamics exists because family law deserves better infrastructure than the cobbled-together stacks most firms tolerate. We build one system, not five — engineered with the discipline of a research lab and the ambition of a moonshot.
          </p>
        </div>
      </section>

      <section className="relative py-24">
        <div className="container">
          <div className="font-mono-tel text-[10px] tracking-[0.4em] text-accent mb-3">▸ PRINCIPLES</div>
          <h2 className="font-display text-3xl md:text-5xl mb-12 max-w-2xl">Four constants that govern our work.</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {principles.map((p, i) => (
              <motion.div
                key={p.code}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="holo-panel rounded-xl p-6 md:p-8"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono-tel text-[10px] tracking-[0.3em] text-accent">{p.code}</span>
                  <span className="h-2 w-2 rounded-full bg-accent shadow-glow-green" />
                </div>
                <h3 className="font-display text-2xl md:text-3xl mb-3">{p.title}</h3>
                <p className="text-muted-foreground">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-28">
        <div className="container">
          <div className="font-mono-tel text-[10px] tracking-[0.4em] text-accent mb-3">▸ TRAJECTORY</div>
          <h2 className="font-display text-3xl md:text-5xl mb-16 max-w-2xl">A curved path through quantum time.</h2>

          <div className="relative">
            <svg viewBox="0 0 800 160" className="w-full h-32 md:h-40">
              <defs>
                <linearGradient id="path-grad" x1="0" x2="1">
                  <stop offset="0%" stopColor="hsl(154 100% 61%)" />
                  <stop offset="100%" stopColor="hsl(22 100% 55%)" />
                </linearGradient>
              </defs>
              <path d="M 20 80 Q 200 0, 400 80 T 780 80" stroke="url(#path-grad)" strokeWidth="2" fill="none" strokeDasharray="6 6"/>
            </svg>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.y}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="font-mono-tel text-[10px] tracking-[0.3em] text-accent">PHASE {m.y}</div>
                  <div className="font-display text-2xl mt-1">{m.label}</div>
                  <p className="mt-2 text-sm text-muted-foreground">{m.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-28">
        <div className="container">
          <div className="holo-panel rounded-2xl p-10 md:p-16 text-center">
            <h2 className="font-display text-3xl md:text-5xl">Bring your firm into the field.</h2>
            <Link to="/contact" className="mt-8 inline-flex items-center gap-3 rounded-md border border-primary bg-primary px-7 py-4 font-mono-tel text-xs uppercase tracking-[0.3em] text-primary-foreground hover:shadow-glow-orange">
              ▸ Initiate Contact
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
