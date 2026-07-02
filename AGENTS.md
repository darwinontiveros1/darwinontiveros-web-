<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Reglas del proyecto

Las reglas completas de trabajo y de deploy están en [CLAUDE.md](./CLAUDE.md).

Reglas críticas de deploy (resumen):

1. Nunca `git push origin main` directo — siempre rama + Pull Request.
2. Nunca `vercel --prod` manual — el deploy lo hace Vercel al mergear el PR.
3. Flujo: rama → commit → push → `gh pr create` → revisar preview → merge.
4. Verificar variables de entorno con `vercel env pull` (que no estén vacías).
