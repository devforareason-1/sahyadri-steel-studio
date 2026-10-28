import { partners, testimonials } from "@/data/content";
import Reveal from "./Reveal";

function PlaceholderNote({ children }: { children: string }) {
  return (
    <span className="inline-block border border-dashed border-champagne-ink/60 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-champagne-ink">
      {children}
    </span>
  );
}

export default function Testimonials() {
  const hasReviews = testimonials.length > 0;
  const [lead, ...rest] = testimonials;

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="section"
    >
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-0">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow text-champagne-ink">In their words</p>
            <h2 id="testimonials-title" className="display h-lg mt-6">
              Homes, <em>as lived in.</em>
            </h2>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-7 lg:col-start-6">
            {hasReviews ? (
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
            ) : (
              <figure>
                <PlaceholderNote>Placeholder · not a real review</PlaceholderNote>
                <blockquote className="display mt-6 text-[clamp(1.8rem,3.2vw,2.9rem)] leading-[1.15] text-graphite/35">
                  &ldquo;A genuine client testimonial will appear here, shared
                  with the client&rsquo;s permission.&rdquo;
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4 text-sm text-muted">
                  <span className="steel-rule w-10" aria-hidden="true" />
                  Client name · Project type, city
                </figcaption>
              </figure>
            )}
          </Reveal>
        </div>

        {hasReviews && rest.length > 0 && (
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

        {/* Partner brands */}
        <Reveal className="mt-24 border-t border-line pt-10 lg:mt-32">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <p className="eyebrow text-muted">Materials & hardware partners</p>
            {partners.length === 0 && (
              <PlaceholderNote>Placeholder · partners to be confirmed</PlaceholderNote>
            )}
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-[1px] bg-line sm:grid-cols-3 lg:grid-cols-6">
            {(partners.length > 0
              ? partners
              : Array.from({ length: 6 }, () => ({ name: "", logo: undefined }))
            ).map((p, i) => (
              <li
                key={p.name || i}
                className="flex h-24 items-center justify-center bg-ivory px-6"
              >
                {p.name ? (
                  <span className="font-serif text-xl tracking-[0.06em] text-graphite/70">
                    {p.name}
                  </span>
                ) : (
                  <span className="text-[11px] uppercase tracking-[0.22em] text-graphite/30">
                    Partner {String(i + 1).padStart(2, "0")}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
