"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

/**
 * Scrubs the closing scene as it scrolls through its pinned stage:
 * the photo rises out of the dark, black washes to paper, the headline lines
 * rise, and the call to action grows from the bottom-right corner.
 * The markup is the finished scene, so without motion nothing is hidden.
 */
export function OutroScene({ labelledBy, children }: { labelledBy: string; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = ref.current;
      if (!section) return;
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: { trigger: section, start: "top 75%", end: "bottom bottom", scrub: 0.6 },
          })
          .fromTo(
            "[data-outro-photo]",
            { clipPath: "inset(100% 0% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 0.32, ease: "power2.out" },
            0,
          )
          .fromTo("[data-outro-photo] img", { scale: 1.3 }, { scale: 1, duration: 0.45, ease: "power2.out" }, 0)
          .fromTo("[data-outro-wash]", { opacity: 0 }, { opacity: 1, duration: 0.22 }, 0.34)
          .fromTo(
            "[data-outro-line]",
            { yPercent: 110 },
            { yPercent: 0, duration: 0.24, stagger: 0.05, ease: "power3.out" },
            0.5,
          )
          .fromTo("[data-outro-fade]", { opacity: 0 }, { opacity: 1, duration: 0.14 }, 0.66)
          .fromTo("[data-outro-cta]", { scale: 0 }, { scale: 1, duration: 0.26, ease: "power3.out" }, 0.7)
          // Hold the finished scene for the last stretch of the pin.
          .to({}, { duration: 0.1 });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} aria-labelledby={labelledBy} className="outro">
      {children}
    </section>
  );
}
