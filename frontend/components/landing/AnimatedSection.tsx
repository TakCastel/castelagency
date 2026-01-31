"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";

/** Mêmes variantes que SectionIntro / FeatureGrid sur la page d'accueil. */
const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (opts: { delay: number; reducedMotion: boolean }) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: opts.reducedMotion ? 0 : opts.delay * 0.1,
      duration: opts.reducedMotion ? 0 : 0.5,
      ease: "easeOut" as const,
    },
  }),
};

type AnimatedSectionProps = {
  children: React.ReactNode;
  /** Délai (multiplicateur) pour l'animation. */
  delay?: number;
  className?: string;
};

/**
 * Enveloppe du contenu et anime l'apparition au scroll (fade-in + slide up).
 * Respecte prefers-reduced-motion.
 */
export function AnimatedSection({
  children,
  delay = 0,
  className,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const onChange = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      custom={{ delay, reducedMotion: prefersReducedMotion }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
