import type { Metadata } from "next";
import dynamic from "next/dynamic";

import { Hero } from "@/components/landing/Hero";

/** Chargement différé : réduit le bundle initial et le TBT (Total Blocking Time) sur mobile. */
const FeatureGrid = dynamic(() => import("@/components/landing/FeatureGrid").then((m) => m.FeatureGrid), { ssr: true });
const Process = dynamic(() => import("@/components/landing/Process").then((m) => m.Process), { ssr: true });
const Testimonials = dynamic(() => import("@/components/landing/Testimonials").then((m) => m.Testimonials), { ssr: true });
const FAQ = dynamic(() => import("@/components/landing/FAQ").then((m) => m.FAQ), { ssr: true });
const CTA = dynamic(() => import("@/components/landing/CTA").then((m) => m.CTA), { ssr: true });

export const metadata: Metadata = {
  title: "Agence web Avignon | Studio Castel",
  description:
    "Agence web Avignon : Studio Castel crée et refait sites vitrines, e‑commerce et applications. UX/UI, branding, SEO, contenus et automatisations. Basé à Avignon.",
  openGraph: {
    title: "Agence web Avignon | Studio Castel",
    description:
      "Agence web Avignon : création et refonte de sites vitrines, e‑commerce et applications. UX/UI, branding, SEO. Studio Castel, basé à Avignon.",
    type: "website",
    locale: "fr_FR",
    siteName: "Studio Castel",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agence web Avignon | Studio Castel",
    description:
      "Agence web Avignon : création et refonte de sites vitrines, e‑commerce et applications. UX/UI, branding, SEO. Studio Castel.",
  },
};

export default function HomePage() {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://studio-castel.com/#organization",
    name: "Studio Castel",
    alternateName: ["Castel - Studio numérique", "Agence web Avignon"],
    url: "https://studio-castel.com",
    description:
      "Agence web Avignon : Studio Castel crée et refait sites vitrines, e‑commerce et applications. UX/UI, branding, SEO, contenus et automatisations. Basé à Avignon.",
    areaServed: ["Avignon", "Vaucluse", "Provence-Alpes-Côte d’Azur", "France"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Avignon",
      addressRegion: "Vaucluse",
      addressCountry: "FR"
    },
    email: "takcastel@gmail.com",
    telephone: "+33608432059",
    sameAs: [
      "https://share.google/dziY5AZoxyjr2gqxl",
      "https://www.linkedin.com/in/tarik-talhaoui-832769110/?locale=fr_FR",
      "https://www.instagram.com/takcastel",
      "https://github.com/TakCastel",
      "https://www.twitch.tv/siddoux",
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <Hero />
      <FeatureGrid />
      <Process />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}

