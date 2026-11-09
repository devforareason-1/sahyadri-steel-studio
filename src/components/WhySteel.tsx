import Reveal from "./Reveal";

const reasons = [
  { title: "No wood.", text: "Steel carcasses and fittings throughout, so nothing swells, warps or rots.", lead: true },
  { title: "Water & steam.", text: "Made for sinks, monsoons and bathrooms that never quite dry." },
  { title: "Termites & fire.", text: "Nothing for pests to eat, and a material that will not burn." },
  { title: "Wipe-clean.", text: "Non-porous surfaces with no grain for food or damp to settle in." },
];

// The case for the material and the studio's one big promise, so it gets the
// largest type on the page after the film: a schedule of reasons in big letters.
export default function WhySteel() {
  return (
    <section id="why-steel" aria-labelledby="why-steel-title" className="section">
      <div className="shell">
        <Reveal>
          <h2 id="why-steel-title" className="display h-md">
            Built for <em>Indian homes.</em>
          </h2>
        </Reveal>

        <dl className="mt-10 lg:mt-14">
          {reasons.map((r) => (
            <Reveal
              key={r.title}
              className="grid gap-x-6 gap-y-3 border-t border-line-strong py-6 lg:grid-cols-12 lg:items-baseline lg:py-8"
            >
              <dt className={`display lg:col-span-8 ${r.lead ? "h-peak" : "h-lg"}`}>
                {r.lead ? <em>{r.title}</em> : r.title}
              </dt>
              <dd className="lede lg:col-span-4">{r.text}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
