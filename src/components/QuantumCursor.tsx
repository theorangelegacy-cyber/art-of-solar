import { useEffect, useRef, useState } from "react";

/** Soft-glow custom cursor with subtle ring + center dot. Disabled on touch / reduced-motion. */
export default function QuantumCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduced) return;
    setEnabled(true);
    document.documentElement.classList.add("quantum-cursor");

    let x = window.innerWidth / 2, y = window.innerHeight / 2;
    let rx = x, ry = y;
    let isPointer = false;
    const onMove = (e: MouseEvent) => {
      x = e.clientX; y = e.clientY;
      const t = e.target as HTMLElement | null;
      isPointer = !!(t && (t.closest("a, button, [role='button'], input, textarea, label, [data-cursor='pointer']")));
    };
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    const loop = () => {
      rx += (x - rx) * 0.22;
      ry += (y - ry) * 0.22;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x - 2}px, ${y - 2}px, 0)`;
      }
      if (ringRef.current) {
        const size = isPointer ? 36 : 22;
        const off = size / 2;
        ringRef.current.style.transform = `translate3d(${rx - off}px, ${ry - off}px, 0)`;
        ringRef.current.style.width = `${size}px`;
        ringRef.current.style.height = `${size}px`;
        ringRef.current.style.borderColor = isPointer ? "hsl(var(--accent))" : "hsl(var(--primary) / 0.55)";
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.classList.remove("quantum-cursor");
    };
  }, []);

  if (!enabled) return null;
  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1 w-1 rounded-full bg-accent mix-blend-screen"
      />
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full border mix-blend-screen transition-[width,height,border-color] duration-150"
        style={{ borderColor: "hsl(var(--primary) / 0.55)" }}
      />
    </>
  );
}
