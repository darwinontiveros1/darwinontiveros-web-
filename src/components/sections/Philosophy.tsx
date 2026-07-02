import { type Locale } from "@/data/site";
import { Section, SectionHeading } from "./Section";
import Reveal from "@/components/motion/Reveal";

const PILLARS = {
  es: [
    {
      title: "Mentalidad Imparable",
      text: "Todo resultado extraordinario empieza en la mente. Reprogramar creencias y sostener la disciplina cuando nadie mira.",
    },
    {
      title: "Ventas con Propósito",
      text: "Vender no es empujar, es servir con convicción. Los fundamentos del cierre, el seguimiento y la relación a largo plazo.",
    },
    {
      title: "Liderazgo Multiplicador",
      text: "Un líder no se mide por lo que produce solo, sino por los equipos que forma y los líderes que desarrolla.",
    },
    {
      title: "Abundancia Integral",
      text: "El éxito real es el que se construye sin sacrificar la familia, la salud ni el propósito. Abundancia en todas las áreas.",
    },
  ],
  en: [
    {
      title: "Unstoppable Mindset",
      text: "Every extraordinary result starts in the mind. Rewiring beliefs and holding discipline when no one is watching.",
    },
    {
      title: "Sales With Purpose",
      text: "Selling isn't pushing, it's serving with conviction. The fundamentals of closing, follow-up and long-term relationships.",
    },
    {
      title: "Multiplier Leadership",
      text: "A leader isn't measured by what they produce alone, but by the teams they build and the leaders they develop.",
    },
    {
      title: "Integral Abundance",
      text: "Real success is built without sacrificing family, health or purpose. Abundance across every area of life.",
    },
  ],
} as const;

export default function Philosophy({ locale }: { locale: Locale }) {
  const t = locale === "en"
    ? { eyebrow: "Philosophy", title: "The four pillars", subtitle: "The principles behind every talk, mentorship and page of the book." }
    : { eyebrow: "Filosofía", title: "Los cuatro pilares", subtitle: "Los principios detrás de cada conferencia, mentoría y página del libro." };

  return (
    <Section id="filosofia" className="bg-background-soft">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />
      <div className="grid gap-4 sm:grid-cols-2">
        {PILLARS[locale].map((pillar, i) => (
          <Reveal key={pillar.title} delay={i}>
            <div className="card card-hover h-full p-7">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-accent-dim bg-accent/10 text-sm font-bold text-accent">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                {pillar.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {pillar.text}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
