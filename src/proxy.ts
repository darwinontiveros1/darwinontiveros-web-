import { NextResponse, type NextRequest } from "next/server";

// ============================================================================
// Proxy (antes "middleware") — auto-detección de idioma.
// En la PRIMERA visita a una ruta en español, si el navegador prefiere inglés,
// redirige a la versión /en equivalente. Se respeta la elección manual del
// usuario mediante la cookie `locale` (la fija el switcher de idioma).
// ============================================================================

// Mapa de rutas ES -> EN para preservar la sección al redirigir.
const ES_TO_EN: Record<string, string> = {
  "/": "/en",
  "/sobre-mi": "/en/about",
  "/conferencias": "/en/speaking",
  "/libros": "/en/books",
  "/prensa": "/en/press",
  "/blog": "/en/blog",
};

function mapToEn(pathname: string): string | null {
  if (ES_TO_EN[pathname]) return ES_TO_EN[pathname];
  // Rutas dinámicas: /libros/x -> /en/books/x, /blog/x -> /en/blog/x
  if (pathname.startsWith("/libros/")) return pathname.replace("/libros/", "/en/books/");
  if (pathname.startsWith("/blog/")) return pathname.replace("/blog/", "/en/blog/");
  return null;
}

function prefersEnglish(acceptLanguage: string | null): boolean {
  if (!acceptLanguage) return false;
  // Toma el primer idioma con mayor prioridad.
  const first = acceptLanguage.split(",")[0]?.trim().toLowerCase() ?? "";
  return first.startsWith("en");
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Solo actuamos en rutas en español (las /en/ se sirven tal cual).
  if (pathname.startsWith("/en")) return NextResponse.next();

  // Si el usuario ya eligió idioma, respetamos su elección.
  const cookieLocale = req.cookies.get("locale")?.value;
  if (cookieLocale === "es") return NextResponse.next();

  // Solo redirigimos automáticamente si NO hay cookie (primera visita).
  if (!cookieLocale && prefersEnglish(req.headers.get("accept-language"))) {
    const target = mapToEn(pathname);
    if (target) {
      const url = req.nextUrl.clone();
      url.pathname = target;
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  // Excluye assets, API, y archivos estáticos.
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)"],
};
