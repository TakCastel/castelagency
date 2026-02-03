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

