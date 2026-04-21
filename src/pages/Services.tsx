import { motion } from "framer-motion";
import { lazy, Suspense, useState } from "react";
import { Link } from "react-router-dom";
import { CornerFrame, Readout, SectionHead } from "@/components/HUD";

const QuantumOrangeScene = lazy(() => import("@/components/three/QuantumOrangeScene"));

const services = [
  {
    code: "WD/01", title: "Site Architecture",
    summary: "Conversion-engineered firm sites. Sub-second hero, schema-grade SEO, native mobile discipline.",
    detail: "We build sites the way a research lab builds an instrument: every interaction measured, every component justified, nothing decorative. The site is the firm's first impression and its highest-converting attorney — both, simultaneously.",
    bullets: [
      "≤ 0.8s LCP target",
      "100/100 Lighthouse mobile",
      "Schema, sitemap, and Core Web Vitals tuned",
      "Conversion math baked into IA",
    ],
    spec: "WD/01 · v4.0",
    demo: "WireframeDemo",
  },
  {
    code: "CB/02", title: "Intake Agent",
    summary: "On-brand AI agents that intake, qualify, route, and book — 24/7, without losing a beat.",
    detail: "Trained on your firm's voice, your disqualifiers, and your retainer thresholds. Routes hot leads instantly to attorneys with full context. Books consults inside the same conversation.",
    bullets: [
      "Branded voice + tone profile",
      "Live qualification + disqualification",
      "Calendar handoff in-thread",
      "Full transcript pushed to CRM",
    ],
    spec: "CB/02 · v4.0",
    demo: "ChatDemo",
  },
  {
    code: "AT/03", title: "Workflow Substrate",
    summary: "Event-driven automations that draft, file, follow up, and reconcile — without human cycles.",
    detail: "Every repetitive task in your firm — captured, modeled, and run by software. Intake → consult → retainer → engagement → billing. Failure modes alerted; everything else invisible.",
    bullets: [
      "Intake → retainer in one flow",
      "Auto-drafted engagement letters",
      "Reconciled status across systems",
      "Sub-3-second median latency",
    ],
    spec: "AT/03 · v4.0",
    demo: "GraphDemo",
  },
  {
    code: "CR/04", title: "CRM Topology",
    summary: "Pipelines tuned to family-law lifecycles with full attribution and weekly intelligence.",
    detail: "We architect, migrate, and operate your CRM. Custom stages reflect how family practice actually moves; scoring reflects what actually closes; reporting reflects what actually grows the firm.",
    bullets: [
      "Custom stages + scoring",
      "Referral attribution",
      "Weekly intelligence brief",
      "Migration with zero downtime",
    ],
    spec: "CR/04 · v4.0",
    demo: "LatticeDemo",
  },
  {
    code: "FL/05", title: "Family Law OS",
    summary: "Matter, document, billing, and client-portal stack — purpose-built for the discipline.",
    detail: "Matter timelines visualized. Documents assembled from approved templates. Secure client portal with e-sign and billing. One pane of glass for the entire practice.",
    bullets: [
      "Matter timeline visualization",
      "Secure portal + e-sign",
      "Document assembly engine",
      "Trust + retainer accounting",
    ],
    spec: "FL/05 · v4.0",
    demo: "TimelineDemo",
  },
];

export default function Services() {
  const [active, setActive] = useState(0);

  return (
    <div>
      {/* HERO */}
      <section className="relative pt-32 pb-16 border-b border-border">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7">
              <SectionHead
                index="01"
                kicker="Capability Matrix"
                title={<>Five layers.<br /><span className="font-serif-italic text-foreground-dim">Infinite throughput.</span></>}
                desc="Every layer is a complete system on its own. Together they form the entangled stack — measurable, observable, accountable."
              />
            </div>

            <div className="lg:col-span-5">
              <CornerFrame size={14}>
                <div className="relative h-[280px] md:h-[340px] overflow-hidden bg-surface-1">
                  <Suspense fallback={null}>
                    <QuantumOrangeScene intensity="compact" enablePostprocessing={false} className="h-full w-full" />
                  </Suspense>
                  <div className="absolute top-3 left-3 flex items-center gap-2 font-mono text-2xs tracking-mono uppercase text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent animate-ticker" />Live · core
                  </div>
                  <div className="absolute bottom-3 right-3 font-mono text-2xs tracking-mono-tight text-muted-foreground/70">FRAME · {active + 1}/{services.length}</div>
                </div>
              </CornerFrame>
              <div className="mt-4 flex items-center justify-between">
                <Readout k="Active layer" v={services[active].code} status="active" />
                <Readout k="State" v="Coherent" status="ok" />
              </div>
            </div>
          </div>

          {/* Layer index strip */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 border border-border">
            {services.map((s, i) => (
              <a
                key={s.code}
                href={`#${s.code.replace("/", "-")}`}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                className={`group relative p-4 border-r last:border-r-0 border-border transition-colors ${active === i ? "bg-surface-1" : "bg-background hover:bg-surface-1/60"}`}
              >
                <div className="font-mono text-2xs tracking-mono uppercase text-accent">{s.code}</div>
                <div className="mt-2 font-display text-sm text-foreground">{s.title}</div>
                {active === i && <span className="absolute bottom-0 left-0 h-px w-full bg-primary" />}
              </a>
            ))}
          </div>
        </div>
      </section>

      {services.map((s, i) => (
        <ServiceSection key={s.code} index={i} service={s} onView={() => setActive(i)} />
      ))}

      {/* CTA */}
      <section className="relative py-28">
        <div className="container">
          <CornerFrame>
            <div className="relative overflow-hidden p-10 md:p-16 text-center bg-surface-1/40">
              <div className="absolute inset-0 bg-grid-fine opacity-30" />
              <div className="relative">
                <div className="font-mono text-2xs tracking-mono uppercase text-accent mb-4">§ 02 · Mapping Call</div>
                <h2 className="font-display text-3xl md:text-5xl">See it on your firm in 30 minutes.</h2>
                <Link to="/contact" className="mt-8 inline-flex items-center gap-3 rounded-sm bg-primary px-6 py-3.5 font-mono text-2xs tracking-mono uppercase text-primary-foreground hover:shadow-glow-orange">
                  Initiate Contact →
                </Link>
              </div>
            </div>
          </CornerFrame>
        </div>
      </section>
    </div>
  );
}

function ServiceSection({
  service, index, onView,
}: { service: typeof import("@/pages/Services") extends never ? never : any; index: number; onView: () => void }) {
  const id = service.code.replace("/", "-");
  return (
    <motion.section
      id={id}
      onViewportEnter={onView}
      viewport={{ amount: 0.4 }}
      className="relative py-24 md:py-32 border-t border-border"
    >
      <div className="container">
        <div className={`grid lg:grid-cols-12 gap-10 items-center ${index % 2 ? "lg:[&>div:first-child]:order-2" : ""}`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <div className="font-mono text-2xs tracking-mono uppercase text-accent mb-4 flex items-center gap-3">
              <span className="text-muted-foreground">Layer</span>
              <span>{service.code}</span>
              <span className="h-px flex-1 bg-border" />
            </div>
            <h2 className="font-display text-3xl md:text-5xl tracking-tight">{service.title}</h2>
            <p className="mt-4 text-lg text-foreground/90">{service.summary}</p>
            <p className="mt-3 text-foreground-dim leading-relaxed">{service.detail}</p>
            <ul className="mt-6 grid gap-2 border-t border-border pt-5">
              {service.bullets.map((b: string) => (
                <li key={b} className="flex items-start gap-3 text-sm">
                  <span className="mt-1.5 h-1 w-3 bg-accent shrink-0" />
                  <span className="text-foreground/90">{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 font-mono text-2xs tracking-mono uppercase text-muted-foreground">
              Spec ▸ {service.spec}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <CornerFrame>
              <div className="relative h-[360px] md:h-[440px] overflow-hidden bg-surface-1/60 scanlines">
                <div className="absolute inset-0 bg-grid-fine opacity-40" />
                <div className="absolute top-3 left-3 font-mono text-2xs tracking-mono uppercase text-muted-foreground">Demo · {service.code}</div>
                <div className="absolute top-3 right-3 font-mono text-2xs tracking-mono uppercase text-accent">
                  <span className="inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-accent animate-ticker" />LIVE</span>
                </div>
                <DemoFor name={service.demo} />
              </div>
            </CornerFrame>
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
    <div className="absolute inset-0 grid place-items-center p-8">
      <div className="relative w-full max-w-md aspect-[4/3]">
        <div className="absolute inset-0 border border-border/70 p-4">
          <div className="h-2 w-2/3 bg-foreground/85" />
          <div className="mt-2 h-1.5 w-1/2 bg-muted-foreground/60" />
          <div className="mt-5 h-24 bg-gradient-orange shadow-glow-orange-soft" />
          <div className="mt-3 grid grid-cols-3 gap-2">
            <div className="h-8 bg-accent/15 border border-accent/30" />
            <div className="h-8 bg-accent/15 border border-accent/30" />
            <div className="h-8 bg-accent/15 border border-accent/30" />
          </div>
          <div className="mt-3 h-1 w-full bg-border" />
          <div className="mt-2 h-1 w-3/4 bg-border" />
        </div>
        <div className="absolute -top-2 -left-2 font-mono text-2xs tracking-mono-tight text-accent">A1</div>
        <div className="absolute -top-2 -right-2 font-mono text-2xs tracking-mono-tight text-accent">A2</div>
        <div className="absolute -bottom-2 -left-2 font-mono text-2xs tracking-mono-tight text-accent">B1</div>
        <div className="absolute -bottom-2 -right-2 font-mono text-2xs tracking-mono-tight text-accent">B2</div>
      </div>
    </div>
  );
}

function ChatDemo() {
  const msgs = [
    { from: "user", text: "I need help with custody.", t: "00:00" },
    { from: "bot",  text: "Understood. What state, and is there an existing order?", t: "00:01" },
    { from: "user", text: "California, no order yet.", t: "00:04" },
    { from: "bot",  text: "Got it. Booking you with our family attorney — tomorrow 14:30 PT. Confirmation sent.", t: "00:05" },
  ];
  return (
    <div className="absolute inset-0 p-6 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-md space-y-2.5">
        {msgs.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.35 }}
            className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className="max-w-[85%]">
              <div className="font-mono text-2xs tracking-mono-tight text-muted-foreground/70 mb-1">
                {m.from === "user" ? "client · 0x4e21" : "agent · QOD-CB"} · {m.t}
              </div>
              <div className={`rounded-sm px-3 py-2 text-sm border ${
                m.from === "user"
                  ? "bg-accent/10 border-accent/30 text-foreground"
                  : "bg-primary/10 border-primary/40 text-foreground"
              }`}>{m.text}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function GraphDemo() {
  const nodes = [
    { x: 12, y: 50, l: "INTAKE",     k: "n1" },
    { x: 36, y: 22, l: "QUALIFY",    k: "n2" },
    { x: 36, y: 78, l: "FOLLOW UP",  k: "n3" },
    { x: 62, y: 50, l: "CONSULT",    k: "n4" },
    { x: 88, y: 50, l: "RETAIN",     k: "n5" },
  ];
  const edges = [[0,1],[0,2],[1,3],[2,3],[3,4]];
  return (
    <div className="absolute inset-0 p-6">
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <defs>
          <pattern id="g" width="5" height="5" patternUnits="userSpaceOnUse">
            <path d="M 5 0 L 0 0 0 5" fill="none" stroke="hsl(var(--border))" strokeWidth="0.15"/>
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#g)"/>
        {edges.map(([a,b], i) => (
          <line key={i}
            x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
            stroke="hsl(var(--accent))" strokeWidth="0.4" strokeDasharray="1.5 1.5"
            style={{ animation: `flicker 4s steps(1) ${i * 0.3}s infinite` }}
          />
        ))}
        {nodes.map((n, i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r="2.2" fill="hsl(var(--primary))" />
            <circle cx={n.x} cy={n.y} r="4" fill="none" stroke="hsl(var(--primary) / 0.4)" strokeWidth="0.3" />
            <text x={n.x} y={n.y - 6} fill="hsl(var(--accent))" fontSize="2.2" textAnchor="middle" fontFamily="JetBrains Mono" letterSpacing="0.2">{n.l}</text>
            <text x={n.x} y={n.y + 8} fill="hsl(var(--muted-foreground))" fontSize="1.6" textAnchor="middle" fontFamily="JetBrains Mono">{n.k}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function LatticeDemo() {
  return (
    <div className="absolute inset-0 grid place-items-center [perspective:900px] p-6">
      <div className="relative grid grid-cols-4 gap-2 [transform-style:preserve-3d] animate-spin-slow" style={{ animationDuration: "60s" }}>
        {Array(16).fill(0).map((_, i) => (
          <div
            key={i}
            className="h-14 w-14 panel rounded-sm p-2 flex flex-col justify-between"
            style={{ transform: `rotateY(${(i % 4) * 14}deg) translateZ(${(i % 3) * 16}px)` }}
          >
            <div className="h-px w-full bg-accent/60" />
            <div>
              <div className="h-1 w-3/4 bg-foreground/70 mb-1" />
              <div className="font-mono text-[7px] tracking-mono-tight text-muted-foreground">CL/{(i+1).toString().padStart(3,"0")}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TimelineDemo() {
  const events = [
    { l: "INTAKE",     d: "T+0d" },
    { l: "FILING",     d: "T+12d" },
    { l: "DISCOVERY",  d: "T+45d" },
    { l: "MEDIATION",  d: "T+90d" },
    { l: "RESOLUTION", d: "T+140d" },
  ];
  return (
    <div className="absolute inset-0 p-8 md:p-10 flex items-center">
      <div className="relative w-full">
        <svg viewBox="0 0 600 80" className="w-full">
          <path d="M 20 40 Q 150 -10, 300 40 T 580 40" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="3 3"/>
        </svg>
        <div className="absolute inset-0 flex justify-between items-center">
          {events.map((e, i) => (
            <motion.div
              key={e.l}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="flex flex-col items-center"
            >
              <span className="h-2 w-2 rounded-full bg-accent shadow-glow-green" />
              <span className="mt-2 font-mono text-2xs tracking-mono uppercase text-foreground">{e.l}</span>
              <span className="font-mono text-2xs tracking-mono-tight text-muted-foreground">{e.d}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
