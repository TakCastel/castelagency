"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type CarouselCard = {
  key: string;
  name: string;
  genre: string;
  platform: string;
  href: string;
  color: string;
  image: string;
  art: string | null;
};

// Rayures fines et serrées.
const stripes = "repeating-linear-gradient(135deg, rgba(255,255,255,0.11) 0 1px, transparent 1px 5px)";
// Reflet en haut à gauche + assombrissement en bas : volume de la carte.
const gloss =
  "radial-gradient(120% 60% at 15% 0%, rgba(255,255,255,0.38), rgba(255,255,255,0) 60%), linear-gradient(to bottom, rgba(255,255,255,0) 55%, rgba(0,0,0,0.18))";
// Tranche épaisse (couleur assombrie), liseré clair, ombre portée.
const depth = (color: string) =>
  [
    `0 8px 0 color-mix(in srgb, ${color} 62%, black)`,
    "0 34px 60px rgba(0,0,0,0.5)",
  ].join(", ");
const innerLight = [
  "inset 0 2px 0 rgba(255,255,255,0.45)",
  "inset 0 0 0 1px rgba(255,255,255,0.18)",
  "inset 0 -14px 28px rgba(0,0,0,0.16)",
].join(", ");

/** Emplacements sur l'anneau : chaque carte apparaît deux fois, pour garnir le cercle. */
const COPIES = 2;
const EASE = "cubic-bezier(.22,1,.36,1)";
const DURATION = 650;

/**
 * Carrousel 3D en anneau, vu de l'extérieur : les cartes sont posées sur un
 * cylindre et c'est le cylindre qui tourne, donc le mouvement suit un vrai arc
 * de cercle et aucune carte ne se téléporte. Swipe au doigt, glisser à la
 * souris, trackpad, flèches, clavier, clic sur une carte latérale.
 */
export function HeroCarousel({ cards, initial = 0 }: { cards: CarouselCard[]; initial?: number }) {
  const n = cards.length;
  const slots = n * COPIES;
  const angle = 360 / slots;
  const [pos, setPos] = useState(initial); // emplacement actif, non borné
  const [drag, setDrag] = useState(0); // déplacement en cours, en px
  const [dragging, setDragging] = useState(false);
  const [w, setW] = useState(300); // largeur d'une carte, en px
  const stageRef = useRef<HTMLDivElement>(null);
  const suppressClick = useRef(false);
  // Point où le pointeur a été enfoncé : un clic qui en est loin est un glissé, pas un clic.
  const downAt = useRef<{ x: number; y: number } | null>(null);
  const gesture = useRef<{ x: number; y: number; t: number; locked: boolean | null } | null>(null);

  // Rayon : deux cartes voisines ne se touchent pas (pas d'intersection 3D).
  const radius = (w / 2 / Math.tan(Math.PI / slots)) * 1.06;
  const stepPx = () => (stageRef.current?.offsetWidth ?? w) * 0.9;
  const wrapSlot = (x: number) => ((((x + slots / 2) % slots) + slots) % slots) - slots / 2;
  const wrapCard = (x: number) => ((((x + n / 2) % n) + n) % n) - n / 2;

  const active = ((pos % n) + n) % n;
  const activeSlot = ((pos % slots) + slots) % slots;
  const live = pos - (dragging ? drag / stepPx() : 0); // position continue
  const go = (delta: number) => setPos((p) => p + Math.round(delta));

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setW(el.offsetWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Gestes : on écoute la fenêtre pour ne pas perdre le doigt hors du carrousel.
  useEffect(() => {
    const move = (e: PointerEvent) => {
      const g = gesture.current;
      if (!g) return;
      const dx = e.clientX - g.x;
      const dy = e.clientY - g.y;
      if (g.locked === null && Math.hypot(dx, dy) > 8) {
        g.locked = Math.abs(dx) > Math.abs(dy);
        if (g.locked) setDragging(true);
      }
      if (g.locked) setDrag(dx);
    };
    const up = (e: PointerEvent) => {
      const g = gesture.current;
      gesture.current = null;
      if (!g || !g.locked) return;
      const dx = e.clientX - g.x;
      const velocity = dx / Math.max(1, performance.now() - g.t); // px/ms
      let delta = -Math.round(dx / stepPx());
      // Un petit coup de doigt rapide suffit pour passer à la suivante.
      if (delta === 0 && (Math.abs(dx) > 30 || Math.abs(velocity) > 0.4)) delta = dx < 0 ? 1 : -1;
      // Le clic qui suit un glissé ne doit jamais ouvrir une carte : on l'avale
      // en phase de capture, où qu'il tombe, puis on retire l'écouteur.
      suppressClick.current = true;
      const swallow = (ev: MouseEvent) => {
        ev.preventDefault();
        ev.stopPropagation();
      };
      window.addEventListener("click", swallow, true);
      setTimeout(() => {
        window.removeEventListener("click", swallow, true);
        suppressClick.current = false;
      }, 250);
      setDragging(false);
      setDrag(0);
      setPos((p) => p + delta);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
    // stepPx lit une ref : pas besoin de réabonner.
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Swipe à deux doigts sur le trackpad (desktop) : une carte par geste.
  const wheelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = wheelRef.current;
    if (!el) return;
    let acc = 0;
    let lockedUntil = 0;
    let resetTimer: ReturnType<typeof setTimeout>;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => (acc = 0), 200);
      if (performance.now() < lockedUntil) return;
      acc += e.deltaX;
      if (Math.abs(acc) > 40) {
        const dir = acc > 0 ? 1 : -1;
        setPos((p) => p + dir);
        acc = 0;
        lockedUntil = performance.now() + 450;
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const transition = dragging ? "none" : `transform ${DURATION}ms ${EASE}`;

  return (
    <div
      ref={wheelRef}
      className="relative mx-auto mt-2 overflow-x-clip pb-10 pt-8 [overscroll-behavior-x:contain] sm:pb-24"
      role="region"
      aria-roledescription="carrousel"
      aria-label="Nos jeux et apps"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          go(1);
        }
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          go(-1);
        }
      }}
    >
      <div
        className="relative mx-auto touch-pan-y select-none [perspective:1100px] md:[perspective:1700px]"
        onPointerDown={(e) => {
          downAt.current = { x: e.clientX, y: e.clientY };
          if (e.pointerType === "mouse" && e.button !== 0) return;
          gesture.current = { x: e.clientX, y: e.clientY, t: performance.now(), locked: null };
        }}
        onDragStart={(e) => e.preventDefault()}
      >
        <div
          ref={stageRef}
          className={`relative mx-auto aspect-[3/4] w-[52vw] max-w-[300px] [transform-style:preserve-3d] sm:w-[42vw] md:w-[300px] lg:w-[330px] lg:max-w-[330px] ${
            dragging ? "cursor-grabbing" : "cursor-grab"
          }`}
        >
          {/* L'anneau : il recule de son rayon puis tourne. */}
          <div
            className="absolute inset-0 [transform-style:preserve-3d] motion-reduce:!transition-none"
            style={{
              transform: `translateZ(${-radius}px) rotateY(${-live * angle}deg)`,
              transition,
            }}
          >
            {Array.from({ length: slots }, (_, s) => {
              const i = s % n;
              const c = cards[i];
              const d = wrapSlot(s - live); // distance au centre, en emplacements
              const ad = Math.abs(d);
              const isActive = s === activeSlot && !dragging;
              const hidden = ad > 2.4; // au-delà de ~90°, la carte tourne le dos
              return (
                <Link
                  key={`${c.key}-${s}`}
                  href={c.href}
                  draggable={false}
                  tabIndex={isActive ? 0 : -1}
                  aria-hidden={isActive ? undefined : true}
                  aria-label={`${c.name} : en savoir plus`}
                  onClick={(e) => {
                    const from = downAt.current;
                    const moved = from ? Math.hypot(e.clientX - from.x, e.clientY - from.y) > 6 : false;
                    if (suppressClick.current || moved || dragging) {
                      e.preventDefault();
                      e.stopPropagation();
                      return;
                    }
                    if (s !== activeSlot) {
                      e.preventDefault();
                      go(wrapSlot(s - pos));
                    }
                  }}
                  style={{
                    transform: `rotateY(${s * angle}deg) translateZ(${radius}px)`,
                    boxShadow: depth(c.color),
                    opacity: hidden ? 0 : 1,
                    pointerEvents: hidden ? "none" : undefined,
                    transition: "opacity 200ms ease",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                  className="group absolute inset-0 rounded-[22px] [backface-visibility:hidden] sm:rounded-[32px]"
                >
                  {/* Calque découpé par clip-path : l'arrondi tient pendant la rotation 3D
                      (overflow-hidden + border-radius le perd sur Safari). */}
                  <div
                    className="absolute inset-0 rounded-[22px] [clip-path:inset(0_round_22px)] sm:rounded-[32px] sm:[clip-path:inset(0_round_32px)]"
                    style={{
                      backgroundColor: c.color,
                      backgroundImage: `${gloss}, ${stripes}`,
                      boxShadow: innerLight,
                      // Safari n'hérite pas du masquage de dos sur les calques enfants.
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                  >
                    <div className={`relative z-10 p-4 sm:p-5 ${d > 0.5 ? "text-right" : ""}`}>
                      <span className="block font-display text-2xl font-bold leading-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)] sm:text-3xl lg:text-[34px]">
                        {c.name}
                      </span>
                      <p className="mt-0.5 text-xs font-medium text-white/90 sm:text-sm">{c.genre}</p>
                      <span
                        className={`mt-3 hidden items-center gap-1.5 rounded-full bg-black/35 px-3 py-1 text-xs font-medium text-white sm:inline-flex ${
                          d > 0.5 ? "flex-row-reverse" : ""
                        }`}
                      >
                        <span className="h-2 w-2 rounded-full bg-white" />
                        {c.platform}
                      </span>
                    </div>
                    {c.art ? (
                      <div className="absolute inset-x-0 bottom-0 h-[70%] transition-transform duration-500 ease-out group-hover:scale-[1.04]">
                        <Image
                          src={c.art}
                          alt=""
                          fill
                          draggable={false}
                          priority={s === initial}
                          sizes="(min-width: 1024px) 330px, 52vw"
                          className="object-contain object-bottom drop-shadow-[0_12px_24px_rgba(0,0,0,0.25)]"
                        />
                      </div>
                    ) : (
                      <div
                        className="absolute inset-x-0 bottom-0 h-[58%]"
                        style={{
                          maskImage: "linear-gradient(to bottom, transparent, black 40%)",
                          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 40%)",
                        }}
                      >
                        <Image
                          src={c.image}
                          alt=""
                          fill
                          draggable={false}
                          sizes="(min-width: 1024px) 330px, 52vw"
                          className="object-cover object-top"
                        />
                      </div>
                    )}
                    {/* Les cartes qui s'éloignent s'assombrissent (sans filter, qui casse la 3D). */}
                    <div
                      className="pointer-events-none absolute inset-0 bg-black"
                      style={{ opacity: Math.min(ad, 2) * 0.14, transition: dragging ? "none" : `opacity ${DURATION}ms ${EASE}` }}
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Points + flèches (desktop) */}
      <div className="relative z-[200] mt-10 flex items-center justify-center gap-2 sm:mt-14">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Carte précédente"
          className="mx-2 hidden h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white backdrop-blur transition hover:bg-white/20 md:flex"
        >
          ‹
        </button>
        {cards.map((c, i) => (
          <button
            key={c.key}
            type="button"
            onClick={() => go(wrapCard(i - active))}
            aria-label={`Afficher ${c.name}`}
            aria-current={i === active ? "true" : undefined}
            className="flex h-6 items-center"
          >
            <span
              className="block h-2 rounded-full transition-all duration-300"
              style={{ width: i === active ? 24 : 8, backgroundColor: i === active ? c.color : "rgba(255,255,255,0.3)" }}
            />
          </button>
        ))}
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Carte suivante"
          className="mx-2 hidden h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white backdrop-blur transition hover:bg-white/20 md:flex"
        >
          ›
        </button>
      </div>
    </div>
  );
}
