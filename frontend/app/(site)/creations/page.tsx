import type { Metadata } from "next";

import { DrawingsGallery } from "@/components/projects/DrawingsGallery";
import { MusicPlayer } from "@/components/projects/MusicPlayer";
import { books } from "@/data/books";
import { drawings } from "@/data/drawings";
import { tracks } from "@/data/music";

export const metadata: Metadata = {
  title: "Créations",
  description: "À côté des jeux : des musiques, des histoires et des dessins.",
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
          À côté des jeux : des musiques, des histoires et des dessins.
        </p>
        <nav aria-label="Sections" className="mt-8 flex flex-wrap gap-3">
          {[
            { href: "#musiques", label: "Musiques" },
            { href: "#ecrits-et-dessins", label: "Écrits et dessins" },
          ].map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full border border-white/20 px-5 py-2 font-medium text-white/80 transition-colors hover:border-white hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <section id="musiques" className="scroll-mt-24 pt-16" aria-labelledby="titre-musiques">
          <h2 id="titre-musiques" className="mb-6 font-display text-3xl font-bold sm:text-5xl">
            Musiques
          </h2>
          <MusicPlayer tracks={tracks} />
        </section>

        <section id="ecrits-et-dessins" className="scroll-mt-24 pt-20" aria-labelledby="titre-ecrits">
          <h2 id="titre-ecrits" className="mb-4 font-display text-3xl font-bold sm:text-5xl">
            Écrits et dessins
          </h2>
          <p className="mb-8 max-w-2xl text-lg leading-relaxed text-white/80">
            Du plus récent au plus ancien. Clique sur un dessin pour l&apos;agrandir, sur une couverture pour lire.
          </p>
          <DrawingsGallery items={drawings} books={books} />
        </section>
      </div>
    </div>
  );
}
