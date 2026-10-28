import { partners, testimonials } from "@/data/content";
import Folio from "./Folio";
import Reveal from "./Reveal";

// Shown only once genuine reviews have been added to data/content.ts.
export default function Testimonials({ number }: { number: string }) {
  if (testimonials.length === 0) return null;
  const [lead, ...rest] = testimonials;

  return (
    <section
      id="testimonials"
      data-tone="light"
      aria-labelledby="testimonials-title"
      className="section"
    >
      <div className="shell">
        <Reveal>
          <Folio number={number} label="In their words" />
        </Reveal>
        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-0">
          <Reveal className="lg:col-span-4">
            <h2 id="testimonials-title" className="display h-lg">
              Homes, <em>as lived in.</em>
            </h2>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-7 lg:col-start-6">
            <figure>
              <blockquote className="display text-[clamp(1.8rem,3.2vw,2.9rem)] leading-[1.15]">
                <span className="text-champagne-ink">&ldquo;</span>
                {lead.quote}
                <span className="text-champagne-ink">&rdquo;</span>
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4 text-sm">
                <span className="steel-rule w-10" aria-hidden="true" />
                <span>
                  <span className="font-semibold">{lead.name}</span>
                  <span className="text-muted"> · {lead.context}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>

        {rest.length > 0 && (
          <div className="mt-20 grid gap-10 border-t border-line pt-12 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((t, i) => (
              <Reveal key={t.name + i} delay={i * 100}>
                <figure>
                  <blockquote className="font-serif text-xl leading-8">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-4 text-sm">
                    <span className="font-semibold">{t.name}</span>
                    <span className="text-muted"> · {t.context}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        )}

        {partners.length > 0 && (
          <Reveal className="mt-24 border-t border-line pt-5 lg:mt-32">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
              Materials &amp; hardware partners
            </p>
            <ul className="mt-10 flex flex-wrap items-center gap-x-14 gap-y-8">
              {partners.map((p) => (
                <li key={p.name} className="font-serif text-2xl tracking-[0.06em] text-graphite/60">
                  {p.name}
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </section>
  );
}
