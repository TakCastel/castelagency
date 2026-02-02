import type { Metadata } from "next";
import { Outfit, Comic_Neue } from "next/font/google";
import "./globals.css";

import { Footer } from "@/components/landing/Footer";
import { Navbar } from "@/components/landing/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { WhatsAppFloatingCTA } from "@/components/landing/WhatsAppFloatingCTA";

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
    <html lang="fr" className={`${outfit.variable} ${comicNeue.variable}`} suppressHydrationWarning>
      <head>
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
          <Footer />
          <WhatsAppFloatingCTA />
        </ThemeProvider>
      </body>
    </html>
  );
}

