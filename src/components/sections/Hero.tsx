"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { PROFILE, type Locale } from "@/data/site";

export default function Hero({ locale }: { locale: Locale }) {
  const p = PROFILE[locale];
  const fullName = PROFILE.fullName;
  const ctaPrimary = locale === "en" ? "Book a talk" : "Contrátame para tu evento";
  const ctaSecondary = locale === "en" ? "Read the book" : "Conoce el libro";
  const contactHref = locale === "en" ? "/en#contacto" : "/#contacto";
  const booksHref = locale === "en" ? "/en/books" : "/libros";
  const eyebrow = locale === "en" ? p.role : p.role;

  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" aria-hidden />
      <div className="container-page relative grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs font-medium text-muted backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {eyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="max-w-4xl text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl"
          >
            <span className="text-gradient">{p.heroHeadline}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-muted"
          >
            {p.heroSub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Link
              href={contactHref}
              className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-[#05060a] transition-transform hover:scale-[1.03] accent-glow"
            >
              {ctaPrimary}
            </Link>
            <Link
              href={booksHref}
              className="rounded-lg border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent-dim hover:bg-surface"
            >
              {ctaSecondary}
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative mx-auto w-full max-w-sm lg:max-w-none"
        >
          <div className="absolute -inset-4 rounded-3xl bg-accent/20 blur-3xl" aria-hidden />
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border bg-surface">
            <Image
              src="/images/hero.jpg"
              alt={fullName}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
