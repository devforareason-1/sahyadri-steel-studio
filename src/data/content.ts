/* ── Materials and finishes ─────────────────────────────────────────── */

const svg = (markup: string) =>
  `url("data:image/svg+xml,${encodeURIComponent(markup)}")`;

// Fine grain used to give flat colours a tactile, matte surface.
const grain = svg(
  `<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .07 0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`
);

// Soft mottling for stone-inspired surfaces.
const stoneCloud = (opacity: number, seed: number) =>
  svg(
    `<svg xmlns='http://www.w3.org/2000/svg' width='1000' height='1000'><filter id='s'><feTurbulence type='fractalNoise' baseFrequency='.012 .035' numOctaves='4' seed='${seed}' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .2 0 0 0 0 .17 0 0 0 0 .13 ${opacity} 0 0 0 -${opacity / 3}'/></filter><rect width='100%' height='100%' filter='url(#s)'/></svg>`
  );

const brushed =
  "repeating-linear-gradient(90deg, rgba(255,255,255,.10) 0 1px, transparent 1px 3px), repeating-linear-gradient(90deg, rgba(0,0,0,.05) 0 1px, transparent 1px 7px)";

// A soft diagonal sheen, for glass.
const sheen =
  "linear-gradient(120deg, rgba(255,255,255,0) 30%, rgba(255,255,255,.28) 46%, rgba(255,255,255,0) 60%)";

// Vertical ribs, for fluted glass.
const flutes =
  "repeating-linear-gradient(90deg, rgba(255,255,255,.35) 0 2px, rgba(255,255,255,0) 2px 7px, rgba(0,0,0,.06) 7px 9px, rgba(255,255,255,0) 9px 12px)";

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
    family: "Powder-coated steel",
    surface: `${grain}, #34332f`,
  },
  clay: {
    id: "clay",
    name: "Matte clay",
    family: "Powder-coated steel",
    surface: `${grain}, #a8927a`,
  },
  smoked: {
    id: "smoked",
    name: "Smoked glass",
    family: "Glass",
    surface: `${sheen}, linear-gradient(160deg, #5d6467, #3b4144 55%, #4d5457)`,
  },
  fluted: {
    id: "fluted",
    name: "Fluted glass",
    family: "Glass",
    surface: `${flutes}, ${sheen}, linear-gradient(160deg, #d3dad8, #b9c3c1 60%, #cdd5d3)`,
  },
  linen: {
    id: "linen",
    name: "Linen white",
    family: "Lacquered glass",
    surface: `${sheen}, #ece6da`,
  },
  sand: {
    id: "sand",
    name: "Sand beige",
    family: "Lacquered glass",
    surface: `${sheen}, #d5c5ab`,
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
      finishes.steel,
      finishes.graphite,
      finishes.clay,
      finishes.smoked,
      finishes.fluted,
      finishes.linen,
      finishes.sand,
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
  // Client photo, e.g. "/images/clients/anita.jpg", shared with permission.
  // Until set, a neutral person placeholder is shown.
  photo?: string;
  // True for a stand-in written to show the layout, not a client's words.
  // The page labels these as samples; replace each with a genuine review
  // (with the client's permission) and drop the flag.
  sample?: boolean;
};

// While this list is empty the section is hidden.
export const testimonials: Testimonial[] = [
  {
    quote:
      "Every vessel finally has its place. Two monsoons on, the drawers still glide and nothing has swollen or rusted.",
    name: "Homeowner",
    context: "Steel kitchen, Shivamogga",
    sample: true,
  },
  {
    quote:
      "The glass wardrobe makes our bedroom feel twice the size, and the lights inside are the detail everyone asks about.",
    name: "Homeowner",
    context: "Glass & steel wardrobe, Udupi",
    sample: true,
  },
  {
    quote:
      "Our old vanity peeled within a year. This one still looks new, and cleaning it takes a minute.",
    name: "Homeowner",
    context: "Vanity unit, Shivamogga",
    sample: true,
  },
];

/* ── Partner brands ─────────────────────────────────────────────────── */

export type Partner = {
  name: string; // as the brand writes it
  offer: string; // what the studio uses them for, in a few words
  // Official logo file supplied by the brand or its dealer portal, e.g.
  // "/images/partners/hettich.svg". Until set, the name is typeset instead.
  logo?: string;
  // Logos differ in shape; this evens out their visual weight (1 = default).
  logoScale?: number;
  // True for a logo drawn for dark backgrounds (white lettering); the strip
  // then shows it as a dark silhouette so it reads on the light page.
  logoOnDark?: boolean;
};

// Brands whose fittings and systems the studio works with. Only list a brand
// once the partnership and permission to show its name are confirmed.
export const partners: Partner[] = [
  // Hettich and Häfele: public-domain SVGs from Wikimedia Commons.
  // CenturyPly: the logo from centuryply.com. Aristo: supplied by the studio
  // (the white, dark-background version). Carysil: the logo from carysil.com.
  { name: "Hettich", offer: "Drawer systems & hinges", logo: "/images/partners/hettich.svg", logoScale: 1.35 },
  { name: "Häfele", offer: "Kitchen & wardrobe fittings", logo: "/images/partners/hafele.svg", logoScale: 0.6 },
  { name: "CenturyPly", offer: "Boards & panels", logo: "/images/partners/centuryply.png", logoScale: 1.2 },
  { name: "Aristo", offer: "Sliding wardrobe systems", logo: "/images/partners/aristo.png", logoScale: 0.75, logoOnDark: true },
  { name: "Carysil", offer: "Sinks & kitchen appliances", logo: "/images/partners/carysil.svg", logoScale: 0.45 },
];
