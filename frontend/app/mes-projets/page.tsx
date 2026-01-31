import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ProjectsMasonry } from "@/components/landing/ProjectsMasonry";
import { SectionIntro } from "@/components/landing/SectionIntro";
import { projectsList } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Mes projets | Studio Castel",
  description:
    "Réalisations Studio Castel : Polinizz, Serpenter, sites vitrines (Florine, Arnaud, Brice), Archéode, Bobithèque, Pavat, Préhistopia. Avignon et partout.",
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
      {/* Hero : même veine que Services et Le Studio */}
      <section
        className="relative -mt-20 flex min-h-[50vh] flex-col justify-end overflow-hidden md:-mt-24"
        aria-label="Mes projets"
      >
        <div className="pointer-events-none absolute inset-0 -z-10">
          <Image
            src="/hero-background.png"
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
            Portfolio
          </p>
          <h1 className="mt-2 text-balance text-titre-moyen font-semibold tracking-tight text-foreground md:text-titre-gros">
            Mes projets
          </h1>
          <p className="mt-3 max-w-2xl text-paragraphe text-muted-foreground text-pretty">
            Sites vitrines, outils métier, jeux et projets sur mesure réalisés
            à Avignon et ailleurs.
          </p>
        </div>
      </section>

      <div className="container mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionIntro
          label="Réalisations"
          title="Une sélection de projets récents."
          description="Du site vitrine au produit avec IA, en passant par le JDR et le jeu : chaque projet est livré avec la même exigence."
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
            Parlons de vos objectifs et de la meilleure façon de les réaliser.
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
