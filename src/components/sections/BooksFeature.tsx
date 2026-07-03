"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BOOKS, type Locale } from "@/data/site";
import { Section, SectionHeading } from "./Section";
import Reveal from "@/components/motion/Reveal";

export default function BooksFeature({ locale }: { locale: Locale }) {
  const book = BOOKS[0];
  const t =
    locale === "en"
      ? {
          eyebrow: "The book",
          title: "Unstoppable and Abundant",
          cta: "Discover the book",
          amazon: "Buy on Amazon",
          by: "By Darwin Ontiveros",
          badge: "Bestseller",
        }
      : {
          eyebrow: "El libro",
          title: "Imparable y Abundante",
          cta: "Conoce el libro",
          amazon: "Comprar en Amazon",
          by: "Por Darwin Ontiveros",
          badge: "Bestseller",
        };
  const bookHref = locale === "en" ? `/en/books/${book.slug}` : `/libros/${book.slug}`;
  const title = locale === "en" ? book.titleEn : book.title;

  return (
    <Section id="libros" className="bg-background-soft">
      <div className="grid gap-12 md:grid-cols-[0.85fr_1.15fr] md:items-center">
        <Reveal>
          <div className="relative mx-auto w-full max-w-xs" style={{ perspective: 1400 }}>
            {/* Halo teal detrás de la portada */}
            <div
              className="absolute -inset-6 rounded-3xl bg-accent/20 blur-3xl"
              aria-hidden
            />
            <motion.div
              initial={{ rotateY: 0 }}
              whileHover={{ rotateY: -14, rotateX: 6, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              style={{ transformStyle: "preserve-3d" }}
              className="glow-ring relative aspect-[2/3] w-full overflow-hidden rounded-xl border border-border bg-surface shadow-2xl accent-glow"
            >
              <Image
                src={book.cover}
                alt={title}
                fill
                sizes="(max-width: 768px) 80vw, 30vw"
                className="object-cover"
              />
              {/* Reflejo de luz que barre la portada */}
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent"
                aria-hidden
              />
              {/* Lomo del libro (borde 3D) */}
              <div
                className="pointer-events-none absolute inset-y-0 left-0 w-2 bg-gradient-to-r from-black/40 to-transparent"
                aria-hidden
              />
            </motion.div>

            {/* Badge flotante Bestseller */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute -right-3 top-6"
            >
              <motion.span
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="flex items-center gap-1.5 rounded-full border border-accent/40 bg-surface/90 px-3 py-1.5 text-xs font-semibold text-accent-soft shadow-xl backdrop-blur"
              >
                <StarIcon />
                {t.badge}
              </motion.span>
            </motion.div>
          </div>
        </Reveal>

        <div>
          <SectionHeading eyebrow={t.eyebrow} title={title} />
          <Reveal>
            <p className="text-lg leading-relaxed text-muted">
              {book.description[locale]}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {book.topics[locale].map((topic) => (
                <span
                  key={topic}
                  className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted transition-colors hover:border-accent-dim hover:text-accent-soft"
                >
                  {topic}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {book.amazonUrl && (
                <a
                  href={book.amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shine inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-[#05060a] transition-transform hover:scale-[1.03] accent-glow"
                >
                  <AmazonIcon />
                  {t.amazon}
                </a>
              )}
              <Link
                href={bookHref}
                className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent-dim hover:bg-surface"
              >
                {t.cta} <span aria-hidden>→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2l2.9 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 7.1-1.01L12 2z" />
    </svg>
  );
}

function AmazonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M15.93 17.09c-2.12 1.56-5.19 2.39-7.83 2.39-3.71 0-7.04-1.37-9.57-3.65-.2-.18-.02-.42.22-.28 2.72 1.58 6.09 2.54 9.56 2.54 2.35 0 4.93-.49 7.3-1.5.36-.15.66.24.32.5zm.88-1.01c-.27-.35-1.79-.16-2.48-.08-.21.02-.24-.16-.05-.29 1.21-.85 3.2-.6 3.43-.32.23.29-.06 2.28-1.2 3.23-.17.15-.34.07-.26-.12.26-.63.85-2.03.56-2.42z" />
      <path d="M14.02 13.5v-1.1c0-.17.13-.28.28-.28h4.93c.16 0 .29.11.29.28v.94c0 .16-.14.37-.38.71l-2.55 3.65c.95-.02 1.95.12 2.81.6.19.11.24.27.26.43v1.18c0 .16-.18.35-.37.25-1.51-.79-3.51-.88-5.18.01-.17.09-.35-.1-.35-.26v-1.12c0-.18 0-.49.19-.77l2.96-4.24h-2.57c-.16 0-.29-.11-.29-.28z" transform="scale(0.55) translate(2 -3)" />
    </svg>
  );
}
