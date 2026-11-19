"use client";

import { animate } from "motion";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

/**
 * Transition de page "rideau" aux couleurs du studio.
 *
 * Au clic sur un lien interne :
 *  1. deux panneaux (anthracite puis Rouge Castel) montent depuis le bas, leur bord
 *     supérieur se tend en courbe pendant le mouvement puis redevient droit ;
 *  2. le C blanc se pose au centre, la navigation part pendant que l'écran est couvert ;
 *  3. une fois la nouvelle page affichée, les panneaux repartent par le haut (rouge d'abord),
 *     et le contenu de la page monte en place (voir `.page-enter` dans globals.css).
 *
 * Navigation arrière/avant du navigateur : pas de rideau (on ne peut pas retarder un popstate),
 * seulement l'entrée du contenu.
 *
 * `prefers-reduced-motion` : aucune interception, navigation instantanée.
 * Un lien peut se soustraire avec l'attribut `data-no-transition`.
 */

const EASE_IN_OUT: [number, number, number, number] = [0.76, 0, 0.24, 1];
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const COVER_MS = 560;
const REVEAL_MS = 680;
const STAGGER_MS = 90;
const REVEAL_STAGGER_MS = 150;
const MIN_HOLD_MS = 140;
const MAX_WAIT_MS = 6000;
/** Amplitude de la courbe du bord (unités du viewBox 100x100). */
const BULGE = 14;

type Phase = "idle" | "covering" | "covered" | "revealing";

/** Bord supérieur qui monte : le milieu mène, les côtés suivent. */
function coverPath(p: number) {
  const y = 100 * (1 - p);
  const b = BULGE * Math.sin(Math.PI * p);
  return `M0 100 L0 ${y} Q50 ${y - 2 * b} 100 ${y} L100 100 Z`;
}

/** Bord inférieur qui remonte : les côtés mènent, le milieu traîne. */
function revealPath(q: number) {
  const y = 100 * (1 - q);
  const b = BULGE * Math.sin(Math.PI * q);
  return `M0 0 L100 0 L100 ${y} Q50 ${y + 2 * b} 0 ${y} Z`;
}

const FULL = "M0 0 L100 0 L100 100 L0 100 Z";

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function wait(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

function nextFrame() {
  return new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())));
}

/** Tween 0 → 1 qui écrit un path SVG à chaque frame. */
function tweenPath(el: SVGPathElement | null, build: (t: number) => string, duration: number, delay = 0) {
  if (!el) return Promise.resolve();
  return new Promise<void>((resolve) => {
    animate(0, 1, {
      duration: duration / 1000,
      delay: delay / 1000,
      ease: EASE_IN_OUT,
      onUpdate: (t) => el.setAttribute("d", build(t)),
      onComplete: () => resolve(),
    });
  });
}

/** Trouve le lien interne cliqué qui mérite une transition, sinon null. */
function transitionTarget(e: MouseEvent): URL | null {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return null;
  const a = (e.target as Element | null)?.closest?.("a");
  if (!a || !(a instanceof HTMLAnchorElement)) return null;
  if (a.hasAttribute("download") || a.hasAttribute("data-no-transition")) return null;
  if (a.target && a.target !== "_self") return null;
  const href = a.getAttribute("href");
  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return null;

  const url = new URL(a.href, window.location.href);
  if (url.origin !== window.location.origin) return null;
  // Fichiers statiques (PDF, images, jeux HTML servis depuis /public…) : pas de navigation App Router.
  if (/\.[a-z0-9]{2,5}$/i.test(url.pathname)) return null;
  // Même page (ancre ou paramètres seulement) : on laisse le comportement natif.
  if (url.pathname === window.location.pathname) return null;
  return url;
}

export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();

  const rootRef = useRef<HTMLDivElement>(null);
  const darkRef = useRef<SVGPathElement>(null);
  const redRef = useRef<SVGPathElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  const phase = useRef<Phase>("idle");
  const coveredAt = useRef(0);
  const arrived = useRef<(() => void) | null>(null);

  const setVisible = (on: boolean) => {
    const root = rootRef.current;
    if (!root) return;
    root.style.visibility = on ? "visible" : "hidden";
    root.style.pointerEvents = on ? "auto" : "none";
    document.documentElement.toggleAttribute("data-transitioning", on);
  };

  const run = useCallback(
    async (url: URL) => {
      if (phase.current !== "idle") return;
      phase.current = "covering";
      const href = url.pathname + url.search + url.hash;
      router.prefetch(href);
      document.documentElement.setAttribute("data-nav", "curtain");

      const dark = darkRef.current;
      const red = redRef.current;
      const logo = logoRef.current;
      dark?.setAttribute("d", coverPath(0));
      red?.setAttribute("d", coverPath(0));
      setVisible(true);

      // 1. Couverture
      const logoIn = logo
        ? animate(
            logo,
            { opacity: [0, 1], scale: [0.55, 1], rotate: [-18, 0], y: [40, 0] },
            { duration: 0.62, delay: (COVER_MS * 0.55) / 1000, ease: EASE_OUT }
          )
        : null;
      await Promise.all([
        tweenPath(dark, coverPath, COVER_MS),
        tweenPath(red, coverPath, COVER_MS, STAGGER_MS),
      ]);
      dark?.setAttribute("d", FULL);
      red?.setAttribute("d", FULL);
      phase.current = "covered";
      coveredAt.current = performance.now();

      // 2. Navigation sous le rideau
      const arrival = new Promise<void>((resolve) => {
        arrived.current = resolve;
      });
      router.push(href);

      // Si la navigation traîne, le C respire pour signaler le chargement.
      let breathing: ReturnType<typeof animate> | null = null;
      const breatheTimer = setTimeout(() => {
        if (logo)
          breathing = animate(logo, { scale: [1, 0.9, 1] }, { duration: 1.1, repeat: Infinity, ease: "easeInOut" });
      }, 700);

      await Promise.race([arrival, wait(MAX_WAIT_MS)]);
      arrived.current = null;
      clearTimeout(breatheTimer);

      // Attendre que le fallback `loading.tsx` ait laissé place à la vraie page.
      const t0 = performance.now();
      while (document.querySelector("[data-route-loading]") && performance.now() - t0 < MAX_WAIT_MS) {
        await wait(50);
      }
      await nextFrame();
      const held = performance.now() - coveredAt.current;
      if (held < MIN_HOLD_MS) await wait(MIN_HOLD_MS - held);
      (breathing as ReturnType<typeof animate> | null)?.stop();
      await logoIn;

      // 3. Révélation
      phase.current = "revealing";
      const logoOut = logo
        ? animate(logo, { opacity: 0, scale: 1.08, y: -60 }, { duration: 0.42, ease: EASE_IN_OUT })
        : null;
      await Promise.all([
        tweenPath(red, revealPath, REVEAL_MS),
        tweenPath(dark, revealPath, REVEAL_MS, REVEAL_STAGGER_MS),
        logoOut,
      ]);

      setVisible(false);
      phase.current = "idle";
    },
    [router]
  );

  // Interception des clics, en phase de capture pour passer avant le onClick de next/link.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (prefersReducedMotion()) return;
      const url = transitionTarget(e);
      if (!url) return;
      e.preventDefault();
      e.stopPropagation();
      void run(url);
    };
    const onPop = () => {
      // Retour/avance : pas de rideau, mais le contenu entre quand même.
      if (phase.current === "idle") document.documentElement.setAttribute("data-nav", "pop");
    };
    window.addEventListener("click", onClick, { capture: true });
    window.addEventListener("popstate", onPop);
    return () => {
      window.removeEventListener("click", onClick, { capture: true });
      window.removeEventListener("popstate", onPop);
    };
  }, [run]);

  // Arrivée sur la nouvelle route.
  useEffect(() => {
    arrived.current?.();
  }, [pathname]);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="fixed inset-0 z-[200]"
      style={{ visibility: "hidden", pointerEvents: "none" }}
    >
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path ref={darkRef} d={coverPath(0)} fill="#16161A" />
        <path ref={redRef} d={coverPath(0)} fill="#FF2B2B" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div ref={logoRef} style={{ opacity: 0 }} className="will-change-transform">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/studio-castel-c-blanc.svg" alt="" width={96} height={96} className="h-20 w-20 sm:h-24 sm:w-24" />
        </div>
      </div>
    </div>
  );
}
