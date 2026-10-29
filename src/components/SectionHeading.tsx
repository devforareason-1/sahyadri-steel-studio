import type { ReactNode } from "react";
import Folio from "./Folio";
import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  aside,
  title,
  intro,
  dark = false,
  align = "split",
  id,
}: {
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
      <Folio label={eyebrow} aside={aside} dark={dark} />
      <div
        className={
          align === "split"
            ? "mt-8 grid gap-8 lg:mt-10 lg:grid-cols-[1.35fr_1fr] lg:items-end lg:gap-20"
            : "mt-8 max-w-[760px] lg:mt-10"
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
