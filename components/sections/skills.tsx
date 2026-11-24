import { Fragment } from "react";
import { capabilities } from "@/content/capabilities";
import { sections } from "@/content/site";
import { Reveal } from "@/components/motion/reveal";
import { headingId, SectionHeading } from "@/components/ui/section-heading";

export function Skills() {
  const copy = sections.skills;
  const { skills, principles } = capabilities;

  return (
    <section id={copy.id} aria-labelledby={headingId(copy)} className="tone-dark section-y">
      <div className="container-page">
        <SectionHeading copy={copy} />

        <dl className="mt-16 border-t border-border md:mt-24">
          {skills.map((group, index) => (
            <Reveal key={group.id} delay={index} className="grid gap-3 border-b border-border py-6 md:grid-cols-12 md:gap-6 md:py-7">
              <dt className="label md:col-span-3 md:pt-2">{group.title}</dt>
              <dd className="md:col-span-9">
                <ul className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1 text-list font-medium">
                  {group.items.map((item, itemIndex) => (
                    <Fragment key={item}>
                      {itemIndex > 0 && (
                        <li aria-hidden="true" className="text-muted/60 select-none">
                          /
                        </li>
                      )}
                      <li>{item}</li>
                    </Fragment>
                  ))}
                </ul>
              </dd>
            </Reveal>
          ))}
        </dl>

        <div className="mt-20 grid gap-6 md:mt-28 md:grid-cols-12">
          <Reveal className="md:col-span-3">
            <h3 className="label pt-1">{principles.title}</h3>
          </Reveal>
          <ul className="grid gap-10 sm:grid-cols-3 sm:gap-6 md:col-span-9">
            {principles.items.map((item, index) => (
              <Reveal as="li" key={item.title} delay={index}>
                <p className="text-h3 font-medium">{item.title}</p>
                <p className="mt-3 max-w-[32ch] text-small text-muted">{item.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
