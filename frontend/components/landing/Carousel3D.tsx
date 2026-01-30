"use client";

import { useCallback, useRef, useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Building2,
  ChevronLeft,
  ChevronRight,
  Rocket,
  Scale,
  Users,
  Wrench,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ICON_MAP = {
  wrench: Wrench,
  scale: Scale,
  building2: Building2,
  users: Users,
  rocket: Rocket,
} as const;

export type Carousel3DItem = {
  icon: keyof typeof ICON_MAP;
  title: string;
  desc: string;
};

const RADIUS = 280;
const PERSPECTIVE = 1600;

/** Index modulo n, toujours dans [0, n-1]. */
function mod(i: number, n: number): number {
  return ((i % n) + n) % n;
}

interface Carousel3DProps {
  items: Carousel3DItem[];
  className?: string;
}

export function Carousel3D({ items, className }: Carousel3DProps) {
  const n = items.length;
  const angleStep = n > 0 ? 360 / n : 0;

  // Rotation en degrés : toujours dans le même sens (next = -angleStep, prev = +angleStep).
  // On garde la valeur dans ]-360, 0] et on normalise sans animation pour éviter les sauts.
  const [rotationDeg, setRotationDeg] = useState(0);
  const [skipTransition, setSkipTransition] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [dragOffsetDeg, setDragOffsetDeg] = useState(0);
  const nRef = useRef(n);
  nRef.current = n;
  const dragStartRef = useRef({ x: 0, rotation: 0 });
  const didDragRef = useRef(false);
  const PIXELS_PER_DEG = 2.5;

  const displayRotation = rotationDeg + dragOffsetDeg;
  const currentIndex = mod(Math.round(-displayRotation / angleStep), n);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (isTransitioning) return;
      didDragRef.current = false;
      dragStartRef.current = { x: e.clientX, rotation: rotationDeg };
      setDragOffsetDeg(0);
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    },
    [isTransitioning, rotationDeg]
  );

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (e.buttons !== 1) return;
    const { x } = dragStartRef.current;
    const deltaPx = e.clientX - x;
    if (Math.abs(deltaPx) > 5) didDragRef.current = true;
    const deltaDeg = deltaPx / PIXELS_PER_DEG;
    setDragOffsetDeg(deltaDeg);
  }, []);

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
      const totalRotation = rotationDeg + dragOffsetDeg;
      let normalized = totalRotation;
      while (normalized <= -360) normalized += 360;
      while (normalized > 0) normalized -= 360;
      const targetIndex = mod(Math.round(-normalized / angleStep), nRef.current);
      const snappedRotation = -(targetIndex * angleStep);
      let snapped = snappedRotation;
      while (snapped <= -360) snapped += 360;
      while (snapped > 0) snapped -= 360;
      setSkipTransition(false);
      setRotationDeg(snapped);
      setDragOffsetDeg(0);
      setTimeout(() => {
        didDragRef.current = false;
      }, 0);
    },
    [angleStep, rotationDeg, dragOffsetDeg]
  );

  const goNext = useCallback(() => {
    if (nRef.current === 0 || isTransitioning) return;
    setIsTransitioning(true);
    setRotationDeg((prev) => prev - angleStep);
    setTimeout(() => {
      setIsTransitioning(false);
      setSkipTransition(false);
      setRotationDeg((prev) => {
        if (prev <= -360) {
          setSkipTransition(true);
          return prev + 360;
        }
        return prev;
      });
    }, 450);
  }, [angleStep, isTransitioning]);

  const goPrev = useCallback(() => {
    if (nRef.current === 0 || isTransitioning) return;
    setIsTransitioning(true);
    setRotationDeg((prev) => prev + angleStep);
    setTimeout(() => {
      setIsTransitioning(false);
      setSkipTransition(false);
      setRotationDeg((prev) => {
        if (prev > 0) {
          setSkipTransition(true);
          return prev - 360;
        }
        return prev;
      });
    }, 450);
  }, [angleStep, isTransitioning]);

  // Clic sur une carte : toujours tourner dans le même sens (toujours "next" = sens négatif).
  const goTo = useCallback(
    (index: number) => {
      if (nRef.current === 0 || isTransitioning || didDragRef.current) return;
      const target = mod(index, nRef.current);
      const steps = (target - currentIndex + nRef.current) % nRef.current;
      if (steps === 0) return;
      setIsTransitioning(true);
      setRotationDeg((prev) => {
        const next = prev - steps * angleStep;
        if (next <= -360 || next > 0) setSkipTransition(true);
        let normalized = next;
        while (normalized <= -360) normalized += 360;
        while (normalized > 0) normalized -= 360;
        return normalized;
      });
      setTimeout(() => {
        setIsTransitioning(false);
        setSkipTransition(false);
      }, 450);
    },
    [angleStep, currentIndex, n, isTransitioning]
  );

  return (
    <div className={cn("relative", className)}>
      <div
        className="relative mx-auto flex min-h-[380px] cursor-grab active:cursor-grabbing items-center justify-center overflow-hidden py-8"
        style={{ perspective: PERSPECTIVE }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <motion.div
          className="relative h-[280px] w-full max-w-[320px] touch-none select-none"
          style={{
            perspectiveOrigin: "50% 50%",
            transformStyle: "preserve-3d",
            width: "100%",
            maxWidth: 320,
          }}
          initial={false}
          animate={{
            rotateY: displayRotation,
          }}
          transition={
            skipTransition
              ? { duration: 0 }
              : { type: "spring", stiffness: 80, damping: 24 }
          }
        >
          {items.map((item, i) => {
            const angle = i * angleStep;
            const isCenter = i === currentIndex;
            return (
              <div
                key={item.title}
                className="absolute left-1/2 top-1/2 w-[280px] max-w-[90vw] cursor-pointer"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${RADIUS}px)`,
                  backfaceVisibility: "hidden",
                  zIndex: isCenter ? 10 : 1,
                }}
                onClick={() => goTo(i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    goTo(i);
                  }
                }}
                aria-label={`Voir ${item.title}`}
              >
                <motion.div
                  animate={{
                    scale: isCenter ? 1.05 : 0.88,
                    z: isCenter ? 0 : -40,
                  }}
                  transition={{ type: "spring", stiffness: 80, damping: 24 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <Card
                    className={cn(
                      "h-full border-muted bg-muted/30 transition-shadow",
                      isCenter &&
                        "border-primary/30 bg-background/95 shadow-xl ring-2 ring-primary/20"
                    )}
                  >
                    <CardHeader className="pb-2">
                      <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg border bg-background">
                        {(() => {
                          const IconComponent = ICON_MAP[item.icon];
                          return IconComponent ? (
                            <IconComponent className="h-5 w-5 text-muted-foreground" />
                          ) : null;
                        })()}
                      </div>
                      <CardTitle className="text-base">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-small text-muted-foreground text-pretty line-clamp-3">
                        {item.desc}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={goPrev}
          disabled={isTransitioning}
          aria-label="Précédent"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div className="flex gap-2" role="tablist" aria-label="Cartes du carousel">
          {items.map((item, i) => (
            <button
              key={item.title}
              type="button"
              role="tab"
              aria-selected={i === currentIndex}
              aria-label={`Carte ${i + 1}: ${item.title}`}
              onClick={() => goTo(i)}
              className={cn(
                "h-2.5 w-2.5 rounded-full transition-colors",
                i === currentIndex
                  ? "bg-primary scale-125"
                  : "bg-muted-foreground/40 hover:bg-muted-foreground/60"
              )}
            />
          ))}
        </div>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={goNext}
          disabled={isTransitioning}
          aria-label="Suivant"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
