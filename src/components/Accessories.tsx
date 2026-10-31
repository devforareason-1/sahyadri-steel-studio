import { accessories } from "@/data/content";
import Folio from "./Folio";
import Photo from "./Photo";
import Reveal from "./Reveal";

// The fittings the studio plans into a kitchen, each on its own card. The
// product photographs are small, so the cards stay small enough to keep them
// sharp, with the heading alongside on wide screens.
export default function Accessories() {
  return (
    <section aria-labelledby="accessories-title" data-tone="light" className="section-tight">
      <div className="shell">
        <Reveal>
          <Folio label="Accessories" aside="Planned around what you keep" />
        </Reveal>

        <div className="mt-10 grid gap-10 lg:mt-12 lg:grid-cols-12 lg:gap-0">
          <Reveal className="lg:sticky lg:top-[calc(var(--header-height)+32px)] lg:col-span-4 lg:self-start lg:pr-10">
            <h2 id="accessories-title" className="display h-lg">
              A place for <em>everything.</em>
            </h2>
            <p className="lede mt-6 max-w-[440px]">
              Pull-outs, corner units and drawers that bring what is at the back
              of a cabinet to you, chosen with you for the way your kitchen works.
            </p>
            <p className="caption mt-6 max-w-[360px]">
              Photographs for illustration. Fittings in your kitchen are confirmed
              at the design stage.
            </p>
          </Reveal>

          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:col-span-8">
            {accessories.map((a) => (
              <li key={a.name} className="flex">
                <Reveal className="w-full border border-line bg-ivory p-2.5 sm:p-3">
                  <div className="media aspect-[4/5]">
                    <Photo image={a.image} sizes="(min-width: 1024px) 22vw, (min-width: 640px) 33vw, 50vw" />
                  </div>
                  <h3 className="mt-3 font-serif text-[1.05rem] leading-tight sm:text-[1.15rem]">{a.name}</h3>
                  <p className="mt-1.5 text-pretty text-[13px] leading-5 text-muted sm:text-[14px] sm:leading-6">
                    {a.text}
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
