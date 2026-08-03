"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Carga diferida y solo en cliente: el bundle 3D no bloquea el render inicial.
const Scene3D = dynamic(() => import("./Scene3D"), { ssr: false });

/**
 * Fondo 3D inmersivo para toda la página. Se monta detrás del contenido.
 * Buenas prácticas de rendimiento:
 *  - No se renderiza si el usuario pide "reducir movimiento".
 *  - Menos partículas en móvil y en equipos de pocos núcleos.
 *  - pointer-events: none para no interferir con clics.
 *  - Carga después de que la página es interactiva (dynamic + estado).
 */
export default function Background3D() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return; // respeta la preferencia de accesibilidad

    const mobile = window.matchMedia("(max-width: 768px)").matches;
    const cores = navigator.hardwareConcurrency || 4;

    // Escala la densidad según el dispositivo.
    const n = mobile ? 1200 : cores <= 4 ? 2200 : 3800;

    // Pequeño retraso para priorizar la interactividad de la página.
    const id = window.setTimeout(() => setCount(n), 200);
    return () => window.clearTimeout(id);
  }, []);

  if (count === null) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        // Máscara muy suave: deja el 3D bien visible y solo atenúa un poco
        // la zona inferior para proteger la legibilidad del texto largo.
        maskImage:
          "linear-gradient(to bottom, #000 0%, #000 70%, rgba(0,0,0,0.7) 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, #000 0%, #000 70%, rgba(0,0,0,0.7) 100%)",
      }}
    >
      <Scene3D count={count} />
    </div>
  );
}
