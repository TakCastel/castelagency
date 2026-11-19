import fs from "node:fs";
import path from "node:path";
import Image from "next/image";

import { CARD_COLOR, type ShowcaseProject } from "@/data/showcase";

/** Illustration détourée de la carte (public/games/cards/<key>.png), si elle existe. */
export const cardArt = (key: string) => {
  const rel = `/games/cards/${key}.png`;
  return fs.existsSync(path.join(process.cwd(), "public", rel)) ? rel : null;
};

/** Illustration paysage ou portrait (format de l'éventail du hero) : lu dans l'en-tête PNG. */
const isLandscape = (rel: string) => {
  const fd = fs.openSync(path.join(process.cwd(), "public", rel), "r");
  const head = Buffer.alloc(24);
  fs.readSync(fd, head, 0, 24, 0);
  fs.closeSync(fd);
  return head.readUInt32BE(16) > head.readUInt32BE(20);
};

/**
 * Visuel horizontal : l'image du site ou du jeu en fond, discrète, fondue dans la couleur ;
 * l'illustration devant, à gauche, posée sur le bord bas.
 */
export function ArtOverImage({
  art,
  color,
  image,
  alt,
  sizes,
  priority,
  className = "",
}: {
  art: string;
  color: string;
  image: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  /** Proportions et fond, par ex. "aspect-[16/10]" ou "aspect-video". */
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ backgroundColor: color }}>
      <Image
        src={image}
        alt=""
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover object-top opacity-30 mix-blend-luminosity saturate-50 blur-[1px]"
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top right, ${color} 0%, color-mix(in srgb, ${color} 60%, transparent) 40%, transparent 80%)`,
        }}
      />
      <div className={isLandscape(art) ? "absolute inset-0" : "absolute bottom-0 left-[4%] h-[118%] aspect-[2/3]"}>
        <Image
          src={art}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-contain object-left-bottom drop-shadow-[0_12px_24px_rgba(0,0,0,0.35)]"
        />
      </div>
    </div>
  );
}

/** Visuel d'un projet (16/10) : illustration devant la capture si elle existe, sinon la capture seule. */
export function ProjectVisual({
  project,
  sizes,
  priority,
  className = "",
  screenshotClassName = "object-cover object-top",
}: {
  project: ShowcaseProject;
  sizes: string;
  priority?: boolean;
  className?: string;
  screenshotClassName?: string;
}) {
  const art = cardArt(project.id);
  const color = CARD_COLOR[project.id];
  if (art && color) {
    return (
      <ArtOverImage
        art={art}
        color={color}
        image={project.image}
        alt={project.imageAlt}
        sizes={sizes}
        priority={priority}
        className={`aspect-[16/10] ${className}`}
      />
    );
  }
  return (
    <div className={`relative aspect-[16/10] overflow-hidden ${className}`}>
      <Image src={project.image} alt={project.imageAlt} fill sizes={sizes} priority={priority} className={screenshotClassName} />
    </div>
  );
}
