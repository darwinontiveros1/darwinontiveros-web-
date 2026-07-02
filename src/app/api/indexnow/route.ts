import { NextResponse } from "next/server";
import { SITE, BOOKS } from "@/data/site";
import { POSTS } from "@/data/blog";

// ============================================================================
// IndexNow — notifica a Bing, Yandex y otros buscadores compatibles cuando el
// contenido cambia, para acelerar la indexación.
//
// Setup:
//   1. Genera una clave (32+ caracteres hex) y ponla en INDEXNOW_KEY.
//   2. Crea el archivo público public/<INDEXNOW_KEY>.txt con la clave dentro
//      (lo sirve GET /<clave>.txt). Ver public/README-indexnow.txt.
//   3. Llama POST /api/indexnow tras un deploy con contenido nuevo.
//
// Protección: requiere el header `x-indexnow-key` igual a INDEXNOW_KEY.
// ============================================================================

export const runtime = "nodejs";

function allUrls(): string[] {
  const base = SITE.url;
  const staticPaths = [
    "/",
    "/en",
    "/sobre-mi",
    "/en/about",
    "/conferencias",
    "/en/speaking",
    "/libros",
    "/en/books",
    "/prensa",
    "/en/press",
    "/blog",
    "/en/blog",
  ];
  const bookPaths = BOOKS.flatMap((b) => [`/libros/${b.slug}`, `/en/books/${b.slug}`]);
  const postPaths = POSTS.flatMap((p) => [`/blog/${p.slug}`, `/en/blog/${p.slug}`]);
  return [...staticPaths, ...bookPaths, ...postPaths].map(
    (path) => `${base}${path === "/" ? "" : path}`,
  );
}

export async function POST(req: Request) {
  const key = process.env.INDEXNOW_KEY;
  if (!key) {
    return NextResponse.json({ error: "INDEXNOW_KEY not configured" }, { status: 500 });
  }

  // Autorización simple para evitar abuso del endpoint.
  if (req.headers.get("x-indexnow-key") !== key) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const host = new URL(SITE.url).host;
  const payload = {
    host,
    key,
    keyLocation: `${SITE.url}/${key}.txt`,
    urlList: allUrls(),
  };

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    });
    return NextResponse.json({ ok: res.ok, status: res.status, submitted: payload.urlList.length });
  } catch (e) {
    console.error("[indexnow] error:", e);
    return NextResponse.json({ error: "IndexNow request failed" }, { status: 502 });
  }
}
