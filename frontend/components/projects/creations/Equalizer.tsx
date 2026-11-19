/** Petites barres animées du morceau en cours (cartes et file de lecture). */
export function Equalizer({ playing }: { playing: boolean }) {
  return (
    <span
      className="flex h-3.5 shrink-0 items-end gap-[2px]"
      aria-hidden="true"
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={`w-[3px] rounded-sm bg-castel-red ${playing ? "animate-[eq_0.9s_ease-in-out_infinite]" : "h-1"}`}
          style={
            playing
              ? { animationDelay: `${i * 0.18}s`, height: "100%" }
              : undefined
          }
        />
      ))}
    </span>
  );
}
