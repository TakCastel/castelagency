"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { AnimatedSection } from "@/components/landing/AnimatedSection";
import { cn } from "@/lib/utils";
import type { BlogItem } from "@/lib/blog";

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

type BlogCardProps = {
  post: BlogItem;
  index: number;
};

/**
 * Carte article pour la liste du blog : titre, date, extrait, lien.
 * Même veine visuelle que ProjectCard (bordure, carte, hover).
 */
export function BlogCard({ post, index }: BlogCardProps) {
  return (
    <AnimatedSection delay={index}>
      <Link
        href={`/blog/${post.slug}`}
        className={cn(
          "group flex flex-col overflow-hidden rounded-xl border border-border/80 bg-card shadow-sm transition-shadow hover:shadow-md"
        )}
      >
        <div className="flex flex-1 flex-col px-4 py-5 md:px-5 md:py-6">
          <time
            dateTime={post.date}
            className="text-small font-medium text-muted-foreground"
          >
            {formatDate(post.date)}
          </time>
          <h2 className="mt-2 text-paragraphe font-semibold tracking-tight text-foreground">
            {post.title}
          </h2>
          <p className="mt-3 text-small text-muted-foreground line-clamp-3 text-pretty">
            {post.excerpt}
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-small font-medium text-primary">
            Lire l’article
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </AnimatedSection>
  );
}
