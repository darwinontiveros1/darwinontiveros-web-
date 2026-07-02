import { SOCIALS, type Locale } from "@/data/site";
import { Section, SectionHeading } from "./Section";
import Reveal from "@/components/motion/Reveal";

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}K`;
  return String(n);
}

export default function SocialProof({ locale }: { locale: Locale }) {
  const t = locale === "en"
    ? { eyebrow: "Community", title: "Follow the journey", subtitle: "Daily content on sales, mindset and leadership across platforms." }
    : { eyebrow: "Comunidad", title: "Sigue el camino", subtitle: "Contenido diario sobre ventas, mentalidad y liderazgo en todas las plataformas." };

  return (
    <Section id="social" className="bg-background-soft">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {SOCIALS.map((s, i) => (
          <Reveal key={s.platform} delay={i}>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer me"
              className="card card-hover flex h-full flex-col justify-between gap-4 p-6"
            >
              <p className="text-sm font-semibold text-foreground">
                {s.platform}
              </p>
              <div>
                {s.followers != null ? (
                  <p className="text-2xl font-bold text-foreground">
                    {formatCount(s.followers)}
                    <span className="ml-1 text-xs font-normal text-muted-2">
                      {locale === "en" ? "followers" : "seguidores"}
                    </span>
                  </p>
                ) : (
                  <p className="text-sm text-muted">{s.handle}</p>
                )}
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
