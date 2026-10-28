import { ArrowRight } from "lucide-react";
import { images } from "@/data/images";
import Photo from "./Photo";
import { HeroDrift, HeroLift } from "./ScrollMotion";

export default function Hero() {
  return (
    <section
      data-hero
      data-tone="dark"
      aria-labelledby="hero-title"
      className="on-dark relative bg-graphite text-ivory"
    >
      <div className="grid min-h-[max(680px,100svh)] lg:grid-cols-12">
        {/* The photograph: a tall frame on the right that opens on load.
            On phones it sits on top and the headline overlaps its base. */}
        <div className="hero-frame relative h-[60svh] overflow-hidden min-h-[380px] lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:h-auto">
          {/* Drifts and slowly enlarges as the page scrolls away. */}
          <HeroDrift className="absolute inset-0">
            <div className="hero-media absolute inset-0">
              <Photo
                image={images.kitchenWalnut}
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />
            </div>
          </HeroDrift>
          {/* Keeps the header legible, and melts the image into the page. */}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(var(--ink-rgb)/.6)_0%,rgb(var(--ink-rgb)/0)_26%,rgb(var(--ink-rgb)/0)_55%,rgb(var(--ink-rgb))_100%)] lg:bg-[linear-gradient(180deg,rgb(var(--ink-rgb)/.55)_0%,rgb(var(--ink-rgb)/0)_22%),linear-gradient(90deg,rgb(var(--ink-rgb)/.85)_0%,rgb(var(--ink-rgb)/0)_38%)]" />

          <p className="absolute right-[var(--gutter)] top-[calc(var(--header-height)+20px)] hidden text-[11px] tracking-[0.08em] text-ivory/70 lg:block">
            Walnut, stone &amp; steel · concept visual
          </p>

        </div>

        <HeroLift className="relative z-10 -mt-28 flex flex-col pb-10 pl-[var(--gutter)] pr-[var(--gutter)] sm:pb-14 lg:col-span-7 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:pr-0 lg:pt-[calc(var(--header-height)+clamp(48px,9vh,112px))]">
          <p
            className="eyebrow fade-up text-champagne"
            style={{ animationDelay: "700ms" }}
          >
            Kitchens · Wardrobes · Steel
          </p>

          <h1 id="hero-title" className="display h-hero mt-6 lg:mt-9">
            <span className="line-mask">
              <span style={{ animationDelay: "800ms" }}>Crafted in steel.</span>
            </span>
            <span className="line-mask">
              <span style={{ animationDelay: "930ms" }}>Designed for</span>
            </span>
            <span className="line-mask">
              <span style={{ animationDelay: "1060ms" }}>
                <em className="text-champagne">living.</em>
              </span>
            </span>
          </h1>

          <div className="mt-auto pt-10 lg:max-w-[460px] lg:pt-14">
            <p
              className="fade-up max-w-[420px] text-base leading-[1.75] text-ivory/75 sm:text-[1.05rem]"
              style={{ animationDelay: "1250ms" }}
            >
              Kitchens, wardrobes and bespoke stainless-steel interiors,
              drawn for your rooms and made to be lived in.
            </p>

            <div
              className="fade-up mt-9 flex flex-wrap gap-3"
              style={{ animationDelay: "1400ms" }}
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

          <div
            className="fade-up mt-12 flex items-center justify-between gap-6 border-t border-ivory/15 pt-5 text-[11px] uppercase tracking-[0.2em] text-ivory/60 lg:mr-[calc(100%/7*2.2)]"
            style={{ animationDelay: "1600ms" }}
          >
            <span>Shivamogga · Udupi</span>
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
        </HeroLift>
      </div>

      {/* Detail inset that hangs over the edge into the next section. */}
      <figure className="hero-inset absolute bottom-0 right-[calc(var(--gutter)+3vw)] z-20 hidden translate-y-1/2 items-end gap-5 lg:flex">
        <figcaption className="pb-[calc(clamp(140px,12vw,200px)*2/3+16px)] text-right text-[11px] leading-5 text-ivory/70">
          <span className="block font-serif text-sm italic text-champagne">Detail</span>
          Brushed steel,
          <br />
          made to measure
        </figcaption>
        <div className="media aspect-[3/4] w-[clamp(140px,12vw,200px)] bg-graphite-soft">
          <Photo image={images.steelTap} sizes="200px" />
        </div>
      </figure>
    </section>
  );
}
