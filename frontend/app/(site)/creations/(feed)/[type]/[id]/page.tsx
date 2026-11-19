import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getTrack, MUSIC_ARTIST, musicTrackPath, tracks } from "@/data/music";
import { TrackHero } from "@/components/projects/creations/TrackHero";
import { socialMeta } from "@/lib/seo";

/**
 * Page partageable d'un morceau : /creations/musiques/<id>.
 * L'aperçu de partage montre la pochette ; la page affiche le fil des musiques
 * (layout commun) avec ce morceau chargé dans le lecteur.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return tracks.map((t) => ({ type: "musiques", id: t.id }));
}

type Params = Promise<{ type: string; id: string }>;

const find = async (params: Params) => {
  const { type, id } = await params;
  return type === "musiques" ? getTrack(id) : undefined;
};

const describe = (t: NonNullable<ReturnType<typeof getTrack>>) => {
  const genres = t.tags
    .split(",")
    .map((g) => g.trim())
    .filter(Boolean)
    .slice(0, 3)
    .join(", ");
  return `${t.title}, un morceau de ${MUSIC_ARTIST}${genres ? ` (${genres})` : ""} à écouter sur Studio Castel. ${t.plays} écoutes, ${t.likes} likes sur Suno.`;
};

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const t = await find(params);
  if (!t) return {};
  const title = `${t.title} · ${MUSIC_ARTIST}`;
  const description = describe(t);
  return {
    title,
    description,
    alternates: { canonical: musicTrackPath(t.id) },
    ...socialMeta({
      title,
      description,
      path: musicTrackPath(t.id),
      images: [{ url: t.imageLarge, alt: `Pochette de ${t.title}` }],
    }),
  };
}

export default async function TrackPage({ params }: { params: Params }) {
  const t = await find(params);
  if (!t) notFound();
  return <TrackHero track={t} />;
}
