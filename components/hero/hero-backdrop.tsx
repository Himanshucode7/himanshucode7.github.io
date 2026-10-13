"use client";

import { useEffect, useRef, type CSSProperties } from "react";

const FINE_POINTER = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

type Blob = { style: CSSProperties };

/* Soft radial gradients (no CSS blur filter, so they stay cheap to composite). */
const blobs: Blob[] = [
  {
    style: {
      width: "72vmax",
      height: "72vmax",
      top: "-34vmax",
      right: "-22vmax",
      background: "radial-gradient(closest-side, var(--mesh-1), transparent)",
      "--drift": "22s",
      "--dx": "-6%",
      "--dy": "8%",
    } as CSSProperties,
  },
  {
    style: {
      width: "58vmax",
      height: "58vmax",
      top: "6%",
      left: "-26vmax",
      background: "radial-gradient(closest-side, var(--mesh-2), transparent)",
      "--drift": "28s",
      "--dx": "9%",
      "--dy": "-5%",
    } as CSSProperties,
  },
  {
    style: {
      width: "38vmax",
      height: "38vmax",
      top: "26%",
      right: "8%",
      background: "radial-gradient(closest-side, var(--mesh-3), transparent)",
      "--drift": "19s",
      "--dx": "-12%",
      "--dy": "-9%",
      "--ds": "1.15",
    } as CSSProperties,
  },
];

/**
 * The hero's signature moment: a slow gradient mesh that leans toward the cursor.
 * - Drift is CSS (transform only) and pauses when the hero is off-screen.
 * - Pointer influence writes two CSS variables per frame, max; no React state.
 * - Reduced motion or touch: a static, fully composed frame.
 */
export function HeroBackdrop() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let visible = true;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      element.toggleAttribute("data-paused", !visible);
    });
    observer.observe(element);

    if (!matchMedia(FINE_POINTER).matches) return () => observer.disconnect();

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      if (!visible || frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        element.style.setProperty("--mx", ((event.clientX / innerWidth - 0.5) * 2).toFixed(3));
        element.style.setProperty("--my", ((event.clientY / innerHeight - 0.5) * 2).toFixed(3));
      });
    };
    addEventListener("pointermove", onMove, { passive: true });

    return () => {
      observer.disconnect();
      removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="mesh-follow absolute inset-0">
        {blobs.map((blob, index) => (
          <div key={index} className="mesh-blob" style={blob.style} />
        ))}
      </div>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(var(--grid-dot) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage: "radial-gradient(ellipse 60% 55% at 72% 30%, black, transparent 75%)",
        }}
      />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: NOISE }} />
      <div
        className="absolute inset-x-0 bottom-0 h-48"
        style={{ background: "linear-gradient(to bottom, transparent, var(--background))" }}
      />
    </div>
  );
}
