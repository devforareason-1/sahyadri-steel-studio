import { MapPin, Phone } from "lucide-react";
import { locations, mapUrl, whatsappLink } from "@/data/site";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import WhatsAppIcon from "./WhatsAppIcon";

export default function Studios() {
  return (
    <section id="studios" className="section-padding bg-surface">
      <div className="container-shell">
        <Reveal className="max-w-[640px]">
          <SectionLabel>Our studios</SectionLabel>
          <h2 className="display-heading mt-5 text-4xl sm:text-5xl lg:text-6xl">
            Two cities,
            <br />
            <span className="italic text-accent">one team.</span>
          </h2>
          <p className="mt-6 text-sm leading-7 text-muted">
            Visit us in Shimoga or Udupi, or message us and we will come to you.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {locations.map((loc, i) => {
            const tel = loc.phone
              ? `tel:${loc.phone.replace(/[^\d+]/g, "")}`
              : null;
            const message = `Hello Sahyadri Steel Studio, I would like to discuss an interior design project in ${loc.city}.`;

            return (
              <Reveal key={loc.slug} delay={i * 120}>
                <article className="border border-border bg-background p-8 sm:p-10">
                  <p className="text-[11px] tracking-[0.15em] text-accent">
                    STUDIO
                  </p>
                  <h3 className="mt-2 font-serif text-4xl tracking-[-0.03em]">
                    {loc.city}
                  </h3>

                  <p className="mt-5 flex items-start gap-3 text-sm leading-7 text-muted">
                    <MapPin size={16} className="mt-1.5 shrink-0 text-accent" />
                    {loc.address ||
                      `Message us for the studio address and directions in ${loc.city}.`}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <a
                      href={whatsappLink(message, loc.whatsapp || undefined)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-12 items-center gap-3 bg-[#1fa855] px-5 py-3 text-xs font-medium text-white transition-opacity hover:opacity-90"
                    >
                      <WhatsAppIcon size={17} />
                      WhatsApp {loc.city}
                    </a>

                    {tel && (
                      <a
                        href={tel}
                        className="inline-flex min-h-12 items-center gap-3 border border-foreground px-5 py-3 text-xs font-medium"
                      >
                        <Phone size={15} />
                        Call
                      </a>
                    )}

                    <a
                      href={mapUrl(loc)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-12 items-center gap-3 border border-border px-5 py-3 text-xs font-medium"
                    >
                      <MapPin size={15} />
                      Directions
                    </a>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
