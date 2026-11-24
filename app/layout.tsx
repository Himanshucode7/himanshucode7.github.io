import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter_Tight } from "next/font/google";
import { profile } from "@/content/profile";
import { navigation, site, ui } from "@/content/site";
import { Intro } from "@/components/layout/intro";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { CustomCursor } from "@/components/motion/custom-cursor";
import { DocumentEffects } from "@/components/motion/document-effects";
import { InlineScript } from "@/components/ui/inline-script";
import { documentScript } from "@/lib/document-script";
import { hasProductionUrl, siteUrl } from "@/lib/site-url";
import "./globals.css";

// Variable font: every weight from one file. Display type uses 500 throughout.
const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

// Mono is only used for small labels, so it should not compete with the headline font.
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: false,
});

// The social card is declared here rather than as app/opengraph-image.jpg so it can carry
// alt text (Turbopack builds ignore opengraph-image.alt.txt). Relative URLs resolve
// against metadataBase, which includes any GitHub Pages sub-path.
export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: site.title,
    template: `%s — ${profile.name}`,
  },
  description: site.description,
  authors: [{ name: profile.name }],
  creator: profile.name,
  alternates: hasProductionUrl ? { canonical: "/" } : undefined,
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: profile.name,
    title: site.title,
    description: site.description,
    url: "/",
    images: [site.ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: [site.ogImage],
  },
};

export const viewport: Viewport = {
  // The page opens on the black hero; browser chrome matches it.
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${interTight.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <InlineScript html={documentScript} />
      </head>
      <body>
        <a
          href="#main"
          className="fixed top-3 left-3 z-[110] -translate-y-24 rounded-full bg-foreground px-4 py-2 text-small font-medium text-background transition-transform focus-visible:translate-y-0"
        >
          {ui.skipLink}
        </a>
        <Intro name={profile.name} />
        <SiteHeader
          name={profile.name}
          items={navigation}
          labels={{ primaryNav: ui.primaryNav, menu: ui.menu, close: ui.closeMenu, home: ui.home }}
        />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <SiteFooter />
        <CustomCursor />
        <DocumentEffects />
      </body>
    </html>
  );
}
