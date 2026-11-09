import { testimonials } from "@/data/content";
import type { Testimonial } from "@/data/content";
import Reveal from "./Reveal";

// Who said it. Stand-in quotes (sample: true) say so in words, so they are
// never mistaken for a client's.
function Attribution({ t }: { t: Testimonial }) {
  return (
    <figcaption className="note mt-6">
      <span className="font-medium text-graphite">{t.name}</span> · {t.context}
      {t.sample && <span className="font-medium text-champagne-ink"> · Sample review</span>}
    </figcaption>
  );
}

// Hidden until data/content.ts has at least one review. The client's words are
// what to read here, so they outrank the section's own heading.
export default function Testimonials() {
  if (testimonials.length === 0) return null;
  const [lead, ...rest] = testimonials;

  return (
    <section
      id="testimonials"
      data-tone="light"
      aria-labelledby="testimonials-title"
      className="section"
    >
      <div className="shell grid gap-8 lg:grid-cols-12 lg:gap-0">
        <Reveal className="lg:col-span-3">
          <h2 id="testimonials-title" className="display h-md">
            Homes, <em>as lived in.</em>
          </h2>
        </Reveal>

        <div className="lg:col-span-9">
          <Reveal delay={120}>
            <figure>
              <blockquote className="display h-statement">
                &ldquo;{lead.quote}&rdquo;
              </blockquote>
              <Attribution t={lead} />
            </figure>
          </Reveal>

          {rest.length > 0 && (
            <div className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2">
              {rest.map((t, i) => (
                <Reveal key={t.name + i} delay={i * 100}>
                  <figure>
                    <blockquote className="display h-sm leading-[1.3]!">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                    <Attribution t={t} />
                  </figure>
                </Reveal>
              ))}
            </div>
          )}

          {testimonials.some((t) => t.sample) && (
            <p className="caption mt-12 max-w-[560px]">
              Reviews marked &ldquo;Sample&rdquo; illustrate the kind of feedback we
              aim for. They will be replaced with genuine client reviews.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
