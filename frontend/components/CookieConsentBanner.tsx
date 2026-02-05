"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";
import {
  hasConsentChoice,
  acceptAnalytics,
  refuseAnalytics,
} from "@/lib/consent";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const DELAY_MS = 2800;
const ANIM_DURATION_MS = 400;

export function CookieConsentBanner() {
  const [mounted, setMounted] = useState(false);
  const [canShow, setCanShow] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const needsConsent = mounted && !hasConsentChoice();
  const visible = needsConsent && canShow;

  useEffect(() => {
    if (!visible) return;
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setHasEntered(true));
    });
    return () => cancelAnimationFrame(id);
  }, [visible]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || hasConsentChoice()) return;
    timeoutRef.current = setTimeout(() => setCanShow(true), DELAY_MS);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [mounted]);

  const accept = () => {
    acceptAnalytics();
    setCanShow(false);
  };

  const refuse = () => {
    refuseAnalytics();
    setCanShow(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Choix des cookies"
      className={cn(
        "fixed left-0 right-0 bottom-0 z-[9999] p-0 sm:p-5",
        "md:left-6 md:right-auto md:bottom-6 md:max-w-2xl md:p-0"
      )}
    >
      <div
        className={cn(
          "flex max-w-2xl flex-col overflow-hidden rounded-t-xl border-x border-t border-border border-b-0 bg-background shadow-xl shadow-black/10 backdrop-blur-md transition-all ease-out",
          "sm:rounded-2xl sm:border sm:border-b md:shadow-2xl",
          hasEntered ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        )}
        style={{ transitionDuration: `${ANIM_DURATION_MS}ms` }}
      >
        {/* Icône + bloc texte */}
        <div className="flex gap-3 px-4 py-3 sm:gap-4 sm:p-5 md:gap-5">
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary",
              "sm:h-14 sm:w-14 sm:rounded-2xl"
            )}
          >
            <Cookie className="h-5 w-5 sm:h-7 sm:w-7" strokeWidth={1.75} />
          </div>
          <div className="min-w-0 flex-1 space-y-0.5 sm:space-y-1">
            <h3 className="text-sm font-semibold text-foreground sm:text-titre-petit">
              Cookies & confidentialité
            </h3>
            <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
              Nous utilisons des cookies pour mesurer l’audience et comprendre comment vous utilisez le site
              (pages vues, clics, demandes de devis). Aucune publicité.
            </p>
            <Link
              href="/politique-de-confidentialite"
              className="inline-block text-xs font-medium text-primary underline underline-offset-2 hover:no-underline sm:text-sm"
            >
              Politique de confidentialité
            </Link>
          </div>
        </div>

        {/* Boutons Refuser / Tout accepter */}
        <div className="flex flex-row items-center justify-end gap-2 border-t border-border bg-muted/30 px-4 py-3 sm:gap-3 sm:px-5 sm:py-4">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={refuse}
            className="min-w-[5.5rem] border-border sm:min-w-[7rem]"
          >
            Refuser
          </Button>
          <Button type="button" size="sm" onClick={accept} className="min-w-[5.5rem] sm:min-w-[7rem]">
            Tout accepter
          </Button>
        </div>
      </div>
    </div>
  );
}
