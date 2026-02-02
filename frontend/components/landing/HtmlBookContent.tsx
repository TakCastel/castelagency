"use client";

import { useMemo } from "react";

/**
 * Affiche le contenu HTML du récit (WYSIWYG) avec les styles prose.
 * Le contenu provient du fichier .html édité via l’éditeur riche.
 */
type HtmlBookContentProps = { html: string };

/** Chaque personnage a une couleur de dialogue dédiée (ordre = priorité de remplacement). */
const DIALOGUE_PERSONNAGES: [string, string][] = [
  ["Madaea", "dialogue-madaea"],
  ["Theos", "dialogue-theos"],
  ["Kheym", "dialogue-theos"],
  ["Dracuse", "dialogue-dracuse"],
  ["Corlion", "dialogue-corlion"],
  ["Elhsya", "dialogue-elhsya"],
  ["Ayshel", "dialogue-ayshel"],
  ["Yara", "dialogue-yara"],
  ["Saiyara", "dialogue-saiyara"],
  ["Voyante", "dialogue-voyante"],
];

/** Attribue la couleur du dialogue au personnage quand le narrateur l’indique après « ... » */
function attributeDialogueByContext(html: string): string {
  let out = html;
  const maxContext = 120;

  // Kheym : dialogue juste après "s'échappèrent de sa bouche" (c'est lui qui parle)
  out = out.replace(
    new RegExp(
      "(s'échappèrent de sa bouche[\\s\\S]{0,150}?)«<span class=\"dialogue-inline\">([^<]*)</span>»",
      "g"
    ),
    "$1«<span class=\"dialogue-theos\">$2</span>»"
  );
  // Kheym : « Le fournisseur de café a changé ? » (explicite, au cas où apostrophe en &#39;)
  out = out.replace(
    new RegExp(
      "«<span class=\"dialogue-inline\">([^<]*Le fournisseur de café a changé[^<]*)</span>»",
      "g"
    ),
    "«<span class=\"dialogue-theos\">$1</span>»"
  );

  // Madaea : réplique « Les filles dorment encore. »
  out = out.replace(
    new RegExp(
      "«<span class=\"dialogue-inline\">([^<]*Les filles dorment encore[^<]*)</span>»",
      "g"
    ),
    "«<span class=\"dialogue-madaea\">$1</span>»"
  );

  // Hommes d'affaire / autres (questions à Kheym) → bleu, pas vert
  out = out.replace(
    new RegExp(
      "«<span class=\"dialogue-inline\">([^<]*Alors, monsieur Kheym, comment se porte votre famille[^<]*)</span>»",
      "g"
    ),
    "«<span class=\"dialogue-autre\">$1</span>»"
  );
  out = out.replace(
    new RegExp(
      "«<span class=\"dialogue-inline\">([^<]*Avez-vous réfléchi à notre proposition[^<]*)</span>»",
      "g"
    ),
    "«<span class=\"dialogue-autre\">$1</span>»"
  );

  // Médecin → cyan : « Monsieur et madame Kheym ? », « Bien, je ne vais pas passer par quatre chemins... », « ...profondeurs de son esprit ou de ses muscles. »
  out = out.replace(
    new RegExp(
      "«<span class=\"dialogue-inline\">([^<]*Monsieur et madame Kheym[^<]*)</span>»",
      "g"
    ),
    "«<span class=\"dialogue-medecin\">$1</span>»"
  );
  // Médecin : discours sur deux paragraphes (contenu peut contenir </p><p>) → [\s\S]*?
  out = out.replace(
    new RegExp(
      "«<span class=\"dialogue-inline\">([\\s\\S]*?Je ne vais pas passer par quatre chemins[\\s\\S]*?)</span>»",
      "g"
    ),
    "«<span class=\"dialogue-medecin\">$1</span>»"
  );
  out = out.replace(
    new RegExp(
      "«<span class=\"dialogue-inline\">([\\s\\S]*?profondeurs de son esprit ou de ses muscles[\\s\\S]*?)</span>»",
      "g"
    ),
    "«<span class=\"dialogue-medecin\">$1</span>»"
  );
  out = out.replace(
    new RegExp(
      "«<span class=\"dialogue-inline\">([^<]*poursuivit le médecin[^<]*)</span>»",
      "g"
    ),
    "«<span class=\"dialogue-medecin\">$1</span>»"
  );
  // Incise narrative dans le dialogue du médecin : « poursuivit le médecin, » → blanc
  out = out.replace(
    new RegExp(
      "«<span class=\"dialogue-medecin\">([\\s\\S]*?) poursuivit le médecin, ([\\s\\S]*?)</span>»",
      "g"
    ),
    "«<span class=\"dialogue-medecin\">$1 </span><span class=\"dialogue-incise\">poursuivit le médecin, </span><span class=\"dialogue-medecin\">$2</span>»"
  );
  out = out.replace(
    new RegExp(
      "«<span class=\"dialogue-inline\">([^<]*Nous préconisons sa mise sous tutelle[^<]*)</span>»",
      "g"
    ),
    "«<span class=\"dialogue-medecin\">$1</span>»"
  );

  // Voyante (La Mystique) — violet
  out = out.replace(
    new RegExp(
      "«<span class=\"dialogue-inline\">([^<]*Votre fille n[^<]*pas comme les autres[^<]*)</span>»",
      "g"
    ),
    "«<span class=\"dialogue-voyante\">$1</span>»"
  );
  // Voyante : dialogue jusqu'à la fermeture des guillemets (peut contenir </p><p>)
  out = out.replace(
    new RegExp(
      "«<span class=\"dialogue-inline\">([\\s\\S]*?Vous, vous êtes différent[\\s\\S]*?)</span>»",
      "g"
    ),
    "«<span class=\"dialogue-voyante\">$1</span>»"
  );
  // Voyante : dialogue jusqu'à la fermeture (peut contenir </p><p>)
  out = out.replace(
    new RegExp(
      "«<span class=\"dialogue-inline\">([\\s\\S]*?Vous allez la voir mourir[\\s\\S]*?)</span>»",
      "g"
    ),
    "«<span class=\"dialogue-voyante\">$1</span>»"
  );
  out = out.replace(
    new RegExp(
      "«<span class=\"dialogue-inline\">([\\s\\S]*?Ne vous y attachez pas trop[\\s\\S]*?)</span>»",
      "g"
    ),
    "«<span class=\"dialogue-voyante\">$1</span>»"
  );

  // Ayshel — « Tu crois que c'est le Un qui fait bouger Elshya comme ça ? » (la fille, pas la mère)
  out = out.replace(
    new RegExp(
      "«<span class=\"dialogue-inline\">([^<]*Tu crois que c'est le Un qui fait bouger Elshya[^<]*)</span>»",
      "g"
    ),
    "«<span class=\"dialogue-ayshel\">$1</span>»"
  );

  // Elhsya — cri « En, en'pouveh… » (fille malade)
  out = out.replace(
    new RegExp(
      "«<span class=\"dialogue-inline\">([^<]*En, en[^<]*pouveh[^<]*)</span>»",
      "g"
    ),
    "«<span class=\"dialogue-elhsya\">$1</span>»"
  );

  // Vieil homme / juge / autre (avant Dracuse pour que "Commis Kheym, combien..." soit autre)
  out = out.replace(
    new RegExp(
      "«<span class=\"dialogue-inline\">([^<]*L'avez-vous[^<]*)</span>»",
      "g"
    ),
    "«<span class=\"dialogue-autre\">$1</span>»"
  );
  out = out.replace(
    new RegExp(
      "«<span class=\"dialogue-inline\">([^<]*Combien y en a-t-il[^<]*)</span>»",
      "g"
    ),
    "«<span class=\"dialogue-autre\">$1</span>»"
  );
  out = out.replace(
    new RegExp(
      "«<span class=\"dialogue-inline\">([^<]*Commis Kheym, combien en avez-vous trouvé[^<]*)</span>»",
      "g"
    ),
    "«<span class=\"dialogue-autre\">$1</span>»"
  );
  out = out.replace(
    new RegExp(
      "«<span class=\"dialogue-inline\">([^<]*Vous ne pouvez pas vous détourner de votre Destin[^<]*)</span>»",
      "g"
    ),
    "«<span class=\"dialogue-autre\">$1</span>»"
  );
  out = out.replace(
    new RegExp(
      "«<span class=\"dialogue-inline\">([^<]*Adjugé[^<]*)</span>»",
      "g"
    ),
    "«<span class=\"dialogue-autre\">$1</span>»"
  );
  out = out.replace(
    new RegExp(
      "«<span class=\"dialogue-inline\">([^<]*Vous n'avez rien vu[^<]*)</span>»",
      "g"
    ),
    "«<span class=\"dialogue-autre\">$1</span>»"
  );
  out = out.replace(
    new RegExp(
      "«<span class=\"dialogue-inline\">([^<]*Tu seras l'épée du Un[^<]*)</span>»",
      "g"
    ),
    "«<span class=\"dialogue-autre\">$1</span>»"
  );
  out = out.replace(
    new RegExp(
      "«<span class=\"dialogue-inline\">([^<]*Une carabine ou une épée[^<]*)</span>»",
      "g"
    ),
    "«<span class=\"dialogue-autre\">$1</span>»"
  );

  // Dracuse — dialogues explicites (couleur sombre)
  const dracusePhrases = [
    "J'ai contacté notre indic",
    "Si la Mesure est compromise",
    "Cela pourrait être les deux",
    "Monsieur Corlion, ravi",
    "Monsieur Corlion, je vous remercie",
    "Il ne s'agit pas de cela",
    "Vous me semblez bien catégorique",
    "Tu en verras d'autres",
    "Il a peut-être raison finalement",
    "Ce n'est pas cela",
    "Oui, c'est une personne",
    "C'est parfaitement cela",
    "Et laquelle",
    "Je ne sais pas encore",
    "C'est elle !",
    "Ma chère, je vous présente",
    "Ne referme pas cette porte",
    "Les Persécuteurs, Theos",
    "Ils ont encore tué",
  ];
  for (const phrase of dracusePhrases) {
    const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    out = out.replace(
      new RegExp(
        `«<span class="dialogue-inline">([^<]*${escaped}[^<]*)</span>»`,
        "g"
      ),
      "«<span class=\"dialogue-dracuse\">$1</span>»"
    );
  }

  // Corlion — prédicateur (or/ambre)
  const corlionPhrases = [
    "Messieurs Dracuse et Kheym",
    "Si vous voulez bien me suivre",
    "Si j'étais vous, j'éviterais",
    "Monsieur Dracuse, lui répondit",
    "Ma parole, s'indigna le prédicateur",
    "C'est parce que nous avions",
    "Bien sûr que non",
    "Le procès a déjà eut lieu",
    "D'ailleurs, poursuivit Corlion",
    "Je ne répondrais pas",
    "N'importe quoi",
    "Assez ! je vais vous demander de partir",
    "Parfois, il faut savoir faire des sacrifices",
  ];
  for (const phrase of corlionPhrases) {
    const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    out = out.replace(
      new RegExp(
        `«<span class="dialogue-inline">([^<]*${escaped}[^<]*)</span>»`,
        "g"
      ),
      "«<span class=\"dialogue-corlion\">$1</span>»"
    );
  }

  // Kheym/Theos — répliques spécifiques pour éviter d'être écrasées par Dracuse/Corlion
  const kheymSpecificPhrases = [
    "Il n'a rien à faire là",
    "Il n'en existe pas",
    "La victime était un archiviste",
    "Je vous en prie, ne faites pas de déduction",
    "Il nous faut interroger Corlion",
    "Ne restons pas là",
    "C'est une Fable !",
    "Le mal \\?",
    "Avait-il dénaturé",
    "Avez-vous cherché à mettre un terme",
    "Avez-vous cherché à mettre fin",
    "Dites-moi, ce vase Hredonien",
    "C'est tout ce que j'avais besoin d'entendre",
    "Qu'est ce que tu fais là, Dracuse",
    "Tu te paies ma tête",
    "Cet homme, le Vicomte Corlion",
    "Celui-ci est pire",
    "Ah oui \\? Cela nous ressemble-t-il",
    "Tu as peur que l'on nous observe",
    "Tu veux me présenter quelqu'un",
    "Reprenons depuis le début",
    "Nous n'avons qu'à suivre une autre piste",
    "C'est elle \\?",
    "Yara, quelle belle surprise",
    "Toujours aussi polie",
    "De toutes les vipères",
    "Comment le pourrais-je",
    "Je ne suis que l'outil du Un",
    "Maintenant Yara tu vas être gentille",
    "Me\\.\\.\\. Tuer \\?",
    "Dracuse\\.",
    "Si ce n'est pas moi qui me charge",
    "Bien que je sois le seul à pouvoir",
    "La prochaine fois qu'ils m'enverront",
    "Je pense que nous en resterons là",
    "Je comprends\\. Lui répondit-il",
    "Je vous écoute",
    "Non messieurs, nous",
    "Monsieur Dracuse",
  ];
  for (const phrase of kheymSpecificPhrases) {
    out = out.replace(
      new RegExp(
        `«<span class="dialogue-inline">([^<]*${phrase}[^<]*)</span>»`,
        "g"
      ),
      "«<span class=\"dialogue-theos\">$1</span>»"
    );
  }

  // Saiyara/Yara — Conjuratrice (magenta)
  const saiYaraPhrases = [
    "Pas un geste, monsieur Kheym",
    "Mettez vos mains en évidence",
    "Ne m'appelle plus comme ça",
    "Pour s'adresser à un homme",
    "Ne rend pas les choses plus difficile",
    "Tu n'avais qu'un seul job",
    "Tu ne saisis toujours pas",
    "Te tuer, toi",
    "Le Concile m'envoie",
    "La prochaine fois qu'ils m'enverront, ce sera peut-être pour te tuer",
    "Dracuse n'aura jamais une telle affaire",
    "Bien que tu sois le seul à pouvoir être aussi facilement utilisé",
    "Tu viens de chier partout dans le lit",
    "Qu'est ce que vous faites là",
    "C'est mon bureau",
    "Quel collègue",
    "Ça n'a pas d'importance",
    "Je vous laisse avec votre bureau",
  ];
  for (const phrase of saiYaraPhrases) {
    const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    out = out.replace(
      new RegExp(
        `«<span class="dialogue-inline">([^<]*${escaped}[^<]*)</span>»`,
        "g"
      ),
      "«<span class=\"dialogue-saiyara\">$1</span>»"
    );
  }

  // Qui êtes-vous ? = Kheym (il pose la question à la jeune femme)
  out = out.replace(
    new RegExp(
      "«<span class=\"dialogue-inline\">([^<]*Qui êtes-vous[^<]*)</span>»",
      "g"
    ),
    "«<span class=\"dialogue-theos\">$1</span>»"
  );
  out = out.replace(
    new RegExp(
      "«<span class=\"dialogue-inline\">([^<]*C'est votre collègue[^<]*)</span>»",
      "g"
    ),
    "«<span class=\"dialogue-theos\">$1</span>»"
  );

  // Ayshel — « Papa, c'est vrai que le Un est partout ? » (Ayshel avait posé APRÈS les guillemets)
  out = out.replace(
    new RegExp(
      `«<span class="dialogue-inline">([^<]*)</span>»([\\s\\S]{0,80}Ayshel avait posé)`,
      "g"
    ),
    "«<span class=\"dialogue-ayshel\">$1</span>»$2"
  );

  // Le souper : Ayshel — « Même dans les toilettes ? » (réplique de la fille)
  out = out.replace(
    new RegExp(
      "«<span class=\"dialogue-inline\">([^<]*Même dans les toilettes[^<]*)</span>»",
      "g"
    ),
    "«<span class=\"dialogue-ayshel\">$1</span>»"
  );

  // Kheym — « Le Un est partout, déclama-t-il... » (déclama-t-il = lui, à l'intérieur des guillemets)
  out = out.replace(
    new RegExp(
      "«<span class=\"dialogue-inline\">([^<]*déclama-t-il[^<]*)</span>»",
      "g"
    ),
    "«<span class=\"dialogue-theos\">$1</span>»"
  );

  // Kheym — « 321 Krolannes… » (Il pensa / regard fixé sur l'affiche = lui)
  out = out.replace(
    new RegExp(
      "«<span class=\"dialogue-inline\">([^<]*321 Krolannes[^<]*)</span>»",
      "g"
    ),
    "«<span class=\"dialogue-theos\">$1</span>»"
  );

  // Kheym — « Et bien… non, chérie... » (Il tenta quelque chose = lui répond)
  out = out.replace(
    new RegExp(
      "(Il tenta[^«]*?)«<span class=\"dialogue-inline\">([^<]*)</span>»",
      "g"
    ),
    "$1«<span class=\"dialogue-theos\">$2</span>»"
  );

  // Madaea : Sa femme, Madaea, Cria sa femme, Poursuivait sa femme (après « ... »)
  out = out.replace(
    new RegExp(
      `«<span class="dialogue-inline">([^<]*)</span>»([\\s\\S]{0,${maxContext}}(?:Sa femme|Madaea\\.|Cria sa femme|Poursuivait sa femme))`,
      "g"
    ),
    "«<span class=\"dialogue-madaea\">$1</span>»$2"
  );
  // Theos / Kheym : tous les dialogues du personnage principal → vert
  const kheymIndicators = [
    "Lui répondit-il",
    "déclama-t-il",
    "dit-il",
    "demanda-t-il",
    "répondit-il",
    "exposa-t-il",
    "murmura",
    "déclara",
    "Le Kheym toisa",
    "Le Kheym émit",
    "Le Kheym s'inclina",
    "Le Kheym déclara",
    "Le Kheym demanda",
    "Le Kheym ",
    "Il opina",
    "Il plissa",
    "Il termina",
    "Il réfléchissait",
    "Il ne le démontra",
    "Il cala",
    "Il alluma",
    "Il attrapa",
    "Il tenta",
    "Il observa",
    "Il fixait",
    "Il décida",
    "Il fit",
    "Il pensa",
    "Il s'assit",
    "Il leva",
    "Il poursuivit",
    "Il n'avait rien",
    "Il avait été",
    "Avait alors sèchement décidé",
    "Le jeune homme",
    "L'adjoint ",
    "Le commis ",
    "martelant ses phrases",
  ].map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const kheymPattern = `«<span class="dialogue-inline">([^<]*)</span>»([\\s\\S]{0,${maxContext}}(?:${kheymIndicators.join("|")}))`;
  out = out.replace(new RegExp(kheymPattern, "g"), "«<span class=\"dialogue-theos\">$1</span>»$2");
  // Ayshel : Ayshel avait posé (avant) → dialogue-ayshel pour Papa, Même quand, Tu crois
  const ayshelPattern = "(Ayshel avait posé[^<]*?)«<span class=\"dialogue-inline\">([^<]*)</span>»";
  out = out.replace(new RegExp(ayshelPattern, "g"), "$1«<span class=\"dialogue-ayshel\">$2</span>»");
  out = out.replace(
    new RegExp("(sa fille se chargea[^<]*?)«<span class=\"dialogue-inline\">([^<]*)</span>»", "g"),
    "$1«<span class=\"dialogue-ayshel\">$2</span>»"
  );
  out = out.replace(
    new RegExp("(Elle lui demanda[^<]*?)«<span class=\"dialogue-inline\">([^<]*)</span>»", "g"),
    "$1«<span class=\"dialogue-ayshel\">$2</span>»"
  );
  return out;
}

function processBookHtml(html: string): string {
  let out = html;
  for (const [name, className] of DIALOGUE_PERSONNAGES) {
    const re = new RegExp(
      `<strong>${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")} :</strong>`,
      "g"
    );
    out = out.replace(re, `<strong class="dialogue ${className}">${name} :</strong>`);
  }
  out = out.replace(new RegExp("«([^»]*)»", "g"), "«<span class=\"dialogue-inline\">$1</span>»");

  // Incises narratives à l'intérieur des guillemets : extraire et afficher en blanc (texte normal)
  const incises: [RegExp, string][] = [
    [
      new RegExp(
        "«<span class=\"dialogue-inline\">([\\s\\S]*?)Cria sa femme, le sortant de sa réflexion\\.([\\s\\S]*?)</span>»",
        "g"
      ),
      "«<span class=\"dialogue-madaea\">$1</span><span class=\"dialogue-incise\">Cria sa femme, le sortant de sa réflexion.</span><span class=\"dialogue-madaea\">$2</span>»",
    ],
    [
      new RegExp(
        "«<span class=\"dialogue-inline\">([\\s\\S]*?)Poursuivait sa femme\\.([\\s\\S]*?)</span>»",
        "g"
      ),
      "«<span class=\"dialogue-madaea\">$1</span><span class=\"dialogue-incise\">Poursuivait sa femme.</span><span class=\"dialogue-madaea\">$2</span>»",
    ],
  ];
  for (const [re, replacement] of incises) {
    out = out.replace(re, replacement);
  }

  out = attributeDialogueByContext(out);
  return out;
}

export function HtmlBookContent({ html }: HtmlBookContentProps) {
  const processedHtml = useMemo(() => processBookHtml(html), [html]);

  return (
    <div
      className="book-prose prose prose-neutral dark:prose-invert max-w-none prose-p:text-pretty prose-p:text-muted-foreground prose-headings:font-semibold prose-headings:tracking-tight prose-h2:border-t prose-h2:border-border/50 prose-h2:first:border-t-0 prose-h2:first:pt-0 prose-h2:first:mt-0 prose-blockquote:border-l-4 prose-blockquote:border-primary/40 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-muted-foreground"
      dangerouslySetInnerHTML={{ __html: processedHtml }}
    />
  );
}
