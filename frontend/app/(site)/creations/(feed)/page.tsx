import type { Metadata } from "next";

import { creationMetadata, sectionByFilter } from "@/data/creations";
import { SectionIntro } from "./SectionIntro";

const section = sectionByFilter("all");

export const metadata: Metadata = creationMetadata(section);

export default function CreationsPage() {
  return <SectionIntro section={section} />;
}
