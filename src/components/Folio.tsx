import type { ReactNode } from "react";

// The running head that opens each chapter of the page: a hairline, a
// chapter number and a label, with an optional note on the right.
export default function Folio({
  number,
  label,
  aside,
  dark = false,
  className = "",
}: {
  number: string;
  label: string;
  aside?: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={`folio ${dark ? "text-ivory/60" : "text-muted"} ${className}`}>
      <p className="flex items-baseline gap-4">
        <span className={`folio-num ${dark ? "text-champagne" : "text-champagne-ink"}`}>
          {number}
        </span>
        <span>{label}</span>
      </p>
      {aside && <span className="hidden text-right sm:block">{aside}</span>}
    </div>
  );
}
