import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: new URL("/", siteUrl).href, changeFrequency: "monthly", priority: 1 },
    ...projects.map((project) => ({
      url: new URL(`/work/${project.slug}`, siteUrl).href,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
