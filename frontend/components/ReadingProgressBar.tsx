"use client";

import { usePathname } from "next/navigation";

import { useTrainingChapterProgress } from "@/components/training/useTrainingChapterProgress";

/**
 * Barre fine en tête de viewport : remplissage selon la position de défilement.
 */
export function ReadingProgressBar() {
  const pathname = usePathname();
  const { ratio } = useTrainingChapterProgress(pathname);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[10002] h-1 bg-muted/40" aria-hidden>
      <div
        className="h-full w-full origin-left bg-primary will-change-transform"
        style={{ transform: `scaleX(${ratio})` }}
      />
    </div>
  );
}
