import type { Metadata } from "next";

import { ContactForm } from "@/components/site/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Écrire à Studio Castel, studio indépendant à Avignon : un projet de jeu, d'app ou de site, une question sur un jeu. Réponse sous 48 h.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="bg-castel-red font-sans text-castel-ink">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-24 pt-32 sm:px-8 sm:pt-40 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <div>
          <h1 className="font-display text-[44px] font-bold leading-[1.05] tracking-[-0.02em] text-white sm:text-7xl lg:text-[88px]">
            On discute&nbsp;?
          </h1>
          <p className="mt-6 max-w-md text-lg font-medium leading-relaxed">
            Un jeu, une app, un site, ou juste une question sur un des jeux : dis-moi tout. Je lis chaque message
            et je réponds sous 48&nbsp;h ouvrées.
          </p>
          <p className="mt-6 max-w-md text-base leading-relaxed">
            Studio Castel est basé à Avignon. Je travaille avec des gens du Vaucluse comme de partout ailleurs, en
            visio.
          </p>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
