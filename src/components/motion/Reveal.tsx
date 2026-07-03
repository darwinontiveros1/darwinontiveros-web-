"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "scale";

const OFFSET = 28;

function hidden(direction: Direction) {
  switch (direction) {
    case "down":
      return { opacity: 0, y: -OFFSET };
    case "left":
      return { opacity: 0, x: OFFSET };
    case "right":
      return { opacity: 0, x: -OFFSET };
    case "scale":
      return { opacity: 0, scale: 0.92 };
    case "up":
    default:
      return { opacity: 0, y: OFFSET };
  }
}

/**
 * Anima un bloque al entrar en el viewport.
 * - `direction` controla desde dónde entra.
 * - `once={false}` re-dispara la animación al subir y bajar.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
  direction = "up",
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "span";
  direction?: Direction;
  once?: boolean;
}) {
  const MotionTag = motion[as];

  const variants: Variants = {
    hidden: hidden(direction),
    visible: (i: number = 0) => ({
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.65,
        delay: i * 0.09,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <MotionTag
      className={className}
      variants={variants}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px", amount: 0.2 }}
    >
      {children}
    </MotionTag>
  );
}
