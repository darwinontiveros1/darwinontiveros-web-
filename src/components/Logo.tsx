/**
 * Logo de marca — monograma "DO" (Darwin Ontiveros).
 * SVG vectorial: nítido a cualquier tamaño y sin peticiones de red.
 * La "D" lleva un contador circular que evoca la "O" → lee como "DO".
 */
export default function Logo({
  className = "",
  size = 34,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id="logoStroke" x1="4" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#3ef7ea" />
          <stop offset="1" stopColor="#03bfb5" />
        </linearGradient>
        <linearGradient id="logoMark" x1="10" y1="10" x2="30" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#4ffdf0" />
          <stop offset="1" stopColor="#03bfb5" />
        </linearGradient>
        <radialGradient id="logoSheen" cx="0.3" cy="0.25" r="0.9">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.10" />
          <stop offset="0.6" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Placa redondeada con borde teal y ligero brillo superior */}
      <rect
        x="1"
        y="1"
        width="38"
        height="38"
        rx="11.5"
        fill="#0a0e12"
        stroke="url(#logoStroke)"
        strokeWidth="1.5"
      />
      <rect x="1" y="1" width="38" height="38" rx="11.5" fill="url(#logoSheen)" />

      {/* Monograma "D" (Darwin) de peso uniforme: stem recto + bombo curvo,
          contador interior en forma de D para un trazo parejo y premium. */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill="url(#logoMark)"
        d="M12.5 10.8 H19.3 A9.2 9.2 0 0 1 19.3 29.2 H12.5 Z
           M16.4 15.1 H18.9 A4.9 4.9 0 0 1 18.9 24.9 H16.4 Z"
      />
    </svg>
  );
}
