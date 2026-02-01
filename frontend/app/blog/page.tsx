import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { BlogMasonry } from "@/components/landing/BlogMasonry";
import { SectionIntro } from "@/components/landing/SectionIntro";
import { blogList } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | Studio Castel",
  description:
    "Articles et réflexions sur le web, l’IA, les agents et la tech. Studio Castel, Avignon.",
  openGraph: {
    title: "Blog | Studio Castel",
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
      <section
        className="relative -mt-20 flex min-h-[50vh] flex-col justify-end overflow-hidden md:-mt-24"
        aria-label="Blog"
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
          <p className="text-small font-medium text-muted-foreground">Blog</p>
          <h1 className="mt-2 text-balance text-titre-moyen font-semibold tracking-tight text-foreground md:text-titre-gros">
            Blog
          </h1>
          <p className="mt-3 max-w-2xl text-paragraphe text-muted-foreground text-pretty">
            Réflexions sur le web, l’IA, les agents et la tech. Ce qui est réel,
            ce qui relève du mythe, et ce qui compte vraiment.
          </p>
        </div>
      </section>

      <div className="container mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionIntro
          label="Articles"
          title="Une sélection d’articles récents."
          description="Décryptages, mises au point et points de vigilance autour des usages actuels de l’IA et du web."
          textAlignClassName="text-center"
        />

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
