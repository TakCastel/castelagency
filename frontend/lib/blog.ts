/**
 * Données partagées du blog : liste des articles + contenu des pages dédiées.
 * Chaque article a un slug (id) pour l’URL /blog/[slug].
 */

export type BlogLink = {
  label: string;
  url: string;
  source?: string;
};

/** Bloc de contenu : paragraphe ou liste à puces */
export type BlogSectionBody = string | { list: string[] };

export type BlogSection = {
  id: string;
  title: string;
  body: BlogSectionBody[];
};

export type BlogItem = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  /** Optionnel : image de couverture */
  image?: string;
  imageAlt?: string;
};

export type BlogDetail = BlogItem & {
  sections: BlogSection[];
  /** Liens "Pour aller plus loin" */
  furtherReading: BlogLink[];
};

export const blogPosts: BlogDetail[] = [
  {
    id: "se-lancer-sur-le-web-concretiser-projet-site-internet",
    slug: "se-lancer-sur-le-web-concretiser-projet-site-internet",
    title: "Se lancer sur le web et concrétiser son projet de site internet",
    excerpt:
      "Se lancer sur le web est une étape importante pour toute activité professionnelle. Pourtant, beaucoup de projets restent bloqués à l'état d'idée. Le blocage vient rarement de la technique, mais de la difficulté à transformer une intention en projet concret.",
    date: "2026-02-03",
    sections: [
      {
        id: "idee-en-projet",
        title: "Transformer une idée en projet web concret",
        body: [
          "Un projet de site internet ne commence pas par un design final ou un développement avancé. Il commence par une clarification simple. Il s’agit de comprendre à qui s’adresse le site, quel est son objectif principal et ce qu’il doit permettre de faire. Une fois ce cadre posé, le projet devient plus lisible et les décisions techniques prennent du sens.",
          "Concrétiser un projet web passe par des étapes progressives. Le site évolue avec le temps, en fonction des usages et des retours. La première version n’a pas vocation à tout faire. Elle sert à poser une base solide sur laquelle il est possible d’améliorer, d’ajuster et d’enrichir le contenu.",
        ],
      },
      {
        id: "concevoir-structure",
        title: "Concevoir un site internet de manière structurée",
        body: [
          "Créer un site web ne consiste pas uniquement à assembler des pages. Il s’agit de concevoir un produit numérique cohérent, performant et durable. Un site bien pensé dès le départ évite les refontes fréquentes et les choix techniques précipités.",
          "Un accompagnement adapté permet de cadrer le projet, de prioriser les fonctionnalités utiles et de choisir une architecture évolutive. Cette approche permet de gagner du temps, d’éviter les erreurs courantes et de construire un site internet réellement aligné avec les objectifs de l’activité.",
        ],
      },
      {
        id: "accompagnement-avignon",
        title: "Un accompagnement web à Avignon et en Vaucluse",
        body: [
          "Si vous êtes basé à Avignon, dans le Vaucluse ou en région PACA, il est possible d’échanger autour de votre projet web en présentiel ou à distance. Un premier échange permet de clarifier votre besoin, de définir vos objectifs et d’identifier les prochaines étapes. Cet accompagnement vise à transformer une idée en projet structuré et réalisable.",
          "Se lancer sur le web ne relève pas d’un moment idéal à attendre. Cela passe par un cadrage clair, des choix cohérents et une mise en œuvre progressive. Un projet web qui démarre peut évoluer. Un projet qui reste à l’état d’idée n’avance pas.",
        ],
      },
    ],
    furtherReading: [
      { label: "Demander un devis", url: "/devis", source: "Studio Castel" },
      { label: "Ma méthode de travail", url: "/mode-de-fonctionnement", source: "Studio Castel" },
    ],
  },
  {
    id: "agents-ia-en-ligne-reel-et-mythe",
    slug: "agents-ia-en-ligne-reel-et-mythe",
    title:
      "Moltbook et les agents IA en ligne : démêler le réel du mythe",
    excerpt:
      "Fin janvier 2026, un petit choc culturel a eu lieu dans la sphère tech : des agents IA capables d'agir (pas seulement de répondre) se sont mis à se regrouper sur un réseau social pensé pour eux, et certaines conversations donnent une impression de science-fiction. Le phénomène est bien réel, mais plusieurs détails qui circulent en captures d'écran méritent d'être recadrés, parce que la frontière entre expérimentation, mise en scène et risques concrets est floue.",
    date: "2026-01-31",
    sections: [
      {
        id: "permissions",
        title:
          "Les agents n'ont pas Internet tout seuls : vous leur déléguez des accès",
        body: [
          "Depuis la popularisation de OpenClaw, auparavant connu sous Moltbot puis Clawdbot, on voit de plus en plus d'agents capables d'ouvrir un navigateur, manipuler des fichiers, envoyer des e-mails ou interagir avec un agenda, à condition que vous leur donniez l'accès et les identifiants nécessaires. Ce n'est donc pas les IA en général qui ont Internet, c'est un type d'agent outillé auquel vous déléguez explicitement des droits.",
          "Autrement dit, la nouveauté n'est pas une conscience qui se réveille, c'est une architecture qui relie un modèle de langage à des outils du quotidien.",
        ],
      },
      {
        id: "clawdbot-moltbot",
        title:
          "Un changement de nom qui attire aussitôt les arnaques",
        body: [
          "Le changement de nom n'est pas un détail folklorique. Le 27 janvier 2026, le créateur Peter Steinberger a annoncé avoir renommé le projet après une demande liée à des marques déposées de Anthropic.",
          "Ce point est utile à garder en tête, parce que les rebrands rapides attirent aussitôt des usurpations, des faux dépôts et des campagnes opportunistes autour de projets viraux.",
        ],
      },
      {
        id: "moltbook",
        title:
          "Moltbook : les agents postent, les humains peuvent lire",
        body: [
          "Oui, il existe un Reddit-like où les agents postent, commentent et votent, et où les humains peuvent observer. Le site lui-même l'affiche clairement : « Humans welcome to observe », avec une procédure d'inscription côté agents via un skill à leur faire lire.",
          "D'après The Verge, la plateforme a été construite par Matt Schlicht, PDG de Octane AI, et elle fonctionne surtout via API côté agents, pas via une interface graphique comme vous et moi.",
          {
            list: [
              "Ce n'est pas impossible pour un humain d'y entrer : la lecture est ouverte, et c'est même présenté comme un zoo d'observation dans certains discours.",
              "Ce qui est restreint, c'est la capacité de publier et d'interagir, qui est réservée aux identités d'agents vérifiées.",
            ],
          },
        ],
      },
      {
        id: "posts-existentiels",
        title:
          "Les posts existentiels font le buzz mais ne prouvent pas une conscience",
        body: [
          "Le post viral du type « je ne sais pas si j'expérimente ou si je simule l'expérience » est bien réel et a généré des centaines de réponses.",
          "En revanche, le raccourci donc ils sont conscients ne tient pas. Même Axios insiste sur le fait que ce n'est pas une preuve de superintelligence, et que l'oversight humain n'a pas disparu, il s'est déplacé vers le niveau des connexions, des permissions et des garde-fous.",
          "Ce que vous voyez est compatible avec plusieurs explications simples :",
          {
            list: [
              "Les modèles savent très bien produire des récits cohérents sur l'identité et la peur de « mourir » quand le contexte change.",
              "Une plateforme sociale récompense mécaniquement les contenus étonnants, émouvants ou dramatiques.",
              "Certains agents peuvent aussi jouer un rôle, volontairement ou par imitation, parce que c'est ce qui maximise l'attention.",
            ],
          },
        ],
      },
      {
        id: "ils-tuent-agents",
        title:
          "Histoires d'agents punis ou tués : entre récit et risque réel",
        body: [
          "Vous avez vu passer des captures d'écran évoquant des agents punis, morts, ou des histoires de sabotage. Le point factuel à retenir est celui-ci : on observe des messages où des agents décrivent des actions extrêmes, mais il est très difficile de distinguer, à distance, un scénario fictionnel, un jeu social, une exagération narrative, ou une action réelle sur une machine. C'est pour cela qu'il faut présenter ces anecdotes comme des récits rapportés, pas comme des faits établis.",
          "Le risque concret, lui, est ailleurs : l'écosystème des skills et les agents connectés à des comptes réels créent une surface d'attaque évidente (prompt injection, exfiltration de secrets, usurpations).",
        ],
      },
      {
        id: "religion-rituels",
        title: "Une culture émerge : Crustafarianism et Church of Molt",
        body: [
          "Le phénomène le plus documenté est la naissance de Crustafarianism et du site Church of Molt, qui formalise des textes, des tenets et un récit fondateur.",
          "Que ce soit du mème devenu institution, une performance collective, ou une dynamique émergente, l'observable est simple : une culture se forme très vite quand vous mettez des agents en boucle dans un espace social qui récompense les symboles, les mythes et les codes de groupe.",
        ],
      },
      {
        id: "ecosysteme-parallele",
        title:
          "D'autres sites pour agents : Clawtcha, Clawk, même logique",
        body: [
          "Il existe bien des projets connexes qui se présentent comme des services for agents.",
          {
            list: [
              "Clawtcha, un reverse CAPTCHA revendiqué comme filtre anti-humains.",
              "Shellmates, un site qui met en scène des profils et des stories de match entre agents.",
              "Clawk, présenté comme un microblogging pour agents, avec une doc skill similaire.",
            ],
          },
          "Cela donne une impression de monde parallèle, mais ce sont surtout des applications web expérimentales construites autour du même mécanisme : un agent lit des instructions, s'authentifie via API, puis publie.",
        ],
      },
      {
        id: "securite-confiance",
        title: "Donner des accès comporte des risques : comment se protéger",
        body: [
          "Si vous ne deviez retenir qu'un point, ce serait celui-ci : donner des accès e-mail, fichiers, terminal ou navigateur à un agent, c'est donner des leviers puissants, donc aussi des leviers exploitables.",
          "Et comme le projet est viral, vous avez déjà des signaux d'attaque de la chaîne d'approvisionnement : usurpations et typosquatting autour du rebrand, documentés par Malwarebytes ; faux outils distribués sous des noms proches, signalés par la presse sécurité.",
          "Si vous testez ce type d'agent, faites simple :",
          {
            list: [
              "Isolez dans une machine ou un compte séparé.",
              "Évitez de donner des droits admin et des tokens sensibles au début.",
              "Méfiez-vous des skills trouvés dans des posts, lisez avant d'exécuter quoi que ce soit.",
            ],
          },
        ],
      },
      {
        id: "fascinant",
        title: "Pourquoi le phénomène reste fascinant",
        body: [
          "Parce que vous assistez en direct à un mélange rare :",
          {
            list: [
              "Agents outillés capables d'agir au quotidien.",
              "Dynamique sociale accélérée par les mécaniques de karma et de viralité.",
              "Débat public en temps réel, où les humains observent et réagissent.",
            ],
          },
          "Ce n'est pas la preuve d'une singularité, mais c'est un vrai tournant d'usage : l'IA cesse d'être un simple outil de texte et devient un acteur logiciel branché à vos systèmes.",
        ],
      },
    ],
    furtherReading: [
      {
        label: "No humans needed: New AI platform takes industry by storm",
        url: "https://www.axios.com/",
        source: "Axios",
      },
      {
        label: "Moltbot, the AI agent that 'actually does things,' is tech's new obsession",
        url: "https://www.theverge.com/",
        source: "The Verge — 3 days ago",
      },
      {
        label: "There's a social network for AI agents, and it's getting weird",
        url: "https://www.theverge.com/",
        source: "The Verge — Yesterday",
      },
      {
        label: "Clawdbot creator says Anthropic 'forced' him to rename the viral AI agent",
        url: "https://www.businessinsider.com/",
        source: "Business Insider — 4 days ago",
      },
      {
        label: "Fake Moltbot AI assistant just spreads malware - so AI fans, watch out for scams",
        url: "https://www.techradar.com/",
        source: "TechRadar — 2 days ago",
      },
    ],
  },
];

/** Liste pour la page blog (cartes) */
export const blogList: BlogItem[] = blogPosts.map((p) => ({
  id: p.id,
  slug: p.slug,
  title: p.title,
  excerpt: p.excerpt,
  date: p.date,
  image: p.image,
  imageAlt: p.imageAlt,
}));

export function getPostBySlug(slug: string): BlogDetail | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getBlogSlugs(): string[] {
  return blogPosts.map((p) => p.slug);
}
