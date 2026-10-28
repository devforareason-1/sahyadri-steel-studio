"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import Folio from "./Folio";
import Photo from "./Photo";
import Reveal from "./Reveal";

export default function Solutions() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="solutions"
      data-tone="light"
      aria-labelledby="solutions-title"
      className="section"
    >
      <div className="shell">
        <Reveal>
          <Folio number="01" label="The studio" aside="Shivamogga · Udupi" />
        </Reveal>

        {/* Manifesto */}
        <div id="about" className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-0">
          <Reveal className="lg:col-span-3">
            <p className="max-w-[260px] text-[13px] leading-6 text-muted">
              A women-led studio for stainless-steel kitchens, wardrobes and
              vanities, working with homes across Karnataka&rsquo;s Malnad and
              coast. No wood, anywhere.
            </p>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-9">
            <p className="display h-statement">
              We fit out <em className="text-champagne-ink">kitchens, {" "}</em>
              <em className="text-champagne-ink">wardrobes</em>  and 
              <em className="text-champagne-ink"> vanities</em>  in steel and
              glass that feel composed on the first day,{" "}
              <em className="text-champagne-ink">
                and stay easy to live with for years of ordinary mornings.
              </em>
            </p>
          </Reveal>
        </div>

        {/* Index of disciplines */}
        <div className="mt-24 grid gap-12 lg:mt-36 lg:grid-cols-12 lg:gap-0">
          <div className="lg:col-span-7">
            <Reveal className="flex items-baseline justify-between gap-6">
              <h2
                id="solutions-title"
                className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted"
              >
                Four disciplines
              </h2>
              <p className="text-[11px] uppercase tracking-[0.22em] text-muted">
                Index
              </p>
            </Reveal>

            <ol className="mt-5 border-t border-line-strong">
              {services.map((s, i) => {
                const on = i === active;
                return (
                  <Reveal as="li" key={s.slug} delay={i * 80} className="border-b border-line">
                    <Link
                      href={`/services/${s.slug}`}
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      className="group grid grid-cols-[2.4rem_1fr_auto] items-center gap-x-3 py-6 sm:grid-cols-[3.5rem_1fr_auto] sm:py-8"
                    >
                      <span className="numeral self-start pt-2 text-lg sm:text-xl">{s.number}</span>
                      <span className="min-w-0">
                        <span
                          className={`block font-serif text-[clamp(1.75rem,3.6vw,3.3rem)] leading-[1.02] tracking-[-0.02em] transition-[color,transform] duration-700 ease-[var(--ease-out)] lg:group-hover:translate-x-3 ${
                            on ? "lg:text-graphite" : "lg:text-graphite/45"
                          }`}
                        >
                          {s.title}
                        </span>
                        <span className="mt-2 block max-w-[420px] text-[14px] leading-6 text-muted">
                          {s.summary}
                        </span>
                      </span>

                      {/* Phones: a small plate beside each row. */}
                      <span className="media relative block h-[84px] w-[66px] shrink-0 sm:h-[110px] sm:w-[88px] lg:hidden">
                        <Photo image={s.image} sizes="90px" />
                      </span>
                      <span
                        aria-hidden="true"
                        className={`hidden h-12 w-12 items-center justify-center rounded-full border transition-all duration-500 lg:flex ${
                          on
                            ? "border-graphite bg-graphite text-ivory"
                            : "border-line-strong text-graphite"
                        }`}
                      >
                        <ArrowUpRight size={18} strokeWidth={1.4} />
                      </span>
                    </Link>
                  </Reveal>
                );
              })}
            </ol>
          </div>

          {/* Desktop: one plate that changes with the row in focus. */}
          <div className="hidden lg:col-span-4 lg:col-start-9 lg:block">
            <Reveal variant="media" className="sticky top-[calc(var(--header-height)+40px)]">
              <div className="media aspect-[4/5]">
                {services.map((s, i) => (
                  <div
                    key={s.slug}
                    aria-hidden="true"
                    className={`absolute inset-0 transition-[opacity,transform] duration-[1100ms] ease-[var(--ease-out)] ${
                      i === active ? "scale-100 opacity-100" : "scale-[1.05] opacity-0"
                    }`}
                  >
                    <Photo image={s.image} sizes="34vw" />
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-4 text-[11px] uppercase tracking-[0.2em] text-muted">
                <span className="text-champagne-ink">{services[active].kicker}</span>
                <span>Concept visual</span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
