"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { MUSIC_ARTIST, type MusicTrack } from "@/data/music";

import { autoplayFrom, type AutoplayMode } from "./suggestions";

/**
 * Lecteur audio unique pour tout le site (monté par MusicPlayerProvider dans le layout racine).
 *
 * File façon YouTube Music : `history` (déjà écoutés, en haut), `current`, puis `upcoming`,
 * une lecture automatique calculée depuis le morceau choisi (`seed`) : même genre d'abord,
 * puis de plus en plus éloigné (voir suggestions.ts). Le catalogue est fourni par la page
 * des musiques (`setCatalog`) et conservé quand on change de page.
 */
const HISTORY_MAX = 50;

export function useMusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [catalog, setCatalogState] = useState<MusicTrack[]>([]);
  const [current, setCurrent] = useState<MusicTrack | null>(null);
  const [seed, setSeed] = useState<MusicTrack | null>(null);
  const [mode, setModeState] = useState<AutoplayMode>("selection");
  const [history, setHistory] = useState<MusicTrack[]>([]);
  const [upcoming, setUpcoming] = useState<MusicTrack[]>([]);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState(false);
  const currentId = current?.id ?? null;

  /** Toutes les musiques (suggestions). Une liste vide ne remplace pas celle déjà connue. */
  const setCatalog = useCallback((c: MusicTrack[]) => {
    if (c.length) setCatalogState(c);
  }, []);

  const play = useCallback(() => {
    // AbortError (pause juste après lecture, changement de morceau) et NotAllowedError (lecture
    // automatique refusée) ne sont pas des pannes : seul un format illisible affiche l'erreur.
    void audioRef.current?.play().catch((e: unknown) => {
      if (e instanceof DOMException && e.name === "NotSupportedError")
        setError(true);
    });
  }, []);

  /** Bas niveau : met `t` dans le lecteur (sans toucher à la file). */
  const load = useCallback(
    (t: MusicTrack, autoplay: boolean) => {
      const audio = audioRef.current;
      if (!audio || !t.audio) return false;
      setCurrent(t);
      setError(false);
      setTime(0);
      setDuration(t.duration);
      audio.src = t.audio;
      if (autoplay) play();
      return true;
    },
    [play],
  );

  const pushHistory = useCallback((t: MusicTrack | null) => {
    if (!t) return;
    setHistory((h) =>
      [...h.filter((x) => x.id !== t.id), t].slice(-HISTORY_MAX),
    );
  }, []);

  /** Nouveau point de départ : le morceau choisi + sa lecture automatique. */
  const startFrom = useCallback(
    (t: MusicTrack, autoplay: boolean) => {
      if (!load(t, autoplay)) return;
      pushHistory(current);
      setSeed(t);
      const played = new Set([...history.map((x) => x.id), current?.id ?? ""]);
      setUpcoming(autoplayFrom(t, catalog, played, mode));
    },
    [load, pushHistory, current, history, catalog, mode],
  );

  /**
   * Clic sur un morceau. Déjà en cours : lecture/pause. Dans la file (« À suivre » ou
   * déjà écouté) : on y saute sans recalculer. Ailleurs (cartes, fiche) : nouvelle lecture automatique.
   */
  const playTrack = useCallback(
    (t: MusicTrack) => {
      const audio = audioRef.current;
      if (!audio || !t.audio) return;
      if (t.id === currentId) {
        if (audio.paused) play();
        else audio.pause();
        return;
      }
      const inUpcoming = upcoming.some((x) => x.id === t.id);
      const inHistory = history.some((x) => x.id === t.id);
      if (!inUpcoming && !inHistory) return startFrom(t, true);
      if (!load(t, true)) return;
      if (inUpcoming) {
        pushHistory(current);
        setUpcoming((u) => u.filter((x) => x.id !== t.id));
      } else {
        setHistory((h) => h.filter((x) => x.id !== t.id));
        if (current) setUpcoming((u) => [current, ...u]);
      }
    },
    [currentId, upcoming, history, current, play, load, startFrom, pushHistory],
  );

  /** Sélection (par genre) ou Aléatoire : la suite est recalculée depuis le morceau en cours, sans couper le son. */
  const setMode = useCallback(
    (m: AutoplayMode) => {
      setModeState(m);
      if (!current) return;
      setSeed(current);
      setUpcoming(
        autoplayFrom(current, catalog, new Set(history.map((x) => x.id)), m),
      );
    },
    [current, catalog, history],
  );

  /** Charge un morceau sans le lancer (lien partagé : le navigateur interdit la lecture automatique). */
  const cue = useCallback((t: MusicTrack) => startFrom(t, false), [startFrom]);

  const step = useCallback(
    (d: number) => {
      const audio = audioRef.current;
      if (d < 0) {
        // Comme partout : on revient au début du morceau, ou au précédent s'il vient de commencer.
        if (audio && audio.currentTime > 3) {
          audio.currentTime = 0;
          return;
        }
        const prev = history[history.length - 1];
        if (!prev || !load(prev, true)) return;
        setHistory((h) => h.slice(0, -1));
        if (current) setUpcoming((u) => [current, ...u]);
        return;
      }
      let next = upcoming[0];
      let rest = upcoming.slice(1);
      if (!next && current) {
        // Fin de la lecture automatique : on repart du morceau en cours.
        const fresh = autoplayFrom(
          current,
          catalog,
          new Set(history.map((x) => x.id)),
          mode,
        );
        next = fresh[0];
        rest = fresh.slice(1);
      }
      if (!next || !load(next, true)) return;
      pushHistory(current);
      setUpcoming(rest);
    },
    [history, upcoming, current, catalog, mode, load, pushHistory],
  );

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!current) {
      const first = catalog.find((t) => t.audio);
      if (first) startFrom(first, true);
    } else if (audio.paused) play();
    else audio.pause();
  }, [current, catalog, startFrom, play]);

  const seek = useCallback((s: number) => {
    if (audioRef.current) audioRef.current.currentTime = s;
    setTime(s);
  }, []);

  const close = useCallback(() => {
    const audio = audioRef.current;
    audio?.pause();
    audio?.removeAttribute("src");
    audio?.load();
    setCurrent(null);
    setSeed(null);
    setHistory([]);
    setUpcoming([]);
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
    onPlay: () => {
      setPlaying(true);
      setError(false);
    },
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
    history,
    upcoming,
    seed,
    mode,
    setMode,
    current,
    currentId,
    playing,
    time,
    duration,
    error,
    playTrack,
    cue,
    setCatalog,
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
