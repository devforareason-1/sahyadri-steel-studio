/* eslint-disable @next/next/no-img-element -- small partner logos, served as-is */
import { partners, type Partner } from "@/data/content";
import Folio from "./Folio";
import Reveal from "./Reveal";

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

function Mark({ partner }: { partner: Partner }) {
  return (
    <li className="group flex h-28 w-[200px] shrink-0 flex-col items-center justify-center gap-3 border-r border-line sm:h-32 sm:w-[260px]">
      {partner.logo ? (
        <img
          src={`${base}${partner.logo}`}
          alt=""
          loading="lazy"
          draggable={false}
          style={{ "--s": partner.logoScale ?? 1 } as React.CSSProperties}
          className={`h-[calc(2.25rem*var(--s))] w-auto max-w-[150px] object-contain opacity-55 grayscale transition-[opacity,filter] duration-500 group-hover:opacity-100 sm:h-[calc(2.75rem*var(--s))] sm:max-w-[180px] ${
            partner.logoOnDark ? "brightness-0" : "group-hover:grayscale-0"
          }`}
        />
      ) : (
        <span className="font-serif text-[1.9rem] leading-none text-graphite/60 transition-colors duration-500 group-hover:text-graphite">
          {partner.name}
        </span>
      )}
      <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-muted opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        {partner.offer}
      </span>
    </li>
  );
}

// The brands behind the fittings, as a slow carousel of logos. Each brand
// shows its official logo once one is set in data/content.ts, and its name
// in the display face until then.
export default function Partners({ number }: { number: string }) {
  if (partners.length === 0) return null;

  // Repeat the list until one pass is wider than a large screen, then run
  // two passes so the -50% loop in .marquee is seamless.
  const pass: Partner[] = [];
  while (pass.length < 8) pass.push(...partners);

  return (
    <section
      id="partners"
      data-tone="light"
      aria-labelledby="partners-title"
      className="section-tight"
    >
      <div className="shell">
        <Reveal>
          <Folio number={number} label="Partners" aside="Fittings & systems" />
        </Reveal>

        <Reveal className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-12 lg:items-end lg:gap-0">
          <h2 id="partners-title" className="display h-lg lg:col-span-6">
            In good <em>company.</em>
          </h2>
          <p className="lede max-w-[420px] lg:col-span-4 lg:col-start-9 lg:pb-2">
            Every drawer, hinge and sliding door runs on hardware from makers we
            trust, chosen for how it feels on the ten-thousandth opening.
          </p>
        </Reveal>
      </div>

      {/* For screen readers: the list once, without the motion. */}
      <ul className="sr-only">
        {partners.map((p) => (
          <li key={p.name}>
            {p.name}, {p.offer}
          </li>
        ))}
      </ul>

      <Reveal
        delay={120}
        className="partner-strip mt-14 overflow-hidden border-y border-line lg:mt-20"
      >
        <div aria-hidden="true" className="marquee" style={{ animationDuration: `${pass.length * 5}s` }}>
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0">
              {pass.map((p, i) => (
                <Mark key={`${p.name}-${i}`} partner={p} />
              ))}
            </ul>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
