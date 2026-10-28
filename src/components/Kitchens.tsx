import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { images } from "@/data/images";
import { services } from "@/data/services";
import Folio from "./Folio";
import Photo from "./Photo";
import Reveal from "./Reveal";
import { FrameOpen } from "./ScrollMotion";

const kitchens = services[0];

export default function Kitchens() {
  return (
    <section
      id="kitchens"
      data-tone="light"
      aria-labelledby="kitchens-title"
      className="section"
    >
      <div className="shell">
        <Reveal>
          <Folio number="02" label="The kitchen" aside="Baskets · Pull-outs · Tall units · Corners" />
        </Reveal>
        <Reveal className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-12 lg:items-end lg:gap-0">
          <h2 id="kitchens-title" className="display h-xl lg:col-span-7">
            The kitchen, <em>in steel.</em>
          </h2>
          <p className="lede max-w-[420px] lg:col-span-4 lg:col-start-9 lg:pb-2">
            {kitchens.intro}
          </p>
        </Reveal>
      </div>

      {/* The plate opens from the page margins to the full width of the
          screen as it scrolls into view. */}
      <FrameOpen className="mt-14 aspect-[4/5] bg-travertine sm:aspect-auto sm:h-[min(56vw,88svh)] lg:mt-20">
        <Photo image={images.kitchenGraphite} sizes="100vw" />
      </FrameOpen>
      <p className="shell caption mt-3 text-right">
        Matte graphite &amp; steel · concept visual
      </p>

      <div className="shell mt-14 grid grid-cols-2 gap-x-4 gap-y-12 lg:mt-20 lg:grid-cols-12 lg:gap-x-0">
        <Reveal className="group lg:col-span-3">
          <div className="media media-zoom aspect-[3/4]">
            <Photo image={images.plateBasket} sizes="(max-width: 1024px) 50vw, 24vw" />
          </div>
          <p className="caption mt-3">Plate &amp; cup organiser</p>
        </Reveal>

        <Reveal delay={120} className="group mt-12 lg:col-span-3 lg:col-start-5 lg:mt-24">
          <div className="media media-zoom aspect-[3/4]">
            <Photo image={images.steelVessels} sizes="(max-width: 1024px) 50vw, 24vw" />
          </div>
          <p className="caption mt-3">Built for heavy steel vessels</p>
        </Reveal>

        <Reveal
          delay={200}
          className="col-span-2 lg:col-span-4 lg:col-start-9 lg:self-end"
        >
          <ul className="border-t border-line">
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
              Finishes &amp; detail
              <ArrowUpRight size={15} strokeWidth={1.6} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
