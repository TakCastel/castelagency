import type { Metadata } from "next";

import { DrawingsGallery } from "@/components/projects/DrawingsGallery";
import { books } from "@/data/books";
import { drawings } from "@/data/drawings";

export const metadata: Metadata = {
  title: "Créations",
  description: "À côté des jeux : des histoires et des dessins.",
  alternates: { canonical: "/creations" },
};

export default function CreationsPage() {
  return (
    <div className="bg-castel-ink font-sans text-white">
      <div className="mx-auto max-w-7xl px-4 pb-24 pt-32 sm:px-8 sm:pt-40">
        <h1 className="font-display text-[44px] font-bold leading-[1.05] tracking-[-0.02em] sm:text-7xl lg:text-[88px]">
          Créations
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed">
          À côté des jeux : des histoires et des dessins, du plus récent au plus ancien. Clique sur un dessin pour
          l&apos;agrandir, sur une couverture pour lire.
        </p>

        <section id="ecrits-et-dessins" className="pt-16" aria-label="Écrits et dessins">
          <DrawingsGallery items={drawings} books={books} />
        </section>
      </div>
    </div>
  );
}
