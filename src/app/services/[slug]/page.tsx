import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import { whatsappLink } from "@/data/site";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
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
    title: `${service.title} in Shivamogga & Udupi`,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const index = services.findIndex((s) => s.slug === slug);
  if (index === -1) notFound();
  const service = services[index];
  const next = services[(index + 1) % services.length];

  return (
    <main>
      <section
        data-hero
        aria-labelledby="service-title"
        className="on-dark relative flex min-h-[max(560px,88svh)] items-end overflow-hidden bg-graphite text-ivory"
      >
        <div className="hero-media absolute inset-0">
          <Photo image={service.image} sizes="100vw" priority />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,20,18,.55),rgba(20,20,18,.1)_35%,rgba(20,20,18,.8))]" />
        <div aria-hidden="true" className="hero-curtain absolute inset-0 bg-graphite" />

        <div className="shell relative pb-14 pt-[calc(var(--header-height)+40px)] sm:pb-20">
          <Link
            href="/#solutions"
            className="fade-up inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-ivory/75 transition-colors hover:text-ivory"
            style={{ animationDelay: "600ms" }}
          >
            <ArrowLeft size={14} />
            All solutions
          </Link>
          <p
            className="fade-up mt-10 flex items-baseline gap-4"
            style={{ animationDelay: "700ms" }}
          >
            <span className="font-serif text-2xl italic text-champagne">{service.number}</span>
            <span className="text-[11px] uppercase tracking-[0.22em] text-ivory/75">
              {service.kicker}
            </span>
          </p>
          <h1 id="service-title" className="display h-xl mt-5 max-w-[900px]">
            <span className="line-mask">
              <span style={{ animationDelay: "800ms" }}>{service.title}</span>
            </span>
          </h1>
          <p
            className="fade-up mt-7 max-w-[520px] text-base leading-7 text-ivory/80"
            style={{ animationDelay: "1000ms" }}
          >
            {service.summary}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-0">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-champagne-ink">Our approach</p>
            <p className="display h-md mt-6">{service.intro}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/#contact"
                className="btn btn-dark"
              >
                Request a Quote
                <ArrowRight size={16} strokeWidth={1.6} />
              </Link>
              <a
                href={whatsappLink(service.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                <WhatsAppIcon size={16} />
                Ask on WhatsApp
              </a>
            </div>
          </Reveal>

          <ol className="border-t border-line lg:col-span-6 lg:col-start-7">
            {service.considerations.map((c, i) => (
              <Reveal as="li" key={c.title} delay={i * 80} className="grid grid-cols-[56px_1fr] border-b border-line py-7">
                <span className="numeral text-xl">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h2 className="font-serif text-[1.7rem] leading-tight">{c.title}</h2>
                  <p className="mt-2 max-w-[460px] text-[15px] leading-7 text-muted">{c.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section aria-label="Concept imagery" className="pb-24 sm:pb-32">
        <div className="shell grid gap-6 md:grid-cols-12">
          {service.gallery.map((img, i) => (
            <Reveal
              key={img.src}
              delay={i * 100}
              className={`group ${
                i === 0 ? "md:col-span-7" : i === 1 ? "md:col-span-5 md:mt-24" : "md:col-span-8 md:col-start-3"
              }`}
            >
              <div className={`media media-zoom ${i === 1 ? "aspect-[4/5]" : "aspect-[4/3]"} ${i === 2 ? "md:aspect-[16/9]" : ""}`}>
                <Photo image={img} sizes="(max-width: 768px) 100vw, 60vw" />
              </div>
              <p className="caption mt-3">{img.alt} · concept visual</p>
            </Reveal>
          ))}
        </div>
        <p className="shell caption mt-10">
          Concept visuals for illustration only. They do not show completed
          Sahyadri Steel Studio projects.
        </p>
      </section>

      <section className="on-dark bg-graphite text-ivory">
        <Link
          href={`/services/${next.slug}`}
          className="group shell flex flex-col gap-6 py-16 sm:flex-row sm:items-end sm:justify-between sm:py-24"
        >
          <span>
            <span className="eyebrow text-champagne">Next solution</span>
            <span className="display h-lg mt-5 block transition-colors group-hover:text-champagne">
              {next.title}
            </span>
          </span>
          <span className="flex h-16 w-16 shrink-0 items-center justify-center border border-ivory/30 transition-colors group-hover:bg-ivory group-hover:text-graphite">
            <ArrowUpRight size={22} strokeWidth={1.4} />
          </span>
        </Link>
      </section>
    </main>
  );
}
