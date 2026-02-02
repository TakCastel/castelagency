"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

import { cn } from "@/lib/utils";

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const }
  })
};

export type SectionIntroProps = {
  /** Petit label au-dessus du titre (ex. "Ce qu'on fait", "Méthode") */
  label: string;
  /** Titre principal h2 */
  title: string;
  /** Paragraphe explicatif sous le titre */
  description: string;
  /** Classes sur le wrapper du bloc (label + titre + paragraphe) */
  className?: string;
  /** Classes pour l'alignement du texte (ex. "text-center lg:text-left") */
  textAlignClassName?: string;
  /** Si fourni, utilise cette valeur au lieu de useInView interne (pour partager le trigger avec le contenu de la section) */
  isInView?: boolean;
};

/**
 * Bloc réutilisable : label + titre h2 + paragraphe, avec animation d'apparition au scroll (stagger).
 * À utiliser en tête de section pour garder le même comportement partout.
 */
export function SectionIntro({
  label,
  title,
  description,
  className,
  textAlignClassName = "text-center lg:text-left",
  isInView: isInViewProp
}: SectionIntroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInViewFromHook = useInView(ref, { once: true, margin: "-80px" });
  const isInView = isInViewProp ?? isInViewFromHook;

  return (
    <div
      ref={ref}
      className={cn("relative z-10 py-6 md:py-8", className)}
    >
      <motion.p
        className={cn("text-small font-medium text-muted-foreground", textAlignClassName)}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        custom={0}
        variants={variants}
      >
        {label}
      </motion.p>
      <motion.h2
        className={cn("mt-2 text-balance text-titre-moyen font-semibold tracking-tight", textAlignClassName)}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        custom={1}
        variants={variants}
      >
        {title}
      </motion.h2>
      <motion.p
        className={cn("mt-4 text-pretty text-muted-foreground", textAlignClassName)}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        custom={2}
        variants={variants}
      >
        {description}
      </motion.p>
    </div>
  );
}
