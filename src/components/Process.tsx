import Link from "next/link";
import { ArrowRight } from "lucide-react";
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

// How a project runs, measured off along one dimension line from the first
// conversation to handover. On phones the line becomes a rule above each step.
export default function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="section">
      <div className="shell">
        <Reveal>
          <h2 id="process-title" className="display h-lg">
            How a space <em>comes together.</em>
          </h2>
        </Reveal>

        <ol className="mt-12 grid gap-y-8 lg:mt-16 lg:grid-cols-5">
          {steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 60}>
              <span aria-hidden="true" className="dim" />
              <div className="mt-5 grid grid-cols-[2.5rem_1fr] lg:block lg:pr-8">
                <span className="numeral">{String(i + 1).padStart(2, "0")}</span>
                <div className="lg:mt-5">
                  <h3 className="display h-sm">{step.title}</h3>
                  <p className="note mt-2">{step.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-14">
          <Link href="/#contact" className="btn btn-primary">
            Request a Quote
            <ArrowRight size={16} strokeWidth={1.6} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
