import fs from "node:fs";
import path from "node:path";
import { HeroCarousel, type CarouselCard } from "./HeroCarousel";

/** Illustration détourée générée pour la carte (public/games/cards/<key>.png), si elle existe. */
const cardArt = (key: string) => {
  const rel = `/games/cards/${key}.png`;
  return fs.existsSync(path.join(process.cwd(), "public", rel)) ? rel : null;
};

/**
 * Carrousel 3D du hero : 5 cartes portrait aux couleurs vives, Decalco au centre au départ.
 * Les couleurs sont propres à l'éventail (pas les teintes des jeux).
 */
type FanCard = {
  key: string;
  name: string;
  genre: string;
  platform: string;
  href: string;
  color: string;
  image: string;
};

const cards: FanCard[] = [
  {
    key: "bobitheque",
    name: "Bobithèque",
    genre: "App de films",
    platform: "Web",
    href: "/projets/bobitheque",
    color: "#FF4FA3",
    image: "/assets/projects/project-bobitheque.png",
  },
  {
    key: "pavat",
    name: "Pavat",
    genre: "Jeu de réflexion",
    platform: "Navigateur",
    href: "/jeux/pavat",
    color: "#7C4DFF",
    image: "/games/tiles/pavat-grille.webp",
  },
  {
    key: "decalco",
    name: "Decalco",
    genre: "Jeu pour enfants",
    platform: "Mobile",
    href: "/jeux/decalco",
    color: "#22B8F0",
    image: "/games/tiles/decalco-brosser.webp",
  },
  {
    key: "godsing",
    name: "Godsing",
    genre: "Jeu de simulation",
    platform: "Ordinateur",
    href: "/jeux/godsing",
    color: "#14C98B",
    image: "/games/tiles/godsing-chateau.webp",
  },
  {
    key: "prehistopia",
    name: "Préhistopia",
    genre: "Jeu de construction",
    platform: "Navigateur",
    href: "/jeux/prehistopia",
    color: "#FF8A1F",
    image: "/games/tiles/prehistopia-village.webp",
  },
];

export function HeroFan() {
  const withArt: CarouselCard[] = cards.map((c) => ({ ...c, art: cardArt(c.key) }));
  return <HeroCarousel cards={withArt} initial={2} />;
}
