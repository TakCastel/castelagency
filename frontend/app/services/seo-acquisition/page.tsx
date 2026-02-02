import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  BarChart2,
  FileSearch,
  Link2,
  Search,
  Target,
  Zap,
} from "lucide-react";
import { DiGoogleAnalytics, DiGoogleCloudPlatform } from "react-icons/di";
import { GiLighthouse } from "react-icons/gi";
import { IoLogoFirebase } from "react-icons/io5";
import { RiNotionFill } from "react-icons/ri";
import { SiPagespeedinsights } from "react-icons/si";

import { HeroCardPageLayout } from "@/components/landing/HeroCardPageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "SEO & acquisition à Avignon | Studio Castel",
  description:
    "Agence web à Avignon : SEO technique, contenu, maillage, analytics et acquisition. Google Analytics, Lighthouse, PageSpeed, Firebase, GCP, Notion. Devis gratuit.",
  keywords: [
    "SEO Avignon",
    "acquisition trafic organique",
    "Google Analytics",
    "Lighthouse PageSpeed",
    "SEO technique",
    "agence web Avignon",
  ],
  openGraph: {
    title: "SEO & acquisition à Avignon | Studio Castel",
    description:
      "SEO technique, contenu, maillage, analytics et acquisition. Mesure, performance et visibilité. Studio Castel, Avignon.",
    type: "website",
    locale: "fr_FR",
  },
  alternates: {
    canonical: "/services/seo-acquisition",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "SEO et acquisition à Avignon",
  description:
    "Studio Castel propose un accompagnement SEO et acquisition : SEO technique, contenu, maillage, analytics (Google Analytics, Lighthouse, PageSpeed), mesure et optimisation du trafic. Agence web à Avignon.",
  provider: {
    "@type": "LocalBusiness",
    name: "Studio Castel",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Avignon",
    },
  },
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: { "@type": "GeoCoordinates", latitude: 43.9493, longitude: 4.8059 },
    geoRadius: "50000",
  },
  url: "https://studiocastel.fr/services/seo-acquisition",
};

export default function SeoAcquisitionPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroCardPageLayout imageSrc="/assets/illustrations/illu-seo.png">
        <article>
          <div className="container px-4 pb-12 pt-4 sm:px-6">
            <div className="relative mx-auto max-w-3xl rounded-xl border border-border bg-background px-6 py-8 sm:px-8 sm:py-10">
              <div
                className="absolute -top-3 right-2 z-10 w-20 origin-top-right overflow-hidden rounded-b-sm border-t-0 border-l border-r border-b border-neutral-200/80 bg-white px-2 pt-3 pb-2 sm:-top-6 sm:right-6 sm:w-32 sm:px-3.5 sm:pt-6 sm:pb-5 dark:border-neutral-600/50 dark:bg-white/95"
                style={{
                  transform: "rotate(8deg)",
                  boxShadow: "0 1px 0 rgba(255,255,255,0.8) inset, 4px 6px 16px rgba(0,0,0,0.12), 2px 3px 8px rgba(0,0,0,0.08), -1px 0 0 rgba(0,0,0,0.04)",
                }}
                aria-label="Tarif à partir de 2000 euros"
              >
                <span className="block text-[0.55rem] font-medium uppercase tracking-[0.15em] text-neutral-500 sm:text-[0.65rem] sm:tracking-[0.2em]">
                  À partir de
                </span>
                <span className="mt-0.5 block text-sm font-bold tabular-nums tracking-tight text-neutral-900 sm:mt-1 sm:text-xl">
                  2 000 €
                </span>
              </div>
              <header>
                <p className="text-small font-medium text-muted-foreground">
                  Service : SEO & acquisition
                </p>
                <h1 className="mt-2 text-balance text-titre-moyen font-semibold tracking-tight">
                  SEO & acquisition
                </h1>
                <p className="mt-6 text-paragraphe text-muted-foreground text-pretty">
                  Être visible sur Google et mesurer ce qui fonctionne, c’est la base d’une acquisition durable. J’accompagne la visibilité de votre site : SEO technique, contenu et maillage, analytics et suivi des performances (Lighthouse, PageSpeed), pour attirer les bons visiteurs et les convertir.
                </p>
                <p className="mt-4 text-paragraphe text-muted-foreground text-pretty">
                  L’objectif : un trafic organique de qualité et des données claires pour optimiser en continu.
                </p>
              </header>
              <Separator className="my-10" />
              <section aria-labelledby="quest-ce-que-seo-acquisition">
                <h2
                  id="quest-ce-que-seo-acquisition"
                  className="text-titre-petit font-semibold tracking-tight"
                >
                  En bref
                </h2>
                <p className="mt-4 text-muted-foreground text-pretty">
                  Le SEO, c’est faire en sorte que votre site soit bien compris par Google et bien classé pour les requêtes de votre cible. L’acquisition, c’est capter ce trafic, le mesurer (Google Analytics, tableaux de bord) et l’optimiser. Les deux vont ensemble : visibilité + données = décisions éclairées.
                </p>
              </section>
            </div>
          </div>

          <div className="container mx-auto max-w-5xl px-4 py-16 sm:px-6">
            <section className="mb-16" aria-labelledby="pour-qui">
              <h2 id="pour-qui" className="text-titre-petit font-semibold tracking-tight">
                Pour qui ?
              </h2>
              <p className="mt-4 text-muted-foreground text-pretty">
                Le SEO et l’acquisition s’adressent à tous ceux qui veulent être trouvés sur Google et comprendre d’où viennent leurs visiteurs. J’adapte le périmètre à votre situation : site neuf ou existant, petit budget ou objectifs ambitieux.
              </p>
              <ul className="mt-6 list-disc space-y-2 pl-6 text-muted-foreground text-pretty">
                <li>Sites vitrines et PME : remonter dans les résultats sur vos mots-clés locaux et métier, et mesurer les demandes de contact.</li>
                <li>E-commerce et marketplaces : améliorer la visibilité des fiches produits et le trafic organique qui convertit.</li>
                <li>Start-ups et SaaS : structurer le SEO dès le lancement (technique, contenu, analytics) pour une acquisition organique pérenne.</li>
                <li>Associations et collectivités : être trouvés sur les recherches d’information et suivre l’impact de la communication.</li>
                <li>Projets avec peu de budget pub : le SEO et l’acquisition organique comme levier prioritaire, complétés par des outils de mesure fiables.</li>
              </ul>
            </section>

            <section className="mb-16" aria-labelledby="livrables">
              <h2 id="livrables" className="text-titre-petit font-semibold tracking-tight">
                Ce que je livre
              </h2>
              <p className="mt-4 text-muted-foreground text-pretty">
                De l’audit à la mise en place des outils, je livre des livrables actionnables : rapports, recommandations, suivi des indicateurs et accompagnement sur la durée si besoin.
              </p>
              <ul className="mt-10 grid gap-6 sm:grid-cols-2" role="list">
                {[
                  { icon: Search, label: "SEO technique", text: "Crawl, indexation, balisage (titres, meta, sémantique), Core Web Vitals et corrections pour que Google comprenne et valorise votre site." },
                  { icon: FileSearch, label: "Contenu & mots-clés", text: "Stratégie de mots-clés, rédaction ou optimisation de pages, maillage interne et longue traîne pour capter des requêtes ciblées." },
                  { icon: Link2, label: "Maillage & liens", text: "Structure des liens internes et recommandations pour un maillage cohérent et des signaux clairs pour les moteurs." },
                  { icon: BarChart2, label: "Analytics & acquisition", text: "Mise en place ou audit de Google Analytics, tableaux de bord, objectifs et suivi du trafic organique et des conversions." },
                  { icon: Zap, label: "Performance & Lighthouse", text: "Audit PageSpeed Insights et Lighthouse, prioritisation des gains (vitesse, UX), suivi des scores et des Core Web Vitals." },
                  { icon: Target, label: "Stratégie & suivi", text: "Définition d’objectifs mesurables, plan d’action SEO/acquisition et suivi régulier (rapports, Notion ou outils de votre choix)." },
                ].map(({ icon: Icon, label, text }) => (
                  <li key={label}>
                    <Card className="h-full border-muted/80">
                      <CardContent className="flex gap-4 p-5">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border bg-muted/50">
                          <Icon className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <h3 className="font-medium text-foreground">{label}</h3>
                          <p className="mt-1 text-small text-muted-foreground text-pretty">
                            {text}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mb-16" aria-labelledby="technologies">
              <h2 id="technologies" className="text-titre-petit font-semibold tracking-tight">
                Avec quels outils ?
              </h2>
              <p className="mt-4 text-muted-foreground text-pretty">
                Je m’appuie sur des outils standards pour la mesure, la performance et la collaboration. Côté analytics et données : <strong className="text-foreground">Google Analytics</strong> pour le trafic et les conversions ; <strong className="text-foreground">Firebase</strong> pour les apps et l’analytics avancé ; <strong className="text-foreground">Google Cloud Platform</strong> pour le stockage, BigQuery ou les traitements de données si besoin.
              </p>
              <p className="mt-4 text-muted-foreground text-pretty">
                Côté performance SEO : <strong className="text-foreground">PageSpeed Insights</strong> et <strong className="text-foreground">Lighthouse</strong> pour auditer la vitesse, l’UX et le SEO technique, et prioriser les optimisations. Côté suivi et rédaction : <strong className="text-foreground">Notion</strong> pour les briefs, les calendriers éditoriaux et les rapports de suivi, en lien avec votre équipe.
              </p>
              <p className="mt-3 text-small font-medium text-muted-foreground">
                Analytics & données
              </p>
              <ul className="mt-2 flex flex-wrap items-center gap-6" aria-label="Outils analytics et données">
                <li className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg border bg-muted/50" aria-hidden>
                    <DiGoogleAnalytics className="h-7 w-7 text-[#E37400]" />
                  </span>
                  <span className="font-medium">Google Analytics</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg border bg-muted/50" aria-hidden>
                    <IoLogoFirebase className="h-7 w-7 text-[#FFCA28]" />
                  </span>
                  <span className="font-medium">Firebase</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg border bg-muted/50" aria-hidden>
                    <DiGoogleCloudPlatform className="h-7 w-7 text-[#4285F4]" />
                  </span>
                  <span className="font-medium">Google Cloud Platform</span>
                </li>
              </ul>
              <p className="mt-6 text-small font-medium text-muted-foreground">
                Performance & SEO technique
              </p>
              <ul className="mt-2 flex flex-wrap items-center gap-6" aria-label="Outils performance et SEO">
                <li className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg border bg-muted/50" aria-hidden>
                    <SiPagespeedinsights className="h-7 w-7 text-[#4285F4]" />
                  </span>
                  <span className="font-medium">PageSpeed Insights</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg border bg-muted/50" aria-hidden>
                    <GiLighthouse className="h-7 w-7 text-foreground" />
                  </span>
                  <span className="font-medium">Lighthouse</span>
                </li>
              </ul>
              <p className="mt-6 text-small font-medium text-muted-foreground">
                Suivi & collaboration
              </p>
              <ul className="mt-2 flex flex-wrap items-center gap-6" aria-label="Outils suivi et collaboration">
                <li className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg border bg-muted/50" aria-hidden>
                    <RiNotionFill className="h-7 w-7 text-foreground" />
                  </span>
                  <span className="font-medium">Notion</span>
                </li>
              </ul>
            </section>

            <section className="mb-16" aria-labelledby="approche">
              <h2 id="approche" className="text-titre-petit font-semibold tracking-tight">
                Mon approche
              </h2>
              <p className="mt-4 text-muted-foreground text-pretty">
                Je pars de vos objectifs (trafic, leads, ventes) et de l’état actuel de votre site. Ensuite : audit SEO technique et contenu, recommandations prioritaires, mise en place ou vérification des outils (Google Analytics, Search Console, Lighthouse), puis plan d’action et suivi. Les données (analytics, PageSpeed, positions) guident les prochaines étapes.
              </p>
              <p className="mt-4 text-muted-foreground text-pretty">
                Vous gardez la main sur les contenus ; je peux rédiger ou optimiser les pages clés. En complément, le SEO s’articule avec la{" "}
                <Link href="/services/site-vitrine" className="text-primary underline-offset-4 hover:underline">
                  création ou refonte de site vitrine
                </Link>
                , l’{" "}
                <Link href="/services/ecommerce" className="text-primary underline-offset-4 hover:underline">
                  e-commerce
                </Link>
                {" "}et l’{" "}
                <Link href="/services/ux-ui-branding" className="text-primary underline-offset-4 hover:underline">
                  UX/UI & branding
                </Link>
                {" "}pour un site à la fois visible, rapide et convertissant.
              </p>
            </section>

            <section className="mb-16" aria-labelledby="acquisition-organique">
              <h2 id="acquisition-organique" className="text-titre-petit font-semibold tracking-tight">
                Acquisition organique : visibilité + mesure
              </h2>
              <p className="mt-4 text-muted-foreground text-pretty">
                L’acquisition organique, c’est le trafic qui vient des moteurs de recherche sans publicité. Pour qu’elle soit efficace, il faut un site techniquement sain (Lighthouse, Core Web Vitals), un contenu pertinent pour vos cibles (mots-clés, maillage) et des outils de mesure (Google Analytics, objectifs, rapports) pour savoir ce qui convertit. J’aligne ces trois leviers pour vous.
              </p>
            </section>

            <section className="mb-16" aria-labelledby="ce-que-ma-maitrise">
              <h2 id="ce-que-ma-maitrise" className="text-titre-petit font-semibold tracking-tight">
                Ce que ma maîtrise peut vous apporter
              </h2>
              <p className="mt-4 text-muted-foreground text-pretty">
                Un accompagnement sur mesure : je prends le temps de comprendre votre marché, vos mots-clés et vos objectifs pour mettre en place une stratégie SEO et d’acquisition réaliste. Données fiables, priorités claires et suivi dans la durée.
              </p>
              <p className="mt-4 text-muted-foreground text-pretty">
                Si vous lancez un nouveau site ou une refonte, le SEO et l’analytics peuvent être intégrés dès le départ. Si votre site existe déjà, on part d’un audit (technique, contenu, analytics) pour corriger les freins et amplifier ce qui fonctionne.
              </p>
            </section>

            <Separator className="my-12" />

            <section className="py-12 text-center" aria-labelledby="cta">
              <h2 id="cta" className="sr-only">
                Passer à l’action
              </h2>
              <p className="text-paragraphe font-medium text-foreground">
                Prêt à donner de la visibilité à votre site et à mesurer votre acquisition ?
              </p>
              <p className="mt-4 text-muted-foreground text-pretty">
                Parlons de vos objectifs, de votre site actuel et des indicateurs qui comptent pour vous. Je vous réponds rapidement.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Button asChild size="lg">
                  <Link href="/devis">Demander un devis</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/contact">Me contacter</Link>
                </Button>
              </div>
            </section>

            <figure className="pt-8">
              <Image
                src="/assets/illustrations/illu-seo-bottom.png"
                alt="Illustration évoquant le SEO et l’acquisition : visibilité, structure et mesure, pour rappeler que la visibilité et l’acquisition se construisent avec méthode."
                width={1200}
                height={600}
                className="h-auto w-full object-contain"
                sizes="(max-width: 768px) 100vw, 64rem"
              />
              <figcaption className="mt-3 text-center text-sm text-muted-foreground">
                Bien visible, bien trouvé.
              </figcaption>
            </figure>
          </div>
</article>
      </HeroCardPageLayout>
    </>
  );
}
