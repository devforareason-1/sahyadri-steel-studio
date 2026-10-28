"use client";

import { useState } from "react";
import { features } from "@/data/content";
import Photo from "./Photo";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Craftsmanship() {
  const [active, setActive] = useState(0);

  return (
    <section id="craft" aria-labelledby="craft-title" className="section">
      <div className="shell">
        <SectionHeading
          id="craft-title"
          eyebrow="Modern features & craftsmanship"
          title={
            <>
              The details you use <em>every single day.</em>
            </>
          }
          intro="What makes a kitchen or wardrobe valuable is rarely what you see first. It is how the drawer glides, where the shelf sits and how much the room can hold."
        />

        <div className="mt-16 grid gap-10 lg:mt-20 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div className="lg:order-2">
            <Reveal className="lg:sticky lg:top-[calc(var(--header-height)+32px)]">
              <div className="media relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]">
                {features.map((f, i) => (
                  <div
                    key={f.title}
                    aria-hidden={i !== active}
                    className={`absolute inset-0 transition-[opacity,transform] duration-[1200ms] ease-[var(--ease-out)] ${
                      i === active ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
                    }`}
                  >
                    <Photo image={f.image} sizes="(max-width: 1024px) 100vw, 45vw" />
                  </div>
                ))}
                <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(transparent,rgba(20,20,18,.7))] p-5 pt-16 text-ivory sm:p-7 sm:pt-20">
                  <p className="font-serif text-xl italic text-champagne">
                    {String(active + 1).padStart(2, "0")}
                  </p>
                  <p className="display mt-1 text-2xl sm:text-3xl">
                    {features[active].title}
                  </p>
                </div>
              </div>
              <p className="caption mt-3">Concept visuals for illustration.</p>
            </Reveal>
          </div>

          <ol className="border-t border-line lg:order-1">
            {features.map((f, i) => {
              const on = i === active;
              return (
                <Reveal as="li" key={f.title} delay={i * 60} className="border-b border-line">
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group grid w-full grid-cols-[48px_1fr] items-baseline py-6 text-left sm:grid-cols-[64px_1fr]"
                  >
                    <span className={`numeral text-xl transition-opacity ${on ? "opacity-100" : "opacity-50"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span
                        className={`block font-serif text-[1.6rem] leading-tight tracking-[-0.01em] transition-all duration-500 sm:text-[1.9rem] ${
                          on ? "translate-x-1 text-graphite" : "text-graphite/50 group-hover:text-graphite/80"
                        }`}
                      >
                        {f.title}
                      </span>
                      <span
                        className={`grid transition-[grid-template-rows,opacity] duration-500 ${
                          on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <span className="overflow-hidden">
                          <span className="block max-w-[460px] pt-3 text-[15px] leading-7 text-muted">
                            {f.text}
                          </span>
                        </span>
                      </span>
                    </span>
                  </button>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
