import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/landing/PageHero";
import { DrawingsMasonry } from "@/components/landing/DrawingsMasonry";
import { getDrawings, balanceDrawingsForMasonry } from "@/lib/drawings";
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
  const drawings = balanceDrawingsForMasonry(getDrawings());

  return (
    <>
      <PageHero
        backLink={{ href: "/creations", label: "Retour aux créations" }}
        title="Dessins"
        description="Galerie d'images et de dessins."
        ariaLabel="Dessins"
      />

      <div className="container mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <DrawingsMasonry drawings={drawings} />
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
