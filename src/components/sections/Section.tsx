import type { ReactNode } from "react";
import RevealHeading from "@/components/motion/RevealHeading";

export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`py-20 sm:py-24 ${className}`}>
      <div className="container-page">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return <RevealHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />;
}
