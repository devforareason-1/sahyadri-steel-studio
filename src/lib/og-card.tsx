import { ImageResponse } from "next/og";
import sharp from "sharp";
import type { Img } from "@/data/images";

// The picture shown when a page's link is shared on WhatsApp, Instagram or
// anywhere else: the studio's name and the page's title on the dark panel,
// beside one of the site's photographs. Text never sits on the photograph,
// so it reads whatever the picture.

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/jpeg";

const panelWidth = 700;
const photoWidth = ogSize.width - panelWidth;

const ivory = "#f5f4f0";
const champagne = "#c4a675";
const night = "#060908";

// Asks the photo's CDN for exactly the crop the card shows.
function cardPhoto(src: string) {
  if (!src) return "";
  const url = new URL(src);
  url.searchParams.set("w", String(photoWidth));
  url.searchParams.set("h", String(ogSize.height));
  url.searchParams.set("fit", "crop");
  if (url.hostname === "images.pexels.com") {
    url.searchParams.set("auto", "compress");
    url.searchParams.set("cs", "tinysrgb");
  } else {
    url.searchParams.set("q", "70");
  }
  return url.toString();
}

// ImageResponse only draws PNGs, which run to half a megabyte with a
// photograph in them; WhatsApp skips preview images much over 300 KB. The
// card is re-encoded as a JPEG at about a quarter of the size.
export async function ogCard(card: { title: string; photo: Img; note: string }) {
  const png = await drawCard(card).arrayBuffer();
  const jpeg = await sharp(Buffer.from(png)).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
  return new Response(new Uint8Array(jpeg), { headers: { "Content-Type": ogContentType } });
}

function drawCard({ title, photo, note }: { title: string; photo: Img; note: string }) {
  const src = cardPhoto(photo.src);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", backgroundColor: night, color: ivory }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: panelWidth,
            height: "100%",
            padding: "64px 64px 60px 72px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 40, fontWeight: 300, letterSpacing: "0.18em" }}>SAHYADRI</div>
            <div style={{ display: "flex", width: 262, height: 1, margin: "14px 0", backgroundColor: champagne }} />
            <div style={{ fontSize: 14, letterSpacing: "0.62em" }}>STEEL STUDIO</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 60, lineHeight: 1.06, letterSpacing: "-0.02em" }}>{title}</div>
            <div style={{ marginTop: 22, fontSize: 22, color: champagne, letterSpacing: "0.04em" }}>
              {note}
            </div>
          </div>
        </div>

        {src && (
          // eslint-disable-next-line @next/next/no-img-element -- rendered to a PNG, not a page
          <img src={src} alt="" width={photoWidth} height={ogSize.height} style={{ objectFit: "cover" }} />
        )}
      </div>
    ),
    ogSize
  );
}
