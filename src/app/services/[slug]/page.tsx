import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import { whatsappLink } from "@/data/site";
import Accessories from "@/components/Accessories";
import Gallery from "@/components/Gallery";
import Materials from "@/components/Materials";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import WardrobePlanner from "@/components/WardrobePlanner";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { pageMetadata } from "@/lib/metadata";
import { serializeJsonLd, serviceJsonLd } from "@/lib/structured-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return pageMetadata({
    title: `${service.title} in Shivamogga & Udupi`,
    description: service.searchDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const index = services.findIndex((s) => s.slug === slug);
  if (index === -1) notFound();
  const service = services[index];
  const next = services[(index + 1) % services.length];

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(serviceJsonLd(service)) }}
      />
      {/* The room's name and the way in first, with its photograph beside them
          running off the page. */}
      <section
        data-hero
        data-tone="light"
        aria-labelledby="service-title"
        className="grid pt-(--header-height) lg:min-h-[max(640px,100svh)] lg:grid-cols-[7fr_5fr]"
      >
        <div className="bleed-left flex flex-col justify-between gap-12 pb-12 pt-6 lg:pb-16 lg:pt-8">
          <Link href="/#spaces" className="link-line group self-start">
            <ArrowLeft size={15} strokeWidth={1.6} className="transition-transform group-hover:-translate-x-0.5" />
            All spaces
          </Link>

          <div>
            <h1 id="service-title" className="display h-xl max-w-[12ch]">
              <span className="line-mask">
                <span style={{ animationDelay: "150ms" }}>{service.title}</span>
              </span>
            </h1>
            <p className="lede fade-up mt-6 max-w-[540px]" style={{ animationDelay: "350ms" }}>
              {service.summary}
            </p>
            <div className="fade-up mt-9 flex flex-wrap items-center gap-x-8 gap-y-4" style={{ animationDelay: "450ms" }}>
              <Link href="/#contact" className="btn btn-primary">
                Request a Quote
                <ArrowRight size={16} strokeWidth={1.6} />
              </Link>
              <a
                href={whatsappLink(service.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="link-line"
              >
                <WhatsAppIcon size={15} />
                Ask on WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden bg-travertine lg:aspect-auto">
          <div className="hero-media absolute inset-0">
            <Photo image={service.image} sizes="(min-width: 1024px) 95vw, 100vw" priority />
          </div>
        </div>
      </section>

      <section data-tone="light" className="section">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-0">
          <Reveal className="lg:col-span-5">
            <p className="display h-md">{service.intro}</p>
          </Reveal>

          <ol className="lg:col-span-6 lg:col-start-7">
            {service.considerations.map((c, i) => (
              <Reveal as="li" key={c.title} delay={i * 80} className="grid grid-cols-[2.75rem_1fr] border-t border-line py-6 last:border-b">
                <span className="numeral pt-2">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h2 className="display h-sm">{c.title}</h2>
                  <p className="note mt-2 max-w-[480px]">{c.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {service.slug === "stainless-steel-kitchens" && <Accessories />}
      {service.slug === "stainless-steel-kitchens" && <Materials library />}

      {service.slug === "glass-steel-wardrobes" && (
        <section
          data-tone="stone"
          aria-labelledby="planner-title"
          className="section-tight bg-ivory-deep"
        >
          <div className="shell">
            <Reveal className="grid gap-8 pb-14 lg:grid-cols-12 lg:gap-0">
              <h2 id="planner-title" className="display h-md max-w-[560px] lg:col-span-6">
                Designed from the inside out, around the way you{" "}
                <em>dress each morning.</em>
              </h2>
              <div className="note space-y-4 lg:col-span-5 lg:col-start-8">
                <p>
                  We start with what you own: how much hangs, how much folds,
                  what needs a drawer. Then we plan each bay to match, using the
                  full height of the wall so nothing ends up on a chair.
                </p>
                <p>Explore a sample layout below. Select a zone to see how it works.</p>
              </div>
            </Reveal>
            <Reveal>
              <WardrobePlanner />
            </Reveal>
          </div>
        </section>
      )}

      <section
        data-tone="light"
        aria-label={`${service.title} gallery`}
        className="section"
      >
        <div className="shell">
          <Reveal className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
            <h2 className="display h-lg">Gallery</h2>
            {/* <p className="caption">
              Concept visuals for illustration only, not completed Sahyadri Steel Studio projects.
            </p> */}
          </Reveal>
          <Gallery images={service.gallery} />
        </div>
      </section>

      {/* Every room's page ends on the next step, then the next room. */}
      <section data-tone="sand" aria-labelledby="next-step-title" className="section-tight bg-travertine">
        <div className="shell flex flex-wrap items-end justify-between gap-x-12 gap-y-8">
          <h2 id="next-step-title" className="display h-lg">
            Let&rsquo;s design <em>yours.</em>
          </h2>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link href="/#contact" className="btn btn-primary">
              Request a Quote
              <ArrowRight size={16} strokeWidth={1.6} />
            </Link>
            <a
              href={whatsappLink(service.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="link-line"
            >
              <WhatsAppIcon size={15} />
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <nav aria-label="Next solution" data-tone="dark" className="on-dark bg-graphite text-ivory">
        <Link
          href={`/services/${next.slug}`}
          className="group shell flex items-center justify-between gap-6 py-10 sm:py-14"
        >
          <span>
            <span className="caption block text-ivory/65">Next</span>
            <span className="display h-md mt-2 block transition-colors group-hover:text-champagne">
              {next.title}
            </span>
          </span>
          <ArrowRight aria-hidden="true" size={26} strokeWidth={1.3} className="shrink-0 transition-transform group-hover:translate-x-1.5" />
        </Link>
      </nav>
    </main>
  );
}
