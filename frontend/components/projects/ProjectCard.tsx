import Link from "next/link";

import type { ShowcaseProject } from "@/data/showcase";
import { ProjectVisual } from "./ProjectVisual";
import { clean, KIND_LABEL } from "./text";

/** Visuel d'un projet dans une carte : les apps mobiles (portrait) sont contenues, le reste remplit. */
export function ProjectThumb({ project, sizes, priority }: { project: ShowcaseProject; sizes: string; priority?: boolean }) {
  return (
    <ProjectVisual
      project={project}
      sizes={sizes}
      priority={priority}
      className="bg-castel-surface"
      screenshotClassName={project.isMobileApp ? "object-contain p-4" : "object-cover object-top"}
    />
  );
}

export function ProjectCard({ project }: { project: ShowcaseProject }) {
  return (
    <Link
      href={`/projets/${project.id}`}
      className="group block h-full rounded-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
    >
      <article className="h-full overflow-hidden rounded-card bg-castel-surface shadow-card motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:-translate-y-1.5">
        <ProjectThumb project={project} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw" />
        <div className="space-y-2 p-6">
          <p className="text-xs font-medium uppercase tracking-[0.08em] text-[#A1A1AA]">{KIND_LABEL[project.kind]}</p>
          <h3 className="font-display text-2xl font-bold tracking-[-0.02em] text-white">{project.title}</h3>
          <p className="line-clamp-3 text-sm leading-relaxed text-[#A1A1AA]">{clean(project.description)}</p>
        </div>
      </article>
    </Link>
  );
}

export function FeaturedProjectCard({ project }: { project: ShowcaseProject }) {
  return (
    <Link
      href={`/projets/${project.id}`}
      className="group block rounded-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
    >
      <article className="grid overflow-hidden rounded-card bg-castel-surface shadow-card motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:-translate-y-1.5 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <ProjectThumb project={project} sizes="(min-width: 1024px) 60vw, 92vw" priority />
        </div>
        <div className="flex flex-col justify-center gap-4 p-8 lg:col-span-2 lg:p-10">
          <p className="w-fit rounded-chip bg-castel-red px-3 py-1 text-xs font-medium uppercase tracking-[0.08em] text-castel-ink">
            {KIND_LABEL[project.kind]}
          </p>
          <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-[-0.02em] text-white sm:text-5xl">
            {project.title}
          </h2>
          <p className="text-base leading-relaxed text-[#A1A1AA]">{clean(project.description)}</p>
        </div>
      </article>
    </Link>
  );
}
