/**
 * Données des livres / écritures (Wattpad, guides, etc.).
 */

export type BookItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  /** Année de publication ou de création. */
  year?: number;
  /** Lien externe (Wattpad, etc.). Ignoré si internalPath est défini. */
  url: string;
  /** Ex. "Wattpad", "Site web". Pour lecture sur le site, ex. "Lecture en ligne". */
  source?: string;
  /** Si défini, le lien pointe vers cette route du site (lecture longue sur le site). */
  internalPath?: string;
};

export const books: BookItem[] = [
  {
    id: "dernier-empire",
    title: "Le Dernier Empire",
    year: 2019,
    description:
      "Humanité éparpillée dans le système. Destins croisés vers l'effondrement de l'empire solaire.",
    image: "/assets/books/book-empire.png",
    imageAlt: "Couverture du roman Le Dernier Empire.",
    url: "https://www.wattpad.com/story/156071409-le-dernier-empire",
    source: "Wattpad",
  },
  {
    id: "dilemme-cadischac",
    title: "Le Dilemme de R. Cadischac",
    year: 2017,
    description:
      "Une scientifique face à une crise interplanétaire. Avec l'aide d'un collègue IA, éviter la catastrophe.",
    image: "/assets/books/book-dilemne.png",
    imageAlt: "Couverture du roman Le Dilemme de R. Cadischac.",
    url: "https://www.wattpad.com/story/108663600-le-dilemme-de-r-cadischac",
    source: "Wattpad",
  },
  {
    id: "skyferia-wiki",
    title: "Skyferia — Wiki",
    year: 2025,
    description:
      "Wiki du JdR Skyferia : univers, règles, personnages et campagnes.",
    image: "/assets/books/wiki-skyferia.png",
    imageAlt: "Wiki Skyferia, jeu de rôle.",
    url: "https://wobbly-pencil-28b.notion.site/1556d23dbf7780179b16de4dc19a0f7a?v=1556d23dbf778005b153000ce4e02b92&pvs=74",
    source: "Notion",
  },
  {
    id: "5thera",
    title: "Beyond Nirn",
    year: 2026,
    description:
      "Guide de campagne The Elder Scrolls, après Skyrim. L'Empire s'affaiblit, les Thalmor dans l'ombre.",
    image: "/assets/books/book-5thera.png",
    imageAlt: "Couverture du guide de campagne Beyond Nirn (5thera).",
    url: "https://takcastel.github.io/5thera/",
    source: "Site web",
  },
  {
    id: "homme-masque-verre",
    title: "L'homme au masque de verre",
    year: 2013,
    description:
      "Au Kil'dé, un commis défend les siens. Destin, justice et masques de verre. Lecture en ligne.",
    image: "/assets/books/book-kheym.png",
    imageAlt: "Couverture de L'homme au masque de verre (Keymlos), lecture en ligne.",
    url: "/creations/ecritures/l-homme-au-masque-de-verre",
    source: "Lecture en ligne",
    internalPath: "/creations/ecritures/l-homme-au-masque-de-verre",
  },
];
