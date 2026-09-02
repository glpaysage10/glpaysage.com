const STEP_LABELS = ["Travaux", "Chantier", "Photos", "Budget", "Coordonnées"];

export default function StepIndicator({ step }: { step: number }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-xs font-semibold text-stone-500">
        <span>
          Étape {step} sur {STEP_LABELS.length}
        </span>
        <span>{STEP_LABELS[step - 1]}</span>
      </div>
      <div className="flex gap-1.5">
        {STEP_LABELS.map((label, index) => (
          <div
            key={label}
            className={`h-1.5 flex-1 rounded-full ${
              index < step ? "bg-emerald-700" : "bg-stone-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
