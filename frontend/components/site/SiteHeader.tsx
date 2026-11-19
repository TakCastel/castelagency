"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { Gamepad2, LayoutGrid } from "lucide-react";
import { Logo } from "./Logo";

const iconCls = "h-[18px] w-[18px]";

const GamepadIcon = <Gamepad2 className={iconCls} strokeWidth={2} aria-hidden="true" />;

const GridIcon = <LayoutGrid className={iconCls} strokeWidth={2} aria-hidden="true" />;

const WrenchIcon = (
  <svg viewBox="0 0 24 24" className={iconCls} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

const navLinks: { href: string; label: string; icon: ReactNode; match: string }[] = [
  { href: "/#jeux", label: "Jeux", icon: GamepadIcon, match: "/jeux" },
  { href: "/projets", label: "Projets", icon: GridIcon, match: "/projets" },
  { href: "/developpeur-web-avignon", label: "Services", icon: WrenchIcon, match: "/developpeur-web-avignon" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  // Sur l'accueil, "Jeux" est une ancre : il devient actif quand la section #jeux occupe l'écran.
  const [gamesInView, setGamesInView] = useState(false);
  useEffect(() => {
    if (!isHome) return setGamesInView(false);
    const el = document.getElementById("jeux");
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setGamesInView(e.isIntersecting), {
      rootMargin: "-45% 0px -45% 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, [isHome]);

  const solid = !isHome || scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${solid ? "bg-castel-ink" : "bg-transparent"}`}
    >
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-castel-ink"
      >
        Aller au contenu
      </a>
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-5 sm:px-8">
        <nav aria-label="Navigation principale" className="hidden items-center gap-7 md:flex">
          {navLinks.map((l) => {
            const active = pathname.startsWith(l.match) || (l.match === "/jeux" && gamesInView);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`relative flex items-center gap-2 font-medium transition-colors hover:text-white ${active ? "text-white" : "text-white/65"}`}
              >
                {l.icon}
                {l.label}
                {active && <span className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-white" />}
              </Link>
            );
          })}
        </nav>
        <span className="md:hidden" />

        <Link href="/" className="flex items-center justify-center" aria-label="Studio Castel, accueil">
          <Logo size={40} />
          <span className="sr-only">Studio Castel</span>
        </Link>

        <div className="hidden items-center justify-end gap-6 md:flex">
          <Link href="/contact" className="font-medium text-white/65 transition-colors hover:text-white">
            Contact
          </Link>
          <Link
            href="/#jeux"
            className="rounded-full bg-castel-red px-5 py-2 font-display text-sm font-semibold text-castel-ink transition-colors duration-200 hover:bg-castel-red-deep hover:text-white"
          >
            Jouer
          </Link>
        </div>

        <div className="flex justify-end md:hidden">
          <button
            type="button"
            className="flex h-11 items-center rounded-full px-3 font-medium text-white"
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "Fermer" : "Menu"}
          </button>
        </div>
      </div>

      {open && (
        <nav id="menu-mobile" aria-label="Navigation mobile" className="flex flex-col gap-1 px-5 pb-6 md:hidden">
          {[...navLinks.map((l) => ({ href: l.href, label: l.label })), { href: "/contact", label: "Contact" }].map((l) => (
            <Link key={l.href} href={l.href} className="py-3 font-display text-3xl font-bold text-white" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link
            href="/#jeux"
            onClick={() => setOpen(false)}
            className="mt-3 w-fit rounded-full bg-castel-red px-6 py-3 font-display text-base font-semibold text-castel-ink"
          >
            Jouer
          </Link>
        </nav>
      )}
    </header>
  );
}
