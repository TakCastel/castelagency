"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  hasConsentChoice,
  acceptAnalytics,
  refuseAnalytics,
} from "@/lib/consent";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    setVisible(!hasConsentChoice());
  }, [mounted]);

  const accept = () => {
    acceptAnalytics();
    setVisible(false);
  };

  const refuse = () => {
    refuseAnalytics();
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Choix des cookies"
      className={cn(
        "fixed bottom-0 left-0 right-0 z-[9999] border-t border-border bg-background/95 p-4 shadow-lg backdrop-blur-sm",
        "md:left-4 md:right-4 md:bottom-4 md:max-w-2xl md:rounded-xl md:border"
      )}
    >
      <div className="container flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-foreground md:pr-4">
          Nous utilisons des cookies pour mesurer l’audience et comprendre comment vous utilisez le site
          (pages vues, clics, demandes de devis). Aucune publicité. Vous pouvez accepter ou refuser.
          <Link
            href="/politique-de-confidentialite"
            className="ml-1 font-medium text-primary underline underline-offset-2 hover:no-underline"
          >
            Politique de confidentialité
          </Link>
        </p>
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={refuse}
            className="border-border"
          >
            Refuser
          </Button>
          <Button type="button" size="sm" onClick={accept}>
            Tout accepter
          </Button>
        </div>
      </div>
    </div>
  );
}
