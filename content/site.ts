import type { NavItem, SectionCopy, SocialLink } from "./types";

export const site = {
  title: "Himanshu Rana — Frontend Engineer",
  description:
    "Himanshu Rana is a frontend engineer in Gurgaon, India, building fast, accessible React and TypeScript interfaces for data-heavy products.",
  credit: "Designed and built by Himanshu Rana.",
} as const;

export const navigation: readonly NavItem[] = [
  { id: "work", label: "Work", href: "/#work" },
  { id: "about", label: "About", href: "/#about" },
  { id: "experience", label: "Experience", href: "/#experience" },
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
  work: {
    id: "work",
    label: "Selected work",
    title: "Case studies, written properly.",
    intro:
      "Detailed write-ups of production work are on their way: a shared component library, dashboard performance, and client-side data layers. Each one will cover the problem, the decisions and what changed.",
  },
  about: {
    id: "about",
    label: "About",
    title: "Quiet interfaces, careful engineering.",
  },
  experience: {
    id: "experience",
    label: "Experience",
    title: "Where I've worked.",
  },
  contact: {
    id: "contact",
    label: "Contact",
    title: "Let's build something.",
    intro:
      "Have a product with a hard interface problem, or a role where frontend quality matters? I'd like to hear about it.",
  },
} as const satisfies Record<string, SectionCopy>;

export const ui = {
  skipLink: "Skip to content",
  viewWork: "View selected work",
  getInTouch: "Get in touch",
  localTime: "Local time",
  copyEmail: "Copy email",
  copied: "Copied",
  copyFailed: "Couldn't copy. Use the address instead.",
  emailMe: "Email me",
  resume: "Resume",
  backToTop: "Back to top",
  socialProfiles: "Social profiles",
  capabilities: "Capabilities",
  email: "Email",
  resumeFormat: "PDF",
  themeToggle: "Toggle colour theme",
  menu: "Menu",
  primaryNav: "Primary",
  showDetails: "Show details",
  hideDetails: "Hide details",
  browseGithub: "Browse code on GitHub",
  readCaseStudy: "Read case study",
  pendingMetric: "Metric pending",
  notFoundTitle: "This page doesn't exist.",
  notFoundBody: "The link may be old, or the page has moved.",
  backHome: "Back to home",
} as const;
