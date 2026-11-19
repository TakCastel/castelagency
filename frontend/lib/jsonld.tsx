/**
 * Données structurées schema.org (JSON-LD) pour Google.
 * Organization + WebSite sur tout le site, VideoGame sur les pages jeux,
 * SoftwareApplication / CreativeWork sur les pages projets.
 */
import type { Game } from "@/data/games";
import { CONTACT_EMAIL } from "@/data/games";
import type { ShowcaseProject } from "@/data/showcase";

export const SITE_URL = "https://studio-castel.com";
const ORG_ID = `${SITE_URL}/#organization`;

const abs = (path: string) => (path.startsWith("http") ? path : `${SITE_URL}${path}`);

type Json = Record<string, unknown>;

export function JsonLd({ data }: { data: Json | Json[] }) {
  return (
    <script
      type="application/ld+json"
      // `<` échappé pour qu'aucun texte ne puisse fermer la balise script.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function organizationJsonLd(): Json[] {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": ORG_ID,
      name: "Studio Castel",
      url: SITE_URL,
      logo: `${SITE_URL}/og-logo-only.png`,
      email: CONTACT_EMAIL,
      founder: { "@type": "Person", name: "Tarik Talhaoui" },
      address: {
        "@type": "PostalAddress",
        streetAddress: "3 rue Portail Bienson",
        postalCode: "84000",
        addressLocality: "Avignon",
        addressCountry: "FR",
      },
      identifier: { "@type": "PropertyValue", propertyID: "SIRET", value: "85316573600028" },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "Studio Castel",
      url: SITE_URL,
      inLanguage: "fr-FR",
      publisher: { "@id": ORG_ID },
    },
  ];
}

export function gameJsonLd(game: Game): Json {
  const play = game.links.find((l) => l.kind === "play");
  return {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: game.name,
    url: `${SITE_URL}/jeux/${game.slug}`,
    ...(game.pitch ? { description: game.pitch } : {}),
    ...(game.cover ? { image: abs(game.cover.src) } : {}),
    ...(game.screenshots.length ? { screenshot: game.screenshots.map((s) => abs(s.src)) } : {}),
    ...(play ? { gamePlatform: "Navigateur web" } : {}),
    ...(game.links.length ? { sameAs: game.links.map((l) => abs(l.href)) } : {}),
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    inLanguage: "fr-FR",
  };
}

export function projectJsonLd(p: ShowcaseProject, description: string): Json {
  const isApp = p.kind === "app";
  return {
    "@context": "https://schema.org",
    "@type": isApp ? "SoftwareApplication" : "CreativeWork",
    name: p.title,
    url: `${SITE_URL}/projets/${p.id}`,
    description,
    image: abs(p.image),
    ...(isApp ? { applicationCategory: p.isMobileApp ? "MobileApplication" : "WebApplication" } : {}),
    ...(p.url ? { sameAs: abs(p.url) } : {}),
    creator: { "@id": ORG_ID },
    inLanguage: "fr-FR",
  };
}
