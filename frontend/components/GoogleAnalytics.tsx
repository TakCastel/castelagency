"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { hasAnalyticsConsent, onConsentUpdate } from "@/lib/consent";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/** GA4 (gtag.js) — chargé uniquement après acceptation des cookies analytics. */
export function GoogleAnalytics() {
  const [loadGa, setLoadGa] = useState(false);

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;
    if (hasAnalyticsConsent()) {
      setLoadGa(true);
      return;
    }
    const unsubscribe = onConsentUpdate((analytics) => {
      if (analytics) setLoadGa(true);
    });
    return unsubscribe;
  }, []);

  if (!GA_MEASUREMENT_ID || !loadGa) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="ga4-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
          `.trim(),
        }}
      />
    </>
  );
}
