export type Service = {
  slug: string;
  number: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  details: string[];
};

// Stock photos from Unsplash. Swap the IDs, or switch to real photos later.
export const services: Service[] = [
  {
    slug: "modular-kitchens",
    number: "01",
    title: "Modular Kitchens",
    description:
      "Kitchens planned around how you cook, with smart storage and finishes that last.",
    image:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1400&q=85",
    alt: "Modern kitchen with wooden cabinets and warm lighting",
    details: [
      "Layouts planned around your cooking habits",
      "Durable materials and quality hardware",
      "Smart storage for every corner",
      "Neat, careful installation",
    ],
  },
  {
    slug: "wardrobes",
    number: "02",
    title: "Wardrobes & Storage",
    description:
      "Custom storage that fits your room and keeps everyday life organised.",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=85",
    alt: "Calm bedroom with built-in storage",
    details: [
      "Wardrobes sized to your room",
      "Internal organisers for clothes, shoes and accessories",
      "Sliding and hinged options",
      "Finishes that match the rest of your home",
    ],
  },
  {
    slug: "interior-upgrades",
    number: "03",
    title: "Interior Upgrades",
    description:
      "Fresh ideas for rooms you already have, from living areas to bedrooms.",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1400&q=85",
    alt: "Bright living room with natural light and soft furnishings",
    details: [
      "Refresh living rooms, bedrooms and workspaces",
      "Lighting, paneling and furniture upgrades",
      "Work planned to keep disruption low",
      "Scope and budget agreed before we begin",
    ],
  },
];
