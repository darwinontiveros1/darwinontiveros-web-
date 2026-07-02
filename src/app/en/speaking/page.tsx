import type { Metadata } from "next";
import Link from "next/link";
import SiteChrome from "@/components/SiteChrome";
import Breadcrumbs from "@/components/Breadcrumbs";
import Faq from "@/components/Faq";
import Reveal from "@/components/motion/Reveal";
import JsonLd from "@/components/JsonLd";
import { SPEAKING_TOPICS, FAQS } from "@/data/site";
import { faqSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Speaking",
  description:
    "Book Darwin Ontiveros as a speaker: high-performance sales, leadership, abundance mindset and integral success.",
  alternates: { canonical: "/en/speaking", languages: { "es-ES": "/conferencias", "en-US": "/en/speaking" } },
};

export default function Page() {
  return (
    <SiteChrome locale="en">
      <JsonLd
        data={[
          faqSchema(FAQS.speaking.en),
          breadcrumbSchema([
            { name: "Home", path: "/en" },
            { name: "Speaking", path: "/en/speaking" },
          ]),
        ]}
      />
      <div className="container-page pt-32 pb-20">
        <Breadcrumbs items={[{ name: "Home", path: "/en" }, { name: "Speaking", path: "/en/speaking" }]} />
        <Reveal>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">Speaking</p>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Talks that transform teams and results
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            High-energy, practical sessions for companies, sales teams and personal
            development and business events.
          </p>
          <Link href="/en#contacto" className="mt-8 inline-block rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-[#05060a] transition-transform hover:scale-[1.03] accent-glow">
            Request availability
          </Link>
        </Reveal>

        <div className="mt-16 grid gap-4 md:grid-cols-2">
          {SPEAKING_TOPICS.en.map((topic, i) => (
            <Reveal key={topic.title} delay={i}>
              <div className="card card-hover h-full p-7">
                <h2 className="text-lg font-semibold text-foreground">{topic.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{topic.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-20">
          <Reveal>
            <Faq items={FAQS.speaking.en} title="Frequently asked questions" />
          </Reveal>
        </div>
      </div>
    </SiteChrome>
  );
}
