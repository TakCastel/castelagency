"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import type { DrawingItem } from "@/data/drawings";

const navBtn =
  "absolute top-1/2 z-10 -translate-y-1/2 rounded-full bg-white px-4 py-3 font-display text-lg font-semibold text-castel-ink";

/**
 * Dessin en grand, flèches pour passer au dessin précédent / suivant.
 * Rendue dans <body> par le parent : `.page-enter` (template.tsx) piège les éléments `fixed`.
 */
export function DrawingLightbox({
  drawing,
  hasSiblings,
  onClose,
  onStep,
}: {
  drawing: DrawingItem;
  hasSiblings: boolean;
  onClose: () => void;
  onStep: (d: number) => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  // Clavier + blocage du scroll pendant l'ouverture.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onStep(1);
      else if (e.key === "ArrowLeft") onStep(-1);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose, onStep]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={drawing.title ?? drawing.alt}
      className="fixed inset-0 z-[150] flex items-center justify-center bg-castel-ink/95 p-4 font-sans sm:p-10"
      onClick={onClose}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 rounded-full bg-white px-5 py-3 font-display text-sm font-semibold text-castel-ink sm:right-8 sm:top-8"
      >
        Fermer
      </button>
      {hasSiblings && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onStep(-1);
            }}
            aria-label="Dessin précédent"
            className={`${navBtn} left-3 sm:left-8`}
          >
            &larr;
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onStep(1);
            }}
            aria-label="Dessin suivant"
            className={`${navBtn} right-3 sm:right-8`}
          >
            &rarr;
          </button>
        </>
      )}
      <figure
        className="flex max-h-full max-w-full flex-col items-center gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        {drawing.videoSrc ? (
          <video
            key={drawing.id}
            src={drawing.videoSrc}
            poster={drawing.src}
            controls
            autoPlay
            playsInline
            className="max-h-[78vh] max-w-full rounded-chip"
          />
        ) : (
          <Image
            key={drawing.id}
            src={drawing.src}
            alt={drawing.alt}
            width={drawing.width}
            height={drawing.height}
            sizes="90vw"
            quality={90}
            className="h-auto max-h-[78vh] w-auto max-w-full rounded-chip object-contain"
          />
        )}
        <figcaption className="text-sm text-white">
          {drawing.title}
          {drawing.date ? `, ${drawing.date}` : ""}
        </figcaption>
      </figure>
    </div>
  );
}
