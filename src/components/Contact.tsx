import { Mail, Phone } from "lucide-react";
import { site, whatsappUrl } from "@/data/site";
import ContactForm from "./ContactForm";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import WhatsAppIcon from "./WhatsAppIcon";

export default function Contact() {
  const telHref = site.phone
    ? `tel:${site.phone.replace(/[^\d+]/g, "")}`
    : null;
  const hasForm = Boolean(site.formEndpoint);

  return (
    <section id="contact" className="section-padding">
      <div className="container-shell">
        <Reveal>
          <div className="overflow-hidden bg-[#e9e4d9] px-4 py-10 sm:px-12 sm:py-16 lg:px-20 lg:py-20">
            <div
              className={
                hasForm ? "grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16" : ""
              }
            >
              <div className="max-w-[640px]">
                <SectionLabel>Say hello</SectionLabel>

                <h2 className="display-heading mt-7 text-4xl sm:text-5xl lg:text-6xl">
                  Planning a new
                  <br />
                  kitchen or home?
                  <br />
                  <span className="italic text-accent">Let&rsquo;s talk.</span>
                </h2>

                <p className="mt-6 max-w-[470px] text-sm leading-7 text-muted">
                  Share a few details and we will get back to you. No pressure,
                  just a friendly chat about what is possible.
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
                {hasForm && (
                  <ol className="mt-12 space-y-4 border-t border-foreground/15 pt-8 text-sm leading-6 text-muted">
                    <li>
                      <span className="mr-3 text-accent">01</span>You send us a
                      few details.
                    </li>
                    <li>
                      <span className="mr-3 text-accent">02</span>We call or
                      message you to understand your space.
                    </li>
                    <li>
                      <span className="mr-3 text-accent">03</span>We plan a
                      visit and share a clear scope and budget.
                    </li>
                  </ol>
                )}
              </div>

              {hasForm && <ContactForm />}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
