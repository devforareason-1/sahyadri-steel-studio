import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { services } from "@/data/services";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${site.url}/` },
    { url: `${site.url}/privacy` },
    ...services.map((s) => ({
      url: `${site.url}/services/${s.slug}`,
    })),
  ];
}