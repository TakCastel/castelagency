"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  hasConsentChoice,
  acceptAnalytics,
  refuseAnalytics,
} from "@/lib/consent";
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
      className="fixed inset-x-0 bottom-0 z-[9999] p-3 sm:p-5 md:inset-x-auto md:left-6 md:bottom-6 md:max-w-xl md:p-0"
    >
      <div
        className={cn(
          "flex flex-col gap-4 rounded-card bg-castel-ink p-5 text-white shadow-card transition-all ease-out sm:p-6",
          hasEntered ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        )}
        style={{ transitionDuration: `${ANIM_DURATION_MS}ms` }}
      >
        <div className="space-y-2">
          <h3 className="font-display text-xl font-bold">Cookies et confidentialité</h3>
          <p className="text-sm leading-relaxed text-[#A1A1AA]">
            Nous utilisons des cookies pour mesurer l’audience et comprendre comment vous utilisez le site
            (pages vues, clics). Aucune publicité.
          </p>
          <Link
            href="/politique-de-confidentialite"
            className="inline-block text-sm font-medium text-white underline underline-offset-2 hover:no-underline"
          >
            Politique de confidentialité
          </Link>
        </div>
        <div className="flex flex-row gap-3">
          <button
            type="button"
            onClick={refuse}
            className="min-h-11 flex-1 rounded-full bg-castel-surface px-5 font-display text-sm font-semibold text-white transition-colors hover:bg-white hover:text-castel-ink sm:flex-none sm:min-w-[7rem]"
          >
            Refuser
          </button>
          <button
            type="button"
            onClick={accept}
            className="min-h-11 flex-1 rounded-full bg-castel-red px-5 font-display text-sm font-semibold text-castel-ink transition-colors hover:bg-white sm:flex-none sm:min-w-[7rem]"
          >
            Tout accepter
          </button>
        </div>
      </div>
    </div>
  );
}
