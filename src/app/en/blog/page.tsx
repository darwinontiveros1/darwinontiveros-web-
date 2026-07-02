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
    "Articles by Darwin Ontiveros on high-performance sales, leadership, abundance mindset and personal development.",
  alternates: { canonical: "/en/blog", languages: { "es-ES": "/blog", "en-US": "/en/blog" } },
};

const sorted = [...POSTS].sort((a, b) => b.date.localeCompare(a.date));

export default function Page() {
  return (
    <SiteChrome locale="en">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/en" },
          { name: "Blog", path: "/en/blog" },
        ])}
      />
      <div className="container-page pt-32 pb-20">
        <Breadcrumbs items={[{ name: "Home", path: "/en" }, { name: "Blog", path: "/en/blog" }]} />
        <Reveal>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">Blog</p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Ideas on sales, leadership and abundance
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Practical strategies and mindset to sell more, lead better and build an
            abundant life. Articles published in Spanish.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {sorted.map((post, i) => (
            <Reveal key={post.slug} delay={i % 2}>
              <Link href={`/en/blog/${post.slug}`} className="card card-hover flex h-full flex-col p-7">
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
