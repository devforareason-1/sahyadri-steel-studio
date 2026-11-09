import { Mail, Phone } from "lucide-react";
import { locations, site, telLink, whatsappLink, whatsappUrl } from "@/data/site";
import EnquiryForm from "./EnquiryForm";
import Reveal from "./Reveal";
import WhatsAppIcon from "./WhatsAppIcon";

const steps = [
  "You share a few details about your space.",
  "We call or message to understand what you need.",
  "We plan a consultation and prepare a clear quotation.",
];

// Where the whole page has been heading: the largest line after the film, and
// the form straight under it, with the other ways in beside it.
export default function Contact() {
  return (
    <section
      id="contact"
      data-tone="sand"
      aria-labelledby="contact-title"
      className="section bg-travertine"
    >
      <div className="shell">
        <Reveal>
          <h2 id="contact-title" className="display h-peak">
            Let&rsquo;s design <em>your space.</em>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-14 lg:mt-20 lg:grid-cols-12 lg:gap-0">
          <Reveal className="lg:col-span-7">
            <EnquiryForm />
          </Reveal>

          <Reveal delay={120} className="lg:col-span-4 lg:col-start-9">
            <p className="lede">
              Tell us a little about your project and we will get back to you to
              discuss the next steps. Prefer to chat? WhatsApp is often the
              quickest way to reach us.
            </p>
            {site.replyPromise && (
              <p className="note mt-3 font-medium text-graphite">{site.replyPromise}</p>
            )}

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                <WhatsAppIcon size={17} />
                {site.whatsappDisplay}
              </a>
              {site.phone && (
                <a href={telLink(site.phone)} className="btn btn-outline">
                  <Phone size={15} />
                  Call
                </a>
              )}
              {site.email && (
                <a href={`mailto:${site.email}`} className="btn btn-outline">
                  <Mail size={15} />
                  Email
                </a>
              )}
            </div>

            <ol className="mt-12 space-y-3">
              {steps.map((s, i) => (
                <li key={s} className="grid grid-cols-[2.5rem_1fr] text-[15px] leading-6">
                  <span className="numeral pt-px">{String(i + 1).padStart(2, "0")}</span>
                  {s}
                </li>
              ))}
            </ol>

            {/* The two studios, in brief. */}
            <div id="studios" className="mt-12 grid grid-cols-2 gap-6">
              {locations.map((loc) => (
                <div key={loc.slug}>
                  <h3 className="display h-md">{loc.city}</h3>
                  {(loc.address || loc.hours) && (
                    <p className="note mt-2">
                      {loc.address}
                      {loc.address && loc.hours && <br />}
                      {loc.hours}
                    </p>
                  )}
                  <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
                    <a
                      href={whatsappLink(
                        `Hello Sahyadri Steel Studio, I would like to enquire about a project with your ${loc.city} studio.`,
                        loc.whatsapp || undefined
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-line"
                    >
                      <WhatsAppIcon size={14} />
                      {loc.whatsapp ? "WhatsApp" : "WhatsApp · main line"}
                    </a>
                    {loc.phone && (
                      <a href={telLink(loc.phone)} className="link-line">
                        <Phone size={14} />
                        Call
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
