import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { images } from "@/data/images";
import { services } from "@/data/services";
import { whatsappLink } from "@/data/site";
import Folio from "./Folio";
import Parallax from "./Parallax";
import Photo from "./Photo";
import Reveal from "./Reveal";
import WardrobePlanner from "./WardrobePlanner";
import WhatsAppIcon from "./WhatsAppIcon";

const wardrobes = services[1];

export default function WardrobeExperience() {
  return (
    <section id="wardrobes" aria-labelledby="wardrobes-title">
      {/* Opening spread on graphite */}
      <div className="on-dark grain bg-graphite text-ivory">
        <div className="grid lg:min-h-[min(100svh,1000px)] lg:grid-cols-12">
          <Reveal variant="media" className="relative lg:col-span-7">
            <div className="media relative aspect-[4/5] h-full bg-graphite-soft sm:aspect-[5/4] lg:aspect-auto">
              <Parallax className="absolute inset-0" speed={0.06}>
                <Photo
                  image={images.wardrobeSystem}
                  sizes="(max-width: 1024px) 100vw, 80vw"
                  className="object-[82%_50%]"
                />
              </Parallax>
            </div>
          </Reveal>

          <div className="shell flex flex-col py-16 sm:py-20 lg:col-span-5 lg:py-[clamp(80px,9vw,140px)] lg:pl-14">
            <Reveal>
              <Folio dark number="04" label="The wardrobe" />
              <h2 id="wardrobes-title" className="display h-xl mt-12 lg:mt-16">
                Order, <em className="text-champagne">quietly built in.</em>
              </h2>
              <p className="mt-7 max-w-[420px] text-base leading-7 text-ivory/70">
                A beautiful wardrobe is mostly invisible work: the right
                heights, the right depths, and a place for everything you own.
              </p>
            </Reveal>

            <Reveal
              delay={150}
              className="mt-14 grid grid-cols-[1fr_1.1fr] items-end gap-6 lg:mt-auto lg:pt-16"
            >
              <p className="text-[13px] leading-6 text-ivory/55">
                Sliding or hinged, built-in or walk-in. Interiors planned bay by
                bay, lit where it helps.
              </p>
              <figure className="group">
                <div className="media media-zoom aspect-[3/4] bg-graphite-soft">
                  <Photo image={images.bedroomCalm} sizes="(max-width: 1024px) 50vw, 20vw" className="object-bottom" />
                </div>
                <figcaption className="mt-3 text-[11px] tracking-[0.08em] text-ivory/50">
                  Bedroom · concept visual
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Planner on stone */}
      <div className="section-tight bg-ivory-deep">
        <div className="shell">
          <Reveal className="grid gap-8 pb-14 lg:grid-cols-12 lg:gap-0">
            <p className="display h-md max-w-[560px] lg:col-span-6">
              Designed from the inside out, around the way you{" "}
              <em>dress each morning.</em>
            </p>
            <div className="space-y-4 text-[15px] leading-7 text-muted lg:col-span-5 lg:col-start-8">
              <p>
                We start with what you own: how much hangs, how much folds, what
                needs a drawer. Then we plan each bay to match, using the full
                height of the wall so nothing ends up on a chair.
              </p>
              <p>
                Explore a sample layout below. Select a zone to see how it
                works.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <WardrobePlanner />
          </Reveal>

          <div className="mt-20 grid gap-10 lg:mt-28 lg:grid-cols-12 lg:items-end lg:gap-0">
            <Reveal variant="media" className="group lg:col-span-8">
              <div className="media media-zoom aspect-[4/3] sm:aspect-[16/10]">
                <Photo image={images.bedroomJoinery} sizes="(max-width: 1024px) 100vw, 66vw" />
              </div>
            </Reveal>

            <Reveal delay={150} className="lg:col-span-3 lg:col-start-10">
              <p className="caption uppercase tracking-[0.2em]">Bedroom joinery · concept visual</p>
              <p className="mt-5 text-[15px] leading-7 text-muted">
                Tell us about your room and we will plan a wardrobe around it,
                with fronts that sit quietly with the rest of the space.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col">
                <a
                  href="#contact"
                  data-enquiry-project="Wardrobe"
                  className="btn btn-dark"
                >
                  Design Your Wardrobe
                  <ArrowRight size={16} strokeWidth={1.6} />
                </a>
                <a
                  href={whatsappLink(
                    "Hello Sahyadri Steel Studio, I would like to design a wardrobe."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  <WhatsAppIcon size={16} />
                  Ask on WhatsApp
                </a>
              </div>
              <Link href={`/services/${wardrobes.slug}`} className="link-line mt-8">
                The detail
                <ArrowUpRight size={15} strokeWidth={1.6} />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
