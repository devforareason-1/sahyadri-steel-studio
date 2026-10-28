import { Mail, Phone } from "lucide-react";
import { site, telLink, whatsappUrl } from "@/data/site";
import EnquiryForm from "./EnquiryForm";
import Folio from "./Folio";
import Reveal from "./Reveal";
import WhatsAppIcon from "./WhatsAppIcon";

const steps = [
  "You share a few details about your space.",
  "We call or message to understand what you need.",
  "We plan a consultation and prepare a clear quotation.",
];

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="section grain bg-travertine"
    >
      <div className="shell">
        <Reveal>
          <Folio number="11" label="Enquiries & quotations" aside="Shivamogga · Udupi" />
        </Reveal>
      </div>
      <div className="shell mt-14 grid gap-14 lg:mt-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <Reveal className="lg:sticky lg:top-[calc(var(--header-height)+40px)] lg:self-start">
          <div>
            <h2 id="contact-title" className="display h-lg">
              Let&rsquo;s design <em>your space.</em>
            </h2>
            <p className="lede mt-6 max-w-[420px]">
              Tell us a little about your project and we will get back to you
              to discuss the next steps. Prefer to chat? WhatsApp is often the
              quickest way to reach us.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
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

            <ol className="mt-14 border-t border-line-strong">
              {steps.map((s, i) => (
                <li
                  key={s}
                  className="flex gap-5 border-b border-line py-4 text-[15px] leading-6"
                >
                  <span className="numeral w-6 shrink-0 text-lg">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s}
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <EnquiryForm />
        </Reveal>
      </div>
    </section>
  );
}
