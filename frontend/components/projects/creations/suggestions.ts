import type { MusicTrack } from "@/data/music";

/**
 * Lecture automatique : à partir d'un morceau « graine », les morceaux du même genre d'abord,
 * puis de plus en plus éloignés. La proximité se mesure sur les mots des genres Suno
 * (« orchestral electro opera, cinematic » → orchestral, electro, opera, cinematic) ;
 * à proximité égale, le plus populaire (écoutes + 10 × likes) passe devant.
 */
const STOP = new Set([
  "music",
  "and",
  "with",
  "the",
  "style",
  "song",
  "de",
  "la",
  "le",
  "et",
]);

const words = (tags: string) =>
  new Set(
    tags
      .toLowerCase()
      .split(/[^a-zà-ÿ0-9]+/)
      .filter((w) => w.length > 2 && !STOP.has(w)),
  );

const similarity = (a: Set<string>, b: Set<string>) => {
  if (!a.size || !b.size) return 0;
  let common = 0;
  for (const w of a) if (b.has(w)) common++;
  return common / (a.size + b.size - common);
};

const popularity = (t: MusicTrack) => t.plays + 10 * t.likes;

export function suggestFrom(
  seed: MusicTrack,
  catalog: MusicTrack[],
  exclude: Set<string>,
): MusicTrack[] {
  const base = words(seed.tags);
  return catalog
    .filter((t) => t.audio && t.id !== seed.id && !exclude.has(t.id))
    .map((t) => ({ t, s: similarity(base, words(t.tags)) }))
    .sort((x, y) => y.s - x.s || popularity(y.t) - popularity(x.t))
    .map((x) => x.t);
}

export type AutoplayMode = "selection" | "shuffle";

/** Suite de la lecture automatique : par genre (« Sélection ») ou tout le catalogue mélangé (« Aléatoire »). */
export function autoplayFrom(
  seed: MusicTrack,
  catalog: MusicTrack[],
  exclude: Set<string>,
  mode: AutoplayMode,
): MusicTrack[] {
  if (mode === "selection") return suggestFrom(seed, catalog, exclude);
  const pool = catalog.filter(
    (t) => t.audio && t.id !== seed.id && !exclude.has(t.id),
  );
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool;
}
