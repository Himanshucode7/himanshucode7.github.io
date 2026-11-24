"use client";

import { useEffect, useRef } from "react";

const SYMBOLS = ["{}", "</>", "=>", "&&", "//", "#", "*"] as const;
const THROTTLE_MS = 80;

/**
 * A small circled glyph that flickers through code symbols while the page
 * scrolls (at most every 80ms). Decorative; still with reduced motion.
 */
export function ScrollGlyph() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let last = 0;
    let index = 0;

    const onScroll = () => {
      const now = performance.now();
      if (now - last < THROTTLE_MS || scrollY > innerHeight * 1.5) return;
      last = now;
      // Always step to a different symbol.
      index = (index + 1 + Math.floor(Math.random() * (SYMBOLS.length - 1))) % SYMBOLS.length;
      if (ref.current) ref.current.textContent = SYMBOLS[index];
    };

    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  return (
    <span
      className="inline-grid size-8 shrink-0 place-items-center rounded-full border-[1.5px] border-current"
      aria-hidden="true"
    >
      <span ref={ref} className="font-mono text-[0.6875rem] leading-none">
        {SYMBOLS[0]}
      </span>
    </span>
  );
}
