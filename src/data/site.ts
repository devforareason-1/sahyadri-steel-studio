export const site = {
  name: "Sahyadri Steel Studio",
  // No trailing slash. Includes the GitHub Pages base path.
  url: "https://YOUR-USERNAME.github.io/sahyadri-steel-studio",
  whatsapp: "916362689220", // main number, used where no studio-specific one is set
  phone: "", // e.g. "+91 63626 89220"
  email: "",
  instagram: "", // e.g. "https://instagram.com/yourhandle"
  formEndpoint: "https://script.google.com/macros/s/AKfycbwICyZcW_1KM8eMQ0oS_SZ2c1VsYBxZPXVId6-vXBFKa2A-p5nb90Z_Pl2MEy5fU3Wz/exec",
};

export type StudioLocation = {
  slug: string;
  city: string;
  address: string; // leave "" until confirmed
  phone: string; // leave "" until confirmed
  whatsapp: string; // leave "" to use the main number
};

export const locations: StudioLocation[] = [
  { slug: "shimoga", city: "Shimoga", address: "", phone: "", whatsapp: "" },
  { slug: "udupi", city: "Udupi", address: "", phone: "", whatsapp: "" },
];

export function whatsappLink(message: string, number: string = site.whatsapp) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export const whatsappUrl = whatsappLink(
  "Hello Sahyadri Steel Studio, I would like to discuss an interior design project."
);

export function mapUrl(loc: StudioLocation) {
  const query = loc.address || `${loc.city}, Karnataka`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    query
  )}`;
}
