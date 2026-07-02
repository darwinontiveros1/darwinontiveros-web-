"use client";

import { useState } from "react";
import { CONTACT, type Locale } from "@/data/site";
import { Section, SectionHeading } from "./Section";
import Reveal from "@/components/motion/Reveal";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm({ locale }: { locale: Locale }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const t = locale === "en"
    ? {
        eyebrow: "Contact",
        title: "Let's work together",
        subtitle: "Talks, keynotes, mentorship or collaborations — tell me about your project.",
        name: "Full name",
        email: "Email",
        whatsapp: "WhatsApp (optional)",
        company: "Company / organization",
        type: "Type of inquiry",
        message: "Message",
        send: "Send message",
        sending: "Sending...",
        okTitle: "Message sent!",
        okBody: "Thanks. My team will get back to you shortly.",
        errBody: "Something went wrong. Please try again or reach me on WhatsApp.",
        wa: "Prefer WhatsApp? Message directly:",
      }
    : {
        eyebrow: "Contacto",
        title: "Trabajemos juntos",
        subtitle: "Conferencias, keynotes, mentoría o colaboraciones — cuéntame sobre tu proyecto.",
        name: "Nombre completo",
        email: "Email",
        whatsapp: "WhatsApp (opcional)",
        company: "Empresa / organización",
        type: "Tipo de consulta",
        message: "Mensaje",
        send: "Enviar mensaje",
        sending: "Enviando...",
        okTitle: "¡Mensaje enviado!",
        okBody: "Gracias. Mi equipo te responderá muy pronto.",
        errBody: "Algo salió mal. Intenta de nuevo o escríbeme por WhatsApp.",
        wa: "¿Prefieres WhatsApp? Escríbeme directo:",
      };

  const types = CONTACT.inquiryTypes[locale];

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setError(t.errBody);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted-2 outline-none transition-colors focus:border-accent";

  return (
    <Section id="contacto">
      <div className="grid gap-10 md:grid-cols-[1fr_1.4fr]">
        <div>
          <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />
          <Reveal>
            <div className="card p-6">
              <p className="text-sm text-muted">{t.wa}</p>
              <a
                href={`https://wa.me/${CONTACT.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 text-base font-semibold text-accent hover:text-accent-soft"
              >
                {CONTACT.whatsappDisplay}
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal>
          {status === "success" ? (
            <div className="card flex h-full flex-col items-center justify-center gap-3 p-10 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-2xl text-accent">
                ✓
              </div>
              <h3 className="text-xl font-semibold text-foreground">{t.okTitle}</h3>
              <p className="text-sm text-muted">{t.okBody}</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="card space-y-4 p-6 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <input name="name" required placeholder={t.name} className={inputClass} />
                <input name="email" type="email" required placeholder={t.email} className={inputClass} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <input name="whatsapp" placeholder={t.whatsapp} className={inputClass} />
                <input name="company" placeholder={t.company} className={inputClass} />
              </div>
              <select name="inquiryType" required defaultValue="" className={inputClass}>
                <option value="" disabled>
                  {t.type}
                </option>
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <textarea
                name="message"
                required
                rows={5}
                placeholder={t.message}
                className={`${inputClass} resize-none`}
              />
              {status === "error" && (
                <p className="text-sm text-red-400">{error}</p>
              )}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-[#05060a] transition-transform hover:scale-[1.02] disabled:opacity-60"
              >
                {status === "loading" ? t.sending : t.send}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </Section>
  );
}
