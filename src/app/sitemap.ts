import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { services } from "@/data/services";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${site.url}/`, lastModified: now },
    { url: `${site.url}/privacy`, lastModified: now },
    ...services.map((s) => ({
      url: `${site.url}/services/${s.slug}`,
      lastModified: now,
    })),
  ];
}