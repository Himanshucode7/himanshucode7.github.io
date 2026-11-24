import { Fragment, type CSSProperties } from "react";
import { capabilities } from "@/content/capabilities";
import { media } from "@/content/media";
import { profile } from "@/content/profile";
import { sections, ui } from "@/content/site";
import { Photo } from "@/components/media/photo";
import { Reveal } from "@/components/motion/reveal";
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

/**
 * The light panel that slides up over the sticky hero (it sits above it in the
 * stacking order and has an opaque background).
 */
export function About() {
  const copy = sections.about;
  const [lead, ...rest] = profile.bio;
  const { stat, highlights } = capabilities;
  const photo = media.about;

  return (
    <section id={copy.id} aria-labelledby={headingId(copy)} className="tone-light relative z-10 section-y">
      <div className="container-page">
        <SectionHeading copy={copy} />

        <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-12 md:gap-6">
          <Reveal className="md:col-span-5 lg:col-span-4">
            <figure className="md:sticky md:top-[calc(var(--header-height)+32px)]">
              <div
                className="relative overflow-hidden rounded-photo bg-surface-raised"
                style={{ aspectRatio: `${photo.asset.width} / ${photo.asset.height}` }}
              >
                <Photo
                  photo={photo}
                  sizes="(min-width: 1024px) 30vw, (min-width: 768px) 40vw, 92vw"
                  className="absolute inset-0 size-full object-cover"
                />
              </div>
              <figcaption className="label mt-4 flex justify-between gap-4">
                <span>{profile.name}</span>
                <span>{profile.location}</span>
              </figcaption>
            </figure>
          </Reveal>

          <div className="grid content-start gap-8 md:col-span-7 md:col-start-6 lg:col-start-6">
            <ScrubText text={lead} />
            {rest.map((paragraph, index) => (
              <Reveal key={index} delay={index}>
                <p className="max-w-[60ch] text-muted">{paragraph}</p>
              </Reveal>
            ))}

            <Reveal>
              <dl className="mt-6 grid border-t border-border sm:grid-cols-2" aria-label={ui.capabilities}>
                <div className="border-b border-border py-6 sm:pr-6">
                  <dt className="label">{stat.label}</dt>
                  <dd className="mt-3 text-h2 font-medium tabular-nums">{stat.value}</dd>
                  <dd className="mt-2 text-small text-muted">{stat.detail}</dd>
                </div>
                {highlights.items.map((item) => (
                  <div key={item.title} className="border-b border-border py-6 sm:odd:pr-6 sm:even:pl-6">
                    <dt className="font-medium">{item.title}</dt>
                    <dd className="mt-2 text-small text-muted">{item.body}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
