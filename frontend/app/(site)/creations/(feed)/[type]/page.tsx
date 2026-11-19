import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { creationMetadata, creationSections } from "@/data/creations";
import { SectionIntro } from "../SectionIntro";

/** /creations/musiques, /creations/dessins, /creations/ecrits : générées au build, toute autre URL → 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return creationSections.filter((s) => s.slug).map((s) => ({ type: s.slug }));
}

const find = (slug: string) => creationSections.find((s) => s.slug && s.slug === slug);

export async function generateMetadata({ params }: { params: Promise<{ type: string }> }): Promise<Metadata> {
  const section = find((await params).type);
  return section ? creationMetadata(section) : {};
}

export default async function CreationsTypePage({ params }: { params: Promise<{ type: string }> }) {
  const section = find((await params).type);
  if (!section) notFound();
  return <SectionIntro section={section} />;
}
