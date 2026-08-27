import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import CursorGlow from "@/components/CursorGlow";
import { site } from "@/lib/content";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name}, Software Engineer`,
    template: `%s · ${site.name}`,
  },
  description: site.tagline,
  keywords: [
    "Software Engineer",
    "Frontend Engineer",
    "React",
    "Next.js",
    "TypeScript",
    "Full Stack Developer",
    "Los Angeles",
    "USC",
  ],
  authors: [{ name: site.name, url: site.url }],
  openGraph: {
    type: "website",
    url: site.url,
    title: `${site.name}, Software Engineer`,
    description: site.tagline,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name}, Software Engineer`,
    description: site.tagline,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/* Motion sets the pre-animation state inline (opacity: 0), so without
            JS the prerendered content would render invisible. */}
        <noscript>
          <style>{`[style*="opacity:0"], [style*="opacity: 0"] {
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
          }`}</style>
        </noscript>
      </head>
      {/* Extensions such as Grammarly inject attributes into <body> before React
          hydrates, which trips the hydration mismatch warning. This suppresses the
          attribute diff on this element only, one level deep, not the subtree. */}
      <body
        suppressHydrationWarning
        className={`${geist.variable} ${geistMono.variable} antialiased`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:rounded-full focus:bg-lime focus:px-5 focus:py-2 focus:font-display focus:text-sm focus:text-ink"
        >
          Skip to content
        </a>
        <ScrollProgress />
        <CursorGlow />
        <Nav />
        <main id="main" className="relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
