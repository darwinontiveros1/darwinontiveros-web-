import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";

// ============================================================================
// robots.txt — permite explícitamente a los crawlers de IA indexar el sitio,
// además de los buscadores tradicionales. Clave para la visibilidad en
// respuestas de ChatGPT, Claude, Perplexity, Gemini, etc.
// ============================================================================

const AI_CRAWLERS = [
  "GPTBot", // OpenAI (ChatGPT)
  "ChatGPT-User", // OpenAI (navegación en tiempo real)
  "OAI-SearchBot", // OpenAI (búsqueda)
  "ClaudeBot", // Anthropic (Claude)
  "anthropic-ai", // Anthropic
  "Claude-Web", // Anthropic
  "PerplexityBot", // Perplexity
  "Google-Extended", // Google (Gemini / Vertex AI)
  "Applebot-Extended", // Apple Intelligence
  "cohere-ai", // Cohere
  "Amazonbot", // Amazon
  "Bytespider", // ByteDance / TikTok
  "Meta-ExternalAgent", // Meta AI
  "YouBot", // You.com
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Buscadores tradicionales y cualquier bot: acceso total.
      { userAgent: "*", allow: "/" },
      // Crawlers de IA: permitidos explícitamente.
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
