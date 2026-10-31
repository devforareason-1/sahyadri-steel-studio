"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef } from "react";

// Counts a figure up from zero the first time it scrolls into view, keeping
// whatever surrounds the number: "150+" counts to 150 and keeps its "+". The
// page is sent with the final figure, so that is what search engines, screen
// readers and visitors without JavaScript or who prefer reduced motion get.
export default function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  useEffect(() => {
    const el = ref.current;
    const parts = value.match(/^(\D*)(\d+)(\D*)$/);
    if (!el || !parts || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const [, before, digits, after] = parts;
    const show = (n: number) => {
      el.textContent = `${before}${Math.round(n)}${after}`;
    };
    show(0);
    if (!inView) return;

    const count = animate(0, Number(digits), { duration: 1.8, ease: "easeOut", onUpdate: show });
    return () => count.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
    </span>
  );
}
