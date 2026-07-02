import type { Metadata } from "next";
import Link from "next/link";
import SiteChrome from "@/components/SiteChrome";
import Breadcrumbs from "@/components/Breadcrumbs";
import Reveal from "@/components/motion/Reveal";
import JsonLd from "@/components/JsonLd";
import { BOOKS } from "@/data/site";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Books",
  description:
    "Books by Darwin Ontiveros. Author of “Unstoppable and Abundant — Sales Without Limits.”",
  alternates: { canonical: "/en/books", languages: { "es-ES": "/libros", "en-US": "/en/books" } },
};

export default function Page() {
  return (
    <SiteChrome locale="en">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/en" },
          { name: "Books", path: "/en/books" },
        ])}
      />
      <div className="container-page pt-32 pb-20">
        <Breadcrumbs items={[{ name: "Home", path: "/en" }, { name: "Books", path: "/en/books" }]} />
        <Reveal>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">Books</p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Publications</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Practical tools to sell more, lead better and live in abundance.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BOOKS.map((book, i) => (
            <Reveal key={book.slug} delay={i}>
              <Link href={`/en/books/${book.slug}`} className="card card-hover block h-full overflow-hidden">
                <div className="relative aspect-[2/3] w-full bg-gradient-to-br from-surface to-surface-2">
                  <div className="flex h-full items-center justify-center p-6 text-center text-muted-2">
                    <span className="text-sm">Cover</span>
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-base font-semibold text-foreground">{book.titleEn}</h2>
                  <p className="mt-2 line-clamp-3 text-sm text-muted">{book.description.en}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </SiteChrome>
  );
}
