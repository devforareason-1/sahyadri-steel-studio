/* eslint-disable @next/next/no-img-element -- layers of one composite, kept pixel-aligned at the box's size */
import type { CSSProperties } from "react";
import type { Finish, Hardware } from "@/data/content";

// A real photograph of a kitchen, with the chosen finishes laid over its doors,
// backsplash and worktop. Each region has a shade map taken from the photograph,
// so its actual light and shadow fall on the finish; everything else in the room
// is left as photographed. Positions below are in the photograph's own pixels.
// The layers are built by scripts/kitchen-preview.py.
const WIDTH = 1600;
const HEIGHT = 1061;
const LAYERS = "/images/kitchen-preview";

export type KitchenFinish = { fronts: Finish; worktop: Finish; hardware: Hardware; gloss: boolean };

// How wide one tile of each texture sits on the doors, as a share of the picture.
const TILE: Record<string, number> = {
  "ash-oak": 36,
  "natural-teak": 36,
  "smoked-walnut": 36,
  wenge: 36,
  statuario: 46,
  "nero-marquina": 40,
  travertine: 17,
  concrete: 34,
  "ivory-concrete": 40,
  "brushed-steel": 34,
  "fluted-glass": 14,
};

// Fluted glass repeats ribs, so its tile keeps the ribs' own narrow shape.
const FLUTE_HEIGHT = 6;

function material(f: Finish, squash = 1): CSSProperties {
  const tile = TILE[f.id];
  if (!tile) return { background: f.base };
  const size =
    f.id === "fluted-glass"
      ? `${tile}% ${FLUTE_HEIGHT}%`
      : `${tile}% ${(tile * (WIDTH / HEIGHT)) / squash}%`;
  return { background: `url("${LAYERS}/tiles/${f.id}.jpg") 0 0 / ${size} repeat, ${f.base}` };
}

// Window light from the left, and the room's faint gleam, on a shiny face. A matt
// face spreads the same light out, so it shows only as a soft fall-off.
const SHEEN =
  "linear-gradient(90deg, rgb(255 255 255 / .34), rgb(255 255 255 / .1) 26%, transparent 46%), linear-gradient(180deg, rgb(255 255 255 / .1), transparent 42%, rgb(255 255 255 / .06))";
const MATT_SHEEN = "linear-gradient(90deg, rgb(255 255 255 / .12), transparent 45%)";
// Gloss keeps its colour deep and mirrors the window instead: a sharp-edged band of
// light on the doors nearest it, fading along the run.
const GLOSS_SHEEN =
  "linear-gradient(90deg, transparent 9%, rgb(255 255 255 / .3) 9.4%, rgb(255 255 255 / .22) 17%, transparent 17.4%, transparent 21%, rgb(255 255 255 / .13) 21.4%, rgb(255 255 255 / .1) 25%, transparent 25.4%), linear-gradient(90deg, rgb(255 255 255 / .1), transparent 55%)";

// A finish takes the room's shadows by multiplying, but every surface also reflects
// some light whatever its colour (`reflect`), or dark finishes would turn into a
// flat black hole with no doors to be seen. Gaps stay dark, as the map is black there.
function Region({
  name,
  look,
  sheen,
  reflect = 0,
}: {
  name: string;
  look: CSSProperties;
  sheen?: string;
  reflect?: number;
}) {
  const map = `url("${LAYERS}/${name}.webp")`;
  return (
    <div
      className="absolute inset-0 isolate"
      style={{ maskImage: map, WebkitMaskImage: map, maskSize: "100% 100%", WebkitMaskSize: "100% 100%" }}
    >
      <div className="absolute inset-0" style={look} />
      {sheen && <div className="absolute inset-0 mix-blend-screen" style={{ background: sheen }} />}
      <img src={`${LAYERS}/${name}.webp`} alt="" loading="lazy" className="absolute inset-0 h-full w-full mix-blend-multiply" />
      {reflect > 0 && (
        <img src={`${LAYERS}/${name}.webp`} alt="" loading="lazy" className="absolute inset-0 h-full w-full mix-blend-screen" style={{ opacity: reflect }} />
      )}
    </div>
  );
}

// [left, top, length] of each handle, on the doors of the photograph.
const UPRIGHT = [
  [461, 352, 66],
  [487, 352, 66],
  [897, 352, 66],
  [923, 352, 66],
  [659, 714, 76],
  [685, 714, 76],
  [944, 714, 76],
];
const ACROSS = [
  [224, 722, 120],
  [224, 798, 120],
  [224, 890, 120],
];

function Handles({ hardware }: { hardware: Hardware }) {
  const pct = (v: number, of: number) => `${(v / of) * 100}%`;
  const bar: CSSProperties = { filter: "drop-shadow(1px 2px 1.5px rgb(0 0 0 / .4))" };
  return (
    <>
      {UPRIGHT.map(([x, y, l]) => (
        <span
          key={`${x}-${y}`}
          className="absolute rounded-[1px]"
          style={{ ...bar, left: pct(x, WIDTH), top: pct(y, HEIGHT), width: pct(5, WIDTH), height: pct(l, HEIGHT), background: hardware.bar }}
        />
      ))}
      {ACROSS.map(([x, y, l]) => (
        <span
          key={`${x}-${y}`}
          className="absolute rounded-[1px]"
          style={{
            ...bar,
            left: pct(x, WIDTH),
            top: pct(y, HEIGHT),
            width: pct(l, WIDTH),
            height: pct(5, HEIGHT),
            background: hardware.bar.replace("90deg", "180deg"),
          }}
        />
      ))}
    </>
  );
}

export default function KitchenPreview({ pick }: { pick: KitchenFinish }) {
  const { fronts, worktop, hardware, gloss } = pick;
  const lacquer = fronts.kind === "colour" && gloss;
  const shiny = fronts.kind === "glass" || fronts.id === "brushed-steel";
  const shinyTop = ["statuario", "nero-marquina", "brushed-steel"].includes(worktop.id);
  return (
    <div className="relative aspect-[1600/1061] overflow-hidden bg-travertine">
      <img src={`${LAYERS}/kitchen.jpg`} alt="" loading="lazy" className="absolute inset-0 h-full w-full" />
      <Region name="splash" look={material(worktop)} />
      <Region name="top" look={material(worktop, 5)} sheen={shinyTop ? SHEEN : undefined} />
      <Region name="edge" look={material(worktop)} />
      <Region name="fronts" look={material(fronts)} sheen={lacquer ? GLOSS_SHEEN : shiny ? SHEEN : MATT_SHEEN} reflect={lacquer ? 0.05 : shiny ? 0.14 : 0.1} />
      <Handles hardware={hardware} />
    </div>
  );
}
