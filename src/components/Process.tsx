const steps = [
  {
    number: "01",
    title: "Understand",
    description:
      "We begin by understanding your space, preferences, requirements, and budget.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "We explore layouts, materials, finishes, and solutions suited to your needs.",
  },
  {
    number: "03",
    title: "Execute",
    description:
      "The agreed design moves into execution with attention to detail and quality.",
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
          <div>
            <span className="eyebrow text-[#d4c3a8]">How we work</span>

            <h2 className="display-heading mt-6 text-4xl sm:text-5xl lg:text-6xl">
              From first
              <br />
              conversation
              <br />
              to finished
              <br />
              <span className="italic text-[#d4c3a8]">space.</span>
            </h2>

            <p className="mt-6 max-w-[350px] text-sm leading-7 text-white/75">
              A considered process helps align your expectations, design
              decisions, and project requirements from the beginning.
            </p>
          </div>

          <div className="border-t border-white/20">
            {steps.map((item) => (
              <article
                key={item.number}
                className="grid gap-4 border-b border-white/20 py-8 sm:grid-cols-[70px_1fr]"
              >
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}