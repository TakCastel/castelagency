import { readFile } from "fs/promises";
import path from "path";

import { getChapterSlugs } from "@/lib/training/course";

const DOCS_TRAINING = path.join(process.cwd(), "docs", "training");
const CHAPITRES = path.join(DOCS_TRAINING, "chapitres");

/** Retire le `# Chapitre n …` en tête de fichier (déjà affiché par la page chapitre). */
export function stripDuplicateChapterFileHeading(md: string): string {
  return md.replace(/^#\s*Chapitre\s+\d+[^\n]*\n+/u, "");
}

export async function getPageDeGardeMarkdown(): Promise<string> {
  const p = path.join(DOCS_TRAINING, "page-de-garde-notion.md");
  return readFile(p, "utf8").catch(() => "");
}

export async function getChapterMarkdown(slug: string): Promise<string | null> {
  if (!/^[0-9]{2}-[a-z0-9-]+$/.test(slug)) return null;
  const p = path.join(CHAPITRES, `${slug}.md`);
  try {
    const raw = await readFile(p, "utf8");
    return stripDuplicateChapterFileHeading(raw);
  } catch {
    return null;
  }
}

export function getAllChapterSlugs(): string[] {
  return getChapterSlugs();
}
