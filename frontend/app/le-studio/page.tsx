import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/landing/AnimatedSection";
import { BioSection } from "@/components/landing/BioSection";
import { CTA } from "@/components/landing/CTA";
import { Separator } from "@/components/ui/separator";
import { TechPanel } from "@/components/landing/TechPanel";

export const metadata: Metadata = {
  title: "Le Studio",
  description:
    "Tarik Talhaoui, développeur depuis plus de 10 ans, product builder à Avignon. Création de sites et d’applications : front, back, design, SEO, product management. Éthique, humain, expériences qui captivent.",
  openGraph: {
    title: "Le Studio | Studio Castel",
    description:
      "Tarik Talhaoui, développeur product builder à Avignon. Création de sites et d’applications, éthique et expériences qui captivent.",
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
      {/* Hero : intermédiaire entre accueil (lettres animées) et services (image seule). Image + texte overlay, pas full viewport. */}
      <section
        className="relative -mt-20 flex min-h-[75vh] flex-col justify-end overflow-hidden md:-mt-24"
        aria-label="Présentation du studio"
      >
        <div className="pointer-events-none absolute inset-0 -z-10">
          <Image
            src="/illu-studio.png"
            alt=""
            fill
            className="object-cover object-center opacity-50"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
        </div>

        <div className="container flex flex-col justify-end pb-16 pt-12 md:pb-20 md:pt-16">
          <AnimatedSection className="max-w-2xl">
            <p className="text-small font-medium text-muted-foreground">
              Le Studio
            </p>
            <h1 className="mt-2 text-balance text-titre-moyen font-semibold tracking-tight text-foreground md:text-titre-gros">
              Tarik Talhaoui
            </h1>
            <p className="mt-3 text-paragraphe text-muted-foreground text-pretty">
              Développeur depuis plus de 10 ans, product builder à Avignon.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <div className="container mx-auto max-w-5xl px-4 py-16 sm:px-6">
        {/* Présentation : fluide, sans liste. */}
        <AnimatedSection>
          <header>
          <h2 className="sr-only">Présentation</h2>
          <p className="text-paragraphe text-foreground text-pretty leading-relaxed">
            J’ai une vraie fibre de product builder : je peux intervenir sur tout
            le spectre, du front au back, du design à l’admin système, du SEO au
            product management et à l’accessibilité. L’idée n’est pas d’aligner
            des compétences pour le catalogue, c’est de pouvoir porter un projet
            de bout en bout, prendre les bonnes décisions à chaque niveau et
            livrer un produit cohérent qui sert vraiment vos utilisateurs.
          </p>
        </header>
        </AnimatedSection>

        <Separator className="my-12 md:my-16" />

        {/* Valeurs */}
        <AnimatedSection>
        <section aria-labelledby="valeurs">
          <h2 id="valeurs" className="text-titre-petit font-semibold tracking-tight">
            Valeurs & philosophie
          </h2>
          <p className="mt-4 text-paragraphe text-muted-foreground text-pretty">
            Je privilégie l’éthique, l’humain et le social : j’essaie de travailler
            sur des projets qui font sens. Ma philosophie, c’est de gamifier les
            interactions sur les applications, de garder les utilisateurs captivés
            par les produits du web et de proposer des expériences qui donnent
            envie de revenir.
          </p>
        </section>
        </AnimatedSection>

        <Separator className="my-12 md:my-16" />

        {/* Bio + photo illu-bio (image qui entre au scroll, comme sur l'accueil) */}
        <AnimatedSection>
        <BioSection>
          <p className="text-paragraphe text-muted-foreground text-pretty">
            Né à Reims, j'ai sillonné la France avant de poser mes valises à
            Avignon pour créer mon studio et me consacrer à la conception de
            sites et d'applications web.
          </p>
          <p className="text-paragraphe text-muted-foreground text-pretty">
            J'ai travaillé pour des agences dans la conception de produit :
            webradio B2B en marque blanche ; dashboards (dont un interne) et
            sites e-commerce, avec mise en place de design systems en Nuxt. En
            parallèle, j'ai accompagné des associations, notamment dans
            l'univers du jeu de rôle.
          </p>
          <p className="text-paragraphe text-muted-foreground text-pretty">
            Aujourd'hui je développe{" "}
            <a
              href="https://polinizz.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline-offset-4 hover:underline"
            >
              Polinizz.fr
            </a>
            , qui permet de découvrir tout ce qui se passe autour de soi. Le
            projet a rejoint l'incubateur French Tech en 2026. Je souhaite
            approfondir le développement d'outils de gamification, la
            conformité RGPD et l'accessibilité.
          </p>
        </BioSection>
        </AnimatedSection>

        <Separator className="my-12 md:my-16" />

        {/* Technos : liste + volet au clic */}
        <AnimatedSection>
        <section aria-labelledby="technologies">
          <h2 id="technologies" className="text-titre-petit font-semibold tracking-tight">
            Technologies & outils
          </h2>
          <p className="mt-4 text-muted-foreground text-pretty">
            Les technos que j’utilise au quotidien sont détaillées sur les{" "}
            <Link href="/services" className="text-primary underline-offset-4 hover:underline">
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
