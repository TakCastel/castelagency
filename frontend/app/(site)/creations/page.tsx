import type { Metadata } from "next";

import { BookCard } from "@/components/projects/BookCard";
import { DrawingsGallery } from "@/components/projects/DrawingsGallery";
import { MusicPlayer } from "@/components/projects/MusicPlayer";
import { books } from "@/data/books";
import { drawings } from "@/data/drawings";
import { tracks } from "@/data/music";

export const metadata: Metadata = {
  title: "Créations",
  description: "À côté des jeux : des musiques, des dessins et des écrits.",
  alternates: { canonical: "/creations" },
};

const SECTIONS = [
  { id: "musiques", label: "Musiques" },
  { id: "dessins", label: "Dessins" },
  { id: "ecrits", label: "Écrits" },
];

const titleCls = "mb-6 font-display text-3xl font-bold sm:text-5xl";
const leadCls = "mb-8 max-w-2xl text-lg leading-relaxed text-white/80";

export default function CreationsPage() {
  // Écrits du plus récent au plus ancien.
  const sortedBooks = [...books].sort((a, b) => (b.year ?? 0) - (a.year ?? 0));

  return (
    <div className="bg-castel-ink font-sans text-white">
      <div className="mx-auto max-w-7xl px-4 pb-24 pt-32 sm:px-8 sm:pt-40">
        <h1 className="font-display text-[44px] font-bold leading-[1.05] tracking-[-0.02em] sm:text-7xl lg:text-[88px]">
          Créations
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed">À côté des jeux : des musiques, des dessins et des écrits.</p>
        <nav aria-label="Sections" className="mt-8 flex flex-wrap gap-3">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="rounded-full border border-white/20 px-5 py-2 font-medium text-white/80 transition-colors hover:border-white hover:text-white"
            >
              {s.label}
            </a>
          ))}
        </nav>

        <section id="musiques" className="scroll-mt-24 pt-16" aria-labelledby="titre-musiques">
          <h2 id="titre-musiques" className={titleCls}>
            Musiques
          </h2>
          <MusicPlayer tracks={tracks} />
        </section>

        <section id="dessins" className="scroll-mt-24 pt-20" aria-labelledby="titre-dessins">
          <h2 id="titre-dessins" className={titleCls}>
            Dessins
          </h2>
          <p className={leadCls}>Du plus récent au plus ancien. Clique sur un dessin pour l&apos;agrandir.</p>
          <DrawingsGallery items={drawings} />
        </section>

        <section id="ecrits" className="scroll-mt-24 pt-20" aria-labelledby="titre-ecrits">
          <h2 id="titre-ecrits" className={titleCls}>
            Écrits
          </h2>
          <p className={leadCls}>Romans, nouvelles et univers. Clique sur une couverture pour lire.</p>
          <ul className="grid grid-cols-2 gap-4 p-0 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
            {sortedBooks.map((book) => (
              <li key={book.id} className="list-none">
                <BookCard book={book} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
