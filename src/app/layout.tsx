import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MotionProvider from "@/components/MotionProvider";
import PaletteSwitch from "@/components/PaletteSwitch";
import WhatsAppButton from "@/components/WhatsAppButton";
import { site } from "@/data/site";
import { businessJsonLd, serializeJsonLd } from "@/lib/structured-data";
import { homeDescription, homeTitle } from "@/lib/metadata";
import { reviewFontVariables } from "@/lib/review-fonts";

// One precise sans for headings and text, and its mono for labels, specs
// and figures: the studio's voice is architectural, not decorative.
const sans = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
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
  // TEMPORARY: remove this line at launch, once real photos and contact details are in.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#1a2520",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-IN"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${sans.variable} ${mono.variable} ${reviewFontVariables} antialiased`}
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
          <PaletteSwitch />
        </MotionProvider>
      </body>
    </html>
  );
}
