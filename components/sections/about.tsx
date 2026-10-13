import Image from "next/image";
import { Fragment, type CSSProperties } from "react";
import { capabilities } from "@/content/capabilities";
import { profile } from "@/content/profile";
import { sections, ui } from "@/content/site";
import { Reveal } from "@/components/motion/reveal";
import { Card, CardLabel } from "@/components/ui/card";
import { headingId, SectionHeading } from "@/components/ui/section-heading";

/** Splits a paragraph into words carrying their position (0–1) for the scroll highlight. */
function ScrubText({ text }: { text: string }) {
  const words = text.split(" ");
  const last = Math.max(words.length - 1, 1);
  return (
    <p className="scrub text-statement font-medium">
      {words.map((word, index) => (
        <Fragment key={index}>
          <span className="scrub-word" style={{ "--p": (index / last).toFixed(3) } as CSSProperties}>
            {word}
          </span>{" "}
        </Fragment>
      ))}
    </p>
  );
}

export function About() {
  const copy = sections.about;
  const [lead, ...rest] = profile.bio;
  const { stack, principles, stat, highlights } = capabilities;

  return (
    <section id={copy.id} aria-labelledby={headingId(copy)} className="section-y">
      <div className="container-page">
        <SectionHeading copy={copy} />

        <div className="mt-16 grid gap-10 md:mt-20 md:grid-cols-12 md:gap-6">
          <Reveal className="md:col-span-3">
            <div className="relative aspect-[4/5] w-40 overflow-hidden rounded-card border border-border bg-surface-raised md:w-full md:max-w-60">
              <Image
                src={profile.portrait.src}
                alt={profile.portrait.alt}
                fill
                sizes="(min-width: 768px) 240px, 160px"
                placeholder="blur"
                className="object-cover object-[50%_28%]"
              />
            </div>
          </Reveal>
          <div className="grid gap-8 md:col-span-9">
            <ScrubText text={lead} />
            {rest.map((paragraph, index) => (
              <Reveal key={index} delay={index}>
                <p className="max-w-[62ch] text-muted">{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <ul className="mt-20 grid gap-4 md:mt-28 md:grid-cols-12" aria-label={ui.capabilities}>
          <Reveal as="li" className="md:col-span-7">
            <Card className="h-full">
              <CardLabel>{stack.title}</CardLabel>
              <ul className="mt-6 flex flex-wrap gap-2">
                {stack.items.map((item) => (
                  <li key={item} className="rounded-full border border-border bg-background px-3.5 py-1.5 text-small">
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>

          <Reveal as="li" delay={1} className="md:col-span-5">
            <Card className="flex h-full flex-col justify-between gap-10">
              <CardLabel>{stat.label}</CardLabel>
              <div>
                <p className="text-h2 font-semibold tabular-nums">{stat.value}</p>
                <p className="mt-3 text-small text-muted">{stat.detail}</p>
              </div>
            </Card>
          </Reveal>

          <Reveal as="li" className="md:col-span-7">
            <Card className="h-full">
              <CardLabel>{principles.title}</CardLabel>
              <dl className="mt-6 grid gap-6 sm:grid-cols-3">
                {principles.items.map((item) => (
                  <div key={item.title}>
                    <dt className="font-medium">{item.title}</dt>
                    <dd className="mt-2 text-small text-muted">{item.body}</dd>
                  </div>
                ))}
              </dl>
            </Card>
          </Reveal>

          <Reveal as="li" delay={1} className="md:col-span-5">
            <Card className="h-full">
              <CardLabel>{highlights.title}</CardLabel>
              <dl className="mt-6 grid gap-5">
                {highlights.items.map((item) => (
                  <div key={item.title}>
                    <dt className="font-medium">{item.title}</dt>
                    <dd className="mt-1 text-small text-muted">{item.body}</dd>
                  </div>
                ))}
              </dl>
            </Card>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}
