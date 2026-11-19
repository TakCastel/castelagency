/**
 * Ce que le site montre en plus des jeux (data/games.ts).
 * Les jeux restent la vedette ; les projets viennent après.
 */
import { projectsDetail, type ProjectDetail } from "./projects";

/** Projet mis en avant juste après les jeux (aucun libellé affiché). */
export const FEATURED_PROJECT_ID = "polinizz";

/** Projets affichés, dans l'ordre. Pavat et Préhistopia sont des jeux (data/games.ts) ; Brice Théâte est retiré. */
const SHOWN_IDS = [
  "polinizz",
  "bobitheque",
  "serpenter",
  "randex",
  "apasnap",
  "subscrivo",
  "archeode",
  "formation-ia",
  "123soleil",
  "florine",
  "arnaud",
] as const;

export type ProjectKind = "app" | "client" | "guide";

const KIND: Record<string, ProjectKind> = {
  polinizz: "app",
  bobitheque: "app",
  serpenter: "app",
  randex: "app",
  apasnap: "app",
  subscrivo: "app",
  archeode: "app",
  "formation-ia": "guide",
  "123soleil": "client",
  florine: "client",
  arnaud: "client",
};

/** Couleur de la carte derrière l'illustration (public/games/cards/<id>.png). */
export const CARD_COLOR: Record<string, string> = {
  polinizz: "#FFFFFF",
  bobitheque: "#FF4FA3",
  serpenter: "#6D5BFF",
  randex: "#2DBE6C",
  apasnap: "#FF6B5A",
  subscrivo: "#C6F432",
  archeode: "#C62848",
  "123soleil": "#1E88E5",
  florine: "#E040FB",
  arnaud: "#00B8D9",
  "formation-ia": "#1F2A44",
};

export type ShowcaseProject = ProjectDetail & { kind: ProjectKind; featured: boolean };

export const showcaseProjects: ShowcaseProject[] = SHOWN_IDS.map((id) => {
  const p = projectsDetail.find((x) => x.id === id);
  if (!p) throw new Error(`Projet introuvable : ${id}`);
  return { ...p, kind: KIND[id], featured: id === FEATURED_PROJECT_ID };
});

export const getShowcaseProject = (slug: string) => showcaseProjects.find((p) => p.id === slug);
