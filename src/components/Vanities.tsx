import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { images } from "@/data/images";
import { services } from "@/data/services";
import Folio from "./Folio";
import Photo from "./Photo";
import Reveal from "./Reveal";

const vanities = services[2];

export default function Vanities() {
  return (
    <section
      id="vanities"
      data-tone="stone"
      aria-labelledby="vanities-title"
      className="section bg-ivory-deep"
    >
      <div className="shell">
        <Reveal>
          <Folio number="04" label="The vanity" aside="Wall-hung · Floor-standing · Mirror cabinets" />
        </Reveal>

        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-0">
          <Reveal variant="media" className="group lg:col-span-6">
            <div className="media media-zoom aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]">
              <Photo image={vanities.image} sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
          </Reveal>

          <Reveal delay={120} className="flex flex-col lg:col-span-5 lg:col-start-8">
            <h2 id="vanities-title" className="display h-xl">
              Made for <em>wet rooms.</em>
            </h2>
            <p className="lede mt-7 max-w-[420px]">{vanities.intro}</p>

            <ul className="mt-10 border-t border-line">
              {vanities.considerations.slice(0, 3).map((c, i) => (
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
              <a href="#contact" data-enquiry-project={vanities.enquiry} className="btn btn-dark">
                Plan Your Vanity
                <ArrowRight size={16} strokeWidth={1.6} />
              </a>
              <Link href={`/services/${vanities.slug}`} className="link-line">
                Sizes &amp; options
                <ArrowUpRight size={15} strokeWidth={1.6} />
              </Link>
            </div>

            <figure className="group mt-14 w-1/2 self-end lg:mt-auto lg:pt-14">
              <div className="media media-zoom aspect-[3/4]">
                <Photo image={images.vanityGloss} sizes="(max-width: 1024px) 50vw, 20vw" className="object-[92%_85%]" />
              </div>
              <figcaption className="caption mt-3">Wall-hung, glossy fronts</figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
