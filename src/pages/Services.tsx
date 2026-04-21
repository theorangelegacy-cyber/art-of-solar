import { motion } from "framer-motion";
import { lazy, Suspense, useState } from "react";
import { Link } from "react-router-dom";

const QuantumOrangeScene = lazy(() => import("@/components/three/QuantumOrangeScene"));

const services = [
  {
    code: "WD-01",
    title: "Website Design",
    summary: "Sites engineered as conversion engines, not brochures.",
    detail: "Custom systems built around your firm's intake math. Animated, accessible, mobile-perfect, optimized for trust and speed-to-action.",
    bullets: ["Conversion-first IA", "Native mobile polish", "SEO + schema baked in", "Sub-second hero load"],
    demo: "WireframeDemo",
  },
  {
    code: "CB-02",
    title: "Chatbots",
    summary: "AI agents that intake, qualify, and book — 24/7.",
    detail: "Trained on your firm's voice, intake rules, and disqualifiers. Routes hot leads instantly. Escalates with full context.",
    bullets: ["Branded voice + tone", "Live qualification", "Calendar handoff", "Full transcript to CRM"],
    demo: "ChatDemo",
  },
  {
    code: "AT-03",
    title: "Automation",
    summary: "Workflows that draft, file, and follow up without humans.",
    detail: "Every repetitive task in your firm — captured, modeled, executed. Intake, retainers, follow-up sequences, document generation.",
    bullets: ["Intake → consult → retainer", "Auto-drafting", "Status sync everywhere", "Failure-mode alerts"],
    demo: "GraphDemo",
  },
  {
    code: "CR-04",
    title: "CRM Management",
    summary: "Pipelines tuned for family law lifecycles.",
    detail: "We architect, migrate, and operate your CRM. Custom stages, scoring, and reporting that reflects how family law actually works.",
    bullets: ["Custom pipelines", "Lead scoring", "Referral tracking", "Weekly intelligence reports"],
    demo: "LatticeDemo",
  },
  {
    code: "FL-05",
    title: "Family Law Software",
    summary: "Purpose-built case, document, and client-portal stack.",
    detail: "Matter management, secure client portal, document automation, and timeline visualization — designed exclusively for family practice.",
    bullets: ["Matter timelines", "Secure client portal", "Document assembly", "E-sign + billing"],
    demo: "TimelineDemo",
  },
];

export default function Services() {
  const [activeIdx, setActiveIdx] = useState(0);
  return (
    <div>
      <section className="relative pt-32 pb-20">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="font-mono-tel text-[10px] tracking-[0.4em] text-accent mb-4">▸ CAPABILITY MATRIX</div>
              <h1 className="font-display text-5xl md:text-7xl">
                Five layers.<br/>
                <span className="text-gradient-aurora">Infinite throughput.</span>
              </h1>
              <p className="mt-6 max-w-xl text-muted-foreground">
                Each service is a complete system on its own — and exponentially more powerful as part of the entangled stack.
              </p>
            </div>
            <div className="lg:col-span-5 h-[320px] md:h-[380px]">
              <Suspense fallback={null}>
                <QuantumOrangeScene intensity="compact" enablePostprocessing={false} className="h-full w-full" />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {services.map((s, i) => (
        <ServiceSection key={s.code} index={i} service={s} onView={() => setActiveIdx(i)} active={activeIdx === i} />
      ))}

      <section className="relative py-28">
        <div className="container">
          <div className="holo-panel rounded-2xl p-10 md:p-16 text-center">
            <h2 className="font-display text-3xl md:text-5xl">Ready to see it on your firm?</h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              30 minutes. We map your stack and show you the entangled version.
            </p>
            <Link to="/contact" className="mt-8 inline-flex items-center gap-3 rounded-md border border-primary bg-primary px-7 py-4 font-mono-tel text-xs uppercase tracking-[0.3em] text-primary-foreground hover:shadow-glow-orange">
              ▸ Initiate Contact
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function ServiceSection({
  service, index, onView, active,
}: { service: typeof services[number]; index: number; onView: () => void; active: boolean }) {
  return (
    <motion.section
      onViewportEnter={onView}
      viewport={{ amount: 0.4 }}
      className={`relative py-24 md:py-32 border-t border-border/40 ${index % 2 ? "" : ""}`}
    >
      <div className="container">
        <div className={`grid lg:grid-cols-12 gap-10 items-center ${index % 2 ? "lg:[&>div:first-child]:order-2" : ""}`}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <div className="font-mono-tel text-[10px] tracking-[0.4em] text-accent mb-3">▸ LAYER {service.code}</div>
            <h2 className="font-display text-3xl md:text-5xl">{service.title}</h2>
            <p className="mt-3 text-lg text-foreground/90">{service.summary}</p>
            <p className="mt-3 text-muted-foreground">{service.detail}</p>
            <ul className="mt-6 grid gap-2">
              {service.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm">
                  <span className="mt-1 h-2 w-2 rounded-full bg-accent shadow-glow-green shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <div className="holo-panel relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden scanlines">
              <DemoFor name={service.demo} />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

function DemoFor({ name }: { name: string }) {
  switch (name) {
    case "WireframeDemo": return <WireframeDemo />;
    case "ChatDemo": return <ChatDemo />;
    case "GraphDemo": return <GraphDemo />;
    case "LatticeDemo": return <LatticeDemo />;
    case "TimelineDemo": return <TimelineDemo />;
    default: return null;
  }
}

function WireframeDemo() {
  return (
    <div className="absolute inset-0 p-6 flex items-center justify-center">
      <div className="relative w-full max-w-md aspect-[4/3]">
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-2 opacity-60 animate-pulse-glow">
          {Array(36).fill(0).map((_, i) => (
            <div key={i} className="bg-primary/30 rounded-sm" style={{ animationDelay: `${i * 30}ms` }} />
          ))}
        </div>
        <div className="absolute inset-0 holo-panel rounded-lg p-4 [animation:warp-in_1.2s_ease-out_0.6s_both]">
          <div className="h-3 w-2/3 bg-foreground/80 rounded mb-3"/>
          <div className="h-2 w-1/2 bg-muted-foreground/60 rounded mb-6"/>
          <div className="h-24 bg-gradient-orange rounded shadow-glow-orange mb-3"/>
          <div className="grid grid-cols-3 gap-2">
            <div className="h-10 bg-accent/20 rounded"/><div className="h-10 bg-accent/20 rounded"/><div className="h-10 bg-accent/20 rounded"/>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatDemo() {
  const msgs = [
    { from: "user", text: "I need help with custody." },
    { from: "bot", text: "Understood. What state, and is there an existing order?" },
    { from: "user", text: "California, no order yet." },
    { from: "bot", text: "Got it. Booking you with our family attorney — 2:30 PM tomorrow. ✓" },
  ];
  return (
    <div className="absolute inset-0 p-6 flex items-center justify-center">
      <div className="w-full max-w-md space-y-3">
        {msgs.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.4 }}
            className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
              m.from === "user"
                ? "bg-accent/20 border border-accent/40 text-foreground"
                : "bg-primary/15 border border-primary/40 text-foreground shadow-glow-orange"
            }`}>{m.text}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function GraphDemo() {
  const nodes = [
    { x: 15, y: 50, l: "INTAKE" },
    { x: 38, y: 25, l: "QUALIFY" },
    { x: 38, y: 75, l: "FOLLOW UP" },
    { x: 62, y: 50, l: "CONSULT" },
    { x: 85, y: 50, l: "RETAIN" },
  ];
  const edges = [[0,1],[0,2],[1,3],[2,3],[3,4]];
  return (
    <div className="absolute inset-0 p-6">
      <svg viewBox="0 0 100 100" className="h-full w-full">
        {edges.map(([a,b], i) => (
          <line
            key={i}
            x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
            stroke="hsl(154 100% 61%)" strokeWidth="0.4"
            strokeDasharray="2 2"
            style={{ animation: `flicker 2.5s ease-in-out ${i * 0.3}s infinite` }}
          />
        ))}
        {nodes.map((n, i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r="3" fill="hsl(22 100% 55%)" />
            <circle cx={n.x} cy={n.y} r="6" fill="none" stroke="hsl(22 100% 55% / 0.4)" />
            <text x={n.x} y={n.y - 8} fill="hsl(154 100% 61%)" fontSize="2.5" textAnchor="middle" fontFamily="JetBrains Mono">{n.l}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function LatticeDemo() {
  return (
    <div className="absolute inset-0 grid place-items-center [perspective:800px]">
      <div className="relative grid grid-cols-4 gap-2 [transform-style:preserve-3d] animate-spin-slow" style={{ animationDuration: "40s" }}>
        {Array(16).fill(0).map((_, i) => (
          <div
            key={i}
            className="h-14 w-14 holo-panel rounded-md p-2 flex flex-col justify-between"
            style={{ transform: `rotateY(${(i % 4) * 18}deg) translateZ(${(i % 3) * 20}px)` }}
          >
            <div className="h-1 w-full bg-accent/60 rounded" />
            <div className="font-mono-tel text-[7px] tracking-widest text-muted-foreground">CL-{(i+1).toString().padStart(3,"0")}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TimelineDemo() {
  const events = ["INTAKE", "FILING", "DISCOVERY", "MEDIATION", "RESOLUTION"];
  return (
    <div className="absolute inset-0 p-8 flex items-center">
      <div className="relative w-full">
        <svg viewBox="0 0 600 80" className="w-full">
          <path d="M 20 40 Q 150 -10, 300 40 T 580 40" fill="none" stroke="hsl(22 100% 55%)" strokeWidth="1.5" strokeDasharray="4 4"/>
        </svg>
        <div className="absolute inset-0 flex justify-between items-center">
          {events.map((e, i) => (
            <motion.div
              key={e}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="flex flex-col items-center"
            >
              <span className="h-3 w-3 rounded-full bg-accent shadow-glow-green" />
              <span className="mt-2 font-mono-tel text-[10px] tracking-widest text-muted-foreground">{e}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
