import type { Metadata } from "next";
import { site } from "@/data/site";

// The home page's search result. Google shows about 60 characters of a
// title and 155 of a description, so the words that matter come first.
export const homeTitle = "Sahyadri Steel Studio | Steel Kitchens & Wardrobes, Shivamogga & Udupi";
export const homeDescription =
  "Women-led design studio for stainless-steel kitchens, glass-and-steel wardrobes and vanities, with no wood anywhere. Studios in Shivamogga and Udupi.";

// Next.js replaces nested metadata (openGraph, twitter) per page instead of
// merging it, so every page builds its full set here. Otherwise a page would
// show the home page's title and description when its link is shared.
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: {
  title: string; // without the studio's name; the layout's template adds it
  description: string; // about 150 characters, written for the search result
  path: string; // e.g. "/services/vanity-units"
  absoluteTitle?: boolean; // true when the title already names the studio
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${site.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: site.name,
      title: fullTitle,
      description,
      url: path,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
