"use client";

import { motion, type Variants } from "framer-motion";

/**
 * Revela un texto palabra por palabra con una entrada cinematográfica.
 * Cada palabra sube y aparece con un pequeño desfase (stagger).
 */
const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const word: Variants = {
  hidden: { opacity: 0, y: "0.5em", filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: "0em",
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function WordReveal({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const words = text.split(" ");
  return (
    <motion.span
      variants={container}
      initial="hidden"
      animate="visible"
      aria-label={text}
    >
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          className="inline-block overflow-hidden align-bottom"
        >
          {/* El gradiente se aplica a cada palabra (el nodo que contiene el
              texto) para que background-clip:text recorte bien las letras.
              Aplicarlo al contenedor deja el texto transparente e invisible. */}
          <motion.span
            variants={word}
            className={`inline-block ${className ?? ""}`}
            aria-hidden
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
