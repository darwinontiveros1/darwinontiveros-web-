"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

/**
 * Desplaza suavemente su contenido según el scroll (efecto parallax).
 * `offset` = cuántos px se mueve en total mientras cruza el viewport.
 */
export default function Parallax({
  children,
  offset = 60,
  className,
}: {
  children: ReactNode;
  offset?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yRaw = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  const y = useSpring(yRaw, { stiffness: 120, damping: 30, restDelta: 0.5 });

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
