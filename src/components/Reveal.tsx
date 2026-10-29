"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

const ease = [0.2, 0.7, 0.2, 1] as const;

// "fade" lifts content in a short way; "media" unveils a photograph like a
// blind. Both play once, as the element enters the screen. Visitors who
// prefer reduced motion get the fade without movement (MotionProvider).
const variants = {
  fade: {
    hidden: { opacity: 0, y: 16 },
    shown: { opacity: 1, y: 0 },
  },
  media: {
    // The final inset sits outside the box so focus rings are not clipped.
    hidden: { clipPath: "inset(18% -16px -16px -16px)" },
    shown: { clipPath: "inset(-16px -16px -16px -16px)" },
  },
};

const tags = { div: motion.div, li: motion.li, article: motion.article };

export default function Reveal({
  children,
  className = "",
  delay = 0,
  as = "div",
  variant = "fade",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "article";
  variant?: "fade" | "media";
}) {
  const Tag = tags[as];

  return (
    <Tag
      data-reveal=""
      className={className}
      variants={variants[variant]}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -40px 0px", amount: 0.08 }}
      transition={{
        duration: variant === "media" ? 1.3 : 0.9,
        ease: variant === "media" ? [0.65, 0, 0.2, 1] : ease,
        delay: delay / 1000,
      }}
    >
      {children}
    </Tag>
  );
}
