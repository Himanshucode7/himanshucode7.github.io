import { projects } from "@/content/projects";
import { sections, socials, ui } from "@/content/site";
import { Reveal } from "@/components/motion/reveal";
import { ProjectTile } from "@/components/projects/project-tile";
import { ScatterGallery } from "@/components/projects/scatter-gallery";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { headingId, SectionHeading } from "@/components/ui/section-heading";
import { TextLink } from "@/components/ui/text-link";
import { scatterPlacements } from "@/lib/scatter-layout";

const github = socials.find((social) => social.id === "github");

/** The black panel: section heading, then the scattered gallery of projects. */
export function Projects() {
  const copy = sections.projects;
  const placements = scatterPlacements(projects.length);

  return (
    <section id={copy.id} aria-labelledby={headingId(copy)} className="tone-dark section-y">
      <div className="container-page">
        <SectionHeading copy={copy} />
        {github && (
          <Reveal delay={3} className="mt-8 md:ml-[25%] md:pl-1.5">
            <TextLink href={github.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5">
              {ui.browseGithub}
              <ArrowUpRightIcon size={16} />
            </TextLink>
          </Reveal>
        )}
      </div>

      <ScatterGallery className="mx-auto mt-16 max-w-[1680px] px-[calc(var(--gutter)-6px)] md:mt-24">
        {projects.map((project, index) => (
          <li key={project.id} data-tile className="scatter-tile p-1.5" style={placements[index]}>
            {/* Grid, so the tile stretches to the ratio yet still grows if its text needs more room. */}
            <div className="grid aspect-[4/5] sm:aspect-[2/3]">
              <ProjectTile
                project={project}
                index={index}
                labels={{ inProgress: ui.caseStudyInProgress, code: ui.viewCode, live: ui.viewLive }}
              />
            </div>
          </li>
        ))}
      </ScatterGallery>
    </section>
  );
}
