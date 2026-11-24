import type { Project } from "./types";

/*
 * Text-only for now: each entry is real production work from the resume, written up as a
 * case study later. No screenshots, links or results are added until they are real and public.
 * The older To-Do and Leads Tracker projects are left out on purpose.
 * Order matters: it is the order of the scattered gallery.
 */
export const projects: readonly Project[] = [
  {
    id: "access-control",
    title: "Roles & permissions",
    context: "DigitalPaani",
    year: "2026",
    summary:
      "Interfaces for a redesigned role-based access control system: defining roles, assigning permissions and managing users.",
    stack: ["React", "JavaScript", "REST APIs"],
    glyph: "access",
    status: "in-progress",
  },
  {
    id: "alert-management",
    title: "Alert management",
    context: "DigitalPaani",
    year: "2026",
    summary:
      "Alert views with notification workflows, SLA tracking, escalation states and status indicators people can read at a glance.",
    stack: ["React", "JavaScript", "REST APIs"],
    glyph: "alerts",
    status: "in-progress",
  },
  {
    id: "component-library",
    title: "UI component library",
    context: "WeRize",
    year: "2025",
    summary:
      "A shared React 19 and TypeScript library, documented in Storybook, so fintech dashboards stopped growing one-off variants.",
    stack: ["React 19", "TypeScript", "Storybook", "Vitest"],
    glyph: "components",
    status: "in-progress",
  },
  {
    id: "dashboard-performance",
    title: "Dashboard performance",
    context: "WeRize",
    year: "2025",
    summary: "Code splitting and lazy loading to improve LCP and INP on high-traffic fintech dashboards.",
    stack: ["React", "TypeScript", "Core Web Vitals"],
    glyph: "performance",
    status: "in-progress",
  },
  {
    id: "data-layer",
    title: "Client data layer",
    context: "WeRize",
    year: "2025",
    summary:
      "Server state in TanStack Query, UI state in Zustand, and client-side caching that cut redundant API calls.",
    stack: ["TanStack Query", "Zustand", "Axios"],
    glyph: "data",
    status: "in-progress",
  },
  {
    id: "portfolio",
    title: "This portfolio",
    context: "Personal",
    year: "2026",
    summary:
      "A static Next.js site with scroll-driven storytelling that stays fast, accessible and readable without the motion.",
    stack: ["Next.js", "TypeScript", "GSAP", "Tailwind CSS"],
    glyph: "scroll",
    status: "in-progress",
  },
];
