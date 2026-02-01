const fs = require("fs");
const path = require("path");

// Même liste que dans BookContent.tsx pour repérer les titres de section
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

/**
 * Découpe un bloc de texte en segments (titre de section | paragraphe).
 * @returns { Array<{ type: 'title'|'paragraph', text: string }> }
 */
function splitParagraph(paragraph) {
  const segments = [];
  let remaining = paragraph;

  while (remaining.length > 0) {
    let earliest = -1;
    let matchedTitle = "";
    let matchLength = 0;

    for (const title of SECTION_TITLES) {
      const t = title.trim();
      const atStart = remaining.startsWith(t);
      const inMiddle = remaining.indexOf(" " + t) >= 0;
      const idx = atStart ? 0 : inMiddle ? remaining.indexOf(" " + t) : -1;
      if (idx >= 0 && (earliest < 0 || idx < earliest)) {
        earliest = idx;
        matchedTitle = t;
        matchLength = idx === 0 ? t.length : (" " + t).length;
      }
    }

    if (earliest < 0) {
      if (remaining.trim()) {
        segments.push({ type: "paragraph", text: remaining.trim() });
      }
      break;
    }

    const before = remaining.slice(0, earliest).trim();
    if (before.length > 0) {
      segments.push({ type: "paragraph", text: before });
    }

    const titleText = matchedTitle.replace(/\.\s*$/, "").trim();
    segments.push({ type: "title", text: titleText });
    remaining = remaining.slice(earliest + matchLength).trim();
  }

  return segments;
}

function splitAll(blocks) {
  const all = [];
  for (const p of blocks) {
    const segments = splitParagraph(p);
    for (const s of segments) {
      if (s.type === "paragraph" && s.text.length === 0) continue;
      all.push(s);
    }
  }
  return all;
}

async function main() {
  const pdfPath = path.join(
    __dirname,
    "../public/realisations/Syaria Recap.docx.pdf"
  );
  const buffer = fs.readFileSync(pdfPath);

  const { PDFParse } = await import("pdf-parse");
  const parser = new PDFParse({ data: buffer });
  const result = await parser.getText();
  await parser.destroy();

  const raw = result.text || "";

  // Supprimer les marqueurs de page "-- 1 of 17 --"
  const text = raw.replace(/\s*-- \d+ of \d+ --\s*/gi, "\n\n");

  const blocks = text
    .split(/\n\n+/)
    .map((block) => block.replace(/\n/g, " ").replace(/\s+/g, " ").trim())
    .filter(Boolean);

  const segments = splitAll(blocks);

  const title = "L'homme au masque de verre";
  const lines = [
    `# ${title}`,
    "",
    "*Ou la véritable histoire du Keymlos. Texte intégral.*",
    "",
    "---",
    "",
  ];

  for (const seg of segments) {
    if (seg.type === "title") {
      lines.push(`## ${seg.text}`);
      lines.push("");
    } else {
      // Paragraphe : on garde le texte tel quel (pas d'escape pour garder la ponctuation)
      lines.push(seg.text);
      lines.push("");
    }
  }

  const mdContent = lines.join("\n").trimEnd() + "\n";

  const contentDir = path.join(__dirname, "../content/ecritures");
  fs.mkdirSync(contentDir, { recursive: true });
  const mdPath = path.join(contentDir, "l-homme-au-masque-de-verre.md");
  fs.writeFileSync(mdPath, mdContent, "utf8");

  console.log("Blocs bruts:", blocks.length);
  console.log("Segments (titres + paragraphes):", segments.length);
  console.log("Écrit dans:", mdPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
