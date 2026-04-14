"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { pushPageViewDataLayer, sendGa4PageView } from "@/lib/analytics";
import { shouldLoadDirectGa } from "@/lib/analytics-config";
import { hasAnalyticsConsent, onConsentUpdate } from "@/lib/consent";
import { onTrackingReady } from "@/lib/tracking-ready";

const useDirectGa = shouldLoadDirectGa();

/** Envoie un page_view au dataLayer à chaque changement de route (SPA). */
export function AnalyticsPageView() {
  const pathname = usePathname();
  const previousPath = useRef<string | null>(null);
  const ga4SentForPath = useRef(false);

  useEffect(() => {
    if (!pathname) return;

    const fire = () => {
      if (!hasAnalyticsConsent()) return;
      if (previousPath.current === pathname) return;
      previousPath.current = pathname;
      ga4SentForPath.current = false;
      pushPageViewDataLayer(pathname);
      if (typeof window !== "undefined" && typeof window.gtag === "function") {
        sendGa4PageView(pathname);
        ga4SentForPath.current = true;
      }
    };

    fire();

    const unsubscribe = onConsentUpdate((analytics) => {
      if (!analytics) return;
      previousPath.current = null;
      fire();
    });

    const flushGa4WhenScriptsReady = () => {
      if (!useDirectGa || !hasAnalyticsConsent()) return;
      if (ga4SentForPath.current) return;
      if (typeof window.gtag !== "function") return;
      sendGa4PageView(pathname);
      ga4SentForPath.current = true;
    };

    const unsubReady = onTrackingReady(flushGa4WhenScriptsReady);

    return () => {
      unsubscribe();
      unsubReady();
    };
  }, [pathname]);

  return null;
}
