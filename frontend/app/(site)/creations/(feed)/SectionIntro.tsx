import { books } from "@/data/books";
import { creationPath, type CreationSection } from "@/data/creations";
import { drawings } from "@/data/drawings";
import { tracks } from "@/data/music";
import { creationsJsonLd, JsonLd } from "@/lib/jsonld";

/** Titre, texte et données structurées d'une vue de /creations (rendus côté serveur pour l'indexation). */
export function SectionIntro({ section }: { section: CreationSection }) {
  const f = section.filter;
  return (
    <>
      <JsonLd
        data={creationsJsonLd({
          path: creationPath(section),
          name: section.metaTitle,
          description: section.description,
          tracks: f === "all" || f === "music" ? tracks : [],
          drawings: f === "all" || f === "drawing" ? drawings : [],
          books: f === "all" || f === "book" ? books : [],
        })}
      />
      <h1 className="font-display text-[44px] font-bold leading-[1.05] tracking-[-0.02em] sm:text-7xl lg:text-[88px]">
        {section.heading}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed">{section.intro}</p>
    </>
  );
}
