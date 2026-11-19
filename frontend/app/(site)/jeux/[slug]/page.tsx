import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Button } from "@/components/site/Button";
import { GameCardCompact } from "@/components/site/GameCardCompact";
import { GameCover } from "@/components/site/GameCover";
import { ScreenshotGallery } from "@/components/site/ScreenshotGallery";
import { games, getGame } from "@/data/games";
import { gameJsonLd, JsonLd } from "@/lib/jsonld";
import { socialMeta } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return games.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) return {};
  const description = game.pitch ?? `${game.name} : en préparation.`;
  return {
    title: game.name,
    description,
    alternates: { canonical: `/jeux/${game.slug}` },
    ...socialMeta({
      title: game.name,
      description,
      path: `/jeux/${game.slug}`,
    }),
  };
}

export default async function GamePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) notFound();

  const others = games.filter((g) => g.slug !== game.slug);
  const inProgress = game.status === "in-progress";
  const hasDetails =
    (game.description?.length ?? 0) > 0 || game.screenshots.length > 0;

  return (
    <div className="bg-castel-ink font-sans text-white">
      <JsonLd data={gameJsonLd(game)} />
      {/* Bandeau teinté : la moitié haute prend la teinte du jeu, la carte déborde sur le noir. */}
      <section
        className="px-4 pt-28 sm:px-8 sm:pt-32"
        style={{
          background: `linear-gradient(to bottom, ${game.tint} 0 50%, #09090B 50% 100%)`,
        }}
      >
        <div
          className="mx-auto max-w-5xl overflow-hidden rounded-card shadow-card"
          style={{ backgroundColor: game.tint }}
        >
          <GameCover
            game={game}
            priority
            sizes="(min-width: 1024px) 1024px, 92vw"
          />
        </div>
      </section>

      <section className="px-4 pb-20 pt-12 sm:px-8 sm:pb-28 sm:pt-16">
        <div className="mx-auto max-w-5xl">
          <h1 className="font-display text-[44px] font-bold leading-[1.05] tracking-[-0.02em] sm:text-7xl lg:text-[88px]">
            {game.name}
          </h1>
          {game.pitch ? (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white sm:text-xl">
              {game.pitch}
            </p>
          ) : (
            <p className="mt-6 text-xs font-medium uppercase tracking-[0.08em] text-[#A1A1AA]">
              En préparation
            </p>
          )}
          {inProgress && !game.pitch && (
            <p className="mt-4 max-w-xl leading-relaxed text-[#A1A1AA]">
              {"Ce jeu n'est pas encore présenté. Revenez bientôt."}
            </p>
          )}
          {game.links.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3">
              {game.links.map((link, i) => (
                <Button key={link.href} href={link.href} external variant={i === 0 ? "red" : "white"}>{link.label}</Button>
              ))}
            </div>
          )}
        </div>
      </section>

      {hasDetails && (
        <section className="bg-castel-paper-warm px-4 py-16 text-castel-ink sm:px-8 sm:py-24">
          <div className="mx-auto max-w-5xl">
            {game.description && game.description.length > 0 && (
              <div className="max-w-[65ch] space-y-5 text-lg leading-relaxed">
                {game.description.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            )}
            {game.screenshots.length > 0 && (
              <div
                className={
                  game.description && game.description.length > 0 ? "mt-14" : ""
                }
              >
                <h2 className="mb-8 font-display text-4xl font-bold leading-[1.1] tracking-[-0.02em] sm:text-6xl">
                  En images
                </h2>
                <ScreenshotGallery images={game.screenshots} />
              </div>
            )}
          </div>
        </section>
      )}

      <section
        className="px-4 py-16 sm:px-8 sm:py-24"
        aria-labelledby="autres-jeux"
      >
        <div className="mx-auto max-w-6xl">
          <h2
            id="autres-jeux"
            className="mb-10 font-display text-4xl font-bold leading-[1.1] tracking-[-0.02em] sm:text-6xl"
          >
            Les autres jeux
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {others.map((g) => (
              <GameCardCompact key={g.slug} game={g} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
