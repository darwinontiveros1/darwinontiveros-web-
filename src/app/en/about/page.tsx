import type { Metadata } from "next";
import Image from "next/image";
import SiteChrome from "@/components/SiteChrome";
import Breadcrumbs from "@/components/Breadcrumbs";
import Faq from "@/components/Faq";
import Reveal from "@/components/motion/Reveal";
import JsonLd from "@/components/JsonLd";
import { PROFILE, REFERENCES, FAQS } from "@/data/site";
import { faqSchema, breadcrumbSchema } from "@/lib/schema";

const p = PROFILE.en;

export const metadata: Metadata = {
  title: "About",
  description: p.bioShort,
  alternates: { canonical: "/en/about", languages: { "es-ES": "/sobre-mi", "en-US": "/en/about" } },
};

export default function Page() {
  const paragraphs = p.bioLong.split("\n\n");
  return (
    <SiteChrome locale="en">
      <JsonLd
        data={[
          faqSchema(FAQS.about.en),
          breadcrumbSchema([
            { name: "Home", path: "/en" },
            { name: "About", path: "/en/about" },
          ]),
        ]}
      />
      <div className="container-page pt-32 pb-20">
        <Breadcrumbs items={[{ name: "Home", path: "/en" }, { name: "About", path: "/en/about" }]} />
        <Reveal>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">About</p>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            {PROFILE.fullName}
          </h1>
          <p className="mt-4 text-lg text-muted">{p.role}</p>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <Reveal>
            <div className="space-y-5">
              {paragraphs.map((para, i) => (
                <p key={i} className="text-lg leading-relaxed text-muted">{para}</p>
              ))}
            </div>
          </Reveal>
          <Reveal>
            <div className="relative mb-6 aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border bg-surface">
              <Image
                src="/images/sobre-mi.jpg"
                alt={PROFILE.fullName}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="card p-7">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-2">
                Areas of expertise
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {p.knowsAbout.map((area) => (
                  <li key={area} className="rounded-full border border-border bg-surface-2 px-3 py-1 text-xs text-muted">
                    {area}
                  </li>
                ))}
              </ul>
              <h2 className="mt-8 text-sm font-semibold uppercase tracking-wider text-muted-2">
                Training & inspiration
              </h2>
              <ul className="mt-4 space-y-3">
                {REFERENCES.map((ref) => (
                  <li key={ref.name} className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-foreground">{ref.name}</span>
                    <span className="text-xs text-muted-2">{ref.relation.en}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <div className="mt-20">
          <Reveal>
            <Faq items={FAQS.about.en} title="Frequently asked questions" />
          </Reveal>
        </div>
      </div>
    </SiteChrome>
  );
}
