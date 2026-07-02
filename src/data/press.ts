// Menciones de prensa. Agregar aquí cada artículo verificado conseguido
// (vía PR Auto-Pilot, agencia o gestión propia). Solo URLs reales.
// Estos alimentan la página /prensa y el Schema.org sameAs.

export type PressItem = {
  outlet: string;
  title: string;
  url: string;
  date: string; // YYYY-MM-DD
  language: "es" | "en";
  logo?: string;
};

export const PRESS: PressItem[] = [
  // Ejemplo de formato (reemplazar con artículos reales):
  // {
  //   outlet: "Forbes",
  //   title: "Titular del artículo",
  //   url: "https://...",
  //   date: "2026-06-01",
  //   language: "es",
  // },
];
