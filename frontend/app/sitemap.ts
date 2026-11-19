import type { MetadataRoute } from "next";
import { games } from "@/data/games";
import { showcaseProjects } from "@/data/showcase";
import { getChapterSlugs } from "@/lib/training/course";

const BASE_URL = "https://studio-castel.com";

/** Pages statiques principales */
const staticRoutes = [
  "",
  "/projets",
  "/creations",
  "/creations/ecritures/l-homme-au-masque-de-verre",
  "/mentions-legales",
  "/politique-de-confidentialite",
  "/formation-ia",
  "/formation-ia/feuille-de-route",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : ("monthly" as const),
    priority: path === "" ? 1 : 0.8,
  }));

  const gameEntries: MetadataRoute.Sitemap = games.map((game) => ({
    url: `${BASE_URL}/jeux/${game.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const projectEntries: MetadataRoute.Sitemap = showcaseProjects.map((p) => ({
    url: `${BASE_URL}/projets/${p.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const formationEntries: MetadataRoute.Sitemap = getChapterSlugs().map((slug) => ({
    url: `${BASE_URL}/formation-ia/chapitre/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  return [...staticEntries, ...gameEntries, ...projectEntries, ...formationEntries];
}
