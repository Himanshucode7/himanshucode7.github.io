/**
 * The one place GSAP is set up. Import gsap, ScrollTrigger and useGSAP from here
 * (client components only) so the plugins are registered exactly once.
 * useGSAP scopes every animation to a component and reverts it on unmount,
 * which also makes React Strict Mode's double effects safe.
 */
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Media queries shared by every animated component. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
export const FINE_POINTER = "(hover: hover) and (pointer: fine)";

export { gsap, ScrollTrigger, useGSAP };
