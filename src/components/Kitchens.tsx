import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { images } from "@/data/images";
import { services } from "@/data/services";
import Folio from "./Folio";
import Parallax from "./Parallax";
import Photo from "./Photo";
import Reveal from "./Reveal";

const kitchens = services[0];

export default function Kitchens() {
  return (
    <section
      id="kitchens"
      aria-labelledby="kitchens-title"
      className="pb-[clamp(80px,11vw,160px)]"
    >
      <div className="shell">
        <Reveal>
          <Folio number="02" label="The kitchen" aside="Modular · Island · Galley · L-shaped" />
        </Reveal>
      </div>

      {/* Spread: a large plate that bleeds off the left edge, text beside it. */}
      <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-0">
        <Reveal variant="media" className="lg:col-span-8">
          <div className="media relative aspect-[4/3] sm:aspect-[16/11]">
            <Parallax className="absolute inset-0" speed={0.06}>
              <Photo image={images.kitchenIsland} sizes="(max-width: 1024px) 100vw, 85vw" />
            </Parallax>
          </div>
        </Reveal>

        <div className="shell flex flex-col justify-end lg:col-span-4 lg:pl-14">
          <Reveal>
            <h2 id="kitchens-title" className="display h-xl">
              The kitchen, <em>edited.</em>
            </h2>
            <p className="mt-7 max-w-[400px] text-[15px] leading-7 text-muted">
              {kitchens.intro}
            </p>
            <ul className="mt-9 border-t border-line">
              {kitchens.considerations.slice(0, 3).map((c, i) => (
                <li
                  key={c.title}
                  className="flex items-baseline gap-4 border-b border-line py-3.5 text-[14px]"
                >
                  <span className="numeral text-base">{String(i + 1).padStart(2, "0")}</span>
                  {c.title}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-5">
              <a href="#contact" data-enquiry-project={kitchens.enquiry} className="btn btn-dark">
                Plan Your Kitchen
                <ArrowRight size={16} strokeWidth={1.6} />
              </a>
              <Link href={`/services/${kitchens.slug}`} className="link-line">
                The detail
                <ArrowUpRight size={15} strokeWidth={1.6} />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Second row: a quote, a detail overlapping the plate above, and a
          darker counterpoint. */}
      <div className="shell mt-16 grid grid-cols-2 gap-x-4 gap-y-12 lg:mt-0 lg:grid-cols-12 lg:gap-x-0">
        <Reveal className="col-span-2 lg:col-span-4 lg:col-start-1 lg:self-start lg:pr-12 lg:pt-16">
          <blockquote className="display text-[clamp(1.6rem,2.4vw,2.2rem)] leading-[1.15]">
            &ldquo;Measured in steps saved, and drawers that open{" "}
            <em className="text-champagne-ink">exactly where you need them.</em>&rdquo;
          </blockquote>
          <p className="caption mt-5 uppercase tracking-[0.2em]">Our approach to kitchens</p>
        </Reveal>

        <Reveal
          delay={100}
          className="group lg:relative lg:z-10 lg:col-span-3 lg:col-start-5 lg:-mt-48"
        >
          <div className="media media-zoom aspect-[3/4] lg:outline lg:outline-[12px] lg:outline-ivory">
            <Photo image={images.drawerDetail} sizes="(max-width: 1024px) 50vw, 24vw" />
          </div>
          <p className="caption mt-3">Fitted drawer organisation</p>
        </Reveal>

        <Reveal
          delay={200}
          className="group mt-16 lg:col-span-4 lg:col-start-9 lg:mt-28"
        >
          <div className="media media-zoom aspect-[3/4] lg:aspect-[4/5]">
            <Photo image={images.kitchenGraphite} sizes="(max-width: 1024px) 50vw, 32vw" />
          </div>
          <p className="caption mt-3">Matte graphite, handle-less</p>
        </Reveal>
      </div>
    </section>
  );
}
