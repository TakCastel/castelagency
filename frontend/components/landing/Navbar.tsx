"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal, flushSync } from "react-dom";

import { Button } from "@/components/ui/button";
import { BrandMark } from "@/components/BrandMark";
import { LaptopMinimalCheckIcon } from "@/components/ui/laptop-minimal-check";
import { LayoutPanelTopIcon } from "@/components/ui/layout-panel-top";
import { FolderKanbanIcon } from "@/components/ui/folder-kanban";
import { FeatherIcon } from "@/components/ui/feather";
import type { LaptopMinimalCheckIconHandle } from "@/components/ui/laptop-minimal-check";
import type { LayoutPanelTopIconHandle } from "@/components/ui/layout-panel-top";
import type { FolderKanbanIconHandle } from "@/components/ui/folder-kanban";
import type { FeatherIconHandle } from "@/components/ui/feather";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/le-studio", label: "Studio", title: "Le Studio", Icon: LaptopMinimalCheckIcon },
  { href: "/nos-projets", label: "Projets", title: "Mes projets", Icon: LayoutPanelTopIcon },
  { href: "/mode-de-fonctionnement", label: "Méthode", title: "Mon mode de fonctionnement", Icon: FolderKanbanIcon },
  { href: "/blog", label: "Blog", title: "Blog", Icon: FeatherIcon },
] as const;

const SCROLL_THRESHOLD = 12; // px de scroll vers le bas pour cacher le header
const TOP_THRESHOLD = 20;

const MENU_ANIM_DURATION_MS = 320;
const MENU_ITEM_STAGGER_MS = 80;

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuMounted, setMenuMounted] = useState(false); // true = overlay dans le DOM (pour animation de fermeture)
  const [headerVisible, setHeaderVisible] = useState(true);
  const [atTop, setAtTop] = useState(true); // true = tout en haut, pas de blur ni border
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
    setMenuOpen(false);
    closeTimeoutRef.current = setTimeout(() => {
      setMenuMounted(false);
      closeTimeoutRef.current = null;
      menuButtonRef.current?.focus();
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
      setAtTop(y <= TOP_THRESHOLD);
      if (y <= TOP_THRESHOLD) {
        flushSync(showHeader);
      } else if (y < prev) {
        // Scroll vers le haut : réafficher immédiatement (DOM + state)
        flushSync(showHeader);
      } else if (y > prev + SCROLL_THRESHOLD) {
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

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: true });
    document.addEventListener("wheel", onWheel, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
      document.removeEventListener("wheel", onWheel);
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

  const refsDesktop = [
    useRef<LaptopMinimalCheckIconHandle>(null),
    useRef<LayoutPanelTopIconHandle>(null),
    useRef<FolderKanbanIconHandle>(null),
    useRef<FeatherIconHandle>(null),
  ] as const;
  const refsTablet = [
    useRef<LaptopMinimalCheckIconHandle>(null),
    useRef<LayoutPanelTopIconHandle>(null),
    useRef<FolderKanbanIconHandle>(null),
    useRef<FeatherIconHandle>(null),
  ] as const;
  const refsMobile = [
    useRef<LaptopMinimalCheckIconHandle>(null),
    useRef<LayoutPanelTopIconHandle>(null),
    useRef<FolderKanbanIconHandle>(null),
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
        "fixed inset-0 z-[9998] flex flex-col bg-background md:hidden transition-opacity ease-out",
        menuOpen ? "opacity-100" : "opacity-0"
      )}
      style={{ transitionDuration: `${MENU_ANIM_DURATION_MS}ms` }}
      aria-hidden={!menuOpen}
    >
      <div className="flex min-h-full flex-1 flex-col items-center justify-center gap-2 px-8 py-24">
        <nav className="flex flex-col items-center gap-1 text-center">
          {navItems.map(({ href, label, title, Icon }, i) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                title={title}
                onClick={() => {
                  handleNavClickMobile(i)();
                  closeMenu();
                }}
                className={cn(
                  "flex items-center justify-center gap-3 rounded-xl px-6 py-4 text-titre-petit font-medium transition-[color,transform] duration-150 hover:bg-muted active:scale-95 active:bg-muted touch-manipulation",
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
            "mt-8 w-full max-w-xs",
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
          <Button asChild size="lg" variant="outline" className="w-full touch-manipulation border-white/30 bg-white text-black hover:bg-white/90 hover:text-black">
            <a href="/devis" onClick={closeMenu}>
              Demander un devis <ArrowRight className="size-5" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );

  // 3 états : invisible (scroll bas) | scrolling up (fond + border) | at top (transparent, pas de border)
  const isInvisible = !headerVisible && !menuOpen;
  const isAtTop = headerVisible && atTop;
  const isScrollingUp = headerVisible && !atTop;

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed left-0 right-0 top-0 z-[9999] border-b transition-[transform,background-color,border-color,border-width,backdrop-filter] duration-300 ease-out will-change-transform",
          isInvisible && "-translate-y-full",
          !isInvisible && "translate-y-0",
          isAtTop && "bg-gradient-to-b from-black/20 to-transparent border-b-0",
          isScrollingUp && "bg-background/80 border-border backdrop-blur-md"
        )}
        style={isInvisible ? { transform: "translateY(-100%)" } : { transform: "translateY(0)" }}
      >
        <div className="container flex h-20 items-center gap-10 md:h-24 md:gap-12">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="Accueil">
          <BrandMark className="text-foreground" title="Studio Castel" />
        </Link>

        {/* Desktop (lg+) : nav complète à gauche */}
        <nav className="hidden items-center gap-10 lg:flex lg:gap-12">
          {navItems.map(({ href, label, title, Icon }, i) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                className={cn(
                  "inline-flex items-center gap-2.5 text-paragraphe font-medium transition-[color,transform] duration-150 active:scale-95",
                  isActive ? "text-primary hover:text-primary" : "text-white hover:text-white/90"
                )}
                href={href}
                title={title}
                onClick={handleNavClickDesktop(i)}
              >
                <Icon ref={refsDesktop[i]} size={24} className="shrink-0 text-inherit" />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Tablette (md à lg) : uniquement les icônes */}
        <nav className="hidden items-center gap-8 md:flex lg:hidden">
          {navItems.map(({ href, title, Icon }, i) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                title={title}
                className={cn(
                  "rounded-md p-3 transition-[color,transform] duration-150 active:scale-95",
                  isActive ? "text-primary hover:text-primary" : "text-white hover:bg-white/10 hover:text-white/90"
                )}
                onClick={handleNavClickTablet(i)}
              >
                <Icon ref={refsTablet[i]} size={26} className="text-inherit" />
              </Link>
            );
          })}
        </nav>

        {/* Bouton CTA : tout à droite sur desktop/tablette */}
        <div className="ml-auto hidden items-center md:flex">
          <Button asChild size="lg" variant="outline" className="px-6 py-3 text-paragraphe border-white/30 bg-white text-black hover:bg-white/90 hover:text-black">
            <a href="/devis">
              Demander un devis <ArrowRight className="size-5" />
            </a>
          </Button>
        </div>

        {/* Mobile : bouton burger (menu caché par défaut, visible au clic) */}
        <div className="ml-auto flex items-center gap-2 md:hidden">
          <Button asChild size="sm" variant="outline" className="lg:hidden border-white/30 bg-white text-black hover:bg-white/90 hover:text-black">
            <a href="/devis">Devis</a>
          </Button>
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => (menuOpen ? closeMenu() : openMenu())}
            className="flex size-12 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground touch-manipulation"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {menuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>
      </header>

      {/* Spacer pour que le contenu ne passe pas sous le header fixe */}
      <div className="h-20 shrink-0 md:h-24" aria-hidden />

      {/* Menu mobile : portail dans document.body pour être au-dessus de tout (z 9998) ; header z 9999 pour rester cliquable */}
      {menuMounted &&
        typeof document !== "undefined" &&
        createPortal(mobileMenuOverlay, document.body)}
    </>
  );
}
