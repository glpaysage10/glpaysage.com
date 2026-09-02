"use client";

import { useState } from "react";
import {
  devisSchema,
  emptyDevisFormData,
  type DevisFormData,
} from "@/lib/devis-schema";
import { siteConfig } from "@/lib/site-config";
import Step1Prestations from "./Step1Prestations";
import Step2Chantier from "./Step2Chantier";
import Step3Photos from "./Step3Photos";
import Step4Budget from "./Step4Budget";
import Step5Coordonnees from "./Step5Coordonnees";
import StepIndicator from "./StepIndicator";

const TOTAL_STEPS = 5;

const STEP_FIELDS: Record<number, (keyof DevisFormData)[]> = {
  1: ["prestations", "prestationAutre"],
  2: ["surface", "adresse", "etatTerrain", "description"],
  3: ["photos"],
  4: ["budget", "delai"],
  5: ["nom", "telephone", "email", "disponibilites", "rgpd", "website"],
};

type Errors = Partial<Record<keyof DevisFormData, string>>;

function validateStep(step: number, data: DevisFormData): Errors {
  const fields = STEP_FIELDS[step];
  const result = devisSchema.pick(
    Object.fromEntries(fields.map((f) => [f, true])) as Record<
      keyof DevisFormData,
      true
    >,
  ).safeParse(data);

  if (result.success) return {};

  const errors: Errors = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as keyof DevisFormData;
    if (!errors[field]) errors[field] = issue.message;
  }
  return errors;
}

export default function QuoteForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<DevisFormData>(emptyDevisFormData);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function onChange<K extends keyof DevisFormData>(field: K, value: DevisFormData[K]) {
    setData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function goNext() {
    const stepErrors = validateStep(step, data);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    setStep((s) => Math.min(TOTAL_STEPS, s + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goBack() {
    setErrors({});
    setStep((s) => Math.max(1, s - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit() {
    const stepErrors = validateStep(5, data);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    const parsed = devisSchema.safeParse(data);
    if (!parsed.success) {
      setSubmitError("Certaines informations semblent incorrectes. Merci de vérifier les étapes précédentes.");
      return;
    }

    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/devis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || "Une erreur est survenue lors de l'envoi.");
      }
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Une erreur est survenue lors de l'envoi. Merci de réessayer.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl bg-emerald-50 px-6 py-16 text-center">
        <span aria-hidden className="text-4xl">
          ✅
        </span>
        <h2 className="text-2xl font-semibold text-stone-900">
          Votre demande a bien été envoyée
        </h2>
        <p className="max-w-md text-stone-600">
          Un email de confirmation vient de vous être envoyé. Nous revenons vers
          vous rapidement avec votre devis.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 rounded-3xl border border-emerald-900/10 bg-white p-6 sm:p-10">
      <StepIndicator step={step} />

      {step === 1 && <Step1Prestations data={data} errors={errors} onChange={onChange} />}
      {step === 2 && <Step2Chantier data={data} errors={errors} onChange={onChange} />}
      {step === 3 && <Step3Photos data={data} errors={errors} onChange={onChange} />}
      {step === 4 && <Step4Budget data={data} errors={errors} onChange={onChange} />}
      {step === 5 && <Step5Coordonnees data={data} errors={errors} onChange={onChange} />}

      {submitError && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-sm font-medium text-red-700">{submitError}</p>
          <p className="mt-1 text-sm text-red-700">
            Vous pouvez aussi nous joindre directement au{" "}
            <a href={`tel:${siteConfig.phoneHref}`} className="underline">
              {siteConfig.phone}
            </a>
            .
          </p>
        </div>
      )}

      <div className="flex items-center justify-between gap-4">
        {step > 1 ? (
          <button
            type="button"
            onClick={goBack}
            disabled={submitting}
            className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-stone-600 hover:text-stone-900 disabled:opacity-50"
          >
            Retour
          </button>
        ) : (
          <span />
        )}

        {step < TOTAL_STEPS ? (
          <button
            type="button"
            onClick={goNext}
            className="inline-flex items-center justify-center rounded-full bg-emerald-800 px-8 py-3 text-sm font-semibold text-white hover:bg-emerald-900"
          >
            Continuer
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="inline-flex items-center justify-center rounded-full bg-emerald-800 px-8 py-3 text-sm font-semibold text-white hover:bg-emerald-900 disabled:opacity-60"
          >
            {submitting ? "Envoi en cours..." : "Envoyer ma demande de devis"}
          </button>
        )}
      </div>
    </div>
  );
}
