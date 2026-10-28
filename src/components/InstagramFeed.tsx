"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { instagramPosts, type InstagramPost } from "@/data/instagram";
import { site } from "@/data/site";
import Folio from "./Folio";
import InstagramIcon from "./InstagramIcon";
import Photo from "./Photo";
import Reveal from "./Reveal";

// Until real posts are added, steel placeholders keep the shape of the feed
// and link to the profile.
const placeholders: InstagramPost[] = Array.from({ length: 6 }, () => ({
  url: site.instagram,
  image: { src: "", alt: "Instagram post" },
}));

// Instagram's embeddable page for a post or reel. Links come in several
// shapes ("/reel/ID/", "/username/reel/ID/", "/p/ID/?igsh=..."), but only
// "/reel/ID/embed/" or "/p/ID/embed/" may be framed, so take the kind and
// the shortcode and rebuild it.
function embedUrl(url: string) {
  const match = new URL(url).pathname.match(/\/(p|reel|reels|tv)\/([\w-]+)/);
  if (!match) return null;
  const kind = match[1] === "p" ? "p" : "reel";
  return `https://www.instagram.com/${kind}/${match[2]}/embed/`;
}

// A link-only entry: Instagram's own player, loaded only when near view.
// The frame is sized from the tile's width (container units): Instagram's
// profile bar (~54px), the 4:5 media, and the "View more on Instagram" line
// (~46px). It ends there on purpose, leaving out the likes and comment bar.
function Embed({ post }: { post: InstagramPost }) {
  const src = embedUrl(post.url);
  // Not a post or reel link (a profile, say): fall back to a plain tile.
  if (!src) return <Tile post={post} image={{ src: "", alt: post.caption ?? "Instagram post" }} />;
  return (
    <div className="@container overflow-hidden border border-line bg-white">
      <iframe
        src={src}
        title={post.caption ? `${post.caption} on Instagram` : "Instagram reel"}
        loading="lazy"
        allow="encrypted-media; picture-in-picture; clipboard-write"
        scrolling="no"
        className="block h-[calc(125cqw+95px)] w-full border-0"
      />
    </div>
  );
}

function Tile({ post, image }: { post: InstagramPost; image: NonNullable<InstagramPost["image"]> }) {
  return (
    <a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${post.caption ?? image.alt}, on Instagram`}
      className="group block"
    >
      <span className="media media-zoom block aspect-[4/5]">
        <Photo image={image} sizes="(max-width: 640px) 72vw, (max-width: 1024px) 42vw, 25vw" />
        {/* Hover: a soft veil with the caption and a link mark. */}
        <span className="absolute inset-0 flex flex-col justify-between bg-graphite/0 p-5 text-ivory opacity-0 transition-[opacity,background-color] duration-500 group-hover:bg-graphite/55 group-hover:opacity-100 group-focus-visible:bg-graphite/55 group-focus-visible:opacity-100">
          <span className="flex justify-between">
            <InstagramIcon size={20} />
            <ArrowUpRight size={18} strokeWidth={1.5} />
          </span>
          {post.caption && (
            <span className="font-serif text-lg italic leading-snug">{post.caption}</span>
          )}
        </span>
      </span>
    </a>
  );
}

// The studio's Instagram as a swipeable row of posts: scroll-snap on touch,
// arrow buttons on desktop, each tile opening the post on Instagram.
export default function InstagramFeed({ number }: { number: string }) {
  const row = useRef<HTMLUListElement>(null);
  const posts = instagramPosts.length > 0 ? instagramPosts : placeholders;
  // Instagram's player needs ~330px, so rows with embeds show three across.
  const hasEmbeds = posts.some((p) => !p.image);
  const desktopWidth = hasEmbeds
    ? "lg:w-[calc((100vw-2*var(--gutter)-2*16px)/3)]"
    : "lg:w-[calc((100vw-2*var(--gutter)-3*16px)/4)]";

  const step = (dir: 1 | -1) => {
    const el = row.current;
    if (!el) return;
    const tile = el.querySelector("li");
    const by = tile ? tile.getBoundingClientRect().width + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * by, behavior: "smooth" });
  };

  return (
    <section
      id="instagram"
      data-tone="light"
      aria-labelledby="instagram-title"
      className="section-tight"
    >
      <div className="shell">
        <Reveal>
          <Folio number={number} label="Instagram" aside={site.instagramHandle} />
        </Reveal>

        <Reveal className="mt-12 flex flex-wrap items-end justify-between gap-8 lg:mt-16">
          <h2 id="instagram-title" className="display h-lg">
            From the <em>studio floor.</em>
          </h2>
          <div className="flex items-center gap-3">
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-sm"
            >
              <InstagramIcon size={15} />
              Follow {site.instagramHandle}
            </a>
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous posts"
              className="hidden h-11 w-11 items-center justify-center border border-line-strong transition-colors hover:border-graphite hover:bg-graphite hover:text-ivory sm:flex"
            >
              <ArrowLeft size={17} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next posts"
              className="hidden h-11 w-11 items-center justify-center border border-line-strong transition-colors hover:border-graphite hover:bg-graphite hover:text-ivory sm:flex"
            >
              <ArrowRight size={17} strokeWidth={1.5} />
            </button>
          </div>
        </Reveal>
      </div>

      <Reveal delay={120} className="mt-12 lg:mt-16">
        <ul
          ref={row}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-[var(--gutter)] px-[var(--gutter)] pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {posts.map((post, i) => (
            <li
              key={`${post.url}-${i}`}
              className={`w-[82vw] max-w-[420px] shrink-0 snap-start sm:w-[42vw] lg:max-w-none ${desktopWidth}`}
            >
              {post.image ? <Tile post={post} image={post.image} /> : <Embed post={post} />}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
