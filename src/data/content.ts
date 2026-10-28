/* ── Materials and finishes ─────────────────────────────────────────── */

const svg = (markup: string) =>
  `url("data:image/svg+xml,${encodeURIComponent(markup)}")`;

// Fine grain used to give flat colours a tactile, matte surface.
const grain = svg(
  `<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .07 0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`
);

// Long vertical grain for wood. `ink` is the grain colour.
const woodGrain = (ink: string, seed: number) =>
  svg(
    `<svg xmlns='http://www.w3.org/2000/svg' width='480' height='480'><filter id='w'><feTurbulence type='fractalNoise' baseFrequency='.16 .007' numOctaves='3' seed='${seed}'/><feColorMatrix values='0 0 0 0 ${ink} 0 0 0 0 ${ink} 0 0 0 0 ${ink} 1.6 0 0 0 -.55'/></filter><rect width='100%' height='100%' filter='url(#w)'/></svg>`
  );

// Soft mottling for stone-inspired surfaces.
const stoneCloud = (opacity: number, seed: number) =>
  svg(
    `<svg xmlns='http://www.w3.org/2000/svg' width='1000' height='1000'><filter id='s'><feTurbulence type='fractalNoise' baseFrequency='.012 .035' numOctaves='4' seed='${seed}' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .2 0 0 0 0 .17 0 0 0 0 .13 ${opacity} 0 0 0 -${opacity / 3}'/></filter><rect width='100%' height='100%' filter='url(#s)'/></svg>`
  );

const brushed =
  "repeating-linear-gradient(90deg, rgba(255,255,255,.10) 0 1px, transparent 1px 3px), repeating-linear-gradient(90deg, rgba(0,0,0,.05) 0 1px, transparent 1px 7px)";

export type Finish = {
  id: string;
  name: string;
  family: string;
  surface: string; // CSS background
};

export const finishes = {
  steel: {
    id: "steel",
    name: "Brushed stainless",
    family: "Stainless steel",
    surface: `${brushed}, linear-gradient(115deg, #c9cccd 0%, #9fa4a7 38%, #dfe1e1 58%, #a9aeb1 100%)`,
  },
  graphite: {
    id: "graphite",
    name: "Matte graphite",
    family: "Matte finish",
    surface: `${grain}, #34332f`,
  },
  clay: {
    id: "clay",
    name: "Matte clay",
    family: "Matte finish",
    surface: `${grain}, #a8927a`,
  },
  walnut: {
    id: "walnut",
    name: "Dark walnut",
    family: "Wood texture",
    surface: `${woodGrain(".12", 7)}, linear-gradient(90deg, #5a3e2b, #6b4a33 45%, #553a28)`,
  },
  oak: {
    id: "oak",
    name: "Natural oak",
    family: "Wood texture",
    surface: `${woodGrain(".38", 3)}, linear-gradient(90deg, #c4a27c, #cfae88 50%, #bf9c75)`,
  },
  linen: {
    id: "linen",
    name: "Linen white",
    family: "Neutral laminate",
    surface: `${grain}, #ece6da`,
  },
  sand: {
    id: "sand",
    name: "Sand beige",
    family: "Neutral laminate",
    surface: `${grain}, #d5c5ab`,
  },
  travertine: {
    id: "travertine",
    name: "Travertine",
    family: "Stone-inspired",
    surface: `${stoneCloud(0.5, 11)}, ${grain}, #ddd0bb`,
  },
  basalt: {
    id: "basalt",
    name: "Basalt grey",
    family: "Stone-inspired",
    surface: `${stoneCloud(0.9, 5)}, ${grain}, #6e6b65`,
  },
  hwSteel: {
    id: "hw-steel",
    name: "Brushed steel",
    family: "Hardware",
    surface: `${brushed}, linear-gradient(180deg, #e3e5e6, #9ea3a6 55%, #c8cbcd)`,
  },
  hwChampagne: {
    id: "hw-champagne",
    name: "Champagne",
    family: "Hardware",
    surface: `${brushed}, linear-gradient(180deg, #e6d4af, #b39668 55%, #d5c095)`,
  },
  hwBlack: {
    id: "hw-black",
    name: "Matte black",
    family: "Hardware",
    surface: `${grain}, linear-gradient(180deg, #3a3936, #1b1b19)`,
  },
} satisfies Record<string, Finish>;

export const finishGroups: {
  key: "fronts" | "surface" | "hardware";
  label: string;
  options: Finish[];
}[] = [
  {
    key: "fronts",
    label: "Cabinet fronts",
    options: [
      finishes.graphite,
      finishes.walnut,
      finishes.oak,
      finishes.linen,
      finishes.sand,
      finishes.clay,
      finishes.steel,
    ],
  },
  {
    key: "surface",
    label: "Worktop & backsplash",
    options: [finishes.travertine, finishes.basalt, finishes.steel, finishes.linen],
  },
  {
    key: "hardware",
    label: "Hardware",
    options: [finishes.hwSteel, finishes.hwChampagne, finishes.hwBlack],
  },
];

/* ── Testimonials ───────────────────────────────────────────────────── */

export type Testimonial = {
  quote: string;
  name: string;
  context: string; // e.g. "Modular kitchen, Udupi"
};

// Add genuine client reviews here, with the client's permission.
// While this list is empty the section shows clearly marked placeholders.
export const testimonials: Testimonial[] = [];

/* ── Partner brands ─────────────────────────────────────────────────── */

// Add partner names (and logos in /public/images/partners) once the
// partnership and permission to display them are confirmed.
export const partners: { name: string; logo?: string }[] = [];
