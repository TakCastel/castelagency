import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/legal/LegalPage";
import { CONTACT_EMAIL } from "@/data/games";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité et protection des données personnelles, Studio Castel.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/politique-de-confidentialite" },
};

const linkCls = "text-[#D61F1F] underline underline-offset-4";

export default function PolitiqueConfidentialitePage() {
  return (
    <LegalPage
      label="Vos données"
      title="Politique de confidentialité"
      intro="Quelles données ce site collecte, pourquoi, et comment exercer tes droits."
    >
      <LegalSection title="Responsable du traitement">
        <p>Le responsable du traitement des données est Tarik Talhaoui (Studio Castel), Avignon, France.</p>
      </LegalSection>

      <LegalSection title="Données collectées">
        <p>Ce site ne comporte ni compte, ni formulaire. Deux cas seulement :</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Quand tu écris par e-mail</strong> à{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className={linkCls}>
              {CONTACT_EMAIL}
            </a>
            : ton adresse e-mail, ton nom s&apos;il apparaît et le contenu du message.
          </li>
          <li>
            <strong>Mesure d&apos;audience, uniquement si tu l&apos;acceptes</strong> : pages vues, clics, type
            d&apos;appareil, pays approximatif, via Google Analytics 4. Sans ton accord, aucun cookie de mesure
            n&apos;est déposé et rien n&apos;est envoyé à Google.
          </li>
        </ul>
        <p>Un seul cookie est toujours déposé : celui qui retient ton choix sur les cookies (durée : 12 mois).</p>
      </LegalSection>

      <LegalSection title="Finalité et base légale">
        <ul className="list-disc space-y-2 pl-5">
          <li>Répondre à tes messages : intérêt légitime à donner suite à une demande que tu as envoyée.</li>
          <li>Mesurer l&apos;audience pour améliorer le site : ton consentement, que tu peux retirer à tout moment.</li>
        </ul>
      </LegalSection>

      <LegalSection title="Google Analytics">
        <p>
          La mesure d&apos;audience utilise Google Analytics 4, fourni par Google Ireland Limited. Les données peuvent
          être transférées aux États-Unis, dans le cadre du Data Privacy Framework entre l&apos;UE et les États-Unis. Les données
          d&apos;audience sont conservées 14 mois au maximum. Les cookies de mesure (préfixés « _ga ») durent au
          maximum 13 mois.
        </p>
        <p>
          Pour changer d&apos;avis, utilise le lien « Gérer les cookies » en bas de chaque page : la question
          s&apos;affiche de nouveau et tu peux refuser.
        </p>
      </LegalSection>

      <LegalSection title="Conservation">
        <p>
          Les e-mails sont conservés le temps de l&apos;échange, puis 3 ans au maximum. Les données d&apos;audience,
          14 mois au maximum.
        </p>
      </LegalSection>

      <LegalSection title="Tes droits">
        <p>
          Tu disposes d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, de limitation et
          d&apos;opposition. Pour les exercer, écris à{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className={linkCls}>
            {CONTACT_EMAIL}
          </a>
          . Tu peux aussi adresser une réclamation à la CNIL (cnil.fr).
        </p>
      </LegalSection>
    </LegalPage>
  );
}
