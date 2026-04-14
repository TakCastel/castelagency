import type { Metadata } from "next";
import Link from "next/link";

import { TrainingProse } from "@/components/training/TrainingProse";
import { getPageDeGardeMarkdown } from "@/lib/training/load-markdown";
import { FORMATION_CONTENT_CONTAINER } from "@/lib/training/formation-container";
import { cn } from "@/lib/utils";

const SITE_URL = "https://studio-castel.com";

export const metadata: Metadata = {
  title: "Feuille de route du parcours",
  description:
    "Objectifs, publics, prérequis, ordre de lecture, sommaire des chapitres et possibilité d’accompagnement / intervention en entreprise sur devis.",
  alternates: {
    canonical: "/formation-ia/feuille-de-route",
  },
  openGraph: {
    title: "Feuille de route · Guide pratique IA | Studio Castel",
    description:
      "Guide du parcours : objectifs, prérequis, ordre de lecture, sommaire, accompagnement et formations en entreprise sur devis.",
    type: "article",
    locale: "fr_FR",
    url: `${SITE_URL}/formation-ia/feuille-de-route`,
  },
};

export default async function FormationFeuilleDeRoutePage() {
  const md = await getPageDeGardeMarkdown();

  return (
    <div className={cn(FORMATION_CONTENT_CONTAINER, "py-8 pb-24 md:py-10 md:pb-28")}>
      <nav className="text-small text-muted-foreground">
        <Link href="/formation-ia" className="hover:text-foreground">
          Guide pratique
        </Link>
        <span aria-hidden className="mx-2">
          /
        </span>
        <span className="text-foreground">Feuille de route</span>
      </nav>

      <header className="mt-6 border-b border-border/60 pb-8">
        <p className="text-small font-semibold uppercase tracking-wide text-primary">Guide du parcours</p>
        <h1 className="mt-2 text-pretty text-titre-moyen font-semibold tracking-tight text-foreground">
          Feuille de route
        </h1>
        <p className="mt-3 max-w-3xl text-pretty text-paragraphe leading-relaxed text-muted-foreground">
          Cette page rassemble l’essentiel avant de plonger dans les chapitres : à qui s’adresse le guide pratique, ce que
          vous serez capable de faire, les prérequis et l’ordre de lecture conseillé. Les tableaux et liens ci-dessous
          sont pensés comme une page de cours : vous pouvez les parcourir ici ou ouvrir chaque chapitre quand vous
          êtes prêt.
        </p>
      </header>

      <article
        className="mt-8 rounded-2xl border border-border/80 bg-card/50 p-5 shadow-sm sm:p-8 md:p-10"
        aria-label="Contenu de la feuille de route"
      >
        {md ? (
          <TrainingProse content={md} />
        ) : (
          <p className="text-muted-foreground">Contenu indisponible.</p>
        )}
      </article>
    </div>
  );
}
