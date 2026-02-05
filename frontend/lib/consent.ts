/**
 * Gestion du consentement cookies (RGPD) pour le site Studio Castel.
 * Cookie utilisé : studio-castel-consent
 * Valeurs : "necessary" (refus analytics) | "necessary|analytics" (acceptation)
 */

export const CONSENT_COOKIE_NAME = "studio-castel-consent";
export const CONSENT_EXPIRY_DAYS = 365;

export type ConsentChoice = "necessary" | "necessary|analytics";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([.%5B%5D])/g, "\\$1") + "=([^;]*)"));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string, days: number): void {
  if (typeof document === "undefined") return;
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; expires=${expires.toUTCString()}; SameSite=Lax`;
}

/** Vérifie si l’utilisateur a déjà fait un choix (bandeau déjà répondu). */
export function hasConsentChoice(): boolean {
  const value = getCookie(CONSENT_COOKIE_NAME);
  return value === "necessary" || value === "necessary|analytics";
}

/** Vérifie si les cookies analytics (GTM/GA) sont acceptés. */
export function hasAnalyticsConsent(): boolean {
  return getCookie(CONSENT_COOKIE_NAME) === "necessary|analytics";
}

/** Enregistre le choix : analytics acceptés. */
export function acceptAnalytics(): void {
  setCookie(CONSENT_COOKIE_NAME, "necessary|analytics", CONSENT_EXPIRY_DAYS);
  dispatchConsentUpdate(true);
}

/** Enregistre le choix : analytics refusés. */
export function refuseAnalytics(): void {
  setCookie(CONSENT_COOKIE_NAME, "necessary", CONSENT_EXPIRY_DAYS);
  dispatchConsentUpdate(false);
}

const CONSENT_EVENT = "studio-castel-consent-update";

export function dispatchConsentUpdate(analytics: boolean): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: { analytics } }));
}

export function onConsentUpdate(callback: (analytics: boolean) => void): () => void {
  if (typeof window === "undefined") return () => {};
  const handler = (e: Event) => callback((e as CustomEvent<{ analytics: boolean }>).detail.analytics);
  window.addEventListener(CONSENT_EVENT, handler);
  return () => window.removeEventListener(CONSENT_EVENT, handler);
}
