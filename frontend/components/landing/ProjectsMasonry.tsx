"use client";

import Masonry from "react-masonry-css";
import Link from "next/link";
import { motion } from "motion/react";

import { ProjectCard } from "@/components/landing/ProjectCard";
import { AnimatedSection } from "@/components/landing/AnimatedSection";
import type { ProjectItem } from "@/lib/projects";

type ProjectsMasonryProps = {
  projects: ProjectItem[];
};

const breakpointCols = {
  default: 3,
  1024: 3,
  768: 2,
  500: 1,
};

/** Carte "Votre projet ici ?" → même taille que ProjectCard, lien vers devis (5ème position). */
function DevisPlaceholderCard({ index }: { index: number }) {
  return (
    <AnimatedSection delay={index}>
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{
          opacity: 1,
          scale: [1, 1.02, 1],
        }}
        transition={{
          opacity: { duration: 0.4, ease: "easeOut" },
          scale: {
            duration: 2.5,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "easeInOut",
          },
        }}
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.2 },
        }}
        whileTap={{
          scale: 0.98,
          transition: { duration: 0.1 },
        }}
      >
        <Link
          href="/devis"
          className="group flex overflow-hidden rounded-xl border border-border/80 bg-card shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="relative flex aspect-[4/3] w-full flex-col items-center justify-center rounded-xl bg-primary p-5">
            {/* Bordure intérieure noire légère avec padding */}
            <span className="flex h-full w-full items-center justify-center rounded-lg border border-black/20 p-4 text-center text-lg font-semibold tracking-tight text-primary-foreground md:text-xl">
              Votre projet ici ?
            </span>
          </div>
        </Link>
      </motion.div>
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
