import Reveal from "./Reveal";

const promises = [
  { title: "No wood", text: "Steel and glass throughout, so nothing swells, warps or rots." },
  { title: "Water & steam", text: "Made for sinks, monsoons and bathrooms that never quite dry." },
  { title: "Termites & fire", text: "Nothing for pests to eat, and a material that will not burn." },
  { title: "Wipe-clean", text: "Non-porous surfaces with no grain for food or damp to settle in." },
];

// The studio's promise in four lines, set between brushed-steel rules.
export default function SteelStandard() {
  return (
    <section data-tone="light" aria-labelledby="standard-title">
      <div className="shell">
        <div className="steel-rule" aria-hidden="true" />
        <Reveal className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.1fr_repeat(4,1fr)] lg:gap-8 lg:py-16">
          <h2
            id="standard-title"
            className="font-serif text-[1.9rem] italic leading-[1.05] text-champagne-ink sm:col-span-2 lg:col-span-1"
          >
            The steel
            <br className="hidden lg:block" /> standard
          </h2>
          {promises.map((p, i) => (
            <div key={p.title} className="lg:border-l lg:border-line lg:pl-8">
              <p className="flex items-baseline gap-3">
                <span className="numeral text-base">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em]">{p.title}</span>
              </p>
              <p className="mt-3 max-w-[260px] text-[14px] leading-6 text-muted">{p.text}</p>
            </div>
          ))}
        </Reveal>
        <div className="steel-rule" aria-hidden="true" />
      </div>
    </section>
  );
}
