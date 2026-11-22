import Link from "next/link";
import { CookieSettingsButton } from "./CookieSettingsButton";
import { CONTACT_EMAIL, games } from "@/data/games";
import { BUSINESS, servicePages } from "@/data/local-seo";
import { Logo } from "./Logo";

const linkCls = "text-[#A1A1AA] hover:text-white hover:underline underline-offset-4";

export function SiteFooter() {
  const stores = games.flatMap((g) => g.links.map((l) => ({ ...l, game: g.name })));
  return (
    <footer className="bg-castel-ink px-5 py-14 text-white sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[minmax(0,17rem)_repeat(4,auto)] xl:justify-between xl:gap-x-12">
        <div className="flex flex-col gap-4 lg:max-w-xs">
          <Link href="/" className="flex items-center gap-1" aria-label="Studio Castel, accueil">
            <Logo size={40} />
            <span className="font-brand text-lg font-extrabold italic tracking-[-0.01em]">Studio Castel</span>
          </Link>
          <p className="text-[#A1A1AA]">Studio indépendant à Avignon. Jeux, apps et sites pour le Vaucluse et la région PACA.</p>
          <address className="not-italic text-[#A1A1AA]">
            {BUSINESS.street}
            <br />
            {BUSINESS.postalCode} {BUSINESS.city}
            <br />
            <a href={`tel:${BUSINESS.phone}`} className={linkCls}>{BUSINESS.phoneDisplay}</a>
          </address>
        </div>

        <div>
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.08em] text-[#A1A1AA]">Services</h2>
          <ul className="flex flex-col gap-2.5 xl:whitespace-nowrap">
            {servicePages.map((s) => (
              <li key={s.slug}>
                <Link href={`/${s.slug}`} className={linkCls}>{s.h1}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.08em] text-[#A1A1AA]">Jeux</h2>
          <ul className="flex flex-col gap-2.5 xl:whitespace-nowrap">
            {games.filter((g) => g.status === "available").map((g) => (
              <li key={g.slug}>
                <Link href={`/jeux/${g.slug}`} className={linkCls}>{g.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.08em] text-[#A1A1AA]">Jouer</h2>
          <ul className="flex flex-col gap-2.5 xl:whitespace-nowrap">
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
          <ul className="flex flex-col gap-2.5 xl:whitespace-nowrap">
            <li><Link href="/projets" className={linkCls}>Projets</Link></li>
            <li><Link href="/creations" className={linkCls}>Créations</Link></li>
            <li><a href={`mailto:${CONTACT_EMAIL}`} className={linkCls}>{CONTACT_EMAIL}</a></li>
            <li><Link href="/mentions-legales" className={linkCls}>Mentions légales</Link></li>
            <li><Link href="/politique-de-confidentialite" className={linkCls}>Confidentialité</Link></li>
            <li><CookieSettingsButton className={`${linkCls} text-left`} /></li>
          </ul>
        </div>
      </div>
      <p className="mx-auto mt-14 max-w-7xl border-t border-white/10 pt-6 text-sm text-[#A1A1AA]">© {new Date().getFullYear()} Studio Castel</p>
    </footer>
  );
}
