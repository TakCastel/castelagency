import { TRAINING_CHAPTERS } from "@/lib/training/course";
import { getAllChapterSlugs, getChapterMarkdown, getPageDeGardeMarkdown } from "@/lib/training/load-markdown";
import { slugifyHeading } from "@/lib/training/readme-toc";

export type TrainingSearchEntry = {
  id: string;
  title: string;
  href: string;
  kind: "page" | "section";
  pageTitle: string;
  excerpt: string;
  searchText: string;
};

export type TrainingSearchResult = Omit<TrainingSearchEntry, "searchText">;

function stripMarkdown(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^>\s?/gm, "")
    .replace(/^[-*+]\s+/gm, "")
    .replace(/^\d+\.\s+/gm, "")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\*\*|__|\*|_/g, "")
    .replace(/\|/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function compactExcerpt(text: string, max = 180): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trimEnd()}…`;
}

function extractSectionEntries(markdown: string, hrefBase: string, pageTitle: string, prefix: string): TrainingSearchEntry[] {
  const lines = markdown.split("\n");
  const entries: TrainingSearchEntry[] = [];

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i]?.trim() ?? "";
    const match = /^(##|###)\s+(.+)$/.exec(line);
    if (!match) continue;

    const rawTitle = match[2].replace(/\*\*/g, "").trim();
    const idBase = slugifyHeading(rawTitle);
    if (!idBase) continue;

    const excerptLines: string[] = [];
    for (let j = i + 1; j < lines.length; j += 1) {
      const next = lines[j]?.trim() ?? "";
      if (/^###{0,1}\s+/.test(next)) break;
      if (!next || next === "---") continue;
      excerptLines.push(next);
      if (excerptLines.join(" ").length > 220) break;
    }

    const excerpt = compactExcerpt(stripMarkdown(excerptLines.join(" ")));
    const href = `${hrefBase}#${idBase}-${i + 1}`;

    entries.push({
      id: `${prefix}-section-${i + 1}`,
      title: rawTitle,
      href,
      kind: "section",
      pageTitle,
      excerpt,
      searchText: `${pageTitle} ${rawTitle} ${excerpt}`.trim(),
    });
  }

  return entries;
}

function buildPageEntry(params: {
  id: string;
  title: string;
  href: string;
  body: string;
}): TrainingSearchEntry {
  const body = stripMarkdown(params.body);
  return {
    id: params.id,
    title: params.title,
    href: params.href,
    kind: "page",
    pageTitle: params.title,
    excerpt: compactExcerpt(body),
    searchText: `${params.title} ${body}`.trim(),
  };
}

export async function getTrainingSearchEntries(): Promise<TrainingSearchEntry[]> {
  const entries: TrainingSearchEntry[] = [];

  entries.push(
    buildPageEntry({
      id: "hub",
      title: "Guide pratique IA",
      href: "/formation-ia",
      body: [
        "Guide pratique IA et développement web.",
        "Sécurité, assistants d’édition, prompts, BMAD, GEO, intégration produit, travaux pratiques, évaluation et QCM.",
        ...TRAINING_CHAPTERS.map((chapter) => `${chapter.title}. ${chapter.cardDescription}`),
      ].join(" "),
    })
  );

  const feuilleDeRoute = await getPageDeGardeMarkdown();
  if (feuilleDeRoute) {
    entries.push(
      buildPageEntry({
        id: "feuille-de-route",
        title: "Feuille de route",
        href: "/formation-ia/feuille-de-route",
        body: feuilleDeRoute,
      })
    );
    entries.push(
      ...extractSectionEntries(
        feuilleDeRoute,
        "/formation-ia/feuille-de-route",
        "Feuille de route",
        "feuille-de-route"
      )
    );
  }

  const slugs = getAllChapterSlugs();
  for (const slug of slugs) {
    const chapter = TRAINING_CHAPTERS.find((item) => item.slug === slug);
    const markdown = await getChapterMarkdown(slug);
    if (!chapter || !markdown) continue;

    const pageTitle = `Chapitre ${chapter.number} : ${chapter.title}`;
    const hrefBase = `/formation-ia/chapitre/${slug}`;

    entries.push(
      buildPageEntry({
        id: `chapter-${slug}`,
        title: pageTitle,
        href: hrefBase,
        body: markdown,
      })
    );

    entries.push(...extractSectionEntries(markdown, hrefBase, pageTitle, slug));
  }

  return entries;
}

let searchEntriesPromise: Promise<TrainingSearchEntry[]> | null = null;

async function getCachedTrainingSearchEntries(): Promise<TrainingSearchEntry[]> {
  if (!searchEntriesPromise) {
    searchEntriesPromise = getTrainingSearchEntries();
  }
  return searchEntriesPromise;
}

function normalizeSearch(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .trim();
}

function scoreEntry(entry: TrainingSearchEntry, query: string): number {
  const title = normalizeSearch(entry.title);
  const pageTitle = normalizeSearch(entry.pageTitle);
  const text = normalizeSearch(entry.searchText);

  let score = 0;
  if (title === query) score += 120;
  if (title.startsWith(query)) score += 80;
  if (title.includes(query)) score += 50;
  if (pageTitle.includes(query)) score += 20;
  if (text.includes(query)) score += 10;
  if (entry.kind === "page") score += 4;
  return score;
}

export async function searchTrainingEntries(query: string, limit = 8): Promise<TrainingSearchResult[]> {
  const normalizedQuery = normalizeSearch(query);
  if (normalizedQuery.length < 2) return [];

  const entries = await getCachedTrainingSearchEntries();
  return entries
    .map((entry) => ({ entry, score: scoreEntry(entry, normalizedQuery) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title, "fr"))
    .slice(0, limit)
    .map(({ entry }) => ({
      id: entry.id,
      title: entry.title,
      href: entry.href,
      kind: entry.kind,
      pageTitle: entry.pageTitle,
      excerpt: entry.excerpt,
    }));
}
