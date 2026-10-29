/* eslint-disable @next/next/no-img-element -- small partner logos, served as-is */
import { partners, type Partner } from "@/data/content";
import Folio from "./Folio";
import Reveal from "./Reveal";

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

function Mark({ partner }: { partner: Partner }) {
  return (
    <li className="group flex h-32 overflow-hidden flex-col items-center justify-center gap-3 border-b border-r border-line px-4 sm:h-36">
      {partner.logo ? (
        <img
          src={`${base}${partner.logo}`}
          alt={partner.name}
          loading="lazy"
          draggable={false}
          style={{ "--s": partner.logoScale ?? 1 } as React.CSSProperties}
          className={`h-[calc(2.1rem*var(--s))] w-auto max-w-[140px] object-contain opacity-60 grayscale transition-[opacity,filter,scale] duration-500 ease-[var(--ease-out)] group-hover:scale-[1.12] group-hover:opacity-100 sm:h-[calc(2.5rem*var(--s))] sm:max-w-[160px] ${
            partner.logoOnDark ? "brightness-0" : "group-hover:grayscale-0"
          }`}
        />
      ) : (
        <span className="text-[1.5rem] font-light leading-none tracking-[-0.02em] text-graphite/70 transition-[scale,color] duration-500 ease-[var(--ease-out)] group-hover:scale-[1.12] group-hover:text-graphite">
          {partner.name}
        </span>
      )}
      <span className="caption text-center">{partner.offer}</span>
    </li>
  );
}

// The brands behind the fittings, as one quiet row of logos. Each brand
// shows its official logo once one is set in data/content.ts, and its name
// until then.
export default function Partners() {
  if (partners.length === 0) return null;

  return (
    <section id="partners" aria-labelledby="partners-title" className="section-tight">
      <div className="shell">
        <Reveal>
          <Folio label="Partners" aside="Fittings & systems" />
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

        <Reveal delay={120}>
          <ul className="mt-10 grid grid-cols-2 border-l border-t border-line sm:grid-cols-3 lg:mt-12 lg:grid-cols-5">
            {partners.map((p) => (
              <Mark key={p.name} partner={p} />
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
