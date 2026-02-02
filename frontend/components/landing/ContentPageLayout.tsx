import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageHero, type PageHeroProps } from "@/components/landing/PageHero";

export type ContentPageLayoutProps = PageHeroProps & {
  children: React.ReactNode;
};

/**
 * Layout réutilisable pour une page avec hero (titre + description + lien retour)
 * et zone de contenu avec bouton « retour » en bas.
 */
export function ContentPageLayout({
  children,
  backLink,
  ...heroProps
}: ContentPageLayoutProps) {
  return (
    <>
      <PageHero backLink={backLink} {...heroProps} />

      <main className="container mx-auto -mt-8 flex w-full max-w-6xl flex-col px-4 pb-12 pt-0 sm:px-6">
        {children}

        {backLink && (
          <div className="flex flex-shrink-0 justify-center py-4">
            <Button asChild variant="outline" size="lg">
              <Link href={backLink.href} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                {backLink.label}
              </Link>
            </Button>
          </div>
        )}
      </main>
    </>
  );
}
