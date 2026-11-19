import { readFile } from "node:fs/promises";
import path from "node:path";

import type { Metadata } from "next";
import Link from "next/link";

import { books } from "@/data/books";
import { socialMeta } from "@/lib/seo";

const book = books.find((b) => b.id === "homme-masque-verre")!;

export const metadata: Metadata = {
  title: book.title,
  description: book.description,
  alternates: { canonical: book.internalPath },
  ...socialMeta({
    title: book.title,
    description: book.description,
    path: book.internalPath,
    images: [{ url: book.image, alt: book.imageAlt }],
  }),
};

const decode = (s: string) =>
  s
    .replace(/<[^>]+>/g, "")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"');

const slugify = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/** Fichier du dépôt : on retire quand même script, style et attributs on*. Ajoute des ancres aux chapitres. */
async function loadStory() {
  const file = path.join(process.cwd(), "data", "content", "ecritures", "l-homme-au-masque-de-verre.html");
  let html = await readFile(file, "utf8");
  html = html
    .replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, "")
    .replace(/\son[a-z]+\s*=\s*("[^"]*"|'[^']*')/gi, "");
  const chapters: { id: string; title: string }[] = [];
  const used = new Set<string>();
  html = html.replace(/<h2>([\s\S]*?)<\/h2>/g, (_, inner: string) => {
    const title = decode(inner);
    let id = slugify(title) || "chapitre";
    while (used.has(id)) id += "-bis";
    used.add(id);
    chapters.push({ id, title });
    return `<h2 id="${id}">${inner}</h2>`;
  });
  return { html, chapters };
}

const prose = [
  "font-serif text-[19px] leading-[1.8] text-castel-ink",
  "[&_p]:mb-5",
  "[&_h2]:mb-6 [&_h2]:mt-16 [&_h2]:scroll-mt-24 [&_h2]:font-display [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:leading-[1.15] [&_h2]:tracking-[-0.02em] sm:[&_h2]:text-4xl",
  "[&_blockquote]:my-10 [&_blockquote]:rounded-card [&_blockquote]:bg-white [&_blockquote]:p-6 [&_blockquote]:italic sm:[&_blockquote]:p-8",
  "[&_ul]:mb-5 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mb-2",
  "[&_strong]:font-semibold",
].join(" ");

export default async function StoryPage() {
  const { html, chapters } = await loadStory();
  return (
    <div className="bg-castel-paper-warm font-sans text-castel-ink">
      <article className="mx-auto max-w-[65ch] px-4 pb-24 pt-32 sm:px-0 sm:pt-40">
        <Link
          href="/creations"
          className="text-sm font-medium text-castel-red-deep underline underline-offset-4 hover:text-castel-ink"
        >
          Retour aux créations
        </Link>
        <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-[-0.02em] sm:text-6xl">{book.title}</h1>
        <p className="mt-4 text-sm font-medium uppercase tracking-[0.08em] text-[#52525B]">
          Roman{book.year ? `, ${book.year}` : ""}
        </p>

        {chapters.length > 0 && (
          <details className="mt-10 rounded-card bg-white p-6">
            <summary className="cursor-pointer font-display text-lg font-semibold">Chapitres ({chapters.length})</summary>
            <ol className="mt-4 columns-1 gap-8 text-base sm:columns-2">
              {chapters.map((c) => (
                <li key={c.id} className="mb-2 break-inside-avoid">
                  <a href={`#${c.id}`} className="text-castel-red-deep underline underline-offset-4 hover:text-castel-ink">
                    {c.title}
                  </a>
                </li>
              ))}
            </ol>
          </details>
        )}

        <div className={`mt-12 ${prose}`} dangerouslySetInnerHTML={{ __html: html }} />

        <Link
          href="/creations"
          className="mt-16 inline-block text-sm font-medium text-castel-red-deep underline underline-offset-4 hover:text-castel-ink"
        >
          Retour aux créations
        </Link>
      </article>
    </div>
  );
}
