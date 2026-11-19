"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// ↑ ↑ ↓ ↓ ← → ← → B A
const SEQUENCE = [
  "arrowup",
  "arrowup",
  "arrowdown",
  "arrowdown",
  "arrowleft",
  "arrowright",
  "arrowleft",
  "arrowright",
  "b",
  "a",
];

const COLORS = ["#FF2B2B", "#FFFFFF", "#FFB800", "#FF2B2B", "#FF8A8A"];

// Confettis calculés une fois : position de départ, dérive, rotation, délai.
const CONFETTI = Array.from({ length: 70 }, (_, i) => ({
  left: (i * 37) % 100,
  drift: ((i * 53) % 40) - 20,
  spin: ((i * 71) % 720) - 360,
  delay: ((i * 13) % 50) / 100,
  duration: 1.8 + ((i * 29) % 12) / 10,
  size: 6 + ((i * 17) % 7),
  color: COLORS[i % COLORS.length],
  round: i % 3 === 0,
}));

/** Easter egg : le Konami code débloque un « succès » façon jeu vidéo. */
export function KonamiEgg() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let index = 0;
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (open) {
        if (key === "escape") setOpen(false);
        return;
      }
      if (key === SEQUENCE[index]) {
        index += 1;
        if (index === SEQUENCE.length) {
          index = 0;
          setOpen(true);
        }
      } else {
        index = key === SEQUENCE[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => setOpen(false), 9000);
    return () => window.clearTimeout(t);
  }, [open]);

  if (!open) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden" aria-live="polite">
      {CONFETTI.map((c, i) => (
        <span
          key={i}
          aria-hidden
          className="konami-confetti absolute top-0 block"
          style={
            {
              left: `${c.left}%`,
              width: c.size,
              height: c.round ? c.size : c.size * 1.6,
              background: c.color,
              borderRadius: c.round ? "9999px" : "2px",
              animationDelay: `${c.delay}s`,
              animationDuration: `${c.duration}s`,
              "--drift": `${c.drift}vw`,
              "--spin": `${c.spin}deg`,
            } as React.CSSProperties
          }
        />
      ))}

      <div
        role="status"
        className="konami-card pointer-events-auto absolute bottom-6 left-1/2 flex w-[min(92vw,26rem)] -translate-x-1/2 items-center gap-4 rounded-2xl border border-white/10 bg-black/90 p-4 pr-10 text-left shadow-card backdrop-blur-md"
      >
        <span
          aria-hidden
          className="konami-trophy flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#FF2B2B] text-3xl"
        >
          🏆
        </span>
        <div className="min-w-0">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#FF2B2B]">Succès débloqué</p>
          <p className="font-display text-lg font-bold leading-tight text-white">Vrai joueur</p>
          <p className="mt-1 text-sm text-white/65">
            Vous connaissez le Konami code, on va bien s&apos;entendre.{" "}
            <Link href="/contact" onClick={() => setOpen(false)} className="text-white underline underline-offset-2">
              Parlons de votre projet
            </Link>
          </p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Fermer"
          className="absolute right-3 top-3 text-white/40 transition-colors hover:text-white"
        >
          ✕
        </button>
      </div>

      <style>{`
        .konami-confetti { transform: translateY(-5vh); animation-name: konami-fall; animation-timing-function: cubic-bezier(.25,.6,.5,1); animation-fill-mode: forwards; }
        @keyframes konami-fall {
          to { transform: translate(var(--drift), 105vh) rotate(var(--spin)); opacity: .9; }
        }
        .konami-card { animation: konami-in 500ms cubic-bezier(.2,1.4,.4,1) both; }
        @keyframes konami-in { from { transform: translate(-50%, 140%); opacity: 0 } to { transform: translate(-50%, 0); opacity: 1 } }
        .konami-trophy { animation: konami-bounce 900ms 400ms ease-in-out 2; }
        @keyframes konami-bounce { 0%,100% { transform: scale(1) rotate(0) } 30% { transform: scale(1.18) rotate(-8deg) } 60% { transform: scale(1.05) rotate(6deg) } }
        @media (prefers-reduced-motion: reduce) {
          .konami-confetti { display: none }
          .konami-card, .konami-trophy { animation: none }
        }
      `}</style>
    </div>
  );
}
