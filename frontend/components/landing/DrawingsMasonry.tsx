"use client";

import { useState, useCallback, useEffect } from "react";
import Masonry from "react-masonry-css";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

import type { DrawingItem } from "@/lib/drawings";
import { DRAWING_BLUR_DATA_URL } from "@/lib/drawings";

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
        {/* Ratio naturel : image entière visible, pas de crop, masonry à hauteurs variables */}
        <Image
          src={drawing.src}
          alt={drawing.alt}
          width={drawing.width}
          height={drawing.height}
          placeholder="blur"
          blurDataURL={DRAWING_BLUR_DATA_URL}
          sizes="(max-width: 500px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 33vw, 25vw"
          className="w-full h-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
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
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={drawing.alt}
      className="fixed inset-0 z-[10000] flex h-[100dvh] w-full items-center justify-center bg-black/70 p-0"
      style={{ height: "100dvh" }}
      onClick={handleBackdropClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="relative flex h-full w-full min-h-0 max-h-[90dvh] items-center justify-center"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.92, opacity: 0.6 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0.8 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {drawing.videoSrc ? (
          <video
            src={drawing.videoSrc}
            controls
            autoPlay
            playsInline
            className="max-h-[90dvh] max-w-full w-auto object-contain"
            aria-label={drawing.alt}
          />
        ) : (
          <div className="relative h-full max-h-[90dvh] w-full min-h-0 min-w-0">
            <Image
              src={drawing.src}
              alt={drawing.alt}
              fill
              placeholder="blur"
              blurDataURL={DRAWING_BLUR_DATA_URL}
              className="object-contain"
              sizes="100vw"
            />
          </div>
        )}
      </motion.div>
      {(drawing.title || drawing.date) && (
        <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-sm text-white/80">
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
    </motion.div>
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
      <AnimatePresence>
        {selected && (
          <DrawingModal
            key={selected.id}
            drawing={selected}
            onClose={closeModal}
          />
        )}
      </AnimatePresence>
    </>
  );
}
