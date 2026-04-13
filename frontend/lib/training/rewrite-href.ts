/**
 * Réécrit les liens Markdown internes du cours vers les routes Next.js.
 */
export function rewriteTrainingMarkdownHref(href: string): string {
  if (!href || /^https?:\/\//i.test(href) || href.startsWith("mailto:")) {
    return href;
  }

  const hashIndex = href.indexOf("#");
  const pathPart = hashIndex >= 0 ? href.slice(0, hashIndex) : href;
  const hashSuffix = hashIndex >= 0 ? href.slice(hashIndex) : "";

  const lower = pathPart.toLowerCase();
  if (lower.endsWith("readme.md") || lower.endsWith("/readme.md") || lower.endsWith("docs/training/readme.md")) {
    return `/formation-ia${hashSuffix}`;
  }
  if (lower.includes("page-de-garde-notion.md")) {
    return `/formation-ia/feuille-de-route${hashSuffix}`;
  }

  const segments = pathPart.split(/[/\\]/);
  const last = segments[segments.length - 1] || pathPart;
  if (/^[0-9]{2}-[a-z0-9-]+\.md$/i.test(last)) {
    const slug = last.replace(/\.md$/i, "");
    return `/formation-ia/chapitre/${slug}${hashSuffix}`;
  }

  return href;
}
