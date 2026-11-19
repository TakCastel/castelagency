"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { DRAWING_BLUR_DATA_URL, type DrawingItem } from "@/data/drawings";

export function DrawingsGallery({ items }: { items: DrawingItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setOpen(null);
    lastTrigger.current?.focus();
  }, []);
  const step = useCallback(
    (d: number) => setOpen((i) => (i === null ? i : (i + d + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close, step]);

  const current = open !== null ? items[open] : null;

  return (
    <>
      <ul className="columns-2 gap-4 p-0 md:columns-3 md:gap-6 lg:columns-4">
        {items.map((d, i) => (
          <li key={d.id} className="mb-4 list-none break-inside-avoid md:mb-6">
            <button
              type="button"
              onClick={(e) => {
                lastTrigger.current = e.currentTarget;
                setOpen(i);
              }}
              className="group block w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              aria-label={`Agrandir : ${d.title ?? d.alt}`}
            >
              <span className="block overflow-hidden rounded-chip bg-castel-surface motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:-translate-y-1.5">
                <Image
                  src={d.src}
                  alt={d.alt}
                  width={d.width}
                  height={d.height}
                  sizes="(min-width: 1024px) 24vw, (min-width: 768px) 32vw, 48vw"
                  placeholder="blur"
                  blurDataURL={DRAWING_BLUR_DATA_URL}
                  className="h-auto w-full"
                />
              </span>
              {(d.title || d.date) && (
                <span className="mt-2 flex items-baseline justify-between gap-2 px-1 text-sm">
                  <span className="font-display font-semibold text-white">{d.title}</span>
                  {d.date && <span className="text-[#A1A1AA]">{d.date}</span>}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.title ?? current.alt}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-castel-ink/95 p-4 sm:p-10"
          onClick={close}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            className="absolute right-4 top-4 rounded-full bg-white px-5 py-3 font-display text-sm font-semibold text-castel-ink sm:right-8 sm:top-8"
          >
            Fermer
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Dessin précédent"
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white px-4 py-3 font-display text-lg font-semibold text-castel-ink sm:left-8"
          >
            &larr;
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Dessin suivant"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white px-4 py-3 font-display text-lg font-semibold text-castel-ink sm:right-8"
          >
            &rarr;
          </button>
          <figure className="flex max-h-full max-w-full flex-col items-center gap-3" onClick={(e) => e.stopPropagation()}>
            {current.videoSrc ? (
              <video
                key={current.id}
                src={current.videoSrc}
                poster={current.src}
                controls
                autoPlay
                playsInline
                className="max-h-[78vh] max-w-full rounded-chip"
              />
            ) : (
              <Image
                key={current.id}
                src={current.src}
                alt={current.alt}
                width={current.width}
                height={current.height}
                sizes="90vw"
                quality={90}
                className="h-auto max-h-[78vh] w-auto max-w-full rounded-chip object-contain"
              />
            )}
            <figcaption className="text-sm text-white">
              {current.title}
              {current.date ? `, ${current.date}` : ""}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
