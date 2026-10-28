import { ArrowRight } from "lucide-react";
import { locations, telLink, whatsappLink } from "@/data/site";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import WhatsAppIcon from "./WhatsAppIcon";

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[96px_1fr] gap-4 border-b border-line py-3.5 text-sm">
      <dt className="text-[11px] uppercase tracking-[0.18em] text-muted">{label}</dt>
      <dd className={value ? "" : "italic text-graphite/40"}>
        {value || "To be announced"}
      </dd>
    </div>
  );
}

export default function Studios() {
  return (
    <section
      id="studios"
      aria-labelledby="studios-title"
      className="section bg-ivory-deep"
    >
      <div className="shell">
        <SectionHeading
          id="studios-title"
          eyebrow="Our studios"
          title={
            <>
              Two studios, <em>one way of working.</em>
            </>
          }
          intro="Visit us in Shivamogga or Udupi to talk through your plans, or message us and we will arrange a time that suits you."
        />

        <div className="mt-16 grid gap-px bg-line md:grid-cols-2 lg:mt-20">
          {locations.map((loc, i) => (
            <Reveal key={loc.slug} delay={i * 120} as="article" className="bg-ivory-deep">
              <div
                className={`flex h-full flex-col py-10 ${
                  i === 0 ? "md:pr-10 lg:pr-14" : "md:pl-10 lg:pl-14"
                }`}
              >
                <p className="caption uppercase tracking-[0.2em]">
                  Studio {String(i + 1).padStart(2, "0")} · {loc.coordinates}
                </p>
                <h3 className="display mt-5 text-[clamp(3rem,6vw,5.2rem)]">
                  {loc.city}
                </h3>
                <p className="mt-2 text-[12px] uppercase tracking-[0.2em] text-champagne-ink">
                  {loc.region}
                </p>
                <div className="steel-rule mt-8" aria-hidden="true" />
                <p className="mt-8 max-w-[440px] text-[15px] leading-7 text-muted">
                  {loc.welcome}
                </p>

                <dl className="mt-8 border-t border-line">
                  <Detail label="Address" value={loc.address} />
                  <Detail label="Hours" value={loc.hours} />
                  <Detail label="Phone" value={loc.phone} />
                </dl>

                <div className="mt-auto flex flex-wrap gap-3 pt-10">
                  <a
                    href={whatsappLink(
                      `Hello Sahyadri Steel Studio, I would like to enquire about a project with your ${loc.city} studio.`,
                      loc.whatsapp || undefined
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-dark btn-sm"
                  >
                    <WhatsAppIcon size={15} />
                    WhatsApp {loc.city}
                  </a>
                  <a
                    href="#contact"
                    data-enquiry-studio={loc.city}
                    className="btn btn-outline btn-sm"
                  >
                    Enquire
                    <ArrowRight size={14} strokeWidth={1.6} />
                  </a>
                  {loc.phone && (
                    <a href={telLink(loc.phone)} className="btn btn-outline btn-sm">
                      Call
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
