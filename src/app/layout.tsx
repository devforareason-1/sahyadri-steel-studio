import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { site } from "@/data/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url + "/"),
  title: {
    default: "Sahyadri Steel Studio | Interior Designers in Shimoga & Udupi",
    template: "%s | Sahyadri Steel Studio",
  },
  description:
    "Modular kitchens, wardrobes and interior upgrades for homes in Shimoga and Udupi, Karnataka. Planned with you, built with care.",
  keywords: [
    "interior designer in Shimoga",
    "interior designer in Udupi",
    "modular kitchen Shimoga",
    "modular kitchen Udupi",
    "wardrobe design Karnataka",
    "Sahyadri Steel Studio",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: site.name,
    title: "Sahyadri Steel Studio | Interior Designers in Shimoga & Udupi",
    description:
      "Modular kitchens, wardrobes and interior upgrades in Shimoga and Udupi.",
  },
  // TEMPORARY: remove this line at launch, once real photos and contact details are in.
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${geistSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <noscript>
          <style>{`.reveal{opacity:1;transform:none}`}</style>
        </noscript>
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
