/* eslint-disable @next/next/no-img-element -- small client portraits, served as-is */
import { UserRound } from "lucide-react";
import { testimonials } from "@/data/content";
import type { Testimonial } from "@/data/content";
import Folio from "./Folio";
import Reveal from "./Reveal";

// Stand-in quotes (sample: true) carry a visible tag, so they are never
// mistaken for a client's words.
function SampleTag({ t }: { t: Testimonial }) {
  if (!t.sample) return null;
  return (
    <span className="ml-3 inline-block border border-dashed border-champagne-ink/60 px-2 py-0.5 align-middle text-[11px] font-semibold uppercase tracking-[0.16em] text-champagne-ink">
      Sample
    </span>
  );
}

// The client's photo, or a brushed-steel disc with a person outline until
// one is supplied.
function Avatar({ t, size }: { t: Testimonial; size: "lg" | "sm" }) {
  const box = size === "lg" ? "h-14 w-14" : "h-11 w-11";
  return (
    <span
      aria-hidden="true"
      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-full ring-1 ring-line-strong transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-110 ${box} ${
        t.photo ? "" : "brushed-steel text-graphite/55"
      }`}
    >
      {t.photo ? (
        <img src={t.photo} alt="" loading="lazy" className="h-full w-full object-cover" />
      ) : (
        <UserRound size={size === "lg" ? 26 : 20} strokeWidth={1.3} />
      )}
    </span>
  );
}

// The quote grows a little under the pointer, from its left edge so the
// opening mark stays put.
const enlarge =
  "origin-left transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.04]";

// Columns for the quotes under the lead, chosen so rows fill evenly: one
// quote lines up under the lead, threes run three across, other even counts
// two across.
function restColumns(count: number) {
  if (count === 1) return "lg:w-7/12 lg:ml-[41.666%]";
  if (count % 3 === 0 || count % 2 === 1) return "md:grid-cols-2 lg:grid-cols-3";
  return "md:grid-cols-2";
}

// Hidden until data/content.ts has at least one review.
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
      <div className="shell">
        <Reveal>
          <Folio label="In their words" />
        </Reveal>
        <div className="mt-10 grid gap-12 lg:mt-12 lg:grid-cols-12 lg:gap-0">
          <Reveal className="lg:col-span-4">
            <h2 id="testimonials-title" className="display h-lg">
              Homes, <em>as lived in.</em>
            </h2>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-7 lg:col-start-6">
            <figure className="group">
              <blockquote className={`display text-[clamp(1.8rem,3.2vw,2.9rem)] leading-[1.15] ${enlarge}`}>
                <span className="text-champagne-ink">&ldquo;</span>
                {lead.quote}
                <span className="text-champagne-ink">&rdquo;</span>
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4 text-sm">
                <Avatar t={lead} size="lg" />
                <span>
                  <span className="font-semibold">{lead.name}</span>
                  <span className="text-muted"> · {lead.context}</span>
                  <SampleTag t={lead} />
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>

        {rest.length > 0 && (
          <div className={`mt-14 grid gap-x-16 gap-y-10 border-t border-line pt-10 ${restColumns(rest.length)}`}>
            {rest.map((t, i) => (
              <Reveal key={t.name + i} delay={i * 100}>
                <figure className="group">
                  <blockquote className={`font-serif text-xl leading-8 ${enlarge}`}>
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-5 flex items-center gap-3 text-sm">
                    <Avatar t={t} size="sm" />
                    <span>
                      <span className="font-semibold">{t.name}</span>
                      <span className="text-muted"> · {t.context}</span>
                      <SampleTag t={t} />
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        )}

        {testimonials.some((t) => t.sample) && (
          <p className="caption mt-12">
            Reviews marked &ldquo;Sample&rdquo; illustrate the kind of feedback we
            aim for. They will be replaced with genuine client reviews.
          </p>
        )}
      </div>
    </section>
  );
}
