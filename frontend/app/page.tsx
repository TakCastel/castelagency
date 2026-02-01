import { CTA } from "@/components/landing/CTA";
import { FAQ } from "@/components/landing/FAQ";
import { FeatureGrid } from "@/components/landing/FeatureGrid";
import { Hero } from "@/components/landing/Hero";
import { Process } from "@/components/landing/Process";
import { Testimonials } from "@/components/landing/Testimonials";

export default function HomePage() {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Studio Castel",
    description:
      "Agence web à Avignon : création et refonte de sites vitrines, e‑commerce et applications. UX/UI, branding, SEO, contenus et automatisations.",
    areaServed: ["Avignon", "Vaucluse", "Provence-Alpes-Côte d’Azur", "France"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Avignon",
      addressCountry: "FR"
    }
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

