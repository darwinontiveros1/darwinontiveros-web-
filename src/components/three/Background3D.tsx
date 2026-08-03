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
  const [cfg, setCfg] = useState<{ count: number; bloom: boolean; size: number } | null>(
    null
  );

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return; // respeta la preferencia de accesibilidad

    const mobile = window.matchMedia("(max-width: 768px)").matches;
    const cores = navigator.hardwareConcurrency || 4;
    const lowEnd = cores <= 4;

    // Escala densidad, glow y tamaño según el dispositivo.
    const config = mobile
      ? { count: 1600, bloom: false, size: 0.11 }
      : lowEnd
      ? { count: 2600, bloom: false, size: 0.085 }
      : { count: 4200, bloom: true, size: 0.08 };

    // Pequeño retraso para priorizar la interactividad de la página.
    const id = window.setTimeout(() => setCfg(config), 180);
    return () => window.clearTimeout(id);
  }, []);

  if (!cfg) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        // Máscara mínima: el 3D se ve fuerte; solo un leve descenso al final.
        maskImage: "linear-gradient(to bottom, #000 0%, #000 82%, rgba(0,0,0,0.82) 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, #000 0%, #000 82%, rgba(0,0,0,0.82) 100%)",
      }}
    >
      <Scene3D count={cfg.count} bloom={cfg.bloom} size={cfg.size} />
    </div>
  );
}
