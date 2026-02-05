"use client";

import { useEffect } from "react";
import { trackDevisPageView } from "@/lib/analytics";
import { hasAnalyticsConsent } from "@/lib/consent";

/** Envoie un événement "devis_page_view" quand la page devis est affichée (avec consentement). */
export function DevisPageViewTracker() {
  useEffect(() => {
    if (hasAnalyticsConsent()) trackDevisPageView();
  }, []);
  return null;
}
