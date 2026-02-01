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
