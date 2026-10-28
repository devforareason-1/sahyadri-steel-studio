"use client";

import { useState } from "react";

type ZoneId = "loft" | "long" | "shelves" | "short" | "drawers" | "accessories";

const zones: {
  id: ZoneId;
  title: string;
  text: string;
  rect: [number, number, number, number];
}[] = [
  {
    id: "loft",
    title: "Loft storage",
    text: "Seasonal clothing, luggage and spare bedding, kept high and out of the way.",
    rect: [40, 20, 560, 90],
  },
  {
    id: "long",
    title: "Long hanging",
    text: "Full-length space for dresses, sarees on hangers, coats and garment bags.",
    rect: [40, 110, 200, 410],
  },
  {
    id: "shelves",
    title: "Shelves",
    text: "Open shelves sized for folded knits, linen and everyday stacks.",
    rect: [240, 110, 180, 130],
  },
  {
    id: "short",
    title: "Short hanging",
    text: "Shirts and trousers hung at the right height, so no space is wasted below.",
    rect: [240, 240, 180, 130],
  },
  {
    id: "drawers",
    title: "Drawers",
    text: "Deep drawers for innerwear, accessories and the things best kept out of sight.",
    rect: [240, 370, 180, 150],
  },
  {
    id: "accessories",
    title: "Accessory storage",
    text: "Trays for watches and jewellery, with shelves for bags and shoes below.",
    rect: [420, 110, 180, 410],
  },
];

const garmentTones = ["#cbb89b", "#4a3427", "#a7acaf", "#e2d8c7", "#7d6a55", "#2a2926"];

function Garments({
  x,
  width,
  top,
  lengths,
}: {
  x: number;
  width: number;
  top: number;
  lengths: number[];
}) {
  const gap = width / lengths.length;
  return (
    <g>
      {lengths.map((len, i) => {
        const cx = x + gap * i + gap / 2;
        return (
          <g key={i}>
            <path
              d={`M${cx} ${top - 6} l-9 9 h18 z`}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity=".7"
            />
            <rect
              x={cx - 9}
              y={top + 3}
              width="18"
              height={len}
              rx="3"
              fill={garmentTones[i % garmentTones.length]}
              opacity=".85"
            />
          </g>
        );
      })}
    </g>
  );
}

function Interior() {
  return (
    <g stroke="currentColor" strokeWidth="1.25" fill="none">
      {/* Loft */}
      <line x1="240" y1="20" x2="240" y2="110" />
      <line x1="420" y1="20" x2="420" y2="110" />
      {[60, 140, 270, 345, 450, 525].map((x, i) => (
        <rect key={x} x={x} y={i % 2 ? 58 : 48} width="62" height={i % 2 ? 44 : 54} rx="2" fill="#e2d8c7" strokeWidth="1" />
      ))}

      {/* Bay A: long hanging and a shoe rail */}
      <line x1="52" y1="140" x2="228" y2="140" strokeWidth="2" />
      <Garments x={52} width={176} top={146} lengths={[300, 260, 320, 240, 290, 310, 270]} />
      <line x1="50" y1="505" x2="230" y2="490" />

      {/* Bay B: shelves, short hanging, drawers */}
      <line x1="240" y1="110" x2="240" y2="520" />
      <line x1="420" y1="110" x2="420" y2="520" />
      <line x1="240" y1="175" x2="420" y2="175" />
      <line x1="240" y1="240" x2="420" y2="240" />
      {[258, 312, 366].map((x, i) => (
        <g key={x} strokeWidth="1">
          <rect x={x} y={150 - i * 3} width="40" height={25 + i * 3} fill="#cbb89b" />
          <rect x={x + 2} y={212} width="38" height="28" fill={i === 1 ? "#4a3427" : "#ece6da"} />
        </g>
      ))}
      <line x1="252" y1="262" x2="408" y2="262" strokeWidth="2" />
      <Garments x={252} width={156} top={268} lengths={[92, 84, 96, 80, 90, 86]} />
      <line x1="240" y1="370" x2="420" y2="370" />
      {[370, 420, 470].map((y) => (
        <g key={y}>
          <rect x="246" y={y + 6} width="168" height="44" />
          <line x1="310" y1={y + 18} x2="350" y2={y + 18} strokeWidth="2" stroke="#b39668" />
        </g>
      ))}

      {/* Bay C: accessory trays, shelves, shoes */}
      <rect x="426" y="122" width="168" height="54" />
      {[454, 482, 510, 538, 566].map((x) => (
        <line key={x} x1={x} y1="126" x2={x} y2="172" strokeWidth="1" />
      ))}
      <line x1="430" y1="149" x2="590" y2="149" strokeWidth="1" />
      {[236, 300, 364].map((y, i) => (
        <g key={y}>
          <line x1="420" y1={y} x2="600" y2={y} />
          <rect x="440" y={y - 36} width="56" height="36" rx="6" fill={i === 1 ? "#4a3427" : "#cbb89b"} strokeWidth="1" />
          <rect x="512" y={y - 26} width="68" height="26" rx="3" fill="#ece6da" strokeWidth="1" />
        </g>
      ))}
      {[418, 468, 518].map((y) => (
        <g key={y}>
          <line x1="424" y1={y} x2="596" y2={y - 14} />
          {[446, 500, 554].map((x) => {
            const shelfY = y - ((x - 424) * 14) / 172;
            return (
              <rect key={x} x={x - 16} y={shelfY - 12} width="34" height="10" rx="5" fill="#2a2926" stroke="none" opacity=".75" />
            );
          })}
        </g>
      ))}
    </g>
  );
}

function Front() {
  return (
    <g stroke="currentColor" strokeWidth="1.25" fill="none">
      {/* Hinged loft doors */}
      {[40, 180, 320, 460].map((x) => (
        <g key={x}>
          <rect x={x + 2} y="22" width="136" height="86" fill="#ece6da" />
          <line x1={x + 50} y1="98" x2={x + 88} y2="98" stroke="#b39668" strokeWidth="2" />
        </g>
      ))}
      {/* Sliding glass panels in steel profiles, with a slim profile handle */}
      <rect x="42" y="112" width="282" height="406" fill="#c9d1cf" fillOpacity=".75" />
      <rect x="316" y="114" width="282" height="404" fill="#d6dcda" fillOpacity=".75" />
      <line x1="316" y1="114" x2="316" y2="518" strokeWidth="1.5" />
      <rect x="306" y="250" width="4" height="140" fill="#9fa4a7" stroke="none" />
      <rect x="590" y="250" width="4" height="140" fill="#9fa4a7" stroke="none" />
      {/* Fluting on the glass */}
      {[90, 150, 210, 270].map((x) => (
        <line key={x} x1={x} y1="118" x2={x} y2="512" strokeWidth=".5" opacity=".35" />
      ))}
      {[370, 430, 490, 550].map((x) => (
        <line key={x} x1={x} y1="118" x2={x} y2="512" strokeWidth=".5" opacity=".35" />
      ))}
    </g>
  );
}

export default function WardrobePlanner() {
  const [view, setView] = useState<"front" | "interior">("interior");
  const [active, setActive] = useState<ZoneId>("long");

  const select = (id: ZoneId) => {
    setActive(id);
    setView("interior");
  };

  const zone = zones.find((z) => z.id === active)!;

  return (
    <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
      <div>
        <div className="flex items-center justify-between gap-4">
          <p className="caption uppercase tracking-[0.2em]">
            Elevation · Illustrative
          </p>
          <div role="group" aria-label="Wardrobe view" className="flex border border-line-strong">
            {(["front", "interior"] as const).map((v) => (
              <button
                key={v}
                type="button"
                aria-pressed={view === v}
                onClick={() => setView(v)}
                className={`min-h-10 px-4 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors ${
                  view === v ? "bg-graphite text-ivory" : "hover:bg-ivory-deep"
                }`}
              >
                {v === "front" ? "Front view" : "Interior"}
              </button>
            ))}
          </div>
        </div>

        <div className="grain mt-5 border border-line bg-ivory p-4 sm:p-8">
          <svg
            viewBox="0 0 640 560"
            role="img"
            aria-label={
              view === "front"
                ? "Front elevation of a wardrobe with sliding doors and a loft above"
                : `Interior elevation of a wardrobe, highlighting the ${zone.title.toLowerCase()} zone`
            }
            className="h-auto w-full text-graphite"
          >
            <rect x="40" y="20" width="560" height="510" fill="#f5f1e9" stroke="currentColor" strokeWidth="2" />
            <line x1="40" y1="110" x2="600" y2="110" stroke="currentColor" strokeWidth="1.5" />
            <rect x="44" y="520" width="552" height="10" fill="#2a2926" />
            <line x1="10" y1="540" x2="630" y2="540" stroke="currentColor" strokeWidth=".75" opacity=".5" />

            {view === "front" ? <Front /> : <Interior />}

            {view === "interior" &&
              zones.map((z) => {
                const [x, y, w, h] = z.rect;
                const on = z.id === active;
                return (
                  <rect
                    key={z.id}
                    x={x}
                    y={y}
                    width={w}
                    height={h}
                    onMouseEnter={() => setActive(z.id)}
                    onClick={() => setActive(z.id)}
                    fill={on ? "rgba(196,168,120,.22)" : "transparent"}
                    stroke={on ? "#866a42" : "transparent"}
                    strokeWidth="2"
                    className="cursor-pointer transition-[fill,stroke] duration-500"
                  />
                );
              })}

            {/* Dimension line, purely graphic */}
            <g stroke="currentColor" strokeWidth=".75" opacity=".55">
              <line x1="40" y1="552" x2="600" y2="552" />
              <line x1="40" y1="546" x2="40" y2="558" />
              <line x1="600" y1="546" x2="600" y2="558" />
            </g>
          </svg>
        </div>
        <p className="caption mt-3">
          A sample layout. Every wardrobe is planned to your room and your
          belongings.
        </p>
      </div>

      <div>
        <ol className="border-t border-line">
          {zones.map((z, i) => {
            const on = z.id === active;
            return (
              <li key={z.id} className="border-b border-line">
                <button
                  type="button"
                  onClick={() => select(z.id)}
                  onMouseEnter={() => view === "interior" && setActive(z.id)}
                  onFocus={() => select(z.id)}
                  aria-pressed={on}
                  className="flex w-full items-baseline gap-5 py-4 text-left"
                >
                  <span className="numeral w-6 shrink-0 text-lg">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1">
                    <span
                      className={`block font-serif text-[1.45rem] leading-tight transition-colors ${
                        on ? "text-graphite" : "text-graphite/55"
                      }`}
                    >
                      {z.title}
                    </span>
                    <span
                      className={`grid transition-[grid-template-rows,opacity] duration-500 ${
                        on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <span className="overflow-hidden">
                        <span className="block pt-2 text-sm leading-6 text-muted">
                          {z.text}
                        </span>
                      </span>
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
