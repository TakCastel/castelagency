/**
 * Pont entre la page d'un morceau (rendue par le serveur, hors du fil) et le lecteur,
 * qui vit dans CreationsFeed (layout de /creations). Deux événements window :
 * - PLAY_EVENT  (page → lecteur) : lancer / mettre en pause le morceau `id` ;
 * - STATE_EVENT (lecteur → page) : morceau en cours et état lecture/pause.
 */
export const PLAY_EVENT = "castel:play-track";
export const STATE_EVENT = "castel:player-state";

export type PlayerStateDetail = { currentId: string | null; playing: boolean };

export const requestPlay = (id: string) =>
  window.dispatchEvent(new CustomEvent<string>(PLAY_EVENT, { detail: id }));
