import type { Metadata } from "next";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { PageHero } from "@/components/landing/PageHero";
import { Palette, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Mes créations | Studio Castel",
  description:
    "Dessins et écritures : galeries personnelles de créations. Dessins et livres.",
  openGraph: {
    title: "Mes créations | Studio Castel",
    description: "Dessins et écritures : galeries de créations personnelles.",
    type: "website",
    locale: "fr_FR",
  },
  alternates: {
    canonical: "/creations",
  },
};

export default function CreationsPage() {
  return (
    <>
      <PageHero
        label="Créations"
        title="Mes créations"
        description="Dessins et écritures : deux galeries pour découvrir une partie plus personnelle de mon travail."
        ariaLabel="Mes créations"
      />

      <div className="container mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <Link
            href="/creations/dessins"
            className="group block transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-xl"
          >
            <Card className="h-full overflow-hidden border-border/50 bg-card transition-colors group-hover:border-primary/40 group-hover:bg-primary/5">
              <CardContent className="flex flex-col items-center justify-center gap-4 p-8 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                  <Palette className="h-8 w-8" />
                </span>
                <h2 className="text-titre-petit font-semibold text-foreground">
                  Dessins
                </h2>
                <p className="text-small text-muted-foreground">
                  Galerie d’images et de dessins.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link
            href="/creations/ecritures"
            className="group block transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-xl"
          >
            <Card className="h-full overflow-hidden border-border/50 bg-card transition-colors group-hover:border-primary/40 group-hover:bg-primary/5">
              <CardContent className="flex flex-col items-center justify-center gap-4 p-8 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                  <BookOpen className="h-8 w-8" />
                </span>
                <h2 className="text-titre-petit font-semibold text-foreground">
                  Écritures
                </h2>
                <p className="text-small text-muted-foreground">
                  Galerie de livres et d’écrits.
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </>
  );
}
