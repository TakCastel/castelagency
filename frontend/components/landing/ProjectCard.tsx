"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ColorThief from "colorthief";

import { AnimatedSection } from "@/components/landing/AnimatedSection";
import {
  getHeroPatternDataUri,
  getPatternIndexForProject,
  getTintedColorForPattern,
  HERO_PATTERN_SIZE,
} from "@/lib/hero-patterns";
import { cn } from "@/lib/utils";
import type { ProjectItem } from "@/lib/projects";

const OVERLAY_ALPHA = 0.95; // aplat de couleur plus marqué, blur légèrement visible derrière
const PATTERN_OPACITY = 0.4; // motif Hero Patterns au-dessus de l’overlay

/** Luminance relative (0–1) : au-dessus du seuil → fond clair → texte noir, en dessous → texte blanc */
function getTextColorForBg(r: number, g: number, b: number): string {
  const L = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return L > 0.4 ? "#0a0a0a" : "#fff";
}

type ProjectCardProps = {
  project: ProjectItem;
  index: number;
};

/**
 * Carte projet pour la grille masonry : image très floutée + overlay couleur dominante (lib colorthief).
 * Titre dans le cadre couleur en bas à gauche, texte blanc ou noir selon la luminosité.
 */
export function ProjectCard({ project, index }: ProjectCardProps) {
  const [overlayColor, setOverlayColor] = useState<string | null>(null);
  const [textColor, setTextColor] = useState<string>("#0a0a0a");
  const [patternStyle, setPatternStyle] = useState<{
    backgroundImage: string;
  } | null>(null);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    try {
      const colorThief = new ColorThief();
      const [r, g, b] = colorThief.getColor(img, 10);
      setOverlayColor(`rgba(${r},${g},${b},${OVERLAY_ALPHA})`);
      setTextColor(getTextColorForBg(r, g, b));
      const hexTint = getTintedColorForPattern(r, g, b);
      const patternIndex = getPatternIndexForProject(project.id);
      setPatternStyle({
        backgroundImage: getHeroPatternDataUri(patternIndex, hexTint),
      });
    } catch {
      // CORS ou image non chargée : pas d’overlay
    }
  };

  return (
    <AnimatedSection delay={index}>
      <Link
        href={`/mes-projets/${project.id}`}
        className={cn(
          "group flex flex-col overflow-hidden rounded-xl border border-border/80 bg-card shadow-sm transition-shadow hover:shadow-md"
        )}
      >
        <div
          className={cn(
            "relative w-full overflow-hidden rounded-t-xl bg-muted",
            project.isMobileApp ? "aspect-square" : "aspect-[4/3]"
          )}
        >
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            className="project-card-image-engraving object-cover object-top"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onLoad={handleImageLoad}
          />
          {overlayColor && (
            <div
              className="pointer-events-none absolute inset-0 rounded-t-xl"
              style={{ backgroundColor: overlayColor }}
              aria-hidden
            />
          )}
          {patternStyle && (
            <div
              className="pointer-events-none absolute inset-0 overflow-hidden rounded-t-xl"
              aria-hidden
            >
              <div
                className="absolute left-1/2 top-1/2 h-[200%] w-[200%] bg-repeat"
                style={{
                  ...patternStyle,
                  backgroundSize: `${HERO_PATTERN_SIZE}px ${HERO_PATTERN_SIZE}px`,
                  opacity: PATTERN_OPACITY,
                  transform: "translate(-50%, -50%) rotate(40deg)",
                }}
              />
            </div>
          )}
          <h2
            className="absolute bottom-0 left-0 right-0 p-4 font-semibold tracking-tight"
            style={{
              color: overlayColor ? textColor : "var(--foreground)",
              ...(overlayColor &&
                textColor === "#fff" && {
                  textShadow: "0 1px 3px rgba(0,0,0,0.35)",
                }),
            }}
          >
            {project.title}
          </h2>
        </div>
        <div className="rounded-b-xl border border-t-0 border-border/80 bg-card px-4 py-4">
          <p className="mt-0 text-small text-muted-foreground line-clamp-2">
            {project.description}
          </p>
          <span className="mt-2 inline-flex items-center gap-1.5 text-small font-medium text-primary">
            En savoir plus
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </AnimatedSection>
  );
}
