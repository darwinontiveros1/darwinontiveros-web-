import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";
import ScrollProgress from "@/components/motion/ScrollProgress";
import { type Locale } from "@/data/site";

/** Envuelve una página con Header, Footer y botón flotante de WhatsApp. */
export default function SiteChrome({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <>
      <ScrollProgress />
      <Header locale={locale} />
      <main>{children}</main>
      <WhatsAppFab label={locale === "en" ? "Chat on WhatsApp" : "Escríbeme por WhatsApp"} />
      <Footer locale={locale} />
    </>
  );
}
