import type { Metadata } from "next";
import CtaButton from "@/components/CtaButton";
import SectionHeading from "@/components/SectionHeading";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contactez ${siteConfig.name} par téléphone ou email, ou demandez directement un devis.`,
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeading
        eyebrow="Contact"
        title="Parlons de votre projet"
        description="Le plus simple pour recevoir un devis chiffré reste notre formulaire dédié. Vous pouvez aussi nous contacter directement."
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        <div className="rounded-2xl border border-emerald-900/10 bg-white p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Téléphone</h3>
          <a
            href={`tel:${siteConfig.phoneHref}`}
            className="mt-2 block text-xl font-semibold text-stone-900 hover:text-emerald-800"
          >
            {siteConfig.phone}
          </a>
        </div>
        <div className="rounded-2xl border border-emerald-900/10 bg-white p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Email</h3>
          <a
            href={`mailto:${siteConfig.email}`}
            className="mt-2 block text-xl font-semibold text-stone-900 hover:text-emerald-800"
          >
            {siteConfig.email}
          </a>
        </div>
        <div className="rounded-2xl border border-emerald-900/10 bg-white p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
            Zone d&apos;intervention
          </h3>
          <p className="mt-2 text-base text-stone-700">{siteConfig.zones.join(", ")}</p>
        </div>
      </div>

      <div className="mt-16 flex flex-col items-center gap-4 rounded-3xl bg-emerald-950 px-6 py-14 text-center text-white sm:px-16">
        <h2 className="text-2xl font-semibold sm:text-3xl">
          Envie d&apos;un devis précis et rapide ?
        </h2>
        <p className="max-w-xl text-emerald-100/80">
          Notre formulaire en ligne vous guide en quelques étapes pour nous transmettre
          toutes les infos utiles à un chiffrage rapide.
        </p>
        <CtaButton href="/devis" className="mt-2">
          Demander un devis gratuit
        </CtaButton>
      </div>
    </div>
  );
}
