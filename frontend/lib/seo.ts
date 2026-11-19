import type { Metadata } from "next";

/**
 * Open Graph / Twitter d'une page.
 * Next.js ne fusionne pas `openGraph` avec celui du layout : dès qu'une page en déclare un,
 * tout ce qui n'y est pas (images comprises) disparaît. On passe donc toujours par ici,
 * et l'image du studio sert quand la page n'a pas la sienne.
 */
export const DEFAULT_OG_IMAGE = {
  url: "/og-logo-with-text.png",
  width: 1200,
  height: 630,
  alt: "Studio Castel, jeux, apps et sites",
};

type OgImage = { url: string; width?: number; height?: number; alt?: string };

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
  images?: OgImage[];
  type?: "website" | "article";
}): Pick<Metadata, "openGraph" | "twitter"> {
  const imgs = images?.length ? images : [DEFAULT_OG_IMAGE];
  return {
    openGraph: {
      type,
      locale: "fr_FR",
      siteName: "Studio Castel",
      title,
      description,
      ...(path ? { url: path } : {}),
      images: imgs,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imgs.map((i) => i.url),
    },
  };
}
