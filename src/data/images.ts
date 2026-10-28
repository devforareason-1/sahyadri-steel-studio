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

export type Img = { src: string; alt: string };

export const images = {
  /* Kitchens */
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

  /* Vanities */
  vanityGloss: {
    src: pexels(6538892),
    alt: "Wall-hung vanity with glossy dark fronts, a vessel basin and a long mirror",
  },
  vanityMarble: {
    src: pexels(6301184),
    alt: "Vanity with soft-grey drawers, a marble counter and a round mirror",
  },

  /* Full home */
  fullHome: {
    src: pexels(6492403),
    alt: "Open-plan living and kitchen with glossy lacquered units",
  },
} satisfies Record<string, Img>;
