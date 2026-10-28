import type { ReactNode } from "react";
import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  dark = false,
  align = "split",
  id,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  dark?: boolean;
  align?: "split" | "stack";
  id?: string;
}) {
  const accent = dark ? "text-champagne" : "text-champagne-ink";
  const muted = dark ? "text-ivory/70" : "text-muted";

  return (
    <Reveal
      className={
        align === "split"
          ? "grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:items-end lg:gap-20"
          : "max-w-[760px]"
      }
    >
      <div>
        <p className={`eyebrow ${accent}`}>{eyebrow}</p>
        <h2 id={id} className="display h-lg mt-6">
          {title}
        </h2>
      </div>
      {intro && (
        <p
          className={`lede max-w-[460px] ${muted} ${
            align === "stack" ? "mt-6" : "lg:justify-self-end lg:pb-2"
          }`}
        >
          {intro}
        </p>
      )}
    </Reveal>
  );
}
