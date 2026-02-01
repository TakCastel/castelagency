"use client";

import { useMemo, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { splitIntoPages } from "@/lib/homme-masque-verre";

const CHARS_PER_PAGE = 1800;

type BookReaderProps = {
  title: string;
  paragraphs: string[];
};

function BookPage({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="book-page flex min-h-0 flex-col rounded-lg border border-border/60 bg-card/80 p-6 shadow-lg shadow-black/10 sm:p-8">
      <div className="flex-1 space-y-4 text-paragraphe leading-relaxed text-muted-foreground">
        {paragraphs.map((p, i) => (
          <p key={i} className="text-pretty">
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}

export function BookReader({ title, paragraphs }: BookReaderProps) {
  const pages = useMemo(
    () => splitIntoPages(paragraphs, CHARS_PER_PAGE),
    [paragraphs]
  );
  const totalPages = pages.length;

  const [spreadIndex, setSpreadIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const maxSpread = isDesktop ? Math.ceil(totalPages / 2) : totalPages;
  const clampedIndex = Math.max(0, Math.min(spreadIndex, maxSpread - 1));

  const pageIndicesToShow: number[] = isDesktop
    ? [clampedIndex * 2, clampedIndex * 2 + 1].filter((i) => i < totalPages)
    : [clampedIndex];

  const goPrev = () => setSpreadIndex((i) => Math.max(0, i - 1));
  const goNext = () => setSpreadIndex((i) => Math.min(maxSpread - 1, i + 1));

  return (
    <div className="flex w-full flex-col">
      <header className="mb-8 text-center">
        <h1 className="text-titre-moyen font-semibold tracking-tight text-foreground">
          {title}
        </h1>
      </header>

      <div className="grid w-full gap-4 md:grid-cols-2 md:gap-6">
        {pageIndicesToShow.map((pageIndex) => (
          <BookPage key={pageIndex} paragraphs={pages[pageIndex]} />
        ))}
      </div>

      <nav
        className="mt-8 flex flex-wrap items-center justify-center gap-4"
        aria-label="Pagination du livre"
      >
        <Button
          variant="outline"
          size="lg"
          onClick={goPrev}
          disabled={clampedIndex <= 0}
          className="gap-2"
          aria-label="Page précédente"
        >
          <ChevronLeft className="h-4 w-4" />
          Précédent
        </Button>
        <span className="text-small font-medium text-muted-foreground" aria-live="polite">
          Page {clampedIndex + 1} / {maxSpread}
        </span>
        <Button
          variant="outline"
          size="lg"
          onClick={goNext}
          disabled={clampedIndex >= maxSpread - 1}
          className="gap-2"
          aria-label="Page suivante"
        >
          Suivant
          <ChevronRight className="h-4 w-4" />
        </Button>
      </nav>
    </div>
  );
}
