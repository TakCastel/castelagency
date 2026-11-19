import Image from "next/image";

import type { Game } from "@/data/games";

type Props = {
  game: Game;
  /** Classes de taille pour l'attribut sizes de next/image. */
  sizes: string;
  priority?: boolean;
  className?: string;
};

/**
 * Visuel d'un jeu. Sans cover : emplacement vide aux proportions 2:1,
 * avec le nom du jeu et "En préparation". Rien d'inventé.
 */
export function GameCover({ game, sizes, priority, className = "" }: Props) {
  if (game.cover) {
    return (
      <Image
        src={game.cover.src}
        alt={game.cover.alt}
        width={game.cover.width}
        height={game.cover.height}
        sizes={sizes}
        priority={priority}
        className={`h-auto w-full ${className}`}
      />
    );
  }
  return (
    <div
      className={`flex aspect-[2/1] w-full flex-col items-center justify-center gap-2 bg-castel-surface px-6 text-center ${className}`}
    >
      <span className="font-display text-3xl font-bold tracking-[-0.02em] text-white sm:text-5xl">{game.name}</span>
      <span className="text-xs font-medium uppercase tracking-[0.08em] text-[#A1A1AA]">En préparation</span>
    </div>
  );
}
