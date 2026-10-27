export type Service = {
    slug: string;
    number: string;
    title: string;
    description: string;
    image: string;
    alt: string;
    details: string[];
  };
  
  export const services: Service[] = [
    {
      slug: "modular-kitchens",
      number: "01",
      title: "Modular Kitchens",
      description:
        "Thoughtfully planned kitchens where refined materials meet everyday functionality.",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
      alt: "Contemporary residential interior with warm natural finishes",
      details: [
        "Layouts planned around how you actually cook",
        "Durable materials and quality hardware",
        "Smart storage for every corner",
        "Clean installation with attention to detail",
      ],
    },
    {
      slug: "wardrobes",
      number: "02",
      title: "Wardrobes & Storage",
      description:
        "Purpose-built storage solutions designed around your space and lifestyle.",
      image:
        "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=85",
      alt: "Contemporary interior with coordinated furniture and finishes",
      details: [
        "Custom wardrobes sized to your room",
        "Internal organisers for clothes, shoes and accessories",
        "Sliding and hinged options",
        "Finishes matched to the rest of your interior",
      ],
    },
    {
      slug: "interior-upgrades",
      number: "03",
      title: "Interior Upgrades",
      description:
        "Considered improvements that bring a fresh perspective to existing spaces.",
      image:
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85",
      alt: "Modern interior featuring a warm, understated design",
      details: [
        "Refresh living rooms, bedrooms and workspaces",
        "Lighting, paneling and furniture upgrades",
        "Work done with minimal disruption",
        "Clear scope and budget before we begin",
      ],
    },
  ];