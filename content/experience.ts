import type { ExperienceItem } from "./types";

/*
 * Source: Himanshu's resume (Himanshu_Resume_Software_Engineer_JAVA_AWS__.pdf). Months the
 * resume leaves open (DigitalPaani start, WeRize end) keep the values from the earlier resume.
 * Percentages from the resume are intentionally left out until each one has a known baseline
 * and measurement method.
 */
export const experience: readonly ExperienceItem[] = [
  {
    id: "digitalpaani",
    role: "SDE-1, Frontend",
    company: "DigitalPaani",
    location: "Gurugram, India",
    start: "2026-05",
    end: "present",
    summary:
      "Building frontend features for DigitalPaani's production web applications, from access control and user management to alerting.",
    highlights: [
      "Develop and maintain frontend features for production applications with React and modern JavaScript.",
      "Worked on role-based access control and user management interfaces as part of a redesigned roles and permissions system.",
      "Build and improve alert management interfaces: notification workflows, SLA tracking, escalation states and alert status indicators.",
      "Integrate REST APIs and handle application state, data rendering and dynamic UI updates.",
      "Trace frontend bugs to their root cause, and support releases through code reviews, feature testing and production support.",
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
      "Integrated REST microservices through custom request interceptors, protecting data integrity in financial flows.",
      "Led the Vitest and Storybook workflow for testing components and documenting them in isolation.",
    ],
  },
  {
    id: "yhv",
    role: "Frontend Developer Intern",
    company: "Your Hobbies And Venture",
    location: "Faridabad, India",
    start: "2024-06",
    end: "2025-07",
    summary:
      "Where I started: shipping responsive React interfaces and moving legacy JavaScript onto modern components.",
    highlights: [
      "Refactored legacy JavaScript modules into reusable React function components.",
      "Built mobile-first interfaces with Tailwind CSS, checked across browsers and for accessibility.",
      "Built job-board pages with client-side filtering and debounced search on top of a REST API.",
      "Added regex-based form validation that caught invalid input before it reached the backend.",
    ],
  },
];
