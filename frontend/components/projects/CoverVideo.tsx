"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/** Vidéo muette en boucle, image fixe si l'utilisateur préfère moins de mouvement. */
export function CoverVideo({ src, poster, alt }: { src: string; poster: string; alt: string }) {
  const [play, setPlay] = useState(false);
  useEffect(() => {
    setPlay(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  return (
    <div className="relative aspect-[16/9] w-full bg-castel-surface">
      <Image src={poster} alt={alt} fill priority sizes="(min-width: 1024px) 1024px, 92vw" className="object-cover" />
      {play && (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
      )}
    </div>
  );
}
