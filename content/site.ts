import type { NavItem, SectionCopy, SocialLink } from "./types";

export const site = {
  title: "Himanshu Rana — Frontend Engineer",
  description:
    "Himanshu Rana is a frontend engineer (SDE-1) at Digital Paani in Gurgaon, India, building data-heavy web apps with React, Next.js and TypeScript.",
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
    title: "Case studies, in progress.",
    intro:
      "I'm writing up a few pieces of production work properly: a shared component library, dashboard performance and client-side data layers. Each one will cover the problem, the decisions I made and what changed. Until then, my code is on GitHub.",
  },
  about: {
    id: "about",
    label: "About",
    title: "How I work.",
  },
  experience: {
    id: "experience",
    label: "Experience",
    title: "Where I've worked.",
    intro:
      "I've been shipping production React since 2024: first as an intern modernising legacy JavaScript, then on fintech dashboards and a shared component library at WeRize, and now as an SDE-1 at Digital Paani.",
  },
  contact: {
    id: "contact",
    label: "Contact",
    title: "Say hello.",
    intro:
      "I'm currently looking for my next frontend role. Whether you have an opportunity, a question, or just want to say hi, my inbox is always open and I'll do my best to get back to you.",
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
