/** Sub-path the site is served from ("" or e.g. "/portfolio"); see next.config.ts. */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * The public URL of the site, including any base path.
 * - NEXT_PUBLIC_SITE_URL wins when set (GitHub Pages workflow, custom domain).
 * - On Vercel, VERCEL_PROJECT_PRODUCTION_URL is provided automatically.
 * - Otherwise we are local, and canonical URLs are omitted.
 */
function resolveSiteUrl(): { url: URL; isProduction: boolean } {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return { url: new URL(explicit), isProduction: true };

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return { url: new URL(`https://${vercel}`), isProduction: true };

  return { url: new URL("http://localhost:3000"), isProduction: false };
}

export const { url: siteUrl, isProduction: hasProductionUrl } = resolveSiteUrl();

/** Absolute URL for a site path, keeping the base path (`new URL("/x", base)` would drop it). */
export function absoluteUrl(path: `/${string}`): string {
  return `${siteUrl.href.replace(/\/$/, "")}${path}`;
}

/** Prefixes the base path for plain <a> links to files in /public (next/link does this itself). */
export function withBasePath(path: `/${string}`): string {
  return `${basePath}${path}`;
}
