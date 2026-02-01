"use client";

import { useState } from "react";
import Masonry from "react-masonry-css";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { books } from "@/lib/books";
import type { BookItem } from "@/lib/books";
import { ExternalLink } from "lucide-react";

const FALLBACK_COVER = "/assets/books/book-kheym.png";

const breakpointCols = {
  default: 3,
  1024: 3,
  768: 2,
  500: 1,
};

function BookCard({ book }: { book: BookItem }) {
  const href = book.internalPath ?? book.url;
  const isExternal = !book.internalPath;
  const [imgSrc, setImgSrc] = useState(book.image);

  return (
    <Link
      href={href}
      {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
      className="block transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-xl"
    >
      <Card className="overflow-hidden border-border/50 bg-card transition-colors hover:border-primary/40 hover:bg-primary/5">
        <div className="w-full bg-muted/30">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imgSrc}
            alt={book.imageAlt}
            className="h-auto w-full object-contain"
            onError={() => setImgSrc(FALLBACK_COVER)}
          />
        </div>
        <CardContent className="p-4">
          <h2 className="text-titre-petit font-semibold text-foreground line-clamp-2">
            {book.title}
          </h2>
          {book.year != null && (
            <p className="mt-1 text-small text-muted-foreground">{book.year}</p>
          )}
          <p className="mt-2 text-small text-muted-foreground line-clamp-3">
            {book.description}
          </p>
          {book.source && (
            <span className="mt-2 inline-flex items-center gap-1 text-small text-primary">
              {book.source}
              {isExternal && <ExternalLink className="h-3.5 w-3.5" />}
            </span>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}

/**
 * Grille masonry pour les livres : cartes à hauteur variable selon l’image.
 */
export function BooksMasonry() {
  return (
    <Masonry
      breakpointCols={breakpointCols}
      className="projects-masonry-grid mt-8"
      columnClassName="projects-masonry-grid_column"
    >
      {[...books]
        .sort((a, b) => (b.year ?? 0) - (a.year ?? 0))
        .map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
    </Masonry>
  );
}
