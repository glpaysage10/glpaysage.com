"use client";

import "leaflet/dist/leaflet.css";
import { useCallback, useRef, useState } from "react";
import { GeoJSON, MapContainer, TileLayer } from "react-leaflet";
import type { Feature, FeatureCollection, GeometryObject } from "geojson";
import type {
  GeoJSON as LeafletGeoJSON,
  LatLngBounds,
  Layer,
  Map as LeafletMap,
  Path,
  PathOptions,
} from "leaflet";
import zoneGeoJson from "@/data/zone-intervention.json";
import { getInterventionArea } from "@/lib/intervention-areas";

type DeptProperties = { code: string; nom: string };

const geoData = zoneGeoJson as FeatureCollection<GeometryObject, DeptProperties>;

// Fournisseur de tuiles configurable : tuiles standard OpenStreetMap.
// Respecter la politique d'usage OSM (pas de téléchargement massif, pas de
// garantie de disponibilité) — voir https://operations.osmfoundation.org/policies/tiles/
const TILE_CONFIG = {
  url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors',
};

const BASE_STYLE: PathOptions = {
  color: "#065f46", // emerald-800
  weight: 1.5,
  fillColor: "#10b981", // emerald-500
  fillOpacity: 0.12,
};

const SELECTED_STYLE: PathOptions = {
  color: "#064e3b", // emerald-900
  weight: 3,
  fillColor: "#10b981",
  fillOpacity: 0.35,
};

const DEFAULT_MESSAGE =
  "Disponibilité à confirmer. Contactez-nous pour vérifier notre intervention dans votre commune.";

type InterventionMapProps = {
  selectedCode: string | null;
  onSelect: (code: string | null) => void;
};

export default function InterventionMap({ selectedCode, onSelect }: InterventionMapProps) {
  const mapRef = useRef<LeafletMap | null>(null);
  const initialBoundsRef = useRef<LatLngBounds | null>(null);
  const [ready, setReady] = useState(false);

  const handleMapCreated = useCallback((map: LeafletMap | null) => {
    if (!map) return;
    mapRef.current = map;
    requestAnimationFrame(() => map.invalidateSize());
  }, []);

  const handleGeoJsonCreated = useCallback((layer: LeafletGeoJSON<DeptProperties> | null) => {
    if (!layer) return;
    const map = mapRef.current;
    if (!map) return;
    const bounds = layer.getBounds();
    if (bounds.isValid()) {
      initialBoundsRef.current = bounds;
      // Vue initiale calculée depuis l'emprise réelle des contours chargés,
      // jamais depuis des coordonnées choisies à la main.
      map.fitBounds(bounds, { padding: [24, 24] });
    }
    setReady(true);
  }, []);

  const resetView = useCallback(() => {
    const map = mapRef.current;
    const bounds = initialBoundsRef.current;
    if (map && bounds) {
      map.closePopup();
      map.fitBounds(bounds, { padding: [24, 24] });
    }
    onSelect(null);
  }, [onSelect]);

  const style = useCallback(
    (feature?: Feature<GeometryObject, DeptProperties>): PathOptions =>
      feature?.properties.code === selectedCode ? SELECTED_STYLE : BASE_STYLE,
    [selectedCode],
  );

  const onEachFeature = useCallback(
    (feature: Feature<GeometryObject, DeptProperties>, layer: Layer) => {
      const { code, nom } = feature.properties;
      const area = getInterventionArea(code);
      const label = `${nom} (${code})`;
      const message = area?.message ?? DEFAULT_MESSAGE;

      layer.bindPopup(
        `<strong>${label}</strong><p style="margin-top:4px;max-width:220px;">${message}</p>`,
      );

      const activate = () => {
        onSelect(code);
        layer.openPopup();
      };

      layer.on("click", activate);

      const path = layer as Path;
      path.on("add", () => {
        const el = path.getElement?.();
        if (!el) return;
        el.setAttribute("tabindex", "0");
        el.setAttribute("role", "button");
        el.setAttribute("aria-label", `${label} — ${message}`);
        el.addEventListener("keydown", (event: Event) => {
          const key = (event as KeyboardEvent).key;
          if (key === "Enter" || key === " ") {
            event.preventDefault();
            activate();
          }
        });
      });
    },
    [onSelect],
  );

  return (
    <div
      role="region"
      aria-label="Carte de la zone d'intervention de GLPaysage"
      className="relative h-[360px] overflow-hidden rounded-2xl ring-1 ring-emerald-900/10 sm:h-[420px] lg:h-full lg:min-h-[420px]"
    >
      <MapContainer
        center={[48.3, 3.8]}
        zoom={8}
        scrollWheelZoom={false}
        className="h-full w-full"
        ref={handleMapCreated}
      >
        <TileLayer url={TILE_CONFIG.url} attribution={TILE_CONFIG.attribution} />
        <GeoJSON
          data={geoData}
          style={style}
          onEachFeature={onEachFeature}
          ref={handleGeoJsonCreated}
        />
      </MapContainer>

      <button
        type="button"
        onClick={resetView}
        disabled={!ready}
        className="absolute bottom-3 right-3 z-[1000] rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-emerald-900 shadow-sm ring-1 ring-emerald-900/15 hover:bg-emerald-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 disabled:opacity-50"
      >
        Réinitialiser la vue
      </button>
    </div>
  );
}
