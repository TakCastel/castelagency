import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { CoverVideo } from "@/components/projects/CoverVideo";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { clean, KIND_LABEL } from "@/components/projects/text";
import { Button } from "@/components/site/Button";
import { getShowcaseProject, showcaseProjects } from "@/data/showcase";
import { JsonLd, projectJsonLd } from "@/lib/jsonld";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return showcaseProjects.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getShowcaseProject(slug);
  if (!p) return {};
  const description = clean(p.description);
  return {
    title: p.title,
    description,
    alternates: { canonical: `/projets/${p.id}` },
    openGraph: { title: p.title, description, type: "website", images: [{ url: p.image, alt: p.imageAlt }] },
    twitter: { card: "summary_large_image", title: p.title, description, images: [p.image] },
  };
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="grid gap-4 border-t-4 border-castel-ink pt-8 md:grid-cols-[220px_1fr] md:gap-12">
      <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-[-0.02em]">{title}</h2>
      <div className="max-w-[65ch] space-y-4 text-lg leading-relaxed">{children}</div>
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-3 pl-5 marker:text-castel-red-deep">
      {items.map((t) => (
        <li key={t}>{clean(t)}</li>
      ))}
    </ul>
  );
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = getShowcaseProject(slug);
  if (!p) notFound();

  const others = showcaseProjects.filter((x) => x.id !== p.id).slice(0, 3);
  const internal = p.url?.startsWith("/");
  const cta = p.urlCtaLabel ?? (p.isMobileApp ? "Voir l'app" : "Voir le site");
  const hasResult = p.accomplishments.length > 0 || !!p.resultsSummary;
  const hasProject = !!p.useCase || !!p.objective;

  return (
    <div className="bg-castel-ink font-sans text-white">
      <JsonLd data={projectJsonLd(p, clean(p.description))} />
      <section
        className="px-4 pt-28 sm:px-8 sm:pt-32"
        style={p.isMobileApp ? undefined : { background: "linear-gradient(to bottom, #16161A 0 50%, #09090B 50% 100%)" }}
      >
        <div className="mx-auto max-w-5xl">
          {p.isMobileApp ? (
            <div className="flex justify-center rounded-card bg-castel-surface px-6 py-10 shadow-card">
              <div className="relative aspect-[9/19] w-full max-w-[260px] overflow-hidden rounded-[40px] border-[10px] border-castel-ink bg-castel-ink">
                <Image src={p.image} alt={p.imageAlt} fill priority sizes="260px" className="object-cover object-top" />
              </div>
            </div>
          ) : (
            <div className="overflow-hidden rounded-card shadow-card">
              {p.coverVideo ? (
                <CoverVideo src={p.coverVideo} poster={p.image} alt={p.imageAlt} />
              ) : (
                <div className="relative aspect-[16/9] w-full bg-castel-surface">
                  <Image
                    src={p.image}
                    alt={p.imageAlt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 1024px, 92vw"
                    className="object-cover object-top"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="px-4 pb-20 pt-12 sm:px-8 sm:pb-28 sm:pt-16">
        <div className="mx-auto max-w-5xl">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.08em] text-[#A1A1AA]">
            {KIND_LABEL[p.kind]}
          </p>
          <h1 className="font-display text-[44px] font-bold leading-[1.05] tracking-[-0.02em] sm:text-7xl lg:text-[88px]">
            {p.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white sm:text-xl">{clean(p.description)}</p>
          {p.url && (
            <div className="mt-8">
              <Button href={p.url} variant="red" external={!internal}>
                {cta}
              </Button>
            </div>
          )}
        </div>
      </section>

      {(hasProject || p.whatIDid.length > 0 || p.howIWorked.length > 0 || hasResult || p.technologies.length > 0 || p.testimonial) && (
        <section className="bg-castel-paper-warm px-4 py-16 text-castel-ink sm:px-8 sm:py-24">
          <div className="mx-auto max-w-5xl space-y-14">
            {hasProject && (
              <Block title="Le projet">
                {p.useCase && <p>{clean(p.useCase)}</p>}
                {p.objective && <p>{clean(p.objective)}</p>}
              </Block>
            )}
            {p.whatIDid.length > 0 && (
              <Block title="Ce que j'ai fait">
                <List items={p.whatIDid} />
              </Block>
            )}
            {p.howIWorked.length > 0 && (
              <Block title="Méthode">
                <List items={p.howIWorked} />
              </Block>
            )}
            {hasResult && (
              <Block title="Résultat">
                {p.resultsSummary && <p>{clean(p.resultsSummary)}</p>}
                {p.accomplishments.length > 0 && <List items={p.accomplishments} />}
              </Block>
            )}
            {p.technologies.length > 0 && (
              <Block title="Technologies">
                <ul className="flex list-none flex-wrap gap-2 p-0">
                  {p.technologies.map((t) => (
                    <li key={t} className="rounded-full bg-castel-ink px-4 py-1.5 text-sm font-medium text-white">
                      {t}
                    </li>
                  ))}
                </ul>
              </Block>
            )}
            {p.testimonial && (
              <figure className="rounded-card bg-castel-ink p-8 text-white sm:p-10">
                <blockquote className="font-display text-2xl font-semibold leading-snug tracking-[-0.02em] sm:text-3xl">
                  {clean(p.testimonial.quote)}
                </blockquote>
                <figcaption className="mt-4 text-sm text-[#A1A1AA]">
                  {p.testimonial.author}
                  {p.testimonial.role ? `, ${p.testimonial.role}` : ""}
                </figcaption>
              </figure>
            )}
          </div>
        </section>
      )}

      <section className="px-4 py-16 sm:px-8 sm:py-24" aria-labelledby="autres-projets">
        <div className="mx-auto max-w-6xl">
          <h2 id="autres-projets" className="mb-10 font-display text-4xl font-bold leading-[1.1] tracking-[-0.02em] sm:text-6xl">
            Les autres projets
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {others.map((o) => (
              <ProjectCard key={o.id} project={o} />
            ))}
          </div>
          <div className="mt-16 flex flex-col items-start gap-4 rounded-card bg-castel-surface p-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-display text-2xl font-bold tracking-[-0.02em]">Le studio fait aussi des jeux.</p>
            <Button href="/#jeux" variant="red">
              Voir les jeux
            </Button>
          </div>
          <p className="mt-8 text-sm text-[#A1A1AA]">
            <Link href="/projets" className="underline underline-offset-4 hover:text-white">
              Tous les projets
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
