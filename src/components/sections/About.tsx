import Link from "next/link";
import Image from "next/image";
import { PROFILE, type Locale } from "@/data/site";
import { Section, SectionHeading } from "./Section";
import Reveal from "@/components/motion/Reveal";

export default function About({ locale }: { locale: Locale }) {
  const p = PROFILE[locale];
  const t = locale === "en"
    ? { eyebrow: "About", title: "Who is Darwin Ontiveros", more: "Read full bio" }
    : { eyebrow: "Sobre mí", title: "Quién es Darwin Ontiveros", more: "Ver biografía completa" };
  const aboutHref = locale === "en" ? "/en/about" : "/sobre-mi";

  // Primer párrafo de la bio larga como resumen.
  const intro = p.bioLong.split("\n\n")[0];

  return (
    <Section id="about">
      <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:items-center">
        <Reveal>
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-border bg-[#0a0b12]">
            <Image
              src="/images/sobre-mi.jpg"
              alt={PROFILE.fullName}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-contain"
            />
          </div>
        </Reveal>
        <div>
          <SectionHeading eyebrow={t.eyebrow} title={t.title} />
          <Reveal>
            <p className="text-lg leading-relaxed text-muted">{intro}</p>
            <Link
              href={aboutHref}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-soft"
            >
              {t.more}
              <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
