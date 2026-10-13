import Link from "next/link";
import ServiceIcon from "@/components/ServiceIcon";
import type { services } from "@/lib/site-config";

export default function ServiceCard({ service }: { service: (typeof services)[number] }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex flex-col gap-4 rounded-2xl bg-white p-6 ring-1 ring-emerald-900/10 transition-shadow hover:shadow-lg hover:shadow-emerald-900/5"
    >
      <ServiceIcon slug={service.slug} />

      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-stone-900 group-hover:text-emerald-800">
          {service.title}
        </h3>
        <p className="text-sm text-stone-600">{service.short}</p>
      </div>

      <ul className="flex flex-col gap-1.5">
        {service.includes.slice(0, 2).map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-stone-600">
            <span aria-hidden className="mt-1.5 h-1 w-1 flex-none rounded-full bg-emerald-600" />
            {item}
          </li>
        ))}
      </ul>

      <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-emerald-800">
        En savoir plus
        <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
          →
        </span>
      </span>
    </Link>
  );
}
