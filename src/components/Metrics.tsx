import { metrics } from "@/data/content";
import CountUp from "./CountUp";
import Reveal from "./Reveal";

// The studio in numbers: a quiet row of figures, with no boxes around them.
export default function Metrics() {
  if (metrics.length === 0) return null;

  return (
    <section aria-label="The studio in numbers" className="section-tight">
      <div className="shell">
        <Reveal>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
            {metrics.map((m) => (
              <div key={m.label} className="flex flex-col-reverse items-center gap-3 text-center">
                <dt className="note">{m.label}</dt>
                <dd className="font-serif text-[clamp(2.75rem,4.8vw,4.5rem)] font-semibold leading-none tracking-[-0.03em] [font-variant-numeric:lining-nums]">
                  <CountUp value={m.value} />
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
