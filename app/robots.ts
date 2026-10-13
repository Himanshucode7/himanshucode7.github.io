import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site-url";

// Required by `output: "export"`: generate this file once at build time.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/styleguide" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
