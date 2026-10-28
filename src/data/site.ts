export const site = {
  name: "Sahyadri Steel Studio",
  // No trailing slash. Includes the GitHub Pages base path.
  url: "https://YOUR-USERNAME.github.io/sahyadri-steel-studio",
  whatsapp: "916362689220", // main number, used where no studio-specific one is set
  whatsappDisplay: "+91 63626 89220",
  phone: "", // e.g. "+91 63626 89220". Leave "" to hide the call button.
  email: "", // leave "" until confirmed
  instagram: "https://www.instagram.com/sahyadristeelstudio/",
  instagramHandle: "@sahyadristeelstudio",
  // Google Apps Script web app that receives the enquiry form.
  // Leave "" and the form will hand the enquiry over to WhatsApp instead.
  formEndpoint:
    "https://script.google.com/macros/s/AKfycbwICyZcW_1KM8eMQ0oS_SZ2c1VsYBxZPXVId6-vXBFKa2A-p5nb90Z_Pl2MEy5fU3Wz/exec",
  // Set to true only if formEndpoint accepts multipart file uploads.
  // The current Apps Script endpoint does not, so reference images go via WhatsApp.
  formAcceptsFiles: false,
};

export type StudioLocation = {
  slug: string;
  city: string;
  region: string;
  welcome: string;
  coordinates: string; // city coordinates, for the editorial caption only
  address: string; // leave "" until confirmed
  hours: string; // leave "" until confirmed
  phone: string; // leave "" until confirmed
  whatsapp: string; // leave "" to use the main number
};

export const locations: StudioLocation[] = [
  {
    slug: "shivamogga",
    city: "Shivamogga",
    region: "Karnataka",
    welcome:
      "Near the foothills of the Western Ghats, our Shivamogga studio is a place to talk through your plans, compare finishes and begin shaping a space around the way you live.",
    coordinates: "13.93° N, 75.57° E",
    address: "",
    hours: "",
    phone: "",
    whatsapp: "",
  },
  {
    slug: "udupi",
    city: "Udupi",
    region: "Karnataka",
    welcome:
      "On the coast, our Udupi studio brings the same considered approach to homes that live with sea air, monsoon seasons and busy family kitchens.",
    coordinates: "13.34° N, 74.75° E",
    address: "",
    hours: "",
    phone: "",
    whatsapp: "",
  },
];

export const defaultWhatsappMessage =
  "Hello Sahyadri Steel Studio, I would like to enquire about a customised interior project.";

export function whatsappLink(
  message: string = defaultWhatsappMessage,
  number: string = site.whatsapp
) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export const whatsappUrl = whatsappLink();

export function telLink(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}
