"use client";

import dynamic from "next/dynamic";
import { Component, useState, type ReactNode } from "react";
import { siteConfig } from "@/lib/site-config";

// Leaflet accède à `window`/`document` dès son import : la carte doit donc
// être chargée uniquement côté client, et seulement sur cette section.
const InterventionMap = dynamic(() => import("./InterventionMap"), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden
      className="flex h-[320px] animate-pulse items-center justify-center rounded-2xl bg-emerald-50 text-sm text-emerald-800/70 ring-1 ring-emerald-900/10 sm:h-[420px]"
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
  if (hasError) {
    return (
      <p className="flex min-h-[200px] items-center justify-center rounded-2xl bg-emerald-50 p-6 text-center text-stone-700">
        Carte indisponible. GLPaysage intervient dans {siteConfig.serviceArea.label}.
      </p>
    );
  }

  return (
    <MapErrorBoundary onError={() => setHasError(true)}>
      <InterventionMap />
    </MapErrorBoundary>
  );
}
