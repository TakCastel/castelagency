import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Gauge, Accessibility } from "lucide-react";

import { Breadcrumb } from "@/components/landing/Breadcrumb";
import { HeroCardPageLayout } from "@/components/landing/HeroCardPageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Développeur web freelance à Avignon | Studio Castel",
  description:
    "Développeur web freelance à Avignon : sites performants, Next.js, React, TypeScript. Performance, accessibilité, SEO. Méthode claire, délais réalistes. Devis gratuit.",
  keywords: [
    "développeur web Avignon",
    "freelance web Avignon",
    "développeur Next.js Avignon",
    "création site Avignon",
    "développeur front-end Vaucluse",
  ],
  openGraph: {
    title: "Développeur web freelance à Avignon | Studio Castel",
    description:
      "Développeur web freelance à Avignon : Next.js, React, performance, accessibilité. Méthode, tarifs indicatifs, délais. Studio Castel.",
    type: "website",
    locale: "fr_FR",
  },
  alternates: {
    canonical: "/developpeur-web-avignon",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Tarik Talhaoui",
  jobTitle: "Développeur web freelance",
  description:
    "Développeur web freelance à Avignon : création de sites performants avec Next.js, React, TypeScript. Performance, accessibilité et SEO.",
  worksFor: {
    "@type": "Organization",
    name: "Studio Castel",
    address: { "@type": "PostalAddress", addressLocality: "Avignon" },
  },
  address: { "@type": "PostalAddress", addressLocality: "Avignon", addressRegion: "Vaucluse" },
  areaServed: [{ "@type": "City", name: "Avignon" }, { "@type": "State", name: "Vaucluse" }],
  url: "https://studio-castel.com/developpeur-web-avignon",
};

const faqItems = [
  {
    q: "Pourquoi faire appel à un développeur freelance plutôt qu’une agence ?",
    a: "Vous travaillez avec une seule personne : cadrage direct, réactivité et cohérence technique. Pas de turnover ni de sous-traitance cachée. Les tarifs sont souvent plus maîtrisés et le lien de confiance plus simple à construire. Idéal pour les projets de taille petite à moyenne (site vitrine, refonte, outil sur mesure).",
  },
  {
    q: "Quels délais pour un site vitrine ou une refonte ?",
    a: "Un site vitrine bien cadré : quelques jours à 2–3 semaines selon le nombre de pages et le contenu. Une refonte complète : 4 à 8 semaines en général. Les délais sont fixés au cadrage et tenus par jalons de livraison. Je privilégie des livraisons courtes pour valider au fur et à mesure.",
  },
  {
    q: "Quels tarifs pour un développement web à Avignon ?",
    a: "Les tarifs dépendent du périmètre. Site vitrine : à partir de 1 500 €. Refonte ou site plus riche : 3 000 € à 8 000 €. Application sur mesure : au-delà, selon la complexité. Un devis détaillé est fourni après le cadrage. La première heure d’échange est gratuite.",
  },
  {
    q: "Travaillez-vous uniquement à Avignon ou aussi à distance ?",
    a: "Je suis basé à Avignon (Vaucluse) et travaille en local pour les clients de la région (Avignon, Vaucluse, PACA) et à distance partout en France. Visio, partage d’écran et outils collaboratifs permettent un suivi fluide. Déplacements sur site possibles pour le cadrage ou les formations.",
  },
  {
    q: "Garantissez-vous la performance et l’accessibilité des sites ?",
    a: "Oui. Je vise de bons scores Lighthouse (performance, accessibilité, SEO) et une base WCAG raisonnable dès la conception. Les sites sont livrés avec des bonnes pratiques (images optimisées, code sémantique, Core Web Vitals). Un audit peut être inclus dans le périmètre si vous le souhaitez.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((it) => ({
    "@type": "Question",
    name: it.q,
    acceptedAnswer: { "@type": "Answer", text: it.a },
  })),
};

export default function DeveloppeurWebAvignonPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <HeroCardPageLayout imageSrc="/assets/illustrations/illu-app.png">
        <article>
          <div className="container px-4 pb-12 pt-4 sm:px-6">
            <div className="mx-auto max-w-3xl">
              <Breadcrumb
                items={[
                  { label: "Accueil", href: "/" },
                  { label: "Développeur web freelance à Avignon" },
                ]}
              />
            </div>
            <div className="relative mx-auto mt-4 max-w-3xl rounded-xl border border-border bg-background px-6 py-8 sm:px-8 sm:py-10">
              <header>
                <p className="text-small font-medium text-muted-foreground">
                  Freelance · Avignon & Vaucluse
                </p>
                <h1 className="mt-2 text-balance text-titre-moyen font-semibold tracking-tight">
                  Développeur web freelance à Avignon
                </h1>
                <p className="mt-6 text-paragraphe text-muted-foreground text-pretty">
                  Je conçois et développe des sites et applications web performants, accessibles et bien référencés. Basé à Avignon, je travaille avec les entreprises et indépendants du Vaucluse et en remote partout en France. Stack moderne (Next.js, React, TypeScript), méthode claire et livraisons par étapes.
                </p>
                <p className="mt-4 text-paragraphe text-muted-foreground text-pretty">
                  Site vitrine, refonte, e‑commerce ou outil sur mesure : on cadre ensemble le périmètre, les délais et le budget, puis on avance par jalons validés.
                </p>
              </header>
              <Separator className="my-10" />

              <section aria-labelledby="stack-technique">
                <h2
                  id="stack-technique"
                  className="text-titre-petit font-semibold tracking-tight"
                >
                  Stack & technologies
                </h2>
                <p className="mt-4 text-muted-foreground text-pretty">
                  J’utilise des technologies éprouvées et adaptées au projet : <strong className="text-foreground">Next.js</strong> et <strong className="text-foreground">React</strong> pour des sites rapides et un bon SEO, <strong className="text-foreground">TypeScript</strong> pour un code maintenable, <strong className="text-foreground">Tailwind CSS</strong> et composants (shadcn/ui, etc.) pour l’interface. Pour le contenu : <strong className="text-foreground">Directus</strong>, WordPress ou headless selon le besoin. E‑commerce : WooCommerce, Shopify ou PrestaShop. Chaque choix est justifié par la pérennité et la performance.
                </p>
              </section>
            </div>
          </div>

          <div className="container mx-auto max-w-5xl px-4 py-16 sm:px-6">
            <div className="grid gap-10 md:grid-cols-2 md:gap-12">
              <Card className="border-border/80 bg-card/50">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Gauge className="h-5 w-5" />
                    </div>
                    <h3 className="text-titre-petit font-semibold">Performance</h3>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground text-pretty">
                    Core Web Vitals, images optimisées, chargement progressif. Objectif : des sites rapides sur mobile et desktop, avec de bons scores Lighthouse.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-border/80 bg-card/50">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Accessibility className="h-5 w-5" />
                    </div>
                    <h3 className="text-titre-petit font-semibold">Accessibilité</h3>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground text-pretty">
                    Structure sémantique, contrastes, navigation clavier et bonnes pratiques WCAG pour que le site soit utilisable par le plus grand nombre.
                  </p>
                </CardContent>
              </Card>
            </div>

            <section className="mt-16" aria-labelledby="methode-delais">
              <h2 id="methode-delais" className="text-titre-petit font-semibold tracking-tight">
                Méthode & délais typiques
              </h2>
              <p className="mt-4 text-muted-foreground text-pretty">
                Cadrage d’abord : objectifs, cible, arborescence et plan de contenu. Ensuite conception et développement par jalons, avec des points de validation. Délais indicatifs : site vitrine simple 1–3 semaines, refonte 4–8 semaines, application sur mesure selon le périmètre. La première heure d’échange est gratuite ; le devis et le planning sont envoyés après le cadrage.
              </p>
            </section>

            <section className="mt-16" aria-labelledby="tarifs-indicatifs">
              <h2 id="tarifs-indicatifs" className="text-titre-petit font-semibold tracking-tight">
                Tarifs indicatifs
              </h2>
              <p className="mt-4 text-muted-foreground text-pretty">
                Site vitrine : à partir de 1 500 €. Refonte ou site plus riche : 3 000 € à 8 000 €. E‑commerce et applications sur mesure : devis sur mesure. Les tarifs sont détaillés dans le devis après cadrage. Aucune obligation avant validation de la proposition.
              </p>
            </section>

            <Separator className="my-14" />

            <section aria-labelledby="faq-developpeur">
              <h2 id="faq-developpeur" className="text-titre-petit font-semibold tracking-tight">
                Questions fréquentes
              </h2>
              <Accordion type="single" collapsible className="mt-6">
                {faqItems.map((it) => (
                  <AccordionItem key={it.q} value={it.q}>
                    <AccordionTrigger className="text-left">{it.q}</AccordionTrigger>
                    <AccordionContent>{it.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            <section className="mt-16 flex flex-col items-center gap-6 rounded-xl border border-border/80 bg-muted/30 px-6 py-10 text-center md:py-12">
              <h2 className="text-titre-petit font-semibold tracking-tight">
                Un projet en tête ?
              </h2>
              <p className="max-w-xl text-muted-foreground text-pretty">
                Parlons de votre objectif, de votre cible et des délais. Je vous réponds rapidement et vous envoie une proposition adaptée.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button asChild size="lg">
                  <Link href="/devis">Demander un devis</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/contact">Me contacter</Link>
                </Button>
                <Button asChild variant="ghost" size="lg">
                  <Link href="/mes-projets">Voir mes réalisations</Link>
                </Button>
              </div>
            </section>
          </div>
        </article>
      </HeroCardPageLayout>
    </>
  );
}
