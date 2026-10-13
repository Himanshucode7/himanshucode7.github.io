import type { SectionCopy } from "@/content/types";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/cn";

/** Id of a section's h2, for the section's aria-labelledby. */
export function headingId(copy: SectionCopy) {
  return `${copy.id}-heading`;
}

export function SectionHeading({ copy, className }: { copy: SectionCopy; className?: string }) {
  return (
    <div className={cn("grid gap-6 md:grid-cols-12 md:gap-6", className)}>
      <Reveal className="md:col-span-3">
        <p className="label flex items-center gap-2 pt-2">
          <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
          {copy.label}
        </p>
      </Reveal>
      <div className="grid gap-6 md:col-span-9">
        <Reveal delay={1}>
          <h2 id={headingId(copy)} className="text-h2 font-semibold">
            {copy.title}
          </h2>
        </Reveal>
        {copy.intro && (
          <Reveal delay={2}>
            <p className="max-w-[60ch] text-lead text-muted">{copy.intro}</p>
          </Reveal>
        )}
      </div>
    </div>
  );
}
