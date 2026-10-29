import type { Img } from "./images";

// Posts and reels from the studio's Instagram, shown as a carousel on the
// homepage. Two ways to add one, and they can be mixed:
//
// 1. Link only: paste the reel or post link ("Copy link" on Instagram).
//    It shows as Instagram's own embed, which plays in place. Quickest,
//    but it carries Instagram's header and footer and loads its player.
//
// 2. Link + saved image: save the cover or photo into
//    /public/images/instagram/ and add `image`. It shows as a styled tile
//    matching the site, opening the post on Instagram when clicked.
//    (Instagram's own image links expire, so the image must be saved here.)
//
// Newest first. Six to twelve is plenty.
export type InstagramPost = {
  url: string; // e.g. "https://www.instagram.com/reel/ABC123xyz/"
  image?: Img; // e.g. { src: "/images/instagram/steel-kitchen.jpg", alt: "..." }
  caption?: string; // a short line shown on hover, optional
};

// Switch the Instagram section on or off. Off hides it from the homepage;
// the posts below are kept either way.
export const showInstagram = false;

export const instagramPosts: InstagramPost[] = [
  { url: "https://www.instagram.com/sahyadristeelstudio/reel/De_vFUWsHoe/" },
  { url: "https://www.instagram.com/sahyadristeelstudio/reel/DeCBtRDB2a6/" },
  { url: "https://www.instagram.com/sahyadristeelstudio/reel/DdwBDMsRIky/" },
  { url: "https://www.instagram.com/sahyadristeelstudio/reel/Dc5_AAwtHhW/" },
  { url: "https://www.instagram.com/sahyadristeelstudio/reel/DcD3nXsg6U9/" },
];

