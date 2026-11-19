import type { Metadata, Viewport } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";

import { ConsentAwareAnalytics } from "@/components/ConsentAwareAnalytics";
import { CookieConsentBanner } from "@/components/CookieConsentBanner";
import { AnalyticsPageView } from "@/components/AnalyticsPageView";
import { PageTransition } from "@/components/site/PageTransition";

const poppins = Poppins({
  weight: ["600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = "https://studio-castel.com";

const defaultOgImage = `${siteUrl}/og-logo-with-text.png`;
const defaultOgImageLogoOnly = `${siteUrl}/og-logo-only.png`;

const title = "Studio Castel, jeux, apps et sites";
const description =
  "Studio Castel est un studio indépendant à Avignon qui conçoit des jeux, des apps et des sites, de A à Z. Decalco, Pavat, Godsing, Préhistopia, Polinizz, Bobithèque et d'autres.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Studio Castel",
  },
  description,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Studio Castel",
    title,
    description,
    images: [
      { url: defaultOgImage, width: 1200, height: 630, alt: "Studio Castel, jeux, apps et sites" },
      { url: defaultOgImageLogoOnly, width: 600, height: 600, alt: "Studio Castel" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [defaultOgImage],
  },
};

export const viewport: Viewport = {
  themeColor: "#FF2B2B",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${poppins.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-castel-ink font-sans text-white antialiased">
        <ConsentAwareAnalytics />
        <AnalyticsPageView />
        {children}
        <PageTransition />
        <CookieConsentBanner />
      </body>
    </html>
  );
}
