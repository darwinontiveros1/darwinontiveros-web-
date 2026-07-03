"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { PROFILE, SOCIALS, type Locale } from "@/data/site";
import WordReveal from "@/components/motion/WordReveal";
import Magnetic from "@/components/motion/Magnetic";

export default function Hero({ locale }: { locale: Locale }) {
  const p = PROFILE[locale];
  const fullName = PROFILE.fullName;
  const ctaPrimary = locale === "en" ? "Book a talk" : "Contrátame para tu evento";
  const ctaSecondary = locale === "en" ? "Read the book" : "Conoce el libro";
  const contactHref = locale === "en" ? "/en#contacto" : "/#contacto";
  const booksHref = locale === "en" ? "/en/books" : "/libros";
  const eyebrow = p.role;
  const instagram = SOCIALS.find((s) => s.platform === "Instagram");

  // Luz + tilt que siguen el cursor sobre la foto
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), {
    stiffness: 150,
    damping: 20,
  });
  const glowX = useTransform(mx, [-0.5, 0.5], ["20%", "80%"]);
  const glowY = useTransform(my, [-0.5, 0.5], ["20%", "80%"]);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function handleLeave() {
    mx.set(0);
    my.set(0);
  }

  const bookBadgeTitle = locale === "en" ? "Bestselling author" : "Autor bestseller";
  const bookBadgeSub =
    locale === "en" ? "Unstoppable & Abundant" : "Imparable y Abundante";
  const communityLabel = locale === "en" ? "Community" : "Comunidad";
  const bookingNote =
    locale === "en"
      ? "Booking talks & mentorships now · usually replies within 24h"
      : "Agenda abierta para eventos y mentorías · respondo en menos de 24h";

  // Pills de prueba social bajo el hero
  const proofPills =
    locale === "en"
      ? [
          "+23K community",
          "Bestselling author",
          "International speaker",
          "Sales mentor",
        ]
      : [
          "+23K de comunidad",
          "Autor bestseller",
          "Conferencista internacional",
          "Mentor de ventas",
        ];

  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* Aurora animada de fondo */}
      <div className="aurora" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" aria-hidden />
      {/* Orbes de luz de fondo */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-accent/10 blur-[100px]"
        animate={{ y: [0, 30, 0], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-0 top-40 h-80 w-80 rounded-full bg-accent/10 blur-[120px]"
        animate={{ y: [0, -40, 0], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-page relative grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 flex flex-wrap items-center gap-2"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs font-medium text-muted backdrop-blur">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              {eyebrow}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent-soft backdrop-blur">
              <BookIcon />
              {locale === "en" ? "Bestselling author" : "Autor bestseller"}
            </span>
          </motion.div>

          <h1 className="max-w-4xl text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
            <WordReveal text={p.heroHeadline} className="text-gradient-animated" />
          </h1>

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
            <Magnetic>
              <Link
                href={contactHref}
                className="shine inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-[#05060a] transition-transform hover:scale-[1.03] accent-glow"
              >
                <CalendarIcon />
                {ctaPrimary}
              </Link>
            </Magnetic>
            <Magnetic strength={0.25}>
              <Link
                href={booksHref}
                className="rounded-lg border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent-dim hover:bg-surface"
              >
                {ctaSecondary}
              </Link>
            </Magnetic>
            {instagram && (
              <a
                href={instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="group inline-flex items-center gap-2 rounded-lg px-2 py-3 text-sm text-muted transition-colors hover:text-accent-soft"
              >
                <InstagramIcon />
                <span className="hidden sm:inline">{instagram.handle}</span>
              </a>
            )}
          </motion.div>

          {/* Microcopy de disponibilidad para reforzar el agendar */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="mt-4 flex items-center gap-2 text-xs text-muted-2"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {bookingNote}
          </motion.p>

          {/* Pills de prueba social */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 flex flex-wrap gap-2"
          >
            {proofPills.map((pill, i) => (
              <motion.span
                key={pill}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.45 + i * 0.08 }}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/50 px-3 py-1.5 text-xs font-medium text-muted backdrop-blur"
              >
                <CheckIcon />
                {pill}
              </motion.span>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative mx-auto w-full max-w-sm lg:max-w-none"
          style={{ perspective: 1200 }}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
        >
          <div className="absolute -inset-4 rounded-3xl bg-accent/20 blur-3xl" aria-hidden />
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border bg-surface"
          >
            <Image
              src="/images/hero.jpg"
              alt={fullName}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
            {/* Luz que sigue el cursor */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 mix-blend-soft-light"
              style={{
                background: useTransform(
                  [glowX, glowY],
                  ([x, y]) =>
                    `radial-gradient(280px circle at ${x} ${y}, rgba(3,191,181,0.35), transparent 70%)`
                ),
              }}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#05060a] via-transparent to-transparent opacity-60" />
          </motion.div>

          {/* Badge flotante: Libro */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="absolute -left-4 top-8 hidden sm:block"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="flex items-center gap-2 rounded-xl border border-border bg-surface/90 px-3 py-2 shadow-xl backdrop-blur"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 text-accent">
                <BookIcon />
              </span>
              <div className="pr-1">
                <p className="text-[10px] uppercase tracking-wider text-muted-2">
                  {bookBadgeTitle}
                </p>
                <p className="text-xs font-semibold text-foreground">{bookBadgeSub}</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Badge flotante: Comunidad */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="absolute -right-4 bottom-10 hidden sm:block"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="flex items-center gap-2 rounded-xl border border-border bg-surface/90 px-3 py-2 shadow-xl backdrop-blur"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 text-accent">
                <UsersIcon />
              </span>
              <div className="pr-1">
                <p className="text-sm font-bold text-foreground">+23.4K</p>
                <p className="text-[10px] uppercase tracking-wider text-muted-2">
                  {communityLabel}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function BookIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18M8 2v4M16 2v4" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="text-accent">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="transition-transform group-hover:scale-110">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
