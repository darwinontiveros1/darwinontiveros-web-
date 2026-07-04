"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV, PROFILE, type Locale } from "@/data/site";
import Logo from "@/components/Logo";

export default function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const nav = NAV[locale];
  const home = locale === "en" ? "/en" : "/";
  const contactHref = locale === "en" ? "/en#contacto" : "/#contacto";

  // Alternar idioma manteniendo la sección equivalente cuando es posible.
  const altLocale: Locale = locale === "en" ? "es" : "en";
  const altHref = locale === "en" ? "/" : "/en";

  // Fija la cookie de idioma para que el middleware respete la elección manual
  // y no vuelva a auto-redirigir en visitas posteriores.
  const switchLocale = () => {
    document.cookie = `locale=${altLocale}; path=/; max-age=31536000; samesite=lax`;
    window.location.href = altHref;
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="container-page flex h-16 items-center justify-between">
        <Link
          href={home}
          className="group flex items-center gap-2.5 text-base font-semibold tracking-tight text-foreground"
          aria-label={PROFILE.fullName}
        >
          <Logo
            size={34}
            className="transition-transform duration-300 group-hover:scale-105"
          />
          <span>{PROFILE.fullName}</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const active =
              item.href === home
                ? pathname === home
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                  active
                    ? "text-foreground"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={switchLocale}
            className="rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-muted transition-colors hover:border-accent-dim hover:text-foreground"
            aria-label={`Switch to ${altLocale.toUpperCase()}`}
          >
            {altLocale.toUpperCase()}
          </button>
          <Link
            href={contactHref}
            className="hidden rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-[#05060a] transition-transform hover:scale-[1.03] sm:inline-block"
          >
            {locale === "en" ? "Contact" : "Contacto"}
          </Link>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground md:hidden"
            aria-label="Menu"
            aria-expanded={open}
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 top-0 h-0.5 w-4 bg-current transition-transform ${
                  open ? "translate-y-[5px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-0.5 w-4 bg-current transition-transform ${
                  open ? "-translate-y-[5px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="container-page flex flex-col gap-1 py-4">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-2.5 text-sm text-muted hover:bg-surface hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href={contactHref}
                className="mt-2 rounded-lg bg-accent px-4 py-2.5 text-center text-sm font-semibold text-[#05060a]"
              >
                {locale === "en" ? "Contact" : "Contacto"}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
