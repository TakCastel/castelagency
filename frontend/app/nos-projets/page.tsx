import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Mes projets",
  description:
    "Sites vitrines et refontes réalisés par Studio Castel à Avignon : Florine Clap (Next.js, Directus), Arnaud Ban (Next.js).",
  openGraph: {
    title: "Mes projets | Studio Castel",
    description: "Sites vitrines et refontes réalisés par Studio Castel à Avignon.",
    type: "website",
    locale: "fr_FR",
  },
  alternates: {
    canonical: "/nos-projets",
  },
};

const projets = [
  {
    slug: "florine-clap",
    title: "Florine Clap",
    subtitle: "Réalisatrice & artiste, Avignon",
    url: "https://www.florineclap.com/",
    description:
      "Refonte complète du site : navigation claire (Films, Médiations, Vidéos/art, Actualités, Bio), design sobre, expérience fluide. Développé en Next.js (SSR) avec Directus pour la gestion des contenus.",
    stack: ["Next.js", "Directus"],
    image: "/realisations/florine-clap.png",
  },
  {
    slug: "arnaud-ban",
    title: "Arnaud Ban",
    subtitle: "Réalisateur & monteur vidéo, Avignon",
    url: "https://arnaudban.fr/",
    description:
      "Portfolio en Next.js (SSR) : navigation fluide, mise en avant des films et de la démarche du réalisateur. Performant, SEO optimisé et évolutif.",
    stack: ["Next.js"],
    image: "/realisations/arnaud-ban.png",
  },
] as const;

export default function NosProjetsPage() {
  return (
    <main className="container py-16">
      <header className="mb-12">
        <p className="text-sm font-medium text-muted-foreground">
          Portfolio
        </p>
        <h1 className="mt-2 text-balance text-titre-moyen font-semibold tracking-tight">
          Mes projets
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground text-pretty">
          Quelques sites vitrines et refontes que j'ai réalisés à Avignon
          et en Vaucluse.
        </p>
      </header>

      <Separator className="mb-12" />

      <ul className="mx-auto flex max-w-3xl flex-col gap-16">
        {projets.map((r) => (
          <li key={r.slug} id={r.slug}>
            <article className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <h2 className="text-titre-petit font-semibold tracking-tight">
                  {r.title}
                </h2>
                <p className="text-sm text-muted-foreground">{r.subtitle}</p>
              </div>

              {/* Capture d’écran : déposez l’image dans public/realisations/ (ex. florine-clap.png, arnaud-ban.png) */}
              <figure className="overflow-hidden rounded-lg border bg-muted">
                <div className="relative aspect-video w-full">
                  <Image
                    src={r.image}
                    alt={`Capture du site ${r.title}`}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 48rem"
                  />
                </div>
                <figcaption className="sr-only">
                  Capture d’écran du site {r.title}
                </figcaption>
              </figure>

              <p className="text-muted-foreground text-pretty">{r.description}</p>

              <div className="flex flex-wrap items-center gap-3">
                <Button asChild size="sm">
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Voir le site
                  </a>
                </Button>
                <span className="text-sm text-muted-foreground">
                  {r.stack.join(" · ")}
                </span>
              </div>
            </article>
          </li>
        ))}
      </ul>

      <Separator className="mt-16 mb-12" />

      <p className="text-center text-muted-foreground">
        <Link href="/services/site-vitrine" className="text-primary underline-offset-4 hover:underline">
          Découvrir mon offre site vitrine
        </Link>
      </p>
    </main>
  );
}
