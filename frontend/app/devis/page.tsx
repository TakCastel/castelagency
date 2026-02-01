import type { Metadata } from "next";

import { DevisForm } from "@/components/landing/DevisForm";
import { PageHero } from "@/components/landing/PageHero";

export const metadata: Metadata = {
  title: "Demander un devis | Studio Castel",
  description:
    "Demandez un devis pour votre projet web : site vitrine, e‑commerce, application, UX/UI, SEO ou process IA. Studio Castel, Avignon.",
  openGraph: {
    title: "Demander un devis | Studio Castel",
    description:
      "Décrivez votre projet et recevez un plan et un devis adapté. Site vitrine, e‑commerce, application, UX/UI, SEO, Avignon.",
    type: "website",
    locale: "fr_FR",
  },
  alternates: {
    canonical: "/devis",
  },
};

export default function DevisPage() {
  return (
    <>
      <PageHero
        label="Devis"
        title="Demander un devis"
        description="Décrivez votre projet, votre cible et vos objectifs. Je vous recontacte avec un plan simple et une proposition de devis."
        ariaLabel="Demander un devis"
      />

      <div className="container py-12 md:py-16">
        <div className="mx-auto max-w-2xl">
          <DevisForm />
        </div>
      </div>
    </>
  );
}
