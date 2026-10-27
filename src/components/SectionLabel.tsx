import type { ReactNode } from "react";

export default function SectionLabel({ children }: { children: ReactNode }) {
  return <span className="eyebrow text-accent">{children}</span>;
}
