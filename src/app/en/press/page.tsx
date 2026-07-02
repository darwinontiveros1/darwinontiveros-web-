import type { Metadata } from "next";
import Link from "next/link";
import SiteChrome from "@/components/SiteChrome";
import Breadcrumbs from "@/components/Breadcrumbs";
import Reveal from "@/components/motion/Reveal";
import JsonLd from "@/components/JsonLd";
import { PRESS } from "@/data/press";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Press",
  description: "Media mentions and appearances of Darwin Ontiveros.",
  alternates: { canonical: "/en/press", languages: { "es-ES": "/prensa", "en-US": "/en/press" } },
};

export default function Page() {
  return (
    <SiteChrome locale="en">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/en" },
          { name: "Press", path: "/en/press" },
        ])}
      />
      <div className="container-page pt-32 pb-20">
        <Breadcrumbs items={[{ name: "Home", path: "/en" }, { name: "Press", path: "/en/press" }]} />
        <Reveal>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">Press</p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">In the media</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Appearances, interviews and mentions of Darwin Ontiveros in the media.
          </p>
        </Reveal>

        {PRESS.length > 0 ? (
          <div className="mt-14 space-y-3">
            {PRESS.map((item, i) => (
              <Reveal key={item.url} delay={i}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card card-hover flex items-center justify-between gap-6 p-6"
                >
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                      {item.outlet}
                    </p>
                    <h2 className="mt-1 text-base font-semibold text-foreground">
                      {item.title}
                    </h2>
                  </div>
                  <span className="shrink-0 text-xs text-muted-2">{item.date}</span>
                </a>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal className="mt-14">
            <div className="card p-10 text-center">
              <p className="text-lg font-semibold text-foreground">Coming soon</p>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted">
                We are securing the first media appearances. For press inquiries and
                interviews, please get in touch.
              </p>
              <Link
                href="/en#contacto"
                className="mt-6 inline-block rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-[#05060a]"
              >
                Press contact
              </Link>
            </div>
          </Reveal>
        )}
      </div>
    </SiteChrome>
  );
}
