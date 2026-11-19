import type { ReactNode } from "react";

type Props = {
  label: string;
  title: string;
  intro: string;
  children: ReactNode;
};

/** Mise en page des pages légales : fond blanc cassé, titre Poppins, texte Inter à 70ch maximum. */
export function LegalPage({ label, title, intro, children }: Props) {
  return (
    <div className="bg-castel-paper-warm font-sans text-castel-ink">
      <div className="mx-auto max-w-[70ch] px-4 pb-24 pt-32 sm:px-8 sm:pt-40">
        <p className="text-xs font-medium uppercase tracking-[0.08em] text-[#52525B]">{label}</p>
        <h1 className="mt-3 font-display text-4xl font-bold leading-[1.1] tracking-[-0.02em] sm:text-6xl">{title}</h1>
        <p className="mt-6 text-lg leading-relaxed text-[#52525B]">{intro}</p>
        <div className="mt-12 space-y-10">{children}</div>
      </div>
    </div>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-2xl font-semibold leading-[1.15] tracking-[-0.02em]">{title}</h2>
      <div className="mt-3 space-y-3 text-base leading-relaxed text-castel-ink">{children}</div>
    </section>
  );
}
