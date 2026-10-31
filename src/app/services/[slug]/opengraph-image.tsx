import { services } from "@/data/services";
import { ogCard, ogContentType, ogSize } from "@/lib/og-card";

export const alt = "Sahyadri Steel Studio, Shivamogga and Udupi";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug) ?? services[0];
  return ogCard({
    title: service.title,
    photo: service.image,
    note: `${service.kicker} · Shivamogga & Udupi`,
  });
}
