"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { TrackStats } from "./TrackStats";
import { formatTime, type MusicPlayerState } from "./useMusicPlayer";

/**
 * Vue « En cours de lecture » façon YouTube Music : grande pochette + file « À suivre ».
 * S'ouvre au clic sur la barre de lecture, qui reste visible en dessous.
 */
export function NowPlaying({
  player,
  onClose,
}: {
  player: MusicPlayerState;
  onClose: () => void;
}) {
  const { current, queue, currentId, playing, playTrack } = player;
  const listRef = useRef<HTMLOListElement>(null);

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

  // Le morceau en cours reste visible dans la file.
  useEffect(() => {
    listRef.current
      ?.querySelector('[aria-current="true"]')
      ?.scrollIntoView({ block: "nearest", behavior: "smooth" });
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
      className="fixed inset-x-0 top-0 bottom-[72px] z-[139] overflow-hidden bg-castel-ink font-sans text-white animate-[np-in_0.28s_ease-out]"
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
          <div className="relative aspect-square w-full max-w-[min(72vw,320px)] overflow-hidden rounded-lg shadow-2xl shadow-black/60 sm:max-w-[400px] lg:max-w-[min(560px,calc(100vh-260px))]">
            <Image
              key={current.id}
              src={current.imageLarge}
              alt={`Pochette de ${current.title}`}
              fill
              sizes="(min-width: 1024px) 560px, 80vw"
              className="object-cover"
              priority
            />
          </div>
          <h2 className="mt-6 max-w-full truncate text-center font-display text-2xl font-bold sm:text-3xl">
            {current.title}
          </h2>
          {tags.length > 0 && (
            <p className="mt-1 text-center text-white/60">{tags.join(" · ")}</p>
          )}
          <TrackStats track={current} className="mt-3 text-white/70" />
        </div>

        <section
          aria-label="À suivre"
          className="flex min-h-0 flex-col lg:w-[420px] lg:shrink-0"
        >
          <h3 className="border-b border-white/15 pb-3 font-display text-sm font-semibold uppercase tracking-[0.12em] text-white/70">
            À suivre{" "}
            <span className="tabular-nums text-white/40">· {queue.length}</span>
          </h3>
          <ol
            ref={listRef}
            className="mt-2 flex-1 space-y-1 p-0 lg:overflow-y-auto lg:pr-2"
          >
            {queue.map((t, i) => {
              const active = t.id === currentId;
              return (
                <li key={t.id} className="list-none">
                  <button
                    type="button"
                    onClick={() => playTrack(t)}
                    aria-current={active ? "true" : undefined}
                    className={`group flex w-full items-center gap-3 rounded-md p-2 text-left transition-colors ${active ? "bg-white/15" : "hover:bg-white/10"}`}
                  >
                    <span className="w-6 shrink-0 text-center text-sm tabular-nums text-white/40">
                      {active ? (
                        <span className="text-castel-red">
                          {playing ? "▶" : "❚❚"}
                        </span>
                      ) : (
                        i + 1
                      )}
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
                      <TrackStats track={t} className="text-sm text-white/50" />
                    </span>
                    <span className="shrink-0 text-sm tabular-nums text-white/45">
                      {formatTime(t.duration)}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </section>
      </div>
    </div>
  );
}
