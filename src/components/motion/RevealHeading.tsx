"use client";

import { motion, type Variants } from "framer-motion";

/**
 * Encabezado de sección con entrada en cascada: eyebrow → título → subtítulo
 * aparecen en secuencia con un efecto de "entrar en foco" (blur → nítido).
 * Se dispara al entrar en el viewport durante el scroll.
 */
const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function RevealHeading({
  eyebrow,
  title,
  subtitle,
  className = "mb-12 max-w-2xl",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px", amount: 0.3 }}
    >
      {eyebrow && (
        <motion.p
          variants={item}
          className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent"
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        variants={item}
        className="text-3xl font-bold tracking-tight sm:text-4xl"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={item}
          className="mt-4 text-lg leading-relaxed text-muted"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
