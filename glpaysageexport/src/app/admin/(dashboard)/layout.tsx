import Link from "next/link";
import { signOutAction } from "../actions";

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <div className="min-h-[70vh] bg-stone-50">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/admin" className="text-sm font-semibold text-stone-900">
            GL Paysage — Espace admin
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
