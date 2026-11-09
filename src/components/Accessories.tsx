import { accessories } from "@/data/content";
import Photo from "./Photo";
import Reveal from "./Reveal";

// The fittings the studio plans into a kitchen, as a catalogue page. The product
// photographs are small, so the images stay small enough to keep them sharp,
// with the heading alongside on wide screens.
export default function Accessories() {
  return (
    <section aria-labelledby="accessories-title" data-tone="light" className="section">
      <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-0">
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

        <ul className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-6 lg:col-span-8">
          {accessories.map((a) => (
            <li key={a.name}>
              <Reveal>
                <div className="media aspect-[4/5]">
                  <Photo image={a.image} sizes="(min-width: 1024px) 22vw, (min-width: 640px) 33vw, 50vw" />
                </div>
                <h3 className="display h-sm mt-3">{a.name}</h3>
                <p className="note mt-1.5">{a.text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
