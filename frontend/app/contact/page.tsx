import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/landing/PageHero";
import { WhereToFindMap } from "@/components/landing/WhereToFindMap";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Studio Castel, agence web à Avignon. Devis, cadrage et premier échange gratuits. Sites, e‑commerce, applications et SEO à Avignon et en Vaucluse.",
  openGraph: {
    title: "Contact | Studio Castel",
    description:
      "Contactez l’agence web Studio Castel à Avignon. Devis et premier échange gratuits. Sites, e‑commerce, applications, Avignon et Vaucluse.",
    type: "website",
    locale: "fr_FR",
  },
  alternates: {
    canonical: "/contact",
  },
};

const GOOGLE_BUSINESS_URL = "https://share.google/dziY5AZoxyjr2gqxl";

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Contact"
        title="Me contacter"
        description="Agence web Avignon : premier échange gratuit pour cadrer votre projet. Devis, sites, e‑commerce, applications et SEO."
        breadcrumb={[{ label: "Accueil", href: "/" }, { label: "Contact" }]}
        ariaLabel="Page contact"
      />

      <div className="container py-12 md:py-16">
        <div className="mx-auto max-w-2xl space-y-10">
          <Card className="bg-card/50">
            <CardContent className="p-6 sm:p-8">
              <h2 className="text-titre-petit font-semibold tracking-tight">
                Demander un devis ou discuter de votre projet
              </h2>
              <p className="mt-3 text-paragraphe text-muted-foreground">
                La première heure d’échange est gratuite. Décrivez votre projet, votre cible et vos
                objectifs via le formulaire devis : je vous recontacte avec un plan simple et une
                proposition.
              </p>
              <Button size="lg" asChild className="mt-6">
                <Link href="/devis">
                  Demander un devis <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card/50">
            <CardContent className="p-6 sm:p-8">
              <h2 className="text-titre-petit font-semibold tracking-tight">
                Studio Castel · Agence web à Avignon
              </h2>
              <ul className="mt-4 space-y-3 text-paragraphe text-muted-foreground">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-muted-foreground" aria-hidden />
                  <span>Basé à Avignon (Vaucluse). Interventions en local et en remote partout en France.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 size-5 shrink-0 text-muted-foreground" aria-hidden />
                  <span>
                    <a href="tel:+33608432059" className="text-foreground underline underline-offset-2 hover:no-underline">
                      06 08 43 20 59
                    </a>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 size-5 shrink-0 text-muted-foreground" aria-hidden />
                  <span>
                    <a href="mailto:takcastel@gmail.com" className="text-foreground underline underline-offset-2 hover:no-underline">
                      takcastel@gmail.com
                    </a>
                    {" "}
                    — ou le{" "}
                    <Link href="/devis" className="text-foreground underline underline-offset-2 hover:no-underline">
                      formulaire devis
                    </Link>
                    . LinkedIn, Instagram, GitHub, Twitch et fiche Google ci-dessous.
                  </span>
                </li>
              </ul>
              <Button variant="outline" size="sm" asChild className="mt-4">
                <a href={GOOGLE_BUSINESS_URL} target="_blank" rel="noopener noreferrer">
                  Voir la fiche Google · Castel - Studio numérique
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card/50">
            <CardContent className="p-6 sm:p-8">
              <h2 className="text-titre-petit font-semibold tracking-tight">
                Où me trouver
              </h2>
              <p className="mt-2 text-paragraphe text-muted-foreground">
                Studio Castel est basé à Avignon (Vaucluse). Interventions en présentiel dans la région et en remote partout en France.
              </p>
              <div className="mt-4">
                <WhereToFindMap />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
