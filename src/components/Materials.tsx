"use client";

import Link from "next/link";
import { useState, type CSSProperties, type ReactNode } from "react";
import { ArrowRight, Check } from "lucide-react";
import {
  colourFinishes,
  effectFinishes,
  finishBackground,
  findFinish,
  finishRange,
  hardwareFinishes,
  matteGrain,
  woodFinishes,
  worktopFinishes,
  type Finish,
  type Hardware,
} from "@/data/content";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

type Pick = { fronts: Finish; worktop: Finish; hardware: Hardware; gloss: boolean };

const hw = (id: string) => hardwareFinishes.find((h) => h.id === id)!;

const presets: { name: string; pick: Pick }[] = [
  {
    name: "Raspberry gloss",
    pick: { fronts: findFinish("ral-3027"), worktop: findFinish("statuario"), hardware: hw("hw-steel"), gloss: true },
  },
  {
    name: "Graphite & travertine",
    pick: { fronts: findFinish("ral-7024"), worktop: findFinish("travertine"), hardware: hw("hw-champagne"), gloss: false },
  },
  {
    name: "Walnut & concrete",
    pick: { fronts: findFinish("smoked-walnut"), worktop: findFinish("ivory-concrete"), hardware: hw("hw-black"), gloss: false },
  },
  {
    name: "All steel",
    pick: { fronts: findFinish("brushed-steel"), worktop: findFinish("nero-marquina"), hardware: hw("hw-steel"), gloss: false },
  },
];

const catalogue = [
  {
    key: "colours",
    label: "Solid colours",
    range: finishRange.colours,
    noun: "shades",
    note: "Powder-coat or PU lacquer, in high gloss or matt, matched to the RAL colour you choose.",
    finishes: colourFinishes,
    grid: "grid-cols-3 sm:grid-cols-6 lg:grid-cols-9",
    aspect: "aspect-square",
  },
  {
    key: "wood",
    label: "Wood-look",
    range: finishRange.wood,
    noun: "wood-look textures",
    note: "The warmth of timber grain, printed on steel: nothing to swell, warp or invite termites.",
    finishes: woodFinishes,
    grid: "grid-cols-2 sm:grid-cols-4",
    aspect: "aspect-[4/3]",
  },
  {
    key: "effects",
    label: "Stone, steel & glass",
    range: finishRange.effects,
    noun: "stone, steel and glass finishes",
    note: "Marble, concrete, steel and glass for shutters, worktops and cladding.",
    finishes: effectFinishes,
    grid: "grid-cols-2 sm:grid-cols-4 lg:grid-cols-8",
    aspect: "aspect-square",
  },
] as const;

type Tab = (typeof catalogue)[number]["key"];

/* ── The kitchen drawing ───────────────────────────────────────────── */

// A shadow gap between two fronts, with the lit edge beside it.
function Gap({ style }: { style: CSSProperties }) {
  return (
    <span
      aria-hidden="true"
      className="absolute bg-black/45 shadow-[1px_1px_0_rgba(255,255,255,0.22)]"
      style={style}
    />
  );
}

// A bar handle in the chosen hardware, with a small cast shadow.
function Bar({ hardware, style }: { hardware: Hardware; style: CSSProperties }) {
  return (
    <span
      aria-hidden="true"
      className="absolute rounded-[1px] shadow-[1px_2px_2px_rgba(0,0,0,0.35)] transition-[background] duration-500"
      style={{ background: hardware.bar, ...style }}
    />
  );
}

// One run of cabinets: a single continuous surface, so a photograph or a
// reflection reads across the doors the way it would on site, with the
// door gaps and handles drawn over it. The steel carcass shows as a fine
// edge all round.
function Run({
  finish,
  gloss,
  className,
  children,
}: {
  finish: Finish;
  gloss: boolean;
  className: string;
  children: ReactNode;
}) {
  const glossy = (finish.kind === "colour" && gloss) || finish.kind === "glass";
  const matte = finish.kind === "colour" && !gloss;
  return (
    <div
      className={`absolute overflow-hidden shadow-[inset_0_0_0_2px_#d9dcdd,0_6px_14px_-8px_rgba(0,0,0,0.45)] transition-[background] duration-500 ${className}`}
      style={{ background: finishBackground(finish) }}
    >
      {matte && (
        <span aria-hidden="true" className="absolute inset-0" style={{ backgroundImage: matteGrain }} />
      )}
      {glossy && (
        // Window light caught in a high-gloss face: a bright diagonal band,
        // a softer second one, and a fall-off towards the floor.
        <span
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, transparent 16%, rgba(255,255,255,.42) 24%, rgba(255,255,255,.08) 31%, transparent 37%, transparent 60%, rgba(255,255,255,.2) 66%, transparent 72%), linear-gradient(180deg, rgba(255,255,255,.16), transparent 45%, rgba(0,0,0,.1))",
          }}
        />
      )}
      {children}
    </div>
  );
}

function Preview({ pick }: { pick: Pick }) {
  const { fronts, worktop, hardware, gloss } = pick;
  return (
    <div
      className="relative aspect-[16/9] overflow-hidden lg:aspect-[5/4]"
      style={{ background: "linear-gradient(180deg, #f1ede6, #e6e0d6)" }}
    >
      {/* Floor */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[11%] border-t border-black/10"
        style={{ background: "linear-gradient(180deg, #d6cfc3, #cbc3b5)" }}
      />

      {/* Wall units: three doors */}
      <Run finish={fronts} gloss={gloss} className="left-[7%] right-[7%] top-[6%] h-[29%]">
        <Gap style={{ left: "33.33%", top: 0, bottom: 0, width: 2 }} />
        <Gap style={{ left: "66.66%", top: 0, bottom: 0, width: 2 }} />
        {[1, 2, 3].map((n) => (
          <Bar key={n} hardware={hardware} style={{ left: `calc(${(n * 100) / 3}% - 14px)`, bottom: "9%", height: "30%", width: 4 }} />
        ))}
      </Run>

      {/* Backsplash, lit from under the wall units */}
      <div
        className="absolute left-[7%] right-[7%] top-[35%] h-[20%] transition-[background] duration-500"
        style={{ background: finishBackground(worktop) }}
      >
        <span
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(0,0,0,.28), rgba(255,236,200,.18) 22%, transparent 60%)" }}
        />
      </div>

      {/* Worktop slab, overhanging the base units */}
      <div
        className="absolute left-[6%] right-[6%] top-[55%] z-10 h-[3.6%] shadow-[0_4px_8px_-2px_rgba(0,0,0,0.4)] transition-[background] duration-500"
        style={{ background: finishBackground(worktop) }}
      >
        <span
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(255,255,255,.35), transparent 35%, rgba(0,0,0,.28))" }}
        />
      </div>

      {/* Base units: a drawer stack and a pair of doors */}
      <Run finish={fronts} gloss={gloss} className="left-[7%] right-[7%] top-[58.6%] h-[26%]">
        <Gap style={{ left: "32%", top: 0, bottom: 0, width: 2 }} />
        <Gap style={{ left: "66%", top: 0, bottom: 0, width: 2 }} />
        <Gap style={{ left: 0, width: "32%", top: "33.33%", height: 2 }} />
        <Gap style={{ left: 0, width: "32%", top: "66.66%", height: 2 }} />
        {[0, 1, 2].map((n) => (
          <Bar key={n} hardware={hardware} style={{ left: "9%", width: "14%", top: `calc(${(n * 100) / 3}% + 9px)`, height: 4 }} />
        ))}
        <Bar hardware={hardware} style={{ left: "calc(66% - 14px)", top: "9%", height: "34%", width: 4 }} />
        <Bar hardware={hardware} style={{ left: "calc(66% + 10px)", top: "9%", height: "34%", width: 4 }} />
      </Run>

      {/* Recessed plinth */}
      <div aria-hidden="true" className="absolute left-[7.6%] right-[7.6%] top-[84.6%] h-[4.4%] bg-[#2b2c2d]" />
    </div>
  );
}

/* ── Swatch controls ───────────────────────────────────────────────── */

function Swatch({
  name,
  group,
  label,
  checked,
  background,
  onSelect,
}: {
  name: string;
  group: string;
  label: string;
  checked: boolean;
  background: string;
  onSelect: () => void;
}) {
  return (
    <label className="relative cursor-pointer">
      <input
        type="radio"
        name={group}
        value={name}
        checked={checked}
        onChange={onSelect}
        className="peer sr-only"
      />
      <span className="sr-only">{label}</span>
      <span
        aria-hidden="true"
        title={label}
        className={`flex h-11 w-11 items-center justify-center rounded-full outline-offset-[3px] transition-[outline-color,transform] duration-300 peer-focus-visible:outline-2 peer-focus-visible:outline-champagne-ink ${
          checked ? "outline outline-1 outline-graphite" : "outline outline-1 outline-transparent hover:scale-105"
        }`}
        style={{ background }}
      >
        {checked && (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-ivory/90 text-graphite">
            <Check size={12} strokeWidth={2.2} />
          </span>
        )}
      </span>
    </label>
  );
}

const legend = "caption uppercase tracking-[0.12em]";

export default function Materials() {
  const [pick, setPick] = useState<Pick>(presets[0].pick);
  const [tab, setTab] = useState<Tab>("colours");
  const set = (next: Partial<Pick>) => setPick((p) => ({ ...p, ...next }));
  const frontOptions = catalogue.find((c) => c.key === tab)!.finishes;

  return (
    <section id="finishes" data-tone="stone" aria-labelledby="materials-title" className="section">
      <div className="shell">
        <SectionHeading
          aside="Colours · Wood-look · Stone, steel & glass"
          id="materials-title"
          eyebrow="Finish library"
          title={
            <>
              Steel at the core. <em>The finish is yours.</em>
            </>
          }
          intro="Every cabinet is built on a stainless-steel core; the fronts, worktop and hardware are chosen with you. Browse the library, try a combination on the kitchen below, then see the physical samples in the studio."
        />

        {/* The library, in three collections */}
        <div className="mt-10 space-y-12 lg:mt-12">
          {catalogue.map((group) => (
            <Reveal key={group.key}>
              <div className="grid gap-x-10 gap-y-2 border-t border-line pt-5 lg:grid-cols-[1fr_auto] lg:items-end">
                <div>
                  <h3 className="text-[clamp(1.35rem,2vw,1.75rem)] font-light leading-tight tracking-[-0.02em]">
                    {group.range ? (
                      <>
                        {group.range} {group.noun}
                      </>
                    ) : (
                      group.label
                    )}
                  </h3>
                  <p className="mt-2 max-w-[680px] text-pretty text-[14px] leading-6 text-muted">{group.note}</p>
                </div>
                <p className="caption">
                  {group.finishes.length} shown here
                  {group.range ? ` · all ${group.range} in the studio` : " · more in the studio"}
                </p>
              </div>
              <ul className={`mt-5 grid gap-[3px] ${group.grid}`}>
                {group.finishes.map((f) => (
                  <li key={f.id}>
                    <div
                      role="img"
                      aria-label={`${f.name} sample`}
                      className={group.aspect}
                      style={{ background: finishBackground(f) }}
                    />
                    <p className="mt-2 text-[12.5px] leading-tight">{f.name}</p>
                    {f.code && <p className="caption">{f.code}</p>}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        {/* Try a combination. On phones the preview pins under the header
            while the choices scroll beneath it, so every change shows. */}
        <div className="mt-14 grid gap-6 border-t border-line pt-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <Reveal className="sticky top-(--header-height) z-10 -mx-(--gutter) border-b border-line bg-ivory px-(--gutter) py-3 lg:static lg:mx-0 lg:border-0 lg:bg-transparent lg:p-0">
            <p className={legend}>Your combination</p>
            <div className="mt-3 lg:mt-5" aria-live="polite">
              <Preview pick={pick} />
              <p className="mt-3 text-[0.95rem] font-light leading-snug lg:mt-4 lg:text-[1.15rem]">
                {pick.fronts.name}
                {pick.fronts.kind === "colour" && (pick.gloss ? " gloss" : " matt")} fronts,{" "}
                {pick.worktop.name.toLowerCase()} worktop, {pick.hardware.name.toLowerCase()} handles
              </p>
              {pick.fronts.code && <p className="caption mt-1 hidden lg:block">{pick.fronts.code}</p>}
            </div>
          </Reveal>

          <Reveal delay={120} className="space-y-9">
            <div>
              <p className={legend}>Start from a palette</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {presets.map((p) => (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => {
                      setPick(p.pick);
                      const home = catalogue.find((c) => c.finishes.some((f) => f.id === p.pick.fronts.id));
                      if (home) setTab(home.key);
                    }}
                    className="flex min-h-11 items-center gap-2 border border-line-strong px-3 text-[13px] transition-colors hover:border-graphite"
                  >
                    <span className="flex">
                      {[finishBackground(p.pick.fronts), finishBackground(p.pick.worktop), p.pick.hardware.bar].map((bg, i) => (
                        <span key={i} className="-ml-1 h-4 w-4 rounded-full border border-ivory first:ml-0" style={{ background: bg }} />
                      ))}
                    </span>
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            <fieldset>
              <legend className={legend}>
                Cabinet fronts
                <span className="ml-3 normal-case tracking-normal text-graphite">{pick.fronts.name}</span>
              </legend>
              <div role="group" aria-label="Collection" className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
                {catalogue.map((c) => (
                  <button
                    key={c.key}
                    type="button"
                    aria-pressed={tab === c.key}
                    onClick={() => setTab(c.key)}
                    className={`nav-link min-h-11 font-mono text-[12px] uppercase tracking-[0.1em] transition-colors ${
                      tab === c.key ? "text-graphite" : "text-muted hover:text-graphite"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {frontOptions.map((f) => (
                  <Swatch
                    key={f.id}
                    name={f.id}
                    group="finish-fronts"
                    label={f.code ? `${f.name}, ${f.code}` : f.name}
                    checked={pick.fronts.id === f.id}
                    background={finishBackground(f)}
                    onSelect={() => set({ fronts: f })}
                  />
                ))}
              </div>
            </fieldset>

            {pick.fronts.kind === "colour" && (
              <fieldset>
                <legend className={legend}>Sheen</legend>
                <div className="mt-3 flex gap-2">
                  {[
                    { label: "High gloss", value: true },
                    { label: "Matt", value: false },
                  ].map((o) => (
                    <label key={o.label} className="cursor-pointer">
                      <input
                        type="radio"
                        name="finish-sheen"
                        checked={pick.gloss === o.value}
                        onChange={() => set({ gloss: o.value })}
                        className="peer sr-only"
                      />
                      <span className="inline-flex min-h-11 items-center border border-line-strong px-4 text-[13px] transition-colors hover:border-graphite peer-checked:border-graphite peer-checked:bg-graphite peer-checked:text-ivory peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-champagne-ink">
                        {o.label}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            <fieldset>
              <legend className={legend}>
                Worktop & backsplash
                <span className="ml-3 normal-case tracking-normal text-graphite">{pick.worktop.name}</span>
              </legend>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {worktopFinishes.map((f) => (
                  <Swatch
                    key={f.id}
                    name={f.id}
                    group="finish-worktop"
                    label={f.name}
                    checked={pick.worktop.id === f.id}
                    background={finishBackground(f)}
                    onSelect={() => set({ worktop: f })}
                  />
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className={legend}>
                Handles
                <span className="ml-3 normal-case tracking-normal text-graphite">{pick.hardware.name}</span>
              </legend>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {hardwareFinishes.map((h) => (
                  <Swatch
                    key={h.id}
                    name={h.id}
                    group="finish-hardware"
                    label={h.name}
                    checked={pick.hardware.id === h.id}
                    background={h.bar}
                    onSelect={() => set({ hardware: h })}
                  />
                ))}
              </div>
            </fieldset>

            <div className="border-t border-line pt-8">
              <p className="text-[13px] leading-6 text-muted">
                Colours are standard RAL references and textures are
                photographs of each material, so both vary from screen to
                screen and are not guaranteed stock. Every finish is
                confirmed against physical samples during your consultation.
              </p>
              {/* The library also sits on the kitchens page, which has no
                  form of its own, so link to the homepage's enquiry. */}
              <Link href="/#contact" className="link-line mt-6">
                Discuss your palette
                <ArrowRight size={15} strokeWidth={1.6} />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
