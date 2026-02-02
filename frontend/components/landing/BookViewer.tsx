"use client";

import { useState, useEffect, useRef } from "react";
import { HtmlBookContent } from "@/components/landing/HtmlBookContent";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

/** Header + espacement + pagination pour garder tout visible au changement de page. */
const SCROLL_OFFSET_PX = 200;

type BookViewerProps = {
  pages: string[];
};

function PaginationNav({
  currentIndex,
  totalPages,
  onPrev,
  onNext,
  onPageChange,
  canPrev,
  canNext,
  className = "",
}: {
  currentIndex: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  onPageChange: (index: number) => void;
  canPrev: boolean;
  canNext: boolean;
  className?: string;
}) {
  const [inputValue, setInputValue] = useState(String(currentIndex + 1));

  useEffect(() => {
    setInputValue(String(currentIndex + 1));
  }, [currentIndex]);

  const applyPage = () => {
    const v = parseInt(inputValue, 10);
    if (!isNaN(v) && v >= 1 && v <= totalPages) {
      onPageChange(v - 1);
    } else {
      setInputValue(String(currentIndex + 1));
    }
  };

  return (
    <nav
      className={`flex flex-wrap items-center justify-center gap-2 sm:gap-4 ${className}`}
      aria-label="Pagination du livre"
    >
      <Button
        variant="outline"
        size="default"
        className="h-9 gap-1.5 px-3 text-sm sm:h-10 sm:px-4 sm:text-base"
        onClick={onPrev}
        disabled={!canPrev}
        aria-label="Page précédente"
      >
        <ChevronLeft className="h-4 w-4 shrink-0" />
        <span className="hidden sm:inline">Précédent</span>
      </Button>

      <div className="flex items-center gap-2">
        <label htmlFor="book-page-input" className="sr-only">
          Aller à la page
        </label>
        <input
          id="book-page-input"
          type="number"
          min={1}
          max={totalPages}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={applyPage}
          onKeyDown={(e) => e.key === "Enter" && applyPage()}
          className="h-9 w-14 rounded-md border border-input bg-background px-2 py-1.5 text-center text-sm text-foreground tabular-nums [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:[-webkit-appearance:none] [&::-webkit-outer-spin-button]:[-webkit-appearance:none] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 sm:h-10 sm:w-16"
          aria-label="Numéro de page"
        />
        <span className="text-sm text-muted-foreground tabular-nums">
          / {totalPages}
        </span>
      </div>

      <Button
        variant="outline"
        size="default"
        className="h-9 gap-1.5 px-3 text-sm sm:h-10 sm:px-4 sm:text-base"
        onClick={onNext}
        disabled={!canNext}
        aria-label="Page suivante"
      >
        <span className="hidden sm:inline">Suivant</span>
        <ChevronRight className="h-4 w-4 shrink-0" />
      </Button>
    </nav>
  );
}

export function BookViewer({ pages }: BookViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const contentStartRef = useRef<HTMLDivElement>(null);

  const canPrev = currentIndex > 0;
  const canNext = currentIndex < pages.length - 1;
  const goPrev = () => setCurrentIndex((i) => Math.max(0, i - 1));
  const goNext = () => setCurrentIndex((i) => Math.min(pages.length - 1, i + 1));
  const goToPage = (index: number) =>
    setCurrentIndex(Math.max(0, Math.min(pages.length - 1, index)));

  useEffect(() => {
    const el = contentStartRef.current;
    if (!el) return;
    const top =
      el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET_PX;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  }, [currentIndex]);

  const pageContent = pages[currentIndex];

  if (!pages.length) {
    return (
      <div className="rounded-xl border border-border/50 bg-card p-8 text-center text-muted-foreground">
        Aucun contenu à afficher.
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      {/* Pagination en haut */}
      {pages.length > 1 && (
        <PaginationNav
          currentIndex={currentIndex}
          totalPages={pages.length}
          onPrev={goPrev}
          onNext={goNext}
          onPageChange={goToPage}
          canPrev={canPrev}
          canNext={canNext}
          className="pb-6"
        />
      )}

      {/* Ancre pour le scroll au changement de page : on vise le début du contenu (sous la pagination). */}
      <div ref={contentStartRef} className="w-full flex justify-center" aria-hidden>
        <section
          key={currentIndex}
          className="w-full md:max-w-[210mm] md:min-w-0 rounded-xl border border-border/50 bg-card shadow-lg print:shadow-none"
        >
          <div className="p-4 sm:p-6 md:p-8">
            <HtmlBookContent html={pageContent} />
          </div>
        </section>
      </div>

      {/* Pagination en bas */}
      {pages.length > 1 && (
        <PaginationNav
          currentIndex={currentIndex}
          totalPages={pages.length}
          onPrev={goPrev}
          onNext={goNext}
          onPageChange={goToPage}
          canPrev={canPrev}
          canNext={canNext}
          className="py-6"
        />
      )}
    </div>
  );
}
