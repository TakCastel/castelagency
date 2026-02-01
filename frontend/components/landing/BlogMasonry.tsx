"use client";

import Masonry from "react-masonry-css";

import { BlogCard } from "@/components/landing/BlogCard";
import type { BlogItem } from "@/lib/blog";

type BlogMasonryProps = {
  posts: BlogItem[];
};

const breakpointCols = {
  default: 3,
  1024: 3,
  768: 2,
  500: 1,
};

/**
 * Grille masonry (react-masonry-css) : flux horizontal, colonnes à hauteur variable.
 * Réutilise les classes CSS de la grille projets.
 */
export function BlogMasonry({ posts }: BlogMasonryProps) {
  return (
    <Masonry
      breakpointCols={breakpointCols}
      className="projects-masonry-grid mt-14 md:mt-20"
      columnClassName="projects-masonry-grid_column"
    >
      {posts.map((post, index) => (
        <BlogCard key={post.id} post={post} index={index} />
      ))}
    </Masonry>
  );
}
