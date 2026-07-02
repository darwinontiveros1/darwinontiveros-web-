"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Faq({
  items,
  title,
}: {
  items: readonly { q: string; a: string }[];
  title: string;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold tracking-tight">{title}</h2>
      <div className="space-y-3">
        {items.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q} className="card overflow-hidden">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                aria-expanded={isOpen}
              >
                <span className="text-sm font-semibold text-foreground sm:text-base">
                  {item.q}
                </span>
                <span
                  className={`shrink-0 text-accent transition-transform ${isOpen ? "rotate-45" : ""}`}
                  aria-hidden
                >
                  +
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-sm leading-relaxed text-muted">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
