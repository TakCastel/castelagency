import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  FileText,
  LayoutGrid,
  Mail,
  Palette,
  Search,
  Server,
  Smartphone,
} from "lucide-react";

import { HeroCardPageLayout } from "@/components/landing/HeroCardPageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

/** Logos technos (SVG inline, style Simple Icons). */
const TechLogoWordPress = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M21.469 6.825c.84 1.537 1.318 3.3 1.318 5.175 0 3.979-2.156 7.456-5.363 9.325l3.295-9.527c.615-1.54.82-2.771.82-3.864 0-.405-.026-.78-.07-1.11m-7.981.105c.647-.03 1.232-.105 1.232-.105.582-.075.514-.93-.067-.899 0 0-1.755.135-2.88.135-1.064 0-2.85-.15-2.85-.15-.585-.03-.661.855-.075.885 0 0 .54.061 1.125.09l1.68 4.605-2.37 7.08L5.354 6.9c.649-.03 1.234-.1 1.234-.1.585-.075.516-.93-.065-.896 0 0-1.746.138-2.874.138-.2 0-.438-.008-.69-.015C4.911 3.15 8.235 1.215 12 1.215c2.809 0 5.365 1.072 7.286 2.833-.046-.003-.091-.009-.141-.009-1.06 0-1.812.923-1.812 1.914 0 .89.513 1.643 1.06 2.531.411.72.89 1.643.89 2.977 0 .915-.354 1.994-.821 3.479l-1.075 3.585-3.9-11.61.001.014zM12 22.784c-1.059 0-2.081-.153-3.048-.437l3.237-9.406 3.315 9.087c.024.053.05.101.078.149-1.12.393-2.325.609-3.582.609M1.211 12c0-1.564.336-3.05.935-4.39L7.29 21.709C3.694 19.96 1.212 16.271 1.211 12M12 0C5.385 0 0 5.385 0 12s5.385 12 12 12 12-5.385 12-12S18.615 0 12 0" />
  </svg>
);
const TechLogoNuxt = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M13.4642 19.8295h8.9218c.2834 0 .5618-.0723.8072-.2098a1.5899 1.5899 0 0 0 .5908-.5732 1.5293 1.5293 0 0 0 .216-.783 1.529 1.529 0 0 0-.2167-.7828L17.7916 7.4142a1.5904 1.5904 0 0 0-.5907-.573 1.6524 1.6524 0 0 0-.807-.2099c-.2833 0-.5616.0724-.807.2098a1.5904 1.5904 0 0 0-.5907.5731L13.4642 9.99l-2.9954-5.0366a1.5913 1.5913 0 0 0-.591-.573 1.6533 1.6533 0 0 0-.8071-.2098c-.2834 0-.5617.0723-.8072.2097a1.5913 1.5913 0 0 0-.591.573L.2168 17.4808A1.5292 1.5292 0 0 0 0 18.2635c-.0001.2749.0744.545.216.783a1.59 1.59 0 0 0 .5908.5732c.2454.1375.5238.2098.8072.2098h5.6003c2.219 0 3.8554-.9454 4.9813-2.7899l2.7337-4.5922L16.3935 9.99l4.3944 7.382h-5.8586ZM7.123 17.3694l-3.9083-.0009 5.8586-9.8421 2.9232 4.921-1.9572 3.2892c-.7478 1.1967-1.5972 1.6328-2.9163 1.6328z" />
  </svg>
);
const TechLogoNext = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z" />
  </svg>
);
const TechLogoHtml5 = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" />
  </svg>
);
const TechLogoCss3 = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z" />
  </svg>
);
const TechLogoJavascript = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" />
  </svg>
);
/** Decap CMS (Simple Icons path). */
const TechLogoDecapCms = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M18.947 13.177c0 3.263-2 5.649-4.736 5.649h-2.773v-5.65H6.282v10.387h7.93c5.403 0 9.788-4.668 9.788-10.386h-5.052ZM7.894.476 0 1.212l.948 10.352 5.157-.456-.526-5.615 2.737-.245c2.737-.246 4.91 1.93 5.227 5.193l5.052-.458c-.49-5.752-5.297-9.998-10.7-9.507Z" />
  </svg>
);
/** Drupal (Simple Icons path). */
const TechLogoDrupal = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M15.78 5.113C14.09 3.425 12.48 1.815 11.998 0c-.48 1.815-2.09 3.425-3.778 5.113-2.534 2.53-5.405 5.4-5.405 9.702a9.184 9.185 0 1018.368 0c0-4.303-2.871-7.171-5.405-9.702M6.72 16.954c-.563-.019-2.64-3.6 1.215-7.416l2.55 2.788a.218.218 0 01-.016.325c-.61.625-3.204 3.227-3.527 4.126-.066.186-.164.18-.222.177M12 21.677a3.158 3.158 0 01-3.158-3.159 3.291 3.291 0 01.787-2.087c.57-.696 2.37-2.655 2.37-2.655s1.774 1.988 2.367 2.649a3.09 3.09 0 01.792 2.093A3.158 3.158 0 0112 21.677m6.046-5.123c-.068.15-.223.398-.431.405-.371.014-.411-.177-.686-.583-.604-.892-5.864-6.39-6.848-7.455-.866-.935-.122-1.595.223-1.94C10.736 6.547 12 5.285 12 5.285s3.766 3.574 5.336 6.016c1.57 2.443 1.029 4.556.71 5.253" />
  </svg>
);
/** Directus (Simple Icons path). */
const TechLogoDirectus = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M19.187 13.909a1.74 1.74 0 0 1-.286-.092.657.657 0 0 1-.203-.139c.056-.488 0-.912.047-1.392.184-1.862 1.355-1.272 2.406-1.577.655-.184 1.31-.562 1.475-1.336a13.528 13.528 0 0 0-2.397-2.204c-2.85-2.028-6.574-2.84-9.958-2.277a5.113 5.113 0 0 0 2.238 2.074s-.917 0-1.703-.587c-.23.092-.692.274-.913.384a5.094 5.094 0 0 0 6.63.37c-.01.017-.185.285-.397 1.4-.47 2.38-1.826 2.195-3.504 1.596-3.485-1.264-5.403-.093-7.145-2.49-.507.286-.82.82-.82 1.402 0 .599.331 1.106.81 1.383.262-.348.38-.446.836-.446-.706.4-.79.75-1.094 1.718-.368 1.171-.212 2.37-1.936 2.683-.913.046-.894.664-1.226 1.586-.415 1.199-.968 1.678-2.047 2.812.443.535.904.6 1.374.406.968-.406 1.715-1.66 2.415-2.471.784-.904 2.665-.517 4.085-1.402.977-.599 1.457-1.41.811-2.784a2.72 2.72 0 0 1 .701 1.66c1.641-.213 3.836 1.788 5.836 2.12a3.574 3.574 0 0 1-.488-.82c-.23-.554-.304-1.06-.258-1.503.184 1.097 1.29 2.507 3.07 2.637.452.036.95-.019 1.466-.176.618-.184 1.19-.424 1.872-.295.507.093.977.35 1.272.784.443.645 1.41.784 1.844-.009-.977-2.554-3.67-2.72-4.813-3.015z" />
  </svg>
);
export const metadata: Metadata = {
  title: "Création & refonte de site vitrine à Avignon | Studio Castel",
  description:
    "Agence web à Avignon : création et refonte de sites vitrines. Pages claires, copy orientée conversion, SEO on-page, responsive. Devis gratuit.",
  keywords: [
    "création site vitrine Avignon",
    "refonte site internet Avignon",
    "site vitrine professionnel",
    "agence web Avignon",
    "site vitrine SEO",
  ],
  openGraph: {
    title: "Création & refonte de site vitrine à Avignon | Studio Castel",
    description:
      "Agence web à Avignon : création et refonte de sites vitrines. Pages claires, copy orientée conversion, SEO on-page.",
    type: "website",
    locale: "fr_FR",
  },
  alternates: {
    canonical: "/services/site-vitrine",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Création et refonte de site vitrine à Avignon",
  description:
    "Création et refonte de sites vitrines par Studio Castel : pages claires, copy orientée conversion, SEO on-page, responsive. Agence web à Avignon.",
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
  url: "https://studiocastel.fr/services/site-vitrine",
};

export default function SiteVitrinePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Image pleine largeur comme l’accueil, le contenu de l’article commence à mi-hauteur */}
      <HeroCardPageLayout imageSrc="/assets/illustrations/illu-onepage.png">
        <article>
          {/* Hero : petite card sur l’image */}
          <div className="container px-4 pb-12 pt-4 sm:px-6">
            <div className="relative mx-auto max-w-3xl rounded-xl border border-border bg-background px-6 py-8 sm:px-8 sm:py-10">
              <div
                className="absolute -top-3 right-2 z-10 w-20 origin-top-right overflow-hidden rounded-b-sm border-t-0 border-l border-r border-b border-neutral-200/80 bg-white px-2 pt-3 pb-2 sm:-top-6 sm:right-6 sm:w-32 sm:px-3.5 sm:pt-6 sm:pb-5 dark:border-neutral-600/50 dark:bg-white/95"
                style={{
                  transform: "rotate(8deg)",
                  boxShadow: "0 1px 0 rgba(255,255,255,0.8) inset, 4px 6px 16px rgba(0,0,0,0.12), 2px 3px 8px rgba(0,0,0,0.08), -1px 0 0 rgba(0,0,0,0.04)",
                }}
                aria-label="Tarif à partir de 1200 euros"
              >
                <span className="block text-[0.55rem] font-medium uppercase tracking-[0.15em] text-neutral-500 sm:text-[0.65rem] sm:tracking-[0.2em]">
                  À partir de
                </span>
                <span className="mt-0.5 block text-sm font-bold tabular-nums tracking-tight text-neutral-900 sm:mt-1 sm:text-xl">
                  1 200 €
                </span>
              </div>
              <header>
                <p className="text-small font-medium text-muted-foreground">
                  Service : Site vitrine
                </p>
                <h1 className="mt-2 text-balance text-titre-moyen font-semibold tracking-tight">
                  Création et refonte de site vitrine
                </h1>
                <p className="mt-6 text-paragraphe text-muted-foreground text-pretty">
                  Un site vitrine renforce votre crédibilité, attire les bons visiteurs et les convertit en demandes. Je conçois des sites sur mesure : structure claire, design soigné, textes orientés conversion et SEO intégré dès le départ.
                </p>
                <p className="mt-4 text-paragraphe text-muted-foreground text-pretty">
                  L’objectif est une vitrine qui valorise votre savoir-faire et qui donne envie de vous contacter.
                </p>
              </header>
              <Separator className="my-10" />
              <section aria-labelledby="quest-ce-quun-site-vitrine">
                <h2
                  id="quest-ce-quun-site-vitrine"
                  className="text-titre-petit font-semibold tracking-tight"
                >
                  Qu’est-ce qu’un site vitrine ?
                </h2>
                <p className="mt-4 text-muted-foreground text-pretty">
                  Un site vitrine met en avant votre entreprise, vos services et vos coordonnées, sans vente en ligne. C’est votre carte de visite numérique.
                </p>
                <p className="mt-4 text-muted-foreground text-pretty">
                  Il renforce la crédibilité, améliore la visibilité sur Google et transforme les visiteurs en leads (formulaire de contact, appels, devis). Simple, efficace, pérenne.
                </p>
              </section>
            </div>
          </div>

        {/* Contenu principal : un seul container plus large */}
        <div className="container mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <section className="mb-16" aria-labelledby="pour-qui">
            <h2 id="pour-qui" className="text-titre-petit font-semibold tracking-tight">
              Pour qui ?
            </h2>
            <p className="mt-4 text-muted-foreground text-pretty">
              Un site vitrine s’adresse à tous les professionnels qui ont besoin d’une présence en ligne claire et crédible, sans vendre en direct. J’adapte la structure et le design à vos objectifs, que vous partiez de zéro ou que vous refondiez l’existant.
            </p>
            <ul className="mt-6 list-disc space-y-2 pl-6 text-muted-foreground text-pretty">
              <li>Artisans et commerces (plombiers, électriciens, garagistes, bâtiment) : une présence web qui rassure et génère des demandes.</li>
              <li>Professions libérales (avocats, médecins, consultants, architectes) : un site qui valorise votre expertise et facilite la prise de contact.</li>
              <li>PME et TPE : une vitrine professionnelle pour affirmer votre position et capter de nouveaux clients.</li>
              <li>Associations et collectivités : présenter vos actions, événements et missions auprès du public et des partenaires.</li>
              <li>Start-ups et créateurs : lancer votre activité ou chercher des partenaires avec une base web solide.</li>
            </ul>
        </section>

        <section className="mb-16" aria-labelledby="livrables">
            <h2 id="livrables" className="text-titre-petit font-semibold tracking-tight">
              Ce que je livre
            </h2>
            <p className="mt-4 text-muted-foreground text-pretty">
              De la structure à la mise en ligne, je livre un site prêt à accueillir vos visiteurs. Chaque livrable est pensé pour votre cible et pour la conversion.
            </p>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2" role="list">
            {[
              { icon: LayoutGrid, label: "Structure & arborescence", text: "Pages adaptées à votre offre : présentation, services, réalisations, contact, mentions légales." },
              { icon: Palette, label: "Design sur mesure", text: "Maquettes alignées sur votre charte ou une identité définie ensemble (couleurs, typographies, mise en page)." },
              { icon: FileText, label: "Copy orientée conversion", text: "Textes clairs, arguments de vente et appels à l’action (contact, devis, rappel) pour votre cible." },
              { icon: Search, label: "SEO on-page", text: "Titres, meta descriptions, balisage sémantique et contenu pensé pour les moteurs (mots-clés locaux, longue traîne)." },
              { icon: Smartphone, label: "Site responsive", text: "Affichage optimisé sur mobile, tablette et desktop." },
              { icon: Mail, label: "Contact & intégrations", text: "Formulaire de contact, réception par e-mail ou CRM selon vos besoins." },
              { icon: Server, label: "Hébergement & mise en ligne", text: "Conseil en hébergement, mise en production et suivi technique de base." },
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
            Je m’adapte à votre projet et à vos contraintes. Côté back et gestion des contenus : <strong className="text-foreground">WordPress</strong> (back-office familier, mises à jour faciles), <strong className="text-foreground">Drupal</strong> (CMS open source puissant et flexible), ou back-office headless comme <strong className="text-foreground">Directus</strong> et <strong className="text-foreground">Decap CMS</strong>.
          </p>
          <p className="mt-4 text-muted-foreground text-pretty">
            Côté front : <strong className="text-foreground">Nuxt.js SSR</strong> ou <strong className="text-foreground">Next.js SSR</strong> (sites rapides, SEO optimisé, évolutifs), ou en simple <strong className="text-foreground">HTML</strong>, <strong className="text-foreground">CSS</strong> et <strong className="text-foreground">JavaScript</strong> vanilla pour un site léger sans dépendances. Je vous conseille la combinaison la plus adaptée à votre budget, vos objectifs et votre maintenance.
          </p>
          <p className="mt-3 text-small font-medium text-muted-foreground">
            Back et contenus
          </p>
          <ul className="mt-2 flex flex-wrap items-center gap-6" aria-label="Technologies back et contenus">
            <li className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-lg border bg-muted/50" aria-hidden>
                <TechLogoWordPress className="h-7 w-7 text-[#21759B]" />
              </span>
              <span className="font-medium">WordPress</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-lg border bg-muted/50" aria-hidden>
                <TechLogoDrupal className="h-7 w-7 text-[#0678BE]" />
              </span>
              <span className="font-medium">Drupal</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-lg border bg-muted/50" aria-hidden>
                <TechLogoDirectus className="h-7 w-7 text-[#6644FF]" />
              </span>
              <span className="font-medium">Directus</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-lg border bg-muted/50" aria-hidden>
                <TechLogoDecapCms className="h-7 w-7 text-[#E91E8C]" />
              </span>
              <span className="font-medium">Decap CMS</span>
            </li>
          </ul>
          <p className="mt-6 text-small font-medium text-muted-foreground">
            Front
          </p>
          <ul className="mt-2 flex flex-wrap items-center gap-6" aria-label="Technologies front">
            <li className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-lg border bg-muted/50" aria-hidden>
                <TechLogoNuxt className="h-7 w-7 text-[#00DC82]" />
              </span>
              <span className="font-medium">Nuxt.js SSR</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-lg border bg-muted/50" aria-hidden>
                <TechLogoNext className="h-7 w-7 text-foreground" />
              </span>
              <span className="font-medium">Next.js SSR</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-lg border bg-muted/50" aria-hidden>
                <TechLogoHtml5 className="h-7 w-7 text-[#E34F26]" />
              </span>
              <span className="font-medium">HTML</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-lg border bg-muted/50" aria-hidden>
                <TechLogoCss3 className="h-7 w-7 text-[#1572B6]" />
              </span>
              <span className="font-medium">CSS</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-lg border bg-muted/50" aria-hidden>
                <TechLogoJavascript className="h-7 w-7 text-[#F7DF1E]" />
              </span>
              <span className="font-medium">JavaScript</span>
            </li>
          </ul>
        </section>

        <section className="mb-16" aria-labelledby="approche">
          <h2 id="approche" className="text-titre-petit font-semibold tracking-tight">
            Mon approche
          </h2>
          <p className="mt-4 text-muted-foreground text-pretty">
            Je pars de vos objectifs (notoriété, génération de leads, recrutement) et du profil de vos visiteurs. Ensuite : cadrage du périmètre (pages, contenus), maquettes, validation, développement et mise en ligne.
          </p>
          <p className="mt-4 text-muted-foreground text-pretty">
            Vous gardez la main sur les contenus grâce à un back-office simple lorsque la techno le permet, ou je gère les mises à jour pour vous. En complément, je peux vous accompagner en{" "}
            <Link href="/services/seo-acquisition" className="text-primary underline-offset-4 hover:underline">
              SEO & acquisition
            </Link>
            {" "}et en{" "}
            <Link href="/services/ux-ui-branding" className="text-primary underline-offset-4 hover:underline">
              UX/UI & branding
            </Link>
            .
          </p>
        </section>

        <section className="mb-16" aria-labelledby="creation-refonte">
            <h2 id="creation-refonte" className="text-titre-petit font-semibold tracking-tight">
              Création et refonte
            </h2>
            <p className="mt-4 text-muted-foreground text-pretty">
              Je fais les deux. Que vous n’ayez pas encore de site (création from scratch : domaine, hébergement, design, contenus) ou que votre site actuel soit daté ou mal adapté au mobile (refonte partielle ou totale en gardant ce qui fonctionne), j’adapte le périmètre à votre situation.
            </p>
        </section>

        <section className="mb-16" aria-labelledby="ce-que-ma-maitrise">
          <h2 id="ce-que-ma-maitrise" className="text-titre-petit font-semibold tracking-tight">
            Ce que ma maîtrise peut vous apporter
          </h2>
          <p className="mt-4 text-muted-foreground text-pretty">
            Un accompagnement sur mesure : je prends le temps de comprendre votre métier, vos objectifs et votre marché pour livrer un site qui vous ressemble. Sites performants, accessibles et évolutifs.
          </p>
          <p className="mt-4 text-muted-foreground text-pretty">
            Si demain vous souhaitez ajouter une boutique en ligne, je peux vous accompagner vers de l’{" "}
            <Link href="/services/ecommerce" className="text-primary underline-offset-4 hover:underline">
              e-commerce
            </Link>{" "}
            ou des{" "}
            <Link href="/services/applications-sur-mesure" className="text-primary underline-offset-4 hover:underline">
              applications sur mesure
            </Link>
            , en prolongeant ce qui existe déjà.
          </p>
        </section>

        <Separator className="my-12" />

        <section className="py-12 text-center" aria-labelledby="cta">
          <h2 id="cta" className="sr-only">
            Passer à l’action
          </h2>
          <p className="text-paragraphe font-medium text-foreground">
            Prêt à lancer ou refondre votre site vitrine ?
          </p>
          <p className="mt-4 text-muted-foreground text-pretty">
            Parlons de votre projet et de vos objectifs. Je vous réponds rapidement.
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
              src="/assets/illustrations/illu-onepage-bottom.png"
              alt="Illustration évoquant la construction d’un site web : plan, structure et étapes de conception, pour rappeler qu’un site ne se construit pas sans plan."
              width={1200}
              height={600}
              className="w-full h-auto object-contain"
              sizes="(max-width: 768px) 100vw, 64rem"
            />
            <figcaption className="mt-3 text-center text-sm text-muted-foreground">
              Un site web ne se construit pas sans plan.
            </figcaption>
        </figure>
        </div>
      </article>
      </HeroCardPageLayout>
    </>
  );
}
