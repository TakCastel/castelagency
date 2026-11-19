/**
 * Les vues de /creations : une page par filtre (URL partageable et indexable),
 * chacune avec son titre, son texte et sa description pour les moteurs de recherche.
 */
import type { Metadata } from "next";
import { socialMeta } from "@/lib/seo";

import { books } from "./books";
import { drawings } from "./drawings";
import { tracks } from "./music";

export type CreationKind = "music" | "drawing" | "book";
export type CreationFilter = CreationKind | "all";

const drawingYears = drawings.map((d) => d.date).filter((y): y is number => typeof y === "number");
const firstDrawingYear = Math.min(...drawingYears);
const lastDrawingYear = Math.max(...drawingYears);

export type CreationSection = {
  filter: CreationFilter;
  /** Segment d'URL après /creations ("" pour la vue complète). */
  slug: string;
  /** Libellé du filtre. */
  label: string;
  /** Titre visible (h1). */
  heading: string;
  /** Texte sous le titre. */
  intro: string;
  /** <title> (complété par « | Studio Castel »). */
  metaTitle: string;
  /** Meta description (≈ 150 caractères). */
  description: string;
};

export const creationSections: CreationSection[] = [
  {
    filter: "all",
    slug: "",
    label: "Tout",
    heading: "Créations",
    intro: "Composer, dessiner, écrire : les mêmes histoires, par d'autres chemins.",
    metaTitle: "Créations : musiques, dessins et écrits",
    description: `${tracks.length} musiques originales à écouter, ${drawings.length} dessins au crayon et à l'encre, des romans et univers de fiction à lire : les créations de Studio Castel.`,
  },
  {
    filter: "music",
    slug: "musiques",
    label: "Musiques",
    heading: "Musiques",
    intro: `${tracks.length} morceaux composés avec Suno, entre psytrance, phonk, chœurs et orchestres.`,
    metaTitle: "Musiques originales à écouter",
    description: `Écouter ${tracks.length} morceaux originaux composés avec Suno : psytrance, phonk, électro, orchestral et chœurs. Lecture directe sur le site, des plus aimés aux moins aimés.`,
  },
  {
    filter: "drawing",
    slug: "dessins",
    label: "Dessins",
    heading: "Dessins",
    intro: `Portraits, personnages et études au crayon et à l'encre, de ${firstDrawingYear} à ${lastDrawingYear}.`,
    metaTitle: "Dessins : portraits, personnages et études",
    description: `${drawings.length} dessins originaux au crayon et à l'encre, de ${firstDrawingYear} à ${lastDrawingYear} : portraits, personnages, études et commandes. À voir en grand sur le site.`,
  },
  {
    filter: "book",
    slug: "ecrits",
    label: "Écrits",
    heading: "Écrits",
    intro: "Romans, nouvelles et univers de fiction, de la science-fiction au wiki de jeu.",
    metaTitle: "Écrits : romans, nouvelles et univers",
    description: `${books.length} écrits de fiction à lire en ligne : romans de science-fiction, nouvelles et univers de jeu, sur le site ou sur Wattpad.`,
  },
];

export const creationPath = (s: Pick<CreationSection, "slug">) => (s.slug ? `/creations/${s.slug}` : "/creations");

export const sectionByFilter = (f: CreationFilter) => creationSections.find((s) => s.filter === f)!;

/** Vue correspondant à une URL (/creations, /creations/musiques…). */
export const sectionByPath = (pathname: string) => {
  const slug = pathname.replace(/^\/creations\/?/, "").split("/")[0] ?? "";
  return creationSections.find((s) => s.slug === slug) ?? creationSections[0];
};

export function creationMetadata(s: CreationSection): Metadata {
  const url = creationPath(s);
  return {
    title: s.metaTitle,
    description: s.description,
    alternates: { canonical: url },
    ...socialMeta({ title: `${s.metaTitle} | Studio Castel`, description: s.description, path: url }),
  };
}
