import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/landing/PageHero";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Dessins | Mes créations | Studio Castel",
  description: "Galerie de dessins et d’images. Mes créations personnelles.",
  openGraph: {
    title: "Dessins | Mes créations | Studio Castel",
    description: "Galerie de dessins et d’images.",
    type: "website",
    locale: "fr_FR",
  },
  alternates: {
    canonical: "/creations/dessins",
  },
};

export default function DessinsPage() {
  return (
    <>
      <PageHero
        backLink={{ href: "/creations", label: "Retour aux créations" }}
        title="Dessins"
        description="Galerie d'images et de dessins."
        ariaLabel="Dessins"
      />

      <div className="container mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {/* Placeholder : à remplacer par vos images */}
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="aspect-square rounded-xl border border-border/50 bg-muted/30"
              aria-hidden
            />
          ))}
        </div>
        <p className="mt-8 text-center text-small text-muted-foreground">
          Galerie à compléter avec vos dessins.
        </p>
        <div className="mt-8 flex justify-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/creations">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux créations
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}
