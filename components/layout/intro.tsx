/**
 * Once-per-session intro: the name rises, then the curtain lifts (≈1.1s total).
 * Pure CSS, only rendered visible when the inline script set html[data-intro].
 * It never blocks input (pointer-events: none) and is hidden from assistive tech;
 * the real page underneath is already rendered and interactive.
 */
export function Intro({ name }: { name: string }) {
  return (
    <div
      aria-hidden="true"
      className="intro pointer-events-none fixed inset-0 z-100 place-items-center bg-background"
    >
      <span className="mask-line">
        <span className="intro-name block text-h2 font-semibold">{name}</span>
      </span>
    </div>
  );
}
