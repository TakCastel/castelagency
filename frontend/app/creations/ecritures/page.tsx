import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/landing/PageHero";
import { BooksMasonry } from "@/components/landing/BooksMasonry";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Écritures | Mes créations | Studio Castel",
  description: "Galerie de livres et d'écrits. Mes créations personnelles.",
  openGraph: {
    title: "Écritures | Mes créations | Studio Castel",
    description: "Galerie de livres et d'écrits.",
    type: "website",
    locale: "fr_FR",
  },
  alternates: {
    canonical: "/creations/ecritures",
  },
};

export default function EcrituresPage() {
  return (
    <>
      <PageHero
        backLink={{ href: "/creations", label: "Retour aux créations" }}
        title="Écritures"
        description="Galerie de livres et d'écrits."
        ariaLabel="Écritures"
      />

      <div className="container mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <BooksMasonry />
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
