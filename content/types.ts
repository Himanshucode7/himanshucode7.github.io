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

/** One photo as built by scripts/optimize-images.mjs (see content/photos.generated.ts). */
export type PhotoAsset = {
  /** File stem in /public/images/photos, e.g. "portrait-mono-wet-hair". */
  file: string;
  width: number;
  height: number;
  /** Generated widths in ascending order; the last one is the full size. */
  widths: readonly number[];
  /** Tiny blurred WebP shown while the real file loads. */
  placeholder: `data:image/${string}`;
};

export type Photo = {
  asset: PhotoAsset;
  alt: string;
  /** CSS object-position that keeps the face in frame when the photo is cropped. */
  focus: string;
};

export type Profile = {
  name: string;
  firstName: string;
  lastName: string;
  shortName: string;
  /** Public-facing role, used in the hero and metadata. */
  title: string;
  /** Job title as it appears on the resume. */
  jobTitle: string;
  company: string;
  location: string;
  city: string;
  timeZone: string;
  timeZoneLabel: string;
  tagline: string;
  intro: string;
  /** First paragraph is the scroll-highlighted one. */
  bio: readonly string[];
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

export type SkillGroup = {
  id: string;
  title: string;
  items: readonly string[];
};

export type Capabilities = {
  skills: readonly SkillGroup[];
  principles: { title: string; items: readonly { title: string; body: string }[] };
  stat: { value: string; label: string; detail: string };
  highlights: { title: string; items: readonly { title: string; body: string }[] };
};

/** Line drawing shown on a project tile until it has real screenshots. */
export type ProjectGlyph = "access" | "alerts" | "components" | "performance" | "data" | "scroll";

export type Project = {
  id: string;
  title: string;
  /** Where the work happened, e.g. a company name. */
  context: string;
  year: string;
  /** Two sentences at most: the problem and what was built. */
  summary: string;
  stack: readonly string[];
  glyph: ProjectGlyph;
  /** "in-progress" renders an explicit "case study in progress" note instead of links. */
  status: "in-progress" | "published";
  /** Only real, public URLs. Leave a field out rather than guessing. */
  links?: { github?: string; live?: string };
  cover?: Photo;
};
