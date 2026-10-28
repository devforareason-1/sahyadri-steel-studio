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
  fit = "cover",
  className = "",
}: {
  image: Img;
  sizes: string;
  priority?: boolean;
  fit?: "cover" | "contain";
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="media-fallback" role="img" aria-label={image.alt}>
        {/* Hero images carry their own text, so skip the caption there. */}
        {!priority && (
          <span className="max-w-[260px] text-[11px] tracking-[0.08em]">
            {image.alt}
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
      quality={80}
      onError={() => setFailed(true)}
      className={`${fit === "contain" ? "object-contain" : "object-cover"} ${className}`}
    />
  );
}
