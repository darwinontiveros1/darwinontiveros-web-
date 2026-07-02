import { NextResponse } from "next/server";
import { Resend } from "resend";
import { CONTACT, SITE } from "@/data/site";

// ============================================================================
// API de contacto — recibe el formulario, valida y envía un email al asistente
// vía Resend. Incluye un enlace de WhatsApp pre-rellenado para responder rápido.
//
// Variables de entorno necesarias (Vercel → Settings → Environment Variables):
//   RESEND_API_KEY   (obligatoria)  clave de https://resend.com/api-keys
//   CONTACT_TO       (opcional)     destino; por defecto CONTACT.assistantEmail
//   CONTACT_FROM     (opcional)     remitente verificado en Resend
//                                   por defecto "Web Darwin <onboarding@resend.dev>"
// ============================================================================

export const runtime = "nodejs";

type Payload = {
  name?: string;
  email?: string;
  whatsapp?: string;
  company?: string;
  inquiryType?: string;
  message?: string;
  locale?: "es" | "en";
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const message = (body.message ?? "").trim();
  const whatsapp = (body.whatsapp ?? "").trim();
  const company = (body.company ?? "").trim();
  const inquiryType = (body.inquiryType ?? "").trim();
  const locale = body.locale === "en" ? "en" : "es";

  // Validación de campos obligatorios.
  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY no está configurada.");
    return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
  }

  const to = process.env.CONTACT_TO || CONTACT.assistantEmail;
  const from = process.env.CONTACT_FROM || "Web Darwin Ontiveros <onboarding@resend.dev>";

  // Link de WhatsApp pre-rellenado para responder al interesado (si dio número).
  const waText = encodeURIComponent(
    locale === "en"
      ? `Hi ${name}, thanks for reaching out through darwinontiveros.com. `
      : `Hola ${name}, gracias por escribir desde darwinontiveros.com. `,
  );
  const waDigits = whatsapp.replace(/\D/g, "");
  const waLink = waDigits ? `https://wa.me/${waDigits}?text=${waText}` : "";

  const subject =
    locale === "en"
      ? `New inquiry (${inquiryType || "General"}) — ${name}`
      : `Nueva consulta (${inquiryType || "General"}) — ${name}`;

  const rows: [string, string][] = [
    [locale === "en" ? "Name" : "Nombre", name],
    ["Email", email],
    ["WhatsApp", whatsapp || "—"],
    [locale === "en" ? "Company" : "Empresa", company || "—"],
    [locale === "en" ? "Inquiry type" : "Tipo de consulta", inquiryType || "—"],
  ];

  const html = `
    <div style="font-family:system-ui,Arial,sans-serif;max-width:600px;margin:0 auto;color:#111">
      <h2 style="margin:0 0 4px">${esc(subject)}</h2>
      <p style="color:#666;margin:0 0 20px">${SITE.domain}</p>
      <table style="width:100%;border-collapse:collapse">
        ${rows
          .map(
            ([k, v]) =>
              `<tr>
                 <td style="padding:8px 12px;background:#f5f5f7;font-weight:600;width:160px;border:1px solid #eee">${esc(k)}</td>
                 <td style="padding:8px 12px;border:1px solid #eee">${esc(v)}</td>
               </tr>`,
          )
          .join("")}
      </table>
      <div style="margin:20px 0">
        <div style="font-weight:600;margin-bottom:6px">${locale === "en" ? "Message" : "Mensaje"}</div>
        <div style="padding:12px;background:#f9f9fb;border:1px solid #eee;white-space:pre-wrap;line-height:1.5">${esc(message)}</div>
      </div>
      ${
        waLink
          ? `<a href="${waLink}" style="display:inline-block;background:#25D366;color:#05261a;font-weight:700;text-decoration:none;padding:12px 20px;border-radius:8px">
               ${locale === "en" ? "Reply on WhatsApp" : "Responder por WhatsApp"}
             </a>`
          : ""
      }
    </div>`;

  const resend = new Resend(apiKey);
  try {
    const { error } = await resend.emails.send({
      from,
      to,
      subject,
      replyTo: email,
      html,
    });
    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json({ error: "Send failed" }, { status: 502 });
    }
  } catch (e) {
    console.error("[contact] Unexpected error:", e);
    return NextResponse.json({ error: "Send failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
