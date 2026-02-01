import type { Metadata } from "next";

import { AnimatedSection } from "@/components/landing/AnimatedSection";
import { PageHero } from "@/components/landing/PageHero";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité et protection des données personnelles – Studio Castel.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/politique-de-confidentialite" },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      <PageHero
        label="Vos données"
        title="Politique de confidentialité"
        description="Comment nous collectons, utilisons et protégeons vos données personnelles."
        ariaLabel="Politique de confidentialité"
      />
      <div className="container pb-20">
        <AnimatedSection delay={0} className="space-y-8">
          <section>
            <h2 className="text-titre-petit font-semibold tracking-tight text-foreground">Responsable du traitement</h2>
            <p className="mt-2 text-paragraphe text-muted-foreground">
              Le responsable du traitement des données est Tarik Talhaoui (Studio Castel), Avignon, France.
            </p>
          </section>
          <section>
            <h2 className="text-titre-petit font-semibold tracking-tight text-foreground">Données collectées</h2>
            <p className="mt-2 text-paragraphe text-muted-foreground">
              Ce site peut collecter des données lorsque vous nous contactez (formulaire, e-mail, WhatsApp) : nom, adresse e-mail, message. Les données de navigation (cookies, logs) peuvent être utilisées à des fins techniques et d’analyse.
            </p>
          </section>
          <section>
            <h2 className="text-titre-petit font-semibold tracking-tight text-foreground">Finalité et base légale</h2>
            <p className="mt-2 text-paragraphe text-muted-foreground">
              Les données sont traitées pour répondre à vos demandes de contact et, le cas échéant, pour la gestion de la relation commerciale. La base légale est votre consentement ou l’exécution de mesures précontractuelles.
            </p>
          </section>
          <section>
            <h2 className="text-titre-petit font-semibold tracking-tight text-foreground">Conservation et droits</h2>
            <p className="mt-2 text-paragraphe text-muted-foreground">
              Les données sont conservées pendant la durée nécessaire aux finalités indiquées. Vous disposez d’un droit d’accès, de rectification, d’effacement et de limitation du traitement. Pour exercer ces droits ou pour toute question, contactez-nous.
            </p>
          </section>
        </AnimatedSection>
      </div>
    </>
  );
}
