import { ArrowRight } from "lucide-react";
import { images } from "@/data/images";
import Folio from "./Folio";
import Photo from "./Photo";
import Reveal from "./Reveal";

const facts = [
  { label: "Practice", value: "Women-led design studio" },
  { label: "Studios", value: "Shivamogga · Udupi" },
  { label: "Built in", value: "Stainless steel, no wood" },
];

// Who the studio is, before what it makes: a design practice first, with
// steel as the material everything is built on.
export default function Studio() {
  return (
    <section id="about" aria-labelledby="studio-title" className="section">
      <div className="shell">
        <Reveal>
          <Folio label="The studio" aside="Interior design · Shivamogga & Udupi" />
        </Reveal>

        <div className="mt-10 grid gap-10 lg:mt-12 lg:grid-cols-12 lg:gap-0">
          <Reveal className="flex flex-col lg:col-span-6">
            <h2 id="studio-title" className="display h-statement">
              We design kitchens, wardrobes and vanities around the way your
              family lives, <em>then build every one of them in stainless steel.</em>
            </h2>
            <p className="lede mt-8 max-w-[480px]">
              Sahyadri Steel Studio is a women-led interior design studio. We
              plan each space with you, choose its finishes together, and make
              it on a steel core that will not swell, warp or rot through the
              Malnad monsoon or the coastal damp.
            </p>

            <dl className="mt-12 grid border-t border-line sm:grid-cols-3 lg:mt-auto lg:pt-0">
              {facts.map((f) => (
                <div key={f.label} className="border-b border-line py-5 sm:border-b-0 sm:pr-6">
                  <dt className="caption uppercase tracking-[0.12em]">{f.label}</dt>
                  <dd className="mt-2 text-[15px]">{f.value}</dd>
                </div>
              ))}
            </dl>

            <a href="#contact" className="link-line mt-10 self-start">
              Visit a studio
              <ArrowRight size={15} strokeWidth={1.6} />
            </a>
          </Reveal>

          <Reveal variant="media" className="lg:col-span-5 lg:col-start-8">
            <div className="media aspect-[4/5]">
              <Photo image={images.studioSamples} sizes="(max-width: 1024px) 100vw, 40vw" />
            </div>
            <p className="caption mt-3">Sample board · concept visual</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
