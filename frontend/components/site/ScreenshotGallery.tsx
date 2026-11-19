import Image from "next/image";

import type { GameImage } from "@/data/games";

/** Galerie qui respecte les proportions : portrait en colonnes serrées, paysage en deux colonnes, carré seul. */
export function ScreenshotGallery({ images }: { images: GameImage[] }) {
  if (images.length === 0) return null;
  const first = images[0];
  const portrait = first.height > first.width * 1.2;
  const square = !portrait && first.height >= first.width * 0.9;

  const grid = portrait
    ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
    : square
      ? "grid-cols-1 max-w-xl"
      : "grid-cols-1 md:grid-cols-2";
  const sizes = portrait
    ? "(min-width: 1024px) 18vw, (min-width: 768px) 30vw, 46vw"
    : square
      ? "(min-width: 640px) 576px, 90vw"
      : "(min-width: 768px) 45vw, 90vw";

  return (
    <ul className={`grid list-none gap-4 p-0 md:gap-6 ${grid}`}>
      {images.map((img) => (
        <li key={img.src} className="overflow-hidden rounded-card bg-castel-ink shadow-card">
          <Image src={img.src} alt={img.alt} width={img.width} height={img.height} sizes={sizes} className="h-auto w-full" />
        </li>
      ))}
    </ul>
  );
}
