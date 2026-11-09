export const site = {
  name: "Sahyadri Steel Studio",
  // No trailing slash. Set NEXT_PUBLIC_SITE_URL in Vercel once the studio's
  // own domain is connected; until then Vercel's production address is used.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  whatsapp: "916362689220", // main number, used where no studio-specific one is set
  whatsappDisplay: "+91 63626 89220",
  phone: "", // e.g. "+91 63626 89220". Leave "" to hide the call button.
  email: "", // leave "" until confirmed
  instagram: "https://www.instagram.com/sahyadristeelstudio/",
  instagramHandle: "@sahyadristeelstudio",
  // How quickly the studio replies, shown beside the enquiry form, e.g.
  // "We reply within one working day." Leave "" until you can keep the promise.
  replyPromise: "",
  // Google Apps Script web app that receives the enquiry form.
  // Leave "" and the form will hand the enquiry over to WhatsApp instead.
  formEndpoint:
    "https://script.google.com/macros/s/AKfycbwICyZcW_1KM8eMQ0oS_SZ2c1VsYBxZPXVId6-vXBFKa2A-p5nb90Z_Pl2MEy5fU3Wz/exec",
  // Set to true only if formEndpoint accepts multipart file uploads.
  // The current Apps Script endpoint does not, so reference images go via WhatsApp.
  formAcceptsFiles: false,
};

// Footer Google Map. Set to true to show it again.
export const showFooterMap = false;

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
  mapUrl: string; // Google Maps share link, "" until confirmed
  // Optional: the src from Google Maps > Share > Embed a map. When empty, the
  // footer map falls back to a search for the studio in this city.
  mapEmbed: string;
};

export const locations: StudioLocation[] = [
  {
    slug: "shivamogga",
    city: "Shivamogga",
    region: "Karnataka",
    welcome:
      "Near the foothills of the Western Ghats, our Shivamogga studio is a place to talk through your plans, compare finishes and begin shaping a space around the way you live.",
    coordinates: "13.93° N, 75.57° E",
    address: "Karnataka Sangha Building, 1st floor, Bengaluru - Honnavar Rd, opp. South Indian Bank, Shivamogga, Karnataka 577201",
    hours: "",
    phone: "",
    whatsapp: "",
    mapUrl: "https://maps.app.goo.gl/qexgbgha7eREauMz5",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27920.264006335226!2d75.54962129661253!3d13.93274906775844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbba9dbee4e1061%3A0x819c7b1817204c1f!2sCromatica%20Stainless%20Steel%20Kitchens%20and%20Interiors!5e0!3m2!1sen!2sin!4v1794192829235!5m2!1sen!2sin",
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
    mapUrl: "",
    mapEmbed: "",
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
