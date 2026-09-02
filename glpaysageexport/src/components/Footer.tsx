import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

const footerLinks = [
  { href: "/services", label: "Services" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/a-propos", label: "À propos" },
  { href: "/avis-clients", label: "Avis clients" },
  { href: "/devis", label: "Demander un devis" },
  { href: "/contact", label: "Contact" },
];

const legalLinks = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/confidentialite", label: "Confidentialité" },
];

export default function Footer() {
  return (
    <footer className="border-t border-emerald-900/10 bg-emerald-950 text-emerald-50">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="flex items-center gap-2 text-lg font-bold">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white">
              <Image src="/logo.png" alt={siteConfig.name} width={28} height={24} className="h-6 w-auto" />
            </span>
            {siteConfig.name}
          </p>
          <p className="mt-3 max-w-xs text-sm text-emerald-100/80">
            {siteConfig.tagline}.
          </p>
          <p className="mt-4 text-sm text-emerald-100/80">
            Zone d&apos;intervention : {siteConfig.zones.join(", ")}.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-200">Le site</p>
          <ul className="mt-4 space-y-2">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-emerald-100/80 hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-200">Contact</p>
          <ul className="mt-4 space-y-2 text-sm text-emerald-100/80">
            <li>
              <a href={`tel:${siteConfig.phoneHref}`} className="hover:text-white">
                {siteConfig.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
                {siteConfig.email}
              </a>
            </li>
          </ul>
          <ul className="mt-6 flex gap-4 text-sm text-emerald-100/60">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-emerald-100/60 sm:px-6">
        © {new Date().getFullYear()} {siteConfig.name} — {siteConfig.legalStatus}
      </div>
    </footer>
  );
}
