import { media } from "@/content/media";
import { profile } from "@/content/profile";
import { outro, ui } from "@/content/site";
import { Photo } from "@/components/media/photo";
import { OutroScene } from "@/components/outro/outro-scene";
import { ArrowUpRightIcon } from "@/components/ui/icons";

const TITLE_ID = "outro-title";

/**
 * The closing scene between Skills and Contact. Black at first (continuing the
 * Skills section), it washes to paper as it plays; the call to action is a real
 * mailto link, and the Contact section right below repeats every route.
 */
export function Outro() {
  const photo = media.outro;

  return (
    <OutroScene labelledBy={TITLE_ID}>
      <div className="outro-stage tone-dark">
        <div className="outro-wash" data-outro-wash aria-hidden="true" />

        <div className="tokens-light container-page flex h-full min-h-[inherit] flex-col gap-6 pt-[calc(var(--header-height)+3svh)] pb-(--edge) md:grid md:grid-cols-12 md:grid-rows-[auto_1fr] md:gap-x-6 md:gap-y-0">
          <div className="md:col-span-7">
            <h2 id={TITLE_ID} className="text-display font-medium">
              {outro.title.map((line) => (
                <span key={line} className="outro-mask">
                  <span data-outro-line>{line}</span>
                </span>
              ))}
            </h2>
            <p className="label mt-6 normal-case tracking-normal md:mt-8" data-outro-fade>
              <a
                href={`mailto:${profile.email}`}
                className="underline decoration-current/30 underline-offset-4 transition-colors hover:text-foreground"
              >
                {profile.email}
              </a>
            </p>
          </div>

          <div
            data-outro-photo
            className="relative min-h-0 w-[min(100%,52svh)] flex-1 self-center overflow-hidden rounded-photo md:col-span-4 md:col-start-9 md:row-span-2 md:w-[min(100%,48svh)] md:flex-none md:self-start md:justify-self-end"
            style={{ aspectRatio: `${photo.asset.width} / ${photo.asset.height}` }}
          >
            <Photo
              photo={photo}
              sizes="(min-width: 768px) 30vw, 80vw"
              className="absolute inset-0 size-full object-cover"
            />
          </div>

          <a
            href={`mailto:${profile.email}`}
            data-outro-cta
            aria-label={`${outro.cta}: ${ui.emailCta}`}
            className="group flex shrink-0 origin-bottom-right items-center justify-center gap-[0.2em] self-stretch rounded-full bg-foreground px-[0.6em] py-[0.32em] text-[clamp(2.75rem,6vw,6rem)] leading-none font-medium tracking-[-0.045em] text-background transition-colors duration-(--duration-ui) hover:bg-accent hover:text-on-accent md:absolute md:right-(--edge) md:bottom-(--edge)"
          >
            {outro.cta}
            <ArrowUpRightIcon
              size={64}
              strokeWidth={1.25}
              className="size-[0.8em] transition-transform duration-(--duration-ui) ease-out-expo group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </a>
        </div>
      </div>
    </OutroScene>
  );
}
