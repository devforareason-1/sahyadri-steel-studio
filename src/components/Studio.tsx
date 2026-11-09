import { ArrowRight } from "lucide-react";
import { images } from "@/data/images";
import Photo from "./Photo";
import Reveal from "./Reveal";

const facts = [
  { label: "Practice", value: "Women-led design studio" },
  { label: "Studios", value: "Shivamogga · Udupi" },
  { label: "Built in", value: "Stainless steel, no wood" },
];

// Who the studio is, before what it makes: one statement across the page, then
// the photograph and the detail beneath it.
export default function Studio() {
  return (
    <section id="about" aria-labelledby="studio-title" className="section pb-(--space-passage)!">
      <div className="shell">
        <Reveal>
          <h2 id="studio-title" className="display h-statement max-w-[1180px]">
            {/* We design kitchens, wardrobes and vanities around the way your
            family lives, <em>then build every one of them in stainless steel.</em> */}
            We design complete interiors around the way you live, with <em>stainless steel</em> at the heart of what we build.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-0">
          <Reveal variant="media" className="lg:col-span-5">
            <div className="media aspect-[4/3] lg:aspect-[4/5]">
              <Photo image={images.studioSamples} sizes="(max-width: 1024px) 100vw, 40vw" />
            </div>
            <p className="caption mt-3">Sample board</p>
          </Reveal>

          <Reveal className="flex flex-col lg:col-span-5 lg:col-start-7 lg:pb-8 lg:justify-end">
            <p className="lede">
              Sahyadri Steel Studio is a women-led interior design studio. We
              plan each space with you, choose its finishes together, and make
              it on a steel core that will not swell, warp or rot through the
              Malnad monsoon or the coastal damp.
            </p>

            <dl className="mt-10">
              {facts.map((f) => (
                <div key={f.label} className="grid grid-cols-[6.5rem_1fr] gap-x-4 border-t border-line py-3.5 last:border-b">
                  <dt className="caption self-center">{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>

            <a href="#contact" className="link-line mt-9 self-start">
              Talk to a studio
              <ArrowRight size={15} strokeWidth={1.6} />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
