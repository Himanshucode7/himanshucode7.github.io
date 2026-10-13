import type { StaticImageData } from "next/image";

/** A calendar month in `YYYY-MM` form. Formatting happens at render time. */
export type YearMonth = `${number}-${number}`;

export type SocialLink = {
  id: "github" | "linkedin" | "x";
  label: string;
  href: string;
  handle: string;
};

export type NavItem = {
  id: string;
  label: string;
  href: `/#${string}`;
};

export type SectionCopy = {
  id: string;
  label: string;
  title: string;
  intro?: string;
};

export type Profile = {
  name: string;
  shortName: string;
  role: string;
  company: string;
  location: string;
  city: string;
  timeZone: string;
  timeZoneLabel: string;
  /** Short status for the hero pill. Keep it factual. */
  status: string;
  headline: readonly string[];
  intro: string;
  /** First paragraph is the scroll-highlighted one. */
  bio: readonly string[];
  portrait: {
    src: StaticImageData;
    alt: string;
  };
  email: string;
  /** Public resume path, or null until a public version is supplied. */
  resume: `/${string}` | null;
};

export type ExperienceItem = {
  id: string;
  role: string;
  company: string;
  location: string;
  start: YearMonth;
  end: YearMonth | "present";
  summary: string;
  highlights: readonly string[];
};

export type Capabilities = {
  stack: { title: string; items: readonly string[] };
  principles: { title: string; items: readonly { title: string; body: string }[] };
  stat: { value: string; label: string; detail: string };
  highlights: { title: string; items: readonly { title: string; body: string }[] };
};

export type ProjectMetric = {
  label: string;
  /** `null` renders as an explicitly pending metric instead of a number. */
  value: string | null;
};

export type Project = {
  slug: string;
  title: string;
  year: string;
  /** One sentence: the problem. */
  problem: string;
  /** One sentence: what Himanshu specifically did. */
  contribution: string;
  stack: readonly string[];
  outcome: ProjectMetric;
  cover?: { src: StaticImageData; alt: string };
};
