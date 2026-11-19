import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";

/** Illustration détourée générée pour la carte (public/games/cards/<key>.png), si elle existe. */
const cardArt = (key: string) => {
  const rel = `/games/cards/${key}.png`;
  return fs.existsSync(path.join(process.cwd(), "public", rel)) ? rel : null;
};

/**
 * Éventail du hero : 5 cartes portrait aux couleurs vives.
 * Decalco au centre, devant ; Bobithèque derrière, sur un bord.
 * Les couleurs sont propres à l'éventail (pas les teintes des jeux).
 */
type FanCard = {
  key: string;
  name: string;
  genre: string;
  platform: string;
  href: string;
  color: string;
  image: string;
};

const cards: FanCard[] = [
  {
    key: "bobitheque",
    name: "Bobithèque",
    genre: "App de films",
    platform: "Web",
    href: "/projets/bobitheque",
    color: "#FF4FA3",
    image: "/assets/projects/project-bobitheque.png",
  },
  {
    key: "pavat",
    name: "Pavat",
    genre: "Jeu de réflexion",
    platform: "Navigateur",
    href: "/jeux/pavat",
    color: "#7C4DFF",
    image: "/games/tiles/pavat-grille.webp",
  },
  {
    key: "decalco",
    name: "Decalco",
    genre: "Jeu pour enfants",
    platform: "Mobile",
    href: "/jeux/decalco",
    color: "#22B8F0",
    image: "/games/tiles/decalco-brosser.webp",
  },
  {
    key: "godsing",
    name: "Godsing",
    genre: "Jeu de simulation",
    platform: "Ordinateur",
    href: "/jeux/godsing",
    color: "#14C98B",
    image: "/games/tiles/godsing-chateau.webp",
  },
  {
    key: "prehistopia",
    name: "Préhistopia",
    genre: "Jeu de construction",
    platform: "Navigateur",
    href: "/jeux/prehistopia",
    color: "#FF8A1F",
    image: "/games/tiles/prehistopia-village.webp",
  },
];

// Arc : centre plus grand et plus haut, bords plus petits, plus bas, inclinés vers l'extérieur.
const layout = [
  { r: "-15deg", y: "96px", z: 10, w: "w-[27vw] md:w-[210px] lg:w-[240px]" },
  { r: "-7deg", y: "32px", z: 20, w: "w-[33vw] md:w-[260px] lg:w-[290px]" },
  { r: "0deg", y: "0px", z: 40, w: "w-[42vw] md:w-[320px] lg:w-[350px]" },
  { r: "7deg", y: "32px", z: 20, w: "w-[33vw] md:w-[260px] lg:w-[290px]" },
  { r: "15deg", y: "96px", z: 10, w: "w-[27vw] md:w-[210px] lg:w-[240px]" },
];

// Rayures fines et serrées.
const stripes = "repeating-linear-gradient(135deg, rgba(255,255,255,0.11) 0 1px, transparent 1px 5px)";
// Reflet en haut à gauche + assombrissement en bas : volume de la carte.
const gloss =
  "radial-gradient(120% 60% at 15% 0%, rgba(255,255,255,0.38), rgba(255,255,255,0) 60%), linear-gradient(to bottom, rgba(255,255,255,0) 55%, rgba(0,0,0,0.18))";
// Tranche épaisse (couleur assombrie), liseré clair, ombre portée.
const depth = (color: string) =>
  [
    "inset 0 2px 0 rgba(255,255,255,0.45)",
    "inset 0 0 0 1px rgba(255,255,255,0.18)",
    "inset 0 -14px 28px rgba(0,0,0,0.16)",
    `0 8px 0 color-mix(in srgb, ${color} 62%, black)`,
    "0 34px 60px rgba(0,0,0,0.5)",
  ].join(", ");

export function HeroFan() {
  return (
    <div className="relative mx-auto mt-2 flex items-start justify-center overflow-x-clip px-4 pb-14 pt-6 [perspective:1400px] sm:pb-36">
      {cards.map((c, i) => {
        const l = layout[i];
        const right = i > 2;
        const left = i < 2;
        const center = i === 2;
        return (
          <Link
            key={c.key}
            href={c.href}
            aria-label={`${c.name} : en savoir plus`}
            style={{
              ["--r" as string]: l.r,
              ["--y" as string]: l.y,
              ["--z" as string]: l.z,
              backgroundColor: c.color,
              backgroundImage: `${gloss}, ${stripes}`,
              boxShadow: depth(c.color),
            }}
            className={`${l.w} ${i > 0 ? "-ml-[11vw] md:-ml-16" : ""} relative z-[var(--z)] aspect-[3/4] shrink-0 overflow-hidden rounded-[22px] transition-transform duration-[250ms] ease-out [transform:translateY(var(--y))_rotate(var(--r))_rotateX(6deg)] hover:z-50 focus-visible:z-50 hover:[transform:translateY(calc(var(--y)-14px))_rotate(calc(var(--r)*0.3))_scale(1.03)] focus-visible:[transform:translateY(calc(var(--y)-14px))_rotate(calc(var(--r)*0.3))_scale(1.03)] motion-reduce:transition-none motion-reduce:hover:[transform:translateY(var(--y))_rotate(var(--r))] motion-reduce:focus-visible:[transform:translateY(var(--y))_rotate(var(--r))] sm:rounded-[32px]`}
          >
            <div
              className={`relative z-10 p-3 sm:p-5 ${right ? "pl-[11vw] text-right md:pl-16" : ""} ${left ? "pr-[11vw] md:pr-16" : ""}`}
            >
              <span
                className={`block font-display font-bold leading-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)] ${
                  center ? "text-lg sm:text-3xl lg:text-[34px]" : "text-sm sm:text-xl lg:text-2xl"
                }`}
              >
                {c.name}
              </span>
              <p className="mt-0.5 hidden text-sm font-medium text-white sm:block">{c.genre}</p>
              <span
                className={`mt-3 hidden items-center gap-1.5 rounded-full bg-black/35 px-3 py-1 text-xs font-medium text-white sm:inline-flex ${
                  right ? "flex-row-reverse" : ""
                }`}
              >
                <span className="h-2 w-2 rounded-full bg-white" />
                {c.platform}
              </span>
            </div>
            {(() => {
              const art = cardArt(c.key);
              if (art) {
                return (
                  <div className="absolute inset-x-0 bottom-0 h-[72%]">
                    <Image src={art} alt="" fill priority={center} sizes="(min-width: 1024px) 350px, 42vw" className={`object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.25)] ${left ? "object-left-bottom" : right ? "object-right-bottom" : "object-bottom"}`} />
                  </div>
                );
              }
              return (
                <div
                  className="absolute inset-x-0 bottom-0 h-[58%]"
                  style={{
                    maskImage: "linear-gradient(to bottom, transparent, black 40%)",
                    WebkitMaskImage: "linear-gradient(to bottom, transparent, black 40%)",
                  }}
                >
                  <Image src={c.image} alt="" fill priority={center} sizes="(min-width: 1024px) 350px, 42vw" className="object-cover object-top" />
                </div>
              );
            })()}
          </Link>
        );
      })}
    </div>
  );
}
