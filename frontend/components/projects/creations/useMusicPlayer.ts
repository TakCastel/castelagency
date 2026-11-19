"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { MUSIC_ARTIST, type MusicTrack } from "@/data/music";

/**
 * Lecteur audio unique pour toute la page.
 * `queue` = ordre de lecture (morceaux affichés) ; à la fin d'un morceau, le suivant démarre.
 */
export function useMusicPlayer(
  tracks: MusicTrack[],
  queueSource: MusicTrack[],
) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState(false);

  // Si le morceau en cours n'est plus dans la liste affichée, on enchaîne sur la discographie complète.
  // Les morceaux sans audio public (lien vers Suno) sont exclus.
  const queue = useMemo(
    () =>
      (currentId && !queueSource.some((t) => t.id === currentId)
        ? tracks
        : queueSource
      ).filter((t) => t.audio),
    [queueSource, tracks, currentId],
  );
  const current = useMemo(
    () => tracks.find((t) => t.id === currentId) ?? null,
    [tracks, currentId],
  );

  const play = useCallback(() => {
    void audioRef.current?.play().catch(() => setError(true));
  }, []);

  const playTrack = useCallback(
    (t: MusicTrack) => {
      const audio = audioRef.current;
      if (!audio || !t.audio) return;
      if (t.id === currentId) {
        if (audio.paused) play();
        else audio.pause();
        return;
      }
      setCurrentId(t.id);
      setError(false);
      setTime(0);
      setDuration(t.duration);
      audio.src = t.audio;
      play();
    },
    [currentId, play],
  );

  const step = useCallback(
    (d: number) => {
      if (!queue.length) return;
      const i = queue.findIndex((t) => t.id === currentId);
      playTrack(queue[(i + d + queue.length) % queue.length]);
    },
    [queue, currentId, playTrack],
  );

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!current) {
      if (queue[0]) playTrack(queue[0]);
    } else if (audio.paused) play();
    else audio.pause();
  }, [current, queue, playTrack, play]);

  const seek = useCallback((s: number) => {
    if (audioRef.current) audioRef.current.currentTime = s;
    setTime(s);
  }, []);

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
      artwork: [
        { src: current.imageLarge, sizes: "512x512", type: "image/jpeg" },
      ],
    });
    navigator.mediaSession.setActionHandler("previoustrack", () => step(-1));
    navigator.mediaSession.setActionHandler("nexttrack", () => step(1));
    return () => {
      navigator.mediaSession.setActionHandler("previoustrack", null);
      navigator.mediaSession.setActionHandler("nexttrack", null);
    };
  }, [current, step]);

  /** À rendre une fois dans la page. */
  const audioProps = {
    ref: audioRef,
    preload: "none" as const,
    onPlay: () => setPlaying(true),
    onPause: () => setPlaying(false),
    onTimeUpdate: (e: React.SyntheticEvent<HTMLAudioElement>) =>
      setTime(e.currentTarget.currentTime),
    onLoadedMetadata: (e: React.SyntheticEvent<HTMLAudioElement>) => {
      const d = e.currentTarget.duration;
      if (Number.isFinite(d)) setDuration(d);
    },
    onEnded: () => step(1),
    onError: () => {
      if (currentId) setError(true);
    },
  };

  return {
    audioProps,
    queue,
    current,
    currentId,
    playing,
    time,
    duration,
    error,
    playTrack,
    step,
    toggle,
    seek,
    close,
  };
}

export type MusicPlayerState = ReturnType<typeof useMusicPlayer>;

export const formatTime = (s: number) => {
  if (!Number.isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
};
