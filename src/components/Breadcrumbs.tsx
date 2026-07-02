import Link from "next/link";

export default function Breadcrumbs({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-2 text-xs text-muted-2">
        {items.map((item, i) => (
          <li key={item.path} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden>/</span>}
            {i < items.length - 1 ? (
              <Link href={item.path} className="hover:text-foreground">
                {item.name}
              </Link>
            ) : (
              <span className="text-muted">{item.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
