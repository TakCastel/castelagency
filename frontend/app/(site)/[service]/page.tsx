/**
 * Pages de services pour le référencement local (Avignon, Vaucluse, PACA).
 * Contenu dans data/local-seo.ts. Seuls les slugs listés existent : tout le reste est en 404.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProjectCard } from "@/components/projects/ProjectCard";
import { Button } from "@/components/site/Button";
import { GameCardCompact } from "@/components/site/GameCardCompact";
import { games } from "@/data/games";
import { BUSINESS, getServicePage, NEARBY_CITIES, REGION_CITIES, servicePages } from "@/data/local-seo";
import { showcaseProjects } from "@/data/showcase";
import { breadcrumbJsonLd, faqJsonLd, JsonLd, serviceJsonLd } from "@/lib/jsonld";
import { socialMeta } from "@/lib/seo";

type Params = { service: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return servicePages.map((s) => ({ service: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { service } = await params;
  const page = getServicePage(service);
  if (!page) return {};
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: `/${page.slug}` },
    ...socialMeta({ title: page.metaTitle, description: page.metaDescription, path: `/${page.slug}` }),
  };
}

const h2 = "font-display text-3xl font-bold leading-[1.1] tracking-[-0.02em] sm:text-5xl";

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { service } = await params;
  const page = getServicePage(service);
  if (!page) notFound();

  const projects = page.projectIds
    .map((id) => showcaseProjects.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => !!p);
  const pageGames = page.gameSlugs
    .map((slug) => games.find((g) => g.slug === slug))
    .filter((g): g is NonNullable<typeof g> => !!g);
  const otherServices = servicePages.filter((s) => s.slug !== page.slug);
  const mailto = `mailto:${BUSINESS.email}?subject=${encodeURIComponent(`Projet : ${page.label}`)}`;

  return (
    <div className="bg-castel-ink font-sans text-white">
      <JsonLd
        data={[
          serviceJsonLd(page),
          faqJsonLd(page.faq),
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: page.h1, path: `/${page.slug}` },
          ]),
        ]}
      />

      <section className="px-4 pb-16 pt-32 sm:px-8 sm:pb-24 sm:pt-40">
        <div className="mx-auto max-w-5xl">
          <nav aria-label="Fil d'Ariane" className="mb-8 text-sm text-[#A1A1AA]">
            <Link href="/" className="underline-offset-4 hover:text-white hover:underline">
              Accueil
            </Link>
            <span aria-hidden="true"> / </span>
            <span className="text-white">{page.h1}</span>
          </nav>
          <span className="inline-block rounded-full bg-castel-red px-4 py-1.5 text-sm font-medium text-castel-ink">
            {page.eyebrow}
          </span>
          <h1 className="mt-6 font-display text-[44px] font-bold leading-[1.05] tracking-[-0.02em] sm:text-7xl lg:text-[88px]">
            {page.h1}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white sm:text-xl">{page.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={mailto} external variant="red">
              Parlons de ton projet
            </Button>
            <Button href="/projets" variant="white">
              Voir les projets
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-castel-paper-warm px-4 py-16 text-castel-ink sm:px-8 sm:py-24">
        <div className="mx-auto max-w-5xl space-y-14">
          {page.sections.map((s) => (
            <section key={s.title} className="grid gap-4 border-t-4 border-castel-ink pt-8 md:grid-cols-[260px_1fr] md:gap-12">
              <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-[-0.02em]">{s.title}</h2>
              <div className="max-w-[65ch] space-y-4 text-lg leading-relaxed">
                {s.paragraphs?.map((p) => <p key={p}>{p}</p>)}
                {s.items && (
                  <ul className="list-disc space-y-3 pl-5 marker:text-castel-red-deep">
                    {s.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}

          <section className="grid gap-4 border-t-4 border-castel-ink pt-8 md:grid-cols-[260px_1fr] md:gap-12">
            <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-[-0.02em]">Où je travaille</h2>
            <div className="max-w-[65ch] space-y-4 text-lg leading-relaxed">
              <p>
                Le studio est au {BUSINESS.street}, à {BUSINESS.city}. J&apos;accompagne des clients dans tout le{" "}
                {BUSINESS.department} et le Grand Avignon :
              </p>
              <ul className="flex flex-wrap gap-2">
                {NEARBY_CITIES.map((c) => (
                  <li key={c} className="rounded-full bg-castel-ink px-4 py-1.5 text-sm font-medium text-white">
                    {c}
                  </li>
                ))}
              </ul>
              <p>
                Et plus largement en région {BUSINESS.region} et dans le Gard voisin : {REGION_CITIES.join(", ")}. Le
                reste de la France aussi, à distance.
              </p>
            </div>
          </section>
        </div>
      </section>

      {(projects.length > 0 || pageGames.length > 0) && (
        <section className="px-4 py-16 sm:px-8 sm:py-24" aria-labelledby="exemples">
          <div className="mx-auto max-w-6xl">
            <h2 id="exemples" className={`${h2} mb-10`}>
              {pageGames.length > 0 ? "Les jeux du studio" : "Quelques projets"}
            </h2>
            {projects.length > 0 && (
              <div className="grid gap-8 md:grid-cols-3">
                {projects.map((p) => (
                  <ProjectCard key={p.id} project={p} />
                ))}
              </div>
            )}
            {pageGames.length > 0 && (
              <div className="grid gap-6 sm:grid-cols-2">
                {pageGames.map((g) => (
                  <GameCardCompact key={g.slug} game={g} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <section className="bg-castel-paper-warm px-4 py-16 text-castel-ink sm:px-8 sm:py-24" aria-labelledby="faq">
        <div className="mx-auto max-w-5xl">
          <h2 id="faq" className={`${h2} mb-10`}>
            Questions fréquentes
          </h2>
          <div className="divide-y-2 divide-castel-ink/15 border-y-2 border-castel-ink/15">
            {page.faq.map((it) => (
              <details key={it.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-display text-xl font-bold [&::-webkit-details-marker]:hidden">
                  <h3>{it.q}</h3>
                  <span aria-hidden="true" className="mt-1 text-castel-red-deep transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-[65ch] text-lg leading-relaxed text-[#52525B]">{it.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-8 sm:py-24" aria-labelledby="autres-services">
        <div className="mx-auto max-w-6xl">
          <h2 id="autres-services" className={`${h2} mb-10`}>
            Aussi au studio
          </h2>
          <ul className="grid gap-6 md:grid-cols-3">
            {otherServices.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/${s.slug}`}
                  className="flex h-full flex-col gap-3 rounded-card bg-castel-surface p-7 transition-transform duration-200 hover:-translate-y-1.5"
                >
                  <span className="font-display text-2xl font-bold">{s.h1}</span>
                  <span className="text-[#A1A1AA]">{s.teaser}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-16 rounded-card bg-castel-red p-8 text-castel-ink sm:p-12">
            <p className="font-display text-3xl font-bold tracking-[-0.02em] text-white sm:text-5xl">On discute ?</p>
            <p className="mt-4 max-w-xl text-lg font-medium">
              Un projet à Avignon, dans le Vaucluse ou ailleurs : écris-moi ou appelle-moi, le premier échange est gratuit.
            </p>
            <div className="mt-6 flex flex-col gap-2 text-lg font-semibold">
              <a href={mailto} className="w-fit break-all underline underline-offset-4 hover:no-underline">
                {BUSINESS.email}
              </a>
              <a href={`tel:${BUSINESS.phone}`} className="w-fit underline underline-offset-4 hover:no-underline">
                {BUSINESS.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
