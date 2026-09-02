import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { signOutAction } from "../actions";

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <div className="min-h-[70vh]">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/admin" className="flex items-center gap-2 text-sm font-semibold text-stone-900">
            <Image src="/logo.png" alt={siteConfig.name} width={28} height={24} className="h-6 w-auto" />
            {siteConfig.name} — Espace admin
          </Link>
          <form action={signOutAction}>
            <button type="submit" className="text-sm font-medium text-stone-500 hover:text-stone-900">
              Déconnexion
            </button>
          </form>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">{children}</main>
    </div>
  );
}
