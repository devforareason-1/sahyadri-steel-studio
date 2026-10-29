import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import { whatsappLink } from "@/data/site";
import Materials from "@/components/Materials";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import WardrobePlanner from "@/components/WardrobePlanner";
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
  // Kitchens and wardrobes carry an interactive tool between the approach
  // and the gallery.
  const hasTool = service.slug === "stainless-steel-kitchens" || service.slug === "glass-steel-wardrobes";

  return (
    <main>
      <section
        data-hero
        data-tone="dark"
        aria-labelledby="service-title"
        className="on-dark relative flex min-h-[max(560px,88svh)] items-end overflow-hidden bg-graphite text-ivory"
      >
        <div className="hero-media absolute inset-0">
          <Photo image={service.image} sizes="100vw" priority />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(var(--ink-rgb)/.55),rgb(var(--ink-rgb)/.1)_35%,rgb(var(--ink-rgb)/.8))]" />

        {/* The way back sits where people look for it, top left under the
            header, as a solid button that reads against any photo. */}
        <div className="shell absolute inset-x-0 top-[calc(var(--header-height)+24px)] z-10">
          <Link
            href="/#spaces"
            className="fade-up group inline-flex min-h-11 items-center gap-2.5 rounded-full border border-ivory/35 bg-graphite/55 py-2 pl-3.5 pr-5 text-[14px] text-ivory backdrop-blur-md transition-colors hover:border-ivory hover:bg-ivory hover:text-graphite"
            style={{ animationDelay: "200ms" }}
          >
            <ArrowLeft size={16} strokeWidth={1.6} className="transition-transform group-hover:-translate-x-0.5" />
            Back to all spaces
          </Link>
        </div>

        <div className="shell relative pb-14 pt-[calc(var(--header-height)+96px)] sm:pb-20">
          <p
            className="fade-up flex items-baseline gap-4"
            style={{ animationDelay: "300ms" }}
          >
            <span className="font-mono text-[13px] text-champagne">{service.number}</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ivory/75">
              {service.kicker}
            </span>
          </p>
          <h1 id="service-title" className="display h-xl mt-5 max-w-[900px]">
            <span className="line-mask">
              <span style={{ animationDelay: "400ms" }}>{service.title}</span>
            </span>
          </h1>
          <p
            className="fade-up mt-7 max-w-[520px] text-base leading-7 text-ivory/80"
            style={{ animationDelay: "600ms" }}
          >
            {service.summary}
          </p>
        </div>
      </section>

      <section data-tone="light" className="section">
        <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-0">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-muted">Our approach</p>
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

      {service.slug === "stainless-steel-kitchens" && <Materials />}

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
              <div className="space-y-4 text-[15px] leading-7 text-muted lg:col-span-5 lg:col-start-8">
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
        aria-label="Concept imagery"
        className={hasTool ? "section" : "pb-24 sm:pb-32"}
      >
        <div className="shell grid gap-6 md:grid-cols-12">
          {service.gallery.map((img, i) => (
            <Reveal
              key={img.alt}
              delay={i * 100}
              // A wide/narrow pair of equal height, then one image across the
              // full width, so every edge lines up with the grid.
              className={`group flex flex-col ${
                i === 0 ? "md:col-span-7" : i === 1 ? "md:col-span-5" : "md:col-span-12"
              }`}
            >
              <div
                className={`media media-zoom ${
                  i === 0
                    ? "aspect-[4/3]"
                    : i === 1
                      ? "aspect-[4/5] md:aspect-auto md:flex-1"
                      : "aspect-[4/3] md:aspect-[21/9]"
                }`}
              >
                <Photo image={img} sizes={i === 2 ? "100vw" : "(max-width: 768px) 100vw, 60vw"} />
              </div>
              {img.src && (
                <p className={`caption mt-3 ${i < 2 ? "md:min-h-[2lh]" : ""}`}>
                  {img.alt} · concept visual
                </p>
              )}
            </Reveal>
          ))}
        </div>
        <p className="shell caption mt-10">
          Concept visuals for illustration only. They do not show completed
          Sahyadri Steel Studio projects.
        </p>
      </section>

      <section data-tone="dark" className="on-dark bg-graphite text-ivory">
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
