import type { ReactNode } from "react";
import Reveal from "./Reveal";

// A section's headline with its introduction under it, held to the left: the
// headline is what to read, the introduction only supports it.
export default function SectionHeading({
  title,
  intro,
  dark = false,
  id,
}: {
  title: ReactNode;
  intro?: ReactNode;
  dark?: boolean;
  id?: string;
}) {
  return (
    <Reveal className="max-w-[920px]">
      <h2 id={id} className="display h-lg">
        {title}
      </h2>
      {intro && (
        <p className={`lede mt-6 max-w-[620px] ${dark ? "text-ivory/75" : ""}`}>{intro}</p>
      )}
    </Reveal>
  );
}
