"use client";

import dynamic from "next/dynamic";
import { Component, useState, type ReactNode } from "react";

// Leaflet accède à `window`/`document` dès son import : la carte doit donc
// être chargée uniquement côté client, et seulement sur cette section.
const InterventionMap = dynamic(() => import("./InterventionMap"), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden
      className="flex h-[360px] animate-pulse items-center justify-center rounded-2xl bg-emerald-50 text-sm text-emerald-800/70 ring-1 ring-emerald-900/10 sm:h-[420px] lg:h-full lg:min-h-[420px]"
    >
      Chargement de la carte…
    </div>
  ),
});

class MapErrorBoundary extends Component<{ children: ReactNode; onError: () => void }> {
  componentDidCatch() {
    this.props.onError();
  }

  render() {
    return this.props.children;
  }
}

export default function InterventionMapLoader() {
  const [hasError, setHasError] = useState(false);
  const [selectedCode, setSelectedCode] = useState<string | null>(null);

  if (hasError) {
    return (
      <div className="flex h-[200px] flex-col items-center justify-center gap-2 rounded-2xl bg-emerald-50 p-6 text-center ring-1 ring-emerald-900/10 sm:h-[240px]">
        <p className="text-sm font-medium text-stone-700">
          La carte n&apos;a pas pu se charger.
        </p>
        <p className="text-sm text-stone-600">
          Consultez la liste des départements ci-contre pour connaître notre zone
          d&apos;intervention.
        </p>
      </div>
    );
  }

  return (
    <MapErrorBoundary onError={() => setHasError(true)}>
      <InterventionMap selectedCode={selectedCode} onSelect={setSelectedCode} />
    </MapErrorBoundary>
  );
}
