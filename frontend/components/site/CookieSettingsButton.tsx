"use client";

import { resetConsent } from "@/lib/consent";

/** Rouvre le choix des cookies (retrait du consentement). */
export function CookieSettingsButton({ className = "" }: { className?: string }) {
  return (
    <button type="button" onClick={resetConsent} className={className}>
      Gérer les cookies
    </button>
  );
}
