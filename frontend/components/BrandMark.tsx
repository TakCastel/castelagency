import * as React from "react";

import { cn } from "@/lib/utils";

type BrandMarkProps = {
  className?: string;
  title?: string;
};

/**
 * Studio Castel — château avignonnais (Palais des Papes) en une seule ligne.
 * Contour : base (porte en arc) → tour droite → créneaux → tour centrale → créneaux → tour gauche → base.
 */
export function BrandMark({ className, title = "Studio Castel" }: BrandMarkProps) {
  return (
    <svg
      aria-hidden={title ? undefined : true}
      role={title ? "img" : "presentation"}
      className={cn("h-8 w-8 shrink-0", className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      {title ? <title>{title}</title> : null}
      <path d="M3 21L8 21Q12 17 16 21L21 21L21 11L17 11L17 6L12 6L12 2L12 6L7 6L7 11L3 11L3 21Z" />
    </svg>
  );
}
