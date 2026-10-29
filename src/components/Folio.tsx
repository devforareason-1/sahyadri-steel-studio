import type { ReactNode } from "react";

// The label row that opens a section: a hairline, the section's name, and
// an optional note beside it, set in the mono like a drawing's notes.
export default function Folio({
  label,
  aside,
  dark = false,
  className = "",
}: {
  label: string;
  aside?: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={`folio ${dark ? "text-ivory/60" : "text-muted"} ${className}`}>
      <p>{label}</p>
      {aside && (
        <span>
          <span aria-hidden="true" className="mr-3.5 opacity-50">/</span>
          {aside}
        </span>
      )}
    </div>
  );
}
