import type { ReactNode } from "react";

import { DeferredFooter, DeferredWhatsAppFloatingCTA } from "@/components/DeferredLayoutParts";
import { Navbar } from "@/components/landing/Navbar";

/**
 * Pages du site principal : navigation, pied de page, CTA WhatsApp.
 * Le parcours /formation-ia est hors de ce groupe (standalone).
 */
export default function SiteChromeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="pt-16 lg:pt-20">{children}</main>
      <DeferredFooter />
      <DeferredWhatsAppFloatingCTA />
    </>
  );
}
