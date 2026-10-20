type ServiceIconProps = {
  slug: string;
  className?: string;
};

const sharedProps = {
  viewBox: "0 0 24 24",
  className: "h-5 w-5",
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
};

// Icône générique de secours (pousse), utilisée si aucune icône dédiée
// n'existe pour le slug fourni.
function SproutIcon() {
  return (
    <svg {...sharedProps}>
      <path d="M12 21V11" />
      <path d="M12 13c-2.5-.5-4.3-2.6-4-5.4C10.8 7.6 13 9.7 13 12" />
      <path d="M12 11c2.2-.5 4-2.3 3.7-5C13.1 6.4 11.3 8.3 11.2 10.4" />
    </svg>
  );
}

function EntretienIcon() {
  return (
    <svg {...sharedProps}>
      <path d="M4 12a8 8 0 0 1 13.6-5.7M20 12a8 8 0 0 1-13.6 5.7" />
      <path d="M17.6 4.5v3.3h-3.3" />
      <path d="M6.4 19.5v-3.3h3.3" />
    </svg>
  );
}

function TonteIcon() {
  return (
    <svg {...sharedProps}>
      <path d="M4 20h16" />
      <path d="M8 20c-1-3 0-6 1.2-8.5" />
      <path d="M12 20c-1-4 .2-7.5 2-10" />
      <path d="M16 20c-.6-2.5 0-5 1.3-7.2" />
    </svg>
  );
}

function TailleIcon() {
  return (
    <svg {...sharedProps}>
      <circle cx="7" cy="18" r="2.2" />
      <circle cx="7" cy="6" r="2.2" />
      <path d="M8.8 7.4 19 17.5" />
      <path d="M8.8 16.6 19 6.5" />
    </svg>
  );
}

function DebroussaillageIcon() {
  return (
    <svg {...sharedProps}>
      <path d="M3 19h18" />
      <path d="M7 19c0-2.5.6-4.3 1.4-6" />
      <path d="M12 19c0-3.3.8-5.7 1.8-8" />
      <path d="M17 19c0-2.2.5-3.8 1.1-5.4" />
      <path d="M4.5 11.5 18 7" />
    </svg>
  );
}

const ICONS: Record<string, typeof SproutIcon> = {
  "entretien-de-jardin": EntretienIcon,
  tonte: TonteIcon,
  "taille-elagage": TailleIcon,
  debroussaillage: DebroussaillageIcon,
};

export default function ServiceIcon({ slug, className }: ServiceIconProps) {
  const Icon = ICONS[slug] ?? SproutIcon;
  return (
    <span
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 ${className ?? ""}`}
    >
      <Icon />
    </span>
  );
}
