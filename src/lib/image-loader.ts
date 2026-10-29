"use client";

type LoaderArgs = { src: string; width: number; quality?: number };

// Unsplash and Pexels resize on the fly via query params, which lets
// next/image generate a proper srcset straight from their CDNs.
export default function imageLoader({ src, width, quality }: LoaderArgs) {
  if (src.startsWith("https://images.unsplash.com")) {
    const url = new URL(src);
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality || 75));
    return url.toString();
  }

  if (src.startsWith("https://images.pexels.com")) {
    const url = new URL(src);
    url.searchParams.set("auto", "compress");
    url.searchParams.set("cs", "tinysrgb");
    url.searchParams.set("w", String(width));
    return url.toString();
  }

  // Local files in /public are served as they are.
  return src;
}
