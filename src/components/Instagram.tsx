import { ArrowUpRight } from "lucide-react";
import { instagramTiles } from "@/data/content";
import { site } from "@/data/site";
import InstagramIcon from "./InstagramIcon";
import Folio from "./Folio";
import Photo from "./Photo";
import Reveal from "./Reveal";

export default function Instagram() {
  return (
    <section
      id="instagram"
      aria-labelledby="instagram-title"
      className="section-tight"
    >
      <div className="shell">
        <Reveal>
          <Folio number="10" label="Journal" aside={site.instagramHandle} />
        </Reveal>
        <Reveal className="mt-12 flex flex-col justify-between gap-8 md:flex-row md:items-end lg:mt-16">
          <div>
            <h2 id="instagram-title" className="display h-lg">
              Follow <em>our journey.</em>
            </h2>
          </div>
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline self-start md:self-auto"
          >
            <InstagramIcon size={17} />
            Follow on Instagram
          </a>
        </Reveal>

        {/* One large plate and four small ones, rather than a strip of squares. */}
        <ul className="mt-12 grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
          {instagramTiles.slice(0, 5).map((tile, i) => (
            <Reveal
              as="li"
              variant="media"
              key={tile.src}
              delay={i * 90}
              className={i === 0 ? "col-span-2 lg:row-span-2" : ""}
            >
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${tile.alt}. Opens Instagram`}
                className={`group media media-zoom block ${
                  i === 0 ? "aspect-[4/3] lg:aspect-auto lg:h-full" : "aspect-square"
                }`}
              >
                <Photo
                  image={tile}
                  sizes={i === 0 ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 50vw, 25vw"}
                />
                <span className="absolute inset-0 flex items-center justify-center bg-graphite/0 text-ivory opacity-0 transition-all duration-500 group-hover:bg-graphite/45 group-hover:opacity-100 group-focus-visible:bg-graphite/45 group-focus-visible:opacity-100">
                  <ArrowUpRight size={22} strokeWidth={1.4} />
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
        <p className="caption mt-4">
          Preview imagery. Visit our Instagram profile for our latest posts.
        </p>
      </div>
    </section>
  );
}
