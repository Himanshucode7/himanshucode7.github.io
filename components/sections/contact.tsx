import { profile } from "@/content/profile";
import { sections, socials, ui } from "@/content/site";
import { Reveal } from "@/components/motion/reveal";
import { ButtonArrow, buttonStyles } from "@/components/ui/button";
import { CopyEmailButton } from "@/components/ui/copy-email-button";
import { ArrowUpRightIcon, MailIcon } from "@/components/ui/icons";
import { headingId } from "@/components/ui/section-heading";
import { withBasePath } from "@/lib/site-url";

type Destination = { label: string; value: string; href: string; external: boolean };

export function Contact() {
  const copy = sections.contact;

  const destinations: Destination[] = [
    { label: ui.email, value: profile.email, href: `mailto:${profile.email}`, external: false },
    ...socials.map((social) => ({ label: social.label, value: social.handle, href: social.href, external: true })),
    ...(profile.resume ? [{ label: ui.resume, value: ui.resumeFormat, href: withBasePath(profile.resume), external: true }] : []),
  ];

  return (
    <section id={copy.id} aria-labelledby={headingId(copy)} className="section-y">
      <div className="container-page">
        <Reveal>
          <p className="label flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
            {copy.label}
          </p>
        </Reveal>

        <div className="mt-8 grid gap-16 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-8">
            <Reveal delay={1}>
              <h2 id={headingId(copy)} className="text-display font-semibold">
                {copy.title}
              </h2>
            </Reveal>
            <Reveal delay={2}>
              <p className="mt-8 max-w-[48ch] text-lead text-muted">{copy.intro}</p>
            </Reveal>
            <Reveal delay={3} className="mt-10 flex flex-wrap items-start gap-3">
              <a href={`mailto:${profile.email}`} className={buttonStyles()}>
                <MailIcon size={16} />
                {ui.emailMe}
              </a>
              <CopyEmailButton
                email={profile.email}
                labels={{ copy: ui.copyEmail, copied: ui.copied, failed: ui.copyFailed }}
              />
            </Reveal>
          </div>

          <Reveal delay={2} className="md:col-span-4 md:self-end">
            <ul className="border-b border-border">
              {destinations.map((item) => (
                <li key={item.label} className="border-t border-border">
                  <a
                    href={item.href}
                    {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group/button flex items-center justify-between gap-4 py-4 transition-colors duration-(--duration-micro) hover:text-accent-text"
                  >
                    <span className="label normal-case tracking-normal">{item.label}</span>
                    <span className="flex min-w-0 items-center gap-2 text-small">
                      <span className="truncate">{item.value}</span>
                      <ButtonArrow className="group-hover/button:-translate-y-0.5">
                        <ArrowUpRightIcon size={16} />
                      </ButtonArrow>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
