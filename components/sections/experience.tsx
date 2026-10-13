import { experience } from "@/content/experience";
import { sections, ui } from "@/content/site";
import { Reveal } from "@/components/motion/reveal";
import { headingId, SectionHeading } from "@/components/ui/section-heading";
import { formatRange } from "@/lib/format";
import { ExperienceRow } from "./experience-row";

export function Experience() {
  const copy = sections.experience;
  // Open the first row that has details, so the content is visible without interaction.
  const firstExpandable = experience.find((item) => item.highlights.length > 0)?.id;

  return (
    <section id={copy.id} aria-labelledby={headingId(copy)} className="section-y">
      <div className="container-page">
        <SectionHeading copy={copy} />

        <div className="mt-16 grid md:mt-20 md:grid-cols-12 md:gap-6">
          <ol className="border-b border-border md:col-span-9 md:col-start-4">
            {experience.map((item, index) => (
              <Reveal as="li" key={item.id} delay={index} className="relative">
                <span className="draw-line absolute inset-x-0 top-0 h-px bg-border" aria-hidden="true" />
                <ExperienceRow
                  role={item.role}
                  company={item.company}
                  location={item.location}
                  range={formatRange(item.start, item.end)}
                  summary={item.summary}
                  highlights={item.highlights}
                  labels={{ show: ui.showDetails, hide: ui.hideDetails }}
                  defaultOpen={item.id === firstExpandable}
                />
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
