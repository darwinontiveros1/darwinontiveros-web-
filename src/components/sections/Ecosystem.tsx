import Image from "next/image";
import { REFERENCES, type Locale } from "@/data/site";
import { Section, SectionHeading } from "./Section";
import Reveal from "@/components/motion/Reveal";
import Tilt3D from "@/components/motion/Tilt3D";

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
}

export default function Ecosystem({ locale }: { locale: Locale }) {
  const t = locale === "en"
    ? { eyebrow: "Ecosystem", title: "Trained by the best", subtitle: "Formed and inspired by world-class references." }
    : { eyebrow: "Ecosistema", title: "Formado por los mejores", subtitle: "Formado e inspirado por referentes de clase mundial." };

  return (
    <Section id="ecosistema">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {REFERENCES.map((ref, i) => {
          const photo = "photo" in ref ? (ref.photo as string) : null;
          return (
            <Reveal key={ref.name} delay={i} className="h-full">
              <Tilt3D className="h-full">
              <div className="card card-hover flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
                {photo ? (
                  <div className="relative h-20 w-20 overflow-hidden rounded-full border border-border ring-1 ring-accent/20">
                    <Image
                      src={photo}
                      alt={ref.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border border-border bg-surface-2 text-lg font-bold text-accent">
                    {initials(ref.name)}
                  </div>
                )}
                <p className="text-sm font-semibold text-foreground">{ref.name}</p>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-accent">
                  {ref.relation[locale]}
                </p>
                <p className="text-xs leading-snug text-muted-2">
                  {ref.expertise[locale]}
                </p>
              </div>
              </Tilt3D>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
