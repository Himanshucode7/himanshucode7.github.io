import type { Capabilities } from "./types";

export const capabilities: Capabilities = {
  stack: {
    title: "Stack",
    items: [
      "React 19",
      "TypeScript",
      "Next.js",
      "Tailwind CSS",
      "TanStack Query",
      "Zustand",
      "Axios",
      "Vitest",
      "Storybook",
      "Docker",
    ],
  },
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
    detail: "Three roles: an internship, fintech at WeRize, and now Digital Paani.",
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
        title: "B.Tech, Computer Science",
        body: "J.C. Bose University of Science and Technology, 2020–2024.",
      },
    ],
  },
};
