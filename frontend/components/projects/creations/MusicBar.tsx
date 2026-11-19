"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  type Dispatch,
  type SetStateAction,
} from "react";
import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  X,
} from "lucide-react";

import { sunoSongUrl } from "@/data/music";
import { NowPlaying } from "./NowPlaying";
import { formatTime, type MusicPlayerState } from "./useMusicPlayer";

const iconBtn =
  "flex h-10 w-10 items-center justify-center rounded-full text-white/70 hover:bg-white/10 hover:text-white";

/**
 * Barre de lecture collée en bas de l'écran (rendue dans <body> par le parent).
 * Un clic dessus (hors boutons) déplie la vue « En cours de lecture » avec la file.
 */
export function MusicBar({
  player,
  expanded,
  setExpanded,
}: {
  player: MusicPlayerState;
  /** Vue « En cours de lecture » dépliée (pilotée par le fil : un lien de morceau l'ouvre d'office). */
  expanded: boolean;
  setExpanded: Dispatch<SetStateAction<boolean>>;
}) {
  const { current, playing, time, duration, error, toggle, step, seek, close } =
    player;
  const collapse = useCallback(() => setExpanded(false), [setExpanded]);

  // Espace = lecture/pause, partout sur la page tant qu'un morceau est chargé (comme YouTube Music).
  // Sauf en tapant du texte (recherche). preventDefault : ni défilement de la page, ni clic du bouton
  // qui aurait gardé le focus (« suivant » enchaînerait un morceau en plus de la pause).
  const hasTrack = !!current;
  useEffect(() => {
    if (!hasTrack) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.code !== "Space" || e.repeat || e.ctrlKey || e.metaKey || e.altKey)
        return;
      const el = e.target as HTMLElement | null;
      const typing =
        el?.isContentEditable ||
        el?.tagName === "TEXTAREA" ||
        el?.tagName === "SELECT" ||
        (el?.tagName === "INPUT" && (el as HTMLInputElement).type !== "range");
      if (typing) return;
      e.preventDefault();
      toggle();
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [hasTrack, toggle]);
  if (!current) return null;
  const progress = duration ? Math.min(100, (time / duration) * 100) : 0;

  return (
    <>
      {expanded && <NowPlaying player={player} onClose={collapse} />}
      <div
        onClick={(e) => {
          if (!(e.target as HTMLElement).closest("button, a, input"))
            setExpanded((v) => !v);
        }}
        role="region"
        aria-label="Lecteur audio"
        className="fixed inset-x-0 bottom-0 z-[140] cursor-pointer border-t border-white/10 bg-castel-surface/95 font-sans text-white backdrop-blur-md"
      >
        <input
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={time}
          onChange={(e) => seek(Number(e.target.value))}
          aria-label="Position dans le morceau"
          className="music-seek absolute inset-x-0 -top-[7px] h-3.5 w-full cursor-pointer appearance-none bg-transparent"
          style={{ "--p": `${progress}%` } as React.CSSProperties}
        />
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:gap-5 sm:px-8">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-white/5">
            <Image
              src={current.image}
              alt=""
              fill
              sizes="48px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate font-display font-semibold">
              {current.title}
            </p>
            <p className="truncate text-sm text-white/60">
              {error ? (
                <a
                  href={sunoSongUrl(current.id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-castel-red underline"
                >
                  Lecture impossible ici, écouter sur Suno
                </a>
              ) : (
                <span className="tabular-nums">
                  {formatTime(time)} / {formatTime(duration)}
                </span>
              )}
            </p>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Morceau précédent"
              className={`${iconBtn} hidden sm:flex`}
            >
              <SkipBack className="h-5 w-5" fill="currentColor" />
            </button>
            <button
              type="button"
              onClick={toggle}
              aria-label={playing ? "Pause" : "Lecture"}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-castel-ink transition-transform hover:scale-105"
            >
              {playing ? (
                <Pause className="h-5 w-5" fill="currentColor" />
              ) : (
                <Play className="ml-0.5 h-5 w-5" fill="currentColor" />
              )}
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Morceau suivant"
              className={iconBtn}
            >
              <SkipForward className="h-5 w-5" fill="currentColor" />
            </button>
          </div>
          <a
            href={sunoSongUrl(current.id)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ouvrir sur Suno"
            className={`${iconBtn} hidden md:flex`}
          >
            <ExternalLink className="h-[18px] w-[18px]" />
          </a>
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-label={
              expanded ? "Réduire le lecteur" : "Afficher la file de lecture"
            }
            aria-expanded={expanded}
            className={iconBtn}
          >
            {expanded ? (
              <ChevronDown className="h-5 w-5" />
            ) : (
              <ChevronUp className="h-5 w-5" />
            )}
          </button>
          <button
            type="button"
            onClick={() => {
              setExpanded(false);
              close();
            }}
            aria-label="Fermer le lecteur"
            className={iconBtn}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </>
  );
}
