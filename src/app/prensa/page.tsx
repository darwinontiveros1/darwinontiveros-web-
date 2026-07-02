import type { Metadata } from "next";
import Link from "next/link";
import SiteChrome from "@/components/SiteChrome";
import Breadcrumbs from "@/components/Breadcrumbs";
import Reveal from "@/components/motion/Reveal";
import JsonLd from "@/components/JsonLd";
import { PRESS } from "@/data/press";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Prensa",
  description:
    "Menciones y apariciones de Darwin Ontiveros en medios de comunicación.",
  alternates: { canonical: "/prensa", languages: { "es-ES": "/prensa", "en-US": "/en/press" } },
};

export default function Page() {
  return (
    <SiteChrome locale="es">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", path: "/" },
          { name: "Prensa", path: "/prensa" },
        ])}
      />
      <div className="container-page pt-32 pb-20">
        <Breadcrumbs items={[{ name: "Inicio", path: "/" }, { name: "Prensa", path: "/prensa" }]} />
        <Reveal>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">Prensa</p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">En los medios</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Apariciones, entrevistas y menciones de Darwin Ontiveros en medios de
            comunicación.
          </p>
          <Link
            href="/prensa/kit"
            className="mt-6 inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent-dim"
          >
            Ver kit de prensa →
          </Link>
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
              <p className="text-lg font-semibold text-foreground">
                Próximamente
              </p>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted">
                Estamos gestionando las primeras apariciones en medios. Para
                consultas de prensa y entrevistas, ponte en contacto.
              </p>
              <Link
                href="/#contacto"
                className="mt-6 inline-block rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-[#05060a]"
              >
                Contacto de prensa
              </Link>
            </div>
          </Reveal>
        )}
      </div>
    </SiteChrome>
  );
}
