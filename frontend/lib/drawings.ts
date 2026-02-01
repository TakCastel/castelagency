/**
 * Données des dessins : galerie /assets/drawings.
 * Chaque dessin a un id, une image (src) et un alt.
 */

export type DrawingItem = {
  id: string;
  src: string;
  alt: string;
  title?: string;
  /** Année pour la légende (ex. 2024) */
  date?: number;
  /** Si défini, la modale affiche cette vidéo au lieu de l’image. */
  videoSrc?: string;
};

/** Liste des dessins affichés dans la galerie dessins. */
export const drawings: DrawingItem[] = [
  {
    id: "backpack",
    src: "/assets/drawings/backpack.png",
    alt: "Backpack drawing.",
    title: "Backpack",
    date: 2024,
  },
  {
    id: "betty-draper",
    src: "/assets/drawings/betty-draper.png",
    alt: "Betty Draper drawing.",
    title: "Betty Draper",
    date: 2017,
  },
  {
    id: "mousquetaire",
    src: "/assets/drawings/mousquetaire.png",
    alt: "Mousquetaire drawing.",
    title: "Mousquetaire",
    date: 2024,
  },
  {
    id: "joan-holloway",
    src: "/assets/drawings/joan-holloway.png",
    alt: "Joan Holloway drawing.",
    title: "Joan Holloway",
    date: 2017,
  },
  {
    id: "the-evangelist",
    src: "/assets/drawings/the-evangelist.png",
    alt: "The Evangelist drawing.",
    title: "The Evangelist",
    date: 2024,
    videoSrc: "/assets/drawings/the-evangelist.mp4",
  },
  {
    id: "kira",
    src: "/assets/drawings/kira.png",
    alt: "Kira drawing.",
    title: "Kira",
    date: 2024,
  },
  {
    id: "kate",
    src: "/assets/drawings/kate.png",
    alt: "Kate drawing.",
    title: "Kate",
    date: 2012,
  },
  {
    id: "boweling-crab",
    src: "/assets/drawings/boweling-crab.png",
    alt: "Boweling Crab drawing.",
    title: "Boweling Crab",
    date: 2012,
  },
];

/** Dessins triés du plus récent au plus ancien (par date). */
export function getDrawings(): DrawingItem[] {
  return [...drawings].sort((a, b) => (b.date ?? 0) - (a.date ?? 0));
}
