import Link from "next/link";
import { CookieSettingsButton } from "./CookieSettingsButton";
import { CONTACT_EMAIL, games } from "@/data/games";
import { Logo } from "./Logo";

const linkCls = "text-[#A1A1AA] hover:text-white hover:underline underline-offset-4";

export function SiteFooter() {
  const stores = games.flatMap((g) => g.links.map((l) => ({ ...l, game: g.name })));
  return (
    <footer className="bg-castel-ink px-5 py-14 text-white sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-3" aria-label="Studio Castel, accueil">
            <Logo size={40} />
            <span className="font-display text-xl font-bold tracking-tight">Studio Castel</span>
          </Link>
          <p className="text-[#A1A1AA]">Studio indépendant à Avignon. Jeux, apps et sites.</p>
        </div>

        <div>
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.08em] text-[#A1A1AA]">Jeux</h2>
          <ul className="flex flex-col gap-2">
            {games.filter((g) => g.status === "available").map((g) => (
              <li key={g.slug}>
                <Link href={`/jeux/${g.slug}`} className={linkCls}>{g.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.08em] text-[#A1A1AA]">Jouer</h2>
          <ul className="flex flex-col gap-2">
            {stores.map((l) => (
              <li key={l.href}>
                <a href={l.href} target="_blank" rel="noopener noreferrer" className={linkCls}>
                  {l.game}, {l.kind === "store" ? "Google Play" : l.kind === "play" ? "navigateur" : "télécharger"}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.08em] text-[#A1A1AA]">Studio</h2>
          <ul className="flex flex-col gap-2">
            <li><Link href="/projets" className={linkCls}>Projets</Link></li>
            <li><Link href="/creations" className={linkCls}>Écrits et dessins</Link></li>
            <li><a href={`mailto:${CONTACT_EMAIL}`} className={linkCls}>{CONTACT_EMAIL}</a></li>
            <li><Link href="/mentions-legales" className={linkCls}>Mentions légales</Link></li>
            <li><Link href="/politique-de-confidentialite" className={linkCls}>Confidentialité</Link></li>
            <li><CookieSettingsButton className={`${linkCls} text-left`} /></li>
          </ul>
        </div>
      </div>
      <p className="mx-auto mt-12 max-w-7xl text-sm text-[#A1A1AA]">© {new Date().getFullYear()} Studio Castel</p>
    </footer>
  );
}
