import { useEffect, useState } from "react";

/** First-visit boot sequence. Sharper, sub-1.4s, skippable. */
export default function BootSequence() {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem("qod_booted") === "1") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sessionStorage.setItem("qod_booted", "1"); return;
    }
    setVisible(true);
    const timers: number[] = [];
    [120, 280, 460, 640, 820, 1000].forEach((t, i) =>
      timers.push(window.setTimeout(() => setStep(i + 1), t))
    );
    timers.push(window.setTimeout(() => {
      sessionStorage.setItem("qod_booted", "1");
      setVisible(false);
    }, 1300));
    const skip = (e: KeyboardEvent | MouseEvent) => {
      if ("key" in e && e.key !== "Escape" && e.key !== "Enter" && e.key !== " ") return;
      sessionStorage.setItem("qod_booted", "1"); setVisible(false);
    };
    window.addEventListener("keydown", skip);
    window.addEventListener("click", skip as any);
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("click", skip as any);
    };
  }, []);

  if (!visible) return null;

  const lines = [
    ["BIOS", "QOD-IV.0.7 · 2026.04"],
    ["CORE", "ENTANGLED ◦ COHERENT"],
    ["FIELD", "ORANGE LATTICE ONLINE"],
    ["SYNC", "LEGAL SUBSTRATE BOUND"],
    ["NET", "UPLINK · 12ms · ENCRYPTED"],
    ["", "READY"],
  ];

  return (
    <div className="fixed inset-0 z-[200] grid place-items-center bg-background-deep noise overflow-hidden">
      <div className="absolute inset-0 bg-grid-fine opacity-[0.06]" />
      <div className="absolute top-6 left-6 font-mono text-2xs tracking-mono uppercase text-muted-foreground">
        QOD-IV ◦ BOOT
      </div>
      <div className="absolute top-6 right-6 font-mono text-2xs tracking-mono uppercase text-accent">
        <span className="inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-accent animate-ticker" />HANDSHAKE</span>
      </div>

      <div className="relative w-[min(420px,90vw)] font-mono text-xs space-y-1.5">
        {lines.slice(0, step).map(([k, v], i) => (
          <div key={i} className="flex items-baseline justify-between gap-4 animate-fade-in">
            <span className="text-accent uppercase tracking-mono w-12">{k}</span>
            <span className="flex-1 border-b border-dotted border-border" />
            <span className="text-foreground-dim uppercase tracking-mono-tight text-2xs">{v}</span>
          </div>
        ))}
        <div className="mt-6 h-px w-full bg-border overflow-hidden">
          <div className="h-full bg-primary transition-[width] duration-200" style={{ width: `${(step / 6) * 100}%` }} />
        </div>
        <div className="mt-3 font-mono text-2xs tracking-mono uppercase text-muted-foreground">
          [esc] skip
        </div>
      </div>

      <div className="absolute bottom-6 left-6 font-mono text-2xs tracking-mono-tight text-muted-foreground/60">
        38.8951°N · 77.0364°W
      </div>
      <div className="absolute bottom-6 right-6 font-mono text-2xs tracking-mono-tight text-muted-foreground/60">
        Σ · {new Date().toISOString().slice(0, 19)}Z
      </div>
    </div>
  );
}
