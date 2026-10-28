import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { site } from "@/data/site";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const title =
  "Sahyadri Steel Studio | Modular Kitchens, Wardrobes & Steel Interiors in Shivamogga and Udupi";
const description =
  "Thoughtfully designed modular kitchens, wardrobes and bespoke stainless-steel interiors for modern living. Studios in Shivamogga and Udupi, Karnataka.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url + "/"),
  title: {
    default: title,
    template: "%s | Sahyadri Steel Studio",
  },
  description,
  keywords: [
    "modular kitchen Shivamogga",
    "modular kitchen Udupi",
    "wardrobe design Shivamogga",
    "wardrobe design Udupi",
    "stainless steel kitchen Karnataka",
    "interior design Shivamogga",
    "interior design Udupi",
    "Sahyadri Steel Studio",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: site.name,
    title,
    description,
  },
  // TEMPORARY: remove this line at launch, once real photos and contact details are in.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#1c1c1a",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-IN"
      data-scroll-behavior="smooth"
      className={`${display.variable} ${body.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col">
        <noscript>
          <style>{`.reveal{opacity:1;transform:none}`}</style>
        </noscript>
        <a
          href="#main"
          className="sr-only z-[100] bg-graphite px-5 py-3 text-xs text-ivory focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Header />
        <div id="main" className="flex-1">
          {children}
        </div>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
