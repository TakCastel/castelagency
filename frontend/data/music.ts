/**
 * Musiques de Kira Valentine (Suno), triées par un mix likes + écoutes (un like = 10 écoutes).
 * La liste est générée par `node scripts/fetch-suno.mjs` dans music.json :
 * audio et pochettes restent sur les CDN de Suno.
 */
import data from "./music.json";

export type MusicTrack = {
  id: string;
  title: string;
  /** Vidéo mp4 du morceau sur cdn1.suno.ai (lue par <audio>) ; null si Suno ne la sert pas → lien vers suno.com. */
  audio: string | null;
  /** Pochette sur cdn2.suno.ai. */
  image: string;
  imageLarge: string;
  /** Durée en secondes. */
  duration: number;
  /** Genres affichés par Suno, ex. « psytrance, phonk ». */
  tags: string;
  /** Date de création (AAAA-MM-JJ). */
  date: string;
  /** Nombre d'écoutes sur Suno au moment de la récupération. */
  plays: number;
  /** Nombre de likes sur Suno au moment de la récupération. */
  likes: number;
};

export const MUSIC_ARTIST = "Kira Valentine";
export const MUSIC_PROFILE_URL = "https://suno.com/@kiravalentine";
export const sunoSongUrl = (id: string) => `https://suno.com/song/${id}`;

export const tracks: MusicTrack[] = data;
