import type { Metadata } from "next";
import Link from "next/link";
import { readFile } from "fs/promises";
import path from "path";

import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/landing/PageHero";
import { BookViewer } from "@/components/landing/BookViewer";
import { splitHtmlIntoPages } from "@/lib/book-pages";
import { ArrowLeft } from "lucide-react";

const TITLE = "L'homme au masque de verre";

export const metadata: Metadata = {
  title: `${TITLE} | Écritures | Studio Castel`,
  description: `Lecture en ligne : ${TITLE}, un récit à découvrir sur le site.`,
  openGraph: {
    title: `${TITLE} | Studio Castel`,
    description: `Lecture en ligne : ${TITLE}.`,
    type: "article",
    locale: "fr_FR",
  },
  alternates: {
    canonical: "/creations/ecritures/l-homme-au-masque-de-verre",
  },
};

const HTML_PATH = "content/ecritures/l-homme-au-masque-de-verre.html";

async function getBookContent(): Promise<string> {
  const contentPath = path.join(process.cwd(), HTML_PATH);
  try {
    return await readFile(contentPath, "utf8");
  } catch {
    return "";
  }
}

export default async function HommeMasqueVerrePage() {
  const content = await getBookContent();
  const pages = splitHtmlIntoPages(content);

  return (
    <>
      <PageHero
        backLink={{ href: "/creations/ecritures", label: "Retour aux écritures" }}
        title={TITLE}
        description="Ou la véritable histoire du Kheym. Texte intégral. — 2013"
        ariaLabel={TITLE}
        titleSize="small"
      />

      <main className="container mx-auto w-full px-4 py-4 sm:px-6 flex flex-col pb-12">
        <BookViewer pages={pages} />

        <div className="flex-shrink-0 flex justify-center py-4">
          <Button asChild variant="outline" size="lg">
            <Link href="/creations/ecritures" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Retour aux écritures
            </Link>
          </Button>
        </div>
      </main>
    </>
  );
}
