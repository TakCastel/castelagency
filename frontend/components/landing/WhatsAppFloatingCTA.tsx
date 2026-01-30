"use client";

import { useState } from "react";
import { MessageCircleMoreIcon } from "@/components/ui/message-circle-more";
import { cn } from "@/lib/utils";

const WHATSAPP_URL = "https://wa.me/33608432059";

const SIZE_ROUND = 56; // px : bouton rond (icône seule)
const SIZE_EXPANDED = 180; // px : bouton allongé (icône + texte)
const SECONDARY = "oklch(81.1% 0.111 293.571)";
const PAD_V = 14; // padding vertical
const PAD_LEFT_ROUND = 14; // padding gauche en état rond (icône décalée à gauche pour la bulle)
const PAD_H = 16; // padding horizontal unique (gauche étendu + droite toujours)

export function WhatsAppFloatingCTA() {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Appelez-moi sur WhatsApp"
      className={cn(
        "fixed bottom-6 right-6 z-[9997] flex items-center overflow-hidden rounded-full border shadow-lg shadow-black/20 backdrop-blur-sm transition-[width,box-shadow] duration-200 ease-out hover:shadow-xl hover:shadow-black/25 active:scale-[0.98]",
        "md:bottom-8 md:right-8"
      )}
      style={{
        height: SIZE_ROUND,
        width: hovered ? SIZE_EXPANDED : SIZE_ROUND,
        minWidth: SIZE_ROUND,
        backgroundColor: SECONDARY,
        borderColor: SECONDARY,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        className="flex shrink-0 items-center gap-3"
        style={{
          paddingTop: PAD_V,
          paddingBottom: PAD_V,
          paddingLeft: hovered ? PAD_H : PAD_LEFT_ROUND,
          paddingRight: PAD_H,
        }}
      >
        <MessageCircleMoreIcon size={28} className="shrink-0 text-[oklch(0.22_0.04_293)]" />
        <span
          className="inline-block overflow-hidden whitespace-nowrap text-paragraphe font-medium text-[oklch(0.22_0.04_293)] transition-[max-width,opacity] duration-200 ease-out"
          style={{
            maxWidth: hovered ? 120 : 0,
            opacity: hovered ? 1 : 0,
          }}
        >
          Appelez-moi
        </span>
      </span>
    </a>
  );
}
