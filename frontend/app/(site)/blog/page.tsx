import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { BlogMasonry } from "@/components/landing/BlogMasonry";
import { PageHero } from "@/components/landing/PageHero";
import { SectionIntro } from "@/components/landing/SectionIntro";
import { blogList } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Mon blog | Studio Castel",
  description:
    "Articles et réflexions sur le web, l’IA, les agents et la tech. Studio Castel, Avignon.",
  openGraph: {
    title: "Mon blog | Studio Castel",
    description:
      "Articles et réflexions sur le web, l’IA, les agents et la tech.",
    type: "website",
    locale: "fr_FR",
  },
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        label="Mon blog"
        title="Mon blog"
        description="Réflexions sur le web, l'IA, les agents et la tech. Ce qui est réel, ce qui relève du mythe, et ce qui compte vraiment."
        breadcrumb={[{ label: "Accueil", href: "/" }, { label: "Mon blog" }]}
        ariaLabel="Mon blog"
      />

      <div className="container mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionIntro
          label="Articles"
          title="Une sélection d’articles récents."
          description="Décryptages, mises au point et points de vigilance autour des usages actuels de l’IA et du web."
          textAlignClassName="text-center"
        />

        <p className="mx-auto mt-4 max-w-2xl text-center text-paragraphe text-muted-foreground">
          Vous avez un projet de site ou d'application ? Découvrez nos{" "}
          <Link href="/services" className="text-foreground font-medium underline-offset-2 hover:underline">
            services
          </Link>
          {" "}et notre{" "}
          <Link href="/mode-de-fonctionnement" className="text-foreground font-medium underline-offset-2 hover:underline">
            méthode
          </Link>
          .
        </p>

        <BlogMasonry posts={blogList} />

        <section
          className="mt-20 border-t border-border/80 pt-14 text-center md:mt-28 md:pt-16"
          aria-labelledby="cta-blog"
        >
          <h2 id="cta-blog" className="sr-only">
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
