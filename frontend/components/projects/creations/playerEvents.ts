import type { MusicTrack } from "@/data/music";

/**
 * Pont entre la page d'un morceau (rendue par le serveur, hors du fil) et le lecteur,
 * global (MusicPlayerProvider, layout racine). Deux événements window :
 * - PLAY_EVENT  (page → lecteur) : lancer / mettre en pause le morceau donné ;
 * - STATE_EVENT (lecteur → page) : morceau en cours et état lecture/pause.
 */
export const PLAY_EVENT = "castel:play-track";
export const STATE_EVENT = "castel:player-state";

export type PlayerStateDetail = { currentId: string | null; playing: boolean };

/** Dernier état publié : une fiche affichée après coup (navigation interne) le lit au montage. */
let lastState: PlayerStateDetail = { currentId: null, playing: false };
export const getPlayerState = () => lastState;
export const publishPlayerState = (d: PlayerStateDetail) => {
  lastState = d;
  window.dispatchEvent(
    new CustomEvent<PlayerStateDetail>(STATE_EVENT, { detail: d }),
  );
};

export const requestPlay = (track: MusicTrack) =>
  window.dispatchEvent(
    new CustomEvent<MusicTrack>(PLAY_EVENT, { detail: track }),
  );
