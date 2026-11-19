/**
 * Données structurées schema.org (JSON-LD) pour Google.
 * ProfessionalService (LocalBusiness) + WebSite sur tout le site, Service/FAQ/fil d'Ariane sur les pages de services, VideoGame sur les pages jeux,
 * SoftwareApplication / CreativeWork sur les pages projets.
 */
import type { Game } from "@/data/games";
import { BUSINESS, coreServices, NEARBY_CITIES, type FaqItem, type ServicePage } from "@/data/local-seo";
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

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: BUSINESS.street,
  postalCode: BUSINESS.postalCode,
  addressLocality: BUSINESS.city,
  addressRegion: BUSINESS.region,
  addressCountry: "FR",
};

const areaServed = [
  { "@type": "City", name: "Avignon" },
  ...NEARBY_CITIES.filter((c) => c !== "Avignon").map((name) => ({ "@type": "City", name })),
  { "@type": "AdministrativeArea", name: "Vaucluse" },
  { "@type": "AdministrativeArea", name: "Provence-Alpes-Côte d'Azur" },
  { "@type": "Country", name: "France" },
];

export function organizationJsonLd(): Json[] {
  return [
    {
      "@context": "https://schema.org",
      // ProfessionalService est un LocalBusiness : c'est ce type que Google lit pour la recherche locale.
      "@type": "ProfessionalService",
      "@id": ORG_ID,
      name: BUSINESS.name,
      alternateName: "Studio Castel Avignon",
      description:
        "Studio indépendant à Avignon : création de sites internet, développement d'applications web et mobiles et de jeux vidéo, pour Avignon, le Vaucluse et la région PACA.",
      url: SITE_URL,
      logo: `${SITE_URL}/og-logo-only.png`,
      image: `${SITE_URL}/og-logo-with-text.png`,
      email: BUSINESS.email,
      telephone: BUSINESS.phone,
      founder: { "@type": "Person", name: BUSINESS.founder, jobTitle: "Développeur web et de jeux vidéo" },
      address: postalAddress,
      geo: { "@type": "GeoCoordinates", ...BUSINESS.geo },
      hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${BUSINESS.name}, ${BUSINESS.street}, ${BUSINESS.postalCode} ${BUSINESS.city}`,
      )}`,
      areaServed,
      knowsLanguage: "fr",
      knowsAbout: [
        "Création de site internet",
        "Développement web",
        "Développement d'application mobile",
        "Développement de jeu vidéo",
        "Next.js",
        "React",
        "TypeScript",
        "Référencement naturel (SEO)",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services de Studio Castel",
        itemListElement: coreServices.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.serviceType, url: `${SITE_URL}/${s.slug}` },
        })),
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

export function serviceJsonLd(page: ServicePage): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.h1,
    serviceType: page.serviceType,
    description: page.metaDescription,
    url: `${SITE_URL}/${page.slug}`,
    provider: { "@id": ORG_ID },
    areaServed,
    inLanguage: "fr-FR",
  };
}

export function faqJsonLd(items: FaqItem[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
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
