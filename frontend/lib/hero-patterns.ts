/**
 * Utilise les vrais patterns de Hero Patterns (https://heropatterns.com/) via le package hero-patterns.
 * Chaque pattern est penché à 40° via CSS (transform sur la couche de motif).
 */

import * as heroPatterns from "hero-patterns";

/** Liste des noms de patterns Hero (fonctions exportées par hero-patterns). */
const PATTERN_NAMES: (keyof typeof heroPatterns)[] = [
  "circlesAndSquares",
  "circuitBoard",
  "topography",
  "graphPaper",
  "overlappingCircles",
  "plus",
  "bamboo",
  "boxes",
  "bubbles",
  "churchOnSunday",
  "connections",
  "current",
  "diagonalLines",
  "fallingTriangles",
  "fourPointStars",
  "hexagons",
  "intersectingCircles",
  "jigsaw",
  "overlappingDiamonds",
  "overlappingHexagons",
  "parkayFloor",
  "pieFactory",
  "polkaDots",
  "squares",
  "temple",
  "texture",
  "ticTacToe",
  "wiggle",
];

const NUM_PATTERNS = PATTERN_NAMES.length;

/** Convertit RGB (0–255) en hex sans #. */
export function rgbToHex(r: number, g: number, b: number): string {
  return [r, g, b]
    .map((x) => Math.round(x).toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Retourne une variante plus claire ou plus sombre de la couleur (pour le pattern).
 * Si la couleur de base est sombre → variante plus claire ; sinon → plus sombre.
 */
export function getTintedColorForPattern(
  r: number,
  g: number,
  b: number
): string {
  const L = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  const lighter = L < 0.5;
  const mix = lighter ? 255 : 0;
  const amount = lighter ? 0.35 : 0.25;
  const r2 = Math.round(r + (mix - r) * amount);
  const g2 = Math.round(g + (mix - g) * amount);
  const b2 = Math.round(b + (mix - b) * amount);
  return rgbToHex(r2, g2, b2);
}

/** Hash simple sur l’id du projet pour un index de pattern déterministe. */
export function getPatternIndexForProject(projectId: string): number {
  let h = 0;
  for (let i = 0; i < projectId.length; i++) {
    h = (h << 5) - h + projectId.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

/** Opacité du motif (0–1). */
const PATTERN_FILL_OPACITY = 0.4;

/**
 * Retourne l’URL data pour un pattern Hero (index déterministe) avec la couleur en hex (sans #).
 * Utilise les vrais patterns du package hero-patterns.
 */
export function getHeroPatternDataUri(
  patternIndex: number,
  hexColor: string
): string {
  const index = patternIndex % NUM_PATTERNS;
  const name = PATTERN_NAMES[index];
  const fn = heroPatterns[name];
  if (typeof fn !== "function") {
    return "";
  }
  const color = `#${hexColor}`;
  return (fn as (color: string, opacity: number) => string)(
    color,
    PATTERN_FILL_OPACITY
  );
}

/** Taille de répétition des patterns Hero (viewBox 192×192). */
export const HERO_PATTERN_SIZE = 192;
