"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal, flushSync } from "react-dom";

import { Button } from "@/components/ui/button";
import { BrandMark } from "@/components/BrandMark";
import { LaptopMinimalCheckIcon } from "@/components/ui/laptop-minimal-check";
import { LayoutPanelTopIcon } from "@/components/ui/layout-panel-top";
import { FolderKanbanIcon } from "@/components/ui/folder-kanban";
import { FeatherIcon } from "@/components/ui/feather";
import { SparklesIcon } from "@/components/ui/sparkles";
import { WrenchIcon } from "@/components/ui/wrench";
import type { LaptopMinimalCheckIconHandle } from "@/components/ui/laptop-minimal-check";
import type { LayoutPanelTopIconHandle } from "@/components/ui/layout-panel-top";
import type { FolderKanbanIconHandle } from "@/components/ui/folder-kanban";
import type { FeatherIconHandle } from "@/components/ui/feather";
import type { SparklesIconHandle } from "@/components/ui/sparkles";
import type { WrenchIconHandle } from "@/components/ui/wrench";
import { ThemeToggleButton } from "@/components/ThemeToggleButton";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/le-studio", label: "Studio", title: "Le Studio", Icon: LaptopMinimalCheckIcon },
  { href: "/services", label: "Services", title: "Mes services", Icon: WrenchIcon },
  { href: "/mes-projets", label: "Projets", title: "Projets", Icon: LayoutPanelTopIcon },
  { href: "/mode-de-fonctionnement", label: "Méthode", title: "Ma méthode", Icon: FolderKanbanIcon },
  { href: "/creations", label: "Créations", title: "Mes créations", Icon: SparklesIcon },
  { href: "/blog", label: "Blog", title: "Mon blog", Icon: FeatherIcon },
] as const;

const SCROLL_THRESHOLD = 1; // px de scroll vers le bas pour cacher le header (dès le début du scroll)
const TOP_THRESHOLD = 20;

const MENU_ANIM_DURATION_MS = 320;
const MENU_ITEM_STAGGER_MS = 80;
const HEADER_ENTRANCE_STAGGER_MS = 50; // délai entre chaque élément de la navbar à l’entrée

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuMounted, setMenuMounted] = useState(false); // true = overlay dans le DOM (pour animation de fermeture)
  const [headerVisible, setHeaderVisible] = useState(true);
  const [atTop, setAtTop] = useState(true); // true = tout en haut, pas de blur ni border
  const [headerWasHidden, setHeaderWasHidden] = useState(false); // true = on a déjà caché le header en scrollant vers le bas → réafficher avec border/blur au scroll up
  const lastScrollY = useRef(0);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openMenuTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setMenuMounted(true);
    // Petit délai pour que le navigateur peigne l’état « fermé » avant l’ouverture (animation visible)
    openMenuTimeoutRef.current = setTimeout(() => setMenuOpen(true), 20);
  }, []);

  const closeMenu = useCallback(() => {
    if (openMenuTimeoutRef.current) {
      clearTimeout(openMenuTimeoutRef.current);
      openMenuTimeoutRef.current = null;
    }
    // Déplacer le focus hors du menu avant aria-hidden pour éviter l’erreur a11y
    menuButtonRef.current?.focus();
    setMenuOpen(false);
    closeTimeoutRef.current = setTimeout(() => {
      setMenuMounted(false);
      closeTimeoutRef.current = null;
    }, MENU_ANIM_DURATION_MS);
  }, []);

  useEffect(() => {
    const getScrollY = () => {
      if (typeof window === "undefined" || typeof document === "undefined") return 0;
      const el = document.scrollingElement ?? document.documentElement;
      return window.scrollY ?? el.scrollTop ?? 0;
    };

    const showHeader = () => {
      setHeaderVisible(true);
      headerRef.current?.style.setProperty("transform", "translateY(0)");
    };

    const hideHeader = () => {
      setHeaderVisible(false);
      headerRef.current?.style.setProperty("transform", "translateY(-100%)");
    };

    const handleScroll = () => {
      const y = getScrollY();
      const prev = lastScrollY.current;
      const isDesktop = typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches;
      setAtTop(y <= TOP_THRESHOLD);
      if (y <= TOP_THRESHOLD) {
        setHeaderWasHidden(false);
        flushSync(showHeader);
      } else if (y < prev) {
        // Scroll vers le haut : réafficher immédiatement (DOM + state)
        flushSync(showHeader);
      } else if (isDesktop && y > prev + SCROLL_THRESHOLD) {
        // Cacher le header uniquement sur desktop au scroll vers le bas
        setHeaderWasHidden(true);
        hideHeader();
      }
      lastScrollY.current = y;
    };

    // Synchroniser l’état au montage (ex. page ouverte déjà scrollée)
    lastScrollY.current = getScrollY();
    queueMicrotask(() => handleScroll());

    const onScroll = () => {
      handleScroll();
    };

    // Détection immédiate du scroll vers le haut (roue / trackpad) pour réafficher le header tout de suite
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY < 0) {
        const y = getScrollY();
        flushSync(showHeader);
        setAtTop(y <= TOP_THRESHOLD);
        lastScrollY.current = y;
      }
    };

    const onResize = () => {
      if (typeof window !== "undefined" && !window.matchMedia("(min-width: 1024px)").matches) {
        showHeader();
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: true });
    document.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
      document.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
      if (openMenuTimeoutRef.current) clearTimeout(openMenuTimeoutRef.current);
    };
  }, []);

  // Verrouiller le scroll du body quand le menu mobile est ouvert
  useEffect(() => {
    if (!menuOpen || !menuMounted) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen, menuMounted]);

  // Escape pour fermer
  useEffect(() => {
    if (!menuOpen || !menuMounted) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen, menuMounted, closeMenu]);

  // Précharger toutes les routes du nav à l’ouverture du menu mobile pour navigation instantanée au clic
  useEffect(() => {
    if (!menuOpen || !menuMounted) return;
    navItems.forEach(({ href }) => router.prefetch(href));
  }, [menuOpen, menuMounted]);

  const refsDesktop = [
    useRef<LaptopMinimalCheckIconHandle>(null),
    useRef<WrenchIconHandle>(null),
    useRef<LayoutPanelTopIconHandle>(null),
    useRef<FolderKanbanIconHandle>(null),
    useRef<SparklesIconHandle>(null),
    useRef<FeatherIconHandle>(null),
  ] as const;
  const refsTablet = [
    useRef<LaptopMinimalCheckIconHandle>(null),
    useRef<WrenchIconHandle>(null),
    useRef<LayoutPanelTopIconHandle>(null),
    useRef<FolderKanbanIconHandle>(null),
    useRef<SparklesIconHandle>(null),
    useRef<FeatherIconHandle>(null),
  ] as const;
  const refsMobile = [
    useRef<LaptopMinimalCheckIconHandle>(null),
    useRef<WrenchIconHandle>(null),
    useRef<LayoutPanelTopIconHandle>(null),
    useRef<FolderKanbanIconHandle>(null),
    useRef<SparklesIconHandle>(null),
    useRef<FeatherIconHandle>(null),
  ] as const;

  const handleNavClickDesktop = (i: number) => () => refsDesktop[i].current?.startAnimation?.();
  const handleNavClickTablet = (i: number) => () => refsTablet[i].current?.startAnimation?.();
  const handleNavClickMobile = (i: number) => () => refsMobile[i].current?.startAnimation?.();

  const mobileMenuOverlay = menuMounted && (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu de navigation"
      className={cn(
        "fixed inset-0 z-[9998] flex flex-col bg-background lg:hidden transition-opacity ease-out",
        menuOpen ? "opacity-100" : "opacity-0"
      )}
      style={{ transitionDuration: `${MENU_ANIM_DURATION_MS}ms` }}
      aria-hidden={!menuOpen}
    >
      <div className="flex min-h-full flex-1 flex-col items-start justify-center gap-2 px-8 py-24">
        <nav className="flex w-full max-w-sm flex-col items-stretch gap-1 text-left">
          {navItems.map(({ href, label, title, Icon }, i) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                title={title}
                prefetch={true}
                onClick={() => {
                  handleNavClickMobile(i)();
                  closeMenu();
                }}
                className={cn(
                  "flex w-full items-center justify-start gap-3 rounded-xl px-4 py-4 text-left text-titre-petit font-medium transition-[color,transform] duration-150 hover:bg-muted active:scale-95 active:bg-muted touch-manipulation",
                  isActive ? "text-primary hover:text-primary" : "text-foreground hover:text-foreground",
                  menuOpen && "animate-mobile-menu-item"
                )}
                style={
                  menuOpen
                    ? { animationDelay: `${MENU_ANIM_DURATION_MS + i * MENU_ITEM_STAGGER_MS}ms` }
                    : undefined
                }
              >
                <Icon ref={refsMobile[i]} size={28} className="shrink-0 text-inherit" />
                {label}
              </Link>
            );
          })}
        </nav>
        <div
          className={cn(
            "mt-8 w-full max-w-sm text-left",
            menuOpen && "animate-mobile-menu-item"
          )}
          style={
            menuOpen
              ? {
                  animationDelay: `${MENU_ANIM_DURATION_MS + navItems.length * MENU_ITEM_STAGGER_MS}ms`
                }
              : undefined
          }
        >
          <Button asChild size="lg" variant="outline" className="w-full touch-manipulation border-border bg-background text-foreground hover:bg-muted dark:border-white/30 dark:bg-white dark:text-black dark:hover:bg-white/90 dark:hover:text-black">
            <a href="/devis" onClick={closeMenu}>
              Demander un devis <ArrowRight className="size-5" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );

  // 3 états : invisible (scroll bas) | scrolling up (fond + border) | at top (transparent, pas de border)
  // Mobile : toujours fond blur. Desktop : border + blur uniquement au scroll up après avoir caché le header
  const isInvisible = !headerVisible && !menuOpen;
  const isAtTop = headerVisible && atTop;
  const isScrollingUp = headerVisible && !atTop && headerWasHidden;

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed left-0 right-0 top-0 z-[10000] transition-[transform,background-color,backdrop-filter] duration-300 ease-out will-change-transform",
          "border-b border-border bg-background/80 backdrop-blur-md",
          "lg:border-b-0 lg:bg-transparent lg:backdrop-blur-none",
          isScrollingUp && "lg:border-b lg:border-border lg:bg-background/80 lg:backdrop-blur-md",
          isInvisible && "-translate-y-full"
        )}
        style={isInvisible ? { transform: "translateY(-100%)" } : { transform: "translateY(0)" }}
      >
        <div className="container flex h-20 items-center gap-10 lg:h-24 lg:gap-12">
        {/* Logo puis nav : chaque élément apparaît l’un après l’autre */}
        <Link href="/" className={cn("flex shrink-0 items-center gap-3", "animate-header-in")} aria-label="Accueil" prefetch={true} onMouseEnter={() => router.prefetch("/")}>
          <BrandMark className="text-foreground" title="Studio Castel" />
        </Link>

        {/* Desktop (xl+) : chaque lien avec un délai progressif */}
        <nav className="hidden items-center gap-10 xl:flex xl:gap-12">
          {navItems.map(({ href, label, title, Icon }, i) => {
            const isActive = pathname === href;
            const delayMs = (i + 1) * HEADER_ENTRANCE_STAGGER_MS;
            return (
              <Link
                key={href}
                className={cn(
                  "animate-header-in inline-flex items-center gap-2.5 text-paragraphe font-medium transition-[color,transform] duration-150 active:scale-95",
                  isActive ? "text-primary hover:text-primary" : "text-foreground hover:text-foreground/90 dark:text-white dark:hover:text-white/90"
                )}
                href={href}
                title={title}
                prefetch={true}
                onMouseEnter={() => router.prefetch(href)}
                onClick={handleNavClickDesktop(i)}
                style={{ animationDelay: `${delayMs}ms` }}
              >
                <Icon ref={refsDesktop[i]} size={24} className="shrink-0 text-inherit" />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Tablette (lg à xl) : chaque icône avec un délai progressif */}
        <nav className="hidden items-center gap-8 lg:flex xl:hidden">
          {navItems.map(({ href, title, Icon }, i) => {
            const isActive = pathname === href;
            const delayMs = (i + 1) * HEADER_ENTRANCE_STAGGER_MS;
            return (
              <Link
                key={href}
                href={href}
                title={title}
                prefetch={true}
                onMouseEnter={() => router.prefetch(href)}
                className={cn(
                  "animate-header-in rounded-md p-3 transition-[color,transform] duration-150 active:scale-95",
                  isActive ? "text-primary hover:text-primary" : "text-foreground hover:bg-foreground/10 hover:text-foreground/90 dark:text-white dark:hover:bg-white/10 dark:hover:text-white/90"
                )}
                onClick={handleNavClickTablet(i)}
                style={{ animationDelay: `${delayMs}ms` }}
              >
                <Icon ref={refsTablet[i]} size={26} className="text-inherit" />
              </Link>
            );
          })}
        </nav>

        {/* Desktop/tablette : theme puis CTA, chacun decale */}
        <>
          <div className="ml-auto hidden items-center gap-3 lg:flex">
            <span
              className="animate-header-in inline-flex"
              style={{ animationDelay: `${(navItems.length + 1) * HEADER_ENTRANCE_STAGGER_MS}ms` }}
            >
              <ThemeToggleButton size={22} />
            </span>
            <span
              className="animate-header-in inline-flex"
              style={{ animationDelay: `${(navItems.length + 2) * HEADER_ENTRANCE_STAGGER_MS}ms` }}
            >
              <Button asChild size="lg" variant="outline" className="px-6 py-3 text-paragraphe border-border bg-background text-foreground hover:bg-muted dark:border-white/30 dark:bg-white dark:text-black dark:hover:bg-white/90 dark:hover:text-black">
                <a href="/devis">
                  Demander un devis <ArrowRight className="size-5" />
                </a>
              </Button>
            </span>
          </div>

          <div className="ml-auto flex items-center gap-2 lg:hidden">
          <span className="animate-header-in inline-flex" style={{ animationDelay: `${HEADER_ENTRANCE_STAGGER_MS}ms` }}>
            <ThemeToggleButton className="h-9 w-9" size={20} />
          </span>
          <span className="animate-header-in inline-flex" style={{ animationDelay: `${2 * HEADER_ENTRANCE_STAGGER_MS}ms` }}>
            <Button asChild size="sm" variant="outline" className="border-border bg-background text-foreground hover:bg-muted dark:border-white/30 dark:bg-white dark:text-black dark:hover:bg-white/90 dark:hover:text-black">
              <a href="/devis">Devis</a>
            </Button>
          </span>
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => (menuOpen ? closeMenu() : openMenu())}
            className="animate-header-in flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground touch-manipulation"
            style={{ animationDelay: `${3 * HEADER_ENTRANCE_STAGGER_MS}ms` }}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
          </div>
        </>
      </div>
      </header>

      {/* Spacer pour que le contenu ne passe pas sous le header fixe */}
      <div className="h-20 shrink-0 lg:h-24" aria-hidden />

      {/* Menu mobile : portail dans document.body pour être au-dessus de tout (z 9998) ; header z 9999 pour rester cliquable */}
      {menuMounted &&
        typeof document !== "undefined" &&
        createPortal(mobileMenuOverlay, document.body)}
    </>
  );
}
