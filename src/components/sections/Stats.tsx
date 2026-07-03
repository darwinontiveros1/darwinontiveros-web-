import { STATS, type Locale } from "@/data/site";
import Reveal from "@/components/motion/Reveal";
import CountUp from "@/components/motion/CountUp";

export default function Stats({ locale }: { locale: Locale }) {
  const stats = STATS[locale];
  return (
    <div className="relative border-y border-border bg-background-soft">
      <div className="pointer-events-none absolute inset-0 divider-glow top-0" aria-hidden />
      <div className="container-page grid grid-cols-2 gap-px sm:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal
            key={s.label}
            delay={i}
            className="group relative px-4 py-12 text-center"
          >
            <span className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-accent/0 to-transparent transition-all duration-500 group-hover:via-accent/60" />
            <CountUp
              value={s.value}
              className="block text-4xl font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent-soft sm:text-5xl"
            />
            <p className="mt-2 text-sm text-muted">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
