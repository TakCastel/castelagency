import Image from "next/image";

import { BLUR_DATA_URL } from "@/lib/image-placeholder";

export type HeroCardPageLayoutProps = {
  /** URL de l'image de fond du hero (visible derrière le header transparent) */
  imageSrc: string;
  children: React.ReactNode;
};

/**
 * Layout pour les pages services et articles de blog : hero en haut (comme l'accueil),
 * image en haut puis dégradé progressif vers le fond (noir/blanc), contenu remonté sur l'image.
 * Hero en z-0 pour rester derrière le header (z-[10000]) et le contenu (z-10).
 */
export function HeroCardPageLayout({ imageSrc, children }: HeroCardPageLayoutProps) {
  return (
    <>
      {/* Même comportement que l'accueil : image qui remonte derrière le header (-mt-40 md:-mt-48) */}
      <section
        className="relative z-0 -mt-40 w-full overflow-hidden md:-mt-48"
        style={{ minHeight: "100svh" }}
        aria-hidden
      >
        <div className="pointer-events-none absolute inset-0 -z-10">
          <Image
            src={imageSrc}
            alt=""
            fill
            className="object-cover object-center opacity-45 blur-xs shadow-[0_0_100px_rgba(0,0,0,0.5)]"
            sizes="100vw"
            priority
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        </div>
      </section>

      <main className="relative z-10 -mt-[85vh]">{children}</main>
    </>
  );
}
