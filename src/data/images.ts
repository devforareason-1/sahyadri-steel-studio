// Every photograph on the site is defined here, so swapping concept imagery
// for real project photos is a one-file change.
//
// To use your own photos: put them in /public/images/... and replace the
// value with a path such as "/images/projects/kitchen-01.jpg".
//
// Current images are royalty-free concept photography and renders from
// Unsplash (free Unsplash License). They are illustrative only and do not
// show Sahyadri Steel Studio projects. They were chosen for a warm,
// architectural palette: walnut, stone, graphite and brushed steel.

const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop`;

export type Img = { src: string; alt: string };

export const images = {
  /* Kitchens */
  kitchenWalnut: {
    src: unsplash("photo-1783841193339-9a2ec13b4118"),
    alt: "Walnut and stone kitchen with an island, integrated wine storage and a slim linear pendant",
  },
  kitchenIsland: {
    src: unsplash("photo-1709747820806-057272eddd5d"),
    alt: "Long kitchen island with a black stone top, walnut cabinetry and pendant lights",
  },
  kitchenGraphite: {
    src: unsplash("photo-1600684388091-627109f3cd60"),
    alt: "Matte black handle-less kitchen with a slim chimney and steel tap",
  },
  kitchenSteel: {
    src: unsplash("photo-1639405069836-f82aa6dcb900"),
    alt: "Kitchen with graphite cabinetry, built-in steel appliances and stone worktops",
  },
  kitchenFluted: {
    src: unsplash("photo-1751290741395-8fd9bc214f61"),
    alt: "Fluted wood panelling with concealed doors beside a dark worktop and steel refrigerator",
  },
  kitchenOak: {
    src: unsplash("photo-1764526624453-db32c24eca55"),
    alt: "Bright kitchen with a wood-veneer tall unit and pale stone worktops",
  },
  kitchenMarble: {
    src: unsplash("photo-1755316388093-faff473ffdfb"),
    alt: "Light kitchen with a marble waterfall island and warm wood shelving",
  },
  steelTap: {
    src: unsplash("photo-1784790601912-b30717b805b8"),
    alt: "Brushed-steel tap running into a double sink, with a warm strip of light behind",
  },
  drawerDetail: {
    src: unsplash("photo-1708426045412-08658fb82e1e"),
    alt: "Open kitchen drawer with a fitted wooden cutlery organiser",
  },

  /* Wardrobes and bedrooms */
  wardrobeSystem: {
    src: unsplash("photo-1672137233327-37b0c1049e77"),
    alt: "Fitted wardrobe with glass-fronted hanging, lit shelves, a sliding panel and a dressing niche",
  },
  walkIn: {
    src: unsplash("photo-1785395407788-71b829c98bb4"),
    alt: "Minimal walk-in wardrobe with wooden shelving and white shirts on a steel rail",
  },
  bedroomJoinery: {
    src: unsplash("photo-1757344454333-cc666252e596"),
    alt: "Bedroom with walnut built-ins, lit display shelves and full-height wardrobe fronts",
  },
  bedroomCalm: {
    src: unsplash("photo-1784653548504-c0928cd4737e"),
    alt: "Soft, neutral bedroom with an upholstered bed and warm pendant light",
  },

  /* Interiors and details */
  studyNook: {
    src: unsplash("photo-1784012980517-005c26585344"),
    alt: "Minimal study with a fluted walnut desk and a linear pendant",
  },
  joineryDetail: {
    src: unsplash("photo-1684846416931-dddf8cbfc2ad"),
    alt: "Close view of curved wooden joinery against a white wall",
  },
  livingWood: {
    src: unsplash("photo-1774200981075-a728eaaa3824"),
    alt: "Open living and kitchen space with warm wood joinery",
  },
  interiorMinimal: {
    src: unsplash("photo-1600607687939-ce8a6c25118c"),
    alt: "Contemporary living space with a timber feature wall",
  },
  residence: {
    src: unsplash("photo-1600585154340-be6161a56a0c"),
    alt: "Contemporary home at dusk with warm light inside",
  },
} satisfies Record<string, Img>;
