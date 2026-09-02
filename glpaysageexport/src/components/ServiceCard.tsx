import Link from "next/link";
import type { services } from "@/lib/site-config";

export default function ServiceCard({ service }: { service: (typeof services)[number] }) {
  return (
    <Link
      href={`/services#${service.slug}`}
      className="group flex flex-col gap-3 rounded-2xl border border-emerald-900/10 bg-white p-6 transition-shadow hover:shadow-lg hover:shadow-emerald-900/5"
    >
      <h3 className="text-lg font-semibold text-stone-900 group-hover:text-emerald-800">
        {service.title}
      </h3>
      <p className="text-sm text-stone-600">{service.short}</p>
      <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-emerald-800">
        En savoir plus
        <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
          →
        </span>
      </span>
    </Link>
  );
}
