import { media } from "@/content/media";
import { profile } from "@/content/profile";
import { ui } from "@/content/site";
import { HeroShell } from "@/components/hero/hero-shell";
import { Photo } from "@/components/media/photo";

/**
 * Rendered width of a hero look: on wide (landscape) screens the frame is about
 * 1.03× the viewport height; on portrait screens the photo covers the full
 * height, so it is wider than the viewport.
 */
const HERO_SIZES = "(min-width: 640px) and (min-aspect-ratio: 5/4) 113vh, 110vh";

export function Hero() {
  return (
    <HeroShell
      copy={{
        firstName: profile.firstName,
        lastName: profile.lastName,
        title: profile.title,
        company: profile.company,
        tagline: profile.tagline,
        intro: profile.intro,
        city: profile.city,
        timeZone: profile.timeZone,
        timeZoneLabel: profile.timeZoneLabel,
      }}
      labels={{
        cursor: "←  →",
        scrollHint: ui.scrollHint,
        localTime: ui.localTime,
        portraitSwitch: ui.portraitSwitch,
        portraitLabel: ui.portraitLabel,
      }}
      portraits={media.hero.map((photo, index) => (
        <Photo
          key={photo.asset.file}
          photo={photo}
          sizes={HERO_SIZES}
          loading={index === 0 ? "priority" : "eager"}
        />
      ))}
    />
  );
}
