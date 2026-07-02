# Guía de Mantenimiento — Fase 7

Cómo mantener y hacer crecer el sitio de autoridad de Darwin Ontiveros.

---

## Google Analytics 4 (instalado)

El sitio ya tiene GA4 integrado (`@next/third-parties`), pero **inactivo** hasta
que configures el ID:

1. Crea una propiedad GA4 en https://analytics.google.com.
2. Copia el ID de medición (formato `G-XXXXXXXXXX`).
3. Añádelo como variable de entorno `NEXT_PUBLIC_GA_ID`:
   - En local: en `.env.local`.
   - En producción: Vercel → Settings → Environment Variables.
4. Redeploy. GA4 empieza a registrar visitas automáticamente.

> Si `NEXT_PUBLIC_GA_ID` está vacía, GA no se carga (no afecta rendimiento).

---

## Tareas recurrentes

### Semanal
- [ ] Publicar o revisar 1 artículo del blog (`src/data/blog.ts`).
- [ ] Responder mensajes de contacto (llegan al email del asistente).
- [ ] Revisar GA4: páginas más vistas, fuentes de tráfico.

### Mensual
- [ ] Actualizar cifras de seguidores en `SOCIALS` (`src/data/site.ts`).
- [ ] Añadir menciones nuevas en prensa (`src/data/press.ts`).
- [ ] Revisar Google Search Console: impresiones, clics, errores.
- [ ] Disparar IndexNow si hubo mucho contenido nuevo.

### Trimestral
- [ ] Crear/actualizar un perfil de autoridad (Fase 4).
- [ ] Campaña de PR con los pitches (`docs/PR-PITCHES.md`).
- [ ] Actualizar bio y foto si hay novedades.
- [ ] `npm update` y revisar que build + tipos pasan.

---

## Cómo hacer cambios (SIEMPRE vía PR)

Recuerda las reglas de `CLAUDE.md`:

```bash
git checkout -b feature/mi-cambio
# ...editar...
npx tsc --noEmit            # los tipos deben pasar
npm run build               # el build debe pasar
git add -A && git commit -m "descripción del cambio"
git push -u origin feature/mi-cambio
gh pr create --fill
# revisar el preview de Vercel → merge → deploy automático
```

Nunca `git push origin main` directo. Nunca `vercel --prod` manual.

---

## Dónde editar cada cosa

| Quiero cambiar... | Archivo |
|-------------------|---------|
| Bio, rol, tagline | `src/data/site.ts` → `PROFILE` |
| Redes y seguidores | `src/data/site.ts` → `SOCIALS` |
| Datos del libro | `src/data/site.ts` → `BOOKS` |
| FAQs | `src/data/site.ts` → `FAQS` |
| Temas de conferencia | `src/data/site.ts` → `SPEAKING_TOPICS` |
| Contacto / WhatsApp | `src/data/site.ts` → `CONTACT` |
| Perfiles de autoridad | `src/data/site.ts` → `AUTHORITY_LINKS` |
| Artículos del blog | `src/data/blog.ts` |
| Menciones de prensa | `src/data/press.ts` |
| Color del tema | `src/app/globals.css` → `--accent` |

Casi todo el contenido vive en `src/data/`. Editar ahí se refleja en todo el
sitio, el Schema.org, el sitemap y el `/llms.txt`.

---

## Checklist tras cada deploy importante

- [ ] La home carga y se ve bien en móvil y escritorio.
- [ ] El formulario de contacto envía (revisa que llega el email).
- [ ] `/robots.txt`, `/sitemap.xml` y `/llms.txt` responden.
- [ ] La imagen OG se genera al compartir en WhatsApp/LinkedIn.
- [ ] Validar Schema.org en https://validator.schema.org.
- [ ] Variables de entorno presentes en Vercel (`vercel env pull`).

---

## Variables de entorno (resumen)

Ver `.env.example`. Mínimas para producción:
- `RESEND_API_KEY` — para que funcione el formulario de contacto.
- `NEXT_PUBLIC_GA_ID` — para analítica (opcional pero recomendado).

Opcionales según fase:
- `CONTACT_TO`, `CONTACT_FROM` — personalizar el correo de contacto.
- `INDEXNOW_KEY` — notificar a Bing/Yandex.
- `ANTHROPIC_API_KEY`, `PR_ADMIN_KEY` — PR Auto-Pilot.
