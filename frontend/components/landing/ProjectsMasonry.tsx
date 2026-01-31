"use client";

import Masonry from "react-masonry-css";

import { ProjectCard } from "@/components/landing/ProjectCard";
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

/**
 * Grille masonry (react-masonry-css) : flux horizontal, colonnes à hauteur variable.
 */
export function ProjectsMasonry({ projects }: ProjectsMasonryProps) {
  return (
    <Masonry
      breakpointCols={breakpointCols}
      className="projects-masonry-grid mt-14 md:mt-20"
      columnClassName="projects-masonry-grid_column"
    >
      {projects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}
    </Masonry>
  );
}
