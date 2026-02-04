import type { Metadata } from "next";
import { Outfit, Comic_Neue } from "next/font/google";
import "./globals.css";

import { DeferredFooter, DeferredWhatsAppFloatingCTA } from "@/components/DeferredLayoutParts";
import { Navbar } from "@/components/landing/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const comicNeue = Comic_Neue({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-comic-neue",
  display: "swap",
});

const siteUrl = "https://studio-castel.com";

/** Image par défaut pour le partage social (logo + texte). Format recommandé 1200×630. */
const defaultOgImage = `${siteUrl}/og-logo-with-text.png`;
const defaultOgImageLogoOnly = `${siteUrl}/og-logo-only.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Agence web Avignon | Studio Castel",
    template: "%s | Studio Castel"
  },
  description:
    "Agence web Avignon : Studio Castel crée et refait sites vitrines, e‑commerce et applications. UX/UI, branding, SEO, contenus et automatisations. Basé à Avignon.",
  alternates: {
    canonical: "/"
  },
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Studio Castel",
    title: "Agence web Avignon | Studio Castel",
    description:
      "Agence web Avignon : création et refonte de sites vitrines, e‑commerce et applications. UX/UI, branding, SEO. Studio Castel, basé à Avignon.",
    images: [
      { url: defaultOgImage, width: 1200, height: 630, alt: "Studio Castel – Agence web Avignon" },
      { url: defaultOgImageLogoOnly, width: 600, height: 600, alt: "Studio Castel" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agence web Avignon | Studio Castel",
    description:
      "Agence web Avignon : création et refonte de sites vitrines, e‑commerce et applications. UX/UI, branding, SEO. Studio Castel.",
    images: [defaultOgImage],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${outfit.variable} ${comicNeue.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href={siteUrl} />
        <link rel="dns-prefetch" href={siteUrl} />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('studio-castel-theme');var d=document.documentElement;d.classList.remove('light','dark');d.classList.add(t==='light'?'light':'dark');})();`,
          }}
        />
      </head>
      <body className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-background font-sans text-foreground antialiased">
        <ThemeProvider>
          <Navbar />
          <main className="pt-20 lg:pt-24">{children}</main>
          <DeferredFooter />
          <DeferredWhatsAppFloatingCTA />
        </ThemeProvider>
      </body>
    </html>
  );
}

