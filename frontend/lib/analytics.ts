/**
 * Helpers pour pousser des événements vers le dataLayer (Google Tag Manager).
 * Aucun événement n’est envoyé tant que l’utilisateur n’a pas cliqué sur « Tout accepter ».
 * Si l’utilisateur clique sur « Refuser », aucun traçage n’a lieu.
 */

import { hasAnalyticsConsent } from "@/lib/consent";
import { shouldLoadDirectGa } from "@/lib/analytics-config";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Push un événement dans dataLayer uniquement si l’utilisateur a accepté les cookies analytics. */
export function pushToDataLayer(payload: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  if (!hasAnalyticsConsent()) return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(payload);
}

/** Page vue pour GTM (dataLayer) — peut être appelé avant que gtm.js ait fini de charger. */
export function pushPageViewDataLayer(path: string, title?: string): void {
  const pageTitle = title ?? (typeof document !== "undefined" ? document.title : "");
  pushToDataLayer({
    event: "page_view",
    page_path: path,
    page_title: pageTitle,
  });
}

/** Page vue GA4 via gtag (uniquement si gtag.js est déjà chargé). */
export function sendGa4PageView(path: string, title?: string): void {
  if (!shouldLoadDirectGa()) return;
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  const pageTitle = title ?? document.title;
  window.gtag("event", "page_view", {
    page_path: path,
    page_title: pageTitle,
  });
}

/** Événement personnalisé : page vue (dataLayer + GA4 direct si actif). */
export function trackPageView(path: string, title?: string): void {
  pushPageViewDataLayer(path, title);
  sendGa4PageView(path, title);
}

/** Événement : clic sur un CTA (bouton / lien important). */
export function trackCTAClick(params: {
  link_name: string;
  link_url?: string;
  link_location?: "navbar" | "footer" | "floating" | "hero" | "content";
}): void {
  pushToDataLayer({
    event: "cta_click",
    cta_link_name: params.link_name,
    cta_link_url: params.link_url,
    cta_link_location: params.link_location,
  });
}

/** Événement : visite de la page devis (intention). */
export function trackDevisPageView(): void {
  pushToDataLayer({
    event: "devis_page_view",
    page_path: "/devis",
  });
}

/** Événement : formulaire devis envoyé avec succès. */
export function trackDevisSubmitted(params?: {
  project_type?: string;
  budget?: string;
}): void {
  pushToDataLayer({
    event: "devis_submitted",
    devis_project_type: params?.project_type,
    devis_budget: params?.budget,
  });
}

/** Événement : clic sur lien externe (ex. WhatsApp, réseaux). */
export function trackOutboundClick(params: { link_name: string; link_url: string }): void {
  pushToDataLayer({
    event: "outbound_click",
    outbound_link_name: params.link_name,
    outbound_link_url: params.link_url,
  });
}

/** Événement : clic sur un lien de navigation (menu). */
export function trackNavClick(params: { link_name: string; link_url: string }): void {
  pushToDataLayer({
    event: "nav_click",
    nav_link_name: params.link_name,
    nav_link_url: params.link_url,
  });
}
