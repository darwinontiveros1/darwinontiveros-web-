import type { Metadata } from "next";
import Link from "next/link";
import SiteChrome from "@/components/SiteChrome";
import Breadcrumbs from "@/components/Breadcrumbs";
import Faq from "@/components/Faq";
import Reveal from "@/components/motion/Reveal";
import JsonLd from "@/components/JsonLd";
import { SPEAKING_TOPICS, FAQS } from "@/data/site";
import { faqSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Conferencias",
  description:
    "Contrata a Darwin Ontiveros como conferencista: ventas de alto rendimiento, liderazgo, mentalidad de abundancia y éxito integral.",
  alternates: {
    canonical: "/conferencias",
    languages: { "es-ES": "/conferencias", "en-US": "/en/speaking" },
  },
};

export default function Page() {
  return (
    <SiteChrome locale="es">
      <JsonLd
        data={[
          faqSchema(FAQS.speaking.es),
          breadcrumbSchema([
            { name: "Inicio", path: "/" },
            { name: "Conferencias", path: "/conferencias" },
          ]),
        ]}
      />
      <div className="container-page pt-32 pb-20">
        <Breadcrumbs
          items={[{ name: "Inicio", path: "/" }, { name: "Conferencias", path: "/conferencias" }]}
        />
        <Reveal>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">
            Conferencias
          </p>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Charlas que transforman equipos y resultados
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Sesiones prácticas y de alta energía para empresas, equipos comerciales
            y eventos de desarrollo personal y negocios.
          </p>
          <Link
            href="/#contacto"
            className="mt-8 inline-block rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-[#05060a] transition-transform hover:scale-[1.03] accent-glow"
          >
            Solicitar disponibilidad
          </Link>
        </Reveal>

        <div className="mt-16 grid gap-4 md:grid-cols-2">
          {SPEAKING_TOPICS.es.map((topic, i) => (
            <Reveal key={topic.title} delay={i}>
              <div className="card card-hover h-full p-7">
                <h2 className="text-lg font-semibold text-foreground">{topic.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{topic.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-20">
          <Reveal>
            <Faq items={FAQS.speaking.es} title="Preguntas frecuentes" />
          </Reveal>
        </div>
      </div>
    </SiteChrome>
  );
}
