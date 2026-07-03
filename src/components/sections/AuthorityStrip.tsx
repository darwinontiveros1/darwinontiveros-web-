"use client";

import { motion } from "framer-motion";
import type { Locale } from "@/data/site";

export default function AuthorityStrip({ locale }: { locale: Locale }) {
  const label =
    locale === "en"
      ? "Recognized and featured for real, measurable impact"
      : "Reconocido y destacado por un impacto real y medible";

  const items =
    locale === "en"
      ? [
          "Bestselling Author",
          "International Conferences",
          "+23K Community",
          "Sales Mentor",
          "Keynote Speaker",
          "High-Performance Teams",
        ]
      : [
          "Autor Bestseller",
          "Conferencias Internacionales",
          "+23K de Comunidad",
          "Mentor de Ventas",
          "Conferencista",
          "Equipos de Alto Rendimiento",
        ];

  // Duplicamos para un scroll infinito sin cortes
  const loop = [...items, ...items];

  return (
    <section aria-label={label} className="relative border-y border-border bg-surface/30 py-8">
      <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-2">
        {label}
      </p>

      <div className="relative overflow-hidden">
        {/* Difuminado en los bordes */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#05060a] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#05060a] to-transparent" />

        <motion.div
          className="flex w-max items-center gap-10 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        >
          {loop.map((item, i) => (
            <span key={`${item}-${i}`} className="flex items-center gap-10">
              <span className="flex items-center gap-2 text-lg font-semibold text-muted transition-colors hover:text-accent-soft">
                <DiamondIcon />
                {item}
              </span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function DiamondIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="text-accent"
      aria-hidden
    >
      <path d="M12 2l10 10-10 10L2 12 12 2z" />
    </svg>
  );
}
