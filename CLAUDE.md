# CLAUDE.md — Reglas de trabajo para este proyecto

Sitio web de autoridad digital de **Darwin Ontiveros** (Next.js 16 + App Router +
Tailwind CSS 4 + Framer Motion + TypeScript). Bilingüe: español en la raíz,
inglés bajo `/en/`.

---

## 🚨 REGLAS DE DEPLOY (OBLIGATORIAS — NUNCA ROMPER)

Estas 4 reglas protegen producción. Aplican SIEMPRE, sin excepción.

1. **NUNCA** hacer `git push origin main` directo. SIEMPRE crear una rama nueva
   y abrir un Pull Request.

2. **NUNCA** ejecutar `vercel --prod` ni `vercel deploy --prod` de forma manual.
   El deploy a producción lo hace Vercel automáticamente al hacer merge del PR.

3. **Flujo de cada cambio**, sin saltarse pasos:
   ```
   git checkout -b feature/nombre-descriptivo
   # ...hacer cambios...
   git add -A && git commit -m "mensaje claro"
   git push -u origin feature/nombre-descriptivo
   gh pr create --fill
   # revisar el preview de Vercel del PR
   # merge → deploy automático a producción
   ```

4. **Verificar variables de entorno** antes de asumir que existen. Usar
   `vercel env pull` y confirmar que NO están vacías (Resend, Supabase, etc.).

---

## Arquitectura

- **Fuente única de contenido:** `src/data/site.ts` (perfil bilingüe, redes,
  libros, FAQs, contacto, navegación). Editar aquí se refleja en todo el sitio.
- **Blog:** `src/data/blog.ts` · **Prensa:** `src/data/press.ts`
- **Schema.org:** `src/lib/schema.ts` (Person, WebSite, Book, FAQPage,
  BreadcrumbList, navegación). Se inyecta con `src/components/JsonLd.tsx`.
- **Componentes reutilizables:** `src/components/` (Header, Footer, SiteChrome,
  WhatsAppFab, Breadcrumbs, Faq, secciones y animaciones `motion/Reveal`).
- **Bilingüe:** cada página ES tiene su equivalente en `/en/`. `middleware.ts`
  auto-detecta idioma en la primera visita y respeta la elección manual (cookie
  `locale`). `hreflang` vía `alternates.languages` en cada `generateMetadata`.
- **SEO nativo:** `src/app/robots.ts` (incluye crawlers de IA) y
  `src/app/sitemap.ts` (dinámico, ES+EN con hreflang).

## Convenciones

- Next.js 16 usa params asíncronos: `params: Promise<{ slug: string }>`.
- Componentes de servidor por defecto; `"use client"` solo cuando hace falta.
- Tema oscuro con variables CSS en `globals.css` (`--accent` controla el color).
- Antes de dar por terminado un cambio: `npx tsc --noEmit` debe pasar limpio.

## Comandos

```bash
npm run dev     # desarrollo (Turbopack)
npm run build   # build de producción
npm run start   # servir build
npx tsc --noEmit  # chequeo de tipos
```
