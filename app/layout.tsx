import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { profile } from "@/content/profile";
import { navigation, site, ui } from "@/content/site";
import { Intro } from "@/components/layout/intro";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { DocumentEffects } from "@/components/motion/document-effects";
import { InlineScript } from "@/components/ui/inline-script";
import { documentScript } from "@/lib/document-script";
import { hasProductionUrl, siteUrl } from "@/lib/site-url";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Mono is only used for small labels, so it should not compete with the headline font.
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: false,
});

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
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAF9" },
    { media: "(prefers-color-scheme: dark)", color: "#09090B" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
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
          labels={{ primaryNav: ui.primaryNav, menu: ui.menu, themeToggle: ui.themeToggle, contact: ui.getInTouch }}
        />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <SiteFooter />
        <DocumentEffects />
      </body>
    </html>
  );
}
