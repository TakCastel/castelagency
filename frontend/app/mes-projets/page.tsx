import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/landing/PageHero";
import { ProjectsMasonry } from "@/components/landing/ProjectsMasonry";
import { SectionIntro } from "@/components/landing/SectionIntro";
import { projectsList } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Mes projets | Studio Castel",
  description:
    "Réalisations Studio Castel : Polinizz, Serpenter, sites vitrines (Florine, Arnaud, Brice), Archéode, Bobithèque, Pavat, Préhistopia. Avignon et en remote.",
  openGraph: {
    title: "Mes projets | Studio Castel",
    description:
      "Polinizz, Serpenter, sites vitrines, Archéode, Bobithèque, Pavat, Préhistopia. Réalisations web à Avignon.",
    type: "website",
    locale: "fr_FR",
  },
  alternates: {
    canonical: "/mes-projets",
  },
};

export default function MesProjetsPage() {
  return (
    <>
      <PageHero
        label="Portfolio"
        title="Mes projets"
        description="Sites vitrines, outils métier, jeux et projets sur mesure réalisés à Avignon et ailleurs."
        breadcrumb={[{ label: "Accueil", href: "/" }, { label: "Mes projets" }]}
        ariaLabel="Mes projets"
      />

      <div className="container mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionIntro
          label=""
          title="Une sélection de projets récents"
          description="Du site vitrine au produit SaaS, en passant par le jeu et l’expérimentation IA. Chaque projet répond à un contexte précis, des contraintes réelles et un objectif clair : être utile, lisible et robuste."
          textAlignClassName="text-center"
        />

        {/* Grille masonry (react-masonry-css) : flux horizontal, colonnes à hauteur variable */}
        <ProjectsMasonry projects={projectsList} />

        <section
          className="mt-20 border-t border-border/80 pt-14 text-center md:mt-28 md:pt-16"
          aria-labelledby="cta-projets"
        >
          <h2 id="cta-projets" className="sr-only">
            Passer à l’action
          </h2>
          <p className="text-paragraphe font-medium text-foreground">
            Un projet en tête ?
          </p>
          <p className="mt-2 text-muted-foreground text-pretty">
            Parlons de vos objectifs et de la meilleure façon de les réaliser. Découvrez nos{" "}
            <Link href="/services" className="text-foreground font-medium underline-offset-2 hover:underline">
              services
            </Link>
            {" "}ou notre{" "}
            <Link href="/mode-de-fonctionnement" className="text-foreground font-medium underline-offset-2 hover:underline">
              méthode
            </Link>
            .
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
