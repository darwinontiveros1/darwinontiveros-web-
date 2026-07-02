import type { Metadata } from "next";
import Link from "next/link";
import SiteChrome from "@/components/SiteChrome";
import Breadcrumbs from "@/components/Breadcrumbs";
import Reveal from "@/components/motion/Reveal";
import JsonLd from "@/components/JsonLd";
import { POSTS } from "@/data/blog";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Artículos de Darwin Ontiveros sobre ventas de alto rendimiento, liderazgo, mentalidad de abundancia y desarrollo personal.",
  alternates: { canonical: "/blog", languages: { "es-ES": "/blog", "en-US": "/en/blog" } },
};

const sorted = [...POSTS].sort((a, b) => b.date.localeCompare(a.date));

export default function Page() {
  return (
    <SiteChrome locale="es">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />
      <div className="container-page pt-32 pb-20">
        <Breadcrumbs items={[{ name: "Inicio", path: "/" }, { name: "Blog", path: "/blog" }]} />
        <Reveal>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">Blog</p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Ideas sobre ventas, liderazgo y abundancia
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Estrategias prácticas y mentalidad para vender más, liderar mejor y
            construir una vida abundante.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {sorted.map((post, i) => (
            <Reveal key={post.slug} delay={i % 2}>
              <Link href={`/blog/${post.slug}`} className="card card-hover flex h-full flex-col p-7">
                <div className="mb-3 flex flex-wrap gap-2">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="rounded-full border border-border bg-surface-2 px-2.5 py-0.5 text-xs text-muted">
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-lg font-semibold leading-snug text-foreground">
                  {post.title}
                </h2>
                <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted">{post.description}</p>
                <div className="mt-4 flex items-center gap-3 text-xs text-muted-2">
                  <time dateTime={post.date}>{post.date}</time>
                  <span>·</span>
                  <span>{post.readingMinutes} min</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </SiteChrome>
  );
}
