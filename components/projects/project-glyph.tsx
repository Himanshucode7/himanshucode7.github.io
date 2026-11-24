import type { ReactNode } from "react";
import type { ProjectGlyph as GlyphName } from "@/content/types";

/*
 * Line drawings that hint at what each project is about, standing in for
 * screenshots until the case studies exist. Purely decorative.
 */
const glyphs: Record<GlyphName, ReactNode> = {
  // A role at the top, permissions fanning out, each with an on/off toggle.
  access: (
    <>
      <circle cx="80" cy="16" r="7" />
      <path d="M80 23v13M32 36h96M32 36v10M80 36v10M128 36v10" />
      <circle cx="32" cy="54" r="7" />
      <circle cx="80" cy="54" r="7" />
      <circle cx="128" cy="54" r="7" />
      <rect x="18" y="74" width="28" height="14" rx="7" />
      <rect x="66" y="74" width="28" height="14" rx="7" />
      <rect x="114" y="74" width="28" height="14" rx="7" />
      <circle cx="39" cy="81" r="4" fill="currentColor" />
      <circle cx="73" cy="81" r="4" />
      <circle cx="135" cy="81" r="4" fill="currentColor" />
    </>
  ),
  // Escalating alerts against a dashed SLA line.
  alerts: (
    <>
      <path d="M8 88h144" />
      <path d="M8 40h144" strokeDasharray="3 5" />
      <path d="M28 88V74M58 88V62M88 88V46M118 88V26" />
      <circle cx="28" cy="70" r="4" />
      <circle cx="58" cy="58" r="4" />
      <circle cx="88" cy="42" r="4" />
      <circle cx="118" cy="22" r="5" fill="currentColor" />
      <path d="M134 22h12" />
    </>
  ),
  // A sheet of components: button, toggle, input, card.
  components: (
    <>
      <rect x="10" y="8" width="66" height="38" rx="6" />
      <rect x="22" y="20" width="42" height="14" rx="7" />
      <rect x="84" y="8" width="66" height="38" rx="6" />
      <rect x="100" y="20" width="34" height="14" rx="7" />
      <circle cx="127" cy="27" r="4" fill="currentColor" />
      <rect x="10" y="54" width="66" height="38" rx="6" />
      <path d="M22 78h42M22 70h18" />
      <rect x="84" y="54" width="66" height="38" rx="6" />
      <path d="M84 70h66M96 80h30" />
    </>
  ),
  // A loading waterfall with an LCP marker.
  performance: (
    <>
      <path d="M12 18h50M24 32h62M40 46h40M52 60h64M70 74h38" />
      <path d="M124 8v84" strokeDasharray="3 5" />
      <circle cx="124" cy="60" r="4" fill="currentColor" />
      <path d="M12 92h140" />
    </>
  ),
  // UI and server, with a cache in between catching repeat requests.
  data: (
    <>
      <rect x="8" y="30" width="38" height="40" rx="6" />
      <rect x="114" y="30" width="38" height="40" rx="6" />
      <ellipse cx="80" cy="36" rx="16" ry="6" />
      <path d="M64 36v28c0 3.3 7.2 6 16 6s16-2.7 16-6V36" />
      <path d="M46 44h14M100 44h14M60 56H46M114 56h-14" />
      <path d="m56 40 4 4-4 4M50 52l-4 4 4 4" />
    </>
  ),
  // A page in phases: hero, panel, gallery, outro.
  scroll: (
    <>
      <rect x="52" y="6" width="56" height="88" rx="8" />
      <path d="M52 30h56M52 52h56M52 74h56" />
      <rect x="62" y="38" width="12" height="9" rx="2" />
      <rect x="86" y="58" width="12" height="9" rx="2" />
      <path d="M128 30v40M122 64l6 6 6-6" />
    </>
  ),
};

export function ProjectGlyph({ name, className }: { name: GlyphName; className?: string }) {
  return (
    <svg
      viewBox="0 0 160 100"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {glyphs[name]}
    </svg>
  );
}
