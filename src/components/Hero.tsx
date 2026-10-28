import Image from "next/image";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import Parallax from "./Parallax";

export default function Hero() {
  return (
    <section className="container-shell pt-8 sm:pt-10">
      <div className="relative min-h-[600px] overflow-hidden bg-[#c6bcae] sm:min-h-[660px] lg:min-h-[700px]">
        <Parallax className="absolute inset-0" speed={0.12}>
          <Image
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2400&q=85"
            alt="A warm, welcoming living room with natural light"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-black/5" />

        <div className="relative z-10 flex min-h-[600px] flex-col justify-between p-7 text-white sm:min-h-[660px] sm:p-12 lg:min-h-[700px] lg:p-16">
          <div className="flex items-center justify-between gap-4">
            <span className="eyebrow text-white/90">Interior Design</span>
            <span className="text-[11px] tracking-[0.15em] text-white/85">
              SHIMOGA · UDUPI
            </span>
          </div>

          <Reveal className="max-w-[800px] pb-3">
            <h1 className="display-heading text-balance text-[clamp(3.2rem,8vw,7rem)]">
              Come home to
              <br />
              a space made
              <br />
              for <span className="italic text-[#e8d9c3]">you.</span>
            </h1>

            <p className="mt-7 max-w-[470px] text-sm leading-7 text-white/90 sm:text-base sm:leading-8">
              Modular kitchens, wardrobes and interiors, planned with you and
              built with care, in Shimoga and Udupi.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="inline-flex min-h-12 items-center gap-5 bg-background px-5 py-3 text-xs font-medium text-foreground transition-colors hover:bg-[#e6dfd2]"
              >
                Start a Conversation
                <ArrowRight size={16} />
              </a>

              <a
                href="#projects"
                className="inline-flex min-h-12 items-center gap-3 border border-white/60 px-5 py-3 text-xs font-medium text-white transition-colors hover:bg-white/10"
              >
                See Our Work
                <ArrowUpRight size={15} />
              </a>
            </div>
          </Reveal>

          <div className="flex items-end justify-between gap-4 border-t border-white/30 pt-5">
            <span className="max-w-[280px] text-[11px] leading-5 tracking-[0.08em] text-white/85">
              DESIGN THAT FITS YOUR SPACE AND YOUR EVERYDAY LIFE.
            </span>

            <a
              href="#about"
              aria-label="Scroll down to learn about the studio"
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
