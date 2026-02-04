"use client";

import dynamic from "next/dynamic";

/** Footer et CTA WhatsApp en chargement différé pour alléger le bundle initial (perf mobile). */
const Footer = dynamic(
  () => import("@/components/landing/Footer").then((m) => ({ default: m.Footer })),
  { ssr: true }
);

const WhatsAppFloatingCTA = dynamic(
  () => import("@/components/landing/WhatsAppFloatingCTA").then((m) => ({ default: m.WhatsAppFloatingCTA })),
  { ssr: true }
);

export function DeferredFooter() {
  return <Footer />;
}

export function DeferredWhatsAppFloatingCTA() {
  return <WhatsAppFloatingCTA />;
}
