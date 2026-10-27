import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Check } from "lucide-react";
import { services } from "@/data/services";
import { whatsappUrl } from "@/data/site";
import SectionLabel from "@/components/SectionLabel";
import WhatsAppIcon from "@/components/WhatsAppIcon";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.title} in Shimoga & Udupi`,
    description: service.description,
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  return (
    <main className="section-padding">
      <div className="container-shell">
        <Link
          href="/#services"
          className="inline-flex items-center gap-2 text-xs text-muted hover:text-foreground"
        >
          <ArrowLeft size={14} />
          All services
        </Link>

        <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionLabel>Service {service.number}</SectionLabel>
            <h1 className="display-heading text-balance mt-6 text-5xl sm:text-6xl">
              {service.title}
            </h1>
            <p className="mt-6 max-w-[520px] text-base leading-8 text-muted">
              {service.description}
            </p>

            <ul className="mt-8 space-y-4">
              {service.details.map((detail) => (
                <li
                  key={detail}
                  className="flex items-start gap-3 text-sm leading-6"
                >
                  <Check size={16} className="mt-1 shrink-0 text-accent" />
                  {detail}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-3 bg-[#1fa855] px-6 py-3 text-xs font-medium text-white transition-opacity hover:opacity-90"
              >
                <WhatsAppIcon size={17} />
                Chat on WhatsApp
              </a>
              <Link
                href="/#contact"
                className="inline-flex min-h-12 items-center border border-border px-5 py-3 text-xs font-medium"
              >
                Other ways to reach us
              </Link>
            </div>
          </div>

          <div className="relative aspect-[4/4.6] bg-surface">
            <Image
              src={service.image}
              alt={service.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
