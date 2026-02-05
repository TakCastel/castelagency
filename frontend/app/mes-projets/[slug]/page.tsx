import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";

import { Breadcrumb } from "@/components/landing/Breadcrumb";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/landing/AnimatedSection";
import { BLUR_DATA_URL } from "@/lib/image-placeholder";
import { Separator } from "@/components/ui/separator";
import { TechIcons } from "@/components/landing/TechIcons";
import {
  getProjectBySlug,
  getProjectSlugs,
  type ProjectDetail,
} from "@/lib/projects";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

const SITE_URL = "https://studio-castel.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Projet introuvable" };
  const ogImage = project.image.startsWith("http")
    ? project.image
    : `${SITE_URL}${project.image}`;
  return {
    title: `${project.title} | Mes projets | Studio Castel`,
    description: project.description,
    openGraph: {
      title: `${project.title} | Studio Castel`,
      description: project.description,
      type: "website",
      locale: "fr_FR",
      images: [{ url: ogImage, width: 1200, height: 630, alt: project.imageAlt || project.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Studio Castel`,
      description: project.description,
      images: [ogImage],
    },
    alternates: {
      canonical: `/mes-projets/${project.id}`,
    },
  };
}

function ProjectSections({ project }: { project: ProjectDetail }) {
  return (
    <div className="space-y-12 md:space-y-16">
      {project.resultsSummary && (
        <>
          <AnimatedSection>
            <section
              aria-labelledby="results"
              className="rounded-lg border border-primary/20 bg-primary/5 px-5 py-5 md:px-6 md:py-6"
            >
              <h2
                id="results"
                className="text-titre-petit font-semibold tracking-tight text-foreground"
              >
                Résultats
              </h2>
              <p className="mt-3 text-muted-foreground text-pretty leading-relaxed">
                {project.resultsSummary}
              </p>
            </section>
          </AnimatedSection>
          <Separator className="my-12 md:my-16" />
        </>
      )}

      {(project.objective || project.constraints) && (
        <>
          <AnimatedSection delay={project.resultsSummary ? 0.5 : 0}>
            <section aria-labelledby="contexte">
              <h2
                id="contexte"
                className="text-titre-petit font-semibold tracking-tight text-foreground"
              >
                Contexte
              </h2>
              {project.objective && (
                <p className="mt-4 text-muted-foreground text-pretty leading-relaxed">
                  <span className="font-medium text-foreground">Objectif : </span>
                  {project.objective}
                </p>
              )}
              {project.constraints && (
                <p className="mt-3 text-muted-foreground text-pretty leading-relaxed">
                  <span className="font-medium text-foreground">Contraintes : </span>
                  {project.constraints}
                </p>
              )}
            </section>
          </AnimatedSection>
          <Separator className="my-12 md:my-16" />
        </>
      )}

      <AnimatedSection delay={project.resultsSummary || project.objective || project.constraints ? 1 : 0}>
        <section aria-labelledby="use-case">
          <h2
            id="use-case"
            className="text-titre-petit font-semibold tracking-tight text-foreground"
          >
            Use case
          </h2>
          <p className="mt-4 text-muted-foreground text-pretty leading-relaxed">
            {project.useCase}
          </p>
        </section>
      </AnimatedSection>

      <Separator className="my-12 md:my-16" />

      <AnimatedSection delay={1}>
        <section aria-labelledby="what-i-did">
          <h2
            id="what-i-did"
            className="text-titre-petit font-semibold tracking-tight text-foreground"
          >
            Ce que j’ai fait
          </h2>
          <p className="mt-4 text-muted-foreground text-pretty leading-relaxed">
            {project.whatIDid.join(" ")}
          </p>
        </section>
      </AnimatedSection>

      <Separator className="my-12 md:my-16" />

      <AnimatedSection delay={2}>
        <section aria-labelledby="how-i-worked">
          <h2
            id="how-i-worked"
            className="text-titre-petit font-semibold tracking-tight text-foreground"
          >
            Comment j'ai abordé le projet
          </h2>
          <p className="mt-4 text-muted-foreground text-pretty leading-relaxed">
            {project.howIWorked.join(" ")}
          </p>
        </section>
      </AnimatedSection>

      <Separator className="my-12 md:my-16" />

      <AnimatedSection delay={3}>
        <section aria-labelledby="accomplishments">
          <h2
            id="accomplishments"
            className="text-titre-petit font-semibold tracking-tight text-foreground"
          >
            Ce que j’ai accompli et aidé à mettre en place
          </h2>
          <p className="mt-4 text-muted-foreground text-pretty leading-relaxed">
            {project.accomplishments.join(" ")}
          </p>
        </section>
      </AnimatedSection>

      <Separator className="my-12 md:my-16" />

      {project.testimonial ? (
        <>
          <Separator className="my-12 md:my-16" />
          <AnimatedSection delay={4}>
            <section
              aria-labelledby="temoignage"
              className="rounded-lg border border-border/80 bg-card/50 px-5 py-5 md:px-6 md:py-6"
            >
              <h2 id="temoignage" className="sr-only">
                Témoignage client
              </h2>
              <blockquote className="text-muted-foreground text-pretty leading-relaxed italic">
                « {project.testimonial.quote} »
              </blockquote>
              <footer className="mt-4 text-sm text-foreground">
                — {project.testimonial.author}
                {project.testimonial.role && (
                  <span className="text-muted-foreground"> · {project.testimonial.role}</span>
                )}
              </footer>
            </section>
          </AnimatedSection>
          <Separator className="my-12 md:my-16" />
        </>
      ) : null}

      <Separator className="my-12 md:my-16" />

      <AnimatedSection delay={project.testimonial ? 5 : 4}>
        <section aria-labelledby="technologies">
          <h2
            id="technologies"
            className="text-titre-petit font-semibold tracking-tight text-foreground"
          >
            Technologies utilisées
          </h2>
          <TechIcons technologies={project.technologies} />
        </section>
      </AnimatedSection>
    </div>
  );
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <>
      {/* Hero : même image que la page d’accueil */}
      <section
        className="relative -mt-40 flex min-h-[50vh] flex-col justify-end overflow-hidden md:-mt-48"
        aria-label={project.title}
      >
        <div className="pointer-events-none absolute inset-0 -z-10">
          <Image
            src="/assets/illustrations/hero-background.png"
            alt=""
            fill
            className="object-cover object-center opacity-50"
            sizes="100vw"
            priority
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
        </div>

        <div className="container flex flex-col justify-end pb-12 pt-40 md:pb-16 md:pt-48">
          <Link
            href="/mes-projets"
            className="inline-flex items-center gap-2 text-small font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour à mes projets
          </Link>
          <h1 className="mt-4 text-balance text-titre-moyen font-semibold tracking-tight text-foreground md:text-titre-gros">
            {project.title}
          </h1>
          <p className="mt-3 max-w-2xl text-paragraphe text-muted-foreground text-pretty">
            {project.description}
          </p>
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Mes projets", href: "/mes-projets" },
              { label: project.title },
            ]}
          />
        </div>
      </section>

      <div className="container mx-auto max-w-3xl px-4 py-16 sm:px-6">
        {/* Image du site / app en tête d’article : cadre smartphone pour apps mobiles */}
        <figure className="mb-12 md:mb-16">
          {project.isMobileApp ? (
            <div className="flex flex-col items-center">
              <div className="relative mx-auto aspect-[9/19] w-full max-w-[280px] overflow-hidden rounded-[1.5rem] border-4 border-border bg-muted shadow-xl">
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  className="object-cover object-top"
                  sizes="280px"
                  priority
                />
              </div>
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl border border-border/80 bg-muted">
              <div className="relative aspect-video w-full">
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 48rem"
                  priority
                />
              </div>
            </div>
          )}
          <figcaption className="mt-4 border-t border-border/80 bg-card px-4 py-3 md:px-5 md:py-4">
            <p className="text-small text-muted-foreground">
              {project.isMobileApp
                ? "Aperçu de l’application mobile."
                : `Aperçu du projet ${project.title}.`}
            </p>
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 text-small font-medium text-primary hover:underline"
              >
                {project.isMobileApp ? "Voir l’app" : "Voir le site"}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </figcaption>
        </figure>

        <ProjectSections project={project} />

        <section
          className="mt-16 border-t border-border/80 pt-12 text-center md:mt-20 md:pt-14"
          aria-labelledby="cta-project"
        >
          <h2 id="cta-project" className="sr-only">
            Aller sur le site du projet
          </h2>
          <p className="text-small text-muted-foreground text-pretty mb-6">
            Un projet similaire ? Consultez nos{" "}
            <Link href="/services" className="text-foreground font-medium underline-offset-2 hover:underline">
              services
            </Link>
            {" "}(site vitrine, e‑commerce, applications sur mesure, SEO) ou{" "}
            <Link href="/contact" className="text-foreground font-medium underline-offset-2 hover:underline">
              contactez-moi
            </Link>
            .
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" variant="outline" className="gap-2">
              <Link href="/mes-projets">
                <ArrowLeft className="h-4 w-4" />
                Tous mes projets
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/services">Voir nos services</Link>
            </Button>
            {project.url && (
              <Button asChild size="lg" className="gap-2">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.isMobileApp ? "Voir l’app" : "Voir le site"}
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
