import { ArrowUpRight } from "lucide-react";
import { instagramTiles } from "@/data/content";
import { site } from "@/data/site";
import InstagramIcon from "./InstagramIcon";
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
        <Reveal className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-champagne-ink">{site.instagramHandle}</p>
            <h2 id="instagram-title" className="display h-lg mt-6">
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

        <ul className="mt-12 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {instagramTiles.map((tile, i) => (
            <Reveal as="li" key={tile.src} delay={i * 70}>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${tile.alt}. Opens Instagram`}
                className="group media media-zoom block aspect-square"
              >
                <Photo
                  image={tile}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
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
