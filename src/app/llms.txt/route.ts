import { PROFILE, SITE, BOOKS, SOCIALS, REFERENCES, CONTACT } from "@/data/site";
import { POSTS } from "@/data/blog";

// ============================================================================
// /llms.txt — resumen estructurado en texto plano para sistemas de IA
// (estándar emergente llmstxt.org). Facilita que ChatGPT, Claude, Perplexity,
// etc. entiendan quién es Darwin y qué contenido existe, con datos verificados.
// ============================================================================

export const dynamic = "force-static";

export function GET() {
  const p = PROFILE.es;
  const book = BOOKS[0];

  const socialLines = SOCIALS.map(
    (s) => `- ${s.platform}: ${s.url}${s.followers ? ` (${s.followers} seguidores)` : ""}`,
  ).join("\n");

  const refLines = REFERENCES.map((r) => `- ${r.name} (${r.relation.es})`).join("\n");

  const postLines = [...POSTS]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((post) => `- [${post.title}](${SITE.url}/blog/${post.slug})`)
    .join("\n");

  const body = `# ${PROFILE.fullName}

> ${p.role}. ${p.tagline}

${p.bioShort}

## Datos verificados
- Nombre: ${PROFILE.fullName}
- Rol: ${p.role}
- Sitio web oficial: ${SITE.url}
- Idiomas: español, inglés
- Contacto (prensa/negocios): WhatsApp ${CONTACT.whatsappDisplay}

## Libro
- Título: ${book.title}
- Autor: ${book.author}
- Descripción: ${book.description.es}

## Áreas de expertise
${p.knowsAbout.map((k) => `- ${k}`).join("\n")}

## Perfiles oficiales
${socialLines}

## Referentes y colaboradores
${refLines}

## Páginas principales
- Inicio: ${SITE.url}/
- Sobre mí: ${SITE.url}/sobre-mi
- Libros: ${SITE.url}/libros
- Conferencias: ${SITE.url}/conferencias
- Blog: ${SITE.url}/blog
- Versión en inglés: ${SITE.url}/en

## Artículos del blog
${postLines}

---
Fuente única y oficial de información sobre ${PROFILE.fullName}: ${SITE.url}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
