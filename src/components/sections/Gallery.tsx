import Image from "next/image";
import type { Locale } from "@/data/site";
import { Section, SectionHeading } from "./Section";
import Reveal from "@/components/motion/Reveal";

type Photo = {
  src: string;
  alt: { es: string; en: string };
  caption: { es: string; en: string };
};

const FEATURED: Photo = {
  src: "/images/guinness.jpg",
  alt: {
    es: "Darwin Ontiveros junto al logo de Guinness World Records",
    en: "Darwin Ontiveros next to the Guinness World Records logo",
  },
  caption: {
    es: "Guinness World Records",
    en: "Guinness World Records",
  },
};

const PHOTOS: Photo[] = [
  {
    src: "/images/auditorio.jpg",
    alt: {
      es: "Auditorio lleno durante una conferencia de Darwin Ontiveros",
      en: "Full auditorium during a Darwin Ontiveros talk",
    },
    caption: {
      es: "Conferencias con auditorios llenos",
      en: "Talks to packed auditoriums",
    },
  },
  {
    src: "/images/conferencia-1.jpg",
    alt: {
      es: "Darwin Ontiveros en el escenario de una conferencia",
      en: "Darwin Ontiveros on a conference stage",
    },
    caption: {
      es: "En el escenario",
      en: "On stage",
    },
  },
  {
    src: "/images/conferencia-2.jpg",
    alt: {
      es: "Darwin Ontiveros presentando en el evento Beyond Wealth",
      en: "Darwin Ontiveros presenting at the Beyond Wealth event",
    },
    caption: {
      es: "Eventos internacionales",
      en: "International events",
    },
  },
  {
    src: "/images/equipo.jpg",
    alt: {
      es: "Darwin Ontiveros con su equipo y comunidad",
      en: "Darwin Ontiveros with his team and community",
    },
    caption: {
      es: "Comunidad y equipo",
      en: "Community and team",
    },
  },
];

export default function Gallery({ locale }: { locale: Locale }) {
  const t =
    locale === "en"
      ? {
          eyebrow: "Trajectory",
          title: "Impact that speaks for itself",
          subtitle:
            "From a Guinness World Records milestone to stages filled with people ready to transform their mindset.",
        }
      : {
          eyebrow: "Trayectoria",
          title: "Un impacto que habla por sí solo",
          subtitle:
            "De un hito Guinness World Records a escenarios llenos de personas listas para transformar su mentalidad.",
        };

  return (
    <Section id="galeria" className="bg-surface/30">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

      <div className="grid gap-5 lg:grid-cols-2">
        <Reveal>
          <figure className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-surface">
            <Image
              src={FEATURED.src}
              alt={FEATURED.alt[locale]}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#05060a]/90 to-transparent p-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent-soft backdrop-blur">
                {FEATURED.caption[locale]}
              </span>
            </figcaption>
          </figure>
        </Reveal>

        <div className="grid grid-cols-2 gap-5">
          {PHOTOS.map((photo) => (
            <Reveal key={photo.src}>
              <figure className="group relative aspect-square overflow-hidden rounded-2xl border border-border bg-surface">
                <Image
                  src={photo.src}
                  alt={photo.alt[locale]}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#05060a]/90 to-transparent p-4">
                  <span className="text-xs font-medium text-foreground">
                    {photo.caption[locale]}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
