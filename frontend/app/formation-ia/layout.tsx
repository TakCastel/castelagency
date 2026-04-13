import type { ReactNode } from "react";
import Link from "next/link";

import { BuyMeACoffeeFloating } from "@/components/training/BuyMeACoffeeFloating";
import { TrainingHeaderSearch } from "@/components/training/TrainingHeaderSearch";
import { ThemeToggleButton } from "@/components/ThemeToggleButton";
import { FORMATION_CONTENT_CONTAINER } from "@/lib/training/formation-container";
import { cn } from "@/lib/utils";

/**
 * Parcours formation : hors header / footer du site (standalone, sans lien vers le site vitrine).
 */
export default function FormationIaLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-muted/40 via-background to-background dark:from-muted/10">
      <header className="fixed inset-x-0 top-0 z-[10001] shrink-0 border-b border-border/80 bg-background/90 backdrop-blur-md">
        <div className={cn(FORMATION_CONTENT_CONTAINER, "flex h-14 items-center gap-3")}>
          <Link
            href="/formation-ia"
            className="min-w-0 flex-1 truncate text-small font-semibold tracking-tight text-foreground hover:text-primary sm:text-paragraphe"
          >
            Formation IA
          </Link>
          <div className="ml-auto w-full max-w-xs shrink-0 sm:max-w-sm">
            <TrainingHeaderSearch />
          </div>
          <ThemeToggleButton size={20} className="h-9 w-9 shrink-0" />
        </div>
      </header>
      <div className="flex min-h-0 flex-1 flex-col pt-14">{children}</div>
      <BuyMeACoffeeFloating />
    </div>
  );
}
