import type { Profile } from "./types";

/*
 * Facts come from Himanshu's resume (Himanshu_Resume_Software_Engineer_JAVA_AWS__.pdf).
 * The phone number on the resume is intentionally not published.
 */
export const profile: Profile = {
  name: "Himanshu Rana",
  firstName: "Himanshu",
  lastName: "Rana",
  shortName: "Himanshu",
  title: "Frontend Developer",
  jobTitle: "Software Development Engineer I (SDE-1)",
  company: "DigitalPaani",
  location: "Gurugram, India",
  city: "Gurugram",
  timeZone: "Asia/Kolkata",
  timeZoneLabel: "IST",
  tagline: "Building thoughtful digital experiences.",
  intro:
    "SDE-1 at DigitalPaani, building data-heavy web apps with React and TypeScript. I care as much about how an interface feels as how its code reads.",
  // TODO(himanshu): review and rewrite in your own voice.
  bio: [
    "I build frontends for products that carry a lot of data: dashboards, component libraries and the state underneath them. The part I enjoy most is taking something complicated and making it feel obvious.",
    "I got into web development through coursework during my B.Tech in Computer Engineering, and it stuck. I like software that is solid under the hood and simple on the surface, and the frontend is where those two meet.",
    "I try to understand the problem before I touch the UI, then build in small, typed pieces with clear names. I pay close attention to the things users feel but rarely notice: how fast a page loads, whether data stays in sync, and whether it all works with a keyboard and a screen reader.",
    "When I'm away from my screen, I'm probably swimming, playing a sport, out with friends, or lost in a new playlist or film.",
  ],
  email: "ranahimanshu6020@gmail.com",
  // TODO(himanshu): add a public resume (without phone number) at public/resume.pdf, then set "/resume.pdf".
  resume: null,
};
