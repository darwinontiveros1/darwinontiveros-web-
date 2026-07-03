"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/**
 * Anima un número de 0 al valor final cuando entra en el viewport.
 * Soporta prefijos/sufijos: "23.4K+", "10+", "100%", "1".
 */
export default function CountUp({
  value,
  duration = 1600,
  className,
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  // Descompone "23.4K+" -> { number: 23.4, suffix: "K+", decimals: 1 }.
  // Se calcula una sola vez a partir del string (valores primitivos estables).
  const m = value.match(/^([\d.,]+)(.*)$/);
  const target = m ? parseFloat(m[1].replace(",", ".")) : null;
  const suffix = m ? m[2] : "";
  const decimals = m && m[1].includes(".") ? 1 : 0;

  const [display, setDisplay] = useState<string>(
    target === null ? value : "0"
  );

  useEffect(() => {
    // Si no es numérico, mostramos el texto tal cual.
    if (target === null) {
      setDisplay(value);
      return;
    }
    if (!inView) return;

    // Respetar la preferencia de menos movimiento.
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDisplay(target.toFixed(decimals));
      return;
    }

    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // easeOutExpo para un final suave y elegante
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplay((target * eased).toFixed(decimals));
      if (progress < 1) raf = requestAnimationFrame(tick);
      else setDisplay(target.toFixed(decimals));
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // Dependencias primitivas: no se reinicia en cada render.
  }, [inView, target, decimals, duration, value]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
