"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export type PageHeroProps = {
  /** Petit label au-dessus du titre (ex. "Blog", "Mes créations"). Ignoré si backLink est fourni. */
  label?: string;
  /** Lien « retour » au-dessus du titre (ex. "Retour aux créations"). Prioritaire sur label. */
  backLink?: { href: string; label: string };
  /** Titre principal (h1) */
  title: string;
  /** Paragraphe de description sous le titre */
  description: string;
  /** Accessibilité : aria-label de la section */
  ariaLabel: string;
  /** Image de fond (défaut : hero commun) */
  imageSrc?: string;
  /** Hauteur minimale du hero : "default" (50vh) ou "tall" (75vh) */
  minHeight?: "default" | "tall";
  /** Padding du contenu : "default" ou "studio" (le-studio) */
  contentPadding?: "default" | "studio";
  /** Taille du titre : "default" (moyen/gros) ou "small" (petit) */
  titleSize?: "default" | "small";
};

const MIN_HEIGHT_CLASS = {
  default: "min-h-[50vh]",
  tall: "min-h-[75vh]",
} as const;

const CONTENT_PADDING_CLASS = {
  default: "pb-12 pt-12 md:pb-16 md:pt-16",
  studio: "pb-16 pt-12 md:pb-20 md:pt-16",
} as const;

/** Vitesse du parallax : le contenu monte plus vite que le scroll (multiplicateur). */
const PARALLAX_OFFSET_PX = 200;

export function PageHero({
  label,
  backLink,
  title,
  description,
  ariaLabel,
  imageSrc = "/assets/illustrations/hero-background.png",
  minHeight = "default",
  contentPadding = "default",
  titleSize = "default",
}: PageHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const onChange = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -PARALLAX_OFFSET_PX]
  );

  const topLine = backLink ? (
    <Link
      href={backLink.href}
      className="text-small font-medium text-muted-foreground hover:text-foreground inline-flex items-center gap-1 transition-colors"
    >
      <ArrowLeft className="h-3.5 w-3.5 shrink-0" aria-hidden />
      {backLink.label}
    </Link>
  ) : label ? (
    <p className="text-small font-medium text-muted-foreground">{label}</p>
  ) : null;

  return (
    <section
      ref={sectionRef}
      className={`relative -mt-20 flex flex-col justify-end overflow-hidden md:-mt-24 ${MIN_HEIGHT_CLASS[minHeight]}`}
      aria-label={ariaLabel}
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src={imageSrc}
          alt=""
          fill
          className="object-cover object-center opacity-50"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
      </div>

      <motion.div
        className={`container flex flex-col justify-end ${CONTENT_PADDING_CLASS[contentPadding]}`}
        style={prefersReducedMotion ? undefined : { y: parallaxY }}
      >
        <motion.div
          initial={
            prefersReducedMotion
              ? false
              : { opacity: 0, y: 24 }
          }
          animate={
            prefersReducedMotion
              ? undefined
              : { opacity: 1, y: 0 }
          }
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: 0.5, ease: "easeOut" }
          }
        >
          {topLine}
          <h1
            className={
              titleSize === "small"
                ? "mt-2 text-balance text-titre-petit font-semibold tracking-tight text-foreground"
                : "mt-2 text-balance text-titre-moyen font-semibold tracking-tight text-foreground md:text-titre-gros"
            }
          >
            {title}
          </h1>
          <p className="mt-3 max-w-2xl text-paragraphe text-muted-foreground text-pretty">
            {description}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
