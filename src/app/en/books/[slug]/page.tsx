import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import SiteChrome from "@/components/SiteChrome";
import Breadcrumbs from "@/components/Breadcrumbs";
import Reveal from "@/components/motion/Reveal";
import JsonLd from "@/components/JsonLd";
import { BOOKS } from "@/data/site";
import { bookSchema, breadcrumbSchema } from "@/lib/schema";

export function generateStaticParams() {
  return BOOKS.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const book = BOOKS.find((b) => b.slug === slug);
  if (!book) return {};
  return {
    title: book.titleEn,
    description: book.description.en,
    alternates: {
      canonical: `/en/books/${book.slug}`,
      languages: { "es-ES": `/libros/${book.slug}`, "en-US": `/en/books/${book.slug}` },
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const book = BOOKS.find((b) => b.slug === slug);
  if (!book) notFound();

  return (
    <SiteChrome locale="en">
      <JsonLd
        data={[
          bookSchema(book, "en"),
          breadcrumbSchema([
            { name: "Home", path: "/en" },
            { name: "Books", path: "/en/books" },
            { name: book.titleEn, path: `/en/books/${book.slug}` },
          ]),
        ]}
      />
      <div className="container-page pt-32 pb-20">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/en" },
            { name: "Books", path: "/en/books" },
            { name: "Unstoppable and Abundant", path: `/en/books/${book.slug}` },
          ]}
        />
        <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:items-start">
          <Reveal>
            <div className="relative mx-auto aspect-[2/3] w-full max-w-sm overflow-hidden rounded-xl border border-border bg-surface accent-glow">
              <div className="flex h-full items-center justify-center p-8 text-center text-muted-2">
                <span className="text-sm">Book cover</span>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">
              By {book.author}
            </p>
            <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              {book.titleEn}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted">{book.description.en}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {book.topics.en.map((topic) => (
                <span key={topic} className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted">
                  {topic}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {book.amazonUrl ? (
                <a href={book.amazonUrl} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-[#05060a]">
                  Buy on Amazon
                </a>
              ) : (
                <Link href="/en#contacto" className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-[#05060a]">
                  Check availability
                </Link>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </SiteChrome>
  );
}
