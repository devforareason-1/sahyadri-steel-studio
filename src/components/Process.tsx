import { images } from "@/data/images";
import Folio from "./Folio";
import Photo from "./Photo";
import Reveal from "./Reveal";

const steps = [
  {
    title: "Consultation",
    text: "We meet at a studio or at your home, measure the space and talk through how your household cooks, stores and lives.",
  },
  {
    title: "Design",
    text: "A layout drawn around your space and routines, refined with you until every drawer and shelf earns its place.",
  },
  {
    title: "Finishes",
    text: "Fronts, surfaces and hardware chosen from physical samples, so you see and touch the palette before it is made.",
  },
  {
    title: "Made in steel",
    text: "Carcasses and fittings are built in stainless steel to the agreed drawings, with nothing left to chance on site.",
  },
  {
    title: "Installation",
    text: "Fitted, aligned and checked drawer by drawer, then handed over clean and ready to use.",
  },
];

// How a project runs, from the first conversation to handover.
export default function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="section bg-ivory-deep">
      <div className="shell">
        <Reveal>
          <Folio label="Process" aside="From first visit to handover" />
        </Reveal>

        <div className="mt-10 grid gap-10 lg:mt-12 lg:grid-cols-12 lg:gap-0">
          <Reveal variant="media" className="lg:col-span-5">
            <div className="media aspect-[4/5]">
              <Photo image={images.processSwatches} sizes="(max-width: 1024px) 100vw, 40vw" />
            </div>
            <p className="caption mt-3">Choosing finishes · concept visual</p>
          </Reveal>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <h2 id="process-title" className="display h-lg">
                How a space <em>comes together.</em>
              </h2>
            </Reveal>

            <ol className="mt-12 border-t border-line">
              {steps.map((step, i) => (
                <Reveal
                  as="li"
                  key={step.title}
                  delay={i * 60}
                  className="grid grid-cols-[3rem_1fr] gap-x-4 border-b border-line py-7 sm:grid-cols-[4rem_1fr]"
                >
                  <span className="numeral pt-1 text-[15px]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-[1.3rem] font-light leading-tight tracking-[-0.02em]">
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-[460px] text-[14px] leading-6 text-muted">
                      {step.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
