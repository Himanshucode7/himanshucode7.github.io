import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site-url";

// Required by `output: "export"`: generate this file once at build time.
export const dynamic = "force-static";

// One page for now. Add case study URLs here once their pages exist.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 }];
}
