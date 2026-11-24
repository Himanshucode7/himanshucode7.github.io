import type { Project } from "@/content/types";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { ProjectGlyph } from "./project-glyph";

type Labels = { inProgress: string; code: string; live: string };

/**
 * One project in the scattered gallery. Text-first: index, context, a line
 * drawing, the summary and stack. Real links render only when they exist;
 * otherwise the tile says plainly that the case study is still being written.
 */
export function ProjectTile({ project, index, labels }: { project: Project; index: number; labels: Labels }) {
  const links = [
    project.links?.github ? { label: labels.code, href: project.links.github } : null,
    project.links?.live ? { label: labels.live, href: project.links.live } : null,
  ].filter((link) => link !== null);

  return (
    <article className="flex flex-col rounded-card border border-border bg-surface p-5 md:p-6">
      <div className="flex items-start justify-between gap-4">
        <span className="label text-foreground">{String(index + 1).padStart(2, "0")}</span>
        <span className="label text-right">
          {project.context} · {project.year}
        </span>
      </div>

      {/* Takes the free height of the tile, never less than the drawing itself. */}
      <div className="flex flex-1 items-center justify-center py-7 md:py-8">
        <ProjectGlyph name={project.glyph} className="w-full max-w-40 text-foreground/80" />
      </div>

      <div>
        <h3 className="text-h3 font-medium">{project.title}</h3>
        <p className="mt-2 text-small text-muted">{project.summary}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.map((item) => (
            <li key={item} className="rounded-full border border-border px-2.5 py-1 font-mono text-[0.6875rem] text-muted">
              {item}
            </li>
          ))}
        </ul>

        {links.length > 0 ? (
          <ul className="mt-5 flex flex-wrap gap-4">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-small font-medium text-accent-text underline decoration-accent-text/40 underline-offset-4 hover:decoration-accent-text"
                >
                  {link.label}
                  <span className="sr-only">: {project.title}</span>
                  <ArrowUpRightIcon size={14} />
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-5 flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.06em] text-accent-text uppercase">
            <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
            {labels.inProgress}
          </p>
        )}
      </div>
    </article>
  );
}
