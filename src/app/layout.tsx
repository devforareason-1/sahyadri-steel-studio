import type { Metadata, Viewport } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MotionProvider from "@/components/MotionProvider";
import WhatsAppButton from "@/components/WhatsAppButton";
import { site } from "@/data/site";
import { businessJsonLd, serializeJsonLd } from "@/lib/structured-data";
import { homeDescription, homeTitle } from "@/lib/metadata";

// A warm old-style serif with a real italic for headlines, a precise sans for
// everything you read, and its mono for figures only.
const display = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
  // The home page's name arrives with the film, after the font does. Preloading
  // would only hold back the first paint on a slow phone.
  preload: false,
});

const sans = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

// Defaults for pages that set none of their own (such as the 404 page).
// Each indexed page sets its full metadata through lib/metadata.ts.
export const metadata: Metadata = {
  metadataBase: new URL(site.url + "/"),
  title: {
    default: homeTitle,
    template: "%s | Sahyadri Steel Studio",
  },
  description: homeDescription,
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: site.name,
    title: homeTitle,
    description: homeDescription,
  },
  twitter: { card: "summary_large_image" },
  // Only the live production site is indexed. Previews and local builds stay
  // hidden from search engines, so this can't be forgotten at launch.
  robots:
    process.env.VERCEL_ENV === "production"
      ? { index: true, follow: true }
      : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#2b211b",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-IN"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${mono.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(businessJsonLd(homeDescription)) }}
        />
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;filter:none!important;clip-path:none!important}`}</style>
        </noscript>
        <a
          href="#main"
          className="sr-only z-[100] bg-graphite px-5 py-3 text-xs text-ivory focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <MotionProvider>
          <Header />
          <div id="main" className="flex-1">
            {children}
          </div>
          <Footer />
          <WhatsAppButton />
        </MotionProvider>
      </body>
    </html>
  );
}
