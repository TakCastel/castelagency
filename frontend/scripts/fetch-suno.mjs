#!/usr/bin/env node
/**
 * Récupère tous les morceaux publics du profil Suno de Kira Valentine
 * et les écrit dans data/music.json (lu par data/music.ts).
 *
 * Suno n'a pas d'API publique : on lit l'endpoint du profil public utilisé par suno.com.
 * Audio et pochettes restent servis par les CDN de Suno (rien n'est hébergé ici).
 *
 * Usage : node scripts/fetch-suno.mjs   (à relancer pour mettre la liste à jour)
 */
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HANDLE = "kiravalentine";
const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "data", "music.json");

async function fetchPage(page) {
  const url = `https://studio-api.prod.suno.com/api/profiles/${HANDLE}?playlists_sort_by=upvote_count&clips_sort_by=created_at&page=${page}`;
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!res.ok) throw new Error(`Suno ${res.status} sur la page ${page}`);
  return res.json();
}

const clips = [];
for (let page = 1; page <= 50; page++) {
  const data = await fetchPage(page);
  if (!data.clips?.length) break;
  clips.push(...data.clips);
}

/**
 * Source audio : la vidéo publique du morceau (cdn1.suno.ai/<id>.mp4, piste AAC complète, permanente).
 * Les m4a de `media_urls` sont chiffrés et expirent au bout d'un mois, le mp3 de cdn1 est refusé (403).
 * Un <audio> lit très bien un mp4 en ignorant l'image. Si la vidéo n'existe pas, audio = null
 * et la carte renvoie vers suno.com.
 */
async function playable(url) {
  if (!url) return false;
  const res = await fetch(url, { headers: { Range: "bytes=0-15", "User-Agent": "Mozilla/5.0" } });
  return res.status === 200 || res.status === 206;
}

const published = clips.filter((c) => c.status === "complete" && c.is_public && !c.is_trashed && !c.is_hidden);
const ok = [];
for (let i = 0; i < published.length; i += 16) {
  const batch = published.slice(i, i + 16);
  ok.push(...(await Promise.all(batch.map((c) => playable(c.video_url ?? `https://cdn1.suno.ai/${c.id}.mp4`)))));
}

const score = (t) => t.plays + 10 * t.likes;

const tracks = published
  .map((c, i) => ({
    id: c.id,
    title: c.title?.trim() || "Sans titre",
    audio: ok[i] ? (c.video_url ?? `https://cdn1.suno.ai/${c.id}.mp4`) : null,
    image: c.image_url,
    imageLarge: c.image_large_url ?? c.image_url,
    duration: Math.round(c.metadata?.duration ?? 0),
    tags: c.display_tags ?? "",
    date: c.created_at?.slice(0, 10) ?? "",
    plays: c.play_count ?? 0,
    likes: c.upvote_count ?? 0,
  }))
  // Mix likes + écoutes : un like vaut 10 écoutes (≈ le ratio médian du profil),
  // les deux pèsent donc autant. À égalité, le plus récent d'abord.
  .sort((a, b) => score(b) - score(a) || b.date.localeCompare(a.date));

await writeFile(OUT, JSON.stringify(tracks, null, 2) + "\n");
const missing = tracks.filter((t) => !t.audio).map((t) => t.title);
console.log(`${tracks.length} morceaux écrits dans ${path.relative(process.cwd(), OUT)}`);
if (missing.length) console.log(`Sans audio public (lien vers Suno) : ${missing.join(", ")}`);
