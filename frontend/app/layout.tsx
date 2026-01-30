import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

import { Footer } from "@/components/landing/Footer";
import { Navbar } from "@/components/landing/Navbar";
import { WhatsAppFloatingCTA } from "@/components/landing/WhatsAppFloatingCTA";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Studio Castel, agence web à Avignon",
    template: "%s | Studio Castel"
  },
  description:
    "Studio Castel, agence web à Avignon : création et refonte de sites vitrines, e‑commerce et applications. UX/UI, branding, SEO, contenus et automatisations.",
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
    title: "Studio Castel, agence web à Avignon",
    description:
      "Création et refonte de sites vitrines, e‑commerce et applications à Avignon. UX/UI, branding, SEO, contenus et automatisations."
  },
  twitter: {
    card: "summary_large_image",
    title: "Studio Castel, agence web à Avignon",
    description:
      "Création et refonte de sites vitrines, e‑commerce et applications à Avignon. UX/UI, branding, SEO, contenus et automatisations."
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`dark ${outfit.variable}`}>
      <body className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-background font-sans text-foreground antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloatingCTA />
      </body>
    </html>
  );
}

