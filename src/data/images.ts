// Every photograph on the site is defined here, so swapping in real project
// photos is a one-file change.
//
// To use your own photos: put them in /public/images/... and replace the
// value with a path such as "/images/projects/kitchen-01.jpg".
//
// The studio works in stainless steel and glass only, so no image here
// should show wood fronts or wooden fittings. The photographs below are
// royalty-free concept images from Unsplash (Unsplash License) and Pexels
// (Pexels License), both free for commercial use without attribution. Each
// was checked to show steel, glass, lacquer or matte metal rather than
// wooden cabinetry. They are illustrative only and do not show Sahyadri
// Steel Studio projects.
//
// An empty src shows a brushed-steel "photograph to come" plate with the
// alt text, so the entries with src: "" double as a shot list for the
// studio's own photography: Indian homes, real installations.

const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop`;

const pexels = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg`;

export type Img = {
  src: string;
  alt: string;
  ratio?: number; // width ÷ height, so galleries can show the whole picture
};

export const images = {
  /* Kitchens */
  // The home page's opening scene: starts in the dark, and scrolling switches
  // on its three pendants. Hero.tsx places the light on them, so another photo
  // here needs its LAMP_ positions updating.
  kitchenIsland: {
    src: unsplash("photo-1582417746335-b781b445c610"),
    alt: "Kitchen island with a pale stone counter under three warm pendant lights, in a dark room",
  },
  kitchenSteel: {
    src: unsplash("photo-1639405069836-f82aa6dcb900"),
    alt: "Kitchen with metallic graphite cabinetry, built-in steel appliances and a stone island",
  },
  kitchenGraphite: {
    src: unsplash("photo-1600684388091-627109f3cd60"),
    alt: "Matte graphite handle-less kitchen with a slim chimney and a steel sink and tap",
  },
  kitchenGrey: {
    src: unsplash("photo-1782290546855-03a5def1d265"),
    alt: "Grey handle-less L-shaped kitchen with tall units and a lit white counter",
  },
  steelTap: {
    src: unsplash("photo-1784790601912-b30717b805b8"),
    alt: "Brushed-steel tap running into a double sink",
  },
  steelVessels: {
    src: pexels(28726706),
    alt: "Stacked stainless-steel cooking pots, lit warmly in a kitchen",
  },
  plateBasket: {
    src: unsplash("photo-1676907229752-ac14b0152b92"),
    alt: "Looking down into a deep drawer fitted with a metal plate, bowl and cup organiser",
  },
  cutleryDrawer: {
    src: "",
    alt: "Stainless-steel cutlery and spoon organiser in a top drawer",
  },
  tallUnit: {
    src: "",
    alt: "Stainless-steel tall pantry pull-out, open, with dabbas and oil bottles",
  },
  cornerUnit: {
    src: "",
    alt: "Stainless-steel corner carousel swung out of a base cabinet",
  },

  kitchenGlossGrey: {
    src: unsplash("photo-1682662045846-77f6e1ce55b4"),
    alt: "Gloss grey handle-less kitchen with lit marble backsplash and built-in black ovens",
    ratio: 3 / 2,
  },
  kitchenMatteCharcoal: {
    src: unsplash("photo-1599941973480-33ce6bbca25d"),
    alt: "Matte charcoal L-shaped kitchen with handle-less drawers under a wide window",
    ratio: 2926 / 2718,
  },
  kitchenTallOven: {
    src: unsplash("photo-1722605919304-02de79390a39"),
    alt: "Metallic grey tall units with a built-in oven and a black stone counter",
    ratio: 2 / 3,
  },
  kitchenGlassLit: {
    src: unsplash("photo-1656646424775-23849832a088"),
    alt: "Gloss grey kitchen with frosted-glass wall units, a steel-handled run and a white island",
    ratio: 3 / 2,
  },
  steelPots: {
    src: unsplash("photo-1604414499020-f9ac575bc5ec"),
    alt: "Stainless-steel pots on a brushed-steel shelf, against the dark",
    ratio: 2 / 3,
  },

  /* Kitchen accessories. Supplied by the studio from its brochure and suppliers,
     not stock: confirm the right to use each before launch, or replace it with
     the studio's own photograph. */
  accessoryBottles: {
    src: "/images/accessories/bottle-pullout.jpg",
    alt: "Slim bottle pull-out drawn out of a base cabinet, holding spices and oils",
  },
  accessoryCarousel: {
    src: "/images/accessories/corner-carousel.jpg",
    alt: "Corner carousel swung out of a cabinet, its trays holding steel vessels",
  },
  accessoryTandem: {
    src: "/images/accessories/tandem-box.jpg",
    alt: "Deep steel tandem drawer box, fully open",
  },
  accessoryIroning: {
    src: "/images/accessories/ironing-table.jpg",
    alt: "Ironing board pulled out of a drawer on steel runners, under a stone counter",
  },
  accessoryDrawer: {
    src: "/images/accessories/drawers.jpg",
    alt: "Two slim-sided white drawer systems, one with a raised inner gallery rail",
  },
  accessoryLeMans: {
    src: "/images/accessories/lemans-corner.jpg",
    alt: "LeMans corner unit swung out of a base cabinet, its two curved trays holding steel bowls",
  },
  accessoryWicker: {
    src: "/images/accessories/wicker-baskets.jpg",
    alt: "Three pull-out wicker baskets in a base unit, holding vegetables and apples",
  },
  accessoryCutlery: {
    src: "/images/accessories/pvc-cutlery.jpg",
    alt: "Open drawer with a grey divided tray holding cutlery and kitchen tools",
  },
  accessoryBin: {
    src: "/images/accessories/waste-bin.jpg",
    alt: "Stainless-steel waste bin fixed inside a cabinet door, its lid lifted",
  },

  /* Wardrobes */
  wardrobeGlass: {
    src: unsplash("photo-1672137233327-37b0c1049e77"),
    alt: "Fitted wardrobe with glass-fronted hanging, lit shelves, sliding panels and a dressing niche",
  },
  glassShutters: {
    src: pexels(6492385),
    alt: "Bedroom with a full-height glass wardrobe in slim metal profiles",
  },
  mirrorWardrobe: {
    src: unsplash("photo-1722603929412-18920329dee3"),
    alt: "Sliding mirror wardrobe in slim black profiles, open to show the hanging",
  },

  wardrobeBronzeGlass: {
    src: unsplash("photo-1662454419622-a41092ecd245"),
    alt: "Fluted panel wardrobe with a bronze-framed glass door, lit shelves and a dressing niche",
    ratio: 12154 / 8625,
  },
  wardrobeCorridor: {
    src: unsplash("photo-1792270219156-9327e8175161"),
    alt: "Long dressing corridor with lit glass-fronted wardrobes above soft-grey drawers",
    ratio: 2 / 3,
  },
  wardrobeSmokedGlass: {
    src: unsplash("photo-1765766600589-ddad380d6534"),
    alt: "Smoked-glass wardrobe in dark profiles, with shirts on a lit hanging rail",
    ratio: 2 / 3,
  },
  wardrobeFrostedGrid: {
    src: unsplash("photo-1623050804066-42bcedb4e81d"),
    alt: "Corner wardrobe of frosted-glass panels in dark frames, with a mirrored dressing unit",
    ratio: 3 / 2,
  },

  /* Vanities */
  vanityGloss: {
    src: pexels(6538892),
    alt: "Wall-hung vanity with glossy dark fronts, a vessel basin and a long mirror",
  },
  vanityMarble: {
    src: pexels(6301184),
    alt: "Vanity with soft-grey drawers, a marble counter and a round mirror",
  },

  vanityRoundMirror: {
    src: unsplash("photo-1721824320387-4ec47af1ea9c"),
    alt: "White wall-hung vanity with a black wall tap under a round black-framed mirror",
    ratio: 2 / 3,
  },
  vanityBrass: {
    src: unsplash("photo-1782805180061-3d131e792074"),
    alt: "Graphite vanity with brass pulls and tap against teal tiles and marble",
    ratio: 5357 / 8032,
  },
  vanityMatteBlack: {
    src: unsplash("photo-1782805152909-2cf5a123fd7b"),
    alt: "Wall-hung matte black vanity with an oval mirror and a black towel rail",
    ratio: 2 / 3,
  },
  vanityBlackMarble: {
    src: unsplash("photo-1765766556463-180500e61ea8"),
    alt: "Black vanity with a white vessel basin between marble walls and a long mirror",
    ratio: 2 / 3,
  },
  basinBlackOval: {
    src: unsplash("photo-1769763917830-7b9c8317329d"),
    alt: "Black oval basin with a steel wall tap on a stone counter",
    ratio: 3795 / 1318,
  },

  /* The studio */
  studioSamples: {
    src: unsplash("photo-1763076470404-23554ef26747"),
    alt: "Sample board of a graphite lacquer front with a steel handle, marble, stone and fabric",
  },
  processSwatches: {
    src: unsplash("photo-1667400104764-a5fd01a919b0"),
    alt: "Designer holding a fan of colour swatches over a floor plan",
  },

  /* Full home */
  fullHome: {
    src: pexels(6492403),
    alt: "Open-plan living and kitchen with glossy lacquered units",
  },
  homeCharcoalIsland: {
    src: unsplash("photo-1687942691222-0876157ac76f"),
    alt: "High-rise living room opening onto a charcoal island and white handle-less kitchen",
    ratio: 3 / 2,
  },
  homeWhiteOpenPlan: {
    src: unsplash("photo-1772475385317-09f9ef320474"),
    alt: "White open-plan home with a low media unit, a sculptural sofa and a pale kitchen beyond",
    ratio: 5898 / 3906,
  },
  homeMarbleLiving: {
    src: unsplash("photo-1761679296778-7f245d39148d"),
    alt: "Marble-floored living room running into a dark and white lacquered kitchen",
    ratio: 4188 / 5235,
  },
} satisfies Record<string, Img>;
