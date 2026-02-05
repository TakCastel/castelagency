"use client";

import Image from "next/image";
import Link from "next/link";

import { BLUR_DATA_URL } from "@/lib/image-placeholder";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";

const TITLE = "Studio Castel";

/** Courbe cubic-bezier (ease-out) pour les animations hero. */
const easeOut = [0.22, 1, 0.36, 1] as const;

/** Effets d’entrée variés sans déplacement (évite que les lettres se chevauchent). */
const letterEffects = [
  { hidden: { opacity: 0, scale: 0.5 }, visible: { opacity: 1, scale: 1 } },
  { hidden: { opacity: 0, scale: 0.6 }, visible: { opacity: 1, scale: 1 } },
  { hidden: { opacity: 0, rotate: -14 }, visible: { opacity: 1, rotate: 0 } },
  { hidden: { opacity: 0, rotate: 14 }, visible: { opacity: 1, rotate: 0 } },
  { hidden: { opacity: 0, scale: 0.4 }, visible: { opacity: 1, scale: 1 } },
  { hidden: { opacity: 0, rotate: -8, scale: 0.7 }, visible: { opacity: 1, rotate: 0, scale: 1 } },
  { hidden: { opacity: 0, rotate: 8, scale: 0.75 }, visible: { opacity: 1, rotate: 0, scale: 1 } },
  { hidden: { opacity: 0 }, visible: { opacity: 1 } },
] as const;

/** Variants par lettre : on choisit un effet selon l’index et on applique un stagger. */
function getLetterVariants(effectIndex: number) {
  const effect = letterEffects[effectIndex % letterEffects.length];
  return {
    hidden: effect.hidden,
    visible: (i: number) => ({
      ...effect.visible,
      transition: {
        delay: i * 0.032,
        duration: 0.42,
        ease: easeOut,
      },
    }),
  };
}

const subtitleVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delay: 0.25, duration: 0.35, ease: easeOut },
  },
};

const restVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delay: 0.45, duration: 0.4, ease: easeOut },
  },
};

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative -mt-40 overflow-hidden md:-mt-48" style={{ minHeight: "100svh" }} aria-label="Accueil Studio Castel">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src="/assets/illustrations/hero-background.png"
          alt=""
          aria-hidden
          fill
          className="object-cover opacity-45 blur-xs shadow-[0_0_100px_rgba(0,0,0,0.5)]"
          sizes="(max-width: 768px) 100vw, 100vw"
          priority
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          quality={75}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      </div>

      <div className="absolute inset-0 flex min-h-0 items-center justify-center pt-40 py-12 md:pt-0 md:py-16">
        <div className="w-full max-w-2xl flex flex-col items-center justify-center gap-0 text-center px-3 sm:px-6">
          <h1
            className="text-foreground w-[14ch] whitespace-nowrap text-center"
            style={{
              fontFamily: "var(--font-outfit), ui-sans-serif, system-ui, sans-serif",
              fontSize: "clamp(1.2rem, 8vw, 6.5rem)",
            }}
          >
            {reduceMotion ? (
              TITLE
            ) : (
              <>
                {TITLE.split("").map((letter, i) => (
                  <motion.span
                    key={`${letter}-${i}`}
                    className="inline-block"
                    variants={getLetterVariants(i)}
                    initial="hidden"
                    animate="visible"
                    custom={i}
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                ))}
              </>
            )}
          </h1>

          {reduceMotion ? (
            <span className="mt-2 block text-titre-petit font-medium text-foreground/90 text-center">
              Agence web à Avignon
            </span>
          ) : (
            <motion.span
              className="mt-2 block text-titre-petit font-medium text-foreground/90 text-center"
              variants={subtitleVariants}
              initial="hidden"
              animate="visible"
            >
              Agence web à Avignon
            </motion.span>
          )}

          {reduceMotion ? (
            <p className="mt-4 text-pretty text-paragraphe text-foreground/85 text-center">
              Agence web Avignon : design sur mesure, SEO, création d’applications et de sites. À Avignon, en Vaucluse et en remote.
            </p>
          ) : (
            <motion.p
              className="mt-4 text-pretty text-paragraphe text-foreground/85 text-center"
              variants={restVariants}
              initial="hidden"
              animate="visible"
            >
              Agence web Avignon : design sur mesure, SEO, création d’applications et de sites. À Avignon, en Vaucluse et en remote.
            </motion.p>
          )}

          {reduceMotion ? (
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" asChild>
                <Link href="/devis">
                  Demander un devis <ArrowRight />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#features">Voir mes services</a>
              </Button>
            </div>
          ) : (
            <motion.div
              className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
              variants={restVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.5, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
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
          )}
        </div>
      </div>
    </section>
  );
}
