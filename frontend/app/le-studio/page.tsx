import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/landing/AnimatedSection";
import { BioSection } from "@/components/landing/BioSection";
import { CTA } from "@/components/landing/CTA";
import { PageHero } from "@/components/landing/PageHero";
import { Separator } from "@/components/ui/separator";
import { TechPanel } from "@/components/landing/TechPanel";

export const metadata: Metadata = {
  title: "Le Studio",
  description:
    "Tarik Talhaoui, product builder à Avignon. Conception de sites et d’applications sur mesure : design, front-end, back-end, SEO, accessibilité, product management. Projets à impact, éthique et expériences qui captivent.",
  openGraph: {
    title: "Le Studio | Studio Castel",
    description:
      "Product builder à Avignon. Sites et applications sur mesure, performance, UX et pérennité. Éthique, humain, expériences qui captivent.",
    type: "website",
    locale: "fr_FR",
  },
  alternates: {
    canonical: "/le-studio",
  },
};

export default function LeStudioPage() {
  return (
    <>
      <PageHero
        label="Le Studio"
        title="Tarik Talhaoui"
        description="Product builder à Avignon : conception de sites et d’applications sur mesure."
        ariaLabel="Présentation du studio"
        imageSrc="/assets/illustrations/illu-studio.png"
        minHeight="tall"
        contentPadding="studio"
      />

      <div className="container mx-auto max-w-5xl px-4 py-16 sm:px-6">
        {/* Présentation */}
        <AnimatedSection>
          <header>
            <h2 className="sr-only">Présentation</h2>
            <p className="text-paragraphe text-foreground text-pretty leading-relaxed">
              J’ai une vraie culture de product builder. J’interviens sur
              l’ensemble de la chaîne de conception d’un produit numérique, du
              design à la mise en production, du front-end au back-end, de
              l’architecture technique au SEO, en passant par l’accessibilité,
              l’administration système et le product management.
            </p>
            <p className="mt-4 text-paragraphe text-foreground text-pretty leading-relaxed">
              Mon approche n’est pas d’empiler des compétences, mais de porter un
              projet de bout en bout. Comprendre les enjeux, faire les bons choix
              techniques et fonctionnels à chaque étape, et livrer un produit
              cohérent, robuste et utile. Un produit pensé pour vos utilisateurs,
              pas pour une démo.
            </p>
            <p className="mt-4 text-paragraphe text-foreground text-pretty leading-relaxed">
              Je conçois des sites web et applications sur mesure orientés
              performance, lisibilité, évolutivité et usage réel, avec une
              attention particulière portée à la qualité du code, à l’expérience
              utilisateur et à la pérennité des solutions.
            </p>
          </header>
        </AnimatedSection>

        <Separator className="my-12 md:my-16" />

        {/* Valeurs et philosophie */}
        <AnimatedSection>
          <section aria-labelledby="valeurs">
            <h2
              id="valeurs"
              className="text-titre-petit font-semibold tracking-tight"
            >
              Valeurs et philosophie
            </h2>
            <p className="mt-4 text-paragraphe text-muted-foreground text-pretty">
              Je privilégie des projets qui ont du sens. L’éthique, l’humain et
              l’impact social font partie intégrante de ma manière de travailler.
            </p>
            <p className="mt-4 text-paragraphe text-muted-foreground text-pretty">
              Ma philosophie produit repose sur une idée simple : donner envie
              de revenir. J’explore beaucoup les mécaniques de gamification,
              d’engagement et de rétention, non pas pour manipuler l’utilisateur,
              mais pour rendre les interfaces plus vivantes, plus claires et plus
              stimulantes.
            </p>
            <p className="mt-4 text-paragraphe text-muted-foreground text-pretty">
              J’aime créer des expériences web qui captivent sans surcharger,
              qui guident sans contraindre, et qui transforment un outil en
              véritable compagnon d’usage.
            </p>
          </section>
        </AnimatedSection>

        <Separator className="my-12 md:my-16" />

        {/* Bio + photo */}
        <AnimatedSection>
          <BioSection>
            <p className="text-paragraphe text-muted-foreground text-pretty">
              Né à Reims, j’ai parcouru la France avant de m’installer à Avignon,
              où j’ai créé mon studio web pour me consacrer pleinement à la
              conception de sites et d’applications modernes.
            </p>
            <p className="mt-4 text-paragraphe text-muted-foreground text-pretty">
              J’ai travaillé pour plusieurs agences sur des projets de conception
              produit variés : webradio B2B en marque blanche, dashboards métiers
              (dont des outils internes), sites e-commerce, et mise en place de
              design systems en Nuxt. En parallèle, j’ai accompagné des
              associations, notamment dans l’univers du jeu de rôle, sur des
              projets mêlant technique, narration et communauté.
            </p>
            <p className="mt-4 text-paragraphe text-muted-foreground text-pretty">
              Aujourd’hui, je développe{" "}
              <a
                href="https://polinizz.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline-offset-4 hover:underline"
              >
                Polinizz.fr
              </a>
              , une plateforme dédiée à la découverte des événements locaux et de
              ce qui se passe autour de soi. Le projet a intégré un incubateur
              French Tech en 2026.
            </p>
            <p className="mt-4 text-paragraphe text-muted-foreground text-pretty">
              Je poursuis en parallèle un travail de fond sur la gamification,
              la conformité RGPD et l’accessibilité numérique, avec l’objectif de
              construire des produits utiles, responsables et durables.
            </p>
          </BioSection>
        </AnimatedSection>

        <Separator className="my-12 md:my-16" />

        {/* Technologies & outils */}
        <AnimatedSection>
          <section aria-labelledby="technologies">
            <h2
              id="technologies"
              className="text-titre-petit font-semibold tracking-tight"
            >
              Technologies & outils
            </h2>
            <p className="mt-4 text-muted-foreground text-pretty">
              Les technos que j’utilise au quotidien sont détaillées sur les{" "}
              <Link
                href="/services"
                className="text-primary underline-offset-4 hover:underline"
              >
                pages services
              </Link>
              . Cliquez sur une techno pour voir comment je l’utilise et comment
              mon parcours a évolué avec.
            </p>
            <div className="mt-8">
              <TechPanel />
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection>
          <div className="mt-12 flex justify-center md:mt-16">
            <Button size="lg" asChild>
              <Link href="/devis">
                Demander un devis <ArrowRight className="ml-2 size-5" />
              </Link>
            </Button>
          </div>
        </AnimatedSection>
      </div>

      <AnimatedSection>
        <CTA />
      </AnimatedSection>
    </>
  );
}
