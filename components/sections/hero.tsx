import type { CSSProperties } from "react";
import { profile } from "@/content/profile";
import { ui } from "@/content/site";
import { HeroBackdrop } from "@/components/hero/hero-backdrop";
import { Magnetic } from "@/components/motion/magnetic";
import { TextMask } from "@/components/motion/text-mask";
import { ButtonArrow, ButtonLink } from "@/components/ui/button";
import { ArrowRightIcon } from "@/components/ui/icons";
import { LocalTime } from "@/components/ui/local-time";
import { Pill, StatusDot } from "@/components/ui/pill";

const delay = (ms: number) => ({ "--enter-delay": `${ms}ms` }) as CSSProperties;

export function Hero() {
  return (
    <section className="relative isolate flex min-h-svh flex-col">
      <HeroBackdrop />

      <div className="container-page flex flex-1 flex-col justify-end pt-[calc(var(--header-height)+64px)] pb-10 md:pb-14">
        <div className="enter" style={delay(0)}>
          <Pill>
            <StatusDot />
            {profile.status}
          </Pill>
        </div>

        <TextMask as="h1" lines={profile.headline} className="mt-8 text-display font-semibold md:mt-10" />

        <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12 md:items-end md:gap-6">
          <p className="enter max-w-[46ch] text-lead text-muted md:col-span-6" style={delay(260)}>
            {profile.intro}
          </p>
          <div className="enter flex flex-wrap gap-3 md:col-span-6 md:justify-end" style={delay(340)}>
            <Magnetic>
              <ButtonLink href="/#work">
                {ui.viewWork}
                <ButtonArrow>
                  <ArrowRightIcon size={16} />
                </ButtonArrow>
              </ButtonLink>
            </Magnetic>
            <Magnetic>
              <ButtonLink href="/#contact" variant="secondary">
                {ui.getInTouch}
              </ButtonLink>
            </Magnetic>
          </div>
        </div>

        <div
          className="enter label mt-14 flex items-center justify-between gap-4 border-t border-border pt-5 md:mt-20"
          style={delay(420)}
        >
          <span>{profile.location}</span>
          <span>
            <span className="sr-only">{ui.localTime}: </span>
            <LocalTime timeZone={profile.timeZone} suffix={profile.timeZoneLabel} />
          </span>
        </div>
      </div>
    </section>
  );
}
