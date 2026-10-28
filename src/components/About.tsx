import { images } from "@/data/images";
import { principles } from "@/data/content";
import Folio from "./Folio";
import Parallax from "./Parallax";
import Photo from "./Photo";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="section on-dark grain bg-graphite text-ivory"
    >
      <div className="shell">
        <Reveal>
          <Folio dark number="07" label="Why Sahyadri" aside="Our way of working" />
        </Reveal>

        <Reveal className="mt-14 lg:mt-20">
          <h2 id="about-title" className="display h-xl max-w-[1100px]">
            Good interiors are beautiful.{" "}
            <em className="text-champagne">Great ones are easy to live with.</em>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-14 lg:mt-24 lg:grid-cols-12 lg:gap-0">
          <Reveal variant="media" className="lg:col-span-5">
            <div className="media relative aspect-[4/3] bg-graphite-soft">
              <Parallax className="absolute inset-0" speed={0.06}>
                <Photo image={images.studyNook} sizes="(max-width: 1024px) 100vw, 55vw" />
              </Parallax>
            </div>
            <p className="mt-3 text-[11px] tracking-[0.08em] text-ivory/45">
              Fluted walnut and soft light · concept visual
            </p>
          </Reveal>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <p className="max-w-[540px] text-lg leading-8 text-ivory/80">
                Sahyadri Steel Studio designs kitchens, wardrobes and bespoke
                stainless-steel interiors for homes in Shivamogga and Udupi. We
                believe a space should feel composed the day it is finished and
                stay practical for years of ordinary mornings.
              </p>
              <p className="mt-5 max-w-[540px] text-[15px] leading-7 text-ivory/55">
                That means listening first, drawing for your room rather than a
                catalogue, and choosing each material for where it works best.
              </p>
            </Reveal>

            <dl className="mt-14 border-t border-ivory/15">
              {principles.map((p, i) => (
                <Reveal
                  key={p.title}
                  delay={i * 60}
                  className="grid gap-1 border-b border-ivory/15 py-5 sm:grid-cols-[2.5rem_minmax(0,1fr)_minmax(0,1.15fr)] sm:items-baseline sm:gap-6"
                >
                  <span aria-hidden="true" className="hidden font-serif text-base italic text-champagne sm:block">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <dt className="font-serif text-[1.45rem] leading-tight">{p.title}</dt>
                  <dd className="text-[14px] leading-6 text-ivory/55">{p.text}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
