import { Headphones, Heart } from "lucide-react";

import type { MusicTrack } from "@/data/music";

const fmt = new Intl.NumberFormat("fr-FR", { notation: "compact" });

/** Écoutes et likes Suno d'un morceau. */
export function TrackStats({
  track,
  className = "",
}: {
  track: Pick<MusicTrack, "plays" | "likes">;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-3 tabular-nums ${className}`}
    >
      <span
        className="inline-flex items-center gap-1"
        title={`${track.plays} écoutes`}
      >
        <Headphones className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        {fmt.format(track.plays)}
        <span className="sr-only"> écoutes</span>
      </span>
      <span
        className="inline-flex items-center gap-1"
        title={`${track.likes} likes`}
      >
        <Heart className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        {fmt.format(track.likes)}
        <span className="sr-only"> likes</span>
      </span>
    </span>
  );
}
