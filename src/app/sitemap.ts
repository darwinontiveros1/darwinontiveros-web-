import type { MetadataRoute } from "next";
import { SITE, BOOKS } from "@/data/site";
import { POSTS } from "@/data/blog";

// ============================================================================
// sitemap.xml dinámico — incluye todas las URLs ES y EN, con hreflang
// (alternates.languages) para que Google entienda el emparejamiento bilingüe.
// ============================================================================

const base = SITE.url;

// Pares ES/EN de rutas estáticas: [rutaES, rutaEN].
const STATIC_PAIRS: [string, string][] = [
  ["/", "/en"],
  ["/sobre-mi", "/en/about"],
  ["/conferencias", "/en/speaking"],
  ["/libros", "/en/books"],
  ["/prensa", "/en/press"],
  ["/blog", "/en/blog"],
];

function entry(
  esPath: string,
  enPath: string,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
): MetadataRoute.Sitemap {
  const languages = {
    es: `${base}${esPath === "/" ? "" : esPath}`,
    en: `${base}${enPath}`,
  };
  return [
    {
      url: `${base}${esPath === "/" ? "" : esPath}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
      alternates: { languages },
    },
    {
      url: `${base}${enPath}`,
      lastModified: new Date(),
      changeFrequency,
      priority: Math.max(0.1, priority - 0.1),
      alternates: { languages },
    },
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = STATIC_PAIRS.flatMap(([es, en], i) =>
    entry(es, en, i === 0 ? 1 : 0.8, i === 0 ? "weekly" : "monthly"),
  );

  const bookEntries = BOOKS.flatMap((b) =>
    entry(`/libros/${b.slug}`, `/en/books/${b.slug}`, 0.7, "monthly"),
  );

  const postEntries = POSTS.flatMap((p) =>
    entry(`/blog/${p.slug}`, `/en/blog/${p.slug}`, 0.6, "yearly"),
  );

  return [...staticEntries, ...bookEntries, ...postEntries];
}
