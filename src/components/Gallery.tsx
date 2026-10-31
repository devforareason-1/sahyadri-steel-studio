"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import type { Img } from "@/data/images";
import Photo from "./Photo";

// A room's photographs at their own shapes, stacked in columns, each opening
// to a full-screen viewer. Pictures still to be taken are left out.
export default function Gallery({ images }: { images: Img[] }) {
  const photos = images.filter((img) => img.src);
  const [active, setActive] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const current = active === null ? null : photos[active];

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (active !== null && !d.open) d.showModal();
    if (active === null && d.open) d.close();
  }, [active]);

  const step = (dir: 1 | -1) =>
    setActive((i) => (i === null ? i : (i + dir + photos.length) % photos.length));

  return (
    <>
      <ul className="mt-6 columns-2 gap-3 sm:gap-4 lg:columns-3">
        {photos.map((img, i) => (
          <li key={img.src} className="mb-3 break-inside-avoid sm:mb-4">
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View larger: ${img.alt}`}
              className="group block w-full"
            >
              <span
                className="media media-zoom block w-full"
                style={{ aspectRatio: img.ratio ?? 4 / 3 }}
              >
                <Photo image={img} sizes="(min-width: 1024px) 33vw, 50vw" />
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        aria-label={current ? current.alt : "Photo viewer"}
        onClose={() => setActive(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setActive(null);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        className="on-dark m-auto h-full max-h-none w-full max-w-none bg-transparent p-0 text-ivory backdrop:bg-graphite/95"
      >
        {current && (
          <div className="flex h-full flex-col p-4 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <p className="text-[12px] uppercase tracking-[0.2em] text-ivory/60">
                {String(active! + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
              </p>
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close photo viewer"
                autoFocus
                className="flex h-11 w-11 items-center justify-center border border-ivory/30 transition-colors hover:bg-ivory hover:text-graphite"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            <div className="relative mt-4 min-h-0 flex-1">
              <div className="media absolute inset-0 bg-graphite-soft">
                <Photo key={current.src} image={current} sizes="100vw" fit="contain" className="fade-up" />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-5">
              <p className="max-w-[620px] text-sm leading-6 text-ivory/70">
                {current.alt} · concept visual
              </p>
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous photo"
                  className="flex h-12 w-12 items-center justify-center border border-ivory/30 transition-colors hover:bg-ivory hover:text-graphite"
                >
                  <ArrowLeft size={18} strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next photo"
                  className="flex h-12 w-12 items-center justify-center border border-ivory/30 transition-colors hover:bg-ivory hover:text-graphite"
                >
                  <ArrowRight size={18} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
