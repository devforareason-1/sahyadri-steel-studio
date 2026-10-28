import { images, type Img } from "./images";

export type ProjectCategory = "Kitchens" | "Wardrobes" | "Vanities" | "Full home";

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  label: string;
  description: string;
  image: Img;
  // Set true once the image shows a real, completed Sahyadri project.
  // While false the gallery labels it as a concept visual.
  completed: boolean;
};

export const projectCategories: ProjectCategory[] = [
  "Kitchens",
  "Wardrobes",
  "Vanities",
  "Full home",
];

// Concept visuals only. Do not add locations, clients or budgets until they
// belong to a real project the studio has completed.
export const projects: Project[] = [
  {
    slug: "steel-kitchen",
    title: "The Steel Kitchen",
    category: "Kitchens",
    label: "Stainless-steel kitchen",
    description:
      "Steel-fronted cabinetry, built-in appliances and a stone island, for a kitchen that is precise and easy to keep.",
    image: images.kitchenSteel,
    completed: false,
  },
  {
    slug: "accessory-kitchen",
    title: "The Organised Kitchen",
    category: "Kitchens",
    label: "Kitchen accessories",
    description:
      "Plate baskets, cutlery trays, a tall pantry pull-out and a corner carousel, all in stainless steel.",
    image: images.plateBasket,
    completed: false,
  },
  {
    slug: "glass-wardrobe",
    title: "The Glass Wardrobe",
    category: "Wardrobes",
    label: "Glass & steel wardrobe",
    description:
      "Glass-fronted hanging, lit shelves and sliding panels, with an interior planned bay by bay.",
    image: images.wardrobeGlass,
    completed: false,
  },
  {
    slug: "matte-kitchen",
    title: "The Matte Kitchen",
    category: "Kitchens",
    label: "Matte graphite & steel",
    description:
      "Handle-less matte graphite fronts with a steel sink and tap, quiet and easy to clean.",
    image: images.kitchenGraphite,
    completed: false,
  },
  {
    slug: "steel-vanity",
    title: "The Steel Vanity",
    category: "Vanities",
    label: "Vanity unit",
    description:
      "A vanity with soft-grey drawers, a marble counter and a round mirror.",
    image: images.vanityMarble,
    completed: false,
  },
  {
    slug: "full-home",
    title: "The Whole Home",
    category: "Full home",
    label: "Full-home interiors",
    description:
      "Kitchen, wardrobes, vanities and living units, planned together in one language of steel and glass.",
    image: images.fullHome,
    completed: false,
  },
];
