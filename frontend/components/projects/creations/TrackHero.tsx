"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Check, ExternalLink, Pause, Play, Share2 } from "lucide-react";

import {
  MUSIC_ARTIST,
  musicTrackPath,
  sunoSongUrl,
  type MusicTrack,
} from "@/data/music";
import { shareLink } from "@/lib/share";

import {
  getPlayerState,
  requestPlay,
  STATE_EVENT,
  type PlayerStateDetail,
} from "./playerEvents";
import { TrackStats } from "./TrackStats";
import { formatTime } from "./useMusicPlayer";

/** En-tête de la page d'un morceau partagé : pochette, titre, stats et actions. Le catalogue suit en dessous. */
export function TrackHero({ track }: { track: MusicTrack }) {
  const [state, setState] = useState<PlayerStateDetail>({
    currentId: null,
    playing: false,
  });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setState(getPlayerState());
    const on = (e: Event) =>
      setState((e as CustomEvent<PlayerStateDetail>).detail);
    window.addEventListener(STATE_EVENT, on);
    return () => window.removeEventListener(STATE_EVENT, on);
  }, []);

  const isPlaying = state.currentId === track.id && state.playing;
  const playable = !!track.audio;
  const genres = track.tags
    .split(",")
    .map((g) => g.trim())
    .filter(Boolean)
    .slice(0, 3);

  const play = () =>
    playable
      ? requestPlay(track)
      : window.open(sunoSongUrl(track.id), "_blank", "noopener");

  return (
    <div>
      <Link
        href="/creations/musiques"
        scroll={false}
        className="text-sm font-medium text-white/60 hover:text-white"
      >
        ← Toutes les musiques
      </Link>
      <div className="mt-6 grid items-center gap-8 md:grid-cols-[minmax(0,360px)_1fr] md:gap-12">
        <button
          type="button"
          onClick={play}
          aria-label={isPlaying ? "Pause" : `Écouter ${track.title}`}
          className="group relative aspect-square w-full max-w-[360px] overflow-hidden rounded-xl shadow-2xl shadow-black/60"
        >
          <Image
            src={track.imageLarge}
            alt={`Pochette de ${track.title}`}
            fill
            priority
            sizes="(min-width: 768px) 360px, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <span
            className={`absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity ${isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100 md:opacity-0 md:group-hover:opacity-100"}`}
            aria-hidden="true"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-castel-red text-castel-ink shadow-lg">
              {isPlaying ? (
                <Pause className="h-7 w-7" fill="currentColor" />
              ) : (
                <Play className="ml-1 h-7 w-7" fill="currentColor" />
              )}
            </span>
          </span>
        </button>

        <div className="min-w-0">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/50">
            Morceau · {MUSIC_ARTIST}
          </p>
          <h1 className="mt-3 font-display text-[40px] font-bold leading-[1.05] tracking-[-0.02em] sm:text-6xl">
            {track.title}
          </h1>
          <p className="mt-4 text-lg text-white/70">
            {[...genres, formatTime(track.duration)].join(" · ")}
          </p>
          <TrackStats
            track={track}
            variant="hero"
            className="mt-6 !justify-start"
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={play}
              className="inline-flex items-center gap-2 rounded-full bg-castel-red px-6 py-3 font-display font-semibold text-castel-ink transition-transform hover:scale-105"
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" fill="currentColor" />
              ) : (
                <Play className="h-5 w-5" fill="currentColor" />
              )}
              {isPlaying ? "Pause" : "Écouter"}
            </button>
            <button
              type="button"
              onClick={async () => {
                const res = await shareLink(
                  window.location.origin + musicTrackPath(track.id),
                  `${track.title} · ${MUSIC_ARTIST}`,
                );
                if (res === "copied") {
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }
              }}
              aria-live="polite"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 font-medium text-white/85 transition-colors hover:border-white hover:bg-white hover:text-castel-ink"
            >
              {copied ? (
                <Check className="h-4 w-4 text-castel-red" aria-hidden="true" />
              ) : (
                <Share2 className="h-4 w-4" aria-hidden="true" />
              )}
              {copied ? "Lien copié" : "Partager"}
            </button>
            <a
              href={sunoSongUrl(track.id)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              Ouvrir sur Suno
            </a>
          </div>
        </div>
      </div>
      <h2 className="mt-16 font-display text-3xl font-bold tracking-[-0.02em] sm:text-4xl">
        D&apos;autres morceaux
      </h2>
    </div>
  );
}
