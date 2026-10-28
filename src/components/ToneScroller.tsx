"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Sections mark themselves with data-tone ("light", "stone", "sand" or
// "dark"), and the section under a reading line sets the page colour, which
// CSS then eases between (see "Tone" in globals.css).
//
// The line sits a little low while scrolling down and a little high while
// scrolling up, so a new section takes over as it arrives. Content on the
// other side of a light/dark change fades out meanwhile (globals.css).
export default function ToneScroller() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-tone]"));
    if (sections.length === 0) return;

    let lastY = window.scrollY;
    let line = 0.5;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      if (y > lastY) line = 0.65;
      else if (y < lastY) line = 0.35;
      lastY = y;

      const mark = window.innerHeight * line;
      const current =
        sections.find((s) => {
          const r = s.getBoundingClientRect();
          return r.top <= mark && r.bottom > mark;
        }) ?? (mark < sections[0].getBoundingClientRect().top ? sections[0] : sections[sections.length - 1]);
      if (root.dataset.tone !== current.dataset.tone) root.dataset.tone = current.dataset.tone;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    // Set the starting tone before handing backgrounds over, so the page
    // never flashes the wrong colour.
    update();
    root.classList.add("tone-live");
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
      root.classList.remove("tone-live");
      delete root.dataset.tone;
    };
  }, [pathname]);

  return null;
}
