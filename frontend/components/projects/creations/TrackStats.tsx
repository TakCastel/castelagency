import { Headphones, Heart } from "lucide-react";

import type { MusicTrack } from "@/data/music";

const compact = new Intl.NumberFormat("fr-FR", { notation: "compact" });
const full = new Intl.NumberFormat("fr-FR");

type Stats = Pick<MusicTrack, "plays" | "likes">;

/**
 * Écoutes et likes Suno d'un morceau.
 * - `row` : ligne compacte (cartes, file de lecture) ;
 * - `hero` : deux gros chiffres légendés (vue « En cours de lecture »).
 */
export function TrackStats({
  track,
  variant = "row",
  className = "",
}: {
  track: Stats;
  variant?: "row" | "hero";
  className?: string;
}) {
  const label = `${full.format(track.plays)} écoutes, ${full.format(track.likes)} likes`;

  if (variant === "hero") {
    return (
      <dl
        className={`flex items-stretch justify-center gap-6 ${className}`}
        aria-label={label}
      >
        <div className="flex flex-col items-center">
          <dt className="order-2 mt-1 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
            <Headphones className="h-3.5 w-3.5" aria-hidden="true" />
            écoutes
          </dt>
          <dd className="order-1 font-display text-3xl font-bold tabular-nums text-white">
            {full.format(track.plays)}
          </dd>
        </div>
        <div className="w-px bg-white/15" aria-hidden="true" />
        <div className="flex flex-col items-center">
          <dt className="order-2 mt-1 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
            <Heart
              className="h-3.5 w-3.5 text-castel-red"
              fill="currentColor"
              aria-hidden="true"
            />
            likes
          </dt>
          <dd className="order-1 font-display text-3xl font-bold tabular-nums text-white">
            {full.format(track.likes)}
          </dd>
        </div>
      </dl>
    );
  }

  return (
    <span
      title={label}
      aria-label={label}
      role="img"
      className={`inline-flex items-center gap-3 text-sm font-medium tabular-nums text-white/70 ${className}`}
    >
      <span className="inline-flex items-center gap-1">
        <Headphones
          className="h-3.5 w-3.5 shrink-0 opacity-80"
          aria-hidden="true"
        />
        {compact.format(track.plays)}
      </span>
      <span className="inline-flex items-center gap-1">
        <Heart
          className="h-3.5 w-3.5 shrink-0 text-castel-red"
          fill="currentColor"
          aria-hidden="true"
        />
        {compact.format(track.likes)}
      </span>
    </span>
  );
}
