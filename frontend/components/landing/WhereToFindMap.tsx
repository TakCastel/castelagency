"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

import { useTheme } from "@/components/ThemeProvider";

/** Centre : Avignon (Studio Castel) */
const AVIGNON_CENTER: [number, number] = [4.8059, 43.9493];
const ZOOM = 14;

/** Style gratuit MapLibre (tuiles démo, pas de clé API). */
const LIGHT_STYLE = "https://demotiles.maplibre.org/style.json";
/** Style sombre : même base avec fond assombri via paramètre si disponible, sinon on utilise le light et un filtre CSS. */
const DARK_STYLE = "https://demotiles.maplibre.org/style.json";

export function WhereToFindMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!containerRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: theme === "dark" ? DARK_STYLE : LIGHT_STYLE,
      center: AVIGNON_CENTER,
      zoom: ZOOM,
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");

    new maplibregl.Marker({ color: "hsl(var(--primary))" })
      .setLngLat(AVIGNON_CENTER)
      .addTo(map);

    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div className={theme === "dark" ? "where-map-wrapper map-dark" : "where-map-wrapper"}>
      <div
        ref={containerRef}
        className="h-[280px] w-full rounded-xl overflow-hidden border border-border bg-muted"
        aria-label="Carte : Studio Castel à Avignon"
      />
    </div>
  );
}
