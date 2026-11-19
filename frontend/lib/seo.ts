import type { Metadata } from "next";

/**
 * Open Graph / Twitter d'une page.
 * Next.js ne fusionne pas `openGraph` avec celui du layout : dès qu'une page en déclare un,
 * tout ce qui n'y est pas (images comprises) disparaît. On passe donc toujours par ici,
 * et toutes les pages partagent le logo du studio (seule exception : la page d'un morceau, avec sa pochette).
 */
export const DEFAULT_OG_IMAGE = {
  url: "/og-logo-with-text.png",
  width: 1200,
  height: 630,
  alt: "Studio Castel, jeux, apps et sites",
};

export function socialMeta({
  title,
  description,
  path,
  images,
  type = "website",
}: {
  title: string;
  description?: string;
  path?: string;
  images?: { url: string; width?: number; height?: number; alt?: string }[];
  type?: "website" | "article";
}): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: {
      type,
      locale: "fr_FR",
      siteName: "Studio Castel",
      title,
      description,
      ...(path ? { url: path } : {}),
      images: images ?? [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: (images ?? [DEFAULT_OG_IMAGE]).map((i) => i.url),
    },
  };
}
