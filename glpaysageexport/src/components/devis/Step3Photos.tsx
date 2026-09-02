"use client";

import { useState } from "react";
import { compressImage } from "@/lib/compress-image";
import { MAX_PHOTOS, MAX_PHOTO_BYTES } from "@/lib/devis-schema";
import FieldError from "./FieldError";
import type { StepProps } from "./form-types";

export default function Step3Photos({ data, errors, onChange }: StepProps) {
  const [processing, setProcessing] = useState(false);
  const [localError, setLocalError] = useState("");

  async function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    setLocalError("");

    const files = Array.from(fileList).filter((f) => f.type.startsWith("image/"));
    const room = MAX_PHOTOS - data.photos.length;
    if (files.length > room) {
      setLocalError(`Vous pouvez ajouter ${room} photo(s) supplémentaire(s) maximum.`);
    }
    const toProcess = files.slice(0, Math.max(room, 0));
    if (toProcess.length === 0) return;

    setProcessing(true);
    try {
      const compressed = await Promise.all(
        toProcess.map((file) => compressImage(file, MAX_PHOTO_BYTES)),
      );
      onChange("photos", [...data.photos, ...compressed]);
    } catch {
      setLocalError("Une erreur est survenue lors du traitement des photos.");
    } finally {
      setProcessing(false);
    }
  }

  function removePhoto(index: number) {
    onChange(
      "photos",
      data.photos.filter((_, i) => i !== index),
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold text-stone-900">
          Ajoutez quelques photos
        </h2>
        <p className="mt-1 text-sm text-stone-600">
          3 à 6 photos de votre terrain ou jardin actuel — facultatif, mais ça
          nous aide beaucoup à préparer un devis précis.
        </p>
      </div>

      <label
        htmlFor="photos"
        className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-emerald-700/40 bg-emerald-50/50 px-6 py-10 text-center transition-colors hover:border-emerald-700"
      >
        <span aria-hidden className="text-3xl">
          📷
        </span>
        <span className="text-sm font-semibold text-emerald-800">
          {processing ? "Traitement des photos en cours..." : "Cliquez pour ajouter des photos"}
        </span>
        <span className="text-xs text-stone-500">
          {data.photos.length}/{MAX_PHOTOS} photos ajoutées
        </span>
        <input
          id="photos"
          type="file"
          accept="image/*"
          multiple
          className="sr-only"
          disabled={processing || data.photos.length >= MAX_PHOTOS}
          onChange={(e) => {
            void handleFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </label>

      <FieldError message={localError || errors.photos} />

      {data.photos.length > 0 && (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {data.photos.map((photo, index) => (
            <div key={`${photo.name}-${index}`} className="group relative aspect-square overflow-hidden rounded-xl">
              {/* eslint-disable-next-line @next/next/no-img-element -- data URLs, next/image ne s'applique pas */}
              <img
                src={photo.dataUrl}
                alt={`Photo ${index + 1} du chantier`}
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={() => removePhoto(index)}
                className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-xs font-bold text-white opacity-90 hover:bg-black/80"
                aria-label={`Retirer la photo ${index + 1}`}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
