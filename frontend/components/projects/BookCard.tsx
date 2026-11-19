import Image from "next/image";
import Link from "next/link";

import type { BookItem } from "@/data/books";
import { clean } from "./text";

/** Carte d'un écrit : couverture au format livre (2:3), titre, année, description, source. */
export function BookCard({ book }: { book: BookItem }) {
  const inner = (
    <article className="flex h-full flex-col overflow-hidden rounded-card bg-castel-surface shadow-card motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:-translate-y-1.5">
      <div className="relative aspect-[2/3] bg-castel-ink">
        <Image
          src={book.image}
          alt={book.imageAlt}
          fill
          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-6">
        <div className="flex items-center justify-between gap-3 text-xs font-medium uppercase tracking-[0.08em] text-[#A1A1AA]">
          <span>{book.source}</span>
          {book.year && <span>{book.year}</span>}
        </div>
        <h3 className="font-display text-2xl font-bold leading-tight tracking-[-0.02em] text-white">{clean(book.title)}</h3>
        <p className="text-sm leading-relaxed text-[#A1A1AA]">{clean(book.description)}</p>
      </div>
    </article>
  );
  const cls =
    "group block h-full rounded-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";
  return book.internalPath ? (
    <Link href={book.internalPath} className={cls}>
      {inner}
    </Link>
  ) : (
    <a href={book.url} target="_blank" rel="noopener noreferrer" className={cls}>
      {inner}
    </a>
  );
}
