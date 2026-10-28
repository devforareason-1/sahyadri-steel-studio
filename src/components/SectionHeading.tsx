import type { ReactNode } from "react";
import Folio from "./Folio";
import Reveal from "./Reveal";

export default function SectionHeading({
  number,
  eyebrow,
  aside,
  title,
  intro,
  dark = false,
  align = "split",
  id,
}: {
  number: string;
  eyebrow: string;
  aside?: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
  dark?: boolean;
  align?: "split" | "stack";
  id?: string;
}) {
  const muted = dark ? "text-ivory/70" : "text-muted";

  return (
    <Reveal>
      <Folio number={number} label={eyebrow} aside={aside} dark={dark} />
      <div
        className={
          align === "split"
            ? "mt-12 grid gap-8 lg:mt-16 lg:grid-cols-[1.35fr_1fr] lg:items-end lg:gap-20"
            : "mt-12 max-w-[760px] lg:mt-16"
        }
      >
        <h2 id={id} className="display h-lg">
          {title}
        </h2>
        {intro && (
          <p
            className={`lede max-w-[440px] ${muted} ${
              align === "stack" ? "mt-6" : "lg:justify-self-end lg:pb-2"
            }`}
          >
            {intro}
          </p>
        )}
      </div>
    </Reveal>
  );
}
