"use client";

import { useRef } from "react";

import { CompassIcon } from "@/components/ui/compass";
import { HeartHandshakeIcon } from "@/components/ui/heart-handshake";
import { KeyboardIcon } from "@/components/ui/keyboard";
import { ProcessIllustration } from "@/components/landing/ProcessIllustration";
import { SectionIntro } from "@/components/landing/SectionIntro";
import { Stepper, type StepperStep } from "@/components/landing/Stepper";

const steps: StepperStep[] = [
  {
    icon: CompassIcon,
    title: "Cadrage",
    desc: "Je définis avec vous les objectifs, la cible et les messages clés. Arborescence, plan de contenu et stratégie SEO : tout est posé avant de toucher au design. Briefs, personas, parcours : je cadre pour avancer sereinement.",
    desktopWording: (
      <>
        <p>
          Avant de coder ou de dessiner les mockups, je pose le cadre. Je définis avec vous{" "}
          <strong>les objectifs du projet, la cible et les messages clés</strong>. Arborescence, plan de contenu et
          stratégie SEO : tout est écrit et validé. Briefs créatifs, personas, parcours utilisateur : je m'aligne pour
          avancer sereinement et éviter les allers-retours. Un bon cadrage, c'est{" "}
          <strong>la base d'un projet livré à l'heure et dans le scope</strong>.
        </p>
        <p>
          Comment ça se passe : je commence par un échange (visio ou sur site) pour comprendre votre activité, vos
          utilisateurs et vos priorités. J'en tire un document de cadrage (objectifs, cible, messages, arborescence) et
          un plan de contenu / SEO. Vous validez ce socle avant que je touche au design ou au code. Résultat : tout le
          monde part sur la même base, et les phases suivantes enchaînent sans surprise.
        </p>
        <p>
          <strong>La première heure d'échange est gratuite.</strong> Les réunions de cadrage sont incluses dans les
          tarifs.
        </p>
      </>
    )
  },
  {
    icon: KeyboardIcon,
    title: "Développement",
    desc: "Wireframes, maquettes, UI kit, puis développement. Intégration, tests, déploiement et suivi technique. SEO on-page, performance, accessibilité : je livre un site prêt à vivre et à évoluer.",
    desktopWording: (
      <>
        <p>
          Une fois le cadre validé, je passe à la conception et au build. Wireframes, maquettes, UI kit, puis
          développement front et back. Intégration des contenus, tests, déploiement et suivi technique. Je soigne{" "}
          <strong>le SEO on-page, la performance et l'accessibilité</strong> pour livrer un site prêt à vivre et à
          évoluer. <strong>Chaque livraison est un point de validation</strong> : vous voyez avancer le projet étape
          par étape.
        </p>
        <p>
          Comment ça se passe : j'enchaîne conception (wireframes puis maquettes), validation avec vous, puis
          développement. Je livre par jalons (pages types, fonctionnalités clés) pour que vous puissiez tester au fil de
          l'eau. Intégration des textes et médias, tests multi-navigateurs et mobile, mise en ligne et suivi technique.
          Vous avez un interlocuteur dédié et un accès au suivi du projet.
        </p>
      </>
    )
  },
  {
    icon: HeartHandshakeIcon,
    title: "Accompagnement",
    desc: "Optimisation continue, contenu, analytics et petites évolutions. Je reste dispo pour faire grandir le projet : nouveaux blocs, A/B tests, formations, maintenance. Vous avancez, je suis.",
    desktopWording: (
      <>
        <p>
          Le site est en ligne, le projet n'est pas fini pour autant. Je reste dispo pour{" "}
          <strong>l'optimisation continue</strong> : contenu, analytics, petites évolutions. Nouveaux blocs, A/B tests,
          formations à la mise à jour, maintenance : je fais grandir le projet avec vous. Vous avancez, je suis.
        </p>
        <p>
          Comment ça se passe : après la mise en ligne, je peux mettre en place un suivi (maintenance, évolutions,
          contenu). Selon vos besoins : mises à jour ponctuelles, forfait heures, ou accompagnement continu (analytics,
          A/B tests, nouveaux blocs). Je peux aussi vous former à la mise à jour du site pour que vous soyez autonomes.
          L'idée : le site vit avec vous, je reste le partenaire technique à qui faire appel quand il faut.
        </p>
      </>
    )
  }
];

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} id="process" className="container overflow-visible py-16 md:py-20">
      <div className="overflow-visible lg:grid lg:grid-cols-3 lg:gap-10 lg:items-start">
        {/* Colonne méthodo : 2/3 */}
        <div className="min-w-0 lg:col-span-2">
          <SectionIntro
            label="Méthode"
            title="Un process clair, accompagnement produit inclus."
            description="De la stratégie à la mise en ligne et au suivi : trois temps avec des points de validation à chaque étape. Pas de tunnel, pas de surprise. J’accompagne le produit avec vous jusqu’à la livraison et au-delà."
            textAlignClassName="text-left"
          />

          {/* Illustration mobile : entre titre et stepper */}
          <div className="flex min-h-[280px] items-center justify-center py-8 md:min-h-[320px] lg:hidden">
            <ProcessIllustration scrollTargetRef={sectionRef} variant="mobile" />
          </div>

          {/* Stepper responsive : vertical (mobile) / horizontal volets (desktop) */}
          <div className="mt-10">
            <Stepper
              steps={steps}
              defaultExpandedIndex={0}
              ctaHref="/devis"
              ctaLabel="On travaille ensemble ?"
            />
          </div>
        </div>

        {/* Colonne illustration desktop : 1/3, arrive de la droite */}
        <div className="hidden overflow-visible pt-8 lg:block lg:min-h-[420px]">
          <ProcessIllustration scrollTargetRef={sectionRef} variant="desktop" />
        </div>
      </div>
    </section>
  );
}
