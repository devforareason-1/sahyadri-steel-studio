// Every photograph on the site is defined here, so swapping concept imagery
// for real project photos is a one-file change.
//
// To use your own photos: put them in /public/images/... and replace the
// value with a path such as "/images/projects/kitchen-01.jpg".
//
// Current images are royalty-free concept photography from Unsplash.
// They are illustrative only and do not show Sahyadri Steel Studio projects.

const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop`;

export type Img = { src: string; alt: string };

export const images = {
  heroKitchen: {
    src: unsplash("photo-1600566753086-00f18fb6b3ea"),
    alt: "Contemporary kitchen with clean cabinetry and warm architectural lighting",
  },
  kitchenWarm: {
    src: unsplash("photo-1556911220-bff31c812dba"),
    alt: "Modern kitchen with wood-finish cabinets and warm light",
  },
  kitchenMinimal: {
    src: unsplash("photo-1484154218962-a197022b5858"),
    alt: "Minimal contemporary kitchen with handle-less cabinets",
  },
  kitchenIsland: {
    src: unsplash("photo-1600489000022-c2086d79f9d4"),
    alt: "Kitchen island with stone-look surface and pendant lighting",
  },
  kitchenBright: {
    src: unsplash("photo-1556909114-f6e7ad7d3136"),
    alt: "Bright kitchen with pale cabinetry and natural daylight",
  },
  kitchenSteel: {
    src: unsplash("photo-1556912173-3bb406ef7e77"),
    alt: "Kitchen with stainless-steel appliances and fittings",
  },
  kitchenDark: {
    src: unsplash("photo-1565538810643-b5bdb714032a"),
    alt: "Dark, moody kitchen with matte cabinetry",
  },
  wardrobeSliding: {
    src: unsplash("photo-1595428774223-ef52624120d2"),
    alt: "Built-in wardrobe with full-height doors",
  },
  walkIn: {
    src: unsplash("photo-1558997519-83ea9252edf8"),
    alt: "Walk-in wardrobe with open hanging and shelving",
  },
  wardrobeInterior: {
    src: unsplash("photo-1597072689227-8882273e8f6a"),
    alt: "Organised wardrobe interior with hanging space and shelves",
  },
  bedroomCalm: {
    src: unsplash("photo-1615874959474-d609969a20ed"),
    alt: "Calm bedroom with soft, neutral tones",
  },
  bedroom: {
    src: unsplash("photo-1505693416388-ac5ce068fe85"),
    alt: "Quiet bedroom with built-in storage",
  },
  interiorWarm: {
    src: unsplash("photo-1600210492486-724fe5c67fb0"),
    alt: "Sunlit interior with natural textures",
  },
  interiorLiving: {
    src: unsplash("photo-1618221195710-dd6b41faaea6"),
    alt: "Warm living space with natural light and soft furnishings",
  },
  interiorMinimal: {
    src: unsplash("photo-1600607687939-ce8a6c25118c"),
    alt: "Minimal contemporary interior",
  },
  interiorCoordinated: {
    src: unsplash("photo-1600607687920-4e2a09cf159d"),
    alt: "Contemporary interior with coordinated furniture and finishes",
  },
  interiorDetail: {
    src: unsplash("photo-1616486338812-3dadae4b4ace"),
    alt: "Interior detail with layered materials",
  },
  interiorShelving: {
    src: unsplash("photo-1600585154526-990dced4db0d"),
    alt: "Contemporary interior with built-in joinery",
  },
  interiorLight: {
    src: unsplash("photo-1600607687644-c7171b42498f"),
    alt: "Open interior with soft daylight",
  },
  residence: {
    src: unsplash("photo-1600585154340-be6161a56a0c"),
    alt: "Contemporary home with warm natural finishes",
  },
  livingLight: {
    src: unsplash("photo-1586023492125-27b2c045efd7"),
    alt: "Bright living room with natural light",
  },
  livingNatural: {
    src: unsplash("photo-1522708323590-d24dbb6b0267"),
    alt: "Light-filled living room with natural materials",
  },
} satisfies Record<string, Img>;
