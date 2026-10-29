import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import Folio from "./Folio";
import Photo from "./Photo";
import Reveal from "./Reveal";

// The rooms the studio designs, as four large plates. Each opens its own
// page with the detail, planner and enquiry.
export default function Spaces() {
  return (
    <section
      id="spaces"
      aria-labelledby="spaces-title"
      className="section bg-ivory-deep"
    >
      <div className="shell">
        <Reveal>
          <Folio label="Spaces" aside="Kitchens · Wardrobes · Vanities · Full homes" />
        </Reveal>

        <Reveal className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-12 lg:items-end lg:gap-0">
          <h2 id="spaces-title" className="display h-lg lg:col-span-7">
            Four rooms, <em>one way of working.</em>
          </h2>
          <p className="lede max-w-[420px] lg:col-span-4 lg:col-start-9 lg:pb-2">
            Each is designed to your space and routines, finished to your
            taste, and built in stainless steel.
          </p>
        </Reveal>

        <ul className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-x-6">
          {services.map((s, i) => (
            <Reveal
              as="li"
              key={s.slug}
              delay={i * 90}
            >
              <Link href={`/services/${s.slug}`} className="group block">
                <div className="media media-zoom aspect-[3/4]">
                  <Photo image={s.image} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 24vw" />
                </div>
                <div className="mt-5 flex items-start justify-between gap-6">
                  <div>
                    <p className="caption uppercase tracking-[0.12em]">{s.kicker}</p>
                    <h3 className="mt-2 text-[clamp(1.4rem,1.7vw,1.65rem)] font-light leading-tight tracking-[-0.025em]">
                      {s.title}
                    </h3>
                    <p className="mt-3 max-w-[440px] text-[14px] leading-6 text-muted">
                      {s.summary}
                    </p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line-strong transition-colors duration-300 group-hover:border-graphite group-hover:bg-graphite group-hover:text-ivory"
                  >
                    <ArrowUpRight size={17} strokeWidth={1.4} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
