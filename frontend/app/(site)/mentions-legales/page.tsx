import type { Metadata } from "next";

import { LegalPage, LegalSection } from "@/components/legal/LegalPage";
import { CONTACT_EMAIL } from "@/data/games";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site Studio Castel, studio indépendant (jeux, apps et sites) à Avignon.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/mentions-legales" },
};

export default function MentionsLegalesPage() {
  return (
    <LegalPage
      label="Informations légales"
      title="Mentions légales"
      intro="Informations relatives à l’éditeur et à l’hébergement du site."
    >
      <LegalSection title="Éditeur du site">
        <p>
          Studio Castel est le nom commercial de Tarik Talhaoui, entrepreneur individuel (micro-entreprise),
          immatriculé au registre du commerce et des sociétés sous le numéro 853 165 736 R.C.S. Avignon.
          <br />
          SIRET : 853 165 736 00028
          <br />
          Adresse : 3 rue Portail Bienson, 84000 Avignon, France
          <br />
          Téléphone : 06 08 43 20 59
          <br />
          E-mail :{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#D61F1F] underline underline-offset-4">
            {CONTACT_EMAIL}
          </a>
          <br />
          TVA non applicable, article 293 B du Code général des impôts.
        </p>
      </LegalSection>

      <LegalSection title="Directeur de la publication">
        <p>Tarik Talhaoui</p>
      </LegalSection>
      <LegalSection title="Hébergement">
        <p>
          Ce site est hébergé par Netlify, Inc., 101 2nd Street, San Francisco, CA 94105, États-Unis (netlify.com).
        </p>
      </LegalSection>
      <LegalSection title="Propriété intellectuelle">
        <p>
          L’ensemble du contenu de ce site (textes, images, graphismes, logo, icônes, etc.) est protégé par le droit
          d’auteur et le droit des marques. Toute reproduction ou représentation, totale ou partielle, sans
          autorisation préalable est interdite.
        </p>
      </LegalSection>
      <LegalSection title="Crédits">
        <p>Conception et développement : Tarik Talhaoui / Studio Castel.</p>
      </LegalSection>
    </LegalPage>
  );
}
