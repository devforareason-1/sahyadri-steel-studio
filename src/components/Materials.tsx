"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { finishGroups, finishes, type Finish } from "@/data/content";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

type Selection = Record<(typeof finishGroups)[number]["key"], Finish>;

const presets: { name: string; pick: Selection }[] = [
  {
    name: "Graphite & travertine",
    pick: { fronts: finishes.graphite, surface: finishes.travertine, hardware: finishes.hwChampagne },
  },
  {
    name: "Walnut & steel",
    pick: { fronts: finishes.walnut, surface: finishes.steel, hardware: finishes.hwSteel },
  },
  {
    name: "Linen & basalt",
    pick: { fronts: finishes.linen, surface: finishes.basalt, hardware: finishes.hwBlack },
  },
];

const showcase = [
  finishes.steel,
  finishes.graphite,
  finishes.walnut,
  finishes.oak,
  finishes.sand,
  finishes.travertine,
  finishes.basalt,
  finishes.hwChampagne,
];

// A simple kitchen elevation drawn with the chosen finishes.
function Preview({ pick }: { pick: Selection }) {
  const handle = (
    <span
      aria-hidden="true"
      className="absolute left-1/2 top-3 h-[3px] w-[38%] -translate-x-1/2 shadow-[0_1px_1px_rgba(0,0,0,.25)] transition-[background] duration-700"
      style={{ background: pick.hardware.surface }}
    />
  );

  return (
    <div className="grain relative aspect-[5/4] overflow-hidden bg-[#efe9de] p-[6%]">
      {/* Upper cabinets */}
      <div className="grid h-[30%] grid-cols-[1fr_1fr_1.3fr] gap-[3px]">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="relative shadow-[inset_0_-1px_0_rgba(0,0,0,.12)] transition-[background] duration-700"
            style={{ background: pick.fronts.surface }}
          >
            <span
              aria-hidden="true"
              className="absolute bottom-3 left-1/2 h-[3px] w-[38%] -translate-x-1/2 transition-[background] duration-700"
              style={{ background: pick.hardware.surface }}
            />
          </div>
        ))}
      </div>
      {/* Backsplash with a warm under-cabinet light */}
      <div
        className="relative mt-0 h-[24%] transition-[background] duration-700"
        style={{ background: pick.surface.surface }}
      >
        <span className="absolute inset-x-0 top-0 h-1/2 bg-[linear-gradient(rgba(255,226,170,.35),transparent)]" />
      </div>
      {/* Worktop edge */}
      <div
        className="relative z-10 h-[4.5%] shadow-[0_3px_6px_rgba(0,0,0,.18)] transition-[background] duration-700"
        style={{ background: pick.surface.surface }}
      />
      {/* Base cabinets: drawers left, doors right */}
      <div className="grid h-[33%] grid-cols-[1fr_1.3fr_1fr] gap-[3px] pt-[3px]">
        <div className="grid grid-rows-3 gap-[3px]">
          {[0, 1, 2].map((i) => (
            <div key={i} className="relative transition-[background] duration-700" style={{ background: pick.fronts.surface }}>
              {handle}
            </div>
          ))}
        </div>
        {[0, 1].map((i) => (
          <div key={i} className="relative transition-[background] duration-700" style={{ background: pick.fronts.surface }}>
            {handle}
          </div>
        ))}
      </div>
      <div className="h-[3%] bg-graphite/80" />
    </div>
  );
}

export default function Materials() {
  const [pick, setPick] = useState<Selection>(presets[0].pick);

  return (
    <section
      id="materials"
      aria-labelledby="materials-title"
      className="section bg-ivory-deep"
    >
      <div className="shell">
        <SectionHeading
          number="03"
          aside="Steel · Wood · Stone · Matte"
          id="materials-title"
          eyebrow="Materials & finishes"
          title={
            <>
              Steel, wood and stone, <em>in balance.</em>
            </>
          }
          intro="Combine fronts, surfaces and hardware to imagine the character of your space. We help you refine the palette in person, with physical samples."
        />

      </div>

      {/* A slow band of material names, edge to edge. */}
      <div aria-hidden="true" className="mt-16 overflow-hidden border-y border-line py-5 lg:mt-20">
        <div className="marquee">
          {[0, 1].map((copy) => (
            <p
              key={copy}
              className="flex shrink-0 items-center whitespace-nowrap font-serif text-[clamp(1.6rem,3vw,2.6rem)] italic text-graphite/70"
            >
              {showcase.map((f) => (
                <span key={f.id} className="flex items-center">
                  <span className="px-8">{f.name}</span>
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ background: f.surface }}
                  />
                </span>
              ))}
            </p>
          ))}
        </div>
      </div>

      <div className="shell">
        {/* Swatch strip */}
        <Reveal className="mt-12 grid grid-cols-4 gap-[3px] lg:mt-20 lg:grid-cols-8">
          {showcase.map((f) => (
            <figure key={f.id} className="group">
              <div
                className="aspect-[3/4] transition-transform duration-700 ease-[var(--ease-out)] group-hover:-translate-y-1.5"
                style={{ background: f.surface }}
                role="img"
                aria-label={`${f.name} sample`}
              />
              <figcaption className="pt-2.5 sm:pt-3">
                <span className="hidden text-[11px] uppercase tracking-[0.16em] text-muted sm:block">
                  {f.family}
                </span>
                <span className="mt-0.5 block font-serif text-[13px] leading-tight sm:text-lg">{f.name}</span>
              </figcaption>
            </figure>
          ))}
        </Reveal>

        {/* Combination builder */}
        <div className="mt-20 grid gap-12 border-t border-line pt-16 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <Reveal>
            <p className="caption uppercase tracking-[0.2em]">Your combination</p>
            <div className="mt-5" aria-live="polite">
              <Preview pick={pick} />
              <p className="mt-4 font-serif text-xl">
                {pick.fronts.name} fronts, {pick.surface.name.toLowerCase()} surface,{" "}
                {pick.hardware.name.toLowerCase()} hardware
              </p>
            </div>
          </Reveal>

          <Reveal delay={120} className="space-y-9">
            <div>
              <p className="caption uppercase tracking-[0.2em]">Start from a palette</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {presets.map((p) => (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => setPick(p.pick)}
                    className="flex items-center gap-2 border border-line-strong px-3 py-2 text-[13px] transition-colors hover:border-graphite"
                  >
                    <span className="flex">
                      {[p.pick.fronts, p.pick.surface, p.pick.hardware].map((f) => (
                        <span key={f.id} className="-ml-1 h-4 w-4 rounded-full border border-ivory first:ml-0" style={{ background: f.surface }} />
                      ))}
                    </span>
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            {finishGroups.map((group) => (
              <fieldset key={group.key}>
                <legend className="caption uppercase tracking-[0.2em]">
                  {group.label}
                  <span className="ml-3 normal-case tracking-normal text-graphite">
                    {pick[group.key].name}
                  </span>
                </legend>
                <div className="mt-4 flex flex-wrap gap-3">
                  {group.options.map((f) => {
                    const on = pick[group.key].id === f.id;
                    return (
                      <label key={f.id} className="relative cursor-pointer">
                        <input
                          type="radio"
                          name={`finish-${group.key}`}
                          value={f.id}
                          checked={on}
                          onChange={() => setPick((p) => ({ ...p, [group.key]: f }))}
                          className="peer sr-only"
                        />
                        <span className="sr-only">{f.name}</span>
                        <span
                          aria-hidden="true"
                          title={f.name}
                          className={`flex h-12 w-12 items-center justify-center rounded-full outline-offset-[3px] transition-[outline-color,transform] duration-300 peer-focus-visible:outline-2 peer-focus-visible:outline-champagne-ink sm:h-14 sm:w-14 ${
                            on ? "outline outline-1 outline-graphite" : "outline outline-1 outline-transparent hover:scale-105"
                          }`}
                          style={{ background: f.surface }}
                        >
                          {on && (
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-ivory/90 text-graphite">
                              <Check size={12} strokeWidth={2.2} />
                            </span>
                          )}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            ))}

            <div className="border-t border-line pt-8">
              <p className="text-[13px] leading-6 text-muted">
                Swatches are illustrative examples rendered on screen, not
                guaranteed stock. Available finishes and colours are confirmed
                during your consultation.
              </p>
              <a href="#contact" className="link-line mt-6">
                Discuss your palette
                <ArrowRight size={15} strokeWidth={1.6} />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
