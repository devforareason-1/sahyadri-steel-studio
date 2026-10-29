"use client";

import { ArrowRight } from "lucide-react";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import { images } from "@/data/images";
import { scrollSpring } from "@/lib/motion";
import Photo from "./Photo";

// The opening scene: a kitchen in the dark. The section is taller than the
// screen and its stage stays pinned while the visitor scrolls through it;
// that scroll is the light switch. A pool of light spreads from the centre
// of the counter, the studio's name surfaces in it, then the headline and
// the way in follow. Visitors who prefer reduced motion, and pages without
// JavaScript, get the lit scene straight away.

// Ink for the darkness: near-black, with the faintest trace of the site's green.
const NIGHT = "6 9 8";

function Copy() {
  return (
    <>
      <p className="max-w-[34ch] text-balance text-[clamp(1.05rem,1.6vw,1.3rem)] font-light leading-snug text-ivory/85">
        Designed around the way you live. Built in steel.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <a href="#contact" className="btn btn-light">
          Book a design consultation
          <ArrowRight size={16} strokeWidth={1.6} />
        </a>
        <a href="#projects" className="btn btn-outline-light">
          View our work
        </a>
      </div>
    </>
  );
}

function Name({ className = "" }: { className?: string }) {
  return (
    <h1 id="hero-title" className={`flex flex-col items-center leading-none ${className}`}>
      <span className="text-[clamp(2.8rem,9vw,7.5rem)] font-light [text-shadow:0_0_60px_rgb(255_226_180/0.25)]">
        SAHYADRI
      </span>
      <span aria-hidden="true" className="steel-rule my-[clamp(12px,1.6vw,22px)] w-full" />
      <span className="text-[clamp(12px,1.35vw,17px)] font-semibold tracking-[0.62em] text-ivory [text-shadow:0_1px_2px_rgb(0_0_0/0.9),0_0_18px_rgb(0_0_0/0.75)]">
        STEEL STUDIO
      </span>
    </h1>
  );
}

function Backdrop({ children }: { children?: React.ReactNode }) {
  return (
    <div className="absolute inset-0">
      <Photo image={images.kitchenNight} sizes="100vw" quality={70} priority />
      {children}
    </div>
  );
}

// The lit scene, used as is when motion is unwelcome.
function StillHero() {
  return (
    <section
      data-hero
      data-tone="dark"
      aria-labelledby="hero-title"
      className="on-dark relative flex min-h-[max(640px,100svh)] items-center justify-center overflow-hidden bg-[#060908] text-ivory"
    >
      <Backdrop>
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 90vmax 60vmax at 50% 50%, rgb(${NIGHT} / .15), rgb(${NIGHT} / .55) 55%, rgb(${NIGHT} / .85))`,
          }}
        />
      </Backdrop>
      <div className="relative flex flex-col items-center px-[var(--gutter)] text-center">
        <Name className="tracking-[0.2em]" />
        <div className="mt-12 flex flex-col items-center">
          <Copy />
        </div>
      </div>
    </section>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, scrollSpring);

  // The light: a pool that widens from a glint on the counter to the whole
  // room. Underneath, the room in shadow; inside the pool, the same
  // photograph lit and warm. Two layers keep the light always brighter than
  // the dark, whatever the photograph.
  const radius = useTransform(p, [0, 0.7], [4, 120]);
  const pool = useMotionTemplate`radial-gradient(ellipse ${radius}vmax calc(${radius}vmax * 0.62) at 50% 52%, #000 0%, #000 35%, transparent 100%)`;
  const glow = useTransform(p, [0.04, 0.4], [0, 1]);
  const photoScale = useTransform(p, [0, 1], [1.08, 1]);

  // The name surfaces in the light, letters drawing together as it sharpens,
  // then lifts to make room for the headline.
  const nameOpacity = useTransform(p, [0.12, 0.42], [0, 1]);
  const nameSpacing = useTransform(p, [0.12, 0.5], [0.6, 0.2]);
  const nameLetters = useMotionTemplate`${nameSpacing}em`;
  const nameBlur = useTransform(p, [0.12, 0.45], [12, 0]);
  const nameFilter = useMotionTemplate`blur(${nameBlur}px)`;
  const nameY = useTransform(p, [0.5, 0.8], ["0vh", "-9vh"]);

  const copyOpacity = useTransform(p, [0.58, 0.82], [0, 1]);
  const copyY = useTransform(p, [0.58, 0.82], [28, 0]);
  // Out of the tab order until it can be seen.
  const copyVisibility = useTransform(p, (v) => (v > 0.5 ? "visible" : "hidden"));

  const cueOpacity = useTransform(p, [0, 0.1], [1, 0]);

  if (reduce) return <StillHero />;

  return (
    <section
      ref={ref}
      data-hero
      data-tone="dark"
      aria-labelledby="hero-title"
      className="hero-scene on-dark relative h-[230svh] bg-[#060908] text-ivory"
    >
      <noscript>
        <style>{`.hero-scene{height:auto!important}.hero-scene [data-lit]{mask-image:none!important;-webkit-mask-image:none!important}.hero-scene [data-late]{opacity:1!important;visibility:visible!important;transform:none!important;filter:none!important}`}</style>
      </noscript>

      <div className="sticky top-0 flex h-[100svh] min-h-[560px] items-center justify-center overflow-hidden">
        <motion.div style={{ scale: photoScale }} className="absolute inset-0">
          {/* The room in shadow: the photograph, nearly lost in the dark. */}
          <div className="absolute inset-0 brightness-[0.4]">
            <Backdrop />
          </div>
          <div aria-hidden="true" className="absolute inset-0 bg-[rgb(6_9_8/0.85)]" />

          {/* The room in light, seen only inside the widening pool. */}
          <motion.div
            data-lit
            style={{ maskImage: pool, WebkitMaskImage: pool }}
            className="absolute inset-0 brightness-[1.3]"
          >
            <Backdrop />
          </motion.div>
        </motion.div>

        {/* Warm light falling on the counter. */}
        <motion.div
          aria-hidden="true"
          style={{ opacity: glow }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_60vmax_34vmax_at_50%_52%,rgb(255_214_160/0.14),transparent_70%)] mix-blend-screen"
        />
        {/* A soft vignette holds the edges in shadow. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_80vmax_55vmax_at_50%_50%,transparent_40%,rgb(6_9_8/0.75)_100%)]"
        />

        <div className="relative flex flex-col items-center px-[var(--gutter)] text-center">
          <motion.div
            data-late
            style={{ opacity: nameOpacity, letterSpacing: nameLetters, filter: nameFilter, y: nameY }}
          >
            <Name />
          </motion.div>

          <motion.div
            data-late
            style={{ opacity: copyOpacity, y: copyY, visibility: copyVisibility }}
            className="absolute top-full mt-2 flex w-[min(92vw,640px)] flex-col items-center"
          >
            <Copy />
          </motion.div>
        </div>

        <motion.p
          aria-hidden="true"
          style={{ opacity: cueOpacity }}
          className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ivory/60"
        >
          Scroll to switch on the lights
          <span className="relative block h-10 w-px overflow-hidden bg-ivory/20">
            <span className="scroll-cue absolute inset-0 bg-ivory" />
          </span>
        </motion.p>

        <p className="absolute bottom-6 right-[var(--gutter)] hidden font-mono text-[11px] tracking-[0.04em] text-ivory/45 lg:block">
          Concept visual
        </p>
      </div>
    </section>
  );
}
