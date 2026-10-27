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
    default: "Sahyadri Steel Studio | Interior Design in Shimoga",
    template: "%s | Sahyadri Steel Studio",
  },
  description:
    "Thoughtfully designed modular kitchens, wardrobes, and interior upgrades by Sahyadri Steel Studio in Shimoga, Karnataka.",
  keywords: [
    "interior designer in Shimoga",
    "modular kitchen Shimoga",
    "wardrobe design Shimoga",
    "Sahyadri Steel Studio",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: site.name,
    title: "Sahyadri Steel Studio | Interior Design in Shimoga",
    description:
      "Modular kitchens, wardrobes, and interior upgrades in Shimoga, Karnataka.",
  },
  // TEMPORARY: remove this line at launch, once real photos and contact details are in.
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}