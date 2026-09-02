import Link from "next/link";
import type { ComponentProps } from "react";

type CtaButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className">;

export default function CtaButton({
  href,
  children,
  variant = "primary",
  className = "",
  ...props
}: CtaButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700";
  const styles =
    variant === "primary"
      ? "bg-emerald-800 text-white hover:bg-emerald-900"
      : "bg-white text-emerald-900 ring-1 ring-inset ring-emerald-800/30 hover:bg-emerald-50";

  return (
    <Link href={href} className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </Link>
  );
}
