"use client";

import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";

type ThemeToggleButtonProps = {
  className?: string;
  size?: number;
  "aria-label"?: string;
};

const iconTransition = {
  duration: 0.35,
  ease: [0.32, 0.72, 0, 1] as const,
};

const iconExit = { opacity: 0, scale: 0.75, rotate: 25 };
const iconEnterFromSun = { opacity: 0, scale: 0.75, rotate: -25 };
const iconEnterFromMoon = { opacity: 0, scale: 0.75, rotate: 25 };
const iconIdle = { opacity: 1, scale: 1, rotate: 0 };

export function ThemeToggleButton({
  className,
  size = 20,
  "aria-label": ariaLabel,
}: ThemeToggleButtonProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const label = isDark ? "Passer au thème clair" : "Passer au thème sombre";
  const hasToggledOnce = useRef(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    hasToggledOnce.current = true;
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    toggleTheme(rect);
  };

  const shouldAnimate = hasToggledOnce.current;
  const initial = shouldAnimate ? (isDark ? iconEnterFromSun : iconEnterFromMoon) : iconIdle;

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={ariaLabel ?? label}
      title={label}
      className={cn(
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
        "text-foreground transition-colors duration-200",
        "hover:text-primary hover:scale-105 active:scale-95",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
    >
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.div
            key="sun"
            initial={initial}
            animate={iconIdle}
            exit={iconExit}
            transition={iconTransition}
            className="flex items-center justify-center text-inherit"
          >
            <Sun size={size} aria-hidden className="shrink-0" strokeWidth={2} />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={initial}
            animate={iconIdle}
            exit={{ ...iconExit, rotate: -25 }}
            transition={iconTransition}
            className="flex items-center justify-center text-inherit"
          >
            <Moon size={size} aria-hidden className="shrink-0" strokeWidth={2} />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
