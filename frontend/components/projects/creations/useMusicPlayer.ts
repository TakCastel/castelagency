"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { MUSIC_ARTIST, type MusicTrack } from "@/data/music";

import { autoplayFrom, type AutoplayMode } from "./suggestions";

/**
 * Lecteur audio unique pour tout le site (monté par MusicPlayerProvider dans le layout racine).
 *
 * File façon YouTube Music : une seule liste ordonnée `items` et un curseur `pos` (morceau en cours).
 * - avant le curseur : déjà écoutés ; cliquer dessus déplace le curseur, la liste ne bouge pas ;
 * - entre le curseur et `reached` (le plus loin écouté) : écoutés après, ils restent à leur place ;
 * - après `reached` : la lecture automatique (Sélection par genre ou Aléatoire, voir suggestions.ts),
 *   seule partie recalculée quand on change de mode.
 * Le catalogue vient de la page des musiques (`setCatalog`) et reste connu en changeant de page.
 */
const MODE_KEY = "castel:autoplay-mode";

export function useMusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [catalog, setCatalogState] = useState<MusicTrack[]>([]);
  const [items, setItems] = useState<MusicTrack[]>([]);
  const [pos, setPos] = useState(-1);
  const [reached, setReached] = useState(-1);
  // Choix Sélection / Aléatoire mémorisé dans le navigateur, lu dès le premier rendu (le mode
  // n'apparaît pas dans le HTML serveur, pas de souci d'hydratation).
  const [mode, setModeState] = useState<AutoplayMode>(() => {
    if (typeof window === "undefined") return "selection";
    try {
      return localStorage.getItem(MODE_KEY) === "shuffle"
        ? "shuffle"
        : "selection";
    } catch {
      return "selection"; // stockage indisponible (navigation privée…)
    }
  });
  /** Mode avec lequel la lecture automatique a été calculée : s'il diffère du mode coché, on recalcule. */
  const [autoMode, setAutoMode] = useState<AutoplayMode>(mode);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState(false);

  const current = pos >= 0 ? (items[pos] ?? null) : null;
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

  /** Bas niveau : met `t` dans l'élément audio. */
  const load = useCallback(
    (t: MusicTrack, autoplay: boolean) => {
      const audio = audioRef.current;
      if (!audio || !t.audio) return false;
      setError(false);
      setTime(0);
      setDuration(t.duration);
      audio.src = t.audio;
      if (autoplay) play();
      return true;
    },
    [play],
  );

  /** Lecture automatique après les morceaux `kept`, à partir de `seedTrack`. */
  const autoAfter = useCallback(
    (seedTrack: MusicTrack, kept: MusicTrack[], m: AutoplayMode) =>
      autoplayFrom(seedTrack, catalog, new Set(kept.map((x) => x.id)), m),
    [catalog],
  );

  /** Saute à l'index `i` de la file, sans rien réordonner. */
  const goTo = useCallback(
    (i: number, autoplay = true) => {
      const t = items[i];
      if (!t || !load(t, autoplay)) return;
      setPos(i);
      setReached((r) => Math.max(r, i));
    },
    [items, load],
  );

  /**
   * Choix d'un morceau.
   * - Depuis la file (`fromQueue`) : déjà écouté → on y retourne, rien ne bouge ; dans la lecture
   *   automatique → il passe juste après les écoutés, la suite est gardée. Rien n'est compté
   *   écouté sans l'avoir été.
   * - Depuis le catalogue (carte, fiche, lien partagé) : on repart de zéro, ce morceau puis
   *   sa propre lecture automatique.
   */
  const startFrom = useCallback(
    (t: MusicTrack, autoplay: boolean, fromQueue = false) => {
      if (!fromQueue) {
        if (!load(t, autoplay)) return;
        setItems([t, ...autoAfter(t, [t], mode)]);
        setPos(0);
        setReached(0);
        setAutoMode(mode);
        return;
      }
      const lastHeard = Math.max(reached, pos);
      const i = items.findIndex((x) => x.id === t.id);
      if (i >= 0 && i <= lastHeard) return goTo(i, autoplay);
      if (!load(t, autoplay)) return;
      const kept = [...items.slice(0, lastHeard + 1), t];
      setItems([
        ...kept,
        ...items.slice(lastHeard + 1).filter((x) => x.id !== t.id),
      ]);
      setPos(kept.length - 1);
      setReached(kept.length - 1);
    },
    [items, reached, pos, mode, load, goTo, autoAfter],
  );

  /**
   * Clic sur un morceau : en cours → lecture/pause. `fromQueue` : clic dans la file,
   * sinon catalogue (carte, fiche) → la file repart de zéro.
   */
  const playTrack = useCallback(
    (t: MusicTrack, fromQueue = false) => {
      const audio = audioRef.current;
      if (!audio || !t.audio) return;
      if (t.id === currentId) {
        if (audio.paused) play();
        else audio.pause();
        return;
      }
      startFrom(t, true, fromQueue);
    },
    [currentId, play, startFrom],
  );

  /** Charge un morceau sans le lancer (lien partagé : le navigateur interdit la lecture automatique). */
  const cue = useCallback((t: MusicTrack) => startFrom(t, false), [startFrom]);

  /** Recalcule la lecture automatique (après les morceaux écoutés) avec le mode `m`. */
  const refillAuto = useCallback(
    (m: AutoplayMode) => {
      if (!current) return;
      const kept = items.slice(0, Math.max(reached, pos) + 1);
      setItems([...kept, ...autoAfter(current, kept, m)]);
      setAutoMode(m);
    },
    [current, items, reached, pos, autoAfter],
  );

  /** Sélection (par genre) ou Aléatoire, sans couper le son ni toucher aux morceaux écoutés. */
  const setMode = useCallback(
    (m: AutoplayMode) => {
      setModeState(m);
      try {
        localStorage.setItem(MODE_KEY, m);
      } catch {
        // stockage indisponible : le choix vaut pour cette visite
      }
      refillAuto(m);
    },
    [refillAuto],
  );

  // Filet de sécurité : la lecture automatique affichée correspond toujours au mode coché.
  useEffect(() => {
    if (current && autoMode !== mode) refillAuto(mode);
  }, [current, autoMode, mode, refillAuto]);

  const step = useCallback(
    (d: number) => {
      const audio = audioRef.current;
      if (d < 0) {
        // Comme partout : début du morceau s'il a dépassé 3 s, sinon le précédent.
        if (audio && audio.currentTime > 3) {
          audio.currentTime = 0;
          return;
        }
        if (pos > 0) goTo(pos - 1);
        return;
      }
      if (pos + 1 < items.length) return goTo(pos + 1);
      // Fin de la file : on prolonge la lecture automatique depuis le morceau en cours
      // (et si tout a été écouté, on repart sur tout le catalogue).
      if (!current) return;
      let more = autoAfter(current, items, mode);
      if (!more.length) more = autoAfter(current, [current], mode);
      const next = more[0];
      if (!next || !load(next, true)) return;
      setItems((list) => [...list, ...more]);
      setPos(items.length);
      setReached(items.length);
    },
    [pos, items, current, mode, goTo, autoAfter, load],
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
    setItems([]);
    setPos(-1);
    setReached(-1);
    setPlaying(false);
  }, []);

  // Découpage pour l'affichage de la file.
  const history = pos > 0 ? items.slice(0, pos) : [];
  const listenedAfter = pos >= 0 ? items.slice(pos + 1, reached + 1) : [];
  const autoplay = items.slice(Math.max(reached, pos) + 1);

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
    listenedAfter,
    autoplay,
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
