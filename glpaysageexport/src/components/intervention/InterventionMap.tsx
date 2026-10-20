"use client";

import "leaflet/dist/leaflet.css";
import { Circle, MapContainer, TileLayer, useMap, ZoomControl } from "react-leaflet";
import { siteConfig } from "@/lib/site-config";

const TILE_CONFIG = {
  url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors',
};

const SERVICE_AREA_STYLE = {
  color: "#065f46",
  fillColor: "#10b981",
  fillOpacity: 0.16,
  weight: 2,
};

function ResetViewButton() {
  const map = useMap();

  return (
    <button
      type="button"
      onClick={() => map.setView(siteConfig.serviceArea.center, 8)}
      className="absolute bottom-3 right-3 z-[1000] inline-flex min-h-12 items-center rounded-full bg-white px-4 py-3 text-sm font-semibold text-emerald-900 shadow-sm ring-1 ring-emerald-900/15 hover:bg-emerald-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
    >
      Recentrer la carte
    </button>
  );
}

export default function InterventionMap() {
  return (
    <div
      role="region"
      aria-label={`Carte : ${siteConfig.serviceArea.label}`}
      className="relative h-[320px] overflow-hidden rounded-2xl ring-1 ring-emerald-900/10 sm:h-[420px]"
    >
      <MapContainer
        center={siteConfig.serviceArea.center}
        zoom={8}
        scrollWheelZoom={false}
        zoomControl={false}
        className="h-full w-full"
      >
        <TileLayer url={TILE_CONFIG.url} attribution={TILE_CONFIG.attribution} />
        <Circle
          center={siteConfig.serviceArea.center}
          radius={siteConfig.serviceArea.radiusMeters}
          pathOptions={SERVICE_AREA_STYLE}
        />
        <ZoomControl
          position="topright"
          zoomInText="+"
          zoomInTitle="Agrandir la carte"
          zoomOutText="−"
          zoomOutTitle="Réduire la carte"
        />
        <ResetViewButton />
      </MapContainer>
    </div>
  );
}
