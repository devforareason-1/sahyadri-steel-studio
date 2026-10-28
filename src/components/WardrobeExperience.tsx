import { ArrowRight } from "lucide-react";
import { images } from "@/data/images";
import { whatsappLink } from "@/data/site";
import Parallax from "./Parallax";
import Photo from "./Photo";
import Reveal from "./Reveal";
import WardrobePlanner from "./WardrobePlanner";
import WhatsAppIcon from "./WhatsAppIcon";

export default function WardrobeExperience() {
  return (
    <section id="wardrobes" aria-labelledby="wardrobes-title">
      <div className="on-dark relative flex min-h-[max(480px,70svh)] items-end overflow-hidden bg-graphite text-ivory">
        <Parallax className="absolute inset-0" speed={0.08}>
          <Photo image={images.bedroomCalm} sizes="100vw" />
        </Parallax>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,20,18,.1)_30%,rgba(20,20,18,.78))]" />

        <div className="shell relative pb-14 sm:pb-20">
          <Reveal className="grid items-end gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="eyebrow text-champagne">The wardrobe experience</p>
              <h2 id="wardrobes-title" className="display h-xl mt-6">
                Order, <em>quietly built in.</em>
              </h2>
            </div>
            <p className="max-w-[420px] text-base leading-7 text-ivory/80 lg:justify-self-end">
              A beautiful wardrobe is mostly invisible work: the right heights,
              the right depths, and a place for everything you own.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="section-tight bg-ivory-deep">
        <div className="shell">
          <Reveal className="grid gap-8 pb-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <p className="display h-md max-w-[560px]">
              Designed from the inside out, around the way you dress each
              morning.
            </p>
            <div className="space-y-4 text-[15px] leading-7 text-muted">
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

          <div className="mt-16 grid gap-6 md:grid-cols-[1fr_1fr_0.9fr] md:items-end">
            <Reveal className="group">
              <div className="media media-zoom aspect-[4/5]">
                <Photo image={images.wardrobeInterior} sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <p className="caption mt-3">Interior storage · concept visual</p>
            </Reveal>
            <Reveal delay={120} className="group md:mb-16">
              <div className="media media-zoom aspect-[4/5]">
                <Photo image={images.walkIn} sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <p className="caption mt-3">Walk-in wardrobe · concept visual</p>
            </Reveal>
            <Reveal delay={240} className="md:pb-2 md:pl-6">
              <p className="text-[15px] leading-7 text-muted">
                Sliding or hinged, built-in or walk-in. Tell us about your room
                and we will plan a wardrobe around it.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row md:flex-col">
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
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
