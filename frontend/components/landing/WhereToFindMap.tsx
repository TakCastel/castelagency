"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

import { useTheme } from "@/components/ThemeProvider";

/** Centre : Avignon (Studio Castel) — zoom 15 pour bien voir noms de villes et rues */
const AVIGNON_CENTER: [number, number] = [4.8059, 43.9493];
const ZOOM = 15;

/** Zoom max 16 : au-delà OSM peut refuser les tuiles (rate limit / 403). */
const MAX_ZOOM = 16;

/** Style OSM : routes, rivières, villes, etc. — pas de clé API. Rendu noir et blanc via CSS (globals). */
const OSM_STYLE: maplibregl.StyleSpecification = {
  version: 8,
  sources: {
    osm: {
      type: "raster",
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution: "© <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a>",
    },
  },
  layers: [
    {
      id: "osm-tiles",
      type: "raster",
      source: "osm",
      minzoom: 0,
      maxzoom: MAX_ZOOM,
    },
  ],
};

function addMarker(map: maplibregl.Map) {
  return new maplibregl.Marker({ color: "hsl(var(--primary))" })
    .setLngLat(AVIGNON_CENTER)
    .addTo(map);
}

export function WhereToFindMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markerRef = useRef<maplibregl.Marker | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!containerRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: OSM_STYLE,
      center: AVIGNON_CENTER,
      zoom: ZOOM,
      maxZoom: MAX_ZOOM,
    });

    // Bloquer le zoom trackpad/molette au-delà du max (évite requêtes tuiles refusées)
    map.on("zoom", () => {
      if (map.getZoom() > MAX_ZOOM) map.setZoom(MAX_ZOOM);
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
    markerRef.current = addMarker(map);
    mapRef.current = map;

    return () => {
      markerRef.current?.remove();
      markerRef.current = null;
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div
      className={
        theme === "dark"
          ? "where-map-wrapper where-map-dark"
          : "where-map-wrapper where-map-light"
      }
    >
      <div
        ref={containerRef}
        className="h-[280px] w-full rounded-xl overflow-hidden border border-border bg-muted"
        aria-label="Carte : Studio Castel à Avignon"
      />
    </div>
  );
}
