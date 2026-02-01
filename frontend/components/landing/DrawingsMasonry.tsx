"use client";

import { useState, useCallback, useEffect } from "react";
import Masonry from "react-masonry-css";

import type { DrawingItem } from "@/lib/drawings";

type DrawingsMasonryProps = {
  drawings: DrawingItem[];
};

const breakpointCols = {
  default: 3,
  1024: 3,
  768: 2,
  500: 1,
};

function DrawingThumbnail({
  drawing,
  onClick,
}: {
  drawing: DrawingItem;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group block w-full overflow-hidden rounded-xl border border-border/50 bg-muted/30 shadow-sm transition-shadow hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label={`Agrandir : ${drawing.alt}`}
    >
      <span className="block w-full overflow-hidden rounded-xl">
        {/* Taille naturelle du dessin pour un vrai masonry (hauteurs variables) */}
        <img
          src={drawing.src}
          alt={drawing.alt}
          className="w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
          loading="lazy"
        />
      </span>
    </button>
  );
}

function DrawingModal({
  drawing,
  onClose,
}: {
  drawing: DrawingItem;
  onClose: () => void;
}) {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={drawing.alt}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 p-4"
      onClick={handleBackdropClick}
    >
      <div
        className="flex max-h-[85vh] max-w-[90vw] items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {drawing.videoSrc ? (
          <video
            src={drawing.videoSrc}
            controls
            autoPlay
            playsInline
            className="max-h-[85vh] max-w-full rounded-lg shadow-2xl"
            aria-label={drawing.alt}
          />
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={drawing.src}
            alt={drawing.alt}
            className="max-h-[85vh] max-w-full rounded-lg object-contain shadow-2xl"
          />
        )}
      </div>
      {(drawing.title || drawing.date) && (
        <p className="mt-3 text-center text-sm text-white/90">
          {[drawing.title, drawing.date].filter(Boolean).join(", ")}
        </p>
      )}
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        aria-label="Fermer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>
    </div>
  );
}

/**
 * Grille masonry des dessins : vignettes cliquables qui ouvrent une modale avec l’image agrandie.
 */
export function DrawingsMasonry({ drawings: items }: DrawingsMasonryProps) {
  const [selected, setSelected] = useState<DrawingItem | null>(null);
  const openModal = useCallback((drawing: DrawingItem) => setSelected(drawing), []);
  const closeModal = useCallback(() => setSelected(null), []);

  if (items.length === 0) {
    return (
      <p className="mt-14 text-center text-muted-foreground">
        Aucun dessin pour le moment.
      </p>
    );
  }

  return (
    <>
      <Masonry
        breakpointCols={breakpointCols}
        className="projects-masonry-grid mt-14 md:mt-20"
        columnClassName="projects-masonry-grid_column"
      >
        {items.map((drawing) => (
          <DrawingThumbnail
            key={drawing.id}
            drawing={drawing}
            onClick={() => openModal(drawing)}
          />
        ))}
      </Masonry>
      {selected && (
        <DrawingModal drawing={selected} onClose={closeModal} />
      )}
    </>
  );
}
