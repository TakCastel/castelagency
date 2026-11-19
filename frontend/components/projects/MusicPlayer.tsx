"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ExternalLink, Pause, Play, Search, SkipBack, SkipForward, X } from "lucide-react";

import { MUSIC_ARTIST, sunoSongUrl, type MusicTrack } from "@/data/music";

const PAGE = 24;

const formatTime = (s: number) => {
  if (!Number.isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
};

/** Petites barres animées sur le morceau en cours. */
function Equalizer({ playing }: { playing: boolean }) {
  return (
    <span className="flex h-3.5 items-end gap-[2px]" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={`w-[3px] rounded-sm bg-castel-red ${playing ? "animate-[eq_0.9s_ease-in-out_infinite]" : "h-1"}`}
          style={playing ? { animationDelay: `${i * 0.18}s`, height: "100%" } : undefined}
        />
      ))}
    </span>
  );
}

/**
 * Discographie de Kira Valentine : grille de pochettes + lecteur collé en bas d'écran.
 * Un seul <audio> pour toute la page ; à la fin d'un morceau, le suivant de la liste affichée démarre.
 */
export function MusicPlayer({ tracks }: { tracks: MusicTrack[] }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(PAGE);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => setMounted(true), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return tracks;
    return tracks.filter((t) => t.title.toLowerCase().includes(q) || t.tags.toLowerCase().includes(q));
  }, [tracks, query]);

  // La file de lecture suit la liste filtrée ; si le morceau en cours n'y est plus, on reprend la liste complète.
  // Les morceaux sans audio public (lien vers Suno) en sont exclus.
  const queue = useMemo(
    () => (currentId && !filtered.some((t) => t.id === currentId) ? tracks : filtered).filter((t) => t.audio),
    [filtered, tracks, currentId],
  );
  const current = useMemo(() => tracks.find((t) => t.id === currentId) ?? null, [tracks, currentId]);

  const playTrack = useCallback(
    (t: MusicTrack) => {
      const audio = audioRef.current;
      if (!audio || !t.audio) return;
      if (t.id === currentId) {
        if (audio.paused) void audio.play().catch(() => setError(true));
        else audio.pause();
        return;
      }
      setCurrentId(t.id);
      setError(false);
      setTime(0);
      setDuration(t.duration);
      audio.src = t.audio;
      void audio.play().catch(() => setError(true));
    },
    [currentId],
  );

  const step = useCallback(
    (d: number) => {
      if (!queue.length) return;
      const i = queue.findIndex((t) => t.id === currentId);
      const next = queue[(i + d + queue.length) % queue.length];
      playTrack(next);
    },
    [queue, currentId, playTrack],
  );

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!current) {
      if (queue[0]) playTrack(queue[0]);
      return;
    }
    if (audio.paused) void audio.play().catch(() => setError(true));
    else audio.pause();
  }, [current, queue, playTrack]);

  const close = useCallback(() => {
    const audio = audioRef.current;
    audio?.pause();
    audio?.removeAttribute("src");
    audio?.load();
    setCurrentId(null);
    setPlaying(false);
  }, []);

  // Écran verrouillé / touches multimédia du clavier.
  useEffect(() => {
    if (!current || !("mediaSession" in navigator)) return;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: current.title,
      artist: MUSIC_ARTIST,
      artwork: [{ src: current.imageLarge, sizes: "512x512", type: "image/jpeg" }],
    });
    navigator.mediaSession.setActionHandler("previoustrack", () => step(-1));
    navigator.mediaSession.setActionHandler("nexttrack", () => step(1));
    return () => {
      navigator.mediaSession.setActionHandler("previoustrack", null);
      navigator.mediaSession.setActionHandler("nexttrack", null);
    };
  }, [current, step]);

  const progress = duration ? Math.min(100, (time / duration) * 100) : 0;

  const bar = current && (
    <div
      role="region"
      aria-label="Lecteur audio"
      className="fixed inset-x-0 bottom-0 z-[140] border-t border-white/10 bg-castel-surface/95 font-sans text-white backdrop-blur-md"
    >
      {/* Barre de progression cliquable, pleine largeur. */}
      <input
        type="range"
        min={0}
        max={duration || 0}
        step={0.1}
        value={time}
        onChange={(e) => {
          const a = audioRef.current;
          if (a) a.currentTime = Number(e.target.value);
          setTime(Number(e.target.value));
        }}
        aria-label="Position dans le morceau"
        className="music-seek absolute inset-x-0 -top-[7px] h-3.5 w-full cursor-pointer appearance-none bg-transparent"
        style={{ "--p": `${progress}%` } as React.CSSProperties}
      />
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:gap-5 sm:px-8">
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-white/5">
          <Image src={current.image} alt="" fill sizes="48px" className="object-cover" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-display font-semibold">{current.title}</p>
          <p className="truncate text-sm text-white/60">
            {error ? (
              <a href={sunoSongUrl(current.id)} target="_blank" rel="noopener noreferrer" className="text-castel-red underline">
                Lecture impossible ici, écouter sur Suno
              </a>
            ) : (
              <>
                <span className="tabular-nums">{formatTime(time)} / {formatTime(duration)}</span>
              </>
            )}
          </p>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <button type="button" onClick={() => step(-1)} aria-label="Morceau précédent" className="hidden h-10 w-10 items-center justify-center rounded-full text-white/75 hover:bg-white/10 hover:text-white sm:flex">
            <SkipBack className="h-5 w-5" fill="currentColor" />
          </button>
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? "Pause" : "Lecture"}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-castel-ink transition-transform hover:scale-105"
          >
            {playing ? <Pause className="h-5 w-5" fill="currentColor" /> : <Play className="ml-0.5 h-5 w-5" fill="currentColor" />}
          </button>
          <button type="button" onClick={() => step(1)} aria-label="Morceau suivant" className="flex h-10 w-10 items-center justify-center rounded-full text-white/75 hover:bg-white/10 hover:text-white">
            <SkipForward className="h-5 w-5" fill="currentColor" />
          </button>
        </div>
        <a
          href={sunoSongUrl(current.id)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Ouvrir sur Suno"
          className="hidden h-10 w-10 items-center justify-center rounded-full text-white/60 hover:bg-white/10 hover:text-white md:flex"
        >
          <ExternalLink className="h-[18px] w-[18px]" />
        </a>
        <button type="button" onClick={close} aria-label="Fermer le lecteur" className="flex h-10 w-10 items-center justify-center rounded-full text-white/60 hover:bg-white/10 hover:text-white">
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );

  return (
    <div className={current ? "pb-24" : undefined}>
      <audio
        ref={audioRef}
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => Number.isFinite(e.currentTarget.duration) && setDuration(e.currentTarget.duration)}
        onEnded={() => step(1)}
        onError={() => currentId && setError(true)}
      />

      <div className="flex">
        <label className="relative block w-full sm:w-72">
          <span className="sr-only">Chercher un morceau</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setVisible(PAGE);
            }}
            placeholder="Titre ou genre"
            className="h-11 w-full rounded-full border border-white/15 bg-white/5 pl-10 pr-4 text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
          />
        </label>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-white/60">Aucun morceau ne correspond à « {query} ».</p>
      ) : (
        <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {filtered.slice(0, visible).map((t) => {
            const active = t.id === currentId;
            const inner = (
              <>
                <span
                  className={`relative block aspect-square overflow-hidden rounded-lg bg-white/5 ring-2 transition ${active ? "ring-castel-red" : "ring-transparent group-hover:ring-white/30"}`}
                >
                  <Image
                    src={t.image}
                    alt=""
                    fill
                    sizes="(min-width: 1280px) 200px, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                    quality={70}
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <span
                    className={`absolute inset-0 flex items-center justify-center bg-castel-ink/40 transition-opacity ${active ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"}`}
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-castel-ink shadow-lg">
                      {!t.audio ? (
                        <ExternalLink className="h-5 w-5" />
                      ) : active && playing ? (
                        <Pause className="h-5 w-5" fill="currentColor" />
                      ) : (
                        <Play className="ml-0.5 h-5 w-5" fill="currentColor" />
                      )}
                    </span>
                  </span>
                </span>
                <span className="mt-2.5 flex items-center gap-2">
                  {active && <Equalizer playing={playing} />}
                  <span className={`truncate font-display font-semibold ${active ? "text-castel-red" : "text-white"}`}>{t.title}</span>
                </span>
                <span className="mt-0.5 block truncate text-sm text-white/55">
                  {t.tags ? `${t.tags} · ` : ""}
                  <span className="tabular-nums">{formatTime(t.duration)}</span>
                </span>
              </>
            );
            return (
              <li key={t.id}>
                {t.audio ? (
                  <button
                    type="button"
                    onClick={() => playTrack(t)}
                    aria-label={`${active && playing ? "Mettre en pause" : "Écouter"} ${t.title}`}
                    aria-pressed={active}
                    className="group block w-full text-left"
                  >
                    {inner}
                  </button>
                ) : (
                  // Pas d'audio public pour ce morceau : la carte ouvre la page Suno.
                  <a
                    href={sunoSongUrl(t.id)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Écouter ${t.title} sur Suno (nouvel onglet)`}
                    className="group block w-full text-left"
                  >
                    {inner}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      )}

      {visible < filtered.length && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE * 2)}
            className="rounded-full border border-white/20 px-6 py-3 font-display font-semibold text-white transition-colors hover:border-white hover:bg-white hover:text-castel-ink"
          >
            Voir plus ({filtered.length - visible} restants)
          </button>
        </div>
      )}

      {/* Rendu dans <body> : `.page-enter` (template.tsx) piège les éléments `fixed`. */}
      {mounted && bar ? createPortal(bar, document.body) : null}
    </div>
  );
}
