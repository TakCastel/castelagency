import { Coffee } from "lucide-react";

import { cn } from "@/lib/utils";

export const BUY_ME_A_COFFEE_URL = "https://www.buymeacoffee.com/ttlh";

type BuyMeACoffeeFloatingProps = {
  className?: string;
};

/**
 * Pastille fixe en bas à droite (parcours formation uniquement).
 */
export function BuyMeACoffeeFloating({ className }: BuyMeACoffeeFloatingProps) {
  return (
    <a
      href={BUY_ME_A_COFFEE_URL}
      target="_blank"
      rel="noopener noreferrer"
      title="Buy me a coffee"
      aria-label="Buy me a coffee sur buymeacoffee.com (nouvel onglet)"
      className={cn(
        "fixed bottom-5 right-5 z-[10020] flex h-14 w-14 items-center justify-center rounded-full sm:bottom-8 sm:right-8",
        "bg-gradient-to-br from-amber-200 via-amber-400 to-amber-500 text-amber-950",
        "shadow-[0_10px_40px_rgba(245,158,11,0.35)] ring-1 ring-white/50",
        "transition-[transform,box-shadow] duration-200 motion-safe:hover:scale-[1.06] hover:shadow-[0_14px_48px_rgba(245,158,11,0.45)] motion-safe:active:scale-[0.98]",
        "dark:from-amber-300 dark:via-amber-500 dark:to-amber-600 dark:text-amber-950 dark:ring-amber-100/25",
        className
      )}
    >
      <Coffee className="size-[1.35rem]" strokeWidth={2.25} aria-hidden />
    </a>
  );
}
