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
      "L'histoire extraordinaire d'une humanité éparpillée aux quatre coins du système, dont les destins croisés mèneront tôt ou tard à l'effondrement de l'empire solaire.",
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
      "Shae est une scientifique qui aspire à explorer les étoiles. Tout bascule lorsqu'une nef mercurienne entre dans l'anneau du puits à gravité, en violation du droit interplanétaire. Avec l'aide de son collègue artificiellement intelligent, elle tentera d'éviter une catastrophe sans précédent.",
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
      "Wiki du jeu de rôle Skyferia. Univers, règles, personnages et campagnes. Documentation hébergée sur Notion.",
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
      "Guide de campagne dans l'univers The Elder Scrolls. L'histoire se déroule quelques décennies après Skyrim : l'Empire s'affaiblit, les Thalmor mènent des expériences secrètes. Une aventure au-delà de Nirn.",
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
      "La véritable histoire du Keymlos. Au Kil'dé, un commis à la défense doit protéger les siens contre le Cantatère et les Lanyshtas. Destin, justice et masques de verre s'entremêlent dans ce récit à lire en ligne.",
    image: "/assets/books/book-kheym.png",
    imageAlt: "Couverture de L'homme au masque de verre (Keymlos), lecture en ligne.",
    url: "/creations/ecritures/l-homme-au-masque-de-verre",
    source: "Lecture en ligne",
    internalPath: "/creations/ecritures/l-homme-au-masque-de-verre",
  },
];
