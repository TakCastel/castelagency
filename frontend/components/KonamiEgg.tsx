"use client";

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

/** Easter egg : le Konami code fait apparaître un message aux anciens patrons. */
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

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Message aux anciens patrons"
      onClick={() => setOpen(false)}
      className="konami-egg fixed inset-0 z-[9999] flex cursor-pointer flex-col items-center justify-center gap-6 bg-black/90 px-4 text-center backdrop-blur-sm"
    >
      <span aria-hidden className="konami-finger select-none text-[38vmin] leading-none">
        🖕
      </span>
      <p className="font-display text-3xl font-bold uppercase tracking-tight text-[#FF2B2B] sm:text-5xl">
        Allez vous faire foutre
      </p>
      <p className="max-w-md text-sm text-white/70 sm:text-base">
        À mes anciens patrons : merci de m&apos;avoir viré. Sans vous, ce studio n&apos;existerait pas.
      </p>
      <p className="text-xs text-white/40">Échap ou clic pour fermer</p>
      <style>{`
        .konami-egg { animation: konami-fade 250ms ease-out; }
        .konami-finger { animation: konami-pop 600ms cubic-bezier(.2,1.6,.4,1) both, konami-shake 1.2s 600ms ease-in-out infinite; }
        @keyframes konami-fade { from { opacity: 0 } to { opacity: 1 } }
        @keyframes konami-pop { from { transform: scale(0) rotate(-30deg) } to { transform: scale(1) rotate(0) } }
        @keyframes konami-shake { 0%,100% { transform: rotate(0) } 25% { transform: rotate(-6deg) } 75% { transform: rotate(6deg) } }
        @media (prefers-reduced-motion: reduce) { .konami-egg, .konami-finger { animation: none } }
      `}</style>
    </div>
  );
}
