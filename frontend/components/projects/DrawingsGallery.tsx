"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

import type { BookItem } from "@/data/books";
import { DRAWING_BLUR_DATA_URL, type DrawingItem } from "@/data/drawings";
import { BookCard } from "./BookCard";

type Entry = { kind: "book"; book: BookItem; year: number } | { kind: "drawing"; drawing: DrawingItem; index: number; year: number };

/**
 * Galerie unique « écrits et dessins » : livres et dessins mêlés, du plus récent au plus ancien.
 * Les livres renvoient vers leur lecture ; les dessins s'ouvrent dans une modale.
 */
export function DrawingsGallery({ items, books = [] }: { items: DrawingItem[]; books?: BookItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);

  useEffect(() => setMounted(true), []);

  // Livres et dessins mêlés, du plus récent au plus ancien (tri stable : à année égale, ordre des données).
  const { entries, ordered } = useMemo(() => {
    const sorted = [
      ...books.map((book) => ({ kind: "book" as const, book, year: book.year ?? 0 })),
      ...items.map((drawing) => ({ kind: "drawing" as const, drawing, year: drawing.date ?? 0 })),
    ].sort((a, b) => b.year - a.year);
    // Les flèches de la modale suivent l'ordre d'affichage des dessins.
    const ordered: DrawingItem[] = [];
    const entries: Entry[] = sorted.map((e) => {
      if (e.kind === "book") return e;
      ordered.push(e.drawing);
      return { ...e, index: ordered.length - 1 };
    });
    return { entries, ordered };
  }, [books, items]);

  const close = useCallback(() => {
    setOpen(null);
    lastTrigger.current?.focus();
  }, []);
  const step = useCallback(
    (d: number) => setOpen((i) => (i === null ? i : (i + d + ordered.length) % ordered.length)),
    [ordered.length],
  );

  const isOpen = open !== null;

  // Clavier + blocage du scroll : une seule fois par ouverture, pas à chaque dessin.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, close, step]);

  const current = open !== null ? ordered[open] : null;

  // La modale est rendue dans <body> : la page est enveloppée dans `.page-enter` (template.tsx),
  // dont l'animation crée un contexte d'empilement et un bloc conteneur qui piégeaient le `fixed`
  // (header par-dessus la modale, modale décalée).
  const modal = current && (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={current.title ?? current.alt}
      className="fixed inset-0 z-[150] flex items-center justify-center bg-castel-ink/95 p-4 font-sans sm:p-10"
      onClick={close}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={close}
        className="absolute right-4 top-4 z-10 rounded-full bg-white px-5 py-3 font-display text-sm font-semibold text-castel-ink sm:right-8 sm:top-8"
      >
        Fermer
      </button>
      {ordered.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Dessin précédent"
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white px-4 py-3 font-display text-lg font-semibold text-castel-ink sm:left-8"
          >
            &larr;
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Dessin suivant"
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white px-4 py-3 font-display text-lg font-semibold text-castel-ink sm:right-8"
          >
            &rarr;
          </button>
        </>
      )}
      <figure className="flex max-h-full max-w-full flex-col items-center gap-3" onClick={(e) => e.stopPropagation()}>
        {current.videoSrc ? (
          <video
            key={current.id}
            src={current.videoSrc}
            poster={current.src}
            controls
            autoPlay
            playsInline
            className="max-h-[78vh] max-w-full rounded-chip"
          />
        ) : (
          <Image
            key={current.id}
            src={current.src}
            alt={current.alt}
            width={current.width}
            height={current.height}
            sizes="90vw"
            quality={90}
            className="h-auto max-h-[78vh] w-auto max-w-full rounded-chip object-contain"
          />
        )}
        <figcaption className="text-sm text-white">
          {current.title}
          {current.date ? `, ${current.date}` : ""}
        </figcaption>
      </figure>
    </div>
  );

  return (
    <>
      <ul className="columns-2 gap-4 p-0 md:columns-3 md:gap-6 lg:columns-4">
        {entries.map((entry) =>
          entry.kind === "book" ? (
            <li key={`book-${entry.book.id}`} className="mb-4 list-none break-inside-avoid md:mb-6">
              <BookCard book={entry.book} />
            </li>
          ) : (
            <li key={`drawing-${entry.drawing.id}`} className="mb-4 list-none break-inside-avoid md:mb-6">
              <button
                type="button"
                onClick={(e) => {
                  lastTrigger.current = e.currentTarget;
                  setOpen(entry.index);
                }}
                className="group block w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                aria-label={`Agrandir : ${entry.drawing.title ?? entry.drawing.alt}`}
              >
                <span className="block overflow-hidden rounded-chip bg-castel-surface motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:-translate-y-1.5">
                  <Image
                    src={entry.drawing.src}
                    alt={entry.drawing.alt}
                    width={entry.drawing.width}
                    height={entry.drawing.height}
                    sizes="(min-width: 1024px) 24vw, (min-width: 768px) 32vw, 48vw"
                    placeholder="blur"
                    blurDataURL={DRAWING_BLUR_DATA_URL}
                    className="h-auto w-full"
                  />
                </span>
                {(entry.drawing.title || entry.drawing.date) && (
                  <span className="mt-2 flex items-baseline justify-between gap-2 px-1 text-sm">
                    <span className="font-display font-semibold text-white">{entry.drawing.title}</span>
                    {entry.drawing.date && <span className="text-[#A1A1AA]">{entry.drawing.date}</span>}
                  </span>
                )}
              </button>
            </li>
          ),
        )}
      </ul>

      {mounted && modal ? createPortal(modal, document.body) : null}
    </>
  );
}
