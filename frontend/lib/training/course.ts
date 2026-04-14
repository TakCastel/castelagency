/**
 * Parcours "Guide pratique IA" : métadonnées alignées sur les chapitres dans docs/training/chapitres.
 */

export type TrainingChapterMeta = {
  slug: string;
  number: number;
  title: string;
  durationLabel: string;
  /** Court texte affiché sur la carte du hub (aperçu du contenu). */
  cardDescription: string;
  /** Détail complémentaire affiché sur la carte du hub. */
  cardDetails: string;
};

export const TRAINING_CHAPTERS: TrainingChapterMeta[] = [
  {
    slug: "01-introduction",
    number: 1,
    title: "Introduction : repères, vocabulaire et cadre",
    durationLabel: "~30 min",
    cardDescription:
      "Comprendre les bases : IA, LLM, IDE, cas d’usage, limites des outils et fil conducteur du parcours.",
    cardDetails:
      "Ce chapitre pose le vocabulaire de départ, montre où l’IA intervient vraiment dans un flux web et donne les repères utiles pour lire la suite sans se perdre dans le jargon.",
  },
  {
    slug: "02-securite-ia",
    number: 2,
    title: "Sécurité et données avec l’IA",
    durationLabel: "~1 h 10",
    cardDescription:
      "Éviter les erreurs coûteuses : secrets, données sensibles, RGPD, règles de prudence et cas d’usage à éviter.",
    cardDetails:
      "Vous y verrez quoi partager ou non avec un assistant, comment traiter les clés et fichiers sensibles, et pourquoi ce chapitre arrive très tôt dans le parcours.",
  },
  {
    slug: "03-assistants-code-ide",
    number: 3,
    title: "Développement assisté par IA dans l’IDE",
    durationLabel: "~1 h 35",
    cardDescription:
      "Travailler avec Cursor, Copilot ou Claude Code : cadrage, consigne, relecture du diff et tests.",
    cardDetails:
      "L’objectif est d’installer une routine réaliste de travail avec l’IA dans l’éditeur, du ticket ou brief initial jusqu’à la vérification du résultat.",
  },
  {
    slug: "04-prompter-agents-markdown",
    number: 4,
    title: "Prompts, agents et Markdown",
    durationLabel: "~1 h",
    cardDescription:
      "Rédiger des consignes plus utiles et structurer la documentation Markdown qui aide vraiment les assistants.",
    cardDetails:
      "Le chapitre explique comment mieux cadrer un assistant et comment organiser des fichiers Markdown réutilisables pour éviter de répéter les mêmes consignes.",
  },
  {
    slug: "05-bmad-method",
    number: 5,
    title: "BMAD-METHOD et cadrage agile",
    durationLabel: "~1 h 20",
    cardDescription:
      "Structurer backlog, stories, critères d’acceptation et livraison avec une méthode compatible IA.",
    cardDetails:
      "Vous y trouverez une manière de cadrer le travail produit de façon plus nette, avec des livrables vérifiables et des attentes plus claires pour l’équipe comme pour l’assistant.",
  },
  {
    slug: "06-produit-ia-apis",
    number: 6,
    title: "Produit augmenté par l’IA : chat, APIs, intégration",
    durationLabel: "~1 h 20",
    cardDescription:
      "Comprendre l’intégration produit : appels API, flux serveur, coûts, clés et points de vigilance techniques.",
    cardDetails:
      "Ce chapitre relie la théorie au produit réel : où placer les appels modèle, pourquoi passer par le serveur et quels compromis surveiller côté coût, sécurité et expérience utilisateur.",
  },
  {
    slug: "07-geo",
    number: 7,
    title: "GEO : visibilité dans les réponses IA",
    durationLabel: "~1 h",
    cardDescription:
      "Rendre vos contenus plus visibles dans les synthèses générées, en complément du SEO classique.",
    cardDetails:
      "Il montre comment rendre un contenu plus clair, plus fiable et plus facile à reprendre dans des réponses générées, sans remplacer les fondamentaux du SEO.",
  },
  {
    slug: "08-travaux-pratiques",
    number: 8,
    title: "Travaux pratiques guidés",
    durationLabel: "~2 h 50",
    cardDescription:
      "Appliquer le parcours sur des cas concrets avec des exercices progressifs proches de situations réelles.",
    cardDetails:
      "Les exercices permettent de passer de la compréhension à l’action, avec des livrables concrets et des points de contrôle pour vous auto-évaluer.",
  },
  {
    slug: "09-synthese",
    number: 9,
    title: "Synthèse du parcours",
    durationLabel: "~25 min",
    cardDescription:
      "Relier les notions vues dans le parcours et retenir les idées clés avant l’auto-évaluation.",
    cardDetails:
      "C’est le moment de reprendre les grands liens entre sécurité, assistants, cadrage, intégration produit et visibilité avant de clôturer la lecture.",
  },
  {
    slug: "10-evaluation",
    number: 10,
    title: "Auto-évaluation et suites possibles",
    durationLabel: "~15 min",
    cardDescription:
      "Faire le point sur vos acquis, identifier les prochaines étapes et les formats d’accompagnement possibles.",
    cardDetails:
      "Cette partie aide à situer votre niveau, à repérer ce qu’il reste à consolider et à choisir une suite cohérente selon votre contexte.",
  },
  {
    slug: "11-banque-qcm",
    number: 11,
    title: "Banque de QCM",
    durationLabel: "~35 min",
    cardDescription:
      "Vérifier vos acquis avec 32 questions classées par thème, accompagnées de leurs corrigés.",
    cardDetails:
      "Le QCM sert de support d’entraînement ou de contrôle, avec une couverture large du parcours et un accent visible sur les sujets de sécurité.",
  },
  {
    slug: "12-glossaire",
    number: 12,
    title: "Glossaire",
    durationLabel: "Référence",
    cardDescription:
      "Retrouver rapidement les définitions des termes et acronymes rencontrés dans le parcours.",
    cardDetails:
      "À garder sous la main pour relire un terme, un sigle ou une notion sans devoir remonter dans les chapitres précédents.",
  },
];

const bySlug = new Map(TRAINING_CHAPTERS.map((c) => [c.slug, c]));

export function getChapterMeta(slug: string): TrainingChapterMeta | undefined {
  return bySlug.get(slug);
}

export function getChapterSlugs(): string[] {
  return TRAINING_CHAPTERS.map((c) => c.slug);
}

export function getAdjacentChapters(slug: string): {
  prev: TrainingChapterMeta | null;
  next: TrainingChapterMeta | null;
  index: number;
} {
  const index = TRAINING_CHAPTERS.findIndex((c) => c.slug === slug);
  if (index < 0) {
    return { prev: null, next: null, index: -1 };
  }
  return {
    prev: index > 0 ? TRAINING_CHAPTERS[index - 1]! : null,
    next: index < TRAINING_CHAPTERS.length - 1 ? TRAINING_CHAPTERS[index + 1]! : null,
    index,
  };
}
