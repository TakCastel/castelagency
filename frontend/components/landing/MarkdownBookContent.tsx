"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const articleClasses = {
  h1: "sr-only",
  h2:
    "text-titre-petit font-semibold tracking-tight text-foreground pt-6 md:pt-8 scroll-mt-24 border-t border-border/50 first:border-t-0 first:pt-0",
  p: "text-pretty text-paragraphe leading-relaxed text-muted-foreground indent-0",
  blockquote:
    "border-l-4 border-primary/40 pl-4 my-4 italic text-muted-foreground",
};

type MarkdownBookContentProps = { content: string };

/**
 * Affiche le contenu Markdown du récit avec des styles cohérents (h2 = sections, p = paragraphes).
 * Permet d'éditer le fichier .md dans content/ecritures/ puis de voir le rendu à jour.
 */
export function MarkdownBookContent({ content }: MarkdownBookContentProps) {
  return (
    <div className="space-y-8 md:space-y-10 prose prose-neutral dark:prose-invert max-w-none prose-p:indent-0 prose-headings:font-semibold">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className={articleClasses.h1}>{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className={articleClasses.h2}>{children}</h2>
          ),
          p: ({ children }) => (
            <p className={articleClasses.p}>{children}</p>
          ),
          blockquote: ({ children }) => (
            <blockquote className={articleClasses.blockquote}>
              {children}
            </blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
