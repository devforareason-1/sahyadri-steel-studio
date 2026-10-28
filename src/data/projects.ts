import { images, type Img } from "./images";

export type ProjectCategory = "Kitchens" | "Wardrobes" | "Steel" | "Interiors";

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
  "Steel",
  "Interiors",
];

// Concept visuals only. Do not add locations, clients or budgets until they
// belong to a real project the studio has completed.
export const projects: Project[] = [
  {
    slug: "contemporary-kitchen",
    title: "The Contemporary Kitchen",
    category: "Kitchens",
    label: "Modular kitchen",
    description:
      "An island-led layout with continuous storage, a stone-look worktop and soft, layered lighting.",
    image: images.kitchenIsland,
    completed: false,
  },
  {
    slug: "sliding-wardrobe",
    title: "The Sliding Wardrobe",
    category: "Wardrobes",
    label: "Sliding-door wardrobe",
    description:
      "Full-height sliding fronts that keep the bedroom calm, with an interior planned bay by bay.",
    image: images.wardrobeSliding,
    completed: false,
  },
  {
    slug: "walk-in-wardrobe",
    title: "The Walk-in Wardrobe",
    category: "Wardrobes",
    label: "Walk-in wardrobe",
    description:
      "Open hanging, folded storage and drawers arranged as a quiet dressing room.",
    image: images.walkIn,
    completed: false,
  },
  {
    slug: "steel-kitchen",
    title: "The Steel Kitchen",
    category: "Steel",
    label: "Stainless-steel kitchen",
    description:
      "Brushed stainless steel paired with warm surfaces, for a kitchen that is precise and easy to keep.",
    image: images.kitchenSteel,
    completed: false,
  },
  {
    slug: "utility-storage",
    title: "The Utility Wall",
    category: "Steel",
    label: "Bespoke storage",
    description:
      "A floor-to-ceiling storage wall for pantry, cleaning and everyday essentials, all behind one clean face.",
    image: images.interiorShelving,
    completed: false,
  },
  {
    slug: "minimal-interior",
    title: "The Quiet Interior",
    category: "Interiors",
    label: "Warm minimal interior",
    description:
      "Natural textures, restrained joinery and soft light, brought together with a single material palette.",
    image: images.interiorWarm,
    completed: false,
  },
];
