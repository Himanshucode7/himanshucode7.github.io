"use client";

import { useEffect, useRef, type ReactNode } from "react";

const QUERY = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

/**
 * Pulls its child a few pixels toward the cursor (max `strength` px), then
 * springs back with the --ease-spring curve. Desktop pointers only: disabled on
 * touch and for reduced motion. Writes transform directly — no React state per frame.
 */
export function Magnetic({ children, strength = 8 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || !matchMedia(QUERY).matches) return;

    let frame = 0;
    const clamp = (value: number) => Math.max(-1, Math.min(1, value));

    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        const x = clamp((event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2));
        const y = clamp((event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2));
        element.style.transform = `translate3d(${x * strength}px, ${y * strength * 0.6}px, 0)`;
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(frame);
      element.style.transform = "";
    };

    element.addEventListener("pointermove", onMove);
    element.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      element.removeEventListener("pointermove", onMove);
      element.removeEventListener("pointerleave", onLeave);
      element.style.transform = "";
    };
  }, [strength]);

  return (
    <span ref={ref} className="magnetic inline-flex">
      {children}
    </span>
  );
}
