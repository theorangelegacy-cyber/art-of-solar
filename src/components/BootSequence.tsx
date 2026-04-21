import { useEffect, useState } from "react";

/** First-visit boot intro. Skippable, ~1.5s, session-cached. */
export default function BootSequence() {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem("qod_booted") === "1") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sessionStorage.setItem("qod_booted", "1");
      return;
    }
    setVisible(true);
    const timers: number[] = [];
    [200, 500, 800, 1100].forEach((t, i) => {
      timers.push(window.setTimeout(() => setStep(i + 1), t));
    });
    timers.push(window.setTimeout(() => {
      sessionStorage.setItem("qod_booted", "1");
      setVisible(false);
    }, 1500));
    const skip = (e: KeyboardEvent | MouseEvent) => {
      if ("key" in e && e.key !== "Escape" && e.key !== "Enter") return;
      sessionStorage.setItem("qod_booted", "1");
      setVisible(false);
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
    "› INITIALIZING QUANTUM CORE",
    "› ENTANGLING LEGAL SUBSTRATE",
    "› CALIBRATING ORANGE COHERENCE",
    "› HANDSHAKE COMPLETE",
  ];

  return (
    <div className="fixed inset-0 z-[200] grid place-items-center bg-background-deep noise">
      <div className="font-mono-tel text-accent space-y-2 text-sm md:text-base px-6">
        {lines.slice(0, step).map((l, i) => (
          <div key={i} className="animate-fade-in flex items-center gap-3">
            <span className="text-glow-green">{l}</span>
          </div>
        ))}
        <div className="mt-6 h-[2px] w-64 bg-primary/20 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-accent to-primary" style={{ width: `${(step / 4) * 100}%`, transition: "width 0.3s" }} />
        </div>
        <div className="text-muted-foreground/70 mt-3 text-xs">press any key to skip</div>
      </div>
    </div>
  );
}
