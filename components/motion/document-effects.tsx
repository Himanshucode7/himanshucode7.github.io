"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * The single IntersectionObserver behind every <Reveal>.
 *
 * Nothing is hidden until the observer's first callback has run: whatever is
 * already on screen at that point is marked revealed first, then the "ready"
 * flag hides the rest (all off-screen, so nothing visibly blinks). Using the
 * observer's own first callback avoids forcing a synchronous layout on mount.
 * After client-side navigations, new content animates in as it enters view.
 */
export function DocumentEffects() {
  const pathname = usePathname();
  const firstLoad = useRef(true);

  useEffect(() => {
    const root = document.documentElement;
    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])");
    let initial = firstLoad.current;
    firstLoad.current = false;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // First pass: anything physically on screen counts, ignoring the -10% margin,
          // so an element near the bottom edge is never hidden while visible.
          const onScreen =
            initial && entry.boundingClientRect.top < innerHeight && entry.boundingClientRect.bottom > 0;
          if (!entry.isIntersecting && !onScreen) continue;
          entry.target.setAttribute("data-revealed", "");
          observer.unobserve(entry.target);
        }
        if (initial) {
          initial = false;
          root.setAttribute("data-reveal-ready", "");
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    targets.forEach((element) => observer.observe(element));
    if (!initial || targets.length === 0) root.setAttribute("data-reveal-ready", "");

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
