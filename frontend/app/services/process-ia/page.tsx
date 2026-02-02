import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle, Workflow, Bot, ShieldCheck } from "lucide-react";
import { AiOutlineOpenAI } from "react-icons/ai";
import { SiN8N } from "react-icons/si";

import { HeroCardPageLayout } from "@/components/landing/HeroCardPageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Process IA & accompagnement IA à Avignon | Studio Castel",
  description:
    "Accompagnement sur les technologies IA à Avignon : prompting, outils, process de travail. n8n, agents IA, chatbots, automatisations. Studio Castel.",
  keywords: [
    "accompagnement IA Avignon",
    "process IA",
    "prompting",
    "n8n automatisation",
    "agents IA",
    "chatbots",
    "workflow IA",
  ],
  openGraph: {
    title: "Process IA & accompagnement IA à Avignon | Studio Castel",
    description:
      "Accompagnement sur les technologies IA : prompting, outils, process. n8n, agents, chatbots, systèmes automatisés. Studio Castel, Avignon.",
    type: "website",
    locale: "fr_FR",
  },
  alternates: {
    canonical: "/services/process-ia",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Process IA et accompagnement IA à Avignon",
  description:
    "Studio Castel propose un accompagnement sur les technologies IA : prompting, mise en place d’outils et de process de travail, n8n, agents IA, chatbots et systèmes automatisés. Agence à Avignon.",
  provider: {
    "@type": "LocalBusiness",
    name: "Studio Castel",
    address: { "@type": "PostalAddress", addressLocality: "Avignon" },
  },
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: { "@type": "GeoCoordinates", latitude: 43.9493, longitude: 4.8059 },
    geoRadius: "50000",
  },
  url: "https://studiocastel.fr/services/process-ia",
};

const offres = [
  {
    icon: MessageCircle,
    label: "Prompting & bonnes pratiques",
    text: "Apprendre à formuler des prompts efficaces et à intégrer l’IA dans vos process de travail au quotidien.",
  },
  {
    icon: Workflow,
    label: "Outils & automatisations",
    text: "Mise en place de workflows avec n8n ou équivalents : enchaîner des étapes, connecter vos outils, gagner du temps.",
  },
  {
    icon: Bot,
    label: "Agents & chatbots",
    text: "Conception d’agents conversationnels, chatbots ou agents internes pour automatiser des échanges ou des tâches répétitives.",
  },
  {
    icon: ShieldCheck,
    label: "Systèmes automatisés",
    text: "Agents de modération, tri de contenu, routage interne : des automatisations sur mesure adaptées à votre activité.",
  },
] as const;

export default function ProcessIaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroCardPageLayout imageSrc="/assets/illustrations/illu-app.png">
        <article>
          <div className="container px-4 pb-12 pt-4 sm:px-6">
            <div className="relative mx-auto max-w-3xl rounded-xl border border-border bg-background px-6 py-8 sm:px-8 sm:py-10">
              <div
                className="absolute -top-3 right-2 z-10 w-20 origin-top-right overflow-hidden rounded-b-sm border-t-0 border-l border-r border-b border-neutral-200/80 bg-white px-2 pt-3 pb-2 sm:-top-6 sm:right-6 sm:w-32 sm:px-3.5 sm:pt-6 sm:pb-5 dark:border-neutral-600/50 dark:bg-white/95"
                style={{
                  transform: "rotate(8deg)",
                  boxShadow: "0 1px 0 rgba(255,255,255,0.8) inset, 4px 6px 16px rgba(0,0,0,0.12), 2px 3px 8px rgba(0,0,0,0.08), -1px 0 0 rgba(0,0,0,0.04)",
                }}
                aria-label="Tarif sur devis"
              >
                <span className="block text-[0.55rem] font-medium uppercase tracking-[0.15em] text-neutral-500 sm:text-[0.65rem] sm:tracking-[0.2em]">
                  Tarif
                </span>
                <span className="mt-0.5 block text-sm font-bold tracking-tight text-neutral-900 sm:mt-1 sm:text-xl">
                  Sur devis
                </span>
              </div>
              <header>
                <p className="text-small font-medium text-muted-foreground">
                  Service : Process IA
                </p>
                <h1 className="mt-2 text-balance text-titre-moyen font-semibold tracking-tight">
                  Process IA
                </h1>
                <p className="mt-6 text-paragraphe text-muted-foreground text-pretty">
                  Plutôt qu’une prestation « tout code », je propose un{" "}
                  <strong className="text-foreground">accompagnement</strong> sur
                  les technologies IA : comment bien utiliser les outils, faire du
                  prompting efficace et mettre en place des process de travail
                  qui tiennent la route. Objectif : que vous sachiez tirer parti
                  de l’IA au quotidien.
                </p>
                <p className="mt-4 text-paragraphe text-muted-foreground text-pretty">
                  Selon le besoin, je peux aussi mettre en place des
                  automatisations (n8n), des agents IA, des chatbots ou des
                  systèmes automatisés, par exemple un agent de modération ou un
                  agent interne pour trier et router l’info.
                </p>
              </header>
              <Separator className="my-10" />
              <section aria-labelledby="quest-ce-que-process-ia">
                <h2
                  id="quest-ce-que-process-ia"
                  className="text-titre-petit font-semibold tracking-tight"
                >
                  En bref
                </h2>
                <p className="mt-4 text-muted-foreground text-pretty">
                  L’accompagnement couvre le prompting, le choix et l’usage des
                  bons outils, et la mise en place de process (workflows,
                  automatisations). Quand il faut aller plus loin, je peux coder
                  des agents, des chatbots ou des chaînes d’automatisation
                  adaptés à votre contexte.
                </p>
              </section>
            </div>
          </div>

          <div className="container mx-auto max-w-5xl px-4 py-16 sm:px-6">
            <section className="mb-16" aria-labelledby="ce-que-je-propose">
              <h2
                id="ce-que-je-propose"
                className="text-titre-petit font-semibold tracking-tight"
              >
                Ce que je propose
              </h2>
              <ul
                className="mt-6 grid gap-6 sm:grid-cols-2"
                role="list"
              >
                {offres.map(({ icon: Icon, label, text }) => (
                  <li key={label}>
                    <Card className="h-full border-muted/80">
                      <CardContent className="flex gap-4 p-5">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border bg-muted/50">
                          <Icon className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <h3 className="font-medium text-foreground">
                            {label}
                          </h3>
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

            <section className="mb-16" aria-labelledby="outils-ia">
              <h2
                id="outils-ia"
                className="text-titre-petit font-semibold tracking-tight"
              >
                Outils & environnements
              </h2>
              <p className="mt-4 text-muted-foreground text-pretty">
                Je travaille avec les écosystèmes IA courants et les outils
                d’automatisation (n8n, etc.) pour concevoir des workflows et des
                agents opérationnels, en restant focalisé sur l’usage et le
                process plutôt que sur l’infrastructure.
              </p>
              <ul
                className="mt-6 flex flex-wrap items-center gap-6"
                aria-label="Outils IA et automatisation"
              >
                <li className="flex items-center gap-3">
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-lg border bg-muted/50"
                    aria-hidden
                  >
                    <AiOutlineOpenAI className="h-7 w-7 text-foreground" />
                  </span>
                  <span className="font-medium">OpenAI / écosystème IA</span>
                </li>
                <li className="flex items-center gap-3">
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-lg border bg-muted/50"
                    aria-hidden
                  >
                    <SiN8N className="h-7 w-7 text-[#FF5B00]" />
                  </span>
                  <span className="font-medium">n8n</span>
                </li>
              </ul>
            </section>

            <Separator className="my-12" />

            <section className="py-12 text-center" aria-labelledby="cta">
              <h2 id="cta" className="sr-only">
                Passer à l’action
              </h2>
              <p className="text-paragraphe font-medium text-foreground">
                Envie de structurer vos process IA ?
              </p>
              <p className="mt-4 text-muted-foreground text-pretty">
                On en parle : accompagnement, prompting, n8n, agents ou
                chatbots. Je vous réponds rapidement.
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
          </div>
</article>
      </HeroCardPageLayout>
    </>
  );
}
