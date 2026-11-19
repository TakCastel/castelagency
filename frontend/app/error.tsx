"use client";

import { useEffect } from "react";
import Link from "next/link";

/**
 * Error boundary globale (App Router) : capture les erreurs de rendu non gérées.
 * Doit être un Client Component.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[GlobalError]", error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-castel-red px-6 text-center text-white">
      <h1 className="font-display text-5xl font-bold leading-none sm:text-7xl">
        Oups, quelque chose a planté
      </h1>
      <p className="max-w-md text-lg text-white/90">
        La page a rencontré une erreur inattendue. Réessayez, ou revenez à l&apos;accueil.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-full bg-castel-ink px-8 py-3 font-semibold text-white transition hover:bg-castel-surface"
        >
          Réessayer
        </button>
        <Link
          href="/"
          className="rounded-full border-2 border-white px-8 py-3 font-semibold text-white transition hover:bg-white hover:text-castel-red"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </main>
  );
}
