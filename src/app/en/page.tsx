import type { Metadata } from "next";
import HomePage from "@/components/HomePage";
import { SITE, PROFILE } from "@/data/site";

const p = PROFILE.en;

export const metadata: Metadata = {
  title: `${PROFILE.fullName} — ${p.role}`,
  description: p.bioShort,
  alternates: { canonical: "/en", languages: { "es-ES": "/", "en-US": "/en" } },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${SITE.url}/en`,
    title: `${PROFILE.fullName} — ${p.role}`,
    description: p.bioShort,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: PROFILE.fullName }],
  },
};

export default function Page() {
  return <HomePage locale="en" />;
}
