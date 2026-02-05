import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  CreditCard,
  LayoutGrid,
  Package,
  Palette,
  Search,
  ShoppingCart,
  Smartphone,
  Truck,
} from "lucide-react";

import { Breadcrumb } from "@/components/landing/Breadcrumb";
import { HeroCardPageLayout } from "@/components/landing/HeroCardPageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

/** Logos technos (SVG inline, style Simple Icons). */
const TechLogoPrestashop = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M11.558 1.034C5.174 1.034 0 6.21 0 12.592c0 1.258.201 2.47.574 3.597l.002-.007a12.415 12.415 0 01.53-1.787l.011-.03c.085-.222.179-.442.277-.66l.084-.181c.08-.171.165-.34.253-.507.036-.068.07-.136.108-.203.02-.038.044-.073.064-.11.094-.166.19-.332.29-.493l.075-.114c.125-.195.256-.386.393-.573l.035-.05c.144-.193.295-.38.451-.563l.1-.118c.155-.177.315-.35.481-.517l.099-.097a10.321 10.321 0 01.546-.503c.74-2.48 3.005-4.285 5.686-4.285 1.079 0 2.152.31 3.071.873a6.017 6.017 0 012.211 2.407l.007.015.04.074v.003l.004.002a9.925 9.925 0 011.567 1.198c.04.037.081.071.12.109.002 0 .006.005.007.006l-.002-.006-.001-.004v-.003l.042-.084c.377-2.384 1.43-4.102 2.67-4.102.934 0 1.762.975 2.276 2.476l.005.016.001.002c.145.158.287.331.424.521l.007.01.021.067-.02-.078c-1.542-4.569-5.863-7.857-10.952-7.857zM9.927 5.477C7.586 5.52 5.34 7.132 4.574 9.365l-.012.034a10.14 10.14 0 011.315-.895c2.806-1.656 6.479-1.646 9.278.016-.895-1.653-2.631-2.819-4.5-3.004a5.14 5.14 0 00-.728-.039zm9.834.5a1.36 1.36 0 00-.39.067c-1.265.562-1.719 2.073-2.031 3.303l-.016.072c.365-.62.808-1.215 1.396-1.642.835-.687 2.105-.655 2.916.053.308.326.141.008.031-.22-.342-.75-1.025-1.653-1.906-1.634zM21.67 7.98zm-9.32.335l-1.07 3.27-.002.005-.006.002-4.498 1.112h-.009l4.456 1.087c.105.11.227.205.36.28h.002c.042.024.085.045.129.065l.01.005c.041.018.083.033.126.047l.021.008c.04.013.08.023.12.032l.033.008a1.677 1.677 0 00.318.033 1.546 1.546 0 001.43-.948c.08-.186.123-.39.123-.604v-.011l-.001-.012c-.001-.054-.004-.107-.01-.16l-.001-.002a1.506 1.506 0 00-.026-.153l-.001-.004a1.511 1.511 0 00-.096-.288v-.003a1.521 1.521 0 00-.348-.49v-.003zm3.148.626c.048 1.008.036 2.046-.1 3.057-.17 2.018-1.19 3.798-1.972 5.616l-.03.08-.035.086c1.51-1.522 3.17-3.04 3.969-5.082.383-.636.118-1.342-.115-1.976-.17-.877-1.069-1.278-1.717-1.781zm6.172.572l-.588 2.688a1.764 1.764 0 00-.047.2c-.002.02-.007.04-.01.06a1.76 1.76 0 00-.016.222l-.002.031h.003c0 .628.297 1.136.663 1.137a.41.41 0 00.182-.045l.027-.015a.537.537 0 00.07-.047c.013-.01.024-.022.036-.033a.752.752 0 00.137-.168l.03-.054a1.23 1.23 0 00.052-.108l.017-.04c.02-.053.038-.108.053-.166l.002-.002.001-.003.404-.451-.407-.456v.001l-.02-.063zm-4.381.856c.69 1.716.85 3.707.091 5.43-.49 1.368-1.587 2.463-1.874 3.905.73.115 1.468.176 2.21.186 2.166.029 4.332-.42 6.284-1.365-2.04-2.869-4.121-5.755-6.711-8.156zm-4.948.977a.583.583 0 110 1.166.583.583 0 010-1.166zm9.352.37c.138 0 .249.19.249.426s-.111.426-.249.426c-.137 0-.248-.19-.248-.426 0-.235.11-.426.248-.426zm-4.044.184c-.016.112-.033.209-.05.29l-.006.023c-.01.05-.022.094-.033.128-.48 1.417-1.275 2.52-2.36 3.697-.147.16-.301.32-.459.484a58.883 58.883 0 01-1.196 1.205c-.112.11-.259.261-.425.436-.103.287-.22.61-.318.95-.044-.016-.086-.031-.131-.049-2.108-.815-3.519-1.904-3.519-1.904s1.086 1.414 2.915 2.74c.177.129.351.24.522.339-.075 1.194.452 2.34 2.83 2.682a4.81 4.81 0 001.228.008l-.01-.029a.062.062 0 00-.004-.01s-.167-.133-.379-.377a3.842 3.842 0 01-.584-.897 3.382 3.382 0 01-.266-.862 3.176 3.176 0 01-.006-.972c.017-.12.04-.241.072-.366.093-.374.255-.772.507-1.192l.002-.003.241-.404c1.103-1.86 1.797-3.275 1.506-5.441a8.943 8.943 0 00-.078-.476zm4.668.576zm.013.203l.003.036v.01c0 .013-.003.025-.003.038 0-.014.003-.028.003-.043 0-.014-.002-.026-.003-.04zm-.012.275v.001l-.002.01-.002.014.004-.025zm1.353 5.928c-2.553 1.138-5.44 1.44-8.192 1.007-.14 1.108.384 2.218 1.214 2.93l.012.01c2.703-.433 4.975-2.168 6.966-3.946z" />
  </svg>
);
const TechLogoWoocommerce = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M.754 9.58a.754.754 0 00-.754.758v2.525c0 .42.339.758.758.758h3.135l1.431.799-.326-.799h2.373a.757.757 0 00.758-.758v-2.525a.757.757 0 00-.758-.758H.754zm2.709.445h.03c.065.001.124.023.179.067a.26.26 0 01.103.19.29.29 0 01-.033.16c-.13.239-.236.64-.322 1.199-.083.541-.114.965-.094 1.267a.392.392 0 01-.039.219.213.213 0 01-.176.12c-.086.006-.177-.034-.263-.124-.31-.316-.555-.788-.735-1.416-.216.425-.375.744-.478.957-.196.376-.363.568-.502.578-.09.007-.166-.069-.233-.228-.17-.436-.352-1.277-.548-2.524a.297.297 0 01.054-.222c.047-.064.116-.095.21-.102.169-.013.265.065.288.238.103.695.217 1.284.336 1.766l.727-1.387c.066-.126.15-.192.25-.199.146-.01.237.083.273.28.083.441.188.817.315 1.136.086-.844.233-1.453.44-1.828a.255.255 0 01.218-.147zm1.293.36c.056 0 .116.006.18.02.232.05.411.177.53.386.107.18.161.395.161.654 0 .343-.087.654-.26.94-.2.332-.459.5-.781.5a.88.88 0 01-.18-.022.763.763 0 01-.531-.384 1.287 1.287 0 01-.158-.659c0-.342.085-.655.258-.937.202-.333.462-.498.78-.498zm2.084 0c.056 0 .116.006.18.02.236.05.411.177.53.386.107.18.16.395.16.654 0 .343-.086.654-.259.94-.2.332-.459.5-.781.5a.88.88 0 01-.18-.022.763.763 0 01-.531-.384 1.287 1.287 0 01-.16-.659c0-.342.087-.655.26-.937.202-.333.462-.498.78-.498zm4.437.047c-.305 0-.546.102-.718.304-.173.203-.256.49-.256.856 0 .395.086.697.256.906.17.21.418.316.744.316.315 0 .559-.107.728-.316.17-.21.256-.504.256-.883s-.087-.673-.26-.879c-.176-.202-.424-.304-.75-.304zm-1.466.002a1.13 1.13 0 00-.84.326c-.223.22-.332.499-.332.838 0 .362.108.658.328.88.22.223.505.336.861.336.103 0 .22-.016.346-.052v-.54c-.117.034-.216.051-.303.051a.545.545 0 01-.422-.177c-.106-.12-.16-.278-.16-.48 0-.19.053-.348.156-.468a.498.498 0 01.397-.181c.103 0 .212.015.332.049v-.537a1.394 1.394 0 00-.363-.045zm12.414 0a1.135 1.135 0 00-.84.326c-.223.22-.332.499-.332.838 0 .362.108.658.328.88.22.223.506.336.861.336.103 0 .22-.016.346-.052v-.54c-.116.034-.216.051-.303.051a.545.545 0 01-.422-.177c-.106-.12-.16-.278-.16-.48 0-.19.053-.348.156-.468a.498.498 0 01.397-.181c.103 0 .212.015.332.049v-.537a1.394 1.394 0 00-.363-.045zm-9.598.06l-.29 2.264h.579l.156-1.559.395 1.559h.412l.379-1.555.164 1.555h.603l-.304-2.264h-.791l-.12.508c-.03.13-.06.264-.087.4l-.067.352a29.97 29.97 0 00-.258-1.26h-.771zm2.768 0l-.29 2.264h.579l.156-1.559.396 1.559h.412l.375-1.555.165 1.555h.603l-.305-2.264h-.789l-.119.508c-.03.13-.06.264-.086.4l-.066.352c-.063-.352-.15-.771-.26-1.26h-.771zm3.988 0v2.264h.611v-1.031h.012l.494 1.03h.645l-.489-1.019a.61.61 0 00.37-.552.598.598 0 00-.25-.506c-.167-.123-.394-.186-.68-.186h-.713zm3.377 0v2.264H24v-.483h-.63v-.414h.54v-.468h-.54v-.416h.626v-.483H22.76zm-4.793.004v2.264h1.24v-.483h-.627v-.416h.541v-.468h-.54v-.415h.622v-.482h-1.236zm2.025.432c.146.003.25.025.313.072.063.046.091.12.091.227 0 .156-.135.236-.404.24v-.54zm-15.22.011c-.104 0-.205.069-.301.211a1.078 1.078 0 00-.2.639c0 .096.02.2.06.303.049.13.117.198.196.215.083.016.173-.02.27-.106.123-.11.205-.273.252-.492.016-.077.023-.16.023-.246 0-.097-.02-.2-.06-.303-.05-.13-.116-.198-.196-.215a.246.246 0 00-.045-.006zm2.083 0c-.103 0-.204.069-.3.211a1.078 1.078 0 00-.2.639c0 .096.02.2.06.303.049.13.117.198.196.215.083.016.173-.02.27-.106.123-.11.205-.273.252-.492.013-.077.023-.16.023-.246 0-.097-.02-.2-.06-.303-.05-.13-.116-.198-.196-.215a.246.246 0 00-.045-.006zm4.428.006c.233 0 .354.218.354.66-.004.273-.038.46-.098.553a.293.293 0 01-.262.139.266.266 0 01-.242-.139c-.056-.093-.084-.28-.084-.562 0-.436.11-.65.332-.65Z" />
  </svg>
);
const TechLogoShopify = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M15.337 23.979l7.216-1.561s-2.604-17.613-2.625-17.73c-.018-.116-.114-.192-.211-.192s-1.929-.136-1.929-.136-1.275-1.274-1.439-1.411c-.045-.037-.075-.057-.121-.074l-.914 21.104h.023zM11.71 11.305s-.81-.424-1.774-.424c-1.447 0-1.504.906-1.504 1.141 0 1.232 3.24 1.715 3.24 4.629 0 2.295-1.44 3.76-3.406 3.76-2.354 0-3.54-1.465-3.54-1.465l.646-2.086s1.245 1.066 2.28 1.066c.675 0 .975-.545.975-.932 0-1.619-2.654-1.694-2.654-4.359-.034-2.237 1.571-4.416 4.827-4.416 1.257 0 1.875.361 1.875.361l-.945 2.715-.02.01zM11.17.83c.136 0 .271.038.405.135-.984.465-2.064 1.639-2.508 3.992-.656.213-1.293.405-1.889.578C7.697 3.75 8.951.84 11.17.84V.83zm1.235 2.949v.135c-.754.232-1.583.484-2.394.736.466-1.777 1.333-2.645 2.085-2.971.193.501.309 1.176.309 2.1zm.539-2.234c.694.074 1.141.867 1.429 1.755-.349.114-.735.231-1.158.366v-.252c0-.752-.096-1.371-.271-1.871v.002zm2.992 1.289c-.02 0-.06.021-.078.021s-.289.075-.714.21c-.423-1.233-1.176-2.37-2.508-2.37h-.115C12.135.209 11.669 0 11.265 0 8.159 0 6.675 3.877 6.21 5.846c-1.194.365-2.063.636-2.16.674-.675.213-.694.232-.772.87-.075.462-1.83 14.063-1.83 14.063L15.009 24l.927-21.166z" />
  </svg>
);
const TechLogoStripe = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z" />
  </svg>
);
const TechLogoPaypal = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M7.016 19.198h-4.2a.562.562 0 0 1-.555-.65L5.093.584A.692.692 0 0 1 5.776 0h7.222c3.417 0 5.904 2.488 5.846 5.5-.006.25-.027.5-.066.747A6.794 6.794 0 0 1 12.071 12H8.743a.69.69 0 0 0-.682.583l-.325 2.056-.013.083-.692 4.39-.015.087zM19.79 6.142c-.01.087-.01.175-.023.261a7.76 7.76 0 0 1-7.695 6.598H9.007l-.283 1.795-.013.083-.692 4.39-.134.843-.014.088H6.86l-.497 3.15a.562.562 0 0 0 .555.65h3.612c.34 0 .63-.249.683-.585l.952-6.031a.692.692 0 0 1 .683-.584h2.126a6.793 6.793 0 0 0 6.707-5.752c.306-1.95-.466-3.744-1.89-4.906z" />
  </svg>
);

export const metadata: Metadata = {
  title: "Création & refonte de site e-commerce à Avignon | Studio Castel",
  description:
    "Agence web à Avignon : création et refonte de boutiques en ligne (e-commerce classique ou marketplace). PrestaShop, WooCommerce, Shopify, Stripe custom, headless. Devis gratuit.",
  keywords: [
    "création site e-commerce Avignon",
    "boutique en ligne Avignon",
    "PrestaShop WooCommerce Shopify",
    "paiement Stripe",
    "marketplace",
    "e-commerce headless",
  ],
  openGraph: {
    title: "Création & refonte de site e-commerce à Avignon | Studio Castel",
    description:
      "Boutiques en ligne sur mesure : PrestaShop, WooCommerce, Shopify, Stripe avec implémentation custom. E-commerce classique ou marketplace, headless possible.",
    type: "website",
    locale: "fr_FR",
  },
  alternates: {
    canonical: "/services/ecommerce",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Création et refonte de site e-commerce à Avignon",
  description:
    "Création et refonte de boutiques en ligne par Studio Castel : PrestaShop, WooCommerce, Shopify, Stripe custom, PayPal. E-commerce classique ou marketplace, solutions headless. Agence web à Avignon.",
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
  url: "https://studio-castel.com/services/ecommerce",
};

export default function EcommercePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroCardPageLayout imageSrc="/assets/illustrations/illu-ecommerce.png">
        <article>
          <div className="container px-4 pb-12 pt-4 sm:px-6">
            <div className="mx-auto max-w-3xl">
              <Breadcrumb
                items={[
                  { label: "Accueil", href: "/" },
                  { label: "Mes services", href: "/services" },
                  { label: "E-commerce" },
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
                aria-label="Tarif à partir de 4000 euros"
              >
                <span className="block text-[0.55rem] font-medium uppercase tracking-[0.15em] text-neutral-500 sm:text-[0.65rem] sm:tracking-[0.2em]">
                  À partir de
                </span>
                <span className="mt-0.5 block text-sm font-bold tabular-nums tracking-tight text-neutral-900 sm:mt-1 sm:text-xl">
                  4 000 €
                </span>
              </div>
              <header>
                <p className="text-small font-medium text-muted-foreground">
                  Service : E-commerce
                </p>
                <h1 className="mt-2 text-balance text-titre-moyen font-semibold tracking-tight">
                  Création et refonte de boutique en ligne à Avignon
                </h1>
                <p className="mt-6 text-paragraphe text-muted-foreground text-pretty">
                  Une boutique en ligne qui met en avant vos produits, sécurise les paiements et convertit les visiteurs en clients. Je conçois des sites e-commerce sur mesure : catalogue clair, tunnel d’achat optimisé, paiements (Stripe, PayPal) avec implémentation custom, et SEO intégré.
                </p>
                <p className="mt-4 text-paragraphe text-muted-foreground text-pretty">
                  Que vous visiez un e-commerce classique (une marque, un catalogue) ou une marketplace (plusieurs vendeurs), je m’adapte à votre modèle et à votre croissance.
                </p>
              </header>
              <Separator className="my-10" />
              <section aria-labelledby="quest-ce-quun-site-ecommerce">
                <h2
                  id="quest-ce-quun-site-ecommerce"
                  className="text-titre-petit font-semibold tracking-tight"
                >
                  E-commerce classique ou marketplace ?
                </h2>
                <p className="mt-4 text-muted-foreground text-pretty">
                  Un site e-commerce classique présente votre catalogue et permet d’acheter en ligne : fiches produits, panier, tunnel de commande, paiement sécurisé (Stripe, PayPal), gestion des stocks et des livraisons.
                </p>
                <p className="mt-4 text-muted-foreground text-pretty">
                  Une marketplace va plus loin : plusieurs vendeurs proposent leurs produits sur une même plateforme. Je peux vous accompagner sur l’architecture, les rôles (admin / vendeur / client), les commissions et les flux de paiement.
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
                Une boutique en ligne s’adresse à tous ceux qui vendent (ou veulent vendre) en ligne. J’adapte la solution à votre volume, votre catalogue et votre modèle : e-commerce classique ou marketplace.
              </p>
              <ul className="mt-6 list-disc space-y-2 pl-6 text-muted-foreground text-pretty">
                <li>Marques et commerces : vendre vos produits avec un catalogue structuré, des fiches produits soignées et un tunnel d’achat fluide.</li>
                <li>Artisans et producteurs : mettre en ligne votre production avec gestion des stocks, variantes et livraisons.</li>
                <li>Revendeurs et distributeurs : multi-catégories, filtres, recherche et paiement sécurisé (Stripe, PayPal, implémentations sur mesure).</li>
                <li>Portails marketplace : plateforme multi-vendeurs avec gestion des rôles, des commissions et des flux de paiement.</li>
                <li>Refonte : migration ou modernisation d’une boutique existante (changement de solution, nouveau design, optimisation conversion).</li>
              </ul>
            </section>

            <section className="mb-16" aria-labelledby="livrables">
              <h2 id="livrables" className="text-titre-petit font-semibold tracking-tight">
                Ce que je livre
              </h2>
              <p className="mt-4 text-muted-foreground text-pretty">
                De la structure au paiement, je livre une boutique prête à vendre. Chaque livrable est pensé pour votre cible et pour la conversion.
              </p>
              <ul className="mt-10 grid gap-6 sm:grid-cols-2" role="list">
                {[
                  { icon: LayoutGrid, label: "Structure & catalogue", text: "Arborescence catégories, fiches produits (variantes, stocks), filtres et recherche pour une navigation claire." },
                  { icon: Palette, label: "Design e-commerce", text: "Maquettes orientées conversion : pages produits, panier, tunnel de commande, responsive et cohérent avec votre marque." },
                  { icon: ShoppingCart, label: "Panier & tunnel d’achat", text: "Panier persistant, étapes de commande (livraison, paiement), récapitulatif et confirmation." },
                  { icon: CreditCard, label: "Paiement (Stripe, PayPal)", text: "Intégration Stripe (modules + implémentation custom selon vos besoins) et PayPal pour sécuriser les transactions." },
                  { icon: Package, label: "Stocks & livraisons", text: "Gestion des stocks, variantes, devis de livraison et suivi des commandes côté back-office." },
                  { icon: Search, label: "SEO e-commerce", text: "Titres, meta, balisage produit (schema.org), URLs et contenu pensés pour les moteurs et la longue traîne." },
                  { icon: Smartphone, label: "Boutique responsive", text: "Affichage optimisé mobile, tablette et desktop pour vendre partout." },
                  { icon: Truck, label: "Hébergement & mise en ligne", text: "Conseil hébergement adapté au e-commerce, mise en production et suivi technique de base." },
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
                Je m’adapte à votre projet. Côté plateforme e-commerce : <strong className="text-foreground">PrestaShop</strong> (open source, très utilisé en France), <strong className="text-foreground">WooCommerce</strong> (sur WordPress, idéal si vous avez déjà un site WP), ou <strong className="text-foreground">Shopify</strong> (SaaS, déploiement rapide). Pour des besoins avancés (front sur mesure, multi-canal), une approche <strong className="text-foreground">headless</strong> (API + front dédié) est possible.
              </p>
              <p className="mt-4 text-muted-foreground text-pretty">
                Côté paiement : intégration des <strong className="text-foreground">modules Stripe</strong> avec <strong className="text-foreground">implémentation custom</strong> (abonnements, paiement différé, logique métier spécifique) et <strong className="text-foreground">PayPal</strong> pour couvrir les usages de vos clients.
              </p>
              <p className="mt-3 text-small font-medium text-muted-foreground">
                Plateformes e-commerce
              </p>
              <ul className="mt-2 flex flex-wrap items-center gap-6" aria-label="Plateformes e-commerce">
                <li className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg border bg-muted/50" aria-hidden>
                    <TechLogoPrestashop className="h-7 w-7 text-[#DF0067]" />
                  </span>
                  <span className="font-medium">PrestaShop</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg border bg-muted/50" aria-hidden>
                    <TechLogoWoocommerce className="h-7 w-7 text-[#96588A]" />
                  </span>
                  <span className="font-medium">WooCommerce</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg border bg-muted/50" aria-hidden>
                    <TechLogoShopify className="h-7 w-7 text-[#96BF48]" />
                  </span>
                  <span className="font-medium">Shopify</span>
                </li>
              </ul>
              <p className="mt-6 text-small font-medium text-muted-foreground">
                Paiement (modules + implémentation custom)
              </p>
              <ul className="mt-2 flex flex-wrap items-center gap-6" aria-label="Solutions de paiement">
                <li className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg border bg-muted/50" aria-hidden>
                    <TechLogoStripe className="h-7 w-7 text-[#635BFF]" />
                  </span>
                  <span className="font-medium">Stripe</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg border bg-muted/50" aria-hidden>
                    <TechLogoPaypal className="h-7 w-7 text-[#00457C]" />
                  </span>
                  <span className="font-medium">PayPal</span>
                </li>
              </ul>
              <p className="mt-4 text-small text-muted-foreground text-pretty">
                Headless : pour des projets exigeants, je peux concevoir une boutique avec API (Stripe, CMS ou custom) et un front dédié (Next.js, Nuxt, etc.) pour une expérience et des performances sur mesure.
              </p>
            </section>

            <section className="mb-16" aria-labelledby="approche">
              <h2 id="approche" className="text-titre-petit font-semibold tracking-tight">
                Mon approche
              </h2>
              <p className="mt-4 text-muted-foreground text-pretty">
                Je pars de votre modèle (e-commerce classique ou marketplace), de votre catalogue et de vos objectifs de chiffre d’affaires. Ensuite : choix de la plateforme (PrestaShop, WooCommerce, Shopify ou headless), maquettes du tunnel d’achat, intégration paiement (Stripe custom si besoin), développement et mise en ligne.
              </p>
              <p className="mt-4 text-muted-foreground text-pretty">
                Vous gardez la main sur les produits et les commandes grâce au back-office de la solution choisie. En complément, je peux vous accompagner en{" "}
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
                Je fais les deux. Création from scratch (domaine, hébergement, plateforme, design, catalogue, paiement) ou refonte / migration d’une boutique existante (changement de solution, nouveau design, optimisation du tunnel et des conversions). J’adapte le périmètre à votre situation.
              </p>
            </section>

            <section className="mb-16" aria-labelledby="ce-que-ma-maitrise">
              <h2 id="ce-que-ma-maitrise" className="text-titre-petit font-semibold tracking-tight">
                Ce que ma maîtrise peut vous apporter
              </h2>
              <p className="mt-4 text-muted-foreground text-pretty">
                Un accompagnement sur mesure : je prends le temps de comprendre votre catalogue, votre logistique et vos objectifs de vente pour livrer une boutique qui convertit. Paiements sécurisés (Stripe avec implémentation custom si besoin), tunnel optimisé, SEO e-commerce et évolutivité (marketplace, headless).
              </p>
              <p className="mt-4 text-muted-foreground text-pretty">
                Si vous avez déjà un site vitrine, je peux vous accompagner vers l’ajout d’une boutique en ligne, ou vers des{" "}
                <Link href="/services/applications-sur-mesure" className="text-primary underline-offset-4 hover:underline">
                  applications sur mesure
                </Link>
                {" "}pour gérer commandes, stocks ou CRM.
              </p>
            </section>

            <Separator className="my-12" />

            <section className="py-12 text-center" aria-labelledby="cta">
              <h2 id="cta" className="sr-only">
                Passer à l’action
              </h2>
              <p className="text-paragraphe font-medium text-foreground">
                Prêt à lancer ou refondre votre boutique en ligne ?
              </p>
              <p className="mt-4 text-muted-foreground text-pretty">
                Parlons de votre catalogue, de votre modèle (e-commerce ou marketplace) et de vos objectifs. Je vous réponds rapidement.
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
                src="/assets/illustrations/illu-ecommerce-bottom.png"
                alt="Illustration évoquant la vente de produits en ligne : panier, paiement, livraison."
                width={1200}
                height={600}
                className="w-full h-auto object-contain"
                sizes="(max-width: 768px) 100vw, 64rem"
              />
              <figcaption className="mt-3 text-center text-sm text-muted-foreground">
                Boostez vos ventes en ligne grâce à une boutique en ligne performante.
              </figcaption>
            </figure>
          </div>
</article>
      </HeroCardPageLayout>
    </>
  );
}
