import type { NavItem, SectionCopy, SocialLink } from "./types";

export const site = {
  title: "Himanshu Rana — Frontend Developer",
  description:
    "Himanshu Rana is a frontend developer (SDE-1) at DigitalPaani in Gurugram, India, building data-heavy web apps with React and TypeScript.",
  credit: "Designed and built by Himanshu Rana.",
  /** Social card, built by `npm run images`. */
  ogImage: {
    url: "/og-image.jpg",
    width: 1200,
    height: 630,
    alt: "Himanshu Rana, frontend developer: a black and white portrait beside his name.",
  },
} as const;

/** "Home" is the wordmark on wide screens and the first item in the mobile menu. */
export const navigation: readonly NavItem[] = [
  { id: "top", label: "Home", href: "/#top" },
  { id: "about", label: "About", href: "/#about" },
  { id: "experience", label: "Experience", href: "/#experience" },
  { id: "projects", label: "Projects", href: "/#projects" },
  { id: "skills", label: "Skills", href: "/#skills" },
  { id: "contact", label: "Contact", href: "/#contact" },
];

export const socials: readonly SocialLink[] = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/Himanshucode7",
    handle: "Himanshucode7",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/himanshu6020",
    handle: "himanshu6020",
  },
];

export const sections = {
  about: {
    id: "about",
    label: "About",
    title: "I build interfaces that hold up.",
  },
  experience: {
    id: "experience",
    label: "Experience",
    title: "Where I've worked.",
    intro:
      "Shipping production React since 2024: first as an intern modernising legacy JavaScript, then on fintech dashboards and a shared component library at WeRize, and now as an SDE-1 at DigitalPaani.",
  },
  projects: {
    id: "projects",
    label: "Projects",
    title: "Selected work.",
    intro:
      "Write-ups of my production work are on the way, each covering the problem, the decisions and what changed. Until they're ready, this is what they cover.",
  },
  skills: {
    id: "skills",
    label: "Skills",
    title: "The toolkit.",
    intro: "Frontend first, with enough of the stack behind it to work closely with backend teams.",
  },
  contact: {
    id: "contact",
    label: "Contact",
    title: "Get in touch.",
    intro:
      "I'm currently looking for my next frontend role. Whether you have an opportunity, a question, or just want to say hi, my inbox is always open and I'll do my best to get back to you.",
  },
} as const satisfies Record<string, SectionCopy>;

/** The closing scene between Skills and Contact. */
export const outro = {
  title: ["Let's build", "something", "together."],
  cta: "Say hello",
} as const;

export const ui = {
  skipLink: "Skip to content",
  home: "Home",
  localTime: "Local time",
  scrollHint: "Scroll to explore",
  copyEmail: "Copy email",
  copied: "Copied",
  copyFailed: "Couldn't copy. Use the address instead.",
  emailMe: "Email me",
  emailCta: "Email Himanshu",
  resume: "Resume",
  backToTop: "Back to top",
  socialProfiles: "Social profiles",
  capabilities: "Capabilities",
  email: "Email",
  resumeFormat: "PDF",
  menu: "Menu",
  closeMenu: "Close",
  primaryNav: "Primary",
  showDetails: "Show details",
  hideDetails: "Hide details",
  browseGithub: "More on GitHub",
  caseStudyInProgress: "Case study in progress",
  viewCode: "Code",
  viewLive: "Live",
  portraitSwitch: "Choose a portrait",
  portraitLabel: "Portrait",
  notFoundTitle: "This page doesn't exist.",
  notFoundBody: "The link may be old, or the page has moved.",
  backHome: "Back to home",
} as const;
