import type { NextConfig } from "next";

/**
 * Sub-path the site is served from. Empty locally and for a user site
 * (himanshucode7.github.io); "/portfolio" for a project site. The GitHub Pages
 * workflow sets PAGES_BASE_PATH from actions/configure-pages.
 */
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Fully static site: `next build` writes plain HTML/CSS/JS to ./out.
  output: "export",
  basePath,
  // The default image optimizer needs a server; GitHub Pages is static hosting.
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
