"use client";

import { useEffect, useRef } from "react";
import { inputClass } from "./form-types";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

declare global {
  interface Window {
    google?: typeof google;
  }
}

let placesScriptPromise: Promise<void> | null = null;

function loadPlacesScript(apiKey: string): Promise<void> {
  if (placesScriptPromise) return placesScriptPromise;
  placesScriptPromise = new Promise((resolve, reject) => {
    if (window.google?.maps?.places) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&language=fr&region=FR`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Impossible de charger Google Places"));
    document.head.appendChild(script);
  });
  return placesScriptPromise;
}

type AddressAutocompleteProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
};

/**
 * Champ adresse avec autocomplétion Google Places si une clé API est
 * configurée (NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) ; sinon, simple champ texte.
 */
export default function AddressAutocomplete({ id, value, onChange }: AddressAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!GOOGLE_MAPS_API_KEY || !inputRef.current) return;

    let autocomplete: google.maps.places.Autocomplete | undefined;
    let listener: google.maps.MapsEventListener | undefined;

    loadPlacesScript(GOOGLE_MAPS_API_KEY)
      .then(() => {
        if (!inputRef.current || !window.google) return;
        autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
          types: ["address"],
          componentRestrictions: { country: "fr" },
          fields: ["formatted_address"],
        });
        listener = autocomplete.addListener("place_changed", () => {
          const place = autocomplete!.getPlace();
          if (place.formatted_address) {
            onChange(place.formatted_address);
          }
        });
      })
      .catch(() => {
        // Pas bloquant : le champ reste utilisable en saisie libre.
      });

    return () => {
      listener?.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <input
      ref={inputRef}
      id={id}
      type="text"
      className={inputClass}
      placeholder="12 rue de la Paix, 10000 Troyes"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      autoComplete="off"
    />
  );
}
