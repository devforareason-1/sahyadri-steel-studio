"use client";

import { ArrowRight } from "lucide-react";
import {
  animate,
  motion,
  type MotionValue,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { images } from "@/data/images";
import Photo from "./Photo";

// The opening scene plays by itself, like a short film: a kitchen island in the
// dark, three pendant lights hanging over its counter. The middle pendant comes
// on, then the outer two, and warm light spreads over the room as the studio's
// name surfaces in it, then the headline and the way in. It plays on arrival and
// on a refresh, but not on coming back to the home page from another page.
// Scrolling or pressing a key hurries it to the end, so it never holds anyone up.
// Visitors who prefer reduced motion, and pages without JavaScript, get the lit
// scene straight away.

// How long the film runs, in seconds. The timings below are shares of it.
const FILM_LENGTH = 10;

// Whether the visitor prefers reduced motion. The server can't know, so the
// page starts from the film as the server sent it and changes straight after,
// which keeps the first render the same on both sides.
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
function watchReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

// Coming back to the home page shows the finished scene. The note lasts until the
// browser tab closes, and a refresh clears it (see the script below), so reloading
// the page always opens on the dark room again.
const FILM_NOTE = "sahyadri-film-played";
function filmPlayed() {
  try {
    return sessionStorage.getItem(FILM_NOTE) !== null;
  } catch {
    return false;
  }
}
function noteFilmPlayed() {
  try {
    sessionStorage.setItem(FILM_NOTE, "1");
  } catch {
    // Without storage the film simply plays again next time.
  }
}

// Where the pendants hang in the photograph, as a share of its width and height.
const LAMP_LEFT = "24%";
const LAMP_MIDDLE = "49.5%";
const LAMP_RIGHT = "75%";
const LAMP_TOP = "30%";

function Copy() {
  return (
    <>
      {/* What the studio does, in words, from the first frame: the film is only the
          setting for it. */}
      <p className="max-w-[34ch] text-[clamp(1.05rem,1.7vw,1.35rem)] leading-snug text-ivory [text-shadow:0_1px_2px_rgb(0_0_0/0.8),0_0_18px_rgb(0_0_0/0.6)]">
        Stainless-steel kitchens, wardrobes and vanities that won&rsquo;t swell, warp or
        rot in the monsoon.
        <span className="mt-2 block text-[0.85em] text-ivory/85">
          A women-led design studio in Shivamogga and Udupi.
        </span>
      </p>
      <a href="#contact" className="btn btn-primary mt-8">
        Request a Quote
        <ArrowRight size={16} strokeWidth={1.6} />
      </a>
    </>
  );
}

function Name({ className = "" }: { className?: string }) {
  return (
    <h1 id="hero-title" data-hero-name className={`flex flex-col items-center leading-none ${className}`}>
      {/* Set in capitals by CSS, so search engines and screen readers get
          the name as written: "Sahyadri Steel Studio". */}
      <span className="font-serif text-[clamp(2.8rem,7.5vw,6.5rem)] font-light uppercase [text-shadow:0_0_60px_rgb(255_226_180/0.25)]">
        Sahyadri
      </span>{" "}
      <span aria-hidden="true" className="steel-rule my-[clamp(12px,1.6vw,22px)] w-full" />
      <span className="text-[clamp(12px,1.35vw,17px)] font-semibold uppercase tracking-[0.62em] text-ivory [text-shadow:0_1px_2px_rgb(0_0_0/0.9),0_0_18px_rgb(0_0_0/0.75)]">
        Steel Studio
      </span>
    </h1>
  );
}

// The photograph's own frame, so the lights stay on the pendants whatever the
// screen's shape. It fills the screen the way a cover image would, except on
// tall, narrow screens, where it stops short so all three pendants still fit.
// On phones it hangs from the header, leaving the dark below it for the words.
// Its edges melt into the dark, which also holds the daylit window in shadow.
function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute left-1/2 top-1/2 aspect-[3/2] w-[min(max(100vw,150svh),160vw)] -translate-x-1/2 -translate-y-1/2 max-sm:top-(--header-height) max-sm:w-[170vw] max-sm:translate-y-0">
      {children}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(#2b211b_1%,transparent_14%,transparent_86%,#2b211b_99%),linear-gradient(90deg,rgb(43_33_27/0.6),transparent_16%,transparent_76%,rgb(43_33_27/0.92)_93%)] xl:bg-[linear-gradient(transparent_86%,#2b211b_99%),linear-gradient(90deg,rgb(43_33_27/0.6),transparent_16%,transparent_76%,rgb(43_33_27/0.92)_93%)]"
      />
    </div>
  );
}

function Kitchen() {
  return (
    <div className="absolute inset-0">
      <Photo
        image={images.kitchenIsland}
        sizes="(max-width: 640px) 100vw, (max-aspect-ratio: 3/2) 150vh, 100vw"
        quality={70}
        priority
      />
    </div>
  );
}

function Lamp({ left, opacity }: { left: string; opacity?: MotionValue<number> }) {
  return (
    <motion.div
      data-late
      aria-hidden="true"
      style={{ left, top: LAMP_TOP, opacity }}
      className="absolute aspect-square w-[34%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(255_176_92/0.6),transparent)] mix-blend-screen"
    />
  );
}

function CounterGlow({ opacity }: { opacity?: MotionValue<number> }) {
  return (
    <motion.div
      data-late
      aria-hidden="true"
      style={{ opacity }}
      className="absolute inset-x-0 top-[52%] h-[42%] bg-[radial-gradient(ellipse_closest-side,rgb(255_190_115/0.32),transparent)] mix-blend-screen"
    />
  );
}

// Holds the words clear of the pale tiles behind them.
function Scrim({ opacity }: { opacity?: MotionValue<number> }) {
  return (
    <motion.div
      data-late
      aria-hidden="true"
      style={{ opacity }}
      className="absolute inset-0 bg-[radial-gradient(ellipse_95%_14%_at_50%_36%,rgb(43_33_27/0.7),transparent)] sm:bg-[radial-gradient(ellipse_56%_38%_at_50%_54%,rgb(43_33_27/0.78),transparent)]"
    />
  );
}

// The name stands below the pendants with the headline under it. On phones the
// name sits in the photograph and the headline in the dark beneath it.
const STAGE_LAYOUT = "flex items-center justify-center pt-[8svh] max-sm:items-start max-sm:pt-[calc(var(--header-height)+46vw)]";
const WORDS_LAYOUT = "relative flex flex-col items-center px-[var(--gutter)] text-center";
const COPY_LAYOUT = "mt-7 flex flex-col items-center max-sm:mt-[34vw]";

// The lit scene, used as is when motion is unwelcome.
function StillHero() {
  return (
    <section
      data-hero
      data-tone="dark"
      aria-labelledby="hero-title"
      className={`on-dark relative min-h-[max(640px,100svh)] overflow-hidden bg-[#2b211b] text-ivory ${STAGE_LAYOUT}`}
    >
      <Frame>
        <Kitchen />
        <Lamp left={LAMP_LEFT} />
        <Lamp left={LAMP_MIDDLE} />
        <Lamp left={LAMP_RIGHT} />
        <CounterGlow />
      </Frame>
      <Scrim />
      <div className={WORDS_LAYOUT}>
        <Name className="tracking-[0.2em]" />
        <div className={COPY_LAYOUT}>
          <Copy />
        </div>
      </div>
    </section>
  );
}

export default function Hero() {
  const reduce = useSyncExternalStore(
    watchReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false
  );
  const stage = useRef<HTMLDivElement>(null);
  const hurryRef = useRef<(() => void) | null>(null);
  const p = useMotionValue(0);

  // Rolls once the photograph has arrived, so the lights don't come on over an
  // empty frame, but never waits long for a slow connection.
  useEffect(() => {
    const photo = stage.current?.querySelector<HTMLImageElement>("[data-lit] img");
    if (reduce || !stage.current) {
      p.set(1);
      return;
    }
    if (filmPlayed() || window.scrollY > 0) {
      noteFilmPlayed();
      p.set(1);
      // The motion values now hold the finished scene, so the stylesheet can
      // stop holding it (see the script below) and scrolling can move the words.
      delete document.documentElement.dataset.filmSeen;
      return;
    }

    let film: ReturnType<typeof animate> | undefined;
    let waiting: ReturnType<typeof setTimeout> | undefined;
    const roll = () => {
      if (film) return;
      clearTimeout(waiting);
      film = animate(p, 1, { duration: FILM_LENGTH, ease: "linear" });
    };
    const hurry = () => {
      film?.stop();
      clearTimeout(waiting);
      film = animate(p, 1, { duration: 0.5, ease: "easeOut" });
    };

    hurryRef.current = hurry;
    if (!photo || photo.complete) roll();
    else {
      photo.addEventListener("load", roll, { once: true });
      waiting = setTimeout(roll, 1800);
    }
    window.addEventListener("scroll", hurry, { once: true, passive: true });
    window.addEventListener("keydown", hurry, { once: true });

    return () => {
      hurryRef.current = null;
      film?.stop();
      clearTimeout(waiting);
      photo?.removeEventListener("load", roll);
      window.removeEventListener("scroll", hurry);
      window.removeEventListener("keydown", hurry);
    };
  }, [p, reduce]);

  // Noted once it has got under way, not when it starts: React runs the effect
  // above twice in development, stopping the first run before it has moved.
  useMotionValueEvent(p, "change", (v) => {
    if (v > 0) noteFilmPlayed();
  });

  // The lights: the middle pendant first, then the outer two. Each throws a
  // pool of warm light that widens until the room is lit. Underneath, the room
  // in shadow; inside the pools, the same photograph lit and warm. Two layers
  // keep the light always brighter than the dark, whatever the photograph.
  const middleOn = useTransform(p, [0.02, 0.12], [0, 1]);
  const sidesOn = useTransform(p, [0.1, 0.2], [0, 1]);
  const middleReach = useTransform(p, [0.02, 0.42], [0, 110]);
  const sidesReach = useTransform(p, [0.1, 0.45], [0, 110]);
  const pools = useMotionTemplate`radial-gradient(ellipse ${middleReach}% calc(${middleReach}% * 1.55) at ${LAMP_MIDDLE} ${LAMP_TOP}, #000 0%, #000 35%, transparent 100%), radial-gradient(ellipse ${sidesReach}% calc(${sidesReach}% * 1.55) at ${LAMP_LEFT} ${LAMP_TOP}, #000 0%, #000 35%, transparent 100%), radial-gradient(ellipse ${sidesReach}% calc(${sidesReach}% * 1.55) at ${LAMP_RIGHT} ${LAMP_TOP}, #000 0%, #000 35%, transparent 100%)`;
  const counterOn = useTransform(p, [0.08, 0.35], [0, 1]);
  const scrimOn = useTransform(p, [0.1, 0.3], [0, 1]);
  const photoScale = useTransform(p, [0, 1], [1.08, 1]);

  // The name surfaces in the light, letters drawing together as it sharpens.
  const nameSpacing = useTransform(p, [0.08, 0.32], [0.6, 0.2]);
  const nameLetters = useMotionTemplate`${nameSpacing}em`;
  const nameBlur = useTransform(p, [0.08, 0.3], [12, 0]);
  const nameFilter = useMotionTemplate`blur(${nameBlur}px)`;

  const nameOpacity = useTransform(p, [0.08, 0.28], [0, 1]);

  // The nav's words hang against the ceiling: pale while the room is dark, and
  // dark once the lights have reached it. See .hero-nav in globals.css.
  const navInk = useTransform(p, [0.12, 0.22], ["#f7f1e8", "#2b211b"]);
  useEffect(() => {
    const root = document.documentElement;
    const showInk = (v: string) => root.style.setProperty("--hero-nav-ink", v);
    showInk(navInk.get());
    const stopInk = navInk.on("change", showInk);
    return () => {
      stopInk();
      root.style.removeProperty("--hero-nav-ink");
    };
  }, [navInk]);

  // Parallax as the page moves on: the room drifts down at a fraction of the
  // scroll, so it falls behind the page, while the words rise ahead of it and
  // fade. Distances are in pixels of scroll; the hero sits at the page's top.
  const { scrollY } = useScroll();
  const photoY = useTransform(scrollY, (v) => v * 0.4);
  const wordsLeave = useTransform(scrollY, [0, 420], [1, 0]);

  const wordsY = useTransform(scrollY, (v) => v * -0.15);
  // The "Skip intro" control is only there while the film is still running.
  const skipVisibility = useTransform(p, (v) => (v < 0.95 ? "visible" : "hidden"));

  if (reduce) return <StillHero />;

  return (
    <section
      data-hero
      data-tone="dark"
      aria-labelledby="hero-title"
      className="hero-scene on-dark relative bg-[#2b211b] text-ivory"
    >
      <noscript>
        <style>{`.hero-scene [data-lit]{mask-image:none!important;-webkit-mask-image:none!important}.hero-scene [data-late]{opacity:1!important;visibility:visible!important;transform:none!important;filter:none!important}.hero-scene h1{letter-spacing:.2em}.header-wordmark{opacity:1!important}.hero-skip{display:none}:root{--hero-nav-ink:#2b211b}`}</style>
      </noscript>
      {/* Before the page's first paint: a refresh starts the film over; otherwise a
          visitor who has seen it starts from the lit scene, not from a dark flash.
          Lifted by the effect above. */}
      <script
        dangerouslySetInnerHTML={{
          __html: `try{var n=performance.getEntriesByType("navigation")[0];if(n&&n.type==="reload")sessionStorage.removeItem("${FILM_NOTE}");if(sessionStorage.getItem("${FILM_NOTE}"))document.documentElement.dataset.filmSeen=""}catch(e){}`,
        }}
      />

      <div
        ref={stage}
        data-hero-stage
        className={`relative h-[100svh] min-h-[560px] overflow-hidden ${STAGE_LAYOUT}`}
      >
        <motion.div style={{ scale: photoScale, y: photoY }} className="absolute inset-0">
          <Frame>
            {/* The room with the lights off: nearly lost in the dark. */}
            <div className="absolute inset-0 brightness-[0.4]">
              <Kitchen />
            </div>
            <div aria-hidden="true" className="absolute inset-0 bg-[rgb(43_33_27/0.88)]" />

            {/* The room with the lights on, seen only inside the widening pools. */}
            <motion.div
              data-lit
              style={{ maskImage: pools, WebkitMaskImage: pools }}
              className="absolute inset-0 brightness-[1.04] saturate-[1.1] sepia-[0.24]"
            >
              <Kitchen />
              <div aria-hidden="true" className="absolute inset-0 bg-[rgb(255_160_80/0.12)] mix-blend-soft-light" />
            </motion.div>

            {/* Warm light at each pendant, and falling on the counter. */}
            <Lamp left={LAMP_MIDDLE} opacity={middleOn} />
            <Lamp left={LAMP_LEFT} opacity={sidesOn} />
            <Lamp left={LAMP_RIGHT} opacity={sidesOn} />
            <CounterGlow opacity={counterOn} />
          </Frame>
        </motion.div>

        <Scrim opacity={scrimOn} />

        {/* A soft vignette holds the edges in shadow. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_80vmax_55vmax_at_50%_50%,transparent_55%,rgb(43_33_27/0.6)_100%)]"
        />

        <motion.div
          data-late
          style={{ opacity: wordsLeave, y: wordsY }}
          className={WORDS_LAYOUT}
        >
          <motion.div
            data-late
            style={{ opacity: nameOpacity, letterSpacing: nameLetters, filter: nameFilter }}
          >
            <Name />
          </motion.div>
          {/* The way in is there from the first frame; only the name is staged. */}
          <div className={COPY_LAYOUT}>
            <Copy />
          </div>
        </motion.div>

        <motion.button
          type="button"
          onClick={() => hurryRef.current?.()}
          style={{ visibility: skipVisibility }}
          className="hero-skip absolute bottom-3 left-[var(--gutter)] inline-flex min-h-11 items-center text-[13px] text-ivory/85 underline underline-offset-4 hover:text-ivory"
        >
          Skip intro
        </motion.button>

        {/* <p className="absolute bottom-6 right-[var(--gutter)] hidden text-[13px] text-ivory/60 lg:block">
          Concept visual
        </p> */}
      </div>
    </section>
  );
}
