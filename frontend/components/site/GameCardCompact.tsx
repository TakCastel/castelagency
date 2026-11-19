import Image from "next/image";
import Link from "next/link";

import { ArtOverImage, cardArt } from "@/components/projects/ProjectVisual";
import type { Game } from "@/data/games";

/** Carte d'un jeu pour la rangée "Les autres jeux". */
export function GameCardCompact({ game }: { game: Game }) {
  const art = cardArt(game.slug);
  const sizes = "(min-width: 1024px) 30vw, 90vw";
  return (
    <Link
      href={`/jeux/${game.slug}`}
      className="group block h-full rounded-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
    >
      <article className="h-full overflow-hidden rounded-card bg-castel-surface shadow-card motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:-translate-y-1.5">
        {art && game.cover ? (
          <ArtOverImage
            art={art}
            color={game.tint}
            image={game.cover.src}
            alt={game.cover.alt}
            sizes={sizes}
            className="aspect-[16/10]"
          />
        ) : (
          <div
            className="relative aspect-[16/10] overflow-hidden"
            style={{ backgroundColor: game.tint }}
          >
            {game.cover ? (
              <Image
                src={game.cover.src}
                alt={game.cover.alt}
                fill
                sizes={sizes}
                className="object-cover"
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-2 px-6 text-center">
                <span className="font-display text-3xl font-bold tracking-[-0.02em] text-white">
                  {game.name}
                </span>
                <span className="text-xs font-medium uppercase tracking-[0.08em] text-[#A1A1AA]">
                  En préparation
                </span>
              </div>
            )}
          </div>
        )}
        <div className="space-y-2 p-6">
          <h3 className="font-display text-2xl font-bold tracking-[-0.02em] text-white">
            {game.name}
          </h3>
          <p className="line-clamp-3 text-sm leading-relaxed text-[#A1A1AA]">
            {game.pitch ?? "En préparation."}
          </p>
        </div>
      </article>
    </Link>
  );
}
