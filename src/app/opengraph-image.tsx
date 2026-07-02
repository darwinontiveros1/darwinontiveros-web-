import { ImageResponse } from "next/og";
import { PROFILE, SITE } from "@/data/site";

// ============================================================================
// Imagen Open Graph dinámica (1200x630) generada en el edge. Se usa en
// compartidos de redes, WhatsApp, Slack, etc. Marca oscura con accent.
// ============================================================================

export const runtime = "edge";
export const alt = `${PROFILE.fullName} — ${PROFILE.es.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#05060a",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: 6,
              background: SITE.accent,
            }}
          />
          <div style={{ color: "#9aa4b8", fontSize: 30, letterSpacing: 2 }}>
            {SITE.domain}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#f5f7fa",
              fontSize: 84,
              fontWeight: 800,
              lineHeight: 1.05,
            }}
          >
            {PROFILE.fullName}
          </div>
          <div
            style={{
              color: SITE.accent,
              fontSize: 40,
              fontWeight: 600,
              marginTop: 24,
            }}
          >
            {PROFILE.es.role}
          </div>
        </div>

        <div style={{ color: "#9aa4b8", fontSize: 32, maxWidth: 900 }}>
          {PROFILE.es.tagline}
        </div>
      </div>
    ),
    { ...size },
  );
}
