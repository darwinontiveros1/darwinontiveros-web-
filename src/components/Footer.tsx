import Link from "next/link";
import { NAV, SOCIALS, PROFILE, CONTACT, type Locale } from "@/data/site";

export default function Footer({ locale }: { locale: Locale }) {
  const nav = NAV[locale];
  const year = new Date().getFullYear();
  const t = locale === "en"
    ? { rights: "All rights reserved.", nav: "Navigation", follow: "Follow", contact: "Contact" }
    : { rights: "Todos los derechos reservados.", nav: "Navegación", follow: "Sígueme", contact: "Contacto" };

  return (
    <footer className="mt-24 border-t border-border bg-background-soft">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <p className="text-lg font-semibold text-foreground">
            {PROFILE.fullName}
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            {PROFILE[locale].role}. {PROFILE[locale].tagline}
          </p>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-2">
            {t.nav}
          </p>
          <ul className="space-y-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-2">
            {t.follow}
          </p>
          <ul className="space-y-2">
            {SOCIALS.map((s) => (
              <li key={s.platform}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  {s.platform}
                </a>
              </li>
            ))}
          </ul>
          <p className="mb-3 mt-6 text-xs font-semibold uppercase tracking-wider text-muted-2">
            {t.contact}
          </p>
          <a
            href={`https://wa.me/${CONTACT.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted transition-colors hover:text-foreground"
          >
            WhatsApp
          </a>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-6 text-xs text-muted-2 sm:flex-row">
          <p>
            © {year} {PROFILE.fullName}. {t.rights}
          </p>
          <p>{CONTACT.assistantEmail}</p>
        </div>
      </div>
    </footer>
  );
}
