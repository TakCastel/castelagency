import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { TrainingProse } from "@/components/training/TrainingProse";
import { TrainingQuiz } from "@/components/training/TrainingQuiz";
import { TrainingShell } from "@/components/training/TrainingShell";
import { getAdjacentChapters, getChapterMeta, TRAINING_CHAPTERS } from "@/lib/training/course";
import { getAllChapterSlugs, getChapterMarkdown } from "@/lib/training/load-markdown";
import { parseQcmFromMarkdown } from "@/lib/training/parse-qcm-from-markdown";
import { FORMATION_CHAPTER_OUTER } from "@/lib/training/formation-container";
import { cn } from "@/lib/utils";

const SITE_URL = "https://studio-castel.com";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllChapterSlugs().map((slug) => ({ slug }));
}

function firstParagraphExcerpt(markdown: string, max = 180): string {
  const lines = markdown.split("\n");
  for (const line of lines) {
    const t = line.trim();
    if (!t || t.startsWith("#") || t.startsWith("---")) continue;
    if (t.startsWith("|")) continue;
    const plain = t.replace(/\*\*/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
    if (plain.length <= max) return plain;
    return `${plain.slice(0, max - 1)}…`;
  }
  return "Chapitre du guide pratique IA.";
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const meta = getChapterMeta(slug);
  const md = await getChapterMarkdown(slug);
  if (!meta || !md) {
    return { title: "Chapitre introuvable" };
  }
  const title = `Ch. ${meta.number} : ${meta.title} | Guide pratique IA`;
  const description = firstParagraphExcerpt(md);
  return {
    title: `${title} | Studio Castel`,
    description,
    openGraph: {
      title: `${title} | Studio Castel`,
      description,
      type: "article",
      locale: "fr_FR",
      url: `${SITE_URL}/formation-ia/chapitre/${slug}`,
    },
    alternates: {
      canonical: `/formation-ia/chapitre/${slug}`,
    },
  };
}

export default async function FormationChapterPage({ params }: Props) {
  const { slug } = await params;
  const markdown = await getChapterMarkdown(slug);
  const chapterMeta = getChapterMeta(slug);
  if (!markdown || !chapterMeta) notFound();

  const { prev, next, index } = getAdjacentChapters(slug);
  const isQcm = slug === "11-banque-qcm";
  const quizItems = isQcm ? parseQcmFromMarkdown(markdown) : [];

  const chapterHeader = (
    <>
      <nav className="text-small text-muted-foreground">
        <Link href="/formation-ia" className="hover:text-foreground">
          Guide pratique
        </Link>
        <span aria-hidden className="mx-2">
          /
        </span>
        <span className="text-foreground">Chapitre {chapterMeta.number}</span>
      </nav>
      <h1 className="mt-4 text-pretty text-titre-moyen font-semibold tracking-tight text-foreground lg:mt-5">
        {chapterMeta.number}. {chapterMeta.title}
      </h1>
      <p className="mt-2 text-small text-muted-foreground">Durée indicative : {chapterMeta.durationLabel}</p>
    </>
  );

  return (
    <div className={cn(FORMATION_CHAPTER_OUTER, "flex min-h-0 flex-1 flex-col lg:min-h-[calc(100dvh-3.5rem)]")}>
      <TrainingShell
        className="min-h-0 flex-1"
        header={chapterHeader}
        chapters={TRAINING_CHAPTERS}
        currentSlug={slug}
        currentIndex={index}
        prev={prev}
        next={next}
      >
        {isQcm ? (
          <TrainingQuiz items={quizItems} />
        ) : (
          <TrainingProse content={markdown} />
        )}
      </TrainingShell>
    </div>
  );
}
