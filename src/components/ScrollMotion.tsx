"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { scrollSpring, useMotionFactor } from "@/lib/motion";

// How far through the first screen the page has scrolled, from 0 to 1.
function useFirstScreen() {
  const { scrollY } = useScroll();
  const smooth = useSpring(scrollY, scrollSpring);
  const factor = useMotionFactor();
  return useTransform([smooth, factor], ([y, f]: number[]) =>
    typeof window === "undefined" ? 0 : Math.min(1, y / window.innerHeight) * f
  );
}

// Hero photograph: enlarges slightly and sinks as the page scrolls away.
export function HeroDrift({ children, className = "" }: { children: ReactNode; className?: string }) {
  const t = useFirstScreen();
  const scale = useTransform(t, (v) => 1 + v * 0.08);
  const y = useTransform(t, (v) => `${v * 6}vh`);
  return (
    <motion.div style={{ scale, y }} className={className}>
      {children}
    </motion.div>
  );
}

// Hero copy: rises and recedes as the photograph takes over.
export function HeroLift({ children, className = "" }: { children: ReactNode; className?: string }) {
  const t = useFirstScreen();
  const opacity = useTransform(t, (v) => 1 - Math.min(1, v * 1.25) * 0.85);
  const y = useTransform(t, (v) => `${v * -8}vh`);
  return (
    <motion.div style={{ opacity, y }} className={className}>
      {children}
    </motion.div>
  );
}

// A plate that opens from the page margins to the full width of the screen
// as it scrolls into view, while the photograph inside settles from a zoom.
export function FrameOpen({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const factor = useMotionFactor();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.2"] });
  const smooth = useSpring(scrollYProgress, scrollSpring);
  const closed = useTransform([smooth, factor], ([p, f]: number[]) => (1 - p) * f);
  const clipPath = useTransform(
    closed,
    (c) => `inset(${c * 7}% calc(var(--gutter) * ${c}) ${c * 7}% calc(var(--gutter) * ${c}))`
  );
  const scale = useTransform(closed, (c) => 1 + c * 0.16);

  return (
    <motion.div ref={ref} style={{ clipPath }} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ scale }} className="absolute inset-0">
        {children}
      </motion.div>
    </motion.div>
  );
}
