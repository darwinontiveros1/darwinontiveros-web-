// Inyecta JSON-LD (Schema.org) de forma segura en el <head> del documento.
// Se usa en layout y páginas para Person, Book, FAQPage, BreadcrumbList, etc.

export default function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify sobre datos controlados por nosotros (no input de usuario).
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
