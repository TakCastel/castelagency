/**
 * Helpers pour pousser des événements vers le dataLayer (Google Tag Manager).
 * À utiliser côté client uniquement ; vérifier le consentement avant d’envoyer
 * si tu appelles ces fonctions en dehors du flux GTM (GTM ne charge GA que si consentement).
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/** Push un événement dans dataLayer (no-op si dataLayer absent). */
export function pushToDataLayer(payload: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(payload);
}

/** Événement personnalisé : page vue (pour SPA / changement de route Next). */
export function trackPageView(path: string, title?: string): void {
  pushToDataLayer({
    event: "page_view",
    page_path: path,
    page_title: title ?? document.title,
  });
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
