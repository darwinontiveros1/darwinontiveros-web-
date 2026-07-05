import type { Metadata } from "next";
import Image from "next/image";
import SiteChrome from "@/components/SiteChrome";
import Breadcrumbs from "@/components/Breadcrumbs";
import Faq from "@/components/Faq";
import Reveal from "@/components/motion/Reveal";
import JsonLd from "@/components/JsonLd";
import { PROFILE, REFERENCES, PROFILE as P } from "@/data/site";
import { FAQS } from "@/data/site";
import { faqSchema, breadcrumbSchema } from "@/lib/schema";

const p = PROFILE.es;

export const metadata: Metadata = {
  title: "Sobre mí",
  description: p.bioShort,
  alternates: { canonical: "/sobre-mi", languages: { "es-ES": "/sobre-mi", "en-US": "/en/about" } },
};

export default function Page() {
  const paragraphs = p.bioLong.split("\n\n");
  return (
    <SiteChrome locale="es">
      <JsonLd
        data={[
          faqSchema(FAQS.about.es),
          breadcrumbSchema([
            { name: "Inicio", path: "/" },
            { name: "Sobre mí", path: "/sobre-mi" },
          ]),
        ]}
      />
      <div className="container-page pt-32 pb-20">
        <Breadcrumbs items={[{ name: "Inicio", path: "/" }, { name: "Sobre mí", path: "/sobre-mi" }]} />
        <Reveal>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">
            Sobre mí
          </p>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            {P.fullName}
          </h1>
          <p className="mt-4 text-lg text-muted">{p.role}</p>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <Reveal>
            <div className="space-y-5">
              {paragraphs.map((para, i) => (
                <p key={i} className="text-lg leading-relaxed text-muted">
                  {para}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <div className="relative mb-6 aspect-[3/4] w-full overflow-hidden rounded-2xl border border-border bg-[#0a0b12]">
              <Image
                src="/images/sobre-mi.jpg"
                alt={P.fullName}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-contain"
              />
            </div>
            <div className="card p-7">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-2">
                Áreas de expertise
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {p.knowsAbout.map((area) => (
                  <li
                    key={area}
                    className="rounded-full border border-border bg-surface-2 px-3 py-1 text-xs text-muted"
                  >
                    {area}
                  </li>
                ))}
              </ul>

              <h2 className="mt-8 text-sm font-semibold uppercase tracking-wider text-muted-2">
                Formación e inspiración
              </h2>
              <ul className="mt-4 space-y-3">
                {REFERENCES.map((ref) => (
                  <li key={ref.name} className="flex items-center gap-3">
                    {"photo" in ref && ref.photo && (
                      <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-border">
                        <Image src={ref.photo} alt={ref.name} fill sizes="36px" className="object-cover" />
                      </span>
                    )}
                    <span className="text-sm font-medium text-foreground">{ref.name}</span>
                    <span className="ml-auto text-xs text-muted-2">{ref.relation.es}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <div className="mt-20">
          <Reveal>
            <Faq items={FAQS.about.es} title="Preguntas frecuentes" />
          </Reveal>
        </div>
      </div>
    </SiteChrome>
  );
}
