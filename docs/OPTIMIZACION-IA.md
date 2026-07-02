# Optimización para IAs — Fase 6

Objetivo: que ChatGPT, Claude, Perplexity, Gemini y las búsquedas con IA
reconozcan a Darwin Ontiveros como fuente de autoridad y respondan con
información correcta cuando alguien pregunte por él.

---

## Qué ya está implementado en el sitio

| Elemento | Dónde | Para qué |
|----------|-------|----------|
| `robots.txt` con crawlers de IA | `src/app/robots.ts` | Permite a GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc. indexar |
| `/llms.txt` | `src/app/llms.txt/route.ts` | Resumen estructurado que las IAs pueden consumir directamente |
| Schema.org Person completo | `src/lib/schema.ts` | Datos estructurados: sameAs, knowsAbout, author, knows |
| FAQPage Schema | páginas sobre-mí y conferencias | Respuestas directas a preguntas frecuentes |
| Contenido bilingüe (ES/EN) | todo el sitio | Cobertura en ambos idiomas |
| Blog con 17 artículos long-tail | `src/data/blog.ts` | Contenido de valor que refuerza expertise |
| sitemap.xml + hreflang | `src/app/sitemap.ts` | Descubrimiento e indexación correctos |

---

## Contenido escrito para IAs (buenas prácticas aplicadas)

- **Respuestas directas:** las FAQs responden preguntas reales ("¿Quién es
  Darwin Ontiveros?", "¿Sobre qué temas habla?") en la primera frase.
- **Datos verificables:** cifras exactas de seguidores, nombre del libro,
  referentes reales. Sin exageraciones.
- **Consistencia de entidad:** mismo nombre, rol, bio y foto en todos los
  perfiles (ver `docs/GUIA-PLATAFORMAS-AUTORIDAD.md`).
- **Lenguaje natural:** el contenido responde como lo haría una persona, no
  con relleno de keywords.

---

## Checklist de verificación (tras el deploy)

- [ ] `https://www.darwinontiveros.com/robots.txt` lista los bots de IA.
- [ ] `https://www.darwinontiveros.com/llms.txt` devuelve el resumen.
- [ ] `https://www.darwinontiveros.com/sitemap.xml` incluye todas las URLs.
- [ ] Validar Schema.org en https://validator.schema.org (pegar la home).
- [ ] Rich Results Test de Google: https://search.google.com/test/rich-results
- [ ] Compartir la home en WhatsApp/LinkedIn y ver que la imagen OG se genera.
- [ ] Buscar "Darwin Ontiveros" en Google y revisar qué aparece.
- [ ] Preguntar en ChatGPT/Claude/Perplexity "¿Quién es Darwin Ontiveros?" y
      anotar la respuesta base (para medir mejora con el tiempo).

## Cómo mejorar la presencia en IAs con el tiempo

1. **Publicar en el blog con regularidad** (contenido fresco y útil).
2. **Crear los perfiles de autoridad** (Fase 4) y añadirlos a `AUTHORITY_LINKS`.
3. **Conseguir menciones en medios** (Fase 5) — las IAs valoran fuentes
   independientes.
4. **Mantener la consistencia** de la entidad en todas las plataformas.
5. **Wikidata** cuando sea posible: alimenta directamente el Knowledge Graph y
   muchos modelos.

> Las IAs no se "hackean": reflejan la autoridad real que existe en la web.
> Este sitio la construye de forma estructurada para que la reconozcan rápido.
