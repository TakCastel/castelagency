/**
 * Aère les paragraphes d'un fichier Markdown : découpe les blocs trop longs
 * en paragraphes d'environ 5 lignes (~350 caractères) aux frontières de phrases.
 */
const fs = require("fs");
const path = require("path");

const TARGET_CHARS = 380; // ~5 lignes
const filePath = path.join(__dirname, "../content/ecritures/l-homme-au-masque-de-verre.md");

const raw = fs.readFileSync(filePath, "utf8");

function splitParagraph(text) {
  const trimmed = text.trim();
  if (!trimmed || trimmed.length <= TARGET_CHARS) return [trimmed].filter(Boolean);
  const parts = [];
  let rest = trimmed;
  while (rest.length > TARGET_CHARS) {
    const chunk = rest.slice(0, Math.min(rest.length, TARGET_CHARS * 1.6));
    const sentenceEnd = /[.!?»]\s+/g;
    let lastGood = 0;
    let m;
    while ((m = sentenceEnd.exec(chunk)) !== null) {
      if (m.index <= TARGET_CHARS * 1.3) lastGood = m.index + m[0].length;
    }
    if (lastGood === 0) {
      const fallback = rest.indexOf(". ", Math.floor(TARGET_CHARS * 0.6));
      lastGood = fallback > 0 ? fallback + 2 : Math.min(TARGET_CHARS, rest.length);
    }
    parts.push(rest.slice(0, lastGood).trim());
    rest = rest.slice(lastGood).trim();
  }
  if (rest) parts.push(rest);
  return parts;
}

const blocks = raw.split(/\n\n+/);
const out = [];
for (const block of blocks) {
  const trimmed = block.trim();
  if (!trimmed) continue;
  // Garder titres, citation d'ouverture, et blocs de dialogue (L'Inconnu)
  if (
    trimmed.startsWith("#") ||
    trimmed.startsWith(">") ||
    (trimmed.startsWith("**") && trimmed.includes(":**"))
  ) {
    out.push(trimmed);
    continue;
  }
  const paras = splitParagraph(trimmed);
  out.push(...paras);
}

fs.writeFileSync(filePath, out.join("\n\n"), "utf8");
console.log("Aération terminée.");
