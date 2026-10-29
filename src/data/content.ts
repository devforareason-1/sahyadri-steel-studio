/* ── Materials and finishes ─────────────────────────────────────────── */

const svg = (markup: string) =>
  `url("data:image/svg+xml,${encodeURIComponent(markup)}")`;

// Fine grain that gives a flat colour the tactile surface of a matt finish.
export const matteGrain = svg(
  `<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .07 0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`
);

// The finish library follows the way steel-interiors studios present their
// range: solid colours, wood-look finishes and stone & metal effects, all
// applied over a stainless-steel cabinet. "Wood-look" is a printed finish on
// steel, so the promise of no wood anywhere still holds.
//
// Solid colours are standard RAL colours, the references powder-coaters and
// lacquer suppliers order by. RAL publishes no official screen values, so
// the hex values here are common sRGB approximations; the physical sample
// is always the reference. Textures are close-up photographs of the real
// material (royalty-free, Unsplash License), cropped square by Unsplash's
// image service, which also applies the tone and zoom settings given.

export type FinishKind = "colour" | "texture" | "glass";

export type Finish = {
  id: string;
  name: string;
  family: string;
  code?: string; // the reference to order it by, e.g. a RAL colour
  kind: FinishKind;
  base: string; // flat colour: the swatch while a photo loads, and the colour itself
  image?: string; // photograph of the material, for textures
};

export type Hardware = {
  id: string;
  name: string;
  bar: string; // CSS background of a bar handle, lit from above
};

const photo = (id: string, adjust = "") =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&h=900&q=70${adjust}`;

// The CSS background that shows a finish: its photograph, or its colour.
export function finishBackground(f: Finish) {
  return f.image ? `url("${f.image}") center / cover, ${f.base}` : f.base;
}

const colour = (id: string, name: string, code: string, base: string): Finish => ({
  id,
  name,
  family: "Solid colour",
  code,
  kind: "colour",
  base,
});

export const colourFinishes: Finish[] = [
  colour("ral-9010", "Pure white", "RAL 9010", "#f1ece1"),
  colour("ral-9001", "Cream", "RAL 9001", "#e9e0d2"),
  colour("ral-1015", "Light ivory", "RAL 1015", "#e6d2b5"),
  colour("ral-1019", "Grey beige", "RAL 1019", "#a48f7a"),
  colour("ral-7035", "Light grey", "RAL 7035", "#cbd0cc"),
  colour("ral-7024", "Graphite grey", "RAL 7024", "#474a51"),
  colour("ral-7016", "Anthracite", "RAL 7016", "#383e42"),
  colour("ral-9005", "Jet black", "RAL 9005", "#0e0e10"),
  colour("ral-3004", "Purple red", "RAL 3004", "#6b1c23"),
  colour("ral-3027", "Raspberry red", "RAL 3027", "#c51d34"),
  colour("ral-4010", "Telemagenta", "RAL 4010", "#cf3476"),
  colour("ral-2004", "Pure orange", "RAL 2004", "#e75b12"),
  colour("ral-1023", "Traffic yellow", "RAL 1023", "#f0ca00"),
  colour("ral-6021", "Pale green", "RAL 6021", "#89ac76"),
  colour("ral-6005", "Moss green", "RAL 6005", "#2f4538"),
  colour("ral-5024", "Pastel blue", "RAL 5024", "#5d9b9b"),
  colour("ral-5014", "Pigeon blue", "RAL 5014", "#606e8c"),
  colour("ral-5011", "Steel blue", "RAL 5011", "#232c3f"),
];

const wood = (id: string, name: string, photoId: string, base: string, adjust = ""): Finish => ({
  id,
  name,
  family: "Wood-look on steel",
  kind: "texture",
  base,
  image: photo(photoId, adjust),
});

export const woodFinishes: Finish[] = [
  wood("ash-oak", "Ash grey oak", "1611600700192-d87eaeed4f81", "#8f7f6c"),
  wood("natural-teak", "Natural teak", "1644931551533-02906718127f", "#8c7356"),
  wood("smoked-walnut", "Smoked walnut", "1576092762791-dd9e2220abd1", "#4a3226"),
  wood("wenge", "Wenge", "1546484396-fb3fc6f95f98", "#2b211d"),
];

const effect = (
  id: string,
  name: string,
  family: string,
  photoId: string,
  base: string,
  adjust = ""
): Finish => ({ id, name, family, kind: "texture", base, image: photo(photoId, adjust) });

const brushedSteel = effect(
  "brushed-steel",
  "Brushed stainless",
  "Stainless steel",
  "1667892702884-faa077e80d7b",
  "#a9adb0",
  // Zoomed into the evenly lit corner, clear of the dark reflection band.
  "&sat=-100&crop=focalpoint&fp-x=0.25&fp-y=0.2&fp-z=2.5"
);

export const effectFinishes: Finish[] = [
  brushedSteel,
  effect("statuario", "Statuario marble", "Marble effect", "1566041510394-cf7c8fe21800", "#ecebe8"),
  effect("nero-marquina", "Nero marble", "Marble effect", "1550053808-52a75a05955d", "#1c1f22"),
  effect(
    "travertine",
    "Travertine",
    "Stone effect",
    "1780253460324-9d49f88c74fc",
    "#d9c8ad",
    // Zoomed into a single tile, clear of the grout lines.
    "&crop=focalpoint&fp-x=0.36&fp-y=0.36&fp-z=6"
  ),
  effect("concrete", "Grey concrete", "Concrete effect", "1521459467264-802e2ef3141f", "#9a9a98"),
  effect("ivory-concrete", "Ivory concrete", "Concrete effect", "1617713965103-9fda56c89fad", "#dcdad6"),
  effect("corten", "Corten rust", "Metal effect", "1614535683569-129faaa108f7", "#8f4a2c"),
  effect("copper-patina", "Copper patina", "Metal effect", "1781021541218-3968570b173f", "#1f5e5c"),
  {
    id: "fluted-glass",
    name: "Fluted glass",
    family: "Glass",
    kind: "glass",
    base: "#b9c1c0",
    image: photo("1652862730507-32988eb23a67", "&sat=-80&exp=10"),
  },
  {
    id: "tinted-glass",
    name: "Grey-tinted glass",
    family: "Glass",
    kind: "glass",
    base: "linear-gradient(160deg, #5a6062, #3c4143 55%, #4b5153)",
  },
];

// Worktop and backsplash surfaces: the stone, concrete and steel effects.
export const worktopFinishes: Finish[] = effectFinishes.filter((f) =>
  ["statuario", "nero-marquina", "travertine", "concrete", "ivory-concrete", "brushed-steel"].includes(f.id)
);

export const hardwareFinishes: Hardware[] = [
  {
    id: "hw-steel",
    name: "Brushed steel",
    bar: "linear-gradient(90deg, #7f8487, #e6e8e9 45%, #b7bbbd 60%, #8a8f92)",
  },
  {
    id: "hw-champagne",
    name: "Champagne",
    bar: "linear-gradient(90deg, #8f7650, #ecdab2 45%, #c9b086 60%, #9a8158)",
  },
  {
    id: "hw-black",
    name: "Matte black",
    bar: "linear-gradient(90deg, #111, #3a3a3a 45%, #222 60%, #111)",
  },
];

// The size of each full range, as you would quote it to a client, e.g.
// "200+". Leave "" until confirmed with your suppliers; the library then
// says only how many are shown here and that the rest are in the studio.
export const finishRange = {
  colours: "",
  wood: "",
  effects: "",
};

export const findFinish = (id: string) =>
  [...colourFinishes, ...woodFinishes, ...effectFinishes].find((f) => f.id === id)!;

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
