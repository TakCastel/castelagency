import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/landing/PageHero";
import { SectionIntro } from "@/components/landing/SectionIntro";
import { ServicesList, type ServiceItem } from "@/components/landing/ServicesList";

export const metadata: Metadata = {
  title: "Mes services | Studio Castel",
  description:
    "Création de sites : site vitrine, e‑commerce, applications sur mesure, UX/UI & branding, SEO & acquisition, process IA. Stratégie, design, développement, contenu et SEO.",
  openGraph: {
    title: "Mes services | Studio Castel",
    description:
      "Site vitrine, e‑commerce, applications, UX/UI, SEO, process IA. Création de sites. Chaque service peut être pris seul ou combiné selon votre projet.",
    type: "website",
    locale: "fr_FR",
  },
  alternates: {
    canonical: "/services",
  },
};

const services: ServiceItem[] = [
  {
    title: "Création / refonte de site vitrine",
    description: "Pages claires, copy orientée conversion, SEO on‑page.",
    href: "/services/site-vitrine",
    image: "/assets/illustrations/illu-onepage.png",
    imageAlt: "Illustration évoquant un site vitrine et sa structure.",
  },
  {
    title: "E‑commerce",
    description: "Catalogue, paiement, tracking, pages optimisées.",
    href: "/services/ecommerce",
    image: "/assets/illustrations/illu-ecommerce.png",
    imageAlt: "Illustration évoquant une boutique en ligne.",
  },
  {
    title: "Applications & sur‑mesure",
    description: "Portails, outils internes, dashboards.",
    href: "/services/applications-sur-mesure",
    image: "/assets/illustrations/illu-app.png",
    imageAlt: "Illustration évoquant une application sur mesure.",
  },
  {
    title: "UX/UI & branding",
    description: "Wireframes, UI kit, identité, médias (photo/vidéo).",
    href: "/services/ux-ui-branding",
    image: "/assets/illustrations/illu-design.png",
    imageAlt: "Illustration évoquant le design et l’identité visuelle.",
  },
  {
    title: "SEO & acquisition",
    description: "SEO technique, contenu, maillage, analytics.",
    href: "/services/seo-acquisition",
    image: "/assets/illustrations/illu-seo.png",
    imageAlt: "Illustration évoquant le référencement et l’acquisition.",
  },
  {
    title: "Process IA",
    description: "Audit, plan éditorial, briefs, automatisations.",
    href: "/services/process-ia",
    image: "/assets/illustrations/illu-app.png",
    imageAlt: "Illustration évoquant l’automatisation et l’IA.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="Services"
        title="Mes services"
        description="De la vitrine au e‑commerce, du design à l’IA : une offre claire pour avancer. Je m’occupe de tout, de l’idée à la mise en ligne."
        ariaLabel="Mes services"
      />

      <div className="container mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <SectionIntro
          label="Découvrez"
          title="Création de sites. Je couvre l’essentiel."
          description="Stratégie, design, développement, contenu et SEO. Chaque service peut être pris seul ou combiné selon votre projet."
          textAlignClassName="text-center"
        />

        <div className="mt-14 md:mt-20">
          <ServicesList services={services} />
        </div>

        <section className="mt-20 border-t border-border/80 pt-14 text-center md:mt-28 md:pt-16" aria-labelledby="cta-services">
          <h2 id="cta-services" className="sr-only">
            Passer à l’action
          </h2>
          <p className="text-paragraphe font-medium text-foreground">
            Un projet en tête ?
          </p>
          <p className="mt-2 text-muted-foreground text-pretty">
            Parlons de vos objectifs et de la meilleure façon d’avancer.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/devis">Demander un devis</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Me contacter</Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}
