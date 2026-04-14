/**
 * Config analytics côté client (NEXT_PUBLIC_* injectés au build Next.js).
 * Docker prod / Netlify : ces variables doivent être présentes au moment du `next build`.
 */

export const analyticsClientConfig = {
  gtmId: process.env.NEXT_PUBLIC_GTM_ID?.trim() ?? "",
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ?? "",
  /** Si "true" : pas de gtag.js direct ; GA4 doit être configurée dans GTM uniquement. */
  gaViaGtm: process.env.NEXT_PUBLIC_ANALYTICS_GA_VIA_GTM === "true",
} as const;

export function shouldLoadDirectGa(): boolean {
  return Boolean(analyticsClientConfig.gaMeasurementId) && !analyticsClientConfig.gaViaGtm;
}
