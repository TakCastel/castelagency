"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { createPortal } from "react-dom";

import type { MusicTrack } from "@/data/music";

import { MusicBar } from "./MusicBar";
import { PLAY_EVENT, publishPlayerState } from "./playerEvents";
import { useMusicPlayer, type MusicPlayerState } from "./useMusicPlayer";

type MusicContext = {
  player: MusicPlayerState;
  /** Vue « En cours de lecture » dépliée. */
  expanded: boolean;
  setExpanded: Dispatch<SetStateAction<boolean>>;
};

const Ctx = createContext<MusicContext | null>(null);

export function useMusic() {
  const ctx = useContext(Ctx);
  if (!ctx)
    throw new Error("useMusic doit être utilisé sous <MusicPlayerProvider>");
  return ctx;
}

/**
 * Lecteur de musique global, monté dans le layout racine : une fois un morceau lancé,
 * la barre reste en bas de l'écran sur tout le site et la musique continue d'une page
 * à l'autre. La croix de la barre coupe le son et la retire.
 */
export function MusicPlayerProvider({ children }: { children: ReactNode }) {
  const player = useMusicPlayer();
  const [expanded, setExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Fermer le lecteur referme aussi la vue « En cours ».
  const { current, currentId, playing, playTrack } = player;
  useEffect(() => {
    if (!current) setExpanded(false);
  }, [current]);

  // Pont avec la fiche d'un morceau (TrackHero, rendue par le serveur) : elle demande la lecture,
  // on lui renvoie l'état.
  useEffect(() => {
    const on = (e: Event) => playTrack((e as CustomEvent<MusicTrack>).detail);
    window.addEventListener(PLAY_EVENT, on);
    return () => window.removeEventListener(PLAY_EVENT, on);
  }, [playTrack]);
  useEffect(() => {
    publishPlayerState({ currentId, playing });
  }, [currentId, playing]);

  return (
    <Ctx.Provider value={{ player, expanded, setExpanded }}>
      {children}
      <audio {...player.audioProps} />
      {/* Place réservée sous le pied de page pour que la barre ne cache rien. */}
      {current && <div aria-hidden="true" className="h-[72px]" />}
      {mounted && current
        ? createPortal(
            <MusicBar
              player={player}
              expanded={expanded}
              setExpanded={setExpanded}
            />,
            document.body,
          )
        : null}
    </Ctx.Provider>
  );
}
