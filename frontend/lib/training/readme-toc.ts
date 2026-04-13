/**
 * Titres de niveau 2 du README pour ancrage "sur cette page".
 */
export function extractMarkdownH2Headings(md: string): { id: string; title: string }[] {
  const out: { id: string; title: string }[] = [];
  for (const line of md.split("\n")) {
    const trimmed = line.trim();
    const m = /^##\s+(.+)$/.exec(trimmed);
    if (!m) continue;
    const title = m[1].replace(/\*\*/g, "").trim();
    const id = slugifyHeading(title);
    if (id) out.push({ id, title });
  }
  return out;
}

export function slugifyHeading(title: string): string {
  return title
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
