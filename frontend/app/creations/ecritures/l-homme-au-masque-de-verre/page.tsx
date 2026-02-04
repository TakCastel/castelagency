import type { Metadata } from "next";
import { readFile } from "fs/promises";
import path from "path";

import { ContentPageLayout } from "@/components/landing/ContentPageLayout";
import { BookViewer } from "@/components/landing/BookViewer";
import { splitHtmlIntoPages } from "@/lib/book-pages";

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
    <ContentPageLayout
      backLink={{ href: "/creations/ecritures", label: "Retour aux écritures" }}
      title={TITLE}
      description="Ou la véritable histoire du Kheym. Texte intégral. — 2013"
      breadcrumb={[
        { label: "Accueil", href: "/" },
        { label: "Mes créations", href: "/creations" },
        { label: "Écritures", href: "/creations/ecritures" },
        { label: TITLE },
      ]}
      ariaLabel={TITLE}
      titleSize="small"
    >
      <BookViewer pages={pages} />
    </ContentPageLayout>
  );
}
