import type { ReactNode } from "react";

import { CreationsFeed } from "@/components/projects/creations/CreationsFeed";
import { books } from "@/data/books";
import { drawings } from "@/data/drawings";
import { tracks } from "@/data/music";

/**
 * Commun à /creations, /creations/musiques, /creations/dessins et /creations/ecrits.
 * Chaque page fournit son titre et son texte ; le fil (et le lecteur audio) reste monté
 * quand on change de filtre, la musique ne se coupe donc pas.
 */
export default function CreationsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-castel-ink font-sans text-white">
      <div className="mx-auto max-w-7xl px-4 pb-24 pt-32 sm:px-8 sm:pt-40">
        {children}
        <div className="mt-12">
          <CreationsFeed tracks={tracks} drawings={drawings} books={books} />
        </div>
      </div>
    </div>
  );
}
