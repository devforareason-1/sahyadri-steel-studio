import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";

const promises = [
  {
    title: "Planned around you",
    text: "We start by listening to how you live, cook, store and relax.",
  },
  {
    title: "Clear and honest",
    text: "You know the scope, materials and budget before work begins.",
  },
  {
    title: "Cared for to the end",
    text: "From the first sketch to the final fitting, we stay with your project.",
  },
];

export default function About() {
  return (
    <section id="about" className="section-padding">
      <div className="container-shell">
        <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
          <Reveal>
            <SectionLabel>About the studio</SectionLabel>
            <p className="mt-7 text-sm leading-7 text-muted">
              A good home is not only about how it looks. It is about how easily
              it works for the people who live in it.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <h2 className="display-heading text-balance text-4xl sm:text-5xl lg:text-[4.4rem]">
              Spaces that feel
              <br className="hidden sm:block" />{" "}
              <span className="italic text-accent">like yours.</span>
            </h2>

            <p className="mt-7 max-w-[600px] text-sm leading-7 text-muted sm:text-base sm:leading-8">
              Sahyadri Steel Studio designs and builds kitchens, wardrobes and
              interiors for homes in Shimoga and Udupi. Every project begins
              with a conversation about how you want to live.
            </p>

            {/* TODO: ask the client what the name "Sahyadri Steel" means for their work,
                then add one short paragraph here. */}

            <a
              href="#services"
              className="mt-7 inline-flex items-center gap-3 border-b border-accent pb-2 text-xs font-medium"
            >
              See What We Do
              <ArrowRight size={15} />
            </a>
          </Reveal>
        </div>

        <div className="section-rule mt-16 grid gap-10 pt-10 md:grid-cols-3 md:gap-8">
          {promises.map((item, i) => (
            <Reveal key={item.title} delay={i * 120}>
              <p className="font-serif text-2xl tracking-[-0.03em]">
                {item.title}
              </p>
              <p className="mt-3 max-w-[300px] text-sm leading-7 text-muted">
                {item.text}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
