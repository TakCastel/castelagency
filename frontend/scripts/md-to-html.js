/**
 * Convertit le fichier Markdown du récit en HTML (corps uniquement, après ---).
 * Usage: node scripts/md-to-html.js
 */
const fs = require("fs");
const path = require("path");
const { marked } = require("marked");

const mdPath = path.join(__dirname, "../content/ecritures/l-homme-au-masque-de-verre.md");
const htmlPath = path.join(__dirname, "../content/ecritures/l-homme-au-masque-de-verre.html");

const raw = fs.readFileSync(mdPath, "utf8");
const lines = raw.split("\n");
const sepIdx = lines.findIndex((l) => l.trim() === "---");
const bodyMd = sepIdx >= 0 ? lines.slice(sepIdx + 1).join("\n").trimStart() : raw;

marked.setOptions({ gfm: true });
const bodyHtml = marked.parse(bodyMd);

fs.writeFileSync(htmlPath, bodyHtml.trim(), "utf8");
console.log("HTML généré:", htmlPath);
