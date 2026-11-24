"use client";

import { useRef } from "react";
import { FINE_POINTER, gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

/**
 * A ring that trails the pointer over areas marked `data-cursor="hint text"`
 * (the hero), showing the hint inside it. Mouse pointers only, never with
 * reduced motion, and it steps aside over links and buttons so the native
 * pointer is always there for anything clickable.
 */
export function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const cursor = ref.current;
    const hint = hintRef.current;
    if (!cursor || !hint) return;

    const mm = gsap.matchMedia();
    mm.add(`${FINE_POINTER} and ${MOTION_OK}`, () => {
      const root = document.documentElement;
      const xTo = gsap.quickTo(cursor, "x", { duration: 0.5, ease: "power3" });
      const yTo = gsap.quickTo(cursor, "y", { duration: 0.5, ease: "power3" });
      let pointer: { x: number; y: number } | null = null;
      let frame = 0;
      root.classList.add("has-cursor");

      const update = (target: Element | null, x: number, y: number) => {
        const area = target?.closest<HTMLElement>("[data-cursor]");
        const visible = Boolean(area) && !target?.closest("a, button");
        if (visible && !cursor.hasAttribute("data-visible")) gsap.set(cursor, { x, y });
        cursor.toggleAttribute("data-visible", visible);
        const text = area?.dataset.cursor ?? "";
        if (hint.textContent !== text) hint.textContent = text;
        xTo(x);
        yTo(y);
      };

      const onMove = (event: PointerEvent) => {
        if (event.pointerType !== "mouse") return;
        pointer = { x: event.clientX, y: event.clientY };
        update(event.target instanceof Element ? event.target : null, pointer.x, pointer.y);
      };

      // Scrolling moves content under a still pointer, so re-check what it is over.
      const onScroll = () => {
        if (!pointer || frame) return;
        frame = requestAnimationFrame(() => {
          frame = 0;
          if (pointer) update(document.elementFromPoint(pointer.x, pointer.y), pointer.x, pointer.y);
        });
      };

      const onLeave = () => {
        pointer = null;
        cursor.removeAttribute("data-visible");
      };

      addEventListener("pointermove", onMove, { passive: true });
      addEventListener("scroll", onScroll, { passive: true });
      root.addEventListener("pointerleave", onLeave);

      return () => {
        cancelAnimationFrame(frame);
        removeEventListener("pointermove", onMove);
        removeEventListener("scroll", onScroll);
        root.removeEventListener("pointerleave", onLeave);
        root.classList.remove("has-cursor");
        cursor.removeAttribute("data-visible");
      };
    });
  });

  return (
    <div ref={ref} className="cursor" aria-hidden="true">
      <div className="cursor-ring">
        <span ref={hintRef} className="cursor-hint" />
      </div>
    </div>
  );
}
