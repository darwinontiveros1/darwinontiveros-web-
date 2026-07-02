import type { Metadata } from "next";
import Link from "next/link";
import SiteChrome from "@/components/SiteChrome";
import Breadcrumbs from "@/components/Breadcrumbs";
import Reveal from "@/components/motion/Reveal";
import JsonLd from "@/components/JsonLd";
import { BOOKS } from "@/data/site";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Libros",
  description:
    "Libros de Darwin Ontiveros. Autor de «Imparable y Abundante — Ventas Sin Límites».",
  alternates: { canonical: "/libros", languages: { "es-ES": "/libros", "en-US": "/en/books" } },
};

export default function Page() {
  return (
    <SiteChrome locale="es">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", path: "/" },
          { name: "Libros", path: "/libros" },
        ])}
      />
      <div className="container-page pt-32 pb-20">
        <Breadcrumbs items={[{ name: "Inicio", path: "/" }, { name: "Libros", path: "/libros" }]} />
        <Reveal>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">Libros</p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Publicaciones</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Herramientas prácticas para vender más, liderar mejor y vivir en abundancia.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BOOKS.map((book, i) => (
            <Reveal key={book.slug} delay={i}>
              <Link href={`/libros/${book.slug}`} className="card card-hover block h-full overflow-hidden">
                <div className="relative aspect-[2/3] w-full bg-gradient-to-br from-surface to-surface-2">
                  <div className="flex h-full items-center justify-center p-6 text-center text-muted-2">
                    <span className="text-sm">Portada</span>
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-base font-semibold text-foreground">{book.title}</h2>
                  <p className="mt-2 line-clamp-3 text-sm text-muted">{book.description.es}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </SiteChrome>
  );
}
