import { Mail, Phone } from "lucide-react";
import { site, whatsappUrl } from "@/data/site";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import WhatsAppIcon from "./WhatsAppIcon";

export default function Contact() {
  const telHref = site.phone
    ? `tel:${site.phone.replace(/[^\d+]/g, "")}`
    : null;

  return (
    <section id="contact" className="section-padding">
      <div className="container-shell">
        <Reveal>
          <div className="overflow-hidden bg-[#e9e4d9] px-7 py-14 sm:px-12 sm:py-16 lg:px-20 lg:py-20">
            <div className="max-w-[760px]">
              <SectionLabel>Say hello</SectionLabel>

              <h2 className="display-heading mt-7 text-4xl sm:text-6xl lg:text-7xl">
                Planning a new
                <br />
                kitchen or home?
                <br />
                <span className="italic text-accent">Let&rsquo;s talk.</span>
              </h2>

              <p className="mt-6 max-w-[470px] text-sm leading-7 text-muted">
                Tell us about your space and what you have in mind. There is no
                pressure, just a friendly chat about what is possible.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center gap-3 bg-[#1fa855] px-6 py-3 text-xs font-medium text-white transition-opacity hover:opacity-90"
                >
                  <WhatsAppIcon size={18} />
                  Chat on WhatsApp
                </a>

                {telHref && (
                  <a
                    href={telHref}
                    className="inline-flex min-h-12 items-center gap-3 border border-foreground px-5 py-3 text-xs font-medium"
                  >
                    <Phone size={15} />
                    Call us
                  </a>
                )}

                {site.email && (
                  <a
                    href={`mailto:${site.email}`}
                    className="inline-flex min-h-12 items-center gap-3 border border-foreground px-5 py-3 text-xs font-medium"
                  >
                    <Mail size={15} />
                    Email
                  </a>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
