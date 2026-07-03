import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { SITE, PROFILE } from "@/data/site";
import JsonLd from "@/components/JsonLd";
import { personSchema, websiteSchema } from "@/lib/schema";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const p = PROFILE.es;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${PROFILE.fullName} — ${p.role}`,
    template: `%s | ${PROFILE.fullName}`,
  },
  description: p.bioShort,
  keywords: [
    "Darwin Ontiveros",
    "conferencista de ventas",
    "experto en ventas",
    "liderazgo comercial",
    "desarrollo personal",
    "mentalidad de abundancia",
    "Imparable y Abundante",
    "ventas sin límites",
    "mentor de ventas",
    "speaker",
  ],
  authors: [{ name: PROFILE.fullName, url: SITE.url }],
  creator: PROFILE.fullName,
  alternates: {
    canonical: "/",
    languages: { "es-ES": "/", "en-US": "/en" },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    alternateLocale: "en_US",
    url: SITE.url,
    siteName: PROFILE.fullName,
    title: `${PROFILE.fullName} — ${p.role}`,
    description: p.bioShort,
    // La imagen la genera automáticamente src/app/opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    title: `${PROFILE.fullName} — ${p.role}`,
    description: p.bioShort,
    // La imagen la aporta opengraph-image.tsx (Twitter usa la misma)
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <JsonLd data={[personSchema("es"), websiteSchema("es")]} />
      </head>
      <body className="noise min-h-full">{children}</body>
      {/* Google Analytics 4 — solo se carga si NEXT_PUBLIC_GA_ID está definida. */}
      {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
    </html>
  );
}
