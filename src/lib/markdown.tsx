import type { ReactNode } from "react";

// Renderizador minimalista de markdown para el contenido del blog.
// Soporta: ## subtítulos, listas (- y 1.), **negrita**, párrafos.
// Suficiente para el contenido controlado del blog (no input de usuario).

function renderInline(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export function Markdown({ content }: { content: string }) {
  const blocks = content.trim().split("\n\n");
  const out: ReactNode[] = [];
  let listBuffer: { ordered: boolean; items: string[] } | null = null;

  const flushList = (key: string) => {
    if (!listBuffer) return;
    const Tag = listBuffer.ordered ? "ol" : "ul";
    out.push(
      <Tag
        key={key}
        className={`my-4 space-y-2 pl-5 text-muted ${listBuffer.ordered ? "list-decimal" : "list-disc"}`}
      >
        {listBuffer.items.map((item, i) => (
          <li key={i} className="leading-relaxed">
            {renderInline(item)}
          </li>
        ))}
      </Tag>,
    );
    listBuffer = null;
  };

  blocks.forEach((block, bi) => {
    const lines = block.split("\n");
    const isUnordered = lines.every((l) => l.trim().startsWith("- "));
    const isOrdered = lines.every((l) => /^\d+\.\s/.test(l.trim()));

    if (isUnordered) {
      listBuffer = {
        ordered: false,
        items: lines.map((l) => l.trim().replace(/^-\s/, "")),
      };
      flushList(`ul-${bi}`);
      return;
    }
    if (isOrdered) {
      listBuffer = {
        ordered: true,
        items: lines.map((l) => l.trim().replace(/^\d+\.\s/, "")),
      };
      flushList(`ol-${bi}`);
      return;
    }
    if (block.startsWith("## ")) {
      out.push(
        <h2 key={bi} className="mt-10 mb-3 text-2xl font-bold tracking-tight text-foreground">
          {block.replace("## ", "")}
        </h2>,
      );
      return;
    }
    out.push(
      <p key={bi} className="my-4 text-lg leading-relaxed text-muted">
        {renderInline(block)}
      </p>,
    );
  });

  return <div>{out}</div>;
}
