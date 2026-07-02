import { STATS, type Locale } from "@/data/site";
import Reveal from "@/components/motion/Reveal";

export default function Stats({ locale }: { locale: Locale }) {
  const stats = STATS[locale];
  return (
    <div className="border-y border-border bg-background-soft">
      <div className="container-page grid grid-cols-2 gap-px sm:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i} className="px-4 py-10 text-center">
            <p className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              {s.value}
            </p>
            <p className="mt-2 text-sm text-muted">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
