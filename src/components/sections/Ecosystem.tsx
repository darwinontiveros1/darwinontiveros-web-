import { REFERENCES, type Locale } from "@/data/site";
import { Section, SectionHeading } from "./Section";
import Reveal from "@/components/motion/Reveal";

export default function Ecosystem({ locale }: { locale: Locale }) {
  const t = locale === "en"
    ? { eyebrow: "Ecosystem", title: "Trained by the best", subtitle: "Formed and inspired by world-class references in personal development and business." }
    : { eyebrow: "Ecosistema", title: "Formado por los mejores", subtitle: "Formado e inspirado por referentes de clase mundial en desarrollo personal y negocios." };

  return (
    <Section id="ecosistema">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {REFERENCES.map((ref, i) => (
          <Reveal key={ref.name} delay={i}>
            <div className="card card-hover flex h-full flex-col items-center justify-center gap-2 p-6 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-surface-2 text-lg font-bold text-accent">
                {ref.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
              </div>
              <p className="text-sm font-semibold text-foreground">{ref.name}</p>
              <p className="text-xs text-muted-2">{ref.relation[locale]}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
