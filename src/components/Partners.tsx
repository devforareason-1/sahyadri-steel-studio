/* eslint-disable @next/next/no-img-element -- small partner logos, served as-is */
import { partners, type Partner } from "@/data/content";
import Reveal from "./Reveal";

// Where a pointer can hover, logos rest in grey and colour up under it.
// Touch screens can't hover, so there they show in colour from the start.
function Mark({ partner }: { partner: Partner }) {
  return (
    <li className="group flex flex-col gap-3">
      <span className="flex h-12 items-center">
        {partner.logo ? (
          <img
            src={partner.logo}
            alt={partner.name}
            width={partner.logoSize?.[0]}
            height={partner.logoSize?.[1]}
            loading="lazy"
            draggable={false}
            style={{ "--s": partner.logoScale ?? 1 } as React.CSSProperties}
            className={`h-[calc(2.1rem*var(--s))] w-auto max-w-[140px] object-contain object-left transition-[opacity,filter] duration-500 ease-[var(--ease-out)] [@media(hover:hover)]:opacity-70 [@media(hover:hover)]:grayscale [@media(hover:hover)]:group-hover:opacity-100 sm:h-[calc(2.5rem*var(--s))] sm:max-w-[160px] ${
              partner.logoOnDark ? "brightness-0" : "[@media(hover:hover)]:group-hover:grayscale-0"
            }`}
          />
        ) : (
          <span className="display h-sm">{partner.name}</span>
        )}
      </span>
      <span className="caption">{partner.offer}</span>
    </li>
  );
}

// The brands behind the fittings, as one open row. Each brand shows its official
// logo once one is set in data/content.ts, and its name until then.
export default function Partners() {
  if (partners.length === 0) return null;

  return (
    <section id="partners" aria-labelledby="partners-title" className="section-tight">
      <div className="shell">
        <Reveal className="grid gap-4 lg:grid-cols-12 lg:items-baseline lg:gap-0">
          <h2 id="partners-title" className="display h-md lg:col-span-5">
            In good <em>company.</em>
          </h2>
          <p className="note max-w-[520px] lg:col-span-6 lg:col-start-7">
            Every drawer, hinge and sliding door runs on hardware from makers we
            trust, chosen for how it feels on the ten-thousandth opening.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-3 lg:mt-14 lg:grid-cols-6">
            {partners.map((p) => (
              <Mark key={p.name} partner={p} />
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
