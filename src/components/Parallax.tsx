"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { scrollSpring, useMotionFactor } from "@/lib/motion";

// The image layer is 30% taller than its frame and drifts within it as
// the frame passes through the screen.
export default function Parallax({
  children,
  className = "",
  speed = 0.1,
}: {
  children: ReactNode;
  className?: string; // must include positioning, e.g. "absolute inset-0"
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const factor = useMotionFactor();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const smooth = useSpring(scrollYProgress, scrollSpring);
  // Percent of the layer's own height; 11.5% is the most the extra 30% allows.
  const travel = Math.min(11.5, speed * 100);
  const y = useTransform(
    [smooth, factor],
    ([p, f]: number[]) => `${(p - 0.5) * 2 * -travel * f}%`
  );

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="absolute inset-x-0 -top-[15%] h-[130%] will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
