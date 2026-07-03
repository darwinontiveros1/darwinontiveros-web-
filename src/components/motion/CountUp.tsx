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
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState("0");

  // Descompone "23.4K+" -> { number: 23.4, suffix: "K+", decimals: 1 }
  const match = value.match(/^([\d.,]+)(.*)$/);
  const rawNumber = match ? parseFloat(match[1].replace(",", ".")) : 0;
  const suffix = match ? match[2] : value;
  const decimals = match && match[1].includes(".") ? 1 : 0;

  useEffect(() => {
    if (!inView) return;
    if (!match) {
      setDisplay(value);
      return;
    }

    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo para un final suave y elegante
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = rawNumber * eased;
      setDisplay(current.toFixed(decimals));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setDisplay(rawNumber.toFixed(decimals));
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, rawNumber, decimals, duration, match, value]);

  return (
    <span ref={ref} className={className}>
      {display}
      {match ? suffix : ""}
    </span>
  );
}
