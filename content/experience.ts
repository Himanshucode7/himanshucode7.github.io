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
    summary: "Building React and TypeScript interfaces for data-heavy products.",
    // TODO(himanshu): add 2–3 accomplishments you can publish.
    highlights: [],
  },
  {
    id: "werize",
    role: "Frontend Developer",
    company: "WeRize",
    location: "Bangalore, India",
    start: "2025-08",
    end: "2026-04",
    summary:
      "Built fintech dashboards and the shared React component library behind them.",
    // TODO(himanshu): confirm measurements before restoring numbers
    // (resume: −35% tech debt, +40% Core Web Vitals, −60% API overhead, −25% cycle time, 80% coverage).
    highlights: [
      "Built a standardized internal UI component library in React 19 and TypeScript.",
      "Introduced code splitting and lazy loading on high-traffic fintech dashboards to improve LCP and INP.",
      "Designed state management with TanStack Query and Zustand, using client-side caching to cut redundant API calls.",
      "Led Vitest and Storybook workflows for testing and documenting components.",
    ],
  },
  {
    id: "yhv",
    role: "Frontend Developer Intern",
    company: "Your Hobbies And Venture",
    location: "Gurgaon, India",
    start: "2024-06",
    end: "2025-07",
    summary: "Shipped responsive React interfaces and modernised legacy JavaScript.",
    highlights: [
      "Refactored legacy JavaScript modules into reusable React function components.",
      "Built job boards with client-side filtering and debounced search over a REST API.",
      "Wrote regex-based form validation to catch invalid submissions before they reached the backend.",
    ],
  },
];
