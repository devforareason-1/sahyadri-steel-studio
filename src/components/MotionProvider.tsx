"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

// Honour the visitor's reduced-motion setting for every Motion animation:
// movement is dropped, fades remain.
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
