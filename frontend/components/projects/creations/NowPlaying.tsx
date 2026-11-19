"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Check, ListMusic, Pause, Play, Share2, Shuffle } from "lucide-react";

import { MUSIC_ARTIST, musicTrackPath, type MusicTrack } from "@/data/music";
import { shareLink } from "@/lib/share";

import { Equalizer } from "./Equalizer";
import { TrackStats } from "./TrackStats";
import { formatTime, type MusicPlayerState } from "./useMusicPlayer";

/**
 * Vue « En cours de lecture » façon YouTube Music : grande pochette + file « À suivre ».
 * S'ouvre au clic sur la barre de lecture, qui reste visible en dessous.
 */
export function NowPlaying({
  player,
  onClose,
  closing = false,
}: {
  player: MusicPlayerState;
  onClose: () => void;
  /** Animation de fermeture en cours (le parent démonte la vue juste après). */
  closing?: boolean;
}) {
  const { current, history, upcoming, currentId, playing, toggle } = player;
  const listRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  // Échap pour fermer, page figée derrière.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  // Le morceau en cours se cale en haut de la liste (les déjà écoutés juste au-dessus) :
  // d'un coup à l'ouverture, en douceur quand le morceau change. Seulement quand la liste
  // a son propre défilement (ordinateur) : sur mobile, c'est la vue entière qui défile.
  const firstScroll = useRef(true);
  useEffect(() => {
    const list = listRef.current;
    const el = list?.querySelector<HTMLElement>('[aria-current="true"]');
    if (!list || !el || list.scrollHeight <= list.clientHeight) return;
    list.scrollTo({
      top: Math.max(0, el.offsetTop - 8),
      behavior: firstScroll.current ? "auto" : "smooth",
    });
    firstScroll.current = false;
  }, [currentId]);

  if (!current) return null;
  const tags = current.tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, 3);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="En cours de lecture"
      className={`fixed inset-x-0 top-0 bottom-[72px] z-[139] overflow-hidden bg-castel-ink font-sans text-white ${closing ? "pointer-events-none animate-[np-out_0.28s_cubic-bezier(0.4,0,1,1)_forwards]" : "animate-[np-in_0.42s_cubic-bezier(0.2,0.8,0.2,1)]"}`}
    >
      {/* Fond : la pochette floutée, comme YouTube Music. */}
      <Image
        src={current.imageLarge}
        alt=""
        fill
        sizes="100vw"
        className="scale-125 object-cover opacity-30 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-castel-ink/40 via-castel-ink/70 to-castel-ink"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex h-full max-w-7xl flex-col gap-6 overflow-y-auto px-4 py-6 sm:px-8 lg:flex-row lg:gap-12 lg:overflow-hidden lg:py-10">
        <div className="flex shrink-0 flex-col items-center justify-center lg:flex-1">
          {/* Pochette = bouton lecture/pause, comme sur YouTube Music. shrink-0 : la colonne ne doit jamais
              l'écraser ; sa taille laisse la place au titre, aux stats et au bouton (≈ 390 px avec barre et marges). */}
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? "Pause" : "Lecture"}
            className="group relative aspect-square w-full animate-[np-cover-in_0.55s_cubic-bezier(0.2,0.8,0.2,1)_0.04s_both] max-w-[min(72vw,320px)] shrink-0 overflow-hidden rounded-lg shadow-2xl shadow-black/60 sm:max-w-[400px] lg:max-w-[clamp(200px,calc(100vh-390px),560px)]"
          >
            <Image
              key={current.id}
              src={current.imageLarge}
              alt={`Pochette de ${current.title}`}
              fill
              sizes="(min-width: 1024px) 560px, 80vw"
              className="object-cover"
              priority
            />
            <span
              className={`absolute inset-0 flex items-center justify-center bg-black/35 transition-opacity duration-200 ${playing ? "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100" : "opacity-100"}`}
              aria-hidden="true"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-castel-ink shadow-lg transition-transform group-hover:scale-105 group-active:scale-95">
                {playing ? (
                  <Pause className="h-7 w-7" fill="currentColor" />
                ) : (
                  <Play className="ml-1 h-7 w-7" fill="currentColor" />
                )}
              </span>
            </span>
          </button>
          <h2 className="mt-6 max-w-full truncate text-center font-display text-2xl font-bold sm:text-3xl">
            {current.title}
          </h2>
          {tags.length > 0 && (
            <p className="mt-1 text-center text-white/60">{tags.join(" · ")}</p>
          )}
          <TrackStats track={current} variant="hero" className="mt-5" />
          <button
            type="button"
            onClick={async () => {
              const res = await shareLink(
                window.location.origin + musicTrackPath(current.id),
                `${current.title} · ${MUSIC_ARTIST}`,
              );
              if (res === "copied") {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }
            }}
            aria-live="polite"
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white/85 transition-colors hover:border-white hover:bg-white hover:text-castel-ink"
          >
            {copied ? (
              <Check className="h-4 w-4 text-castel-red" aria-hidden="true" />
            ) : (
              <Share2 className="h-4 w-4" aria-hidden="true" />
            )}
            {copied ? "Lien copié" : "Partager ce morceau"}
          </button>
        </div>

        <section
          aria-label="À suivre"
          className="flex min-h-0 flex-col animate-[np-list-in_0.55s_cubic-bezier(0.2,0.8,0.2,1)_0.1s_both] lg:w-[420px] lg:shrink-0"
        >
          <h3 className="border-b border-white/15 pb-3 font-display text-sm font-semibold uppercase tracking-[0.12em] text-white/70">
            À suivre
          </h3>
          <div
            ref={listRef}
            className="relative mt-2 flex-1 p-0 lg:min-h-0 lg:overflow-y-auto lg:pr-2"
          >
            {history.length > 0 && (
              <ol
                aria-label="Déjà écoutés"
                className="space-y-1 p-0 opacity-60 transition-opacity hover:opacity-100"
              >
                {history.map((t) => (
                  <Row key={t.id} t={t} player={player} />
                ))}
              </ol>
            )}
            <ol className="mt-1 p-0">
              <Row t={current} player={player} />
            </ol>
            <div className="mt-5 flex items-center justify-between gap-3 px-2 pb-2">
              <p className="font-display font-semibold text-white">
                Lecture automatique
              </p>
              <div
                role="radiogroup"
                aria-label="Ordre de la lecture automatique"
                className="inline-flex shrink-0 rounded-full border border-white/15 p-0.5"
              >
                {(
                  [
                    ["selection", "Sélection", ListMusic],
                    ["shuffle", "Aléatoire", Shuffle],
                  ] as const
                ).map(([m, label, Icon]) => (
                  <button
                    key={m}
                    type="button"
                    role="radio"
                    aria-checked={player.mode === m}
                    onClick={() => player.setMode(m)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors ${player.mode === m ? "bg-white text-castel-ink" : "text-white/65 hover:text-white"}`}
                  >
                    <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <ol aria-label="Lecture automatique" className="space-y-1 p-0">
              {upcoming.map((t) => (
                <Row key={t.id} t={t} player={player} />
              ))}
            </ol>
          </div>
        </section>
      </div>
    </div>
  );
}

/** Une ligne de la file : égaliseur / icône lecture-pause au survol, pochette, titre, stats, durée. */
function Row({ t, player }: { t: MusicTrack; player: MusicPlayerState }) {
  const active = t.id === player.currentId;
  const { playing, playTrack } = player;
  return (
    <li className="list-none">
      <button
        type="button"
        onClick={() => playTrack(t)}
        aria-current={active ? "true" : undefined}
        className={`group flex w-full items-center gap-3 rounded-md p-2 text-left transition-colors ${active ? "bg-white/15" : "hover:bg-white/10"}`}
      >
        <span className="relative flex h-6 w-6 shrink-0 items-center justify-center text-white/40">
          <span className="group-hover:invisible">
            {active ? (
              playing ? (
                <Equalizer playing />
              ) : (
                <Play className="h-4 w-4 text-castel-red" fill="currentColor" />
              )
            ) : null}
          </span>
          <span className="invisible absolute inset-0 flex items-center justify-center text-white group-hover:visible">
            {active && playing ? (
              <Pause className="h-4 w-4" fill="currentColor" />
            ) : (
              <Play className="h-4 w-4" fill="currentColor" />
            )}
          </span>
        </span>
        <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded bg-white/5">
          <Image
            src={t.image}
            alt=""
            fill
            sizes="44px"
            className="object-cover"
          />
        </span>
        <span className="min-w-0 flex-1">
          <span
            className={`block truncate font-medium ${active ? "text-white" : "text-white/85"}`}
          >
            {t.title}
          </span>
          <TrackStats track={t} className="mt-0.5" />
        </span>
        <span className="shrink-0 text-sm tabular-nums text-white/45">
          {formatTime(t.duration)}
        </span>
      </button>
    </li>
  );
}
