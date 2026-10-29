import Folio from "./Folio";
import Reveal from "./Reveal";

const reasons = [
  { title: "No wood", text: "Steel carcasses and fittings throughout, so nothing swells, warps or rots." },
  { title: "Water & steam", text: "Made for sinks, monsoons and bathrooms that never quite dry." },
  { title: "Termites & fire", text: "Nothing for pests to eat, and a material that will not burn." },
  { title: "Wipe-clean", text: "Non-porous surfaces with no grain for food or damp to settle in." },
];

// The case for the material, kept short: the reassurance behind the design.
export default function WhySteel() {
  return (
    <section id="why-steel" aria-labelledby="why-steel-title" className="section-tight bg-ivory-deep">
      <div className="shell">
        <Reveal>
          <Folio label="Why steel" aside="The material behind every design" />
        </Reveal>

        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-0">
          <Reveal className="lg:col-span-4">
            <h2 id="why-steel-title" className="display h-lg">
              Built for <em>Indian homes.</em>
            </h2>
          </Reveal>

          <Reveal delay={120} className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
            {reasons.map((r, i) => (
              <div key={r.title} className="border-t border-line pt-5">
                <p className="flex items-baseline gap-3">
                  <span className="numeral text-[15px]">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[1.15rem] font-light tracking-[-0.015em]">{r.title}</span>
                </p>
                <p className="mt-2 max-w-[320px] text-[14px] leading-6 text-muted">{r.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
