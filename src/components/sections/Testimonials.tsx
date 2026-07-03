import { TESTIMONIALS, type Locale } from "@/data/site";
import { Section, SectionHeading } from "./Section";
import Reveal from "@/components/motion/Reveal";

export default function Testimonials({ locale }: { locale: Locale }) {
  const t =
    locale === "en"
      ? {
          eyebrow: "Testimonials",
          title: "What people say after working with Darwin",
          subtitle:
            "Real transformations from teams and leaders who took their sales and mindset to another level.",
        }
      : {
          eyebrow: "Testimonios",
          title: "Lo que dicen quienes han trabajado con Darwin",
          subtitle:
            "Transformaciones reales de equipos y líderes que llevaron sus ventas y su mentalidad a otro nivel.",
        };

  return (
    <Section id="testimonios">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

      <div className="grid gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((item, i) => (
          <Reveal key={item.name} delay={i} direction="scale">
            <figure className="glow-ring card card-hover flex h-full flex-col justify-between p-7">
              <div>
                <QuoteIcon />
                <blockquote className="mt-4 text-base leading-relaxed text-foreground/90">
                  “{item.quote[locale]}”
                </blockquote>
              </div>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/15 text-sm font-bold text-accent-soft">
                  {item.name.charAt(0)}
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-2">{item.role[locale]}</p>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function QuoteIcon() {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="text-accent/30"
      aria-hidden
    >
      <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
    </svg>
  );
}
