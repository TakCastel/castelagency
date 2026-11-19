import type { Metadata } from "next";

import { ContactForm } from "@/components/site/ContactForm";
import { ContactIntro } from "@/components/site/ContactIntro";
import { socialMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Écrire à Studio Castel, studio indépendant à Avignon : un projet de jeu, d'app ou de site, une question sur un jeu. Réponse sous 48 h.",
  alternates: { canonical: "/contact" },
  ...socialMeta({
    title: "Contact | Studio Castel",
    description:
      "Écrire à Studio Castel, studio indépendant à Avignon : un projet de jeu, d'app ou de site, une question sur un jeu. Réponse sous 48 h.",
    path: "/contact",
  }),
};

export default function ContactPage() {
  return (
    <div className="bg-castel-red font-sans text-castel-ink">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-24 pt-32 sm:px-8 sm:pt-40 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <ContactIntro as="h1" />
        <ContactForm />
      </div>
    </div>
  );
}
