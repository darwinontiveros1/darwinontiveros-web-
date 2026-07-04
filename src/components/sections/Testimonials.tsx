import { TESTIMONIALS, TRUSTPILOT, type Locale } from "@/data/site";
import { Section, SectionHeading } from "./Section";
import Reveal from "@/components/motion/Reveal";

export default function Testimonials({ locale }: { locale: Locale }) {
  const t =
    locale === "en"
      ? {
          eyebrow: "Testimonials",
          title: "What people say after working with Darwin",
          subtitle:
            "Real, verified reviews from people who took their sales and mindset to another level.",
          verified: "Verified on Trustpilot",
          scoreLabel: "TrustScore",
          seeAll: `See all ${TRUSTPILOT.totalReviews} reviews`,
          basedOn: `Based on ${TRUSTPILOT.totalReviews} reviews`,
        }
      : {
          eyebrow: "Testimonios",
          title: "Lo que dicen quienes han trabajado con Darwin",
          subtitle:
            "Reseñas reales y verificadas de personas que llevaron sus ventas y su mentalidad a otro nivel.",
          verified: "Verificado en Trustpilot",
          scoreLabel: "TrustScore",
          seeAll: `Ver las ${TRUSTPILOT.totalReviews} reseñas`,
          basedOn: `Basado en ${TRUSTPILOT.totalReviews} reseñas`,
        };

  return (
    <Section id="testimonios">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

      {/* Resumen Trustpilot */}
      <Reveal>
        <div className="mx-auto mb-10 flex max-w-md flex-col items-center gap-3 rounded-2xl border border-border bg-surface/40 px-6 py-5 text-center sm:flex-row sm:justify-center sm:gap-5 sm:text-left">
          <TrustpilotLogo />
          <div className="flex flex-col items-center gap-1 sm:items-start">
            <div className="flex items-center gap-2">
              <Stars rating={Math.round(TRUSTPILOT.trustScore)} />
              <span className="text-sm font-bold text-foreground">
                {TRUSTPILOT.trustScore.toFixed(1)}
              </span>
              <span className="text-xs text-muted-2">/ 5</span>
            </div>
            <p className="text-xs text-muted-2">{t.basedOn}</p>
          </div>
          <a
            href={TRUSTPILOT.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 rounded-full border border-accent/40 px-4 py-1.5 text-xs font-semibold text-accent-soft transition-colors hover:bg-accent/10 sm:mt-0"
          >
            {t.seeAll}
          </a>
        </div>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((item, i) => (
          <Reveal key={item.name} delay={i} direction="scale">
            <figure className="glow-ring card card-hover flex h-full flex-col justify-between p-7">
              <div>
                <div className="flex items-center justify-between">
                  <Stars rating={item.rating} />
                  <QuoteIcon />
                </div>
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
                  <p className="flex items-center gap-1 text-xs text-muted-2">
                    <TrustpilotStar />
                    {t.verified}
                  </p>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} / 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`flex h-5 w-5 items-center justify-center rounded-sm ${
            i < rating ? "bg-[#00b67a]" : "bg-muted-2/30"
          }`}
        >
          <TrustpilotStar />
        </span>
      ))}
    </div>
  );
}

function TrustpilotStar() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="#fff" aria-hidden>
      <path d="M12 2l2.9 6.9 7.1.6-5.4 4.7 1.6 7L12 17.8 5.8 21.2l1.6-7L2 9.5l7.1-.6L12 2z" />
    </svg>
  );
}

function TrustpilotLogo() {
  return (
    <div className="flex items-center gap-1.5">
      <span className="flex h-6 w-6 items-center justify-center rounded-sm bg-[#00b67a]">
        <TrustpilotStar />
      </span>
      <span className="text-sm font-bold text-foreground">Trustpilot</span>
    </div>
  );
}

function QuoteIcon() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="text-accent/30"
      aria-hidden
    >
      <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
    </svg>
  );
}
