"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

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
    "inset 0 2px 0 rgba(255,255,255,0.45)",
    "inset 0 0 0 1px rgba(255,255,255,0.18)",
    "inset 0 -14px 28px rgba(0,0,0,0.16)",
    `0 8px 0 color-mix(in srgb, ${color} 62%, black)`,
    "0 34px 60px rgba(0,0,0,0.5)",
  ].join(", ");

/** Écart horizontal entre deux cartes, en fraction de la largeur d'une carte (plus large en desktop). */
const STEP_MOBILE = 0.62;
const STEP_DESKTOP = 0.8;
const EASE = "transform 520ms cubic-bezier(.22,1,.36,1), opacity 400ms ease, filter 400ms ease";

/**
 * Carrousel 3D en boucle (coverflow) : la carte active est de face, les autres
 * pivotent et reculent de chaque côté. Swipe au doigt, glisser à la souris,
 * flèches du clavier, boutons, clic sur une carte latérale pour l'amener au centre.
 */
export function HeroCarousel({ cards, initial = 0 }: { cards: CarouselCard[]; initial?: number }) {
  const n = cards.length;
  const half = n / 2;
  const [pos, setPos] = useState(initial); // index actif, non borné (boucle)
  const [drag, setDrag] = useState(0); // déplacement en cours, en px
  const [dragging, setDragging] = useState(false);
  const [STEP, setStep] = useState(STEP_MOBILE);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const prevOffsets = useRef<number[]>([]);
  const suppressClick = useRef(false);
  const gesture = useRef<{ x: number; y: number; t: number; locked: boolean | null } | null>(null);

  const active = ((pos % n) + n) % n;
  const stepRef = useRef(STEP);
  stepRef.current = STEP;
  const stepPx = () => (stageRef.current?.offsetWidth ?? 300) * stepRef.current;

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setStep(mq.matches ? STEP_DESKTOP : STEP_MOBILE);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  const wrap = (x: number) => ((((x + half) % n) + n) % n) - half;
  const frac = dragging ? drag / stepPx() : 0;
  const offsets = cards.map((_, i) => wrap(i - pos + frac));

  const go = useCallback((delta: number) => setPos((p) => p + delta), []);

  // Une carte qui passe d'un bord à l'autre ne doit pas traverser l'écran :
  // on coupe sa transition le temps de la téléporter.
  useLayoutEffect(() => {
    offsets.forEach((d, i) => {
      const prev = prevOffsets.current[i];
      const el = cardRefs.current[i];
      if (el && prev !== undefined && Math.abs(d - prev) > half) {
        el.style.transition = "none";
        void el.offsetWidth;
        requestAnimationFrame(() => {
          el.style.transition = dragging ? "none" : EASE;
        });
      }
    });
    prevOffsets.current = offsets;
  });

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
      suppressClick.current = true;
      setTimeout(() => (suppressClick.current = false), 0);
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
  }, []);

  return (
    <div
      className="relative mx-auto mt-2 overflow-x-clip pb-10 pt-8 sm:pb-24"
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
        className="relative mx-auto touch-pan-y select-none [perspective:1100px] md:[perspective:1600px]"
        onPointerDown={(e) => {
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
          {cards.map((c, i) => {
            const d = offsets[i];
            const ad = Math.abs(d);
            const isActive = i === active && !dragging;
            const ry = -Math.max(-1.4, Math.min(1.4, d)) * 32;
            const tz = -Math.min(ad, 2.5) * 150;
            const ty = Math.min(ad, 2.5) * 10;
            const opacity = ad > 2 ? Math.max(0, 1 - (ad - 2) * 2) : 1;
            return (
              <Link
                key={c.key}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                href={c.href}
                draggable={false}
                tabIndex={i === active ? 0 : -1}
                aria-label={isActive ? `${c.name} : en savoir plus` : `Afficher ${c.name}`}
                aria-current={isActive ? "true" : undefined}
                onClick={(e) => {
                  if (suppressClick.current) return e.preventDefault();
                  if (i !== active) {
                    e.preventDefault();
                    go(wrap(i - pos));
                  }
                }}
                style={{
                  transform: `translateX(${d * STEP * 100}%) translateY(${ty}px) translateZ(${tz}px) rotateY(${ry}deg)`,
                  zIndex: 100 - Math.round(ad * 10),
                  opacity,
                  filter: `brightness(${1 - Math.min(ad, 2) * 0.12})`,
                  transition: dragging ? "none" : EASE,
                  backgroundColor: c.color,
                  backgroundImage: `${gloss}, ${stripes}`,
                  boxShadow: depth(c.color),
                  pointerEvents: opacity < 0.2 ? "none" : undefined,
                }}
                className="group absolute inset-0 overflow-hidden rounded-[22px] motion-reduce:!transition-none sm:rounded-[32px]"
              >
                <div className={`relative z-10 p-4 sm:p-5 ${d > 0.5 ? "text-right" : ""}`}>
                  <span className="block font-display text-2xl font-bold leading-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)] sm:text-3xl lg:text-[34px]">
                    {c.name}
                  </span>
                  <p className="mt-0.5 text-xs font-medium text-white/90 sm:text-sm">{c.genre}</p>
                  <span className={`mt-3 hidden items-center gap-1.5 rounded-full bg-black/35 px-3 py-1 text-xs font-medium text-white sm:inline-flex ${d > 0.5 ? "flex-row-reverse" : ""}`}>
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
                      priority={i === initial}
                      sizes="(min-width: 1024px) 330px, 52vw"
                      className={`object-contain ${d > 0.5 ? "object-right-bottom" : d < -0.5 ? "object-left-bottom" : "object-bottom"} drop-shadow-[0_12px_24px_rgba(0,0,0,0.25)]`}
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
              </Link>
            );
          })}
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
            onClick={() => go(wrap(i - pos))}
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
