export type Project = {
    title: string;
    category: string;
    location: string;
    image: string;
    alt: string;
  };
  
  // Placeholder stock photos. Replace with real project photos when the client sends them.
  export const projects: Project[] = [
    {
      title: "The Quiet Residence",
      category: "Residential Interiors",
      location: "Shimoga",
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
      alt: "Contemporary residential architecture",
    },
    {
      title: "Natural Living",
      category: "Living Room",
      location: "Shimoga",
      image:
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85",
      alt: "Warm contemporary living room",
    },
    {
      title: "Everyday Elegance",
      category: "Interior Design",
      location: "Shimoga",
      image:
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=85",
      alt: "Minimal contemporary interior",
    },
  ];