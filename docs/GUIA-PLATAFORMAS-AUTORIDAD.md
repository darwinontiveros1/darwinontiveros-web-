# Guía de Plataformas de Autoridad — Fase 4

Objetivo: crear perfiles verificados en plataformas que Google y las IAs
consideran fuentes de verdad sobre una persona. Cada perfil nuevo se añade a
`AUTHORITY_LINKS` en `src/data/site.ts` para que entre en el `sameAs` del
Schema.org Person.

> Regla de oro del DAB: **solo información verificable y real.** Nunca inventar
> premios, cifras ni afiliaciones. La autoridad se construye con consistencia.

---

## Prioridad de plataformas (de mayor a menor impacto)

| # | Plataforma | Para qué sirve | Dificultad |
|---|-----------|----------------|-----------|
| 1 | **LinkedIn** | Identidad profesional, la IA la lee mucho | Baja |
| 2 | **Amazon Author Central** | Autoridad como autor del libro | Baja |
| 3 | **Goodreads** | Perfil de autor + reseñas del libro | Baja |
| 4 | **Google Knowledge Panel** | Panel de conocimiento en búsquedas | Media |
| 5 | **Wikidata** | Base de datos estructurada que alimenta IAs | Media |
| 6 | **Crunchbase** | Perfil de emprendedor/empresa | Media |
| 7 | **Wikipedia** | Máxima autoridad (requiere notoriedad) | Alta |

---

## 1. LinkedIn

1. Completa el perfil al 100%: foto, titular, "Acerca de", experiencia.
2. Titular sugerido: *"Emprendedor, Conferencista y Autor de «Imparable y
   Abundante — Ventas Sin Límites» | Ventas de alto rendimiento y liderazgo".*
3. En "Acerca de", usa la `bioLong` del sitio (`src/data/site.ts`).
4. Añade el sitio web `https://www.darwinontiveros.com` en Contacto.
5. Publica la URL pública del perfil en `AUTHORITY_LINKS` (ya está en `SOCIALS`).

## 2. Amazon Author Central

1. Ve a https://author.amazon.com y accede con tu cuenta de Amazon.
2. Reclama el libro «Imparable y Abundante — Ventas Sin Límites» (requiere que
   el libro ya esté publicado en Amazon/KDP).
3. Completa biografía (usa `bioShort`), foto y enlaces.
4. Copia la URL pública del autor a `AUTHORITY_LINKS`
   (`https://www.amazon.com/author/...`) y a `BOOKS[].amazonUrl` en el sitio.

## 3. Goodreads

1. Crea cuenta en https://www.goodreads.com.
2. Solicita el "Goodreads Author Program" para reclamar el libro.
3. Completa perfil de autor con bio y foto.
4. Añade la URL a `AUTHORITY_LINKS` y a `BOOKS[].goodreadsUrl`.

## 4. Google Knowledge Panel

1. Requisito previo: tener sameAs consistente (este sitio + LinkedIn + Amazon +
   Wikidata) — ya lo genera el Schema.org Person.
2. Cuando aparezca el panel en búsquedas de "Darwin Ontiveros", reclámalo en
   https://google.com/search (botón "Reclamar este panel de conocimiento") y
   verifica identidad con uno de los perfiles enlazados.

## 5. Wikidata

1. Crea cuenta en https://www.wikidata.org.
2. Crea un ítem nuevo tipo *human (Q5)* con:
   - Label: Darwin Ontiveros
   - Description: "empresario, conferencista y autor venezolano"
   - Propiedades: *instance of* → human; *occupation* → entrepreneur, author,
     public speaker; *official website* → el dominio; *author of* → el libro.
3. Enlaza el sitio y los perfiles (LinkedIn, Amazon) como referencias.
4. Copia la URL del ítem (`https://www.wikidata.org/wiki/QXXXXXXX`) a
   `AUTHORITY_LINKS`.

> Wikidata es clave: muchas IAs y el Knowledge Graph de Google la consumen.

## 6. Crunchbase

1. Crea perfil de persona en https://www.crunchbase.com como emprendedor.
2. Enlaza el sitio y describe la actividad. Añade la URL a `AUTHORITY_LINKS`.

## 7. Wikipedia (avanzado)

Requiere **notoriedad demostrable** con fuentes secundarias independientes
(prensa, entrevistas, reseñas). No crear hasta tener cobertura de medios
(Fase 5). Un artículo prematuro puede ser borrado. Cuando exista cobertura:

1. Reúne 3–5 fuentes independientes fiables.
2. Redacta en tono neutral y enciclopédico, citando cada afirmación.
3. Publica y añade la URL a `AUTHORITY_LINKS`.

---

## Después de crear cada perfil

1. Edita `src/data/site.ts` → añade la URL real a `AUTHORITY_LINKS`.
2. Confirma que el Schema.org Person la incluye en `sameAs`
   (verifica en https://validator.schema.org con la URL del sitio).
3. Deploy vía PR (ver reglas en `CLAUDE.md`).
4. Dispara IndexNow tras el deploy (ver `public/README-indexnow.txt`).

## Checklist de consistencia (crítico para autoridad)

En TODAS las plataformas usa exactamente el mismo:
- **Nombre:** Darwin Ontiveros
- **Titular/rol:** Emprendedor, Conferencista y Autor
- **Foto:** la misma foto profesional
- **Bio:** la de `src/data/site.ts` (short o long según el espacio)
- **Sitio web:** https://www.darwinontiveros.com

La coherencia del nombre + foto + bio + enlaces cruzados es lo que hace que
Google y las IAs entiendan que todos los perfiles son la misma entidad.
