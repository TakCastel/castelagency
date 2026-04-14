import type { Metadata } from "next";
import Link from "next/link";
import { Linkedin } from "lucide-react";

import { TrainingChapterCards } from "@/components/training/TrainingChapterCards";
import { Button } from "@/components/ui/button";
import { TRAINING_CHAPTERS } from "@/lib/training/course";
import { FORMATION_CONTENT_CONTAINER } from "@/lib/training/formation-container";
import { cn } from "@/lib/utils";

const SITE_URL = "https://studio-castel.com";

export const metadata: Metadata = {
  title: "Guide pratique IA & développement web",
  description:
    "Sécurité, assistants d’édition, prompts, BMAD, GEO, intégration produit, TP et QCM pour le web.",
  openGraph: {
    title: "Guide pratique IA & développement web | Studio Castel",
    description:
      "Sécurité, assistants dans l’éditeur, prompts, BMAD, GEO, intégration produit, TP et QCM pour le web.",
    type: "website",
    locale: "fr_FR",
    url: `${SITE_URL}/formation-ia`,
  },
  alternates: {
    canonical: "/formation-ia",
  },
};

export default function FormationIaHubPage() {
  return (
    <>
      <section
        className="border-b border-border/60 bg-gradient-to-br from-primary/10 via-background to-muted/30 py-12 md:py-16"
        aria-labelledby="formation-hero-title"
      >
        <div className={FORMATION_CONTENT_CONTAINER}>
          <p className="text-small font-semibold uppercase tracking-wide text-primary">Web</p>
          <h1
            id="formation-hero-title"
            className="mt-2 text-pretty text-titre-petit font-semibold tracking-tight text-foreground sm:text-titre-moyen"
          >
            Guide pratique IA & développement web
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-paragraphe leading-relaxed text-muted-foreground">
            Utiliser l’IA dans le code et le produit sans lâcher la sécurité ni la qualité : assistants, prompts,
            BMAD, GEO, intégration, puis TP, évaluation et QCM. Ce guide pratique est pensé pour l’apprentissage en
            autonomie : vous avancez chapitre par chapitre, à votre rythme.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/formation-ia/chapitre/01-introduction">Commencer le parcours</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/formation-ia/feuille-de-route">Feuille de route</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/formation-ia/chapitre/11-banque-qcm">Aller au QCM</Link>
            </Button>
          </div>
        </div>
      </section>

      <div className={cn(FORMATION_CONTENT_CONTAINER, "space-y-10 py-10 pb-24 sm:pb-28")}>
        <section aria-labelledby="chapitres-heading">
          <h2 id="chapitres-heading" className="text-titre-petit font-semibold text-foreground">
            Parcours par chapitres
          </h2>
          <p className="mt-2 max-w-2xl text-small text-muted-foreground">
            {TRAINING_CHAPTERS.length} chapitres, durée indicative environ 12 h au total, TP inclus
          </p>
          <TrainingChapterCards chapters={TRAINING_CHAPTERS} className="mt-6" />
        </section>

        <footer className="border-t border-border/40 pt-8">
          <p className="text-small leading-relaxed text-muted-foreground">
            Rédaction :{" "}
            <a
              href="https://www.linkedin.com/in/tarik-talhaoui-832769110/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Profil LinkedIn de Tarik Talhaoui (nouvel onglet)"
              className="inline-flex items-center gap-1.5 font-medium text-foreground/80 underline-offset-4 hover:text-primary hover:underline"
            >
              Tarik Talhaoui
              <Linkedin className="size-3.5 shrink-0 opacity-70" aria-hidden />
            </a>
            <span className="text-muted-foreground/80">, Studio Castel</span>
          </p>
          <p className="mt-2 max-w-2xl text-small leading-relaxed text-muted-foreground/90">
            Pensé pour l’autoformation : définitions progressives, prudence sur les sujets sensibles, TP et
            évaluation. La feuille de route donne une vue d’ensemble du cours pour vous y retrouver entre les
            chapitres, sans dépendre d’une session encadrée.
          </p>
        </footer>
      </div>
    </>
  );
}
