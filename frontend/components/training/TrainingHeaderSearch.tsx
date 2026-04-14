"use client";

import Link from "next/link";
import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import type { TrainingSearchResult } from "@/lib/training/search";
import { cn } from "@/lib/utils";

type TrainingHeaderSearchProps = {
  className?: string;
};

export function TrainingHeaderSearch({ className }: TrainingHeaderSearchProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<TrainingSearchResult[]>([]);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/training-search?q=${encodeURIComponent(trimmed)}`, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Search request failed");
        const data = (await response.json()) as { results?: TrainingSearchResult[] };
        setResults(Array.isArray(data.results) ? data.results : []);
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setResults([]);
        }
      } finally {
        setLoading(false);
      }
    }, 120);

    return () => {
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, [query]);

  const showPanel = open && query.trim().length >= 2;

  return (
    <div ref={rootRef} className={cn("relative w-full max-w-xl", className)}>
      <label className="relative block">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          value={query}
          onFocus={() => setOpen(true)}
          onChange={(event) => {
            setQuery(event.currentTarget.value);
            setOpen(true);
          }}
          placeholder="Rechercher dans le guide pratique"
          className="h-10 w-full rounded-xl border border-border/80 bg-background/80 pl-9 pr-10 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/90 focus:border-primary/60 focus:ring-2 focus:ring-primary/15"
          aria-label="Rechercher dans le guide pratique IA"
        />
        {query ? (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setOpen(false);
            }}
            className="absolute right-2 top-1/2 inline-flex size-6 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Effacer la recherche"
          >
            <X className="size-4" />
          </button>
        ) : null}
      </label>

      {showPanel ? (
        <div className="absolute left-0 right-0 top-[calc(100%+0.45rem)] z-[10010] overflow-hidden rounded-2xl border border-border/80 bg-background/95 shadow-2xl backdrop-blur">
          {loading ? (
            <div className="px-4 py-4 text-sm text-muted-foreground">Recherche en cours…</div>
          ) : results.length > 0 ? (
            <div className="max-h-[min(70vh,34rem)] overflow-y-auto p-2">
              {results.map((result) => (
                <Link
                  key={result.id}
                  href={result.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 transition-colors hover:bg-muted/70"
                >
                  <div className="flex items-center gap-2 text-[0.72rem] font-medium uppercase tracking-[0.08em] text-muted-foreground">
                    <span>{result.kind === "page" ? "Page" : "Section"}</span>
                    {result.kind === "section" ? <span>{result.pageTitle}</span> : null}
                  </div>
                  <p className="mt-1 text-sm font-semibold text-foreground">{result.title}</p>
                  {result.excerpt ? (
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{result.excerpt}</p>
                  ) : null}
                </Link>
              ))}
            </div>
          ) : (
            <div className="px-4 py-4 text-sm text-muted-foreground">
              Aucun résultat pour <span className="font-medium text-foreground">"{query}"</span>.
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
