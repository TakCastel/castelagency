"use client";

import Masonry from "react-masonry-css";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ProjectCard } from "@/components/landing/ProjectCard";
import { AnimatedSection } from "@/components/landing/AnimatedSection";
import type { ProjectItem } from "@/lib/projects";
import { cn } from "@/lib/utils";

type ProjectsMasonryProps = {
  projects: ProjectItem[];
};

const breakpointCols = {
  default: 3,
  1024: 3,
  768: 2,
  500: 1,
};

/** Carte placeholder "Votre projet ici ?" → lien vers demande de devis (5ème position). */
function DevisPlaceholderCard({ index }: { index: number }) {
  return (
    <AnimatedSection delay={index}>
      <Link
        href="/devis"
        className={cn(
          "group flex flex-col overflow-hidden rounded-xl border-2 border-dashed border-border bg-muted/50 shadow-sm transition-all hover:border-primary/50 hover:bg-muted hover:shadow-md"
        )}
      >
        <div className="relative flex aspect-[4/3] w-full flex-col items-center justify-center rounded-t-xl px-4 text-center">
          <span className="text-lg font-semibold tracking-tight text-foreground md:text-xl">
            Votre projet ici ?
          </span>
          <span className="mt-1 text-small text-muted-foreground">
            Demander un devis
          </span>
        </div>
        <div className="rounded-b-xl border-t border-border/80 bg-card px-4 py-4">
          <span className="inline-flex items-center gap-1.5 text-small font-medium text-primary">
            En savoir plus
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </AnimatedSection>
  );
}

/**
 * Grille masonry (react-masonry-css) : flux horizontal, colonnes à hauteur variable.
 * En 5ème position : carte "Votre projet ici ?" → lien vers /devis.
 */
export function ProjectsMasonry({ projects }: ProjectsMasonryProps) {
  const placeholderIndex = 4;
  const before = projects.slice(0, placeholderIndex);
  const after = projects.slice(placeholderIndex);

  return (
    <Masonry
      breakpointCols={breakpointCols}
      className="projects-masonry-grid mt-14 md:mt-20"
      columnClassName="projects-masonry-grid_column"
    >
      {before.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}
      <DevisPlaceholderCard key="devis-placeholder" index={placeholderIndex} />
      {after.map((project, index) => (
        <ProjectCard
          key={project.id}
          project={project}
          index={placeholderIndex + 1 + index}
        />
      ))}
    </Masonry>
  );
}
