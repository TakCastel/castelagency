// Génère favicon.ico, icon.svg, apple-icon.png et og-logo-only.png depuis public/brand.
// Usage : node scripts/brand/generate-icons.mjs
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const svgPath = path.join(root, "public/brand/studio-castel-logo-rouge.svg");
const svg = fs.readFileSync(svgPath);
const png = (size) => sharp(svg, { density: 384 }).resize(size, size).png().toBuffer();

fs.copyFileSync(svgPath, path.join(root, "app/icon.svg"));
fs.writeFileSync(path.join(root, "app/apple-icon.png"), await png(180));
fs.writeFileSync(path.join(root, "public/og-logo-only.png"), await png(600));

// ICO avec PNG intégrés (16, 32, 48)
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map(png));
const head = Buffer.alloc(6);
head.writeUInt16LE(0, 0); head.writeUInt16LE(1, 2); head.writeUInt16LE(sizes.length, 4);
let offset = 6 + 16 * sizes.length;
const dir = sizes.map((s, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(s, 0); e.writeUInt8(s, 1); e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6);
  e.writeUInt32LE(images[i].length, 8); e.writeUInt32LE(offset, 12);
  offset += images[i].length;
  return e;
});
fs.writeFileSync(path.join(root, "app/favicon.ico"), Buffer.concat([head, ...dir, ...images]));
console.log("icônes générées");
