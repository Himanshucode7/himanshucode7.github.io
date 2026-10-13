import portrait from "@/public/images/himanshu-rana.webp";
import type { Profile } from "./types";

export const profile: Profile = {
  name: "Himanshu Rana",
  shortName: "Himanshu",
  role: "SDE-1, Frontend",
  company: "Digital Paani",
  location: "Gurgaon, India",
  city: "Gurgaon",
  timeZone: "Asia/Kolkata",
  timeZoneLabel: "IST",
  // Factual status. Swap for an availability line only if you are actually looking.
  status: "SDE-1 at Digital Paani",
  headline: ["Calm interfaces", "for data-heavy", "products."],
  intro:
    "I'm Himanshu Rana, a frontend engineer in Gurgaon. I build fast, accessible React and TypeScript interfaces for products where the data is dense and the details matter.",
  // TODO(himanshu): review and rewrite in your own voice.
  bio: [
    "I build frontends for products that carry a lot of data: dashboards, component systems and the state layers underneath them. The work I enjoy most is making something complicated feel simple to use.",
    "I care about the unglamorous parts: render budgets and Core Web Vitals, predictable server state, components that work with a keyboard and a screen reader, and code the next engineer can change without fear.",
    "Today I'm an SDE-1 at Digital Paani. Before that I built fintech dashboards and a shared component library at WeRize, and started out shipping React interfaces as an intern in 2024.",
  ],
  portrait: {
    src: portrait,
    alt: "Portrait of Himanshu Rana, smiling, wearing a dark blazer and white shirt.",
  },
  email: "ranahimanshu6020@gmail.com",
  // TODO(himanshu): add a public resume (without phone number) at public/resume.pdf, then set "/resume.pdf".
  resume: null,
};
