import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

/** Fil d’Ariane accessible (nav + liste) et JSON-LD BreadcrumbList. */
export function Breadcrumb({ items }: BreadcrumbProps) {
  if (items.length === 0) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `https://studio-castel.com${item.href}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Fil d'Ariane" className="mt-4">
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-small text-muted-foreground">
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-x-1.5">
              {i > 0 && (
                <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground/70" aria-hidden />
              )}
              {item.href ? (
                <Link
                  href={item.href}
                  className="hover:text-foreground underline-offset-2 hover:underline"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-foreground font-medium" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
