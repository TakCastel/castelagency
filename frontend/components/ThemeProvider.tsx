"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "studio-castel-theme";
const REVEAL_DURATION_MS = 700;

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: (buttonRect: DOMRect) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyThemeToRoot(newTheme: Theme) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(newTheme);
}

/**
 * Révélation circulaire du thème, sans l'API View Transitions (qui a un bug
 * documenté et non résolu : le clip-path animé sur son pseudo-élément
 * ::view-transition-new(root) est positionné par rapport au « snapshot
 * root », qui peut différer du viewport réel — cf. explainer WICG et fils du
 * CSS Working Group). À la place : on clone la page, on force le clone à
 * afficher le NOUVEAU thème (classe CSS), et on agrandit son clip-path
 * depuis le bouton cliqué — la vraie page reste dans l'ANCIEN thème,
 * inchangée, visible tout autour tant que le cercle ne l'a pas recouverte.
 * Le vrai thème ne bascule qu'à la toute fin, une fois le clone opaque à
 * 100 % (bascule invisible). Le clip-path porte ici sur un <div> tout à fait
 * normal (pas un pseudo-élément), donc fiable partout.
 */
function playThemeReveal(x: number, y: number, newTheme: Theme, applyNewTheme: () => void) {
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  );

  const scrollX = window.scrollX;
  const scrollY = window.scrollY;

  const overlay = document.createElement("div");
  overlay.setAttribute("aria-hidden", "true");
  overlay.className = `${newTheme} theme-${newTheme}`;
  overlay.style.cssText = `
    position: fixed;
    inset: 0;
    overflow: hidden;
    z-index: 2147483647;
    pointer-events: none;
    background: hsl(var(--background));
    clip-path: circle(0px at ${x}px ${y}px);
  `;

  const clone = document.body.cloneNode(true) as HTMLElement;
  clone.removeAttribute("id");
  clone.querySelectorAll("[id]").forEach((el) => el.removeAttribute("id"));
  // Un clone frais relance les animations CSS d'entrée (fade-in navbar, etc.)
  // depuis leur état 0% (invisible) : on les coupe pour figer le clone tel
  // qu'il apparaît réellement au moment du clic.
  clone.style.animation = "none";
  clone.querySelectorAll<HTMLElement>("*").forEach((el) => {
    el.style.animation = "none";
  });
  clone.style.cssText += `
    position: absolute;
    top: ${-scrollY}px;
    left: ${-scrollX}px;
    width: 100%;
    margin: 0;
  `;
  overlay.appendChild(clone);
  document.body.appendChild(overlay);

  const animation = overlay.animate(
    [
      { clipPath: `circle(0px at ${x}px ${y}px)` },
      { clipPath: `circle(${endRadius}px at ${x}px ${y}px)` },
    ],
    { duration: REVEAL_DURATION_MS, easing: "ease-in-out" }
  );
  animation.finished
    .catch(() => {})
    .finally(() => {
      // Le clone (nouveau thème) recouvre tout l'écran à cet instant : on
      // bascule le vrai thème puis on retire le calque, sans saut visible.
      applyNewTheme();
      overlay.remove();
    });
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const mounted = useRef(false);

  // Lecture initiale depuis le storage / préférence système
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (stored === "light" || stored === "dark") {
      setThemeState(stored);
    } else if (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: light)").matches) {
      setThemeState("light");
    }
    mounted.current = true;
  }, []);

  // Appliquer le thème sur le document
  useEffect(() => {
    applyThemeToRoot(theme);
  }, [theme]);

  // Persister le thème
  useEffect(() => {
    if (!mounted.current) return;
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback((buttonRect: DOMRect) => {
    const x = buttonRect.left + buttonRect.width / 2;
    const y = buttonRect.top + buttonRect.height / 2;
    const next: Theme = theme === "dark" ? "light" : "dark";

    // IMPORTANT : ne jamais mettre d'effet de bord (DOM, animation) dans un
    // updater `setState(current => ...)` — React (Strict Mode, en dev)
    // l'appelle deux fois pour détecter les impuretés, ce qui doublerait le
    // calque et l'animation. Tout ce qui suit lit `theme` via la closure
    // (dépendance du useCallback) et appelle setThemeState avec une valeur.
    if (typeof document !== "undefined" && typeof Element.prototype.animate === "function") {
      playThemeReveal(x, y, next, () => {
        localStorage.setItem(STORAGE_KEY, next);
        applyThemeToRoot(next);
      });
    } else {
      localStorage.setItem(STORAGE_KEY, next);
      applyThemeToRoot(next);
    }

    setThemeState(next);
  }, [theme]);

  const value: ThemeContextValue = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
