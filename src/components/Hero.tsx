import Image from "next/image";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="container-shell pt-8 sm:pt-10">
      <div className="relative min-h-[590px] overflow-hidden bg-[#c6bcae] sm:min-h-[650px] lg:min-h-[690px]">
        {/* Placeholder. Replace with a static import of the real hero photo. */}
        <Image
          src="https://placehold.co/2400x1400/F0ECE5/292A25?text=Sahyadri+Steel+Studio"
          alt="Sahyadri Steel Studio interior design"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent" />

        <div className="relative z-10 flex min-h-[590px] flex-col justify-between p-7 text-white sm:min-h-[650px] sm:p-12 lg:min-h-[690px] lg:p-16">
          <div className="flex items-center justify-between gap-4">
            <span className="eyebrow text-white/90">
              Interior Design &amp; Spaces
            </span>
            <span className="hidden text-[11px] tracking-[0.15em] text-white/80 sm:block">
              SHIMOGA · KARNATAKA
            </span>
          </div>

          <div className="max-w-[800px] pb-3">
            <p className="mb-5 text-xs uppercase tracking-[0.23em] text-white/85">
              Thoughtful spaces. Considered living.
            </p>

            <h1 className="display-heading text-balance text-[clamp(3.4rem,8vw,7.4rem)]">
              Designed for
              <br />
              the way you
              <br />
              <span className="italic text-[#e4d6c1]">live.</span>
            </h1>

            <p className="mt-7 max-w-[460px] text-sm leading-7 text-white/90 sm:text-base">
              Thoughtfully designed kitchens, wardrobes, and interiors that
              bring functionality and timeless character into your home.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="inline-flex min-h-12 items-center gap-5 bg-background px-5 py-3 text-xs font-medium text-foreground transition-colors hover:bg-[#e6dfd2]"
              >
                Explore Our Work
                <ArrowRight size={16} />
              </a>

              <a
                href="#contact"
                className="inline-flex min-h-12 items-center gap-3 border border-white/60 px-5 py-3 text-xs font-medium text-white transition-colors hover:bg-white/10"
              >
                Start a Conversation
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>

          <div className="flex items-end justify-between gap-4 border-t border-white/30 pt-5">
            <span className="max-w-[260px] text-[11px] leading-5 tracking-[0.08em] text-white/85">
              DESIGN THAT RESPECTS YOUR SPACE AND YOUR EVERYDAY LIFE.
            </span>

            <a
              href="#about"
              aria-label="Scroll to learn about the studio"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/50 transition-colors hover:bg-white/10"
            >
              <ArrowDown size={17} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}