import { images } from "@/data/images";
import { principles } from "@/data/content";
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
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-0">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-champagne">Why Sahyadri Steel Studio</p>
            <h2 id="about-title" className="display h-lg mt-6">
              Good interiors are beautiful.{" "}
              <em className="text-champagne">Great ones are easy to live with.</em>
            </h2>
            <div className="group mt-12 hidden lg:block">
              <div className="media media-zoom aspect-[4/5] w-[78%] bg-graphite-soft">
                <Photo image={images.interiorMinimal} sizes="30vw" />
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-6 lg:col-start-7 lg:pt-4">
            <Reveal>
              <p className="max-w-[560px] text-lg leading-8 text-ivory/80">
                Sahyadri Steel Studio designs kitchens, wardrobes and bespoke
                stainless-steel interiors for homes in Shivamogga and Udupi. We
                believe a space should feel composed the day it is finished and
                stay practical for years of ordinary mornings.
              </p>
              <p className="mt-5 max-w-[560px] text-[15px] leading-7 text-ivory/60">
                That means listening first, drawing for your room rather than a
                catalogue, and choosing each material for where it works best.
              </p>
            </Reveal>

            <ol className="mt-14 grid border-t border-ivory/15 sm:grid-cols-2">
              {principles.map((p, i) => (
                <Reveal
                  as="li"
                  key={p.title}
                  delay={(i % 2) * 120}
                  className={`border-b border-ivory/15 py-8 sm:pr-8 ${
                    i % 2 ? "sm:border-l sm:pl-8" : ""
                  }`}
                >
                  <span className="font-serif text-lg italic text-champagne">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-serif text-[1.65rem] leading-tight">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-ivory/60">{p.text}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
