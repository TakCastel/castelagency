"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Variants } from "motion/react";
import { motion } from "motion/react";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";

const TITLE = "Studio Castel";
const BASE_DURATION = 0.2;
const DELAY_PER_LETTER = 0.07;
const RANDOM_DELAY_SPREAD = 0.08;
const NUM_LETTER_VARIANTS = 10;

/** Pseudo-aléatoire déterministe (même résultat serveur/client) pour éviter l’erreur d’hydratation */
function deterministicVariantIndex(i: number) {
  return (i * 7 + 3) % NUM_LETTER_VARIANTS;
}
function deterministicDelayOffset(i: number) {
  return (((i * 11 + 5) % 100) / 100 - 0.5) * 2 * RANDOM_DELAY_SPREAD;
}

const SUBTITLE_DELAY = Math.floor(TITLE.length * 0.5) * DELAY_PER_LETTER;
const SUBTITLE_DURATION = 0.4;
/** Le reste (paragraphe + boutons) s’enclenche à la moitié de l’animation du titre */
const REST_DELAY = Math.floor(TITLE.length * 0.5) * DELAY_PER_LETTER;
const REST_DURATION = 0.5;

function transitionWithDelay(delay: number, overrides?: { duration?: number; ease?: number[] }) {
  return {
    delay,
    duration: overrides?.duration ?? BASE_DURATION,
    ease: (overrides?.ease ?? [0.22, 1, 0.36, 1]) as [number, number, number, number],
  };
}

// Plusieurs effets d'apparition : chaque lettre en reçoit un au hasard (fouilli / chaotique)
const LETTER_VARIANTS: Variants[] = [
  {
    hidden: { opacity: 0, scale: 0.2 },
    visible: (delay: number) => ({
      opacity: 1,
      scale: 1,
      transition: transitionWithDelay(delay, { duration: 0.28 }),
    }),
  },
  {
    hidden: { opacity: 0, y: 24, rotate: -12 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: { ...transitionWithDelay(delay), type: "spring" as const, stiffness: 200, damping: 14 },
    }),
  },
  {
    hidden: { opacity: 0, y: -20, rotate: 8 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: transitionWithDelay(delay, { duration: 0.24 }),
    }),
  },
  {
    hidden: { opacity: 0, scaleX: 0, transformOrigin: "center" },
    visible: (delay: number) => ({
      opacity: 1,
      scaleX: 1,
      transition: transitionWithDelay(delay, { duration: 0.22 }),
    }),
  },
  {
    hidden: { opacity: 0, rotateY: -75 },
    visible: (delay: number) => ({
      opacity: 1,
      rotateY: 0,
      transition: transitionWithDelay(delay, { duration: 0.26 }),
    }),
  },
  {
    hidden: { opacity: 0, scale: 1.4 },
    visible: (delay: number) => ({
      opacity: 1,
      scale: 1,
      transition: transitionWithDelay(delay),
    }),
  },
  {
    hidden: { opacity: 0, x: -16, rotate: 5 },
    visible: (delay: number) => ({
      opacity: 1,
      x: 0,
      rotate: 0,
      transition: transitionWithDelay(delay, { duration: 0.2 }),
    }),
  },
  {
    hidden: { opacity: 0, x: 12, rotate: -6 },
    visible: (delay: number) => ({
      opacity: 1,
      x: 0,
      rotate: 0,
      transition: { ...transitionWithDelay(delay), type: "spring" as const, stiffness: 180, damping: 12 },
    }),
  },
  {
    hidden: { opacity: 0, y: 14, scale: 0.7 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: transitionWithDelay(delay, { ease: [0.34, 1.56, 0.64, 1] }),
    }),
  },
  {
    hidden: { opacity: 0, rotate: 90 },
    visible: (delay: number) => ({
      opacity: 1,
      rotate: 0,
      transition: transitionWithDelay(delay, { duration: 0.24 }),
    }),
  },
];


export function Hero() {
  const { variantIndices, delays } = useMemo(() => {
    const chars = TITLE.split("");
    return {
      variantIndices: chars.map((_, i) => deterministicVariantIndex(i)),
      delays: chars.map(
        (_, i) => i * DELAY_PER_LETTER + deterministicDelayOffset(i)
      ),
    };
  }, []);

  return (
    <section className="relative -mt-20 overflow-hidden md:-mt-24" style={{ minHeight: "100svh" }}>
      <div className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src="/assets/illustrations/hero-background.png"
          alt=""
          aria-hidden
          fill
          className="object-cover opacity-45 blur-xs shadow-[0_0_100px_rgba(0,0,0,0.5)]"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      </div>

      {/* Contenu centré sur toute la largeur de la section (sans padding container) */}
      <div className="absolute inset-0 flex min-h-0 items-center justify-center py-12 md:py-16">
        <div className="w-full max-w-2xl flex flex-col items-center justify-center gap-0 text-center px-3 sm:px-6">
          {/* Bloc titre : largeur fixe centrée → ne bouge jamais */}
          {/* Titre : centrage fixe avec left 50% + translateX(-50%), chaque caractère (y compris l’espace) en cellule de largeur fixe */}
          <h1
            className="text-foreground w-[14ch] whitespace-nowrap text-center"
            style={{
              fontFamily: "var(--font-outfit), ui-sans-serif, system-ui, sans-serif",
              fontSize: "clamp(1.2rem, 8vw, 6.5rem)",
            }}
          >
              {TITLE.split("").map((char, i) => (
                <span
                  key={`cell-${i}`}
                  className="inline-block align-middle"
                  style={{ width: char === " " ? "0.35em" : undefined, minWidth: char === " " ? "0.35em" : undefined }}
                >
                  <motion.span
                    className="inline-block will-change-transform"
                    variants={LETTER_VARIANTS[variantIndices[i]]}
                    initial="hidden"
                    animate="visible"
                    custom={delays[i]}
                    style={{ whiteSpace: char === " " ? "pre" : "normal" }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                </span>
              ))}
          </h1>

          <motion.span
              className="mt-2 block text-titre-petit font-medium text-foreground/90 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: SUBTITLE_DELAY, duration: SUBTITLE_DURATION, ease: [0.22, 1, 0.36, 1] }}
            >
              Création d’expériences web
          </motion.span>

          <motion.p
            className="mt-4 text-pretty text-paragraphe text-foreground/85 text-center"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ delay: REST_DELAY, duration: REST_DURATION, ease: [0.22, 1, 0.36, 1] }}
          >
            Design sur mesure, SEO, création d’applications, conception de systèmes de gamification. À Avignon et en remote.
          </motion.p>

          <motion.div
            className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ delay: REST_DELAY + 0.1, duration: REST_DURATION, ease: [0.22, 1, 0.36, 1] }}
          >
            <Button size="lg" asChild>
              <Link href="/devis">
                Demander un devis <ArrowRight />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#features">Voir mes services</a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
