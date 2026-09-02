"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site-config";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/a-propos", label: "À propos" },
  { href: "/avis-clients", label: "Avis clients" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-900/10 bg-cream/95 backdrop-blur supports-[backdrop-filter]:bg-cream/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight text-emerald-900" onClick={() => setOpen(false)}>
          <Image src="/logo.png" alt={siteConfig.name} width={40} height={35} className="h-9 w-auto" priority />
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Navigation principale">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-emerald-900 ${
                pathname === link.href ? "text-emerald-900" : "text-stone-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${siteConfig.phoneHref}`}
            className="text-sm font-semibold text-emerald-900 hover:underline"
          >
            {siteConfig.phone}
          </a>
          <Link
            href="/devis"
            className="inline-flex items-center justify-center rounded-full bg-emerald-800 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-900"
          >
            Demander un devis
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-emerald-900 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="border-t border-emerald-900/10 bg-cream lg:hidden">
          <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Navigation mobile">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-md px-3 py-2.5 text-base font-medium ${
                  pathname === link.href
                    ? "bg-emerald-800/10 text-emerald-900"
                    : "text-stone-700 hover:bg-emerald-800/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`tel:${siteConfig.phoneHref}`}
              className="mt-2 rounded-md px-3 py-2.5 text-base font-semibold text-emerald-900"
            >
              {siteConfig.phone}
            </a>
            <Link
              href="/devis"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-emerald-800 px-5 py-3 text-base font-semibold text-white"
            >
              Demander un devis
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
