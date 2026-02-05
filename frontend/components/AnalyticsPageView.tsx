"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { trackPageView } from "@/lib/analytics";
import { hasAnalyticsConsent } from "@/lib/consent";

/** Envoie un page_view au dataLayer à chaque changement de route (SPA). */
export function AnalyticsPageView() {
  const pathname = usePathname();
  const previousPath = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || !hasAnalyticsConsent()) return;
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;
    trackPageView(pathname);
  }, [pathname]);

  return null;
}
