import type { Capabilities } from "./types";

/* Skills follow the resume, frontend first. */
export const capabilities: Capabilities = {
  skills: [
    {
      id: "frontend",
      title: "Frontend",
      items: ["React", "Next.js", "TypeScript", "JavaScript (ES6+)", "HTML", "CSS", "Tailwind CSS", "Angular"],
    },
    {
      id: "data",
      title: "State & data",
      items: ["TanStack Query", "Zustand", "Axios", "REST APIs", "JSON", "LocalStorage"],
    },
    {
      id: "quality",
      title: "Testing & tools",
      items: ["Vitest", "Storybook", "Git", "GitHub", "Docker", "Postman", "Jira"],
    },
    {
      id: "backend",
      title: "Backend & databases",
      items: ["Node.js", "Express.js", ".NET", "PostgreSQL", "MySQL", "MongoDB", "Firebase"],
    },
    {
      id: "practices",
      title: "Practices",
      items: [
        "Component-driven development",
        "Responsive design",
        "Performance optimisation",
        "Cross-browser compatibility",
        "Agile / Scrum",
      ],
    },
  ],
  principles: {
    title: "What I care about",
    items: [
      {
        title: "Performance",
        body: "Measure first. Split code, cache data, and keep the main thread free.",
      },
      {
        title: "Accessibility",
        body: "Keyboard, screen reader and reduced motion are part of done.",
      },
      {
        title: "Maintainability",
        body: "Small components, typed boundaries, and tests where they pay off.",
      },
    ],
  },
  stat: {
    value: "2024",
    label: "Shipping production React since",
    detail: "Three roles: an internship, fintech at WeRize, and now DigitalPaani.",
  },
  highlights: {
    title: "Beyond the editor",
    items: [
      {
        title: "Hackathon finalist",
        body: "Amazon-organised hackathon, building a real-time analytics dashboard.",
      },
      {
        title: "NCC Naval Wing",
        body: "Cadet Captain, leading 45+ cadets.",
      },
      {
        title: "B.Tech, Computer Engineering",
        body: "J.C. Bose University of Science and Technology, YMCA, 2020–2024.",
      },
    ],
  },
};
