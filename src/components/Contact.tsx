import { ArrowRight, ArrowUpRight, Mail, Phone } from "lucide-react";
import { site, whatsappUrl } from "@/data/site";
import SectionLabel from "./SectionLabel";

export default function Contact() {
  const telHref = site.phone ? `tel:${site.phone.replace(/[^\d+]/g, "")}` : null;

  return (
    <section id="contact" className="section-padding">
      <div className="container-shell">
        <div className="relative overflow-hidden bg-[#e9e4d9] px-7 py-14 sm:px-12 sm:py-16 lg:px-20 lg:py-20">
          <div className="relative z-10 max-w-[760px]">
            <SectionLabel>Let&rsquo;s begin</SectionLabel>

            <h2 className="display-heading mt-7 text-4xl sm:text-6xl lg:text-7xl">
              Your space.
              <br />
              Your vision.
              <br />
              <span className="italic text-accent">
                Let&rsquo;s bring it together.
              </span>
            </h2>

            <p className="mt-6 max-w-[450px] text-sm leading-7 text-muted">
              Tell us a little about your space and what you have in mind.
              We&rsquo;d love to explore the possibilities with you.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-4 bg-foreground px-5 py-3 text-xs font-medium text-white transition-colors hover:bg-accent"
              >
                Discuss on WhatsApp
                <ArrowUpRight size={15} />
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

              <a
                href="#services"
                className="inline-flex min-h-12 items-center gap-3 border border-border px-5 py-3 text-xs font-medium"
              >
                Explore Services
                <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}