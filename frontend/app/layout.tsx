import type { Metadata, Viewport } from "next";
import { Poppins, Inter, Manrope } from "next/font/google";
import "./globals.css";

import { ConsentAwareAnalytics } from "@/components/ConsentAwareAnalytics";
import { CookieConsentBanner } from "@/components/CookieConsentBanner";
import { AnalyticsPageView } from "@/components/AnalyticsPageView";
import { PageTransition } from "@/components/site/PageTransition";
import { KonamiEgg } from "@/components/KonamiEgg";
import { MusicPlayerProvider } from "@/components/projects/creations/MusicPlayerProvider";
import { JsonLd, organizationJsonLd } from "@/lib/jsonld";
import { socialMeta } from "@/lib/seo";

const poppins = Poppins({
  weight: ["600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

const manrope = Manrope({
  weight: ["600"],
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const inter = Inter({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = "https://studio-castel.com";

const title = "Studio Castel, création de sites, apps et jeux à Avignon";
const description =
  "Studio indépendant à Avignon (Vaucluse) : création de sites internet, développement d'applications web et mobiles et de jeux vidéo, de A à Z. Pour Avignon, le Vaucluse et toute la région PACA.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Studio Castel",
  },
  description,
  // Pas de canonical ici : il serait hérité par toutes les pages et les ferait pointer vers l'accueil.
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
  formatDetection: { telephone: true, email: true },
  other: {
    "geo.region": "FR-84",
    "geo.placename": "Avignon",
    "geo.position": "43.9511;4.8113",
    ICBM: "43.9511, 4.8113",
  },
  ...socialMeta({ title, description, path: "/" }),
};

export const viewport: Viewport = {
  themeColor: "#FF2B2B",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${poppins.variable} ${inter.variable} ${manrope.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-castel-ink font-sans text-white antialiased">
        <JsonLd data={organizationJsonLd()} />
        <ConsentAwareAnalytics />
        <AnalyticsPageView />
        <MusicPlayerProvider>{children}</MusicPlayerProvider>
        <PageTransition />
        <CookieConsentBanner />
        <KonamiEgg />
      </body>
    </html>
  );
}
