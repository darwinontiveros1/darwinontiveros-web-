import { type Locale } from "@/data/site";
import SiteChrome from "@/components/SiteChrome";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import About from "@/components/sections/About";
import Philosophy from "@/components/sections/Philosophy";
import Speaking from "@/components/sections/Speaking";
import BooksFeature from "@/components/sections/BooksFeature";
import Ecosystem from "@/components/sections/Ecosystem";
import SocialProof from "@/components/sections/SocialProof";
import ContactForm from "@/components/sections/ContactForm";

/** Homepage completa reutilizable para ES (/) y EN (/en). */
export default function HomePage({ locale }: { locale: Locale }) {
  return (
    <SiteChrome locale={locale}>
      <Hero locale={locale} />
      <Stats locale={locale} />
      <About locale={locale} />
      <Philosophy locale={locale} />
      <Speaking locale={locale} />
      <BooksFeature locale={locale} />
      <Ecosystem locale={locale} />
      <SocialProof locale={locale} />
      <ContactForm locale={locale} />
    </SiteChrome>
  );
}
