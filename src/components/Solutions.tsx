import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services, type Service } from "@/data/services";
import Photo from "./Photo";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

function SolutionText({ service }: { service: Service }) {
  return (
    <div>
      <p className="flex items-baseline gap-4">
        <span className="numeral text-3xl">{service.number}</span>
        <span className="caption uppercase tracking-[0.22em]">{service.kicker}</span>
      </p>
      <h3 className="display h-md mt-5">
        <Link
          href={`/services/${service.slug}`}
          className="transition-colors hover:text-walnut"
        >
          {service.title}
        </Link>
      </h3>
      <p className="mt-4 max-w-[380px] text-[15px] leading-7 text-muted">
        {service.summary}
      </p>
      <Link
        href={`/services/${service.slug}`}
        className="link-line mt-7"
        aria-label={`Explore ${service.title}`}
      >
        Explore
        <ArrowUpRight size={15} strokeWidth={1.6} />
      </Link>
    </div>
  );
}

function SolutionImage({
  service,
  aspect,
  sizes,
}: {
  service: Service;
  aspect: string;
  sizes: string;
}) {
  return (
    <Link
      href={`/services/${service.slug}`}
      tabIndex={-1}
      aria-hidden="true"
      className={`media media-zoom block ${aspect}`}
    >
      <Photo image={service.image} sizes={sizes} />
    </Link>
  );
}

export default function Solutions() {
  const [kitchens, wardrobes, steel, details] = services;

  return (
    <section
      id="solutions"
      aria-labelledby="solutions-title"
      className="section"
    >
      <div className="shell">
        <SectionHeading
          id="solutions-title"
          eyebrow="Signature solutions"
          title={
            <>
              Four ways to shape <em>a better home.</em>
            </>
          }
          intro="From the kitchen to the wardrobe to the details in between, each piece is designed for the room it lives in and the people who use it."
        />

        <div className="mt-20 space-y-24 lg:mt-28 lg:space-y-36">
          {/* 01: wide image, text alongside */}
          <article className="group grid items-center gap-10 lg:grid-cols-12 lg:gap-0">
            <Reveal className="lg:col-span-7">
              <SolutionImage
                service={kitchens}
                aspect="aspect-[4/3]"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
            </Reveal>
            <Reveal delay={150} className="lg:col-span-4 lg:col-start-9">
              <SolutionText service={kitchens} />
            </Reveal>
          </article>

          {/* 02: text first, tall image offset to the right */}
          <article className="group grid items-end gap-10 lg:grid-cols-12 lg:gap-0">
            <Reveal className="order-2 lg:order-1 lg:col-span-4 lg:col-start-2 lg:pb-16">
              <SolutionText service={wardrobes} />
            </Reveal>
            <Reveal delay={150} className="order-1 lg:order-2 lg:col-span-5 lg:col-start-7">
              <SolutionImage
                service={wardrobes}
                aspect="aspect-[4/5]"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
            </Reveal>
          </article>

          {/* 03 + 04: a staggered pair */}
          <div className="grid gap-24 md:grid-cols-12 md:gap-0">
            <article className="group md:col-span-6">
              <Reveal>
                <div className="relative">
                  <SolutionImage
                    service={steel}
                    aspect="aspect-[5/4]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <span
                    aria-hidden="true"
                    className="brushed-steel absolute -bottom-3 left-6 right-6 h-[3px]"
                  />
                </div>
              </Reveal>
              <Reveal delay={120} className="mt-10 md:pr-10">
                <SolutionText service={steel} />
              </Reveal>
            </article>

            <article className="group md:col-span-5 md:col-start-8 md:mt-40">
              <Reveal>
                <SolutionImage
                  service={details}
                  aspect="aspect-[4/5]"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </Reveal>
              <Reveal delay={120} className="mt-10">
                <SolutionText service={details} />
              </Reveal>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
