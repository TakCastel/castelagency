/**
 * Données partagées des projets : liste + contenu des pages dédiées.
 * Chaque projet a un slug (id) pour l’URL /mes-projets/[slug].
 */

export type ProjectItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  url?: string;
  /** App mobile : affichage en cadre type smartphone */
  isMobileApp?: boolean;
};

export type ProjectDetail = ProjectItem & {
  /** Contexte / cas d’usage du projet */
  useCase: string;
  /** Ce que j’ai fait (paragraphes ou puces) */
  whatIDid: string[];
  /** Comment j’ai bossé (méthode, organisation) */
  howIWorked: string[];
  /** Ce que j’ai accompli et aidé à mettre en place */
  accomplishments: string[];
  /** Technologies utilisées */
  technologies: string[];
};

export const projectsDetail: ProjectDetail[] = [
  {
    id: "polinizz",
    title: "Polinizz",
    description: "Moteur de recherche d'événements près de chez soi.",
    image: "/project-polinizz.png",
    imageAlt: "Aperçu du projet Polinizz, recherche d’événements.",
    url: "https://polinizz.fr/",
    useCase:
      "Polinizz permet de découvrir les événements (culture, sport, loisirs) près de chez soi, de créer des événements pour les associations et collectivités, et de sauvegarder des favoris. Le projet s’engage aussi pour la protection des abeilles (reversement Patreon).",
    whatIDid: [
      "Conception et développement du produit (recherche d’événements, création, favoris).",
      "Design et UX du site, intégration des parcours utilisateur.",
      "Mise en place du soutien Patreon et de la page dédiée aux abeilles.",
      "SEO, performance et accessibilité.",
    ],
    howIWorked: [
      "Product building de bout en bout : stratégie, design, dev, déploiement.",
      "Itérations courtes avec retours utilisateurs et priorisation de la roadmap.",
      "Accompagnement incubateur French Tech pour structurer le projet.",
    ],
    accomplishments: [
      "Site en production avec recherche par ville, création d’événements et favoris.",
      "Engagement biodiversité intégré (partenariat apiculteurs).",
      "Base solide pour évolutions (notifications, app mobile, etc.).",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Netlify", "PWA", "Patreon"],
  },
  {
    id: "florine",
    title: "Florine Clap",
    description: "Portfolio d'une réalisatrice et artiste.",
    image: "/project-florine.png",
    imageAlt: "Aperçu du site de Florine Clap.",
    url: "https://www.florineclap.com/",
    useCase:
      "Site de Florine Clap, réalisatrice et artiste à Avignon : films, médiations, vidéos/art, actualités et bio. Vitrine pour faire connaître son travail et ses projets.",
    whatIDid: [
      "Refonte complète du site : structure (Films, Médiations, Vidéos/art, Actualités, Bio).",
      "Développement en Next.js avec Directus pour la gestion des contenus.",
      "Design sobre et expérience fluide pour mettre en avant les œuvres.",
    ],
    howIWorked: [
      "Cadrage des besoins avec Florine (contenus, mise à jour, évolution).",
      "Choix de Directus pour qu’elle puisse gérer les contenus en autonomie.",
    ],
    accomplishments: [
      "Site refondu, performant et évolutif.",
      "Back-office simple pour publier et modifier les contenus.",
    ],
    technologies: ["Next.js", "Directus", "SSR", "TypeScript"],
  },
  {
    id: "subscrivo",
    title: "Subscrivo",
    description: "App pour gérer ses abonnements.",
    image: "/project-subscrivo.png",
    imageAlt: "Aperçu de Subscrivo, gestion des abonnements.",
    url: "https://subscrivo.netlify.app/",
    useCase:
      "Subscrivo est une application pour centraliser et gérer ses abonnements (streaming, services, etc.) : suivi des échéances, rappels, vue d’ensemble des dépenses récurrentes.",
    whatIDid: [
      "Conception et développement de l’application (liste des abonnements, échéances, rappels).",
      "Interface pour ajouter, modifier et suivre les abonnements.",
      "Vue d’ensemble des coûts et des prochaines échéances.",
    ],
    howIWorked: [
      "Product building : définition des fonctionnalités, priorisation, itérations.",
      "Focus sur la simplicité et la clarté pour l’utilisateur.",
    ],
    accomplishments: [
      "Application opérationnelle pour le suivi des abonnements.",
      "Expérience utilisateur fluide pour garder la main sur ses dépenses récurrentes.",
    ],
    technologies: ["Next.js", "React", "TypeScript"],
  },
  {
    id: "serpenter",
    title: "Serpenter",
    description: "SaaS d'audit SEO et technique.",
    image: "/project-serpenter.png",
    imageAlt: "Aperçu de Serpenter, outil d’audit SEO.",
    url: "http://serpenter.eu/",
    useCase:
      "Serpenter est une plateforme d’audit SEO et technique pour agences et consultants : checklists (SEO, Performance, Sécurité, Accessibilité), audit automatique (Core Web Vitals, meta, headers), et option Premium avec IA pour pré-remplir les audits et générer des rapports détaillés.",
    whatIDid: [
      "Architecture et développement de la plateforme (workspaces, audits, checklists).",
      "Intégration PageSpeed Insights et automatisation des vérifications techniques.",
      "Intégration IA (Premium) pour analyse et pré-remplissage des audits.",
      "Guides techniques intégrés et export (CSV, PDF).",
    ],
    howIWorked: [
      "Conception orientée agences : collaboration, rôles, suivi de progression.",
      "Priorisation SEO / performance / accessibilité selon les retours métier.",
      "Itérations sur les checklists et les critères d’audit.",
    ],
    accomplishments: [
      "Plus de 100 points d’audit structurés en 4 catégories.",
      "Réduction du temps d’audit (automatisation + IA).",
      "Workspaces partagés et collaboration temps réel.",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "PageSpeed Insights API",
      "OpenAI",
      "Firebase",
      "Base de données (audits, workspaces)",
    ],
  },
  {
    id: "bobitheque",
    title: "Bobithèque",
    description: "App pour découvrir des films au hasard et garder une liste à voir.",
    image: "/project-bobitheque.png",
    imageAlt: "Aperçu de Bobithèque, films et plateformes.",
    url: "https://bobitheque.com/",
    isMobileApp: true,
    useCase:
      "La Bobithèque permet de découvrir des films aléatoires, de constituer une liste « à voir » et d’accéder aux liens vers les plateformes (streaming, VOD) pour regarder les films.",
    whatIDid: [
      "Conception et développement de l’application (recherche, aléatoire, liste à voir).",
      "Intégration d’une base de films et des liens vers les plateformes.",
      "Design et UX pour une découverte simple et ludique.",
    ],
    howIWorked: [
      "Product building from scratch : idée, fonctionnalités, priorisation.",
      "Itérations sur les parcours (tirage aléatoire, sauvegarde, filtres).",
    ],
    accomplishments: [
      "Site en production avec tirage aléatoire et liste « à voir ».",
      "Liens directs vers les plateformes pour faciliter le visionnage.",
    ],
    technologies: ["Next.js", "React", "TypeScript", "IMDb", "API films / plateformes"],
  },
  {
    id: "arnaud",
    title: "Arnaud Ban",
    description: "Portfolio d'un réalisateur et monteur vidéo.",
    image: "/project-arnaud.png",
    imageAlt: "Aperçu du site Arnaud Ban.",
    url: "https://arnaudban.fr/",
    useCase:
      "Portfolio du réalisateur et monteur vidéo Arnaud Ban à Avignon : présentation des films, de la démarche artistique et des coordonnées pour les professionnels.",
    whatIDid: [
      "Conception et développement du site en Next.js (SSR) pour la performance et le SEO.",
      "Design sobre centré sur les visuels et les films.",
      "Mise en place des pages (accueil, films, à propos, contact) et formulaire.",
    ],
    howIWorked: [
      "Échanges avec Arnaud pour cadrer les objectifs et le contenu.",
      "Maquettes puis développement, avec focus sur la mise en avant des œuvres.",
    ],
    accomplishments: [
      "Site en ligne, rapide et bien référencé.",
      "Navigation claire et expérience adaptée aux professionnels du secteur.",
    ],
    technologies: ["Next.js", "React", "TypeScript", "SSR"],
  },
  {
    id: "pavat",
    title: "Pavat",
    description: "Jeu de puzzle stratégique, bientôt sur les stores.",
    image: "/project-pavat.png",
    imageAlt: "Aperçu du puzzle game Pavat.",
    url: "https://pavat-game.web.app/",
    isMobileApp: true,
    useCase:
      "Pavat est un jeu de puzzle stratégique en cours de développement, prévu pour une sortie sur les stores (web déjà disponible). Le gameplay repose sur des mécaniques de réflexion et de planification.",
    whatIDid: [
      "Conception et développement du jeu (mécaniques, niveaux, UI).",
      "Version web (démo) et préparation pour les stores (PWA / app).",
      "Design des écrans, du feedback joueur et de la progression.",
    ],
    howIWorked: [
      "Game design itératif : prototypage, tests, ajustement des niveaux.",
      "Priorité à l’équilibrage et à l’expérience sur mobile.",
    ],
    accomplishments: [
      "Démo jouable en ligne (Pavat Game).",
      "Base technique et contenu prêts pour la publication sur les stores.",
    ],
    technologies: ["Next.js", "HTML", "CSS", "JavaScript", "Capacitor", "PWA"],
  },
  {
    id: "archeode",
    title: "Archéode",
    description:
      "Récits de campagnes de JDR sur l'univers The Elder Scrolls Online.",
    image: "/project-archeode.png",
    imageAlt: "Aperçu du site Archéode, récits de campagnes JDR sur TESO.",
    url: "https://archeode.fr/",
    useCase:
      "Archéode est un site de récits et chroniques de campagnes de jeu de rôle sur l’univers du MMO The Elder Scrolls Online. Il sert de journal de bord et de vitrine pour partager les aventures avec la communauté.",
    whatIDid: [
      "Choix et mise en place de Ghost comme CMS (édition, publication, SEO).",
      "Thème personnalisé pour mettre en avant les articles et l’univers TESO.",
      "Configuration hébergement, domaine et flux RSS.",
      "Participation à l'animation d'une communauté Discord de plus de 100 joueurs.",
    ],
    howIWorked: [
      "On faisait une session RP tous les jeudis soir et je m'occupais de l'animation de la session.",
      "Je prenais les screenshots pendant la partie, puis je rédigeais et postais le résumé en article avec les images sur le site.",
      "Tout un process rédactionnel, de la session au billet publié.",
    ],
    accomplishments: [
      "Site opérationnel avec publication régulière des campagnes.",
      "Design cohérent avec l’univers et bonne expérience lecture.",
    ],
    technologies: ["Ghost", "Discord", "HTML/CSS/JS", "Hébergement"],
  },
  {
    id: "prehistopia",
    title: "Préhistopia",
    description: "City builder : un village au néolithique.",
    image: "/project-prehistopia.png",
    imageAlt: "Aperçu de Préhistopia, simulation de village au néolithique.",
    url: "https://prehistopia.vercel.app/",
    useCase:
      "Préhistopia est un jeu de simulation et city building dans lequel le joueur gère un village au néolithique : ressources, bâtiments, population. Une démo est disponible en ligne.",
    whatIDid: [
      "Conception et développement du jeu (économie, bâtiments, ressources).",
      "Boucle de gameplay (récolte, construction, progression) et interface.",
      "Déploiement de la démo (Vercel) et préparation d’évolutions.",
    ],
    howIWorked: [
      "Game design et équilibrage des ressources et des coûts.",
      "Itérations sur l’UX et la clarté des mécaniques pour le joueur.",
    ],
    accomplishments: [
      "Démo jouable en ligne (Préhistopia).",
      "Base solide pour enrichir le contenu et les mécaniques.",
    ],
    technologies: ["Next.js / React", "TypeScript", "Vercel", "Game logic"],
  },
  {
    id: "randex",
    title: "Randex",
    description: "Mon jeu de société : prototype jouable en ligne.",
    image: "/project-randex.png",
    imageAlt: "Aperçu de Randex, prototype de jeu de société.",
    url: "https://randex-boardgame.netlify.app/",
    useCase:
      "Randex est mon propre jeu de société. J'ai prototypé un MVP jouable en ligne pour tester les mécaniques, les règles et l'expérience de jeu, puis itéré pour développer les features et rééquilibrer. Je m'en sers pour éditer et publier mon jeu en version physique.",
    whatIDid: [
      "Conception du jeu et prototypage d'un MVP avec Gemini Pro.",
      "Développement du prototype en ligne (règles, plateau, interactions).",
      "Itérations pour ajouter des features et rééquilibrer le jeu.",
    ],
    howIWorked: [
      "J'ai d'abord prototypé un MVP sur Gemini Pro pour valider le concept et les règles.",
      "Ensuite j'ai itéré en développant les features et en rééquilibrant selon les retours.",
      "Je suis en train de me servir de ce prototype pour éditer mon propre jeu de société en version physique.",
    ],
    accomplishments: [
      "MVP jouable en ligne, itéré et rééquilibré.",
      "Process en cours pour l'édition physique de mon jeu.",
    ],
    technologies: ["Next.js / React", "TypeScript", "Gemini", "Game logic"],
  },
  {
    id: "apasnap",
    title: "Apasnap",
    description: "App pour retrouver les photos de sa course.",
    image: "/project-apasnap.png",
    imageAlt: "Aperçu d’Apasnap, photos de course running.",
    url: "https://apasnap.netlify.app/",
    isMobileApp: true,
    useCase:
      "Apasnap permet aux participants d’une course running (organisée par une association) de consulter et retrouver les photos prises pendant l’événement : recherche par dossard, par course, galerie.",
    whatIDid: [
      "Conception et développement de l’application (galerie, recherche, affichage des photos).",
      "Interface pour parcourir les photos par course et par participant.",
      "Mise en ligne et déploiement pour l’association.",
    ],
    howIWorked: [
      "Échanges avec l’association pour cadrer les besoins (par course, par dossard, etc.).",
      "Itérations sur l’UX pour faciliter la recherche des photos.",
    ],
    accomplishments: [
      "Application en ligne pour consulter les photos des courses.",
      "Expérience fluide pour les coureurs qui retrouvent leurs clichés.",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Netlify"],
  },
  {
    id: "brice",
    title: "Brice Théâte",
    description: "Portfolio d'un scénariste.",
    image: "/project-brice.png",
    imageAlt: "Aperçu du site Brice Théâte.",
    url: "https://bricetheate.fr/",
    useCase:
      "Site vitrine du scénariste Brice Théâte : présentation des projets, des collaborations et des coordonnées pour les professionnels de l’audiovisuel et du cinéma.",
    whatIDid: [
      "Conception et développement du site (structure, pages, contenu).",
      "Design aligné avec l’univers du scénariste et mise en avant des projets.",
      "SEO et accessibilité.",
    ],
    howIWorked: [
      "Échanges avec Brice pour définir les messages et les pages.",
      "Maquettes puis développement, avec focus sur la clarté et la crédibilité.",
    ],
    accomplishments: [
      "Site en ligne avec présentation claire des projets et contact.",
      "Vitrine professionnelle adaptée au secteur du scénario.",
    ],
    technologies: ["Next.js", "React", "TypeScript"],
  },
];

/** Liste pour la grille (cartes) : mêmes données, utilisée pour la page liste et pour récupérer un projet par slug. */
export const projectsList: ProjectItem[] = projectsDetail.map(
  (p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    image: p.image,
    imageAlt: p.imageAlt,
    url: p.url,
    isMobileApp: p.isMobileApp,
  })
);

export function getProjectBySlug(slug: string): ProjectDetail | undefined {
  return projectsDetail.find((p) => p.id === slug);
}

export function getProjectSlugs(): string[] {
  return projectsDetail.map((p) => p.id);
}
