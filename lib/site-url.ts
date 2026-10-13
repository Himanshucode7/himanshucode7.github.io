/**
 * The public origin of the site.
 * - NEXT_PUBLIC_SITE_URL wins when set (custom domain).
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
