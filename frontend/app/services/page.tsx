import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { SectionIntro } from "@/components/landing/SectionIntro";
import { ServicesList, type ServiceItem } from "@/components/landing/ServicesList";

export const metadata: Metadata = {
  title: "Mes services | Studio Castel",
  description:
    "Création de sites à Avignon : site vitrine, e‑commerce, applications sur mesure, UX/UI & branding, SEO & acquisition, process IA. Une offre claire pour avancer.",
  openGraph: {
    title: "Mes services | Studio Castel",
    description:
      "Site vitrine, e‑commerce, applications, UX/UI, SEO, process IA. Création de sites à Avignon.",
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
      {/* Hero : intermédiaire entre accueil et pages de service, même veine que Le Studio */}
      <section
        className="relative -mt-20 flex min-h-[50vh] flex-col justify-end overflow-hidden md:-mt-24"
        aria-label="Mes services"
      >
        <div className="pointer-events-none absolute inset-0 -z-10">
          <Image
            src="/assets/illustrations/hero-background.png"
            alt=""
            fill
            className="object-cover object-center opacity-50"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
        </div>

        <div className="container flex flex-col justify-end pb-12 pt-12 md:pb-16 md:pt-16">
          <p className="text-small font-medium text-muted-foreground">
            Ce que je fais
          </p>
          <h1 className="mt-2 text-balance text-titre-moyen font-semibold tracking-tight text-foreground md:text-titre-gros">
            Mes services
          </h1>
          <p className="mt-3 max-w-2xl text-paragraphe text-muted-foreground text-pretty">
            De la vitrine au e‑commerce, du design à l’IA : une offre claire pour
            avancer. Je m’occupe de tout, de l’idée à la mise en ligne.
          </p>
        </div>
      </section>

      <div className="container mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <SectionIntro
          label="Découvrez"
          title="Création de sites à Avignon. Je couvre l’essentiel."
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
