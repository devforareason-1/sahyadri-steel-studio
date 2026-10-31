import { images, type Img } from "./images";

export type Service = {
  slug: string;
  number: string;
  title: string;
  kicker: string;
  summary: string; // one line, for the homepage
  searchDescription: string; // about 150 characters, for the search result and link previews
  intro: string; // a short paragraph, for the solution page
  image: Img;
  gallery: Img[];
  considerations: { title: string; text: string }[];
  enquiry: string; // project type preselected in the enquiry form
  whatsappMessage: string;
};

// Steel kitchens and their accessories lead: they are most of the studio's
// work. Wardrobes and vanities follow; full homes are taken on as well.
export const services: Service[] = [
  {
    slug: "stainless-steel-kitchens",
    number: "01",
    title: "Stainless-Steel Kitchens",
    kicker: "Steel, drawer by drawer",
    summary:
      "Stainless-steel kitchen accessories and cabinets: baskets, pull-outs, tall units and corner systems, sized to your kitchen.",
    searchDescription:
      "Stainless-steel modular kitchens in Shivamogga and Udupi: plate baskets, pull-outs, tall pantry units and corner systems, planned around your kitchen.",
    intro:
      "An Indian kitchen works hard: heavy vessels, pressure cookers, water on every surface, a wash every day. We fit it out in stainless steel, from plate baskets to tall pantry pull-outs, so nothing swells, warps or sags with the years.",
    image: images.kitchenSteel,
    gallery: [
      images.kitchenGlossGrey,
      images.plateBasket,
      images.kitchenTallOven,
      images.steelVessels,
      images.kitchenGlassLit,
      images.steelPots,
      images.kitchenGrey,
      images.kitchenMatteCharcoal,
    ],
    considerations: [
      {
        title: "An accessory for every drawer",
        text: "Thali and plate baskets, cup-and-saucer racks, cutlery trays and bottle pull-outs, planned around what you actually keep.",
      },
      {
        title: "Tall units and pantry pull-outs",
        text: "Floor-to-ceiling steel storage for dabbas, grains and oil, every shelf reachable from the front.",
      },
      {
        title: "Corners that earn their place",
        text: "Carousels and swing-out corner systems that bring the back of the cabinet to you.",
      },
      {
        title: "No wood, anywhere",
        text: "Steel carcasses and fittings that shrug off water, heat and termites. Nothing porous for food or damp to settle into, so they wipe clean in seconds.",
      },
    ],
    enquiry: "Stainless-steel kitchen",
    whatsappMessage:
      "Hello Sahyadri Steel Studio, I would like to enquire about a stainless-steel kitchen and accessories.",
  },
  {
    slug: "glass-steel-wardrobes",
    number: "02",
    title: "Glass & Steel Wardrobes",
    kicker: "Order, behind glass",
    summary:
      "Wardrobes in glass and steel: sliding or hinged shutters, lit interiors and steel fittings that never warp.",
    searchDescription:
      "Glass and steel wardrobes in Shivamogga and Udupi, with sliding or hinged shutters, lit interiors and steel fittings that never swell or warp.",
    intro:
      "Glass shutters in slim steel profiles let a wardrobe feel light, even when it fills a wall. Behind them, steel interiors are planned around what you own, and nothing swells or smells through the monsoon.",
    image: images.wardrobeGlass,
    gallery: [
      images.wardrobeBronzeGlass,
      images.wardrobeCorridor,
      images.glassShutters,
      images.wardrobeSmokedGlass,
      images.mirrorWardrobe,
      images.wardrobeFrostedGrid,
      images.wardrobeGlass,
    ],
    considerations: [
      {
        title: "Glass, your way",
        text: "Clear, tinted, frosted or fluted shutters, chosen for how much you want to see and how much light the room has.",
      },
      {
        title: "Interiors that fit you",
        text: "Long and short hanging, shelves, drawers and trays in proportions that match your wardrobe.",
      },
      {
        title: "Steel fittings",
        text: "Trouser pull-outs, tie and belt racks, and hanging rails in steel, built for daily use.",
      },
      {
        title: "Light inside",
        text: "Profile lighting that switches on with the door, so the wardrobe reads clearly at any hour.",
      },
    ],
    enquiry: "Glass & steel wardrobe",
    whatsappMessage:
      "Hello Sahyadri Steel Studio, I would like to enquire about a glass and steel wardrobe.",
  },
  {
    slug: "vanity-units",
    number: "03",
    title: "Vanity Units",
    kicker: "Made for wet rooms",
    summary:
      "Stainless-steel vanities for bathrooms and wash areas, with mirror cabinets and glass shelves.",
    searchDescription:
      "Stainless-steel vanity units for bathrooms and wash areas in Shivamogga and Udupi, with mirror cabinets and glass shelves made for water.",
    intro:
      "A bathroom is the hardest room on furniture. Our vanities are built in stainless steel, so they stand up to water and steam for years, with mirrors, glass and storage planned around your basin.",
    image: images.vanityMarble,
    gallery: [
      images.vanityBrass,
      images.vanityMarble,
      images.vanityMatteBlack,
      images.basinBlackOval,
      images.vanityGloss,
      images.vanityBlackMarble,
      images.steelTap,
      images.vanityRoundMirror,
    ],
    considerations: [
      {
        title: "Water is no problem",
        text: "Steel bodies that do not swell, peel or rot, however wet the bathroom gets.",
      },
      {
        title: "Wall-hung or floor-standing",
        text: "Wall-hung units keep the floor clear for cleaning; floor-standing ones hold more.",
      },
      {
        title: "Mirror and storage together",
        text: "Mirror cabinets, glass shelves and drawers sized for daily toiletries.",
      },
      {
        title: "Wash areas too",
        text: "Units for the dining wash basin and utility corners, matched to the rest of the home.",
      },
    ],
    enquiry: "Vanity unit",
    whatsappMessage:
      "Hello Sahyadri Steel Studio, I would like to enquire about a vanity unit.",
  },
  {
    slug: "full-home-interiors",
    number: "04",
    title: "Full-Home Interiors",
    kicker: "One team, every room",
    summary:
      "Complete interiors in steel and glass, from the kitchen to the bedrooms, planned as one.",
    searchDescription:
      "Full-home interiors in steel and glass in Shivamogga and Udupi: kitchen, wardrobes, vanities and living units, designed together by one team.",
    intro:
      "When you are building or renovating a whole home, we can take on every room: kitchen, wardrobes, vanities, and the TV, crockery and storage units between them, in one consistent language of steel and glass.",
    image: images.fullHome,
    gallery: [
      images.fullHome,
      images.homeMarbleLiving,
      images.homeCharcoalIsland,
      images.wardrobeBronzeGlass,
      images.homeWhiteOpenPlan,
      images.vanityBlackMarble,
      images.kitchenGrey,
      images.mirrorWardrobe,
    ],
    considerations: [
      {
        title: "Planned together",
        text: "One layout for the whole home, so storage, finishes and lighting carry from room to room.",
      },
      {
        title: "Living and dining units",
        text: "TV units, crockery units and storage walls in steel and glass, designed alongside the rest.",
      },
      {
        title: "One point of contact",
        text: "A single team from first measurement to final installation.",
      },
      {
        title: "Built to last",
        text: "The same no-wood approach throughout, for interiors that handle Karnataka's monsoons.",
      },
    ],
    enquiry: "Full-home interiors",
    whatsappMessage:
      "Hello Sahyadri Steel Studio, I would like to enquire about interiors for my whole home.",
  },
];
