import { capabilities } from "@/content/capabilities";
import { profile } from "@/content/profile";
import { site, socials } from "@/content/site";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { SelectedWork } from "@/components/sections/selected-work";
import { hasProductionUrl, siteUrl } from "@/lib/site-url";

function personJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: "Software Development Engineer (Frontend)",
    description: site.description,
    email: `mailto:${profile.email}`,
    ...(hasProductionUrl ? { url: siteUrl.href } : {}),
    worksFor: { "@type": "Organization", name: profile.company },
    address: { "@type": "PostalAddress", addressLocality: profile.city, addressCountry: "IN" },
    alumniOf: { "@type": "CollegeOrUniversity", name: "J.C. Bose University of Science and Technology" },
    knowsAbout: capabilities.stack.items,
    sameAs: socials.map((social) => social.href),
  };
  // Escape "<" so content can never close the script tag (Next.js JSON-LD guide).
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: personJsonLd() }} />
      <Hero />
      <SelectedWork />
      <About />
      <Experience />
      <Contact />
    </>
  );
}
