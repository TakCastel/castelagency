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
import { flushSync } from "react-dom";

const STORAGE_KEY = "studio-castel-theme";
const REVEAL_DURATION_MS = 700;

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: (buttonRect: DOMRect) => void;
  isRevealing: boolean;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

declare global {
  interface Document {
    startViewTransition?(callback: () => void | Promise<void>): {
      ready: Promise<void>;
      finished: Promise<void>;
    };
  }
}

function applyThemeToRoot(newTheme: Theme) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(newTheme);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [isRevealing, setIsRevealing] = useState(false);
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

  const toggleTheme = useCallback(async (buttonRect: DOMRect) => {
    const x = buttonRect.left + buttonRect.width / 2;
    const y = buttonRect.top + buttonRect.height / 2;
    const newTheme: Theme = theme === "dark" ? "light" : "dark";
    const endRadius = Math.hypot(
      Math.max(x, typeof window !== "undefined" ? window.innerWidth - x : 0),
      Math.max(y, typeof window !== "undefined" ? window.innerHeight - y : 0)
    );

    if (typeof document === "undefined" || !document.startViewTransition) {
      setThemeState(newTheme);
      localStorage.setItem(STORAGE_KEY, newTheme);
      applyThemeToRoot(newTheme);
      return;
    }

    setIsRevealing(true);

    const styleId = "theme-reveal-old-mask";
    const styleEl = document.createElement("style");
    styleEl.id = styleId;
    styleEl.textContent = `
      @keyframes theme-reveal-old {
        from { --reveal-r: 0px; }
        to { --reveal-r: ${endRadius}px; }
      }
      ::view-transition-old(root) {
        --reveal-x: ${x}px;
        --reveal-y: ${y}px;
        mask-image: radial-gradient(circle at var(--reveal-x) var(--reveal-y), transparent 0, transparent var(--reveal-r), black var(--reveal-r));
        -webkit-mask-image: radial-gradient(circle at var(--reveal-x) var(--reveal-y), transparent 0, transparent var(--reveal-r), black var(--reveal-r));
        animation: theme-reveal-old ${REVEAL_DURATION_MS}ms ease-in-out forwards;
      }
    `;
    document.head.appendChild(styleEl);

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setThemeState(newTheme);
        localStorage.setItem(STORAGE_KEY, newTheme);
        applyThemeToRoot(newTheme);
      });
    });

    await transition.ready;

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: REVEAL_DURATION_MS,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    );

    try {
      await transition.finished;
    } finally {
      document.getElementById(styleId)?.remove();
      setIsRevealing(false);
    }
  }, [theme]);

  const value: ThemeContextValue = {
    theme,
    toggleTheme,
    isRevealing,
  };

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
