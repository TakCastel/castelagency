"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type TrainingPromptCopyBlockProps = {
  /** Contenu brut à copier (tel quel dans le presse-papiers). */
  text: string;
  className?: string;
};

/**
 * Bloc « prompt » lisible avec bouton Copier (formation), hors style `pre` code gris.
 */
export function TrainingPromptCopyBlock({ text, className }: TrainingPromptCopyBlockProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current != null) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      if (timeoutRef.current != null) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => {
        setCopied(false);
        timeoutRef.current = null;
      }, 2000);
    } catch {
      setCopied(false);
    }
  }, [text]);

  return (
    <div
      className={cn(
        "not-prose relative my-6 overflow-hidden rounded-xl border border-border/90 bg-card shadow-sm ring-1 ring-border/30",
        className
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-border/70 bg-muted/35 px-3 py-2.5 sm:px-4">
        <span className="text-small font-medium text-muted-foreground">Texte à coller dans l’assistant</span>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-8 shrink-0 gap-1.5 px-3 text-small"
          onClick={() => void handleCopy()}
          aria-label={copied ? "Texte copié" : "Copier le texte dans le presse-papiers"}
        >
          {copied ? <Check className="size-4 text-emerald-600 dark:text-emerald-400" aria-hidden /> : <Copy className="size-4" aria-hidden />}
          {copied ? "Copié" : "Copier"}
        </Button>
      </div>
      <div className="max-h-[min(26rem,50vh)] overflow-y-auto px-3 py-4 sm:px-4">
        <pre className="m-0 whitespace-pre-wrap break-words font-sans text-sm leading-relaxed tracking-normal text-foreground">
          {text}
        </pre>
      </div>
    </div>
  );
}
