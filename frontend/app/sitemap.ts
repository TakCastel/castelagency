import type { MetadataRoute } from "next";
import { getBlogSlugs } from "@/lib/blog";
import { getProjectSlugs } from "@/lib/projects";

const BASE_URL = "https://studio-castel.com";

/** Pages statiques principales */
const staticRoutes = [
  "",
  "/contact",
  "/devis",
  "/le-studio",
  "/mes-projets",
  "/mode-de-fonctionnement",
  "/services",
  "/services/site-vitrine",
  "/services/ecommerce",
  "/services/applications-sur-mesure",
  "/services/ux-ui-branding",
  "/services/seo-acquisition",
  "/services/process-ia",
  "/creations",
  "/creations/dessins",
  "/creations/ecritures",
  "/creations/ecritures/l-homme-au-masque-de-verre",
  "/blog",
  "/mentions-legales",
  "/politique-de-confidentialite",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : ("monthly" as const),
    priority: path === "" ? 1 : 0.8,
  }));

  const blogSlugs = getBlogSlugs();
  const blogEntries: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const projectSlugs = getProjectSlugs();
  const projectEntries: MetadataRoute.Sitemap = projectSlugs.map((slug) => ({
    url: `${BASE_URL}/mes-projets/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...blogEntries, ...projectEntries];
}
