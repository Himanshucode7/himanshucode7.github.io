import type { ExperienceItem } from "./types";

/*
 * Source: Himanshu's resumes (resume_Himanshu1.pdf for dates, Himanshu_frontend_dev.pdf for
 * which bullets belong to which role). Percentages from the resume are intentionally left out
 * until each one has a known baseline and measurement method.
 */
export const experience: readonly ExperienceItem[] = [
  {
    id: "digital-paani",
    role: "SDE-1, Frontend",
    company: "Digital Paani",
    location: "Gurgaon, India",
    start: "2026-05",
    end: "present",
    summary:
      "Building and maintaining frontend features for Digital Paani's data-heavy web products, using React, Next.js and TypeScript.",
    // TODO(himanshu): confirm each line is true, then swap in specific features you've shipped.
    highlights: [
      "Build and maintain features across Digital Paani's web application with React, Next.js and TypeScript.",
      "Work closely with designers and other engineers to turn designs and APIs into consistent, responsive interfaces.",
      "Test UI across browsers and screen sizes so it holds up wherever people use it.",
    ],
  },
  {
    id: "werize",
    role: "Frontend Developer",
    company: "WeRize",
    location: "Bangalore, India",
    start: "2025-08",
    end: "2026-04",
    summary:
      "Built fintech dashboards, the shared React component library behind them, and the client-side data layer that fed them.",
    // TODO(himanshu): confirm measurements before restoring numbers
    // (resume: −35% tech debt, +40% Core Web Vitals, −60% API overhead, −25% cycle time, 80% coverage).
    highlights: [
      "Built an internal UI component library in React 19 and TypeScript, so dashboards shared one consistent set of components instead of one-off variants.",
      "Improved loading and responsiveness (LCP and INP) on high-traffic dashboards by introducing code splitting and lazy loading.",
      "Designed the state layer with TanStack Query and Zustand, using client-side caching to cut redundant API calls.",
      "Led the Vitest and Storybook workflow for testing components and documenting them in isolation.",
    ],
  },
  {
    id: "yhv",
    role: "Frontend Developer Intern",
    company: "Your Hobbies And Venture",
    location: "Gurgaon, India",
    start: "2024-06",
    end: "2025-07",
    summary:
      "Where I started: shipping responsive React interfaces and moving legacy JavaScript onto modern components.",
    highlights: [
      "Refactored legacy JavaScript modules into reusable React function components.",
      "Built job-board pages with client-side filtering and debounced search on top of a REST API.",
      "Added regex-based form validation that caught invalid input before it reached the backend.",
    ],
  },
];
