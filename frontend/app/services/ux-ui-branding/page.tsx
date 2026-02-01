import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Accessibility,
  ImageIcon,
  LayoutGrid,
  Leaf,
  Palette,
  ShieldCheck,
  Video,
} from "lucide-react";
import { FaBootstrap, FaFigma, FaInstagram, FaLess, FaSass, FaYoutube } from "react-icons/fa";
import { SiAdobexd, SiCanva, SiCss3, SiFramer, SiMaterialdesign, SiMiro, SiPrimevue, SiShadcnui, SiSketch, SiTailwindcss } from "react-icons/si";
import { TbAtom2Filled } from "react-icons/tb";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "UX, UI & branding à Avignon | Studio Castel",
  description:
    "Agence à Avignon : UX/UI, wireframes, identité visuelle, Tailwind, shadcn/ui, Bootstrap, Atomic Design (Brad Frost), Material Design, PrimeVue. Figma, Sketch, Adobe XD, Framer, Miro, Canva. Devis gratuit.",
  keywords: [
    "UX UI Avignon",
    "branding identité visuelle",
    "prototypage Figma Sketch Framer Miro",
    "Tailwind shadcn Bootstrap",
    "Atomic Design Brad Frost",
    "Material Design PrimeVue",
    "wireframes maquettes",
    "CSS Sass Less design system",
  ],
  openGraph: {
    title: "UX, UI & branding à Avignon | Studio Castel",
    description:
      "UX/UI, wireframes, identité visuelle, visuels Instagram, vidéos YouTube et Reels. Figma, Adobe XD, Canva. Studio Castel, Avignon.",
    type: "website",
    locale: "fr_FR",
  },
  alternates: {
    canonical: "/services/ux-ui-branding",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "UX, UI et branding à Avignon",
  description:
    "Studio Castel propose UX/UI, wireframes, identité visuelle, visuels pour Instagram, vidéos YouTube et Reels en collaboration avec un réalisateur. Figma, Adobe XD, Canva. Agence à Avignon.",
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
  url: "https://studiocastel.fr/services/ux-ui-branding",
};

export default function UxUiBrandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="relative -mt-20 w-full overflow-hidden md:-mt-24" style={{ minHeight: "100svh" }} aria-hidden>
        <div className="pointer-events-none absolute inset-0 -z-10">
          <Image
            src="/assets/illustrations/illu-design.png"
            alt=""
            fill
            className="object-cover object-center opacity-45 blur-xs shadow-[0_0_100px_rgba(0,0,0,0.5)]"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        </div>
      </section>

      <main className="relative z-10 -mt-[70vh]">
        <article>
          <div className="container px-4 pb-12 pt-16 sm:px-6">
            <div className="relative mx-auto max-w-2xl rounded-3xl border border-border/80 bg-background/95 px-6 py-8 shadow-xl shadow-black/20 backdrop-blur-sm sm:px-8 sm:py-10">
              <div
                className="absolute -top-3 right-2 z-10 w-20 origin-top-right overflow-hidden rounded-b-sm border-t-0 border-l border-r border-b border-neutral-200/80 bg-white px-2 pt-3 pb-2 sm:-top-6 sm:right-6 sm:w-32 sm:px-3.5 sm:pt-6 sm:pb-5 dark:border-neutral-600/50 dark:bg-white/95"
                style={{
                  transform: "rotate(8deg)",
                  boxShadow: "0 1px 0 rgba(255,255,255,0.8) inset, 4px 6px 16px rgba(0,0,0,0.12), 2px 3px 8px rgba(0,0,0,0.08), -1px 0 0 rgba(0,0,0,0.04)",
                }}
                aria-label="Tarif à partir de 1500 euros"
              >
                <span className="block text-[0.55rem] font-medium uppercase tracking-[0.15em] text-neutral-500 sm:text-[0.65rem] sm:tracking-[0.2em]">
                  À partir de
                </span>
                <span className="mt-0.5 block text-sm font-bold tabular-nums tracking-tight text-neutral-900 sm:mt-1 sm:text-xl">
                  1 500 €
                </span>
              </div>
              <header>
                <p className="text-small font-medium text-muted-foreground">
                  Service : UX, UI & branding
                </p>
                <h1 className="mt-2 text-balance text-titre-moyen font-semibold tracking-tight">
                  UX, UI & branding
                </h1>
                <p className="mt-6 text-paragraphe text-muted-foreground text-pretty">
                  Une image de marque claire et des interfaces bien pensées aident vos clients à vous faire confiance. Je m’occupe de l’identité visuelle, des maquettes, des visuels pour les réseaux (Instagram, Canva) et des vidéos (YouTube, Reels), en lien avec un réalisateur si besoin.
                </p>
                <p className="mt-4 text-paragraphe text-muted-foreground text-pretty">
                  L’objectif : une marque qui vous ressemble et des contenus qui attirent votre cible.
                </p>
              </header>
              <Separator className="my-10" />
              <section aria-labelledby="quest-ce-que-ux-branding">
                <h2
                  id="quest-ce-que-ux-branding"
                  className="text-titre-petit font-semibold tracking-tight"
                >
                  En bref
                </h2>
                <p className="mt-4 text-muted-foreground text-pretty">
                  L’UX, c’est rendre un site ou une app agréable à utiliser. L’UI, c’est le design des écrans. Le branding, c’est votre identité visuelle (couleurs, logo, ton) partout où vous communiquez. Les trois ensemble renforcent votre crédibilité et aident à convertir.
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
                L’UX, l’UI et le branding s’adressent à tous les professionnels qui veulent clarifier leur image, améliorer l’ergonomie de leurs interfaces ou développer leur présence visuelle (réseaux sociaux, vidéo). J’adapte le périmètre à vos objectifs, que vous partiez de zéro ou que vous refassiez une identité existante.
              </p>
              <ul className="mt-6 list-disc space-y-2 pl-6 text-muted-foreground text-pretty">
                <li>Start-ups et PME : une identité de marque et des maquettes prêtes pour le développement (site, app).</li>
                <li>Marques et e-commerce : visuels Instagram, stories et posts cohérents avec votre charte.</li>
                <li>Créateurs et influenceurs : visuels et vidéos (YouTube, Reels) pour fidéliser et élargir votre audience.</li>
                <li>Associations et collectivités : charte graphique, supports print et digital, contenus pour les réseaux.</li>
                <li>Projets web et apps : wireframes, UI kit et design system (couleurs, composants, Sass/Less) pour une intégration fluide.</li>
              </ul>
            </section>

            <section className="mb-16" aria-labelledby="livrables">
              <h2 id="livrables" className="text-titre-petit font-semibold tracking-tight">
                Ce que je livre
              </h2>
              <p className="mt-4 text-muted-foreground text-pretty">
                Du wireframe à la vidéo en passant par l’identité visuelle : tout est prêt à l’emploi ou à intégrer. Chaque livrable est pensé pour votre cible et pour la cohérence de votre marque.
              </p>
              <ul className="mt-10 grid gap-6 sm:grid-cols-2" role="list">
                {[
                  { icon: LayoutGrid, label: "Wireframes & maquettes", text: "Schémas de pages et maquettes haute fidélité pour site ou application (Figma, Adobe XD), avec états et variantes." },
                  { icon: Palette, label: "Identité visuelle & branding", text: "Charte graphique, couleurs, typographies, ton de marque et déclinaisons sur vos supports (print, web, réseaux)." },
                  { icon: ImageIcon, label: "Visuels pour Instagram", text: "Posts, stories et visuels cohérents avec votre identité pour renforcer votre présence sur Instagram." },
                  { icon: Video, label: "Vidéos YouTube & Reels", text: "Vidéos verticales (Reels, Instagram) ou horizontales (YouTube), en collaboration avec un réalisateur indépendant, du script au montage." },
                  { icon: Palette, label: "Créations Canva", text: "Templates, visuels et supports du quotidien sur Canva : posts, stories, présentations, documents de communication." },
                  { icon: LayoutGrid, label: "UI kit & design system", text: "Composants réutilisables (Atomic Design, Brad Frost), styles (CSS, Sass, Less, Tailwind, shadcn/ui, Bootstrap) et documentation pour une intégration front fluide et cohérente." },
                  { icon: Accessibility, label: "Accessibilité", text: "Conception inclusive et respect des normes (WCAG) : contrastes, lisibilité, navigation clavier, textes alternatifs et bonnes pratiques pour que vos interfaces soient utilisables par tous." },
                  { icon: ShieldCheck, label: "RGPD", text: "Prise en compte de la protection des données dans la conception : mentions légales, consentement, informations utilisateur et bonnes pratiques pour des interfaces conformes au RGPD." },
                  { icon: Leaf, label: "Démarche RSE", text: "Intégration de critères RSE dans le design : choix écoresponsables (optimisation des visuels, sobriété numérique), inclusion et cohérence avec une communication responsable." },
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
                Avec quelles technologies et outils ?
              </h2>
              <p className="mt-4 text-muted-foreground text-pretty">
                Je m’adapte à votre projet et à vos habitudes. Côté design et prototypage UX : <strong className="text-foreground">Figma</strong>, <strong className="text-foreground">Adobe XD</strong>, <strong className="text-foreground">Sketch</strong>, <strong className="text-foreground">Framer</strong> et <strong className="text-foreground">Miro</strong> pour les wireframes, maquettes, prototypes interactifs et ateliers collaboratifs. Côté styles et intégration : <strong className="text-foreground">CSS</strong>, <strong className="text-foreground">Sass</strong>, <strong className="text-foreground">Less</strong>, <strong className="text-foreground">Tailwind CSS</strong>, <strong className="text-foreground">shadcn/ui</strong> et <strong className="text-foreground">Bootstrap</strong>. Je m’appuie sur des principes et bonnes pratiques reconnus : <strong className="text-foreground">Atomic Design</strong> (Brad Frost), <strong className="text-foreground">Material Design</strong>, composants <strong className="text-foreground">PrimeVue</strong>, accessibilité et cohérence des design systems.
              </p>
              <p className="mt-4 text-muted-foreground text-pretty">
                Pour les visuels sur <strong className="text-foreground">Instagram</strong>, les vidéos sur <strong className="text-foreground">YouTube</strong> ou les <strong className="text-foreground">Reels</strong> (vertical et horizontal), je travaille en collaboration avec un réalisateur indépendant pour un rendu professionnel. Pour les créations du quotidien, <strong className="text-foreground">Canva</strong> permet de vous livrer des templates et visuels que vous pourrez faire évoluer vous-même.
              </p>
              <p className="mt-3 text-small font-medium text-muted-foreground">
                Design & prototypage UX
              </p>
              <ul className="mt-2 flex flex-wrap items-center gap-6" aria-label="Outils design et prototypage UX">
                <li className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg border bg-muted/50" aria-hidden>
                    <FaFigma className="h-7 w-7 text-[#F24E1E]" />
                  </span>
                  <span className="font-medium">Figma</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg border bg-muted/50" aria-hidden>
                    <SiAdobexd className="h-7 w-7 text-[#FF61F6]" />
                  </span>
                  <span className="font-medium">Adobe XD</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg border bg-muted/50" aria-hidden>
                    <SiSketch className="h-7 w-7 text-[#F7B500]" />
                  </span>
                  <span className="font-medium">Sketch</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg border bg-muted/50" aria-hidden>
                    <SiFramer className="h-7 w-7 text-foreground" />
                  </span>
                  <span className="font-medium">Framer</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg border bg-muted/50" aria-hidden>
                    <SiMiro className="h-7 w-7 text-[#050038]" />
                  </span>
                  <span className="font-medium">Miro</span>
                </li>
              </ul>
              <p className="mt-6 text-small font-medium text-muted-foreground">
                Styles & intégration (CSS, préprocesseurs, frameworks)
              </p>
              <ul className="mt-2 flex flex-wrap items-center gap-6" aria-label="Styles et intégration">
                <li className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg border bg-muted/50" aria-hidden>
                    <SiCss3 className="h-7 w-7 text-[#1572B6]" />
                  </span>
                  <span className="font-medium">CSS</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg border bg-muted/50" aria-hidden>
                    <FaSass className="h-7 w-7 text-[#CC6699]" />
                  </span>
                  <span className="font-medium">Sass</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg border bg-muted/50" aria-hidden>
                    <FaLess className="h-7 w-7 text-[#1D365D]" />
                  </span>
                  <span className="font-medium">Less</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg border bg-muted/50" aria-hidden>
                    <SiTailwindcss className="h-7 w-7 text-[#06B6D4]" />
                  </span>
                  <span className="font-medium">Tailwind CSS</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg border bg-muted/50" aria-hidden>
                    <SiShadcnui className="h-7 w-7 text-foreground" />
                  </span>
                  <span className="font-medium">shadcn/ui</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg border bg-muted/50" aria-hidden>
                    <FaBootstrap className="h-7 w-7 text-[#7952B3]" />
                  </span>
                  <span className="font-medium">Bootstrap</span>
                </li>
              </ul>
              <p className="mt-6 text-small font-medium text-muted-foreground">
                Design systems, frameworks UI & bonnes pratiques
              </p>
              <ul className="mt-2 flex flex-wrap items-center gap-6" aria-label="Design systems et bonnes pratiques">
                <li className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg border bg-muted/50" aria-hidden>
                    <TbAtom2Filled className="h-7 w-7 text-foreground" />
                  </span>
                  <span className="font-medium">Atomic Design (Brad Frost)</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg border bg-muted/50" aria-hidden>
                    <SiMaterialdesign className="h-7 w-7 text-[#757575]" />
                  </span>
                  <span className="font-medium">Material Design</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg border bg-muted/50" aria-hidden>
                    <SiPrimevue className="h-7 w-7 text-[#82B1FF]" />
                  </span>
                  <span className="font-medium">PrimeVue</span>
                </li>
              </ul>
              <p className="mt-4 text-muted-foreground text-pretty text-small">
                Je m’appuie sur les bonnes pratiques UX/UI : accessibilité (WCAG), cohérence des design tokens, hiérarchie visuelle, atomic design (méthodologie de Brad Frost pour structurer les composants en atomes, molécules, organismes), et sur des systèmes de design éprouvés (Material Design, PrimeVue, shadcn/ui) pour livrer des interfaces maintenables et scalables.
              </p>
              <p className="mt-6 text-small font-medium text-muted-foreground">
                Visuels & médias
              </p>
              <ul className="mt-2 flex flex-wrap items-center gap-6" aria-label="Visuels et médias">
                <li className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg border bg-muted/50" aria-hidden>
                    <FaInstagram className="h-7 w-7 text-[#E4405F]" />
                  </span>
                  <span className="font-medium">Instagram</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg border bg-muted/50" aria-hidden>
                    <FaYoutube className="h-7 w-7 text-[#FF0000]" />
                  </span>
                  <span className="font-medium">YouTube & Reels</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg border bg-muted/50" aria-hidden>
                    <SiCanva className="h-7 w-7 text-[#00C4CC]" />
                  </span>
                  <span className="font-medium">Canva</span>
                </li>
              </ul>
            </section>

            <section className="mb-16" aria-labelledby="approche">
              <h2 id="approche" className="text-titre-petit font-semibold tracking-tight">
                Mon approche
              </h2>
              <p className="mt-4 text-muted-foreground text-pretty">
                Je pars de vos objectifs (notoriété, conversion, cohérence de marque) et du profil de votre cible. Ensuite : cadrage du périmètre (wireframes, identité, visuels, vidéo), propositions de maquettes ou de visuels, validation, puis livraison des fichiers (Figma, XD, Canva) ou des médias (photos, vidéos). Pour la vidéo, je fais le lien avec un réalisateur indépendant pour le tournage et le montage.
              </p>
              <p className="mt-4 text-muted-foreground text-pretty">
                Vous gardez la main sur les créations Canva et pouvez faire évoluer vos visuels. En complément, je peux vous accompagner sur la{" "}
                <Link href="/services/site-vitrine" className="text-primary underline-offset-4 hover:underline">
                  création ou refonte de site vitrine
                </Link>
                , l’{" "}
                <Link href="/services/ecommerce" className="text-primary underline-offset-4 hover:underline">
                  e-commerce
                </Link>
                {" "}ou les{" "}
                <Link href="/services/applications-sur-mesure" className="text-primary underline-offset-4 hover:underline">
                  applications sur mesure
                </Link>
                , en reprenant les maquettes et le design system livrés.
              </p>
            </section>

            <section className="mb-16" aria-labelledby="visuels-video">
              <h2 id="visuels-video" className="text-titre-petit font-semibold tracking-tight">
                Visuels Instagram, vidéos YouTube et Reels
              </h2>
              <p className="mt-4 text-muted-foreground text-pretty">
                Pour les visuels sur Instagram, je crée des posts et stories alignés sur votre charte. Pour les vidéos (YouTube ou Reels, format vertical ou horizontal), je travaille en collaboration avec un réalisateur indépendant : écriture ou découpage, tournage, montage et livraison des fichiers prêts à publier.
              </p>
              <p className="mt-4 text-muted-foreground text-pretty">
                Canva reste l’outil idéal pour vos créations du quotidien : templates personnalisés, visuels récurrents et supports que vous pourrez modifier vous-même.
              </p>
            </section>

            <section className="mb-16" aria-labelledby="ce-que-ma-maitrise">
              <h2 id="ce-que-ma-maitrise" className="text-titre-petit font-semibold tracking-tight">
                Ce que ma maîtrise peut vous apporter
              </h2>
              <p className="mt-4 text-muted-foreground text-pretty">
                Un accompagnement sur mesure : je prends le temps de comprendre votre métier, votre positionnement et votre cible pour livrer une identité et des visuels qui vous ressemblent. Cohérence de marque, interfaces utilisables et contenus visuels prêts à l’emploi.
              </p>
              <p className="mt-4 text-muted-foreground text-pretty">
                Si demain vous souhaitez passer au site ou à l’application, les maquettes et le design system (CSS, Sass, Less) livrés servent de base pour le développement. Je peux aussi vous accompagner en{" "}
                <Link href="/services/seo-acquisition" className="text-primary underline-offset-4 hover:underline">
                  SEO & acquisition
                </Link>
                {" "}pour donner de la visibilité à vos contenus.
              </p>
            </section>

            <Separator className="my-12" />

            <section className="py-12 text-center" aria-labelledby="cta">
              <h2 id="cta" className="sr-only">
                Passer à l’action
              </h2>
              <p className="text-paragraphe font-medium text-foreground">
                Prêt à clarifier votre UX, votre UI ou votre branding ?
              </p>
              <p className="mt-4 text-muted-foreground text-pretty">
                Parlons de votre projet, de vos supports et de vos objectifs. Je vous réponds rapidement.
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
                src="/assets/illustrations/illu-design-bottom.png"
                alt="Illustration évoquant la conception : structure, wireframes et identité visuelle, pour rappeler qu’une marque se construit avec méthode."
                width={1200}
                height={600}
                className="h-auto w-full object-contain"
                sizes="(max-width: 768px) 100vw, 64rem"
              />
              <figcaption className="mt-3 text-center text-sm text-muted-foreground">
                Une marque et des interfaces se construisent avec méthode.
              </figcaption>
            </figure>
          </div>
        </article>
      </main>
    </>
  );
}
