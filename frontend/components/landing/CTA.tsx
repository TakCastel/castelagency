import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function CTA() {
  return (
    <section id="contact" className="container py-16 md:py-20">
      <Card className="relative overflow-hidden bg-card/50">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-120px] top-[-120px] h-[320px] w-[320px] rounded-full bg-gradient-to-br from-muted-foreground/15 via-muted-foreground/5 to-transparent blur-2xl" />
          <div className="absolute bottom-[-140px] right-[-140px] h-[360px] w-[360px] rounded-full bg-gradient-to-tr from-muted-foreground/12 via-muted-foreground/5 to-transparent blur-2xl" />
        </div>
        <CardContent className="relative z-10 min-w-0 p-5 sm:p-8 md:p-10">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div className="min-w-0">
              <h3 className="text-balance text-titre-moyen font-semibold tracking-tight">
                Besoin d’un site qui attire des clients et génère des leads ?
              </h3>
              <p className="mt-3 text-pretty text-muted-foreground">
                Dites-moi votre offre, votre cible et vos objectifs (visibilité, leads, ventes).
                <br />
                Je reviens avec un plan simple + un devis.
              </p>
            </div>
            <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:flex-nowrap">
              <Button size="lg" asChild className="w-full min-w-0 sm:w-auto">
                <a href="/devis">
                  Demander un devis <ArrowRight />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild className="w-full min-w-0 sm:w-auto">
                <a href="/#faq">Voir la FAQ</a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

