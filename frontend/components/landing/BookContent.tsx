"use client";

/**
 * Titres de section du récit « L'homme au masque de verre ».
 * On découpe le texte quand on rencontre " Titre. " ou " Titre " (avec espace avant).
 */
const SECTION_TITLES = [
  "L'Aube.",
  "Le Crépuscule.",
  "Le dîner.",
  "Le souper.",
  "Le Rationnel.",
  "La Mystique.",
  "Avant ",
  "Après ",
  "La Justice.",
  "An 749 ",
  "Le Crime.",
  "Entracte ",
  "Bien avant ",
  "Un peu avant.",
  "L'Enjeu ",
  "An 814, Le Merakih 10 Fambir ",
  "La Liste ",
  "Le Candidat ",
  "Toujours le Candidat ",
  "L'Amour de l'Autre.",
  "Les Intempéries, impérissables,",
  "Les Connus ",
  "L'Inconnu ",
];

type Segment = { type: "paragraph"; text: string } | { type: "title"; text: string };

function splitParagraph(paragraph: string): Segment[] {
  const segments: Segment[] = [];
  let remaining = paragraph;

  while (remaining.length > 0) {
    let earliest = -1;
    let matchedTitle = "";
    let matchLength = 0;

    for (const title of SECTION_TITLES) {
      const t = title.trim();
      const atStart = remaining.startsWith(t);
      const inMiddle = remaining.indexOf(" " + t) >= 0;
      const idx = atStart ? 0 : (inMiddle ? remaining.indexOf(" " + t) : -1);
      if (idx >= 0 && (earliest < 0 || idx < earliest)) {
        earliest = idx;
        matchedTitle = t;
        matchLength = (idx === 0 ? t : " " + t).length;
      }
    }

    if (earliest < 0) {
      if (remaining.trim()) segments.push({ type: "paragraph", text: remaining.trim() });
      break;
    }

    const before = remaining.slice(0, earliest).trim();
    if (before.length > 0) {
      segments.push({ type: "paragraph", text: before });
    }

    segments.push({ type: "title", text: matchedTitle.replace(/\.\s*$/, "") });
    remaining = remaining.slice(earliest + matchLength).trim();
  }

  return segments;
}

function splitAll(paragraphs: string[]): Segment[] {
  const all: Segment[] = [];
  for (const p of paragraphs) {
    const segments = splitParagraph(p);
    for (const s of segments) {
      if (s.type === "paragraph" && s.text.length === 0) continue;
      all.push(s);
    }
  }
  return all;
}

type BookContentProps = { paragraphs: string[] };

export function BookContent({ paragraphs }: BookContentProps) {
  const segments = splitAll(paragraphs);

  return (
    <div className="space-y-8 md:space-y-10">
      {segments.map((seg, i) => {
        if (seg.type === "title") {
          return (
            <h2
              key={i}
              id={`s-${i}`}
              className="text-titre-petit font-semibold tracking-tight text-foreground pt-6 md:pt-8 scroll-mt-24 border-t border-border/50 first:border-t-0 first:pt-0"
            >
              {seg.text}
            </h2>
          );
        }
        return (
          <p
            key={i}
            className="text-pretty text-paragraphe leading-relaxed text-muted-foreground indent-0"
          >
            {seg.text}
          </p>
        );
      })}
    </div>
  );
}
