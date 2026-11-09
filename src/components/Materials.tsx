"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import {
  colourFinishes,
  effectFinishes,
  finishBackground,
  findFinish,
  finishRange,
  hardwareFinishes,
  woodFinishes,
  worktopFinishes,
} from "@/data/content";
import KitchenPreview, { type KitchenFinish } from "./KitchenPreview";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

type Pick = KitchenFinish;

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
    grid: "grid-cols-4 sm:grid-cols-6 lg:grid-cols-9",
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
    grid: "grid-cols-3 sm:grid-cols-4 lg:grid-cols-8",
    aspect: "aspect-square",
  },
] as const;

type Tab = (typeof catalogue)[number]["key"];

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

const legend = "text-[13px] font-medium";

// The home page shows the finish builder alone, and links to the kitchens page,
// which carries the whole library (`library`) above it.
export default function Materials({ library = false }: { library?: boolean }) {
  const [pick, setPick] = useState<Pick>(presets[1].pick);
  const [tab, setTab] = useState<Tab>("colours");
  const set = (next: Partial<Pick>) => setPick((p) => ({ ...p, ...next }));
  const frontOptions = catalogue.find((c) => c.key === tab)!.finishes;

  return (
    <section id="finishes" data-tone="stone" aria-labelledby="materials-title" className="section bg-ivory-deep">
      <div className="shell">
        <SectionHeading
          id="materials-title"
          title={
            <>
              Steel at the core. <em>The finish is yours.</em>
            </>
          }
          intro={
            library
              ? "Every cabinet is built on a stainless-steel core; the fronts, worktop and hardware are chosen with you. Browse the library, try a combination on the kitchen below, then see the physical samples in the studio."
              : "Every cabinet is built on a stainless-steel core; the fronts, worktop and hardware are chosen with you. Try a combination here, then see the physical samples in the studio."
          }
        />

        {/* The library, in three collections */}
        {library && <div className="mt-12 space-y-14 lg:mt-16">
          {catalogue.map((group) => (
            <Reveal key={group.key}>
              <div className="grid gap-x-10 gap-y-2 lg:grid-cols-[1fr_auto] lg:items-end">
                <div>
                  <h3 className="display h-md">
                    {group.range ? (
                      <>
                        {group.range} {group.noun}
                      </>
                    ) : (
                      group.label
                    )}
                  </h3>
                  <p className="note mt-2 max-w-[680px]">{group.note}</p>
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
                    <p className="mt-2 text-[13px] leading-tight">{f.name}</p>
                    {f.code && <p className="caption">{f.code}</p>}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>}

        {/* Try a combination. On phones the preview pins under the header
            while the choices scroll beneath it, so every change shows. */}
        <div className={`${library ? "mt-20" : "mt-12 lg:mt-16"} grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:gap-16`}>
          <Reveal className="sticky top-(--header-height) z-10 -mx-(--gutter) border-b border-line bg-ivory-deep px-(--gutter) py-3 lg:static lg:mx-0 lg:border-0 lg:bg-transparent lg:p-0">
            <p className={legend}>Your combination</p>
            <div className="mt-3 lg:mt-5" aria-live="polite">
              <KitchenPreview pick={pick} />
              <p className="mt-3 text-[15px] leading-snug lg:mt-4 lg:text-[1.125rem]">
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
                <span className="ml-3 font-normal text-muted">{pick.fronts.name}</span>
              </legend>
              <div role="group" aria-label="Collection" className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
                {catalogue.map((c) => (
                  <button
                    key={c.key}
                    type="button"
                    aria-pressed={tab === c.key}
                    onClick={() => setTab(c.key)}
                    className={`nav-link min-h-11 text-[14px] transition-colors ${
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
                <span className="ml-3 font-normal text-muted">{pick.worktop.name}</span>
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
                <span className="ml-3 font-normal text-muted">{pick.hardware.name}</span>
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

            <div>
              <p className="caption">
                The kitchen is a photograph with each finish applied by computer, for
                illustration. Colours are
                standard RAL references and textures are photographs of each
                material, so both vary from screen to screen and are not
                guaranteed stock. Every finish is confirmed against physical
                samples during your consultation.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-4">
                {/* The builder also sits on the kitchens page, which has no
                    form of its own, so link to the homepage's enquiry. */}
                <Link href="/#contact" className="btn btn-primary">
                  Request a Quote
                  <ArrowRight size={16} strokeWidth={1.6} />
                </Link>
                {!library && (
                  <Link href="/services/stainless-steel-kitchens#finishes" className="link-line">
                    See the full finish library
                  </Link>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
