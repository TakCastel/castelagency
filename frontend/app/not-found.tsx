import Link from "next/link";

export const metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: false },
};

/** 404 globale : autonome (ni en-tête ni pied de page du site). */
export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-castel-ink px-6 text-center text-white">
      <p className="font-display text-8xl font-bold leading-none text-castel-red sm:text-9xl">404</p>
      <h1 className="font-display text-4xl font-bold leading-none sm:text-6xl">
        Cette page n&apos;existe pas
      </h1>
      <Link
        href="/"
        className="rounded-full bg-castel-red px-8 py-3 font-semibold text-white transition hover:bg-castel-red-deep"
      >
        Retour à l&apos;accueil
      </Link>
    </main>
  );
}
