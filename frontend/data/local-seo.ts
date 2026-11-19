/**
 * Référencement local : qui est le studio, où il travaille, et le contenu des pages de services
 * (/developpeur-web-avignon, /creation-site-internet-avignon, ...).
 * Nom, adresse et téléphone (NAP) : les mêmes que les mentions légales, à garder identiques
 * à la fiche Google Business Profile.
 */
import { CONTACT_EMAIL, games } from "./games";

export const BUSINESS = {
  name: "Studio Castel",
  founder: "Tarik Talhaoui",
  email: CONTACT_EMAIL,
  phone: "+33608432059",
  phoneDisplay: "06 08 43 20 59",
  street: "3 rue Portail Bienson",
  postalCode: "84000",
  city: "Avignon",
  department: "Vaucluse",
  region: "Provence-Alpes-Côte d'Azur",
  geo: { latitude: 43.9511, longitude: 4.8113 },
} as const;

/** Villes citées sur les pages de services : Avignon et son bassin, puis le reste de la région. */
export const NEARBY_CITIES = [
  "Avignon",
  "Le Pontet",
  "Villeneuve-lès-Avignon",
  "Sorgues",
  "Morières-lès-Avignon",
  "Châteaurenard",
  "L'Isle-sur-la-Sorgue",
  "Carpentras",
  "Cavaillon",
  "Orange",
  "Apt",
  "Pertuis",
] as const;

export const REGION_CITIES = ["Arles", "Nîmes", "Aix-en-Provence", "Marseille", "Toulon", "Nice"] as const;

export type ServiceSlug =
  | "developpeur-web-avignon"
  | "creation-site-internet-avignon"
  | "developpement-application-avignon"
  | "developpement-jeu-video-avignon";

export type FaqItem = { q: string; a: string };

export type ServicePage = {
  slug: ServiceSlug;
  /** Libellé court pour les liens (menu, footer, cartes). */
  label: string;
  /** Phrase courte pour les cartes de l'accueil. */
  teaser: string;
  /** Nom du service pour les données structurées. */
  serviceType: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  intro: string;
  sections: { title: string; paragraphs?: string[]; items?: string[] }[];
  /** Projets (data/showcase.ts) et jeux (data/games.ts) montrés en preuve. */
  projectIds: string[];
  gameSlugs: string[];
  faq: FaqItem[];
};

const zoneAnswer =
  "Le studio est à Avignon. Je travaille avec des clients d'Avignon et du Vaucluse (Le Pontet, Carpentras, Orange, Cavaillon, L'Isle-sur-la-Sorgue, Apt, Pertuis), du Gard et des Bouches-du-Rhône voisins, et de toute la région PACA. On peut se voir en vrai pour lancer le projet, puis avancer en visio. Je travaille aussi à distance partout en France.";

export const servicePages: ServicePage[] = [
  {
    slug: "developpeur-web-avignon",
    label: "Développeur web à Avignon",
    teaser: "Sites, apps et jeux, faits à Avignon par une seule personne.",
    serviceType: "Développement web, applications et jeux",
    metaTitle: "Développeur web à Avignon, sites, apps et jeux sur mesure",
    metaDescription:
      "Développeur web indépendant à Avignon (Vaucluse) : création de sites internet, d'applications web et mobiles et de jeux vidéo, de l'idée à la mise en ligne. Clients à Avignon, dans le Vaucluse et en PACA.",
    eyebrow: "Avignon · Vaucluse · PACA",
    h1: "Développeur web à Avignon",
    intro:
      "Studio Castel est un studio indépendant installé à Avignon. Je conçois et je développe des sites, des apps et des jeux pour des associations, des artistes, des indépendants et des entreprises du Vaucluse et de la région PACA.",
    sections: [
      {
        title: "Une seule personne, du début à la fin",
        paragraphs: [
          "Pas d'agence, pas de sous-traitance. La personne avec qui tu parles du projet est celle qui le dessine, qui le code et qui le met en ligne.",
          "Les échanges sont directs et les décisions rapides. Et quand il faudra faire évoluer le projet deux ans plus tard, tu retrouveras quelqu'un qui le connaît par cœur.",
        ],
      },
      {
        title: "Ce que je fabrique",
        items: [
          "Des sites internet : site vitrine, portfolio, site d'association, refonte d'un site existant.",
          "Des applications web et mobiles : outils métier, applications grand public, PWA installables sur téléphone.",
          "Des jeux vidéo : jeux sur navigateur, sur mobile et sur ordinateur, conçus et publiés par le studio.",
        ],
      },
      {
        title: "Comment ça se passe",
        items: [
          "Un premier échange, à Avignon ou en visio, pour comprendre ce dont tu as besoin.",
          "Une proposition claire : ce qui sera fait, en combien de temps, pour quel prix.",
          "Des versions en ligne tôt et souvent, pour valider au fur et à mesure.",
          "La mise en ligne, puis un suivi si tu le souhaites.",
        ],
      },
      {
        title: "Rapide et bien référencé",
        paragraphs: [
          "Chaque projet est développé avec des outils modernes (Next.js, React, TypeScript). Il est pensé pour charger vite, rester accessible et remonter dans Google dès sa mise en ligne.",
        ],
      },
    ],
    projectIds: ["123soleil", "polinizz", "florine"],
    gameSlugs: [],
    faq: [
      {
        q: "Pourquoi un développeur indépendant plutôt qu'une agence web à Avignon ?",
        a: "Tu as un seul interlocuteur, qui fait tout lui-même. Pas de chef de projet intermédiaire, pas de travail sous-traité. Les échanges sont plus simples, les délais plus courts, et le prix reflète le travail réel.",
      },
      { q: "Tu travailles uniquement à Avignon ?", a: zoneAnswer },
      {
        q: "Combien coûte un site ou une application ?",
        a: "Ça dépend du périmètre : un site vitrine de quelques pages n'a rien à voir avec une application sur mesure. Après un premier échange gratuit, je t'envoie un devis détaillé avec un prix ferme.",
      },
      {
        q: "Est-ce que tu peux reprendre un site existant ?",
        a: "Oui. Refonte complète, amélioration de la vitesse, correction du référencement ou ajout de fonctionnalités : je regarde d'abord l'existant, puis je te dis honnêtement ce qui vaut le coup.",
      },
    ],
  },
  {
    slug: "creation-site-internet-avignon",
    label: "Création de site internet",
    teaser: "Sites vitrines, portfolios et sites d'associations, rapides et bien placés sur Google.",
    serviceType: "Création de site internet",
    metaTitle: "Création de site internet à Avignon, site vitrine sur mesure",
    metaDescription:
      "Création de site internet à Avignon et dans le Vaucluse : site vitrine, portfolio, site d'association, refonte. Design sur mesure, site rapide et bien référencé sur Google. Devis gratuit.",
    eyebrow: "Création de site · Avignon",
    h1: "Création de site internet à Avignon",
    intro:
      "Un site qui te ressemble, qui charge vite et qu'on trouve sur Google. Je crée des sites vitrines, des portfolios et des sites d'associations pour des clients d'Avignon, du Vaucluse et de la région PACA.",
    sections: [
      {
        title: "Les sites que je crée",
        items: [
          "Site vitrine pour un commerce, un artisan, un indépendant ou une entreprise.",
          "Portfolio pour un artiste, un photographe, un réalisateur.",
          "Site d'association, avec actualités et événements faciles à mettre à jour.",
          "Refonte d'un site vieillissant, lent ou mal classé sur Google.",
        ],
      },
      {
        title: "Un design fait pour toi",
        paragraphs: [
          "Pas de thème acheté puis recoloré. Chaque site est dessiné à partir de ce que tu fais et des gens que tu veux toucher, puis développé à la main.",
          "Tu gardes la main sur ton contenu. Quand c'est utile, le site est livré avec une interface d'administration simple pour modifier tes textes, tes photos et tes événements.",
        ],
      },
      {
        title: "Pensé pour Google dès le départ",
        items: [
          "Pages rapides, même sur téléphone et en 4G.",
          "Titres, descriptions et balisage soignés pour chaque page.",
          "Référencement local : ta ville, ton quartier, ta fiche Google.",
          "Accessibilité de base respectée, pour tout le monde.",
        ],
      },
    ],
    projectIds: ["123soleil", "florine", "arnaud"],
    gameSlugs: [],
    faq: [
      {
        q: "Combien de temps faut-il pour créer un site vitrine ?",
        a: "Pour un site vitrine bien cadré, compte deux à quatre semaines entre le premier échange et la mise en ligne. Le délai dépend surtout du nombre de pages et du moment où les textes et les photos sont prêts.",
      },
      {
        q: "Est-ce que je pourrai modifier mon site moi-même ?",
        a: "Oui, si tu en as besoin. Je peux brancher une interface d'administration pour que tu changes tes textes, tes images ou tes actualités sans toucher au code.",
      },
      {
        q: "Mon site sera-t-il bien référencé sur Google à Avignon ?",
        a: "Le site est construit pour ça : rapide, bien structuré, avec les bonnes informations locales. Je t'aide aussi à créer ou à soigner ta fiche Google, qui pèse lourd dans les recherches du type « près de chez moi ».",
      },
      { q: "Tu te déplaces dans le Vaucluse ?", a: zoneAnswer },
    ],
  },
  {
    slug: "developpement-application-avignon",
    label: "Développement d'application",
    teaser: "Applications web et mobiles sur mesure, de l'idée à la mise en ligne.",
    serviceType: "Développement d'application web et mobile",
    metaTitle: "Développement d'application web et mobile à Avignon",
    metaDescription:
      "Développement d'applications web et mobiles sur mesure à Avignon (Vaucluse, PACA) : outils métier, apps grand public, PWA. De l'idée au lancement, par un développeur indépendant.",
    eyebrow: "Applications · Avignon",
    h1: "Développement d'application à Avignon",
    intro:
      "Tu as une idée d'application ou un outil à construire pour ton activité ? Je conçois et je développe des applications web et mobiles sur mesure depuis Avignon, pour des clients du Vaucluse et de toute la région PACA.",
    sections: [
      {
        title: "Ce que je développe",
        items: [
          "Applications web : plateformes, tableaux de bord, outils internes, espaces clients.",
          "Applications mobiles et PWA, installables sur téléphone et utilisables hors connexion.",
          "Produits grand public, de la première maquette à la mise en ligne.",
          "Intégrations avec des services existants : paiement, données externes, IA.",
        ],
      },
      {
        title: "De l'idée à l'app qui tourne",
        paragraphs: [
          "On commence petit, avec la version la plus simple qui rend déjà service. Elle est en ligne vite, tu la testes avec de vrais utilisateurs, et l'app grandit à partir de ce qu'ils en font.",
          "Je publie aussi mes propres applications. Je connais donc tout le chemin, de l'idée à la boutique d'applications en passant par l'hébergement.",
        ],
      },
      {
        title: "Technique",
        paragraphs: [
          "Next.js, React et TypeScript pour le web, Capacitor et les PWA pour le mobile. Ce sont des technologies solides et répandues : ton application reste facile à faire évoluer, avec moi ou avec quelqu'un d'autre.",
        ],
      },
    ],
    projectIds: ["polinizz", "bobitheque", "apasnap"],
    gameSlugs: [],
    faq: [
      {
        q: "Application web ou application mobile, que choisir ?",
        a: "Souvent, une application web bien faite (PWA) suffit : elle s'installe sur le téléphone, fonctionne hors connexion et ne demande qu'un seul développement. Quand il faut être sur les stores, je la publie sur Google Play. On en parle au premier échange.",
      },
      {
        q: "Combien coûte le développement d'une application ?",
        a: "Tout dépend des fonctionnalités. Je propose de démarrer par une première version resserrée, avec un prix ferme, puis d'ajouter le reste par étapes. Le premier échange est gratuit.",
      },
      {
        q: "Est-ce que l'application m'appartient ?",
        a: "Oui. Le code, le nom de domaine et les comptes sont à toi. Rien ne te lie au studio, à part l'envie de continuer ensemble.",
      },
      { q: "Tu travailles avec des entreprises hors d'Avignon ?", a: zoneAnswer },
    ],
  },
  {
    slug: "developpement-jeu-video-avignon",
    label: "Développement de jeu vidéo",
    teaser: "Des jeux sur navigateur, mobile et ordinateur, et des jeux sur commande.",
    serviceType: "Développement de jeu vidéo",
    metaTitle: "Studio de jeu vidéo indépendant à Avignon, développement de jeux",
    metaDescription:
      "Studio Castel, studio de jeu vidéo indépendant à Avignon (Vaucluse) : jeux sur navigateur, mobile et ordinateur. Decalco, Pavat, Godsing, Préhistopia. Jeux sur commande, serious games et jeux pour marques.",
    eyebrow: "Jeu vidéo · Avignon",
    h1: "Studio de jeu vidéo à Avignon",
    intro:
      "Studio Castel crée ses propres jeux vidéo à Avignon, sur navigateur, sur mobile et sur ordinateur. Le studio développe aussi des jeux sur commande pour des entreprises, des musées, des écoles et des associations de la région PACA.",
    sections: [
      {
        title: "Des jeux faits ici",
        paragraphs: [
          "Un jeu de décalcomanies pour les enfants, un jeu de réflexion, un simulateur de planète, un city builder préhistorique. Tous sont conçus, dessinés et codés à Avignon, et tu peux y jouer dès maintenant.",
        ],
      },
      {
        title: "Un jeu pour ton projet",
        items: [
          "Jeu éducatif ou serious game pour une école, un musée ou une collectivité.",
          "Jeu promotionnel pour une marque, un événement ou un festival.",
          "Jeu sur navigateur, jouable sans installation sur ordinateur et sur téléphone.",
          "Jeu mobile publié sur Google Play.",
        ],
      },
      {
        title: "Comment on avance",
        paragraphs: [
          "On part d'une idée de jeu simple qu'on peut tester très vite. Un prototype jouable arrive tôt, on y joue, on garde ce qui marche et on affine. Le jeu sort quand il est vraiment agréable à jouer.",
        ],
      },
    ],
    projectIds: [],
    gameSlugs: games.filter((g) => g.status === "available").map((g) => g.slug),
    faq: [
      {
        q: "Studio Castel développe des jeux sur commande ?",
        a: "Oui. En plus de ses propres jeux, le studio réalise des jeux pour des entreprises, des institutions culturelles, des écoles et des associations : jeu éducatif, jeu promotionnel, expérience interactive pour un événement.",
      },
      {
        q: "Sur quelles plateformes sortent les jeux ?",
        a: "Selon les jeux : sur navigateur (aucune installation), sur mobile via Google Play et sur ordinateur.",
      },
      {
        q: "Combien de temps faut-il pour faire un petit jeu ?",
        a: "Un petit jeu sur navigateur pour un événement peut sortir en quelques semaines. Un jeu plus riche demande plusieurs mois. On fixe ensemble le périmètre pour tenir la date qui compte pour toi.",
      },
      { q: "Le studio travaille avec des clients hors d'Avignon ?", a: zoneAnswer },
    ],
  },
];

export const getServicePage = (slug: string) => servicePages.find((s) => s.slug === slug);

/** Les trois services concrets (sans la page générale). */
export const coreServices = servicePages.filter((s) => s.slug !== "developpeur-web-avignon");
