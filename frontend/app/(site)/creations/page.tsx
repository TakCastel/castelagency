import type { Metadata } from "next";

import { CreationsFeed } from "@/components/projects/creations/CreationsFeed";
import { books } from "@/data/books";
import { drawings } from "@/data/drawings";
import { tracks } from "@/data/music";

export const metadata: Metadata = {
  title: "Créations",
  description: "Musiques, dessins et écrits de Studio Castel.",
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
          Des musiques à écouter, des dessins à agrandir, des écrits à lire.
        </p>
        <div className="mt-12">
          <CreationsFeed tracks={tracks} drawings={drawings} books={books} />
        </div>
      </div>
    </div>
  );
}
