/**
 * Les jeux du studio. Source unique pour l'accueil et les pages /jeux/[slug].
 * Textes repris de la DA (docs/DA-studio-castel.md). Ne rien inventer :
 * un champ manquant reste vide et l'UI affiche un emplacement neutre.
 */

export type GameLink = {
  label: string; // ce que fait le bouton : "Jouer dans le navigateur", "Télécharger sur Google Play"
  href: string;
  kind: "play" | "store" | "download";
};

export type GameImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type Game = {
  slug: string;
  name: string;
  pitch: string | null; // une phrase
  description?: string[]; // paragraphes pour la page du jeu
  cover: GameImage | null; // visuel de la carte (null = emplacement vide)
  /** Logo du jeu, fond transparent si possible (null = pas de logo). */
  logo: GameImage | null;
  /** Ce qui représente le mieux le jeu sur une carte : son logo ou une capture. */
  heroArt: "logo" | "shot";
  screenshots: GameImage[];
  links: GameLink[];
  /** Teinte dominante du jeu, pour habiller sa carte. */
  tint: string;
  status: "available" | "in-progress";
};

export const games: Game[] = [
  {
    slug: "decalco",
    name: "Decalco",
    pitch:
      "Un jeu de décalcomanies pour enfants : on pose un animal dans un paysage et on le frotte pour le faire apparaître.",
    description: [
      "Decalco, ce sont les planches de décalcomanies d'autrefois, sur tablette et téléphone.",
      "On choisit une image sur la planche, on la pose où l'on veut sur le paysage, on l'agrandit, on la tourne ou on la retourne, puis on la brosse du bout du doigt pour la décalquer.",
      "Pas de publicité, pas de compte. Aucune donnée collectée : tout reste sur l'appareil. Fonctionne sans connexion.",
    ],
    cover: { src: "/games/decalco/cover.webp", width: 2000, height: 1125, alt: "Decalco sur ordinateur : un paysage de banquise rempli d'animaux en décalcomanie, avec la planche à droite" },
    logo: { src: "/games/decalco/logo.webp", width: 720, height: 240, alt: "Logo Decalco" },
    heroArt: "logo",
    screenshots: [
      { src: "/games/decalco/shots/1.webp", width: 1080, height: 2337, alt: "Decalco sur téléphone : la ferme, avec vache, cheval, mouton, cochon et chien posés sur le pré" },
      { src: "/games/decalco/shots/2.webp", width: 1080, height: 2337, alt: "Decalco sur téléphone : la banquise, avec ours polaire, manchots, phoque et orque" },
      { src: "/games/decalco/shots/3.webp", width: 1080, height: 2337, alt: "Decalco sur téléphone : la savane, avec éléphant, girafe, lion, zèbre et rhinocéros" },
    ],
    links: [
      { label: "Jouer dans le navigateur", href: "https://decalco.app", kind: "play" },
      { label: "Télécharger sur Google Play", href: "https://play.google.com/store/apps/details?id=com.decalco.app", kind: "store" },
    ],
    tint: "#22B8F0",
    status: "available",
  },
  {
    slug: "pavat",
    name: "Pavat",
    pitch: "Un jeu de réflexion où l'on place des tuiles sur une grille pour former des lignes et des groupes.",
    cover: { src: "/games/pavat/cover.webp", width: 2000, height: 1250, alt: "Pavat : une grille de 7 par 7 remplie de tuiles colorées, devant un décor de forêt" },
    logo: { src: "/games/pavat/logo.webp", width: 900, height: 299, alt: "Logo Pavat" },
    heroArt: "logo",
    screenshots: [
      { src: "/games/pavat/shots/1.webp", width: 2000, height: 1250, alt: "Pavat : une partie en cours, avec le score, les bonus et la pièce suivante" },
      { src: "/games/pavat/shots/2.webp", width: 1080, height: 2322, alt: "Pavat sur téléphone : la grille de tuiles colorées et les bonus en dessous" },
    ],
    links: [{ label: "Jouer dans le navigateur", href: "https://pavat-game.web.app", kind: "play" }],
    tint: "#7C4DFF",
    status: "available",
  },
  {
    slug: "godsing",
    name: "Godsing",
    pitch: "Une planète entière générée à chaque partie, avec son écosystème et ses civilisations.",
    cover: { src: "/games/godsing/cover.webp", width: 2000, height: 1125, alt: "Godsing : un village entouré d'une palissade, éclairé par ses foyers à la tombée de la nuit" },
    logo: { src: "/games/godsing/logo.png", width: 256, height: 256, alt: "Logo Godsing : une planète pixelisée avec une tente et un feu de camp" },
    heroArt: "shot",
    screenshots: [
      { src: "/games/godsing/shots/1.webp", width: 2000, height: 1125, alt: "Godsing : un château, au milieu de maisons et de champs" },
      { src: "/games/godsing/shots/2.webp", width: 2000, height: 1125, alt: "Godsing : la carte du monde, avec ses continents, ses océans et les tribus" },
      { src: "/games/godsing/shots/3.webp", width: 2000, height: 994, alt: "Godsing : la planète entière vue de loin" },
    ],
    links: [{ label: "Télécharger sur godsing.net", href: "https://godsing.net", kind: "download" }],
    tint: "#14C98B",
    status: "available",
  },
  {
    slug: "prehistopia",
    name: "Préhistopia",
    pitch: "Un city builder néolithique où chaque bâtiment façonne la survie de ta tribu.",
    description: [
      "Tu guides une tribu au néolithique : ressources, bâtiments, population.",
      "Un feu de camp pour commencer, puis des huttes, des champs, des ateliers. Chaque construction change ce que ta tribu peut faire.",
    ],
    cover: { src: "/games/prehistopia/cover.webp", width: 2000, height: 1125, alt: "Préhistopia : un village néolithique en vue isométrique, entre plaine et rivière" },
    logo: { src: "/games/prehistopia/logo.png", width: 1024, height: 1024, alt: "Logo Préhistopia" },
    heroArt: "shot",
    screenshots: [
      { src: "/games/prehistopia/shots/1.webp", width: 2000, height: 1125, alt: "Préhistopia : un village dans le biome Oasis, autour d'un point d'eau" },
      { src: "/games/prehistopia/shots/2.webp", width: 2000, height: 1125, alt: "Préhistopia : un village dans le biome Lacs gelés, parmi la neige et les sapins" },
      { src: "/games/prehistopia/shots/3.webp", width: 2000, height: 1125, alt: "Préhistopia : un village développé dans les Plaines" },
    ],
    links: [{ label: "Jouer dans le navigateur", href: "https://prehistopia.vercel.app", kind: "play" }],
    tint: "#FF8A1F",
    status: "available",
  },
];

export const getGame = (slug: string) => games.find((g) => g.slug === slug);

export const CONTACT_EMAIL = "takcastel@gmail.com";
