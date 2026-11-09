import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import Photo from "./Photo";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

// Four rooms laid out like a magazine spread, a large plate beside a narrow one
// and then the reverse. Kitchens lead, as they are most of the studio's work.
const plates = [
  { cell: "lg:col-span-8", aspect: "aspect-[4/3]", sizes: "(max-width: 1024px) 100vw, 64vw", name: "h-lg" },
  { cell: "lg:col-span-4 lg:self-end", aspect: "aspect-[4/3] lg:aspect-[3/4]", sizes: "(max-width: 1024px) 100vw, 32vw", name: "h-md" },
  { cell: "lg:col-span-4 lg:self-start", aspect: "aspect-[4/3] lg:aspect-[3/4]", sizes: "(max-width: 1024px) 100vw, 32vw", name: "h-md" },
  { cell: "lg:col-span-8", aspect: "aspect-[4/3]", sizes: "(max-width: 1024px) 100vw, 64vw", name: "h-md" },
];

export default function Spaces() {
  return (
    <section id="spaces" aria-labelledby="spaces-title" className="section pt-(--space-passage)!">
      <div className="shell">
        <SectionHeading
          id="spaces-title"
          title={
            <>
              Four rooms, <em>one way of working.</em>
            </>
          }
          intro="Each is designed to your space and routines, finished to your taste, and built in stainless steel."
        />

        <ul className="mt-12 grid gap-x-6 gap-y-12 lg:mt-16 lg:grid-cols-12 lg:gap-y-20">
          {services.map((s, i) => {
            const plate = plates[i % plates.length];
            return (
              <Reveal as="li" key={s.slug} className={plate.cell}>
                <Link href={`/services/${s.slug}`} className="group block">
                  <div className={`media media-zoom ${plate.aspect}`}>
                    <Photo image={s.image} sizes={plate.sizes} />
                  </div>
                  <h3 className={`display mt-5 flex items-baseline gap-3 ${plate.name}`}>
                    {s.title}
                    <ArrowRight
                      aria-hidden="true"
                      size={22}
                      strokeWidth={1.4}
                      className="shrink-0 self-center transition-transform duration-300 group-hover:translate-x-1.5"
                    />
                  </h3>
                  <p className="note mt-3 max-w-[480px]">{s.summary}</p>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
