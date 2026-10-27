import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import SectionLabel from "./SectionLabel";

export default function Services() {
  return (
    <section id="services" className="section-padding bg-surface">
      <div className="container-shell">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionLabel>What we do</SectionLabel>
            <h2 className="display-heading mt-5 max-w-[650px] text-4xl sm:text-5xl lg:text-6xl">
              Everyday spaces,
              <br />
              <span className="italic text-accent">thoughtfully made.</span>
            </h2>
          </div>

          <p className="max-w-[330px] text-sm leading-7 text-muted">
            Solutions shaped around your space, requirements, and personal
            preferences.
          </p>
        </div>

        <div className="mt-12 grid gap-7 md:grid-cols-3 md:gap-5 lg:mt-16">
          {services.map((service) => (
            <article key={service.slug} className="group">
              <Link
                href={`/services/${service.slug}`}
                aria-label={`Learn about ${service.title}`}
                className="image-hover relative block aspect-[4/4.6] bg-[#ddd7cb]"
              >
                <Image
                  src={service.image}
                  alt={service.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
                <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-background text-foreground transition-transform group-hover:rotate-45">
                  <ArrowUpRight size={17} />
                </span>
              </Link>

              <div className="pt-5">
                <p className="text-[11px] tracking-[0.15em] text-accent">
                  {service.number}
                </p>
                <h3 className="mt-2 font-serif text-2xl tracking-[-0.03em]">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {service.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}