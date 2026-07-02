import type { Metadata } from "next";
import SiteChrome from "@/components/SiteChrome";
import Breadcrumbs from "@/components/Breadcrumbs";
import Reveal from "@/components/motion/Reveal";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { PROFILE, SITE, STATS, SOCIALS, BOOKS, CONTACT } from "@/data/site";

export const metadata: Metadata = {
  title: "Media Kit",
  description:
    "Kit de prensa de Darwin Ontiveros: biografía, datos, temas, foto y contacto para medios.",
  alternates: { canonical: "/prensa/kit" },
};

const p = PROFILE.es;

export default function Page() {
  return (
    <SiteChrome locale="es">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", path: "/" },
          { name: "Prensa", path: "/prensa" },
          { name: "Media Kit", path: "/prensa/kit" },
        ])}
      />
      <div className="container-page pt-32 pb-20">
        <Breadcrumbs
          items={[
            { name: "Inicio", path: "/" },
            { name: "Prensa", path: "/prensa" },
            { name: "Media Kit", path: "/prensa/kit" },
          ]}
        />
        <Reveal>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">
            Media Kit
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Kit de prensa
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Recursos para periodistas, organizadores de eventos y colaboradores.
            Puedes usar libremente esta información y biografía.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="card p-7">
              <h2 className="text-lg font-semibold text-foreground">Biografía corta</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{p.bioShort}</p>
            </div>
          </Reveal>
          <Reveal>
            <div className="card p-7">
              <h2 className="text-lg font-semibold text-foreground">Datos rápidos</h2>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                <li><span className="text-foreground">Nombre:</span> {PROFILE.fullName}</li>
                <li><span className="text-foreground">Rol:</span> {p.role}</li>
                <li><span className="text-foreground">Web:</span> {SITE.domain}</li>
                <li><span className="text-foreground">Libro:</span> {BOOKS[0].title}</li>
                {STATS.es.map((s) => (
                  <li key={s.label}>
                    <span className="text-foreground">{s.value}</span> — {s.label}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-6">
          <div className="card p-7">
            <h2 className="text-lg font-semibold text-foreground">Biografía larga</h2>
            <div className="mt-3 space-y-4 text-sm leading-relaxed text-muted">
              {p.bioLong.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="card p-7">
              <h2 className="text-lg font-semibold text-foreground">Temas de experiencia</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.knowsAbout.map((topic) => (
                  <span
                    key={topic}
                    className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal>
            <div className="card p-7">
              <h2 className="text-lg font-semibold text-foreground">Contacto y redes</h2>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                <li>
                  <span className="text-foreground">Prensa / contacto:</span>{" "}
                  <a
                    href={`https://wa.me/${CONTACT.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent-soft"
                  >
                    WhatsApp {CONTACT.whatsappDisplay}
                  </a>
                </li>
                {SOCIALS.map((s) => (
                  <li key={s.platform}>
                    <span className="text-foreground">{s.platform}:</span>{" "}
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:text-accent-soft"
                    >
                      {s.handle}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </SiteChrome>
  );
}
