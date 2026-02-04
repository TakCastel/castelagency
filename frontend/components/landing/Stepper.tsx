"use client";

import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Handle exposé par les icônes animées (CompassIcon, KeyboardIcon, etc.) */
type AnimatableIconHandle = { startAnimation: () => void; stopAnimation: () => void } | null;

export type StepperStep = {
  /** Icône Lucide ou composant animé (ex. CompassIcon) avec className + size optionnel */
  icon: LucideIcon | React.ComponentType<{ className?: string; size?: number }>;
  title: string;
  desc: string;
  /** Texte plus long pour le bloc desktop (optionnel, peut contenir du JSX pour <strong> etc.) */
  desktopWording?: React.ReactNode;
};

type StepperProps = {
  steps: StepperStep[];
  defaultExpandedIndex?: number | null;
  /** Mobile : "vertical" = étapes empilées avec ligne | "horizontal-scroll" = volets en scroll horizontal */
  mobileVariant?: "vertical" | "horizontal-scroll";
  /** CTA sur la dernière étape (desktop) */
  ctaHref?: string;
  ctaLabel?: string;
  className?: string;
};

export function Stepper({
  steps,
  defaultExpandedIndex = 0,
  mobileVariant = "vertical",
  ctaHref = "/devis",
  ctaLabel = "On travaille ensemble ?",
  className
}: StepperProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(defaultExpandedIndex ?? null);
  const isFirst = expandedIndex !== null && expandedIndex === 0;
  const isLast = expandedIndex !== null && expandedIndex === steps.length - 1;

  /** Refs pour déclencher l’animation des icônes au hover du bouton rond (cercle autour de l’icône). */
  const iconRefsRef = useRef<React.RefObject<AnimatableIconHandle>[]>([]);
  while (iconRefsRef.current.length < steps.length) {
    iconRefsRef.current.push(React.createRef<AnimatableIconHandle>());
  }

  /** Ne jamais désactiver : cliquer sur une étape la sélectionne (ou la garde active). */
  const selectStep = (i: number) => setExpandedIndex(i);

  const triggerIconAnimation = (i: number, start: boolean) => {
    const ref = iconRefsRef.current[i]?.current;
    if (ref && "startAnimation" in ref && "stopAnimation" in ref) {
      start ? ref.startAnimation() : ref.stopAnimation();
    }
  };

  /** true si l’étape i est déjà « validée » (avant l’étape courante). */
  const isCompleted = (i: number) => expandedIndex !== null && i < expandedIndex;
  const desktopRef = useRef<HTMLDivElement>(null);
  const isDesktopInView = useInView(desktopRef, { once: true, margin: "-60px" });
  const [hasContentAnimated, setHasContentAnimated] = useState(false);
  useEffect(() => {
    if (isDesktopInView && expandedIndex !== null) setHasContentAnimated(true);
  }, [isDesktopInView, expandedIndex]);

  const stepIndicatorVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.45, ease: "easeOut" as const }
    })
  };
  const contentBlockVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.25, duration: 0.5, ease: "easeOut" as const }
    }
  };

  const sharedStepContent = (
    step: StepperStep,
    i: number,
    isExpanded: boolean,
    completed: boolean,
    iconRef?: React.RefObject<AnimatableIconHandle>,
    onIconHoverStart?: () => void,
    onIconHoverEnd?: () => void
  ) => {
    const IconComponent = step.icon;
    return (
      <>
        <div
          className={cn(
            "mb-3 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border bg-background transition-colors md:mb-4",
            isExpanded && "border-primary/30 bg-primary/10",
            completed && "border-primary/30 bg-primary/10"
          )}
          onMouseEnter={onIconHoverStart}
          onMouseLeave={onIconHoverEnd}
        >
          {completed ? (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="flex items-center justify-center"
            >
              <Check className="h-5 w-5 text-primary" strokeWidth={2.5} />
            </motion.span>
          ) : (
            <IconComponent className="h-5 w-5 text-current" size={20} ref={iconRef as React.Ref<never>} />
          )}
        </div>
        <span className="block font-semibold tracking-tight">{step.title}</span>
        <motion.div
          layout
          initial={false}
          animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.28, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <p className="pt-2 text-small leading-relaxed text-muted-foreground md:pt-3">{step.desc}</p>
        </motion.div>
      </>
    );
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Mobile : stepper vertical (ligne à gauche, étapes empilées) */}
      {mobileVariant === "vertical" && (
      <div className="flex flex-col gap-0 md:hidden">
        {steps.map((step, i) => {
          const isExpanded = expandedIndex === i;
          const completed = isCompleted(i);
          const isLastStep = i === steps.length - 1;
          const iconRef = iconRefsRef.current[i];
          return (
            <div key={step.title} className="relative flex gap-4">
              {/* Ligne verticale : piste grise + remplissage jusqu’à l’étape courante */}
              {!isLastStep && (
                <div
                  className="absolute left-5 w-px bg-border"
                  style={{
                    top: "2.75rem",
                    height: "calc(100% - 2.75rem - 2.5rem - 0.25rem)",
                    minHeight: "8px",
                  }}
                  aria-hidden
                >
                  <motion.div
                    className="absolute left-0 top-0 w-full bg-primary"
                    initial={false}
                    animate={{
                      height: expandedIndex !== null && expandedIndex > i ? "100%" : "0%",
                    }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  />
                </div>
              )}
              {/* Cercle / icône — animation au hover du bouton rond uniquement */}
              <button
                type="button"
                aria-label={`Étape ${i + 1} : ${step.title}`}
                onClick={() => selectStep(i)}
                onMouseEnter={() => triggerIconAnimation(i, true)}
                onMouseLeave={() => triggerIconAnimation(i, false)}
                className={cn(
                  "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 bg-background transition-colors hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                  isExpanded ? "border-primary bg-primary/10" : completed ? "border-primary/30 bg-primary/10" : "border-border"
                )}
              >
                {completed ? (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="flex items-center justify-center"
                  >
                    <Check className="h-5 w-5 text-primary" strokeWidth={2.5} />
                  </motion.span>
                ) : (
                  <step.icon className="h-5 w-5 text-current" size={20} ref={iconRef as React.Ref<never>} />
                )}
              </button>
              {/* Contenu de l'étape */}
              <div className="min-w-0 flex-1 pb-6 pt-0.5">
                <button
                  type="button"
                  onClick={() => selectStep(i)}
                  className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:rounded-lg"
                >
                  <span className="font-semibold tracking-tight">{step.title}</span>
                </button>
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pt-2 text-small leading-relaxed text-muted-foreground">{step.desc}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
        {/* CTA mobile (vertical) */}
        <div className="mt-6 md:hidden">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href={ctaHref}>{ctaLabel}</Link>
          </Button>
        </div>
      </div>
      )}

      {/* Mobile : scroll horizontal (volets) — si mobileVariant === "horizontal-scroll" */}
      {mobileVariant === "horizontal-scroll" && (
      <div className="md:hidden">
        <div className="flex min-h-[260px] gap-2 overflow-x-auto overflow-y-hidden pb-2 scroll-smooth snap-x snap-mandatory lg:min-h-0">
          <AnimatePresence mode="popLayout" initial={false}>
            {steps.map((step, i) => (
              <motion.button
                key={step.title}
                type="button"
                layout
                onClick={() => selectStep(i)}
                className={cn(
                  "relative flex min-w-[160px] shrink-0 snap-center flex-col overflow-hidden rounded-xl border bg-card/50 p-4 text-left shadow-sm transition-colors hover:bg-card/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                  expandedIndex === i ? "w-[85vw] bg-card ring-2 ring-primary/20" : "w-[72vw]"
                )}
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute left-[-60px] top-[-60px] h-[160px] w-[160px] rounded-full bg-gradient-to-br from-muted-foreground/15 via-muted-foreground/5 to-transparent blur-2xl" />
                  <div className="absolute bottom-[-70px] right-[-70px] h-[180px] w-[180px] rounded-full bg-gradient-to-tr from-muted-foreground/12 via-muted-foreground/5 to-transparent blur-2xl" />
                </div>
                <div className="relative z-10 flex min-h-[200px] flex-col">
                  {sharedStepContent(step, i, expandedIndex === i, isCompleted(i), iconRefsRef.current[i], () => triggerIconAnimation(i, true), () => triggerIconAnimation(i, false))}
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
        {/* CTA mobile (horizontal-scroll) */}
        <div className="mt-6 flex justify-center">
          <Button asChild size="lg">
            <Link href={ctaHref}>{ctaLabel}</Link>
          </Button>
        </div>
      </div>
      )}

      {/* Desktop : stepper horizontal (ligne + indicateurs, contenu en dessous) — apparitions animées */}
      <div ref={desktopRef} className="hidden md:block">
        {/* Indicateurs cliquables + traits de liaison qui se remplissent */}
        <div className="flex w-full items-start">
          {steps.map((step, i) => {
            const isExpanded = expandedIndex === i;
            const completed = isCompleted(i);
            return (
              <React.Fragment key={step.title}>
                {/* Trait de liaison à gauche (sauf pour la première bulle) */}
                {i > 0 && (
                  <div
                    className="relative flex flex-1 items-center px-1"
                    style={{ marginTop: "1.5rem", height: "4px" }}
                    aria-hidden
                  >
                    <div className="absolute inset-0 rounded-full bg-border" />
                    <motion.div
                      className="absolute left-0 top-0 h-full rounded-full bg-primary"
                      initial={false}
                      animate={{ width: completed || isExpanded ? "100%" : "0%" }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                    />
                  </div>
                )}
                <motion.div
                  className="flex flex-1 flex-col items-center"
                  initial="hidden"
                  animate={isDesktopInView ? "visible" : "hidden"}
                  custom={i}
                  variants={stepIndicatorVariants}
                >
                  {/* Bouton rond : animation au hover du cercle uniquement */}
                  <button
                    type="button"
                    aria-label={`Étape ${i + 1} : ${step.title}`}
                    onClick={() => selectStep(i)}
                    onMouseEnter={() => triggerIconAnimation(i, true)}
                    onMouseLeave={() => triggerIconAnimation(i, false)}
                    className={cn(
                      "flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 bg-background transition-colors hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 md:h-14 md:w-14",
                      isExpanded ? "border-primary bg-primary/10" : completed ? "border-primary/30 bg-primary/10" : "border-border"
                    )}
                  >
                    {completed ? (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className="flex items-center justify-center"
                      >
                        <Check className="h-6 w-6 text-primary md:h-7 md:w-7" strokeWidth={2.5} />
                      </motion.span>
                    ) : (
                      <step.icon className="h-5 w-5 md:h-6 md:w-6 text-current" size={24} ref={iconRefsRef.current[i] as React.Ref<never>} />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => selectStep(i)}
                    className={cn(
                      "mt-3 text-center text-small font-semibold transition-colors hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:rounded",
                      isExpanded ? "text-foreground" : completed ? "text-foreground/90" : "text-muted-foreground"
                    )}
                  >
                    {step.title}
                  </button>
                </motion.div>
              </React.Fragment>
            );
          })}
        </div>
        {/* Contenu de l'étape sélectionnée + wording + boutons — apparition en stagger */}
        <AnimatePresence mode="wait" initial={false}>
          {expandedIndex !== null && (
            <motion.div
              key={expandedIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.25, ease: "easeOut" }
              }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="mt-6"
            >
              <motion.div
                className="relative overflow-hidden rounded-xl border bg-card/50 p-5 shadow-sm md:p-6"
                initial={hasContentAnimated ? false : "hidden"}
                animate={isDesktopInView ? "visible" : "hidden"}
                variants={contentBlockVariants}
              >
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-[-80px] top-[-80px] h-[200px] w-[200px] rounded-full bg-gradient-to-br from-muted-foreground/15 via-muted-foreground/5 to-transparent blur-2xl" />
                <div className="absolute bottom-[-90px] right-[-90px] h-[220px] w-[220px] rounded-full bg-gradient-to-tr from-muted-foreground/12 via-muted-foreground/5 to-transparent blur-2xl" />
              </div>
              <div className="relative z-10 space-y-4 text-small leading-relaxed text-muted-foreground [&_strong]:text-foreground/85">
                {typeof (steps[expandedIndex].desktopWording ?? steps[expandedIndex].desc) === "string" ? (
                  <p className="whitespace-pre-line">
                    {steps[expandedIndex].desktopWording ?? steps[expandedIndex].desc}
                  </p>
                ) : (
                  steps[expandedIndex].desktopWording ?? steps[expandedIndex].desc
                )}
              </div>
              {/* Étape précédente à gauche / Étape suivante ou CTA à droite — même taille */}
              <div className="relative z-10 mt-6 flex justify-between items-center gap-3">
                <div>
                  {!isFirst && (
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      onClick={() => setExpandedIndex(expandedIndex - 1)}
                      className="gap-2"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Étape précédente
                    </Button>
                  )}
                </div>
                <div>
                  {!isLast && (
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      onClick={() => setExpandedIndex(expandedIndex + 1)}
                      className="gap-2"
                    >
                      Étape suivante
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  )}
                  {isLast && (
                    <Button asChild size="lg" className="gap-2">
                      <Link href={ctaHref}>{ctaLabel}</Link>
                    </Button>
                  )}
                </div>
              </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
