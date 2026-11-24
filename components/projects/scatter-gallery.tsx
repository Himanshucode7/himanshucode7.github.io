"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";

/** Share of the viewport height a tile takes to grow in from the bottom edge… */
const ENTER = 0.55;
/** …and to shrink away at the top edge. */
const EXIT = 0.35;

/**
 * The project list as a scattered grid whose tiles grow in as they enter the
 * viewport and shrink away as they leave it (each from its inner bottom corner).
 * Scale is derived from each tile's position, so scrolling back reverses it
 * exactly. Without motion, or before JavaScript runs, every tile is full size.
 */
export function ScatterGallery({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tiles = gsap.utils.toArray<HTMLElement>("[data-tile]");
        for (const tile of tiles) {
          // The tile (grid cell) is measured; only its card is scaled, so
          // ScrollTrigger never measures a box that is itself being transformed.
          const card = tile.firstElementChild;
          if (!(card instanceof HTMLElement)) continue;
          // quickTo drives one property at a time, so the `scale` shorthand is split.
          const toX = gsap.quickTo(card, "scaleX", { duration: 0.5, ease: "power3.out" });
          const toY = gsap.quickTo(card, "scaleY", { duration: 0.5, ease: "power3.out" });
          const scaleTo = (value: number, from?: number) => {
            toX(value, from);
            toY(value, from);
          };
          let settled = false;

          const apply = (self: ScrollTrigger) => {
            const viewport = window.innerHeight;
            const distance = self.end - self.start;
            const travelled = self.progress * distance;
            const enter = gsap.utils.clamp(0, 1, travelled / (viewport * ENTER));
            const exit = gsap.utils.clamp(0, 1, (distance - travelled) / (viewport * EXIT));
            const scale = Math.min(enter, exit);
            // First measurement jumps straight to the value instead of animating from full size.
            if (settled) scaleTo(scale);
            else scaleTo(scale, scale);
            settled = true;
          };

          ScrollTrigger.create({
            trigger: tile,
            start: "top bottom",
            end: "bottom top",
            onUpdate: apply,
            onRefresh: apply,
          });
        }
      });
    },
    { scope: ref },
  );

  return (
    <ol ref={ref} className={cn("scatter", className)}>
      {children}
    </ol>
  );
}
