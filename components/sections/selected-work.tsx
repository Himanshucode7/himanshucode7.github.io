import { projects } from "@/content/projects";
import { sections, socials, ui } from "@/content/site";
import { Reveal } from "@/components/motion/reveal";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { headingId, SectionHeading } from "@/components/ui/section-heading";
import { TextLink } from "@/components/ui/text-link";
import { ProjectCard } from "./project-card";

const github = socials.find((social) => social.id === "github");

export function SelectedWork() {
  const copy = sections.work;

  return (
    <section id={copy.id} aria-labelledby={headingId(copy)} className="section-y">
      <div className="container-page">
        <SectionHeading copy={copy} />

        {projects.length > 0 ? (
          <ol className="mt-20 grid gap-24 md:mt-28 md:gap-32">
            {projects.map((project) => (
              <Reveal as="li" key={project.slug}>
                <ProjectCard project={project} href={`/work/${project.slug}`} labels={ui} />
              </Reveal>
            ))}
          </ol>
        ) : (
          github && (
            <Reveal delay={3} className="mt-10 md:ml-[25%] md:pl-1.5">
              <TextLink href={github.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5">
                {ui.browseGithub}
                <ArrowUpRightIcon size={16} />
              </TextLink>
            </Reveal>
          )
        )}
      </div>
    </section>
  );
}
