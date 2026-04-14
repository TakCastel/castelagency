/**
 * Les scripts GTM / gtag se chargent en asynchrone : on signale quand tout ce qui est
 * demandé par la config est prêt, pour envoyer la première page vue GA4 sans course critique.
 */

export const TRACKING_READY_EVENT = "studio-castel-tracking-ready";

export function dispatchTrackingReady(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(TRACKING_READY_EVENT));
}

export function onTrackingReady(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(TRACKING_READY_EVENT, callback);
  return () => window.removeEventListener(TRACKING_READY_EVENT, callback);
}
