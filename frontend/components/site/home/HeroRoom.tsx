import Image from "next/image";

/**
 * Pièce 3D vue de l'intérieur, en CSS pur : cinq plans quadrillés en perspective.
 * Quelques cases des murs latéraux contiennent une capture de jeu.
 * Décoratif : aria-hidden, aucune animation.
 */

const line = "rgba(255,255,255,0.09)";
const grid = {
  backgroundImage: `linear-gradient(${line} 1px, transparent 1px), linear-gradient(90deg, ${line} 1px, transparent 1px)`,
  backgroundSize: "var(--c) var(--c)",
} as const;

type Tile = { src: string; col: number; row: number; mobile?: boolean };

// col = profondeur (en cases depuis le bord proche), row = hauteur (en cases depuis le haut du mur)
const left: Tile[] = [
  { src: "decalco-brosser", col: 2, row: 2, mobile: true },
  { src: "pavat-grille", col: 4, row: 4 },
  { src: "godsing-chateau", col: 1, row: 5, mobile: true },
];
const right: Tile[] = [
  { src: "godsing-foyers", col: 2, row: 3, mobile: true },
  { src: "prehistopia-village", col: 4, row: 1 },
  { src: "decalco-banquise", col: 1, row: 5 },
];

function Tiles({ tiles, side }: { tiles: Tile[]; side: "left" | "right" }) {
  return (
    <>
      {tiles.map((t) => (
        <div
          key={t.src}
          className={`absolute rounded-[10px] bg-castel-surface p-[calc(var(--c)*0.08)] ${t.mobile ? "" : "hidden md:block"}`}
          style={{
            width: "var(--c)",
            height: "var(--c)",
            top: `calc(var(--c) * ${t.row})`,
            [side === "left" ? "left" : "right"]: `calc(var(--c) * ${t.col})`,
          }}
        >
          <div className="relative h-full w-full overflow-hidden rounded-lg shadow-[0_6px_14px_rgba(0,0,0,0.5)]">
            <Image src={`/games/tiles/${t.src}.webp`} alt="" fill sizes="110px" className="object-cover" />
          </div>
        </div>
      ))}
    </>
  );
}

export function HeroRoom() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden [--c:64px] [--d:calc(var(--c)*9)] md:[--c:100px]"
      style={{ perspective: "600px", perspectiveOrigin: "50% 40%" }}
    >
      <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
        {/* fond */}
        <div className="absolute inset-0" style={{ ...grid, backgroundPosition: "center top", transform: "translateZ(calc(var(--d) * -1))" }} />
        {/* mur gauche */}
        <div
          className="absolute bottom-0 left-0 top-0 origin-left"
          style={{ ...grid, width: "var(--d)", backgroundPosition: "left top", transform: "rotateY(90deg)" }}
        >
          <Tiles tiles={left} side="left" />
        </div>
        {/* mur droit */}
        <div
          className="absolute bottom-0 right-0 top-0 origin-right"
          style={{ ...grid, width: "var(--d)", backgroundPosition: "right top", transform: "rotateY(-90deg)" }}
        >
          <Tiles tiles={right} side="right" />
        </div>
        {/* sol */}
        <div
          className="absolute bottom-0 left-0 right-0 origin-bottom"
          style={{ ...grid, height: "var(--d)", backgroundPosition: "center bottom", transform: "rotateX(90deg)" }}
        />
        {/* plafond */}
        <div
          className="absolute left-0 right-0 top-0 origin-top"
          style={{ ...grid, height: "var(--d)", backgroundPosition: "center top", transform: "rotateX(-90deg)" }}
        />
      </div>
      {/* fondu vers le noir sur les bords */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 80% 70% at 50% 45%, transparent 35%, #09090B 100%)" }}
      />
    </div>
  );
}
