export type Project = {
  title: string;
  category: string;
  location: string; // leave "" for sample images
  image: string;
  alt: string;
};

// Set to false once these are replaced with the studio's own project photos.
export const usingSamplePhotos = true;

export const projects: Project[] = [
  {
    title: "The Quiet Residence",
    category: "Residential Interiors",
    location: "",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
    alt: "Contemporary home interior with warm natural finishes",
  },
  {
    title: "Natural Living",
    category: "Living Room",
    location: "",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=85",
    alt: "Warm, light-filled living room",
  },
  {
    title: "Everyday Elegance",
    category: "Kitchen & Dining",
    location: "",
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1000&q=85",
    alt: "Minimal contemporary kitchen",
  },
];
