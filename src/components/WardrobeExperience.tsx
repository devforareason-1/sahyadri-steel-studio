import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { images } from "@/data/images";
import { services } from "@/data/services";
import { whatsappLink } from "@/data/site";
import Folio from "./Folio";
import Parallax from "./Parallax";
import Photo from "./Photo";
import Reveal from "./Reveal";
import WhatsAppIcon from "./WhatsAppIcon";

const wardrobes = services[1];

export default function WardrobeExperience() {
  return (
    <section
      id="wardrobes"
      data-tone="dark"
      aria-labelledby="wardrobes-title"
      className="on-dark bg-graphite text-ivory"
    >
      <div className="grid lg:min-h-[min(100svh,980px)] lg:grid-cols-12">
        <div className="media relative aspect-[4/5] bg-graphite-soft sm:aspect-[5/4] lg:col-span-7 lg:aspect-auto">
          <Parallax className="absolute inset-0" speed={0.07}>
            <Photo
              image={images.wardrobeGlass}
              sizes="(max-width: 1024px) 100vw, 75vw"
              className="object-[82%_50%]"
            />
          </Parallax>
        </div>

        <div className="shell flex flex-col py-16 sm:py-20 lg:col-span-5 lg:py-[clamp(80px,9vw,140px)] lg:pl-14">
          <Reveal>
            <Folio dark number="03" label="The wardrobe" />
            <h2 id="wardrobes-title" className="display h-xl mt-12 lg:mt-16">
              Order, <em className="text-champagne">behind glass.</em>
            </h2>
            <p className="mt-7 max-w-[420px] text-base leading-7 text-ivory/70">
              Glass shutters in slim steel profiles, lit from within, so you
              see what you own and nothing swells through the monsoon. Sliding
              or hinged, built-in or walk-in, planned bay by bay.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#contact" data-enquiry-project={wardrobes.enquiry} className="btn btn-light">
                Design Your Wardrobe
                <ArrowRight size={16} strokeWidth={1.6} />
              </a>
              <a
                href={whatsappLink(wardrobes.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-light"
              >
                <WhatsAppIcon size={16} />
                WhatsApp
              </a>
            </div>
          </Reveal>

          <Reveal
            delay={150}
            className="mt-14 grid grid-cols-[1fr_1.1fr] items-end gap-6 lg:mt-auto lg:pt-16"
          >
            <Link
              href={`/services/${wardrobes.slug}`}
              className="link-line self-end justify-self-start text-ivory/80"
            >
              Plan the interior
              <ArrowUpRight size={15} strokeWidth={1.6} />
            </Link>
            <figure className="group">
              <div className="media media-zoom aspect-[3/4] bg-graphite-soft">
                <Photo image={images.mirrorWardrobe} sizes="(max-width: 1024px) 50vw, 20vw" />
              </div>
              <figcaption className="mt-3 text-[11px] tracking-[0.08em] text-ivory/50">
                Mirror glass, black steel profile
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
