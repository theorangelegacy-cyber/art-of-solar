

# Quantum Orange Dynamics — Cinematic Quantum Web Experience

A multi-page, single-scroll-per-page experience where a real WebGL **3D quantum orange** is the gravitational center of the brand. Every page orbits it. Built in React + Vite with React Three Fiber, Drei, and a custom shader/particle system.

## Visual Language

- **Palette:** midnight indigo `#0A0B1E` background, quantum orange `#FF6A1A / #FFB347` core, bioluminescent green `#39FF9C` accents, plasma white text.
- **Typography:** ultra-thin display sans for hero numerals/labels (think instrument panel), clean geometric sans for body. Monospace for "telemetry" micro-labels.
- **Motion philosophy:** ambient at rest, reactive on scroll/cursor, never blocking readability. Reduced-motion fallback respected.
- **Texture:** subtle film grain, scanline shimmer, chromatic aberration on hero only, animated grid floor that warps near the orb.

## The Quantum Orange (hero centerpiece)

A real React Three Fiber scene:
- Sphere built from a high-poly icosahedron with a custom GLSL shader: orange peel dimples + flowing energy veins + Fresnel rim glow in green.
- Orbiting **electron rings** (3 elliptical paths, tilted) carrying glowing particles.
- **Particle field** (~3k points) drifting in 3D with slow noise; particles repel from cursor.
- On scroll: orange slowly **peels open into segmented quantum slices** revealing a glowing core, segments float outward and re-form.
- Idle: gentle rotation, pulsating bloom, occasional "quantum jitter" glitch.
- Bloom + chromatic aberration + vignette via postprocessing.
- Mobile + low-power: drops to a lighter shader, fewer particles, no postprocessing.

## Site Structure (multi-page, each a cinematic single-scroll)

### 1. Home `/`
- **Hero:** full-viewport 3D orange + headline "Practice law at the speed of light." + dual CTAs ("Initiate Contact" / "View Capabilities"). Floating HUD telemetry readouts (fake but tasteful: "COHERENCE 98.6%", "ENTANGLED FIRMS: 142").
- **Capability grid (4D feature panels):** 5 holographic cards that tilt on cursor (parallax), each with a custom animated glyph — Website Design, Chatbots, Automation, CRM Management, Family Law Software.
- **"Quantum Stack" section:** scroll-driven horizontal reveal showing how the 5 services interlock as orbital layers around the orange.
- **Proof band:** animated counters + scrolling marquee of firm-type logos/placeholders.
- **CTA block:** "Initiate Contact" — links to `/contact`.

### 2. Services `/services`
- Smaller orange in corner that reacts to which service is hovered.
- One immersive section per service with a custom **"4D feature"** demonstration:
  - **Website Design** — live morphing wireframe → polished site preview.
  - **Chatbots** — animated conversation bubbles flowing along an orbit path.
  - **Automation** — node-graph that lights up showing workflow pulses.
  - **CRM Management** — 3D data lattice with rotating client cards.
  - **Family Law Software** — case-timeline that bends through space.

### 3. About `/about`
- Manifesto-style page. Large kinetic typography, philosophy of "quantum legal infrastructure."
- Timeline as a curved light path through space.
- Team / principles cards as floating holographic plates.

### 4. Contact `/contact`
- Split layout: orange on the left slowly pulsing; lead-capture form on the right inside a holographic panel.
- **Lead form (Lovable Cloud):** Name, Firm, Role, Email, Phone (optional), Practice focus, Message. Zod validation, length limits, honeypot, success state with a "transmission confirmed" animation.
- **"Initiate Contact" booking CTA:** prominent button — opens a styled modal with a Calendly-style embed slot (placeholder URL field configurable later) so a real booking link drops in.
- Submissions stored in a Supabase `leads` table with RLS (insert allowed for anon, select restricted to admin role via `user_roles` pattern). No auth UI yet — admin viewing comes later if requested.

## Global Elements

- **Top nav:** translucent glass bar, monospace nav labels with green underline-trace hover animation, animated logo mark (mini orbiting orange).
- **Footer:** minimal, telemetry-style — coordinates, contact, social, signature.
- **Page transitions:** quick fade + scale with a subtle "warp" flash; the orange persists in spirit between pages.
- **Cursor:** custom soft-glow cursor on desktop with green trail; native on mobile.
- **Loading:** boot-sequence intro the first time (under ~1.5s, skippable, never again that session).

## Performance & Accessibility

- Lazy-load the 3D scene; static poster frame until ready.
- `prefers-reduced-motion`: disables particles, peel animation, glitch — keeps a still rendered orange and clean layout.
- Mobile: simplified scene, larger tap targets, stacked sections, no postprocessing.
- Semantic headings, focus states, accessible form labels, color-contrast safe text on dark.

## Tech

- React Three Fiber `^8.18`, Drei `^9.122`, `three` for the orange, particles, and shader.
- `@react-three/postprocessing` for bloom/chromatic aberration.
- Framer Motion for 2D UI, scroll-linked reveals, page transitions.
- React Router for the 4 routes.
- React Hook Form + Zod for the lead form.
- Lovable Cloud for the `leads` table + RLS.
- Tailwind tokens extended with the new palette + custom keyframes (pulse-glow, drift, scanline, warp).

## Out of Scope (flag now to avoid surprise)

- Auth, admin dashboard for viewing leads, CMS, blog, payments — not included. Easy to add later.
- Real Calendly account — the embed slot accepts a URL you provide; placeholder used until then.

