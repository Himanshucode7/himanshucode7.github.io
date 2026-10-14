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
  headline: ["Hi, I'm Himanshu.", "I build interfaces", "that hold up."],
  intro:
    "I'm a detail-oriented frontend engineer at Digital Paani, building data-heavy web apps with React, Next.js and TypeScript. I care as much about how an interface feels as how its code reads.",
  // TODO(himanshu): review and rewrite in your own voice.
  bio: [
    "I build frontends for products that carry a lot of data: dashboards, component libraries and the state underneath them. The part I enjoy most is taking something complicated and making it feel obvious.",
    "I got into web development through coursework during my B.Tech in Computer Science, and it stuck. I like software that is solid under the hood and simple on the surface, and the frontend is where those two meet.",
    "I try to understand the problem before I touch the UI, then build in small, typed pieces with clear names. I pay close attention to the things users feel but rarely notice: how fast a page loads, whether data stays in sync, and whether it all works with a keyboard and a screen reader. I'm always looking for better ways to do this, and I learn the most from teammates who share what they know.",
    "When I'm away from my screen, I'm probably swimming, playing a sport, out with friends, or lost in a new playlist or film.",
  ],
  portrait: {
    src: portrait,
    alt: "Portrait of Himanshu Rana, smiling, wearing a dark blazer and white shirt.",
  },
  email: "ranahimanshu6020@gmail.com",
  // TODO(himanshu): add a public resume (without phone number) at public/resume.pdf, then set "/resume.pdf".
  resume: null,
};
