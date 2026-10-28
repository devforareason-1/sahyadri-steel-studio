"use client";

import { useMotionValue,motion } from "motion/react";
import { useEffect } from "react";

// Shared feel for scroll-linked motion: a soft spring, so movement trails
// the scroll slightly and settles rather than snapping.
export const scrollSpring = { stiffness: 140, damping: 32, mass: 0.35 };

// 1 when motion is welcome, 0 when the visitor prefers reduced motion.
// Starts at 0 so the server render and first client render match, then
// eases in after mount. Multiply scroll effects by it.
export function useMotionFactor() {
  const factor = useMotionValue(0);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => factor.set(query.matches ? 0 : 1);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [factor]);

  return factor;
}
