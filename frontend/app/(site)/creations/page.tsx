import type { Metadata } from "next";

import { BookCard } from "@/components/projects/BookCard";
import { DrawingsGallery } from "@/components/projects/DrawingsGallery";
import { books } from "@/data/books";
import { drawings } from "@/data/drawings";

export const metadata: Metadata = {
  title: "Créations",
  description: "À côté des jeux : des histoires et des dessins.",
  alternates: { canonical: "/creations" },
};

const pill =
  "inline-flex min-h-11 items-center rounded-full bg-white px-5 py-2 font-display text-sm font-semibold text-castel-ink transition-colors duration-200 hover:bg-castel-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

export default function CreationsPage() {
  return (
    <div className="bg-castel-ink font-sans text-white">
      <div className="mx-auto max-w-7xl px-4 pb-24 pt-32 sm:px-8 sm:pt-40">
        <h1 className="font-display text-[44px] font-bold leading-[1.05] tracking-[-0.02em] sm:text-7xl lg:text-[88px]">
          Créations
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed">À côté des jeux : des histoires et des dessins.</p>
        <nav aria-label="Sections" className="mt-8 flex flex-wrap gap-3">
          <a href="#ecrits" className={pill}>
            Écrits
          </a>
          <a href="#dessins" className={pill}>
            Dessins
          </a>
        </nav>

        <section id="ecrits" className="scroll-mt-24 pt-20" aria-labelledby="t-ecrits">
          <h2 id="t-ecrits" className="mb-10 font-display text-4xl font-bold tracking-[-0.02em] sm:text-6xl">
            Écrits
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {books.map((b) => (
              <BookCard key={b.id} book={b} />
            ))}
          </div>
        </section>

        <section id="dessins" className="scroll-mt-24 pt-24" aria-labelledby="t-dessins">
          <h2 id="t-dessins" className="mb-3 font-display text-4xl font-bold tracking-[-0.02em] sm:text-6xl">
            Dessins
          </h2>
          <p className="mb-10 text-lg">Clique sur une image pour l&apos;agrandir.</p>
          <DrawingsGallery items={drawings} />
        </section>
      </div>
    </div>
  );
}
