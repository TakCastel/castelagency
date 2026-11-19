import type { Metadata } from "next";
import Link from "next/link";

import { FeaturedProjectCard, ProjectCard } from "@/components/projects/ProjectCard";
import { showcaseProjects, type ProjectKind } from "@/data/showcase";
import { socialMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Les projets",
  description: "Les apps, les sites et le guide faits par Studio Castel, en plus des jeux.",
  alternates: { canonical: "/projets" },
  ...socialMeta({
    title: "Les projets | Studio Castel",
    description:
      "Les apps, les sites et le guide faits par Studio Castel, en plus des jeux.",
    path: "/projets",
  }),
};

const GROUPS: { kind: ProjectKind; title: string }[] = [
  { kind: "app", title: "Apps" },
  { kind: "client", title: "Sites" },
  { kind: "guide", title: "Guide" },
];

export default function ProjetsPage() {
  const featured = showcaseProjects.find((p) => p.featured);
  const rest = showcaseProjects.filter((p) => !p.featured);

  return (
    <div className="bg-castel-ink font-sans text-white">
      <div className="mx-auto max-w-6xl px-4 pb-24 pt-32 sm:px-8 sm:pt-40">
        <h1 className="font-display text-[44px] font-bold leading-[1.05] tracking-[-0.02em] sm:text-7xl lg:text-[88px]">
          Les projets
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white">
          Des apps et des sites conçus et développés de A à vignon. Les jeux ont leur propre page.{" "}
          <Link href="/#jeux" className="underline underline-offset-4 hover:text-castel-red">
            Voir les jeux
          </Link>
          .
        </p>

        {featured && (
          <div className="mt-14">
            <FeaturedProjectCard project={featured} />
          </div>
        )}

        {GROUPS.map(({ kind, title }) => {
          const items = rest.filter((p) => p.kind === kind);
          if (items.length === 0) return null;
          return (
            <section key={kind} className="mt-20" aria-labelledby={`g-${kind}`}>
              <h2 id={`g-${kind}`} className="mb-8 font-display text-4xl font-bold tracking-[-0.02em] sm:text-5xl">
                {title}
              </h2>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((p) => (
                  <ProjectCard key={p.id} project={p} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
