import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import SiteChrome from "@/components/SiteChrome";
import Breadcrumbs from "@/components/Breadcrumbs";
import Reveal from "@/components/motion/Reveal";
import JsonLd from "@/components/JsonLd";
import { Markdown } from "@/lib/markdown";
import { POSTS } from "@/data/blog";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE, PROFILE } from "@/data/site";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Person", name: PROFILE.fullName, url: SITE.url },
    publisher: { "@type": "Person", name: PROFILE.fullName, url: SITE.url },
    mainEntityOfPage: `${SITE.url}/blog/${post.slug}`,
    keywords: post.tags.join(", "),
    inLanguage: "es",
  };

  return (
    <SiteChrome locale="es">
      <JsonLd
        data={[
          articleSchema,
          breadcrumbSchema([
            { name: "Inicio", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />
      <article className="container-page pt-32 pb-20">
        <Breadcrumbs
          items={[
            { name: "Inicio", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title.slice(0, 40) + "…", path: `/blog/${post.slug}` },
          ]}
        />
        <Reveal>
          <div className="mb-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-border bg-surface-2 px-2.5 py-0.5 text-xs text-muted">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            {post.title}
          </h1>
          <div className="mt-4 flex items-center gap-3 text-sm text-muted-2">
            <span>{PROFILE.fullName}</span>
            <span>·</span>
            <time dateTime={post.date}>{post.date}</time>
            <span>·</span>
            <span>{post.readingMinutes} min de lectura</span>
          </div>
        </Reveal>

        <Reveal className="mt-10 max-w-3xl">
          <Markdown content={post.content} />
        </Reveal>

        <Reveal className="mt-14 max-w-3xl">
          <div className="card p-8 text-center">
            <p className="text-lg font-semibold text-foreground">
              ¿Quieres llevar esto a tu equipo?
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted">
              Contrata a Darwin para una conferencia o programa de formación en ventas.
            </p>
            <Link href="/#contacto" className="mt-6 inline-block rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-[#05060a]">
              Contacto
            </Link>
          </div>
        </Reveal>
      </article>
    </SiteChrome>
  );
}
