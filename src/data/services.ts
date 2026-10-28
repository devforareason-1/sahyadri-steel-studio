import { images, type Img } from "./images";

export type Service = {
  slug: string;
  number: string;
  title: string;
  kicker: string;
  summary: string; // one line, for the homepage
  intro: string; // a short paragraph, for the solution page
  image: Img;
  gallery: Img[];
  considerations: { title: string; text: string }[];
  enquiry: string; // project type preselected in the enquiry form
  whatsappMessage: string;
};

export const services: Service[] = [
  {
    slug: "modular-kitchens",
    number: "01",
    title: "Modular Kitchens",
    kicker: "Cook, gather, repeat",
    summary:
      "Kitchens planned around the way you cook, with storage that keeps every surface calm.",
    intro:
      "A good kitchen is measured in steps saved and drawers that open exactly where you need them. We plan the layout around your routine, then refine the finishes until the room feels as good as it works.",
    image: images.kitchenIsland,
    gallery: [images.kitchenMinimal, images.kitchenWarm, images.kitchenDark],
    considerations: [
      {
        title: "Layout and workflow",
        text: "Cooking, prep and cleaning zones arranged to suit how your household actually uses the kitchen.",
      },
      {
        title: "Storage that earns its place",
        text: "Deep drawers, corner solutions and tall units planned around what you store and how often.",
      },
      {
        title: "Finishes that live well",
        text: "Shutters, counters and hardware chosen for everyday use as much as for appearance.",
      },
      {
        title: "Clean detailing",
        text: "Aligned lines, considered handles and tidy junctions that make the room feel composed.",
      },
    ],
    enquiry: "Modular kitchen",
    whatsappMessage:
      "Hello Sahyadri Steel Studio, I would like to enquire about a modular kitchen.",
  },
  {
    slug: "designer-wardrobes",
    number: "02",
    title: "Designer Wardrobes",
    kicker: "Order, quietly built in",
    summary:
      "Sliding, hinged and walk-in wardrobes with interiors designed around what you own.",
    intro:
      "Behind every calm bedroom is a wardrobe that does its job well. We plan hanging, folding, drawers and accessory storage around your belongings, then design fronts that sit beautifully in the room.",
    image: images.wardrobeSliding,
    gallery: [images.walkIn, images.wardrobeInterior, images.bedroomCalm],
    considerations: [
      {
        title: "Interiors that fit you",
        text: "Long and short hanging, shelves, drawers and trays in proportions that match your wardrobe.",
      },
      {
        title: "Sliding or hinged",
        text: "Door styles chosen around the room, the bed position and how much clearance you have.",
      },
      {
        title: "Walk-in options",
        text: "Open or enclosed dressing areas for rooms where a dedicated space makes sense.",
      },
      {
        title: "Finishes in harmony",
        text: "Fronts that relate to your flooring, walls and furniture rather than competing with them.",
      },
    ],
    enquiry: "Wardrobe",
    whatsappMessage:
      "Hello Sahyadri Steel Studio, I would like to enquire about a wardrobe.",
  },
  {
    slug: "custom-steel-solutions",
    number: "03",
    title: "Custom Stainless-Steel Solutions",
    kicker: "Precise by nature",
    summary:
      "Bespoke stainless-steel kitchens, storage and fittings, designed for hard-working spaces.",
    intro:
      "Stainless steel brings a clean, practical character to a home. We design bespoke steel kitchens, utility storage and fittings that feel considered and architectural, not industrial.",
    image: images.kitchenSteel,
    gallery: [images.kitchenMinimal, images.kitchenBright, images.interiorShelving],
    considerations: [
      {
        title: "Made to measure",
        text: "Steel units planned for your exact walls, corners and appliances.",
      },
      {
        title: "Practical surfaces",
        text: "A material that suits kitchens, utility areas and other spaces that see heavy daily use.",
      },
      {
        title: "Brushed or combined",
        text: "Steel on its own, or paired with wood, stone-look or matte finishes for warmth.",
      },
      {
        title: "Utility and storage",
        text: "Pantry, utility and laundry storage that keeps the working parts of a home organised.",
      },
    ],
    enquiry: "Custom stainless-steel solution",
    whatsappMessage:
      "Hello Sahyadri Steel Studio, I would like to enquire about a custom stainless-steel solution.",
  },
  {
    slug: "bespoke-interior-details",
    number: "04",
    title: "Bespoke Interior Details",
    kicker: "The finishing layer",
    summary:
      "Storage walls, units and joinery details that tie a home together.",
    intro:
      "The pieces between rooms often make a home feel finished: a TV unit with hidden storage, a crockery wall, a quiet study nook. We design these details to match the rest of your interiors.",
    image: images.interiorShelving,
    gallery: [images.interiorDetail, images.interiorCoordinated, images.livingNatural],
    considerations: [
      {
        title: "Storage walls",
        text: "Floor-to-ceiling units that hold more while keeping the room visually quiet.",
      },
      {
        title: "Living and dining units",
        text: "TV units, crockery units and sideboards designed alongside the rest of the space.",
      },
      {
        title: "Small spaces, used well",
        text: "Study nooks, shoe storage and entry units that make the most of every corner.",
      },
      {
        title: "A consistent language",
        text: "Materials and details that carry through from kitchen to bedroom.",
      },
    ],
    enquiry: "Bespoke interior details",
    whatsappMessage:
      "Hello Sahyadri Steel Studio, I would like to enquire about bespoke interior details for my home.",
  },
];
