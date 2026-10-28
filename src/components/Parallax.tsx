"use client";

import { useEffect, useRef, type ReactNode } from "react";

export default function Parallax({
  children,
  className = "",
  speed = 0.1,
}: {
  children: ReactNode;
  className?: string; // must include positioning, e.g. "absolute inset-0"
  speed?: number;
}) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const o = outer.current;
      const i = inner.current;
      if (!o || !i) return;

      const rect = o.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.bottom < 0 || rect.top > vh) return; // off screen

      const offsetFromCenter = rect.top + rect.height / 2 - vh / 2;
      const limit = rect.height * 0.15; // matches the extra 15% below
      const y = Math.max(-limit, Math.min(limit, -offsetFromCenter * speed));
      i.style.transform = `translate3d(0, ${y}px, 0)`;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [speed]);

  return (
    <div ref={outer} className={`overflow-hidden ${className}`}>
      <div
        ref={inner}
        className="absolute inset-x-0 -top-[15%] h-[130%] will-change-transform"
      >
        {children}
      </div>
    </div>
  );
}