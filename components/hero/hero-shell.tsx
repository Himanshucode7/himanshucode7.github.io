"use client";

import { useRef, useState, type CSSProperties, type ReactNode } from "react";
import { TextMask } from "@/components/motion/text-mask";
import { LocalTime } from "@/components/ui/local-time";
import { cn } from "@/lib/cn";
import { FINE_POINTER, gsap, MOTION_OK, REDUCED_MOTION, useGSAP } from "@/lib/gsap";
import { ScrollGlyph } from "./scroll-glyph";

type HeroCopy = {
  firstName: string;
  lastName: string;
  title: string;
  company: string;
  tagline: string;
  intro: string;
  city: string;
  timeZone: string;
  timeZoneLabel: string;
};

type HeroLabels = {
  cursor: string;
  scrollHint: string;
  localTime: string;
  portraitSwitch: string;
  portraitLabel: string;
};

type HeroShellProps = {
  copy: HeroCopy;
  labels: HeroLabels;
  /** Server-rendered <Photo> elements, one per look. */
  portraits: readonly ReactNode[];
};

const AUTO_SWITCH_MS = 5000;
const enterDelay = (ms: number) => ({ "--enter-delay": `${ms}ms` }) as CSSProperties;

/**
 * The hero: two black and white looks in one frame.
 * - Mouse: the side of the screen the pointer is on picks the look, with a dead
 *   zone in the middle so it never flickers; the frame drifts slightly with it.
 * - Touch: the looks alternate every few seconds; the 01/02 buttons switch at any
 *   time (and are the keyboard route on every device).
 * - Scroll: the hero is sticky; as the About panel rises over it, it recedes.
 * Reduced motion: no drift, no auto-switching, no scroll effects; swaps are instant.
 */
export function HeroShell({ copy, labels, portraits }: HeroShellProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const activeRef = useRef(0);
  const lastManualRef = useRef(0);
  const showRef = useRef<(index: number, manual?: boolean) => void>(() => {});
  const [active, setActive] = useState(0);

  useGSAP(
    (_context, contextSafe) => {
      const section = sectionRef.current;
      if (!section) return;

      const reveal = (next: number) => {
        const current = activeRef.current;
        if (next === current) return;
        const layers = section.querySelectorAll<HTMLElement>("[data-portrait]");
        const incoming = layers[next];
        const outgoing = layers[current];
        if (!incoming || !outgoing) return;

        activeRef.current = next;
        setActive(next);

        // Finish any wipe in progress, then sweep the new look in from its own side.
        gsap.killTweensOf([incoming, outgoing]);
        gsap.set(outgoing, { zIndex: 1, "--wipe": "120%" });
        gsap.set(incoming, { zIndex: 2, "--wipe-dir": next > current ? "to left" : "to right" });

        if (matchMedia(REDUCED_MOTION).matches) {
          gsap.set(incoming, { "--wipe": "120%" });
          gsap.set(outgoing, { "--wipe": "0%" });
          return;
        }

        gsap.fromTo(
          incoming,
          { "--wipe": "0%" },
          {
            "--wipe": "120%",
            duration: 1.25,
            ease: "power3.inOut",
            onComplete: () => {
              gsap.set(outgoing, { "--wipe": "0%" });
            },
          },
        );
        const image = incoming.querySelector("img");
        if (image) gsap.fromTo(image, { scale: 1.12 }, { scale: 1, duration: 1.8, ease: "expo.out" });
      };

      const show = contextSafe ? contextSafe(reveal) : reveal;
      showRef.current = (index, manual = false) => {
        // A manual pick pauses auto-switching for one interval.
        if (manual) lastManualRef.current = performance.now();
        show(index);
      };

      const mm = gsap.matchMedia();

      // As the About panel slides over the sticky hero, the frame recedes and the words fade.
      mm.add(MOTION_OK, () => {
        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: { start: 0, end: () => window.innerHeight, scrub: true },
          })
          .to("[data-hero-stage]", { scale: 0.9, yPercent: -3 }, 0)
          .to("[data-hero-shade]", { opacity: 0.75 }, 0)
          .to("[data-hero-content]", { yPercent: -10, opacity: 0 }, 0);
      });

      mm.add({ fine: FINE_POINTER, reduce: REDUCED_MOTION }, (context) => {
        const { fine, reduce } = context.conditions as { fine: boolean; reduce: boolean };

        if (fine) {
          const parallax = section.querySelector<HTMLElement>("[data-hero-parallax]");
          const xTo = parallax && !reduce ? gsap.quickTo(parallax, "x", { duration: 1.4, ease: "power3" }) : null;
          const yTo = parallax && !reduce ? gsap.quickTo(parallax, "y", { duration: 1.4, ease: "power3" }) : null;

          const onMove = (event: PointerEvent) => {
            if (event.pointerType !== "mouse" || scrollY > innerHeight) return;
            const offset = event.clientX - innerWidth / 2;
            const deadZone = Math.max(30, innerWidth * 0.05);
            if (Math.abs(offset) > deadZone) show(offset < 0 ? 0 : 1);
            xTo?.((event.clientX / innerWidth - 0.5) * -28);
            yTo?.((event.clientY / innerHeight - 0.5) * -18);
          };

          addEventListener("pointermove", onMove, { passive: true });
          return () => removeEventListener("pointermove", onMove);
        }

        if (reduce) return;

        const timer = setInterval(() => {
          if (document.hidden || scrollY > innerHeight * 0.6) return;
          if (performance.now() - lastManualRef.current < AUTO_SWITCH_MS) return;
          show((activeRef.current + 1) % portraits.length);
        }, AUTO_SWITCH_MS);
        return () => clearInterval(timer);
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="top"
      aria-labelledby="hero-title"
      className="hero tone-dark"
      data-cursor={labels.cursor}
    >
      <div className="hero-stage" data-hero-stage>
        <div className="hero-settle">
          <div className="hero-parallax" data-hero-parallax>
            {portraits.map((portrait, index) => (
              <div
                key={index}
                className="hero-portrait"
                data-portrait
                data-index={index}
                aria-hidden={active !== index}
                style={{ "--wipe": index === 0 ? "120%" : "0%", zIndex: index === 0 ? 2 : 1 } as CSSProperties}
              >
                {portrait}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="hero-scrim" aria-hidden="true" />
      <div className="hero-shade" data-hero-shade aria-hidden="true" />

      <div className="hero-content" data-hero-content>
        <div className="hero-intro enter" style={enterDelay(250)}>
          <p className="label text-foreground/75">
            {copy.title} <span aria-hidden="true">—</span> {copy.company}
          </p>
          <p className="hero-tagline mt-4">{copy.tagline}</p>
          <p className="hero-caption mt-4 max-w-[36ch] text-caption text-foreground/70">{copy.intro}</p>
        </div>

        <h1 id="hero-title" className="hero-name">
          <TextMask as="span" className="block" lines={[copy.firstName, copy.lastName]} startAt={1} />
          <span className="sr-only">, {copy.title}</span>
        </h1>

        <div className="hero-meta enter" style={enterDelay(450)}>
          <div className="flex items-center justify-between gap-4 border-b border-foreground/20 pb-3">
            <span className="flex items-center gap-3">
              <ScrollGlyph />
              <span className="label text-foreground/75">{labels.scrollHint}</span>
            </span>
            <div role="group" aria-label={labels.portraitSwitch} className="flex items-center gap-1">
              {portraits.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-pressed={active === index}
                  onClick={() => showRef.current(index, true)}
                  className={cn(
                    "inline-flex h-9 min-w-9 items-center justify-center rounded-full px-2 font-mono text-[0.75rem] transition-colors duration-(--duration-micro)",
                    active === index ? "bg-foreground text-background" : "text-foreground/70 hover:text-foreground",
                  )}
                >
                  <span className="sr-only">{labels.portraitLabel} </span>
                  {String(index + 1).padStart(2, "0")}
                </button>
              ))}
            </div>
          </div>
          <div className="hero-clock mt-4">
            <p className="label text-foreground/75">
              {copy.city} <span aria-hidden="true">—</span> {labels.localTime}
            </p>
            <p className="hero-time mt-2">
              <LocalTime timeZone={copy.timeZone} suffix={copy.timeZoneLabel} />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
