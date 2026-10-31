"use client";

import { useEffect, useSyncExternalStore } from "react";

// A reviewing aid, not part of the site: compares the current look with the themes
// under review, colours and fonts (see html[data-palette] in globals.css and
// lib/review-fonts.ts). It shows locally and on Vercel preview links, never on the
// production site. Once one is chosen, delete this file, its line in layout.tsx,
// those blocks of CSS and lib/review-fonts.ts.
const palettes = [
  { id: "current", name: "Malnad green · Geist", dark: "#1a2520", accent: "#c4a675" },
  { id: "bronze", name: "Warm bronze · Marcellus", dark: "#2b1f16", accent: "#7a4f28" },
  { id: "noir", name: "Noir & gold · Italiana", dark: "#111111", accent: "#c9a227" },
  { id: "emerald", name: "Emerald & brass · Cormorant", dark: "#07251c", accent: "#d9b36c" },
  { id: "navy", name: "Midnight & champagne · Gilda", dark: "#101c33", accent: "#d9bd84" },
  { id: "wine", name: "Oxblood & rose gold · Bellefair", dark: "#3a0f1b", accent: "#e3b197" },
  { id: "copper", name: "Graphite & copper · Tenor", dark: "#1f2326", accent: "#c9713c" },
];

const KEY = "sahyadri-palette";
const listeners = new Set<() => void>();

function read() {
  try {
    const stored = localStorage.getItem(KEY);
    return palettes.some((p) => p.id === stored) ? (stored as string) : "current";
  } catch {
    return "current";
  }
}

function choose(id: string) {
  try {
    localStorage.setItem(KEY, id);
  } catch {
    // Without storage the choice just won't survive a reload.
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export default function PaletteSwitch() {
  const active = useSyncExternalStore(subscribe, read, () => "current");

  useEffect(() => {
    if (active === "current") delete document.documentElement.dataset.palette;
    else document.documentElement.dataset.palette = active;
  }, [active]);

  if (process.env.NEXT_PUBLIC_VERCEL_ENV === "production") return null;

  return (
    <aside
      aria-label="Preview theme"
      className="fixed left-1/2 top-[calc(var(--header-height)+10px)] z-40 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-white/20 bg-black/80 py-1 pl-3.5 pr-1.5 text-[12px] text-white shadow-lg backdrop-blur-md"
    >
      <span aria-live="polite" className="hidden min-w-[14.5rem] sm:inline">
        {palettes.find((p) => p.id === active)?.name}
      </span>
      <span className="flex">
        {palettes.map((p) => (
          <button
            key={p.id}
            type="button"
            title={p.name}
            aria-label={p.name}
            aria-pressed={active === p.id}
            onClick={() => choose(p.id)}
            className="flex h-9 w-9 items-center justify-center rounded-full sm:h-8 sm:w-8"
          >
            <span
              className={`block h-5 w-5 rounded-full border border-white/40 transition-shadow ${
                active === p.id ? "shadow-[0_0_0_2px_#000,0_0_0_4px_#fff]" : ""
              }`}
              style={{ background: `linear-gradient(135deg, ${p.dark} 50%, ${p.accent} 50%)` }}
            />
          </button>
        ))}
      </span>
    </aside>
  );
}
