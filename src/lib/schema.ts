// ============================================================================
// Generadores de Schema.org JSON-LD
// Cubre: Person (con sameAs, interactionStatistic, knowsAbout, alumniOf),
// WebSite, Book, FAQPage, BreadcrumbList.
// Reglas del DAB: solo URLs verificadas, follower counts exactos.
// ============================================================================

import {
  SITE,
  PROFILE,
  SOCIALS,
  BOOKS,
  REFERENCES,
  AUTHORITY_LINKS,
  AWARDS,
  MEMBERSHIPS,
  type Locale,
} from "@/data/site";

const personId = `${SITE.url}/#person`;
const websiteId = `${SITE.url}/#website`;

/** Schema.org Person completo — la pieza central para Google + IAs. */
export function personSchema(locale: Locale = "es") {
  const p = PROFILE[locale];

  // sameAs combina redes verificadas + plataformas de autoridad (Fase 4).
  const sameAs = [...SOCIALS.map((s) => s.url), ...AUTHORITY_LINKS];

  const interactionStatistic = SOCIALS.filter((s) => s.followers != null).map(
    (s) => ({
      "@type": "InteractionCounter",
      interactionType: s.interactionType,
      userInteractionCount: s.followers,
      name: s.platform,
    }),
  );

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId,
    name: PROFILE.fullName,
    givenName: "Darwin",
    familyName: "Ontiveros",
    url: SITE.url,
    jobTitle: p.role,
    description: p.bioShort,
    gender: "https://schema.org/Male",
    nationality: { "@type": "Country", name: "Venezuela" },
    knowsLanguage: ["es", "en"],
    knowsAbout: p.knowsAbout,
    sameAs,
    interactionStatistic,
    author: BOOKS.map((b) => ({
      "@type": "Book",
      name: b.title,
      inLanguage: b.inLanguage,
    })),
    // Referentes/mentores como conexiones de autoridad.
    knows: REFERENCES.map((r) => ({ "@type": "Person", name: r.name })),
    worksFor: {
      "@type": "Organization",
      name: "Darwin Ontiveros",
      url: SITE.url,
    },
    // Campos opcionales — solo se incluyen si hay datos reales (Fase 4).
    ...(AWARDS.length ? { award: AWARDS } : {}),
    ...(MEMBERSHIPS.length
      ? {
          memberOf: MEMBERSHIPS.map((m) => ({
            "@type": "Organization",
            name: m.name,
            ...(m.url ? { url: m.url } : {}),
          })),
        }
      : {}),
    mainEntityOfPage: SITE.url,
  };
}

/** WebSite schema con SearchAction. */
export function websiteSchema(locale: Locale = "es") {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    url: SITE.url,
    name: PROFILE.fullName,
    inLanguage: locale,
    publisher: { "@id": personId },
    description: PROFILE[locale].bioShort,
  };
}

/** Book schema para páginas de libros. */
export function bookSchema(
  book: (typeof BOOKS)[number],
  locale: Locale = "es",
) {
  return {
    "@context": "https://schema.org",
    "@type": "Book",
    name: locale === "en" ? book.titleEn : book.title,
    author: { "@type": "Person", "@id": personId, name: book.author },
    inLanguage: book.inLanguage,
    description: book.description[locale],
    about: book.topics[locale],
    image: `${SITE.url}${book.cover}`,
    url: `${SITE.url}/libros/${book.slug}`,
    ...(book.amazonUrl ? { sameAs: [book.amazonUrl] } : {}),
  };
}

/** FAQPage schema. */
export function faqSchema(
  faqs: readonly { q: string; a: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** BreadcrumbList schema. */
export function breadcrumbSchema(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE.url}${item.path}`,
    })),
  };
}

/** SiteNavigationElement schema. */
export function navigationSchema(
  items: readonly { href: string; label: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    name: items.map((i) => i.label),
    url: items.map((i) => `${SITE.url}${i.href}`),
  };
}
