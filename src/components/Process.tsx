import Reveal from "./Reveal";

const steps = [
  {
    number: "01",
    title: "Listen",
    description:
      "We visit or talk with you to understand your space, your routine and your budget.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "You see layouts, materials and finishes, and we refine them with you until they feel right.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "Once the design is agreed, we make and fit everything with care and keep you updated.",
  },
  {
    number: "04",
    title: "Handover",
    description:
      "We walk you through your finished space and make sure every detail is just as you expected.",
  },
];

export default function Process() {
  return (
    <section
      id="approach"
      className="section-padding bg-foreground text-background"
    >
      <div className="container-shell">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <span className="eyebrow text-[#d4c3a8]">How we work</span>

            <h2 className="display-heading mt-6 text-4xl sm:text-5xl lg:text-6xl">
              From first
              <br />
              hello to
              <br />
              finished
              <br />
              <span className="italic text-[#d4c3a8]">home.</span>
            </h2>

            <p className="mt-6 max-w-[350px] text-sm leading-7 text-white/75">
              A clear process means no surprises. You always know what happens
              next.
            </p>
          </Reveal>

          <div className="border-t border-white/20">
            {steps.map((item, i) => (
              <Reveal key={item.number} delay={i * 100}>
                <article className="grid gap-4 border-b border-white/20 py-8 sm:grid-cols-[70px_1fr]">
                  <span className="text-xs tracking-[0.15em] text-[#d4c3a8]">
                    {item.number}
                  </span>
                  <div>
                    <h3 className="font-serif text-3xl">{item.title}</h3>
                    <p className="mt-3 max-w-[440px] text-sm leading-7 text-white/75">
                      {item.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
