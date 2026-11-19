// Enregistre video/index.html en MP4, image par image (rendu déterministe, aucune image sautée).
//
//   node video/record.mjs                  -> video/out/studio-castel.mp4 (1920x1080, 60 i/s)
//   node video/record.mjs --stills 1,5,9   -> video/out/still-<t>.png (contrôle d'images clés)
//   node video/record.mjs --fps 30
//
// Dépendances : Google Chrome installé, ffmpeg, et puppeteer-core
// (npm i puppeteer-core, ou NODE_PATH vers un node_modules qui le contient).
import { spawn } from "node:child_process";
import { mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const require = createRequire(import.meta.url);
const puppeteer = require(require.resolve("puppeteer-core", { paths: [process.cwd(), ...(process.env.NODE_PATH || "").split(":")] }));

const dir = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(dir, "out");
mkdirSync(out, { recursive: true });

const arg = (k, d) => {
  const i = process.argv.indexOf(k);
  return i > -1 ? process.argv[i + 1] : d;
};
const fps = Number(arg("--fps", 60));
const stills = arg("--stills", null);
const chrome = process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const browser = await puppeteer.launch({
  executablePath: chrome,
  headless: true,
  args: ["--allow-file-access-from-files", "--hide-scrollbars", "--force-color-profile=srgb", "--disable-lcd-text"],
  defaultViewport: { width: 1920, height: 1080, deviceScaleFactor: 1 },
});
const page = await browser.newPage();
await page.goto(pathToFileURL(path.join(dir, "index.html")).href, { waitUntil: "networkidle0" });
await page.evaluate(() => window.ready);
const duration = await page.evaluate(() => window.DURATION);

if (stills) {
  for (const t of stills.split(",").map(Number)) {
    await page.evaluate((t) => new Promise((r) => { window.render(t); requestAnimationFrame(() => requestAnimationFrame(r)); }), t);
    await page.screenshot({ path: path.join(out, `still-${t.toFixed(2)}.png`) });
  }
  await browser.close();
  process.exit(0);
}

const file = path.join(out, "studio-castel.mp4");
const ff = spawn("ffmpeg", [
  "-y", "-f", "image2pipe", "-framerate", String(fps), "-i", "-",
  "-c:v", "libx264", "-preset", "slow", "-crf", "16", "-pix_fmt", "yuv420p", "-movflags", "+faststart",
  file,
], { stdio: ["pipe", "inherit", "inherit"] });

const total = Math.round(duration * fps);
for (let f = 0; f < total; f++) {
  // rendu puis attente de deux images peintes, pour ne jamais capturer un état à moitié appliqué
  await page.evaluate((t) => new Promise((r) => { window.render(t); requestAnimationFrame(() => requestAnimationFrame(r)); }), f / fps);
  const buf = await page.screenshot({ type: "jpeg", quality: 95, optimizeForSpeed: true });
  if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once("drain", r));
  if (f % fps === 0) process.stdout.write(`\r${(f / fps).toFixed(0)}/${duration} s`);
}
ff.stdin.end();
await new Promise((r) => ff.on("close", r));
await browser.close();
console.log(`\n${file}`);
