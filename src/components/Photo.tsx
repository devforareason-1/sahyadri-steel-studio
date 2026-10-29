"use client";

import Image from "next/image";
import { useState } from "react";
import type { Img } from "@/data/images";

// next/image with a graceful fallback: if a photo can't load, a quiet
// travertine panel takes its place instead of a broken-image icon.
export default function Photo({
  image,
  sizes,
  priority = false,
  quality = 80,
  fit = "cover",
  className = "",
}: {
  image: Img;
  sizes: string;
  priority?: boolean;
  quality?: 70 | 75 | 80; // must be listed in images.qualities in next.config.ts
  fit?: "cover" | "contain";
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  // No src yet means the studio's own photo is still to come.
  if (failed || !image.src) {
    return (
      <div className="media-fallback" role="img" aria-label={image.alt}>
        {/* Hero images carry their own text, so skip the caption there. */}
        {!priority && (
          <span className="max-w-[280px]">
            {!image.src && (
              <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.24em] opacity-70">
                Photograph to come
              </span>
            )}
            <span className="block text-[15px] font-light leading-snug sm:text-[17px]">
              {image.alt}
            </span>
          </span>
        )}
      </div>
    );
  }

  return (
    <Image
      src={image.src}
      alt={image.alt}
      fill
      sizes={sizes}
      priority={priority}
      quality={quality}
      onError={() => setFailed(true)}
      className={`${fit === "contain" ? "object-contain" : "object-cover"} ${className}`}
    />
  );
}
