/**
 * Données des dessins : galerie /assets/drawings.
 * Chaque dessin a un id, une image (src) et un alt.
 */

/** Placeholder flou partagé (gris) pendant le chargement. */
export const DRAWING_BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBEQACEQADEQADE/9k=";

export type DrawingItem = {
  id: string;
  src: string;
  alt: string;
  /** Largeur intrinsèque (pour next/image et ratio). */
  width: number;
  /** Hauteur intrinsèque (pour next/image et ratio). */
  height: number;
  title?: string;
  /** Année pour la légende (ex. 2024) */
  date?: number;
  /** Si défini, la modale affiche cette vidéo au lieu de l’image. */
  videoSrc?: string;
};

/** Liste des dessins affichés dans la galerie dessins. */
export const drawings: DrawingItem[] = [
  {
    id: "commission",
    src: "/assets/drawings/commission.png",
    alt: "Commission drawing.",
    width: 500,
    height: 650,
    title: "Commission",
    date: 2025,
    videoSrc: "/assets/drawings/commission.mp4",
  },
  {
    id: "supercureuil",
    src: "/assets/drawings/supercureuil.png",
    alt: "Supercureuil drawing.",
    width: 500,
    height: 650,
    title: "Supercureuil",
    date: 2025,
    videoSrc: "/assets/drawings/supercureuil.mp4",
  },
  {
    id: "le-garcon",
    src: "/assets/drawings/le-garcon.png",
    alt: "Le garçon drawing.",
    width: 500,
    height: 650,
    title: "Le garçon",
    date: 2012,
  },
  {
    id: "take-cover",
    src: "/assets/drawings/take-cover.png",
    alt: "Take Cover drawing.",
    width: 500,
    height: 650,
    title: "Take Cover",
    date: 2012,
  },
  {
    id: "backpack",
    src: "/assets/drawings/backpack.png",
    alt: "Backpack drawing.",
    width: 500,
    height: 500,
    title: "Backpack",
    date: 2024,
  },
  {
    id: "betty-draper",
    src: "/assets/drawings/betty-draper.png",
    alt: "Betty Draper drawing.",
    width: 500,
    height: 650,
    title: "Betty Draper",
    date: 2017,
  },
  {
    id: "mousquetaire",
    src: "/assets/drawings/mousquetaire.png",
    alt: "Mousquetaire drawing.",
    width: 500,
    height: 650,
    title: "Mousquetaire",
    date: 2024,
  },
  {
    id: "joan-holloway",
    src: "/assets/drawings/joan-holloway.png",
    alt: "Joan Holloway drawing.",
    width: 500,
    height: 650,
    title: "Joan Holloway",
    date: 2017,
  },
  {
    id: "the-evangelist",
    src: "/assets/drawings/the-evangelist.png",
    alt: "The Evangelist drawing.",
    width: 600,
    height: 500,
    title: "The Evangelist",
    date: 2024,
    videoSrc: "/assets/drawings/the-evangelist.mp4",
  },
  {
    id: "kira",
    src: "/assets/drawings/kira.png",
    alt: "Kira drawing.",
    width: 500,
    height: 650,
    title: "Kira",
    date: 2024,
  },
  {
    id: "kate",
    src: "/assets/drawings/kate.png",
    alt: "Kate drawing.",
    width: 500,
    height: 650,
    title: "Kate",
    date: 2012,
  },
  {
    id: "boweling-crab",
    src: "/assets/drawings/boweling-crab.png",
    alt: "Boweling Crab drawing.",
    width: 600,
    height: 500,
    title: "Boweling Crab",
    date: 2012,
  },
  {
    id: "black-holy",
    src: "/assets/drawings/black-holy.jpg",
    alt: "Black Holy drawing.",
    width: 500,
    height: 650,
    title: "Black Holy",
    date: 2024,
  },
  {
    id: "pantin",
    src: "/assets/drawings/pantin.png",
    alt: "Pantin drawing.",
    width: 500,
    height: 650,
    title: "Pantin",
    date: 2010,
  },
  {
    id: "etude",
    src: "/assets/drawings/etude.png",
    alt: "Étude drawing.",
    width: 500,
    height: 650,
    title: "Étude",
    date: 2010,
  },
];

/** Dessins triés du plus récent au plus ancien (par date). */
export function getDrawings(): DrawingItem[] {
  return [...drawings].sort((a, b) => (b.date ?? 0) - (a.date ?? 0));
}

/**
 * Réordonne les dessins pour équilibrer les hauteurs des colonnes du masonry
 * (place chaque item dans la colonne actuellement la plus courte).
 * Pour 3 colonnes, évite qu’une colonne (ex. du milieu) soit beaucoup plus courte.
 */
export function balanceDrawingsForMasonry(
  items: DrawingItem[],
  cols: number = 3
): DrawingItem[] {
  if (items.length <= cols) return items;
  const colHeights: number[] = new Array(cols).fill(0);
  const columns: DrawingItem[][] = Array.from({ length: cols }, () => []);
  const sorted = [...items].sort((a, b) => b.height - a.height);
  for (const item of sorted) {
    const col = colHeights.indexOf(Math.min(...colHeights));
    columns[col].push(item);
    colHeights[col] += item.height;
  }
  const result: DrawingItem[] = [];
  const maxLen = Math.max(...columns.map((c) => c.length));
  for (let i = 0; i < maxLen; i++) {
    for (let c = 0; c < cols; c++) {
      if (columns[c][i]) result.push(columns[c][i]);
    }
  }
  return result;
}
