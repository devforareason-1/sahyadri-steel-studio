import { locations, site } from "@/data/site";

// schema.org description of the studio for search engines: the business,
// with each studio as a department. Address lines, phone numbers and hours
// are included only once they are filled in data/site.ts.
export function businessJsonLd(description: string) {
  const url = `${site.url}/`;
  const optional = (key: string, value: string) => (value ? { [key]: value } : {});

  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${url}#business`,
    name: site.name,
    url,
    description,
    ...optional("telephone", site.phone),
    ...optional("email", site.email),
    sameAs: [site.instagram],
    areaServed: locations.map((loc) => loc.city),
    department: locations.map((loc) => ({
      "@type": "HomeAndConstructionBusiness",
      "@id": `${url}#studio-${loc.slug}`,
      name: `${site.name}, ${loc.city}`,
      url: `${url}#contact`,
      address: {
        "@type": "PostalAddress",
        ...optional("streetAddress", loc.address),
        addressLocality: loc.city,
        addressRegion: loc.region,
        addressCountry: "IN",
      },
      ...optional("telephone", loc.phone || site.phone),
      ...optional("openingHours", loc.hours),
    })),
  };
}

// Serialised for a <script type="application/ld+json">, with "<" escaped so
// no value can close the script tag early.
export function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
