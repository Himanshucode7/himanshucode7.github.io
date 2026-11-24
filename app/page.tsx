import { capabilities } from "@/content/capabilities";
import { profile } from "@/content/profile";
import { site, socials } from "@/content/site";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Outro } from "@/components/sections/outro";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { hasProductionUrl, siteUrl } from "@/lib/site-url";

function personJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.jobTitle,
    description: site.description,
    email: `mailto:${profile.email}`,
    ...(hasProductionUrl ? { url: siteUrl.href } : {}),
    worksFor: { "@type": "Organization", name: profile.company },
    address: { "@type": "PostalAddress", addressLocality: profile.city, addressCountry: "IN" },
    alumniOf: { "@type": "CollegeOrUniversity", name: "J.C. Bose University of Science and Technology, YMCA" },
    knowsAbout: capabilities.skills.find((group) => group.id === "frontend")?.items ?? [],
    sameAs: socials.map((social) => social.href),
  };
  // Escape "<" so content can never close the script tag (Next.js JSON-LD guide).
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/*
 * Page rhythm: black hero → light About panel sliding over it → light Experience →
 * black Projects and Skills → the outro washing from black to light → light Contact.
 */
export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: personJsonLd() }} />
      {/* The hero is sticky inside this wrapper, so it un-sticks once About has covered it. */}
      <div className="relative">
        <Hero />
        <About />
      </div>
      <Experience />
      <Projects />
      <Skills />
      <Outro />
      <Contact />
    </>
  );
}
