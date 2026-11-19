import Image from "next/image";
import Link from "next/link";
import type { Game } from "@/data/games";
import { Button } from "./Button";

/** Visuel 16:9 d'un jeu, ou emplacement vide avec le nom. */
export function GameVisual({ game, sizes, priority }: { game: Game; sizes: string; priority?: boolean }) {
  if (game.cover) {
    return (
      <div className="relative aspect-video w-full overflow-hidden" style={{ backgroundColor: game.tint }}>
        <Image src={game.cover.src} alt={game.cover.alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    );
  }
  return (
    <div className="relative flex aspect-video w-full items-center justify-center bg-castel-surface">
      <span className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">{game.name}</span>
      <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-castel-ink">
        En préparation
      </span>
    </div>
  );
}

/** Grande carte de la section Jeux (fond noir). */
export function GameCard({ game }: { game: Game }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-card bg-castel-surface shadow-card motion-safe:transition-transform motion-safe:duration-200 motion-safe:hover:-translate-y-1.5 lg:flex-row">
      <div className="lg:w-[58%]">
        <GameVisual game={game} sizes="(min-width: 1024px) 700px, 100vw" />
      </div>
      <div className="flex flex-1 flex-col justify-center gap-5 p-6 sm:p-8 lg:p-10">
        <h3 className="font-display text-4xl font-bold text-white sm:text-5xl">{game.name}</h3>
        {game.pitch && <p className="text-base text-[#A1A1AA] sm:text-lg">{game.pitch}</p>}
        <div className="flex flex-wrap gap-3">
          {game.links.map((l, i) => (
            <Button key={l.href} href={l.href} external variant={i === 0 ? "red" : "white"}>
              {l.label}
            </Button>
          ))}
        </div>
        {game.status === "available" && (
          <Link
            href={`/jeux/${game.slug}`}
            className="w-fit font-medium text-white underline underline-offset-4 hover:text-[#A1A1AA]"
          >
            Découvrir {game.name}
          </Link>
        )}
      </div>
    </article>
  );
}
