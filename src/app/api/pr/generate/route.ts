import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { PROFILE, SITE, BOOKS, CONTACT } from "@/data/site";

// ============================================================================
// PR Auto-Pilot — generación de pitches (Fase 5, single-user).
// Redacta un pitch de PR personalizado con la API de Claude, en el tono de
// Darwin. NO envía nada: devuelve un borrador para revisión humana.
//
// Variables de entorno:
//   ANTHROPIC_API_KEY  (obligatoria)  https://console.anthropic.com
//   PR_ADMIN_KEY       (obligatoria)  protege el endpoint
// ============================================================================

export const runtime = "nodejs";

type Payload = {
  outlet?: string; // nombre del medio/podcast/blog
  contact?: string; // nombre del contacto
  angle?: string; // ángulo/tema propuesto
  type?: "podcast" | "prensa" | "blog" | string;
};

export async function POST(req: Request) {
  const adminKey = process.env.PR_ADMIN_KEY;
  if (!adminKey) {
    return NextResponse.json({ error: "PR_ADMIN_KEY not configured" }, { status: 500 });
  }
  if (req.headers.get("x-pr-key") !== adminKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "ANTHROPIC_API_KEY not configured" }, { status: 500 });
  }

  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const outlet = (body.outlet ?? "").trim();
  const contact = (body.contact ?? "").trim();
  const angle = (body.angle ?? "").trim();
  const type = (body.type ?? "medio").trim();

  if (!outlet || !angle) {
    return NextResponse.json({ error: "Missing 'outlet' or 'angle'" }, { status: 400 });
  }

  const p = PROFILE.es;
  const prompt = `Eres el asistente de PR de ${PROFILE.fullName}, ${p.role}, autor del libro "${BOOKS[0].title}". Sitio: ${SITE.url}. Contacto: WhatsApp ${CONTACT.whatsappDisplay}.

Redacta un pitch de PR en español, cálido, profesional y conciso (máximo 160 palabras el cuerpo), para conseguir una colaboración con este destinatario:
- Medio/${type}: ${outlet}
- Contacto: ${contact || "el equipo editorial"}
- Ángulo propuesto: ${angle}

Requisitos:
- Personaliza la primera línea mencionando el medio.
- Un solo pedido claro.
- Aporta 2-3 sub-ángulos concretos en viñetas.
- Cierra con el nombre, el sitio web y el WhatsApp.
- Nada de exageraciones ni datos inventados.

Devuelve SOLO un objeto JSON válido con esta forma exacta, sin texto adicional:
{"subject": "asunto del email", "body": "cuerpo del email con saltos de línea"}`;

  const anthropic = new Anthropic({ apiKey });

  try {
    const msg = await anthropic.messages.create({
      model: "claude-opus-4-5-20251101",
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    });

    const text = msg.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("")
      .trim();

    // Intenta parsear el JSON devuelto por el modelo.
    let parsed: { subject?: string; body?: string };
    try {
      const jsonStart = text.indexOf("{");
      const jsonEnd = text.lastIndexOf("}");
      parsed = JSON.parse(text.slice(jsonStart, jsonEnd + 1));
    } catch {
      // Si no vino JSON limpio, devolvemos el texto como cuerpo.
      parsed = { subject: `Propuesta para ${outlet}`, body: text };
    }

    return NextResponse.json({
      subject: parsed.subject ?? `Propuesta para ${outlet}`,
      body: parsed.body ?? text,
    });
  } catch (e) {
    console.error("[pr/generate] error:", e);
    return NextResponse.json({ error: "Generation failed" }, { status: 502 });
  }
}
