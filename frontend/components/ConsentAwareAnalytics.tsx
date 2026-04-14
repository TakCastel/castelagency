"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { analyticsClientConfig, shouldLoadDirectGa } from "@/lib/analytics-config";
import { hasAnalyticsConsent, onConsentUpdate } from "@/lib/consent";
import { dispatchTrackingReady } from "@/lib/tracking-ready";

const { gtmId, gaMeasurementId } = analyticsClientConfig;
const loadDirectGa = shouldLoadDirectGa();

/**
 * Un seul endroit : GTM et/ou GA4 (gtag), après consentement.
 * Si GTM + gtag sont tous les deux actifs avec le même flux GA4, désactive l’un des deux
 * (ou mets NEXT_PUBLIC_ANALYTICS_GA_VIA_GTM=true et configure GA4 dans GTM seulement).
 */
export function ConsentAwareAnalytics() {
  const [allowed, setAllowed] = useState(false);
  const gateRef = useRef({ gtm: !gtmId, ga: !loadDirectGa });

  useEffect(() => {
    if (hasAnalyticsConsent()) {
      setAllowed(true);
      return;
    }
    return onConsentUpdate((ok) => {
      if (ok) setAllowed(true);
    });
  }, []);

  useEffect(() => {
    if (!allowed) return;
    gateRef.current = { gtm: !gtmId, ga: !loadDirectGa };
  }, [allowed]);

  const tryDispatchAllReady = () => {
    if (gateRef.current.gtm && gateRef.current.ga) dispatchTrackingReady();
  };

  const markGtmReady = () => {
    gateRef.current.gtm = true;
    tryDispatchAllReady();
  };

  const markGaReady = () => {
    gateRef.current.ga = true;
    tryDispatchAllReady();
  };

  if (!allowed) return null;

  if (!gtmId && !loadDirectGa) return null;

  return (
    <>
      {gtmId ? (
        <>
          <Script
            id="gtm-init"
            strategy="afterInteractive"
            onReady={markGtmReady}
            dangerouslySetInnerHTML={{
              __html: `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');
              `.trim(),
            }}
          />
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
              title="Google Tag Manager"
            />
          </noscript>
        </>
      ) : null}

      {loadDirectGa && gaMeasurementId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
            strategy="afterInteractive"
            onLoad={markGaReady}
          />
          <Script
            id="ga-config"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaMeasurementId}', { send_page_view: false });
              `.trim(),
            }}
          />
        </>
      ) : null}
    </>
  );
}
