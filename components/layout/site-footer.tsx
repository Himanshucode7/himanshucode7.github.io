import { profile } from "@/content/profile";
import { site, socials, ui } from "@/content/site";
import { ArrowUpIcon, socialIcons } from "@/components/ui/icons";
import { LocalTime } from "@/components/ui/local-time";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="container-page grid gap-8 py-10 md:grid-cols-12 md:items-center md:gap-6">
        <p className="text-small text-muted md:col-span-5">{site.credit}</p>

        <ul className="flex items-center gap-1 md:col-span-3" aria-label={ui.socialProfiles}>
          {socials.map((social) => {
            const Icon = socialIcons[social.id];
            return (
              <li key={social.id}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex size-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-accent-soft hover:text-foreground"
                >
                  <Icon />
                  <span className="sr-only">{social.label}</span>
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center justify-between gap-6 md:col-span-4 md:justify-end">
          <p className="label normal-case tracking-normal">
            <span className="sr-only">{ui.localTime}: </span>
            {profile.city} ·{" "}
            <LocalTime timeZone={profile.timeZone} suffix={profile.timeZoneLabel} />
          </p>
          <a
            href="#top"
            className="group inline-flex items-center gap-2 rounded-full text-small text-muted transition-colors hover:text-foreground"
          >
            {ui.backToTop}
            <ArrowUpIcon size={16} className="transition-transform duration-(--duration-ui) ease-out-expo group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
