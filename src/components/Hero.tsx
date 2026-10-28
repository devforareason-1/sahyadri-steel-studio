import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { images } from "@/data/images";
import { services } from "@/data/services";
import Photo from "./Photo";

export default function Hero() {
  return (
    <section
      data-hero
      aria-labelledby="hero-title"
      className="on-dark relative flex min-h-[max(640px,100svh)] flex-col overflow-hidden bg-graphite text-ivory"
    >
      <div className="hero-media absolute inset-0">
        <Photo image={images.heroKitchen} sizes="100vw" priority />
      </div>
      {/* Graded overlay keeps the type legible over any photograph. */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,20,18,.55)_0%,rgba(20,20,18,.08)_30%,rgba(20,20,18,.18)_55%,rgba(20,20,18,.82)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,20,18,.55),transparent_65%)]" />
      <div aria-hidden="true" className="hero-curtain absolute inset-0 bg-graphite" />

      <div className="shell relative flex flex-1 flex-col justify-end pb-10 pt-[calc(var(--header-height)+48px)] sm:pb-14">
        <div className="grid items-end gap-12 lg:grid-cols-[1fr_auto]">
          <div className="max-w-[980px]">
            <p
              className="eyebrow fade-up text-champagne"
              style={{ animationDelay: "700ms" }}
            >
              Kitchens · Wardrobes · Steel
            </p>

            <h1 id="hero-title" className="display h-hero mt-7">
              <span className="line-mask">
                <span style={{ animationDelay: "800ms" }}>Crafted in Steel.</span>
              </span>
              <span className="line-mask">
                <span style={{ animationDelay: "950ms" }}>
                  Designed for <em className="text-champagne">Living.</em>
                </span>
              </span>
            </h1>

            <p
              className="fade-up mt-8 max-w-[480px] text-base leading-[1.75] text-ivory/85 sm:text-[1.075rem]"
              style={{ animationDelay: "1200ms" }}
            >
              Thoughtfully designed kitchens, wardrobes and bespoke
              stainless-steel interiors for modern living.
            </p>

            <div
              className="fade-up mt-10 flex flex-wrap gap-3"
              style={{ animationDelay: "1350ms" }}
            >
              <a href="#projects" className="btn btn-light">
                Explore Our Work
                <ArrowRight size={16} strokeWidth={1.6} />
              </a>
              <a href="#contact" className="btn btn-outline-light">
                Request a Quote
              </a>
            </div>
          </div>

          <nav
            aria-label="Our solutions"
            className="fade-up hidden w-[260px] lg:block"
            style={{ animationDelay: "1500ms" }}
          >
            <ol className="border-t border-ivory/25">
              {services.map((s) => (
                <li key={s.slug} className="border-b border-ivory/25">
                  <Link
                    href={`/services/${s.slug}`}
                    className="group flex items-baseline gap-4 py-3.5 text-[13px] text-ivory/80 transition-colors hover:text-ivory"
                  >
                    <span className="font-serif text-sm italic text-champagne">
                      {s.number}
                    </span>
                    <span className="flex-1">{s.title}</span>
                    <ArrowRight
                      size={14}
                      className="-translate-x-2 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        </div>

        <div
          className="fade-up mt-12 flex items-center justify-between gap-6 border-t border-ivory/20 pt-5 text-[11px] uppercase tracking-[0.2em] text-ivory/70"
          style={{ animationDelay: "1600ms" }}
        >
          <span>Shivamogga · Udupi</span>
          <span className="hidden normal-case tracking-[0.06em] sm:inline">
            Concept visual shown
          </span>
          <a
            href="#solutions"
            className="flex items-center gap-3 transition-colors hover:text-ivory"
          >
            Scroll
            <span aria-hidden="true" className="relative block h-8 w-px overflow-hidden bg-ivory/20">
              <span className="scroll-cue absolute inset-0 bg-ivory" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
