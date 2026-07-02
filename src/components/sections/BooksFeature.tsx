import Link from "next/link";
import { BOOKS, type Locale } from "@/data/site";
import { Section, SectionHeading } from "./Section";
import Reveal from "@/components/motion/Reveal";

export default function BooksFeature({ locale }: { locale: Locale }) {
  const book = BOOKS[0];
  const t = locale === "en"
    ? { eyebrow: "Book", title: "Unstoppable and Abundant", cta: "Discover the book", by: "By Darwin Ontiveros" }
    : { eyebrow: "Libro", title: "Imparable y Abundante", cta: "Descubre el libro", by: "Por Darwin Ontiveros" };
  const bookHref = locale === "en" ? `/en/books/${book.slug}` : `/libros/${book.slug}`;
  const title = locale === "en" ? book.titleEn : book.title;

  return (
    <Section id="libros" className="bg-background-soft">
      <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-center">
        <Reveal>
          <div className="relative mx-auto aspect-[2/3] w-full max-w-xs overflow-hidden rounded-xl border border-border bg-surface accent-glow">
            {/* Reemplazar con portada real en /public/books/imparable-y-abundante.jpg */}
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-surface to-surface-2 p-6 text-center text-muted-2">
              <span className="text-sm">Portada del libro</span>
            </div>
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
                  className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted"
                >
                  {topic}
                </span>
              ))}
            </div>
            <Link
              href={bookHref}
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-[#05060a] transition-transform hover:scale-[1.03]"
            >
              {t.cta} <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
