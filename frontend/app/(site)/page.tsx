import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL, games } from "@/data/games";
import { coreServices } from "@/data/local-seo";
import { showcaseProjects, type ProjectKind } from "@/data/showcase";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import { Button } from "@/components/site/Button";
import { GameCard } from "@/components/site/GameCard";
import { Reveal } from "@/components/site/Reveal";
import { Hero } from "@/components/site/home/Hero";

export const metadata: Metadata = {
  title: { absolute: "Studio Castel, création de sites, apps et jeux à Avignon" },
  description:
    "Studio indépendant à Avignon (Vaucluse) : création de sites internet, développement d'applications web et mobiles et de jeux vidéo, de A à Z. Pour Avignon, le Vaucluse et toute la région PACA.",
  alternates: { canonical: "/" },
};

const kindLabel: Record<ProjectKind, string> = { app: "App", client: "Site", guide: "Guide" };

const h2 = "font-display text-4xl font-bold sm:text-6xl lg:text-7xl";

export default function HomePage() {
  const featured = showcaseProjects.find((p) => p.featured);
  const others = showcaseProjects.filter((p) => !p.featured);

  return (
    <>
      <Hero />

      <section id="jeux" className="bg-castel-ink px-5 pb-20 pt-24 sm:px-8 sm:pb-28 sm:pt-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <h2 className={`${h2} mb-12 text-white`}>Nos jeux</h2>
          </Reveal>
          <div className="flex flex-col gap-8 sm:gap-10">
            {games.map((g) => (
              <Reveal key={g.slug}>
                <GameCard game={g} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {featured && (
        <section className="bg-castel-red px-5 py-20 text-castel-ink sm:px-8 sm:py-28">
          <Reveal className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="inline-block rounded-full bg-castel-ink px-4 py-1.5 text-sm font-medium text-white">App</span>
              <h2 className={`${h2} mt-5 text-white`}>{featured.title}</h2>
              <p className="mt-5 max-w-md text-lg font-medium">{featured.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                {featured.url && <Button href={featured.url} external variant="ink">Voir {featured.title}</Button>}
                <Button href={`/projets/${featured.id}`} variant="white">En savoir plus</Button>
              </div>
            </div>
            <ProjectVisual project={featured} sizes="(min-width: 1024px) 600px, 100vw" className="rounded-card bg-castel-ink" />
          </Reveal>
        </section>
      )}

      <section id="projets" className="bg-castel-paper-warm px-5 py-20 text-castel-ink sm:px-8 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <h2 className={h2}>Apps et sites</h2>
            <Link href="/projets" className="font-medium text-castel-red-deep underline underline-offset-4 hover:no-underline">
              Tous les projets
            </Link>
          </Reveal>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((p) => (
              <li key={p.id}>
                <Link
                  href={`/projets/${p.id}`}
                  className="group flex h-full flex-col overflow-hidden rounded-card bg-white transition-transform duration-200 hover:-translate-y-1.5"
                >
                  <ProjectVisual project={p} sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" className="bg-castel-paper-warm" />
                  <div className="flex flex-1 flex-col gap-2 p-6">
                    <span className="w-fit rounded-full bg-castel-ink px-3 py-1 text-xs font-medium text-white">{kindLabel[p.kind]}</span>
                    <h3 className="font-display text-2xl font-bold">{p.title}</h3>
                    <p className="text-[#52525B]">{p.description}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="studio" className="bg-castel-paper-warm px-5 py-20 text-castel-ink sm:px-8 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <h2 className={h2}>Un studio, une personne.</h2>
            <div className="mt-10 max-w-2xl space-y-5 text-lg text-[#52525B]">
              <p>
                Studio Castel est un studio indépendant installé à Avignon, qui travaille pour des clients du Vaucluse et
                de toute la région PACA.
              </p>
              <p>Des jeux, des apps et des sites, faits de A à Z par une seule personne : l&apos;idée, le design, le code.</p>
              <p>Pas d&apos;intermédiaire : la personne à qui tu écris est celle qui fabrique.</p>
            </div>
          </Reveal>
          <ul className="mt-14 grid gap-6 md:grid-cols-3">
            {coreServices.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/${s.slug}`}
                  className="flex h-full flex-col gap-3 rounded-card bg-white p-7 transition-transform duration-200 hover:-translate-y-1.5"
                >
                  <h3 className="font-display text-2xl font-bold">{s.h1}</h3>
                  <p className="text-[#52525B]">{s.teaser}</p>
                  <span className="mt-auto pt-2 font-medium text-castel-red-deep underline underline-offset-4">En savoir plus</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8">
            <Link href="/developpeur-web-avignon" className="font-medium text-castel-red-deep underline underline-offset-4 hover:no-underline">
              Développeur web à Avignon : comment je travaille
            </Link>
          </p>
        </div>
      </section>

      <section id="contact" className="bg-castel-red px-5 py-20 text-castel-ink sm:px-8 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <h2 className={`${h2} text-white`}>On discute ?</h2>
            <p className="mt-6 max-w-xl text-lg font-medium">
              Une question sur un jeu, un projet d&apos;app ou de site : écris-moi.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-4 inline-block break-all text-lg font-semibold underline underline-offset-4 hover:no-underline"
            >
              {CONTACT_EMAIL}
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
