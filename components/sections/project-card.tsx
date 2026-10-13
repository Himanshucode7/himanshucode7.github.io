import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/types";
import { ArrowRightIcon } from "@/components/ui/icons";

type Labels = { readCaseStudy: string; pendingMetric: string };

/**
 * Editorial project preview. The title link is stretched over the whole card, so
 * there is one tab stop and one accessible name, and nothing depends on hover.
 */
export function ProjectCard({ project, href, labels }: { project: Project; href: string; labels: Labels }) {
  return (
    <article className="group relative grid gap-6 md:grid-cols-12 md:items-end md:gap-6">
      <div className="relative aspect-[16/10] overflow-hidden rounded-card border border-border bg-surface-raised md:col-span-8">
        {project.cover ? (
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            sizes="(min-width: 768px) 66vw, 100vw"
            placeholder="blur"
            className="object-cover transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.03] motion-reduce:transition-none"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center" aria-hidden="true">
            <div
              className="absolute inset-0 transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.03] motion-reduce:transition-none"
              style={{ background: "radial-gradient(60% 70% at 70% 20%, var(--mesh-1), transparent)" }}
            />
            <span className="relative px-8 text-center text-h2 font-semibold text-foreground/80">{project.title}</span>
          </div>
        )}
      </div>

      <div className="grid gap-4 md:col-span-4 md:pb-2">
        <p className="label">{project.year}</p>
        <h3 className="text-h3 font-semibold">
          <Link href={href} className="after:absolute after:inset-0 after:rounded-card focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-(--focus-ring)">
            {project.title}
          </Link>
        </h3>
        <p className="text-muted">{project.problem}</p>
        <p>{project.contribution}</p>
        <ul className="flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <li key={item} className="rounded-full border border-border px-3 py-1 font-mono text-[0.75rem] text-muted">
              {item}
            </li>
          ))}
        </ul>
        <dl className="flex items-baseline gap-2 text-small">
          <dt className="text-muted">{project.outcome.label}</dt>
          <dd className="font-medium">{project.outcome.value ?? labels.pendingMetric}</dd>
        </dl>
        <span className="inline-flex items-center gap-2 text-small font-medium text-accent-text" aria-hidden="true">
          {labels.readCaseStudy}
          <ArrowRightIcon size={16} className="transition-transform duration-(--duration-ui) ease-out-expo group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}
