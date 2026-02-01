"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { AnimatedSection } from "@/components/landing/AnimatedSection";
import type { BlogItem } from "@/lib/blog";

const DEFAULT_LIST_IMAGE = "/assets/illustrations/illu-app.png";
const DEFAULT_LIST_IMAGE_ALT = "Illustration évoquant un article de blog.";

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

type BlogListProps = {
  posts: BlogItem[];
};

/**
 * Liste verticale des articles : carte avec illustration (alternance gauche/droite)
 * et lien vers la page détaillée. Même style que ServicesList.
 */
export function BlogList({ posts }: BlogListProps) {
  return (
    <ul className="space-y-16 md:space-y-24" role="list">
      {posts.map((post, index) => {
        const isImageRight = index % 2 === 1;
        const imageSrc = post.image ?? DEFAULT_LIST_IMAGE;
        const imageAlt = post.imageAlt ?? DEFAULT_LIST_IMAGE_ALT;
        return (
          <li key={post.id}>
            <AnimatedSection delay={index}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm transition-shadow hover:shadow-md md:flex-row md:items-center md:gap-10 lg:gap-14"
              >
                <div
                  className={[
                    "relative h-56 w-full shrink-0 md:h-72 md:min-w-[42%] md:max-w-[45%]",
                    isImageRight ? "md:order-2" : "md:order-1",
                  ].join(" ")}
                >
                  <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                </div>
                <div
                  className={[
                    "flex flex-1 flex-col justify-center px-6 py-6 md:px-8 md:py-8",
                    isImageRight ? "md:order-1 md:text-left" : "md:order-2 md:text-left",
                  ].join(" ")}
                >
                  <time
                    dateTime={post.date}
                    className="text-small font-medium text-muted-foreground"
                  >
                    {formatDate(post.date)}
                  </time>
                  <h2 className="mt-2 text-paragraphe font-semibold tracking-tight text-foreground">
                    {post.title}
                  </h2>
                  <p className="mt-3 line-clamp-3 text-paragraphe text-muted-foreground text-pretty">
                    {post.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-small font-medium text-primary group-hover:underline">
                    Lire l’article
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </AnimatedSection>
          </li>
        );
      })}
    </ul>
  );
}
