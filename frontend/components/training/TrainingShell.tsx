"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import type { TrainingChapterMeta } from "@/lib/training/course";
import { useTrainingChapterProgress } from "@/components/training/useTrainingChapterProgress";

type TrainingShellProps = {
  chapters: TrainingChapterMeta[];
  currentSlug: string;
  currentIndex: number;
  prev: TrainingChapterMeta | null;
  next: TrainingChapterMeta | null;
  children: ReactNode;
  /** En-tête du chapitre (fil d’Ariane, titre) : rendu dans la colonne principale, aligné avec le contenu. */
  header?: ReactNode;
  className?: string;
};

function stripHeadingNumberPrefix(title: string) {
  return title.replace(/^\d+(?:\.\d+)*\.?\s+/u, "").trim();
}

export function TrainingShell({
  chapters,
  currentSlug,
  currentIndex,
  prev,
  next,
  children,
  header,
  className,
}: TrainingShellProps) {
  const total = chapters.length;
  const progress = total > 0 ? Math.round(((currentIndex + 1) / total) * 100) : 0;
  const currentMeta = currentIndex >= 0 ? chapters[currentIndex] : undefined;
  const progressLabel = currentMeta?.number ?? (currentIndex >= 0 ? currentIndex + 1 : "?");
  const { mainHeadings, activeMainHeading, scrollToHeading } = useTrainingChapterProgress(currentSlug);
  const desktopNavRef = useRef<HTMLDivElement | null>(null);
  const mobileNavRef = useRef<HTMLDivElement | null>(null);
  const [expandedChapterSlug, setExpandedChapterSlug] = useState<string | null>(currentSlug);

  useEffect(() => {
    setExpandedChapterSlug(currentSlug);
  }, [currentSlug]);

  useEffect(() => {
    const scrollActiveIntoView = (container: HTMLDivElement | null) => {
      const activeItem =
        container?.querySelector<HTMLElement>("[data-sidebar-toc-active='true']") ??
        container?.querySelector<HTMLElement>("[data-sidebar-current-chapter='true']");
      if (!activeItem) return;
      activeItem.scrollIntoView({ block: "center", inline: "nearest" });
    };

    scrollActiveIntoView(desktopNavRef.current);
    scrollActiveIntoView(mobileNavRef.current);
  }, [activeMainHeading?.id, currentSlug]);

  const chapterToc = mainHeadings.length ? (
    <nav aria-label="Sommaire du chapitre" className="space-y-0.5">
      {mainHeadings.map((heading) => {
        const active = heading.id === activeMainHeading?.id;

        return (
          <div key={heading.id} className="space-y-0.5">
            <a
              href={`#${heading.id}`}
              onClick={(event) => {
                event.preventDefault();
                scrollToHeading(heading.id);
              }}
              data-sidebar-toc-active={active ? "true" : "false"}
              className={cn(
                "group flex items-start gap-2 rounded-sm px-2 py-1 text-[0.78rem] leading-5 transition-colors",
                active
                  ? "bg-primary/8 font-medium text-foreground"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )}
            >
              <span
                className="mt-[0.1rem] w-4 shrink-0 text-right text-[0.72rem] text-muted-foreground"
                aria-hidden
              >
                {heading.mainIndex}
              </span>
              <span className="min-w-0 flex-1 text-pretty leading-snug">
                {stripHeadingNumberPrefix(heading.title)}
              </span>
            </a>
          </div>
        );
      })}
    </nav>
  ) : null;

  const navList = (
    <nav aria-label="Chapitres du parcours" className="space-y-0.5">
      {chapters.map((c) => {
        const active = c.slug === currentSlug;
        const expanded = active && expandedChapterSlug === c.slug;
        return (
          <div key={c.slug} className="rounded-sm">
            <Link
              href={`/formation-ia/chapitre/${c.slug}`}
              aria-label={`Chapitre ${c.number} : ${c.title}`}
              data-sidebar-current-chapter={active ? "true" : "false"}
              onClick={(event) => {
                if (!active) return;
                event.preventDefault();
                setExpandedChapterSlug((current) => (current === c.slug ? null : c.slug));
              }}
              className={cn(
                "flex items-start gap-2 rounded-sm px-2 py-1 text-[0.8rem] leading-5 transition-colors",
                active
                  ? "bg-primary/8 font-medium text-foreground"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )}
            >
              <span className="w-7 shrink-0 text-right text-[0.72rem] font-medium text-muted-foreground" aria-hidden>
                {c.number}.
              </span>
              <span className="min-w-0 flex-1 text-pretty leading-snug">{c.title}</span>
            </Link>
            {expanded && chapterToc ? (
              <div className="mt-1 border-l border-border/60 pl-2 ml-5">{chapterToc}</div>
            ) : null}
          </div>
        );
      })}
    </nav>
  );

  return (
    <div
      className={cn(
        "grid min-h-0 w-full flex-1 grid-cols-1 lg:min-h-[calc(100dvh-3.5rem)] lg:grid-cols-[15.5rem_minmax(0,1fr)] lg:gap-0 xl:grid-cols-[16.5rem_minmax(0,1fr)]",
        className
      )}
    >
      <div className="relative hidden min-h-0 min-w-0 lg:block" aria-hidden>
        <aside className="fixed left-[max(0px,calc((100vw-1920px)/2))] top-14 z-10 flex h-[calc(100dvh-3.5rem)] w-[15.5rem] flex-col overflow-hidden border-r border-border/80 bg-muted/20 xl:w-[16.5rem]">
          <div className="shrink-0 space-y-2 border-b border-border/60 px-4 pb-3 pt-4">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Parcours
            </p>
            <p className="text-sm font-semibold text-foreground">
              Chapitre {progressLabel} sur {total}
            </p>
            <div className="h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-[width] duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-[0.75rem] text-muted-foreground">{progress}% du parcours</p>
          </div>
          <div ref={desktopNavRef} className="min-h-0 flex-1 overflow-y-auto px-3 py-3">
            <p className="mb-2 px-2 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Sommaire
            </p>
            {navList}
          </div>
          <div className="mt-auto shrink-0 border-t border-border/60 bg-muted/15 px-3 py-3">
            <Button asChild variant="outline" size="sm" className="w-full">
              <Link href="/formation-ia">Vue d’ensemble</Link>
            </Button>
          </div>
        </aside>
      </div>

      <div data-training-scroll-container className="flex min-h-0 min-w-0 flex-col lg:min-h-0 lg:overflow-y-auto">
        <div className="mx-auto flex w-full min-w-0 max-w-[min(40rem,calc(100%-2rem))] flex-1 flex-col px-5 pt-6 sm:max-w-[44rem] sm:px-8 sm:pt-8 lg:max-w-[48rem] lg:px-12 lg:pt-10 xl:max-w-[52rem] xl:px-20 xl:pt-12 2xl:max-w-[56rem]">
          {header ? (
            <div className="shrink-0 border-b border-border/60 pb-6 lg:pb-8">
              {header}
            </div>
          ) : null}
          <div className="mb-5 shrink-0 pt-3 sm:pt-4 lg:hidden">
            <Accordion type="single" collapsible className="rounded-xl border border-border/80 bg-card/40">
              <AccordionItem value="sommaire-parcours" className="border-0">
                <AccordionTrigger className="px-4 py-3 hover:no-underline">
                  <span className="flex items-center gap-2 text-small font-semibold">
                    <Menu className="size-4" aria-hidden />
                    Chapitres du parcours
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-2 pb-3">
                  <div
                    ref={mobileNavRef}
                    className="max-h-[min(24rem,50vh)] overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                  >
                  {navList}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <article data-training-article className="w-full flex-1 py-8 sm:py-9 lg:py-10 lg:pb-14">
            {children}
          </article>

          <div className="mt-10 flex w-full shrink-0 flex-col gap-3 pb-[calc(6rem+env(safe-area-inset-bottom))] sm:flex-row sm:gap-4 sm:pb-28">
            {prev ? (
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-auto min-h-11 w-full whitespace-normal py-3 sm:flex-1 sm:min-w-0"
              >
                <Link
                  href={`/formation-ia/chapitre/${prev.slug}`}
                  className="inline-flex items-start justify-start gap-2.5 text-left"
                >
                  <ChevronLeft className="mt-1 size-4 shrink-0" aria-hidden />
                  <span className="min-w-0 text-pretty leading-snug">
                    Ch. {prev.number} : {prev.title}
                  </span>
                </Link>
              </Button>
            ) : (
              <span className="hidden sm:block sm:flex-1" />
            )}
            {next ? (
              <Button
                asChild
                size="lg"
                className="h-auto min-h-11 w-full whitespace-normal py-3 sm:flex-1 sm:min-w-0"
              >
                <Link
                  href={`/formation-ia/chapitre/${next.slug}`}
                  className="inline-flex items-start justify-end gap-2.5 text-right"
                >
                  <span className="min-w-0 text-pretty leading-snug">
                    Ch. {next.number} : {next.title}
                  </span>
                  <ChevronRight className="mt-1 size-4 shrink-0" aria-hidden />
                </Link>
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
