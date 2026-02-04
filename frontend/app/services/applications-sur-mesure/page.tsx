import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  BarChart3,
  Code2,
  Megaphone,
  Smartphone,
  Store,
  Users,
  GitBranch,
  LayoutGrid,
  Palette,
  Server,
  FileCode,
  Rocket,
} from "lucide-react";

import { FaReact, FaSass } from "react-icons/fa";
import { IoLogoCapacitor } from "react-icons/io5";
import { SiPostman, SiStrapi } from "react-icons/si";

import { Breadcrumb } from "@/components/landing/Breadcrumb";
import { HeroCardPageLayout } from "@/components/landing/HeroCardPageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

/** Logos technos (SVG inline pour Vue, Tailwind, Directus, Next, Nuxt). */
const TechLogoVue = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M24 1.61h-9.94L12 5.16 9.94 1.61H0l12 20.78L24 1.61zM12 14.08L5.16 3.23h4.43L12 9.41l2.41-6.18h4.43L12 14.08z" />
  </svg>
);
const TechLogoTailwind = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
  </svg>
);
const TechLogoDirectus = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M19.187 13.909a1.74 1.74 0 0 1-.286-.092.657.657 0 0 1-.203-.139c.056-.488 0-.912.047-1.392.184-1.862 1.355-1.272 2.406-1.577.655-.184 1.31-.562 1.475-1.336a13.528 13.528 0 0 0-2.397-2.204c-2.85-2.028-6.574-2.84-9.958-2.277a5.113 5.113 0 0 0 2.238 2.074s-.917 0-1.703-.587c-.23.092-.692.274-.913.384a5.094 5.094 0 0 0 6.63.37c-.01.017-.185.285-.397 1.4-.47 2.38-1.826 2.195-3.504 1.596-3.485-1.264-5.403-.093-7.145-2.49-.507.286-.82.82-.82 1.402 0 .599.331 1.106.81 1.383.262-.348.38-.446.836-.446-.706.4-.79.75-1.094 1.718-.368 1.171-.212 2.37-1.936 2.683-.913.046-.894.664-1.226 1.586-.415 1.199-.968 1.678-2.047 2.812.443.535.904.6 1.374.406.968-.406 1.715-1.66 2.415-2.471.784-.904 2.665-.517 4.085-1.402.977-.599 1.457-1.41.811-2.784a2.72 2.72 0 0 1 .701 1.66c1.641-.213 3.836 1.788 5.836 2.12a3.574 3.574 0 0 1-.488-.82c-.23-.554-.304-1.06-.258-1.503.184 1.097 1.29 2.507 3.07 2.637.452.036.95-.019 1.466-.176.618-.184 1.19-.424 1.872-.295.507.093.977.35 1.272.784.443.645 1.41.784 1.844-.009-.977-2.554-3.67-2.72-4.813-3.015z" />
  </svg>
);
const TechLogoNext = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z" />
  </svg>
);
const TechLogoNuxt = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M13.4642 19.8295h8.9218c.2834 0 .5618-.0723.8072-.2098a1.5899 1.5899 0 0 0 .5908-.5732 1.5293 1.5293 0 0 0 .216-.783 1.529 1.529 0 0 0-.2167-.7828L17.7916 7.4142a1.5904 1.5904 0 0 0-.5907-.573 1.6524 1.6524 0 0 0-.807-.2099c-.2833 0-.5616.0724-.807.2098a1.5904 1.5904 0 0 0-.5907.5731L13.4642 9.99l-2.9954-5.0366a1.5913 1.5913 0 0 0-.591-.573 1.6533 1.6533 0 0 0-.8071-.2098c-.2834 0-.5617.0723-.8072.2097a1.5913 1.5913 0 0 0-.591.573L.2168 17.4808A1.5292 1.5292 0 0 0 0 18.2635c-.0001.2749.0744.545.216.783a1.59 1.59 0 0 0 .5908.5732c.2454.1375.5238.2098.8072.2098h5.6003c2.219 0 3.8554-.9454 4.9813-2.7899l2.7337-4.5922L16.3935 9.99l4.3944 7.382h-5.8586Z" />
  </svg>
);

export const metadata: Metadata = {
  title: "Applications sur mesure & mobiles à Avignon | Studio Castel",
  description:
    "Agence web à Avignon : applications web et mobiles sur mesure. React, Vue, Capacitor, App Store, Play Store. APIs Strapi, Directus. Gestion de projet agile, Scrum Master, chef de produit. Devis gratuit.",
  keywords: [
    "application sur mesure Avignon",
    "app mobile React Vue",
    "Capacitor App Store Play Store",
    "API Strapi Directus",
    "agile Scrum",
    "chef de produit",
  ],
  openGraph: {
    title: "Applications sur mesure & mobiles à Avignon | Studio Castel",
    description:
      "Applications web et mobiles sur mesure : React, Vue, Capacitor, diffusion App Store & Play Store. APIs Strapi, Directus. Méthodologie agile et accompagnement Scrum.",
    type: "website",
    locale: "fr_FR",
  },
  alternates: {
    canonical: "/services/applications-sur-mesure",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Applications sur mesure et mobiles à Avignon",
  description:
    "Création d'applications web et mobiles sur mesure par Studio Castel : React, Vue, Capacitor, App Store, Play Store. APIs Strapi, Directus. Gestion de projet agile, accompagnement Scrum Master et chef de produit. Agence web à Avignon.",
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
  url: "https://studio-castel.com/services/applications-sur-mesure",
};

export default function ApplicationsSurMesurePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroCardPageLayout imageSrc="/assets/illustrations/illu-app.png">
        <article>
          <div className="container px-4 pb-12 pt-4 sm:px-6">
            <div className="mx-auto max-w-3xl">
              <Breadcrumb
                items={[
                  { label: "Accueil", href: "/" },
                  { label: "Mes services", href: "/services" },
                  { label: "Applications sur mesure" },
                ]}
              />
            </div>
            <div className="relative mx-auto mt-4 max-w-3xl rounded-xl border border-border bg-background px-6 py-8 sm:px-8 sm:py-10">
              <div
                className="absolute -top-3 right-2 z-10 w-20 origin-top-right overflow-hidden rounded-b-sm border-t-0 border-l border-r border-b border-neutral-200/80 bg-white px-2 pt-3 pb-2 sm:-top-6 sm:right-6 sm:w-32 sm:px-3.5 sm:pt-6 sm:pb-5 dark:border-neutral-600/50 dark:bg-white/95"
                style={{
                  transform: "rotate(8deg)",
                  boxShadow: "0 1px 0 rgba(255,255,255,0.8) inset, 4px 6px 16px rgba(0,0,0,0.12), 2px 3px 8px rgba(0,0,0,0.08), -1px 0 0 rgba(0,0,0,0.04)",
                }}
                aria-label="Tarif à partir de 8000 euros"
              >
                <span className="block text-[0.55rem] font-medium uppercase tracking-[0.15em] text-neutral-500 sm:text-[0.65rem] sm:tracking-[0.2em]">
                  À partir de
                </span>
                <span className="mt-0.5 block text-sm font-bold tabular-nums tracking-tight text-neutral-900 sm:mt-1 sm:text-xl">
                  8 000 €
                </span>
              </div>
              <header>
                <p className="text-small font-medium text-muted-foreground">
                  Service : Applications sur mesure
                </p>
                <h1 className="mt-2 text-balance text-titre-moyen font-semibold tracking-tight">
                  Applications web et mobiles sur mesure
                </h1>
                <p className="mt-6 text-paragraphe text-muted-foreground text-pretty">
                  Une application sur mesure qui épouse votre métier, vos process et vos utilisateurs. Je conçois des apps web et mobiles de A à Z : design, développement (React, Vue), déploiement sur App Store et Play Store avec Capacitor, intégration d’APIs (Strapi, Directus), modules publicitaires, Google Analytics, et accompagnement tout au long du projet avec une méthodologie agile et une posture Scrum Master / chef de produit.
                </p>
                <p className="mt-4 text-paragraphe text-muted-foreground text-pretty">
                  De l’idée au lancement, je vous accompagne sur tout le cursus de création : cadrage, sprints, livraisons itératives et mise en production.
                </p>
              </header>
              <Separator className="my-10" />
              <section aria-labelledby="quest-ce-quune-app-sur-mesure">
                <h2
                  id="quest-ce-quune-app-sur-mesure"
                  className="text-titre-petit font-semibold tracking-tight"
                >
                  Qu’est-ce qu’une application sur mesure ?
                </h2>
                <p className="mt-4 text-muted-foreground text-pretty">
                  C’est une application (web, mobile ou les deux) pensée pour votre usage : portail client, outil interne, dashboard, app grand public ou B2B. Elle s’appuie sur des APIs (Strapi, Directus ou custom), un front moderne (React, Vue, Tailwind, CSS, SASS) et, si besoin, une version native via Capacitor pour une diffusion sur l’Apple Store et le Play Store.
                </p>
                <p className="mt-4 text-muted-foreground text-pretty">
                  J’intègre aussi les briques dont vous avez besoin : modules publicitaires, Google Analytics, tests d’API avec Postman, et je pilote le projet en agile avec une vraie appétence Scrum Master et chef de produit pour cadrer, prioriser et livrer par itérations.
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
                Une application sur mesure s’adresse à tous ceux qui ont un besoin métier précis que les solutions clé en main ne couvrent pas. J’adapte la stack et la méthodologie à votre contexte.
              </p>
              <ul className="mt-6 list-disc space-y-2 pl-6 text-muted-foreground text-pretty">
                <li>Start-ups et scale-ups : MVP, app produit, portail client ou dashboard interne avec livraisons itératives et pilotage agile.</li>
                <li>PME et ETI : outils internes, applications métier, portails partenaires ou clients connectés à vos APIs ou à un headless (Strapi, Directus).</li>
                <li>Associations et collectivités : applications de gestion, réservation, signalement ou communication, avec suivi de projet structuré.</li>
                <li>Entrepreneurs et porteurs de projet : accompagnement de l’idée au lancement (cadrage, backlog, sprints, diffusion stores) avec une posture chef de produit et Scrum Master.</li>
                <li>Équipes techniques : renfort sur React, Vue, APIs, Capacitor ou mise en place d’une méthodologie agile (backlog, rituels, livraisons).</li>
              </ul>
            </section>

            <section className="mb-16" aria-labelledby="livrables">
              <h2 id="livrables" className="text-titre-petit font-semibold tracking-tight">
                Ce que je livre
              </h2>
              <p className="mt-4 text-muted-foreground text-pretty">
                De la conception à la mise en production, je livre une application prête à servir vos utilisateurs. Chaque livrable est pensé pour la maintenabilité et l’évolution du produit.
              </p>
              <ul className="mt-10 grid gap-6 sm:grid-cols-2" role="list">
                {[
                  { icon: LayoutGrid, label: "Cadrage & backlog", text: "Expression du besoin, user stories, priorisation et backlog agile pour avancer par sprints avec des livraisons claires." },
                  { icon: Palette, label: "Design & UX", text: "Maquettes, prototypes et design system (Tailwind, CSS, SASS) alignés sur votre marque et l’expérience utilisateur." },
                  { icon: Code2, label: "Front React & Vue", text: "Applications web performantes avec React ou Vue, Next.js ou Nuxt.js, Tailwind, CSS et SASS selon le projet." },
                  { icon: Smartphone, label: "App mobile (Capacitor)", text: "Une seule codebase web packagée en app native avec Capacitor, prête pour l’Apple Store et le Play Store." },
                  { icon: Store, label: "Diffusion App Store & Play Store", text: "Préparation des binaires, fiches store, soumission et suivi de publication sur l’Apple App Store et Google Play Store." },
                  { icon: Megaphone, label: "Modules publicitaires", text: "Intégration de modules publicitaires (AdMob, etc.) selon votre modèle et les guidelines des stores." },
                  { icon: BarChart3, label: "Google Analytics & métriques", text: "Mise en place de Google Analytics et de métriques pour suivre l’usage, les conversions et les performances." },
                  { icon: Server, label: "APIs Strapi & Directus", text: "Back-office headless et API REST : Strapi ou Directus pour gérer contenus et données, consommés par l’app." },
                  { icon: FileCode, label: "API & Postman", text: "Conception et documentation d’API, collections Postman pour tester et valider les endpoints tout au long du projet." },
                  { icon: GitBranch, label: "Gestion de projet agile", text: "Pilotage en méthodologie agile : sprints, revues, rétrospectives, priorisation et livraisons itératives." },
                  { icon: Users, label: "Scrum Master & chef de produit", text: "Accompagnement sur tout le cursus : facilitation des rituels, priorisation du backlog, vision produit et alignement équipe / métier." },
                  { icon: Rocket, label: "Déploiement & suivi", text: "Mise en production (web et/ou stores), CI/CD si besoin, et suivi technique pour faire évoluer l’application." },
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
                Avec quelles technologies ?
              </h2>
              <p className="mt-4 text-muted-foreground text-pretty">
                Je m’adapte à votre stack et à vos préférences. Côté front : <strong className="text-foreground">React</strong> ou <strong className="text-foreground">Vue</strong>, avec <strong className="text-foreground">Next.js</strong> ou <strong className="text-foreground">Nuxt.js</strong> pour le SSR et le routing, et <strong className="text-foreground">Tailwind</strong>, <strong className="text-foreground">CSS</strong> ou <strong className="text-foreground">SASS</strong> pour le style. Pour les apps mobiles : <strong className="text-foreground">Capacitor</strong> pour embarquer votre app web et la diffuser sur l’Apple Store et le Play Store.
              </p>
              <p className="mt-4 text-muted-foreground text-pretty">
                Côté back et données : APIs avec <strong className="text-foreground">Strapi</strong> ou <strong className="text-foreground">Directus</strong> (headless CMS / back-office), API custom si besoin. Outils : <strong className="text-foreground">Postman</strong> pour tester et documenter les API, <strong className="text-foreground">Google Analytics</strong> pour les métriques. Le tout piloté en <strong className="text-foreground">agile</strong> avec une approche Scrum et une posture chef de produit.
              </p>
              <p className="mt-3 text-small font-medium text-muted-foreground">
                Front & style
              </p>
              <ul className="mt-2 flex flex-wrap items-center gap-4 sm:gap-6" aria-label="Technologies front">
                <li className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg border bg-muted/50" aria-hidden>
                    <FaReact className="h-7 w-7 text-[#61DAFB]" />
                  </span>
                  <span className="font-medium">React</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg border bg-muted/50" aria-hidden>
                    <TechLogoVue className="h-7 w-7 text-[#4FC08D]" />
                  </span>
                  <span className="font-medium">Vue</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg border bg-muted/50" aria-hidden>
                    <TechLogoNext className="h-7 w-7 text-foreground" />
                  </span>
                  <span className="font-medium">Next.js</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg border bg-muted/50" aria-hidden>
                    <TechLogoNuxt className="h-7 w-7 text-[#00DC82]" />
                  </span>
                  <span className="font-medium">Nuxt.js</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg border bg-muted/50" aria-hidden>
                    <TechLogoTailwind className="h-7 w-7 text-[#06B6D4]" />
                  </span>
                  <span className="font-medium">Tailwind</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg border bg-muted/50" aria-hidden>
                    <FaSass className="h-7 w-7 text-[#CC6699]" />
                  </span>
                  <span className="font-medium">SASS</span>
                </li>
              </ul>
              <p className="mt-6 text-small font-medium text-muted-foreground">
                Mobile & back / API
              </p>
              <ul className="mt-2 flex flex-wrap items-center gap-4 sm:gap-6" aria-label="Technologies mobile et API">
                <li className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg border bg-muted/50" aria-hidden>
                    <IoLogoCapacitor className="h-7 w-7 text-[#119EFF]" />
                  </span>
                  <span className="font-medium">Capacitor</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg border bg-muted/50" aria-hidden>
                    <SiStrapi className="h-7 w-7 text-[#2F2E8B]" />
                  </span>
                  <span className="font-medium">Strapi</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg border bg-muted/50" aria-hidden>
                    <TechLogoDirectus className="h-7 w-7 text-[#6644FF]" />
                  </span>
                  <span className="font-medium">Directus</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg border bg-muted/50" aria-hidden>
                    <SiPostman className="h-7 w-7 text-[#FF6C37]" />
                  </span>
                  <span className="font-medium">Postman</span>
                </li>
              </ul>
              <p className="mt-4 text-small text-muted-foreground text-pretty">
                Postman pour la conception et les tests d’API, Google Analytics pour l’analyse d’usage. Méthodologie agile (sprints, backlog, rituels) et accompagnement Scrum Master / chef de produit sur tout le cursus de création.
              </p>
            </section>

            <section className="mb-16" aria-labelledby="methodologie-agile">
              <h2 id="methodologie-agile" className="text-titre-petit font-semibold tracking-tight">
                Méthodologie agile & accompagnement
              </h2>
              <p className="mt-4 text-muted-foreground text-pretty">
                Je pilote vos projets en <strong className="text-foreground">méthodologie agile</strong> : backlog priorisé, sprints courts, livraisons itératives et rituels (daily, démo, rétro). J’accompagne tout le cursus de création avec une vraie <strong className="text-foreground">appétence Scrum Master</strong> (facilitation, déblocage, alignement) et <strong className="text-foreground">chef de produit</strong> (vision produit, priorisation, recette métier).
              </p>
              <p className="mt-4 text-muted-foreground text-pretty">
                Objectif : livrer une application qui correspond à votre besoin, par étapes maîtrisées, avec une équipe (ou un binôme) alignée sur les objectifs. Que vous ayez déjà une équipe technique ou que je assure à la fois le développement et le pilotage, l’agile et la posture produit restent au cœur de l’accompagnement.
              </p>
              <ul className="mt-6 list-disc space-y-2 pl-6 text-muted-foreground text-pretty">
                <li>Cadrage et expression du besoin (user stories, critères d’acceptation).</li>
                <li>Backlog priorisé et planification en sprints.</li>
                <li>Rituels : daily, revue de sprint, rétrospective, démo.</li>
                <li>Livraisons itératives et recette métier.</li>
                <li>Vision produit et évolution (roadmap, feedback utilisateurs).</li>
              </ul>
            </section>

            <section className="mb-16" aria-labelledby="approche">
              <h2 id="approche" className="text-titre-petit font-semibold tracking-tight">
                Mon approche
              </h2>
              <p className="mt-4 text-muted-foreground text-pretty">
                Je pars de votre idée ou de votre besoin métier, puis on cadrage ensemble (périmètre, utilisateurs, priorités). Ensuite : backlog, sprints, développement (front React/Vue, API Strapi/Directus, Capacitor si mobile), intégrations (publicité, analytics), tests et mise en production (web et/ou App Store, Play Store). Tout au long du projet, la méthodologie agile et l’accompagnement Scrum Master / chef de produit permettent d’avancer de façon claire et itérative.
              </p>
              <p className="mt-4 text-muted-foreground text-pretty">
                En complément, je peux vous accompagner en{" "}
                <Link href="/services/ux-ui-branding" className="text-primary underline-offset-4 hover:underline">
                  UX/UI & branding
                </Link>
                {" "}pour le design, en{" "}
                <Link href="/services/seo-acquisition" className="text-primary underline-offset-4 hover:underline">
                  SEO & acquisition
                </Link>
                {" "}si l’app s’accompagne d’un site, ou vers de l’{" "}
                <Link href="/services/ecommerce" className="text-primary underline-offset-4 hover:underline">
                  e-commerce
                </Link>
                {" "}et des{" "}
                <Link href="/services/site-vitrine" className="text-primary underline-offset-4 hover:underline">
                  sites vitrines
                </Link>
                {" "}pour une présence web complète.
              </p>
            </section>

            <section className="mb-16" aria-labelledby="ce-que-ma-maitrise">
              <h2 id="ce-que-ma-maitrise" className="text-titre-petit font-semibold tracking-tight">
                Ce que ma maîtrise peut vous apporter
              </h2>
              <p className="mt-4 text-muted-foreground text-pretty">
                Un accompagnement de bout en bout : de l’idée au lancement, avec les bonnes technos (React, Vue, Tailwind, SASS, Capacitor, Strapi, Directus), les bonnes pratiques (API documentées, Postman, Google Analytics, modules pub si besoin) et une conduite de projet agile avec une posture Scrum Master et chef de produit. Vous avancez par livraisons claires, avec une vision produit et un pilotage qui évitent les dérives.
              </p>
              <p className="mt-4 text-muted-foreground text-pretty">
                Que vous visiez une app web, une app mobile sur l’Apple Store et le Play Store, ou les deux avec une seule codebase (Capacitor), je m’adapte à votre périmètre et à votre rythme.
              </p>
            </section>

            <Separator className="my-12" />

            <section className="py-12 text-center" aria-labelledby="cta">
              <h2 id="cta" className="sr-only">
                Passer à l’action
              </h2>
              <p className="text-paragraphe font-medium text-foreground">
                Prêt à lancer votre application sur mesure ?
              </p>
              <p className="mt-4 text-muted-foreground text-pretty">
                Parlons de votre projet, de votre cible et de vos objectifs. Je vous réponds rapidement.
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
                src="/assets/illustrations/illu-app-bottom.png"
                alt="Illustration évoquant le développement d’applications : code, mobile, API et méthodologie."
                width={1200}
                height={600}
                className="w-full h-auto object-contain"
                sizes="(max-width: 768px) 100vw, 64rem"
              />
              <figcaption className="mt-3 text-center text-sm text-muted-foreground">
                De l’idée au lancement : applications web et mobiles, pilotées en agile.
              </figcaption>
            </figure>
          </div>
</article>
      </HeroCardPageLayout>
    </>
  );
}
