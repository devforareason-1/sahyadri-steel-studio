"use client";

type LoaderArgs = { src: string; width: number; quality?: number };

// Unsplash (and similar CDNs) resize on the fly via query params, which lets
// next/image generate a proper srcset on a static site.
export default function imageLoader({ src, width, quality }: LoaderArgs) {
  if (src.startsWith("https://images.unsplash.com")) {
    const url = new URL(src);
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality || 75));
    return url.toString();
  }

  // Local files in /public need the GitHub Pages base path.
  if (src.startsWith("/")) {
    const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
    return src.startsWith(base) ? src : `${base}${src}`;
  }

  return src;
}
