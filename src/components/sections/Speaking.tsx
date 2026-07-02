import Link from "next/link";
import { SPEAKING_TOPICS, type Locale } from "@/data/site";
import { Section, SectionHeading } from "./Section";
import Reveal from "@/components/motion/Reveal";

export default function Speaking({ locale }: { locale: Locale }) {
  const topics = SPEAKING_TOPICS[locale];
  const t = locale === "en"
    ? { eyebrow: "Speaking", title: "Talks & keynotes", subtitle: "High-energy, practical sessions for companies, sales teams and events.", cta: "See speaking page" }
    : { eyebrow: "Conferencias", title: "Charlas y keynotes", subtitle: "Sesiones prácticas y de alta energía para empresas, equipos comerciales y eventos.", cta: "Ver conferencias" };
  const speakingHref = locale === "en" ? "/en/speaking" : "/conferencias";

  return (
    <Section id="speaking">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />
      <div className="grid gap-4 md:grid-cols-2">
        {topics.map((topic, i) => (
          <Reveal key={topic.title} delay={i}>
            <div className="card card-hover h-full p-7">
              <h3 className="text-lg font-semibold text-foreground">
                {topic.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {topic.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-8">
        <Link
          href={speakingHref}
          className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-soft"
        >
          {t.cta} <span aria-hidden>→</span>
        </Link>
      </Reveal>
    </Section>
  );
}
