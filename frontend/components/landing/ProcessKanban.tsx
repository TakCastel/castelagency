"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, GripVertical, Hand } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const springTransition = {
  type: "spring" as const,
  stiffness: 400,
  damping: 30
};

const layoutTransition = {
  type: "spring" as const,
  stiffness: 350,
  damping: 30
};

const COLUMN_MIN_WIDTH = 260;
const COLUMN_GAP = 20;
const NUM_COLUMNS = 7;

const COLUMNS: {
  id: string;
  columnTitle: string;
  ticketLabel: string;
  description?: string;
}[] = [
  {
    id: "contact",
    columnTitle: "Premier échange",
    ticketLabel: "Prise de contact (1h gratuite)",
    description: "Premier échange pour comprendre votre projet"
  },
  {
    id: "planning",
    columnTitle: "Objectifs",
    ticketLabel: "Planning & cadrage",
    description: "Objectifs, cible, arborescence, plan de contenu"
  },
  {
    id: "acompte",
    columnTitle: "Paiement initial",
    ticketLabel: "Acompte 40 %",
    description: "Je ne démarre pas les maquettes sans un acompte de 40 %"
  },
  {
    id: "maquettes",
    columnTitle: "Conception",
    ticketLabel: "Maquettes",
    description: "Wireframes, UI, validation visuelle"
  },
  {
    id: "livrable",
    columnTitle: "Développement",
    ticketLabel: "Livrable",
    description: "Développement, intégration, mise en ligne"
  },
  {
    id: "retour",
    columnTitle: "Retours client",
    ticketLabel: "Retours & validation",
    description: "Ajustements, validation client"
  },
  {
    id: "facture",
    columnTitle: "Clôture",
    ticketLabel: "Envoi de la facture",
    description: "Envoi de la facture"
  }
];

function createInitialCompleted(): (number | null)[] {
  return Array(NUM_COLUMNS).fill(null);
}

const TOTAL_CONTENT_WIDTH =
  NUM_COLUMNS * COLUMN_MIN_WIDTH + (NUM_COLUMNS - 1) * COLUMN_GAP;

function getTranslateXForCenteredColumn(
  viewportWidth: number,
  columnIndex: number
): number {
  const centerOfColumn =
    columnIndex * (COLUMN_MIN_WIDTH + COLUMN_GAP) + COLUMN_MIN_WIDTH / 2;
  const targetX = viewportWidth / 2 - centerOfColumn;
  const minX = viewportWidth - TOTAL_CONTENT_WIDTH;
  return Math.max(minX, Math.min(0, targetX));
}

export function ProcessKanban() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [completedByColumn, setCompletedByColumn] = useState<(number | null)[]>(
    createInitialCompleted
  );
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [dragOverColumn, setDragOverColumn] = useState<number | null>(null);
  const [showDragHint, setShowDragHint] = useState(true);
  const [dragScrollToNext, setDragScrollToNext] = useState(false);
  const pointerStartRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    let rafId: number = 0;
    const ro = new ResizeObserver(() => {
      rafId = requestAnimationFrame(() => {
        if (el) setViewportWidth(el.clientWidth);
      });
    });
    ro.observe(el);
    rafId = requestAnimationFrame(() => setViewportWidth(el.clientWidth));
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, []);

  const canvasTranslateX = useMemo(
    () => (viewportWidth > 0 ? getTranslateXForCenteredColumn(viewportWidth, currentStepIndex) : 0),
    [viewportWidth, currentStepIndex]
  );

  const nextColumnIndex = currentStepIndex + 1;
  const canDropInColumn = nextColumnIndex < NUM_COLUMNS;

  const effectiveTranslateX = useMemo(() => {
    if (!viewportWidth || !isDragging || !canDropInColumn || !dragScrollToNext) return canvasTranslateX;
    return getTranslateXForCenteredColumn(viewportWidth, nextColumnIndex);
  }, [viewportWidth, isDragging, canDropInColumn, dragScrollToNext, canvasTranslateX, nextColumnIndex]);

  const canvasScrollDelta = effectiveTranslateX - canvasTranslateX;
  const effectiveDragOffsetX = dragOffset.x - canvasScrollDelta;

  const applyDropToColumn = useCallback(
    (targetColumnIndex: number) => {
      if (targetColumnIndex !== nextColumnIndex || !canDropInColumn) return;
      setCompletedByColumn((prev) => {
        const next = [...prev];
        next[targetColumnIndex] = currentStepIndex;
        return next;
      });
      setCurrentStepIndex(nextColumnIndex);
      if (nextColumnIndex > 0) setShowDragHint(false);
    },
    [currentStepIndex, nextColumnIndex, canDropInColumn]
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (e.button !== 0) return;
      setIsDragging(true);
      pointerStartRef.current = { x: e.clientX, y: e.clientY };
      setDragOffset({ x: 0, y: 0 });
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    },
    []
  );

  useEffect(() => {
    if (!isDragging) return;
    const getColumnUnderPoint = (clientX: number, clientY: number) => {
      const elements = document.elementsFromPoint(clientX, clientY);
      for (const el of elements) {
        if (el.closest?.("[data-dragging-card]")) continue;
        const col = el.closest?.("[data-drop-column]");
        if (!col) continue;
        const rect = col.getBoundingClientRect();
        if (
          clientX >= rect.left &&
          clientX <= rect.right &&
          clientY >= rect.top &&
          clientY <= rect.bottom
        ) {
          const idx = col.getAttribute("data-drop-column");
          return idx != null ? parseInt(idx, 10) : null;
        }
      }
      return null;
    };
    const viewportEl = viewportRef.current;
    const onPointerMove = (e: PointerEvent) => {
      setDragOffset({
        x: e.clientX - pointerStartRef.current.x,
        y: e.clientY - pointerStartRef.current.y
      });
      if (viewportEl && canDropInColumn) {
        const rect = viewportEl.getBoundingClientRect();
        const threshold = rect.left + rect.width * 0.5;
        setDragScrollToNext((prev) => prev || e.clientX >= threshold);
      }
      const colIndex = getColumnUnderPoint(e.clientX, e.clientY);
      setDragOverColumn(colIndex === nextColumnIndex ? colIndex : null);
    };
    const onPointerUp = (e: PointerEvent) => {
      const colIndex = getColumnUnderPoint(e.clientX, e.clientY);
      if (colIndex === nextColumnIndex) applyDropToColumn(colIndex);
      setDragOffset({ x: 0, y: 0 });
      setIsDragging(false);
      setDragOverColumn(null);
      setDragScrollToNext(false);
    };
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };
  }, [isDragging, nextColumnIndex, applyDropToColumn, canDropInColumn]);

  const handleUncheck = useCallback((columnIndex: number) => {
    const stepIndex = completedByColumn[columnIndex];
    if (stepIndex == null) return;
    setCompletedByColumn((prev) => {
      const next = [...prev];
      next[columnIndex] = null;
      return next;
    });
    setCurrentStepIndex(stepIndex);
  }, [completedByColumn]);

  return (
    <div className="w-full">
      {/* Canvas : viewport fixe, contenu translaté pour garder la colonne active au centre */}
      <div
        ref={viewportRef}
        className="relative w-full overflow-hidden rounded-2xl border border-border/50 bg-muted/20 py-4"
        style={{ minHeight: 360 }}
      >
        <motion.div
          className="flex gap-4 px-4 py-2 will-change-transform"
          style={{
            width: TOTAL_CONTENT_WIDTH,
            minHeight: 340
          }}
          animate={{ x: effectiveTranslateX }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 35
          }}
        >
          {COLUMNS.map((col, columnIndex) => {
          const completedStep = completedByColumn[columnIndex];
          const isLastColumn = columnIndex === NUM_COLUMNS - 1;
          const hasDraggable = currentStepIndex === columnIndex && !isLastColumn;
          const isDropZone = canDropInColumn && columnIndex === nextColumnIndex;
          const isDropTarget =
            isDropZone && isDragging && dragOverColumn === columnIndex;

          return (
            <motion.div
              key={col.id}
              layout
              transition={layoutTransition}
              data-drop-column={columnIndex}
              className={cn(
                "relative flex min-h-[320px] min-w-[260px] max-w-[260px] flex-col rounded-xl border bg-card shadow-sm transition-colors duration-200",
                hasDraggable && "z-[50] overflow-visible border-primary/40 bg-primary/5",
                isDropTarget && "border-primary/50 bg-primary/10",
                !hasDraggable &&
                  !isDropTarget &&
                  "border-border"
              )}
            >
              {/* En-tête de colonne : un seul titre, pas de sous-titre */}
              <div className="shrink-0 border-b border-border/50 px-4 py-3">
                <h3 className="text-small font-semibold uppercase tracking-wider text-muted-foreground">
                  {col.columnTitle}
                </h3>
              </div>

              {/* Contenu : zone de drop (si survol) / ticket actif / préviews / tickets validés en bas */}
              <div
                className={cn(
                  "flex min-h-[140px] flex-1 flex-col gap-2 p-3",
                  hasDraggable ? "overflow-visible" : "overflow-y-auto"
                )}
              >
                {/* Ticket actif à déplacer (une seule colonne à la fois) */}
                {hasDraggable ? (
                  <motion.div
                    initial={{ opacity: 0.4, scale: 1 }}
                    onPointerDown={handlePointerDown}
                    data-dragging-card={isDragging ? "" : undefined}
                    className={cn(
                      "relative z-[100] cursor-grab active:cursor-grabbing touch-none select-none",
                      isDragging && "opacity-95"
                    )}
                    style={{
                      touchAction: "none"
                    }}
                    animate={{
                      opacity: 1,
                      x: isDragging ? effectiveDragOffsetX : 0,
                      y: isDragging ? dragOffset.y : 0,
                      scale: isDragging ? 1.02 : 1,
                      rotate: isDragging ? 2 : 0
                    }}
                    transition={
                      isDragging
                        ? { x: { duration: 0 }, y: { duration: 0 }, scale: springTransition, rotate: springTransition }
                        : { opacity: { duration: 0.3, ease: "easeOut", delay: 0.1 }, scale: { duration: 0.2, ease: "easeOut", delay: 0.08 }, x: springTransition, y: springTransition, rotate: springTransition }
                    }
                  >
                    <Card
                      className={cn(
                        "relative overflow-visible bg-[#f8f5f0] text-black transition-shadow duration-200",
                        isDragging && "shadow-lg ring-2 ring-white/90"
                      )}
                    >
                      {/* Main du tuto : arrive, drag, prend la card, la déplace à droite, relâche, recommence — masquée dès qu'on drag */}
                      {currentStepIndex === 0 && showDragHint && !isDragging && (
                        <motion.span
                          className="absolute -left-1 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-muted shadow-md"
                          animate={{
                            x: [-36, 0, 0, -36],
                            opacity: [0, 1, 1, 0]
                          }}
                          transition={{
                            duration: 5.5,
                            times: [0, 0.15, 0.5, 0.8, 1],
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          aria-label="Glisser vers la droite pour continuer"
                        >
                          <Hand className="h-5 w-5 text-foreground" />
                        </motion.span>
                      )}
                      <CardContent className="flex items-start gap-2 p-3">
                        <span className="shrink-0 text-black/70" aria-hidden>
                          <GripVertical className="h-4 w-4" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-black text-sm">
                            {col.ticketLabel}
                          </p>
                          {col.description && (
                            <p className="mt-1 text-xs text-black/80">
                              {col.description}
                            </p>
                          )}
                          {col.id === "acompte" && (
                            <p className="mt-1 text-xs italic text-black/80">
                              Passage obligatoire avant les maquettes
                            </p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ) : columnIndex > currentStepIndex && !isLastColumn ? (
                  /* Prochains tickets : visibles mais non déplaçables ; « Déposez ici » collé à la card du haut quand on survole */
                  <>
                    <Card className="pointer-events-none select-none overflow-hidden opacity-40 grayscale">
                    <CardContent className="flex items-start gap-2 p-3">
                      <span className="shrink-0 text-muted-foreground/60" aria-hidden>
                        <GripVertical className="h-4 w-4" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-muted-foreground text-sm">
                          {col.ticketLabel}
                        </p>
                        {col.description && (
                          <p className="mt-1 text-xs text-muted-foreground/70">
                            {col.description}
                          </p>
                        )}
                        {col.id === "acompte" && (
                          <p className="mt-1 text-xs italic text-muted-foreground/70">
                            Passage obligatoire avant les maquettes
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                    {isDropTarget && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        transition={springTransition}
                        className="flex min-h-[72px] flex-shrink-0 items-center justify-center rounded-lg border-2 border-dashed border-primary/50 bg-primary/10 p-4"
                      >
                        <span className="text-center text-xs font-medium text-primary">
                          Déposez ici
                        </span>
                      </motion.div>
                    )}
                  </>
                ) : isLastColumn && completedByColumn[columnIndex] !== null ? (
                  /* Dernière colonne : card Facture en validée (jamais active, validée dès que Retour est déposé ici) */
                  <Card className="pointer-events-none overflow-hidden opacity-40 grayscale">
                    <CardContent className="relative p-3">
                      <span className="absolute right-2 top-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 border-primary bg-primary/20 text-primary" aria-hidden>
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <p className="pr-8 font-semibold text-muted-foreground text-sm line-through">
                        {col.ticketLabel}
                      </p>
                      {col.description && (
                        <p className="mt-1 text-xs text-muted-foreground/80 line-through">
                          {col.description}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ) : isLastColumn ? (
                  /* Dernière colonne : card Facture toujours en disabled (preview) ; zone Déposez ici si on drag Retour */
                  <>
                    <Card className="pointer-events-none select-none overflow-hidden opacity-40 grayscale">
                      <CardContent className="flex items-start gap-2 p-3">
                        <span className="shrink-0 text-muted-foreground/60" aria-hidden>
                          <GripVertical className="h-4 w-4" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-muted-foreground text-sm">
                            {col.ticketLabel}
                          </p>
                          {col.description && (
                            <p className="mt-1 text-xs text-muted-foreground/70">
                              {col.description}
                            </p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                    {isDropTarget && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        transition={springTransition}
                        className="flex min-h-[72px] flex-shrink-0 items-center justify-center rounded-lg border-2 border-dashed border-primary/50 bg-primary/10 p-4"
                      >
                        <span className="text-center text-xs font-medium text-primary">
                          Déposez ici
                        </span>
                      </motion.div>
                    )}
                  </>
                ) : null}

                {/* Ticket(s) validé(s) : collé au contenu du haut, coche pour décocher */}
                {completedStep !== null && (
                  <motion.div
                    key={`completed-${columnIndex}-${completedStep}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={springTransition}
                  >
                    <Card className="overflow-hidden opacity-40 grayscale [&_button]:grayscale-0 [&_button]:opacity-100">
                      <CardContent className="relative p-3">
                        <button
                          type="button"
                          onClick={() => handleUncheck(columnIndex)}
                          className="absolute right-2 top-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 border-primary bg-primary/20 text-primary transition-colors hover:bg-primary/30 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                          title="Décocher pour remettre en cours"
                          aria-label="Décocher ce ticket"
                        >
                          <Check className="h-3.5 w-3.5" />
                        </button>
                        <p className="pr-8 font-semibold text-muted-foreground text-sm line-through">
                          {COLUMNS[completedStep].ticketLabel}
                        </p>
                        {COLUMNS[completedStep].description && (
                          <p className="mt-1 text-xs text-muted-foreground/80 line-through">
                            {COLUMNS[completedStep].description}
                          </p>
                        )}
                        {COLUMNS[completedStep].id === "acompte" && (
                          <p className="mt-1 text-xs italic text-muted-foreground/80 line-through">
                            Passage obligatoire avant les maquettes
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
        </motion.div>
      </div>
    </div>
  );
}
