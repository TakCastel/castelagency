import type { Metadata } from "next";

import { AnimatedSection } from "@/components/landing/AnimatedSection";
import { PageHero } from "@/components/landing/PageHero";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales du site Studio Castel, agence web à Avignon.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/mentions-legales" },
};

export default function MentionsLegalesPage() {
  return (
    <>
      <PageHero
        label="Informations légales"
        title="Mentions légales"
        description="Informations relatives à l’éditeur et à l’hébergement du site."
        breadcrumb={[{ label: "Accueil", href: "/" }, { label: "Mentions légales" }]}
        ariaLabel="Mentions légales"
      />
      <div className="container pb-20">
        <AnimatedSection delay={0} className="space-y-8">
          <section>
            <h2 className="text-titre-petit font-semibold tracking-tight text-foreground">Éditeur du site</h2>
            <p className="mt-2 text-paragraphe text-muted-foreground">
              Studio Castel – Tarik Talhaoui<br />
              Avignon, France
            </p>
          </section>
          <section>
            <h2 className="text-titre-petit font-semibold tracking-tight text-foreground">Hébergement</h2>
            <p className="mt-2 text-paragraphe text-muted-foreground">
              Ce site est hébergé par Netlify, Inc., 2325 3rd Street, Suite 296, San Francisco, California 94107, USA.
            </p>
          </section>
          <section>
            <h2 className="text-titre-petit font-semibold tracking-tight text-foreground">Propriété intellectuelle</h2>
            <p className="mt-2 text-paragraphe text-muted-foreground">
              L’ensemble du contenu de ce site (textes, images, graphismes, logo, icônes, etc.) est protégé par le droit d’auteur et le droit des marques. Toute reproduction ou représentation, totale ou partielle, sans autorisation préalable est interdite.
            </p>
          </section>
          <section>
            <h2 className="text-titre-petit font-semibold tracking-tight text-foreground">Crédits</h2>
            <p className="mt-2 text-paragraphe text-muted-foreground">
              Conception et développement : Tarik Talhaoui / Studio Castel.
            </p>
          </section>
        </AnimatedSection>
      </div>
    </>
  );
}
