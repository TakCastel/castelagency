const POINTS = [
  { big: "48 h", small: "pour te répondre, en semaine" },
  { big: "Avignon", small: "et partout ailleurs en visio" },
  { big: "De A à Z", small: "jeux, apps et sites, de l'idée à la mise en ligne" },
];

type Props = { as?: "h1" | "h2" };

/** Colonne de gauche du bloc contact : titre, accroche et trois repères. */
export function ContactIntro({ as: Title = "h2" }: Props) {
  return (
    <div className="flex h-full flex-col">
      <Title className="font-display text-[44px] font-bold leading-[1.05] tracking-[-0.02em] text-white sm:text-6xl lg:text-7xl">
        On discute&nbsp;?
      </Title>
      <p className="mt-6 max-w-md text-lg font-medium leading-relaxed text-castel-ink">
        Un jeu, une app, un site, ou juste une question sur un des jeux&nbsp;: dis-moi tout, je lis chaque message.
      </p>
      <ul className="mt-12 space-y-6 border-t-2 border-castel-ink/15 pt-8 lg:mt-auto">
        {POINTS.map((p) => (
          <li key={p.big} className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="font-display text-3xl font-bold tracking-[-0.02em] text-castel-ink sm:text-4xl">{p.big}</span>
            <span className="text-base text-castel-ink/70">{p.small}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
