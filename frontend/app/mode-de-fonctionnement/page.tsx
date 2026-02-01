import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ProcessKanban } from "@/components/landing/ProcessKanban";
import { SectionIntro } from "@/components/landing/SectionIntro";

export const metadata: Metadata = {
  title: "Ma méthode | Studio Castel",
  description:
    "De la prise de contact à la facture : découvrez les étapes du projet en déplaçant les tickets du kanban. Cadrage, acompte 40 %, maquettes, livrable.",
  openGraph: {
    title: "Ma méthode | Studio Castel",
    description:
      "Process clair : prise de contact, cadrage, acompte 40 %, maquettes, livrable, validation, facture.",
    type: "website",
    locale: "fr_FR",
  },
  alternates: {
    canonical: "/mode-de-fonctionnement",
  },
};

export default function ModeDeFonctionnementPage() {
  return (
    <>
      {/* Hero : même veine que Mes projets */}
      <section
        className="relative -mt-20 flex min-h-[50vh] flex-col justify-end overflow-hidden md:-mt-24"
        aria-label="Ma méthode"
      >
        <div className="pointer-events-none absolute inset-0 -z-10">
          <Image
            src="/hero-background.png"
            alt=""
            fill
            className="object-cover object-center opacity-50"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
        </div>

        <div className="container flex flex-col justify-end pb-12 pt-12 md:pb-16 md:pt-16">
          <p className="text-small font-medium text-muted-foreground">
            Méthode
          </p>
          <h1 className="mt-2 text-balance text-titre-moyen font-semibold tracking-tight text-foreground md:text-titre-gros">
            Ma méthode
          </h1>
          <p className="mt-3 max-w-2xl text-paragraphe text-muted-foreground text-pretty">
            Pour que vous sachiez toujours où on en est et à quoi s’attendre :
            des étapes claires, sans zone floue, de la prise de contact jusqu’à la
            facture.
          </p>
        </div>
      </section>

      <div className="container mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionIntro
          label="Comment je travaille"
          title="Un exercice pour découvrir ma méthode de travail."
          description="Un kanban est un tableau où chaque colonne est une étape du projet ; on déplace les tickets de gauche à droite pour avancer. Pour vous ça clarifie où on en est, pour moi ça sécurise le cadrage."
          textAlignClassName="text-center"
        />

        <ProcessKanban />

        <section
          className="mt-16 max-w-3xl mx-auto space-y-8 text-pretty md:mt-20"
          aria-labelledby="methode-detail"
        >
          <h2 id="methode-detail" className="text-xl font-semibold text-foreground">
            Pourquoi ce tableau, et comment on avance ensemble
          </h2>

          <p className="text-paragraphe text-muted-foreground">
            Le tableau kanban que vous venez de parcourir n’est pas qu’un joli
            schéma : c’est le reflet d’une méthode agile. Chaque colonne = une
            étape, chaque ticket = une tâche ou un livrable. On fait avancer les
            choses de gauche à droite, on voit en temps réel où en est le projet,
            et on évite les surprises. Pour vous, ça veut dire transparence ; pour
            moi, un cadrage clair.
          </p>

          <p className="text-paragraphe text-muted-foreground">
            Les tickets, on peut en ajouter en cours de route : moi comme vous.
            Vous avez une idée en milieu de projet ? On la met sur le tableau, on
            la priorise. En revanche, dès qu’une demande sort du périmètre qu’on
            a cadré ensemble, je la chiffre. Si on valide, on formalise par un
            avenant : pas de flou sur ce qui est inclus ou facturé en plus.
          </p>

          <p className="text-paragraphe text-muted-foreground">
            Je peux faire intervenir d’autres professionnels quand le projet le
            demande : contenus vidéo, chartes graphiques, rédaction, etc. Je
            pilote la coordination et je reste votre interlocuteur unique sur la
            livraison.
          </p>

          <p className="text-paragraphe text-muted-foreground">
            Si vous avez déjà des devs ou une équipe technique en place, je peux
            endosser un rôle de scrum master : animer les rituels, clarifier les
            priorités, fluidifier la communication entre vous et l’équipe. L’idée
            est de faire avancer le produit sans vous noyer dans le jargon.
          </p>

          <p className="text-paragraphe text-muted-foreground">
            En product owner, je m’appuie sur l’UX pour que le produit plaise
            d’abord aux utilisateurs finaux. Backlog, priorisation, user stories
            : tout est pensé pour livrer une solution qui sert vraiment, pas
            seulement une liste de fonctionnalités. On vise un produit qui
            convertit et qu’on a envie d’utiliser.
          </p>
        </section>

        <section
          className="mt-20 border-t border-border/80 pt-14 text-center md:mt-28 md:pt-16"
          aria-labelledby="cta-mode"
        >
          <h2 id="cta-mode" className="sr-only">
            Passer à l’action
          </h2>
          <p className="text-paragraphe font-medium text-foreground">
            Un projet en tête ?
          </p>
          <p className="mt-2 text-muted-foreground text-pretty">
            Parlons de vos objectifs et de la meilleure façon de les réaliser.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/devis">Demander un devis</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Me contacter</Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}
