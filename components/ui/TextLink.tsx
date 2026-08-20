import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function TextLink({
  href,
  children,
  variant = "light",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "light" | "dark";
}) {
  const colorClasses =
    variant === "dark"
      ? "text-ember-300 hover:text-ember-500"
      : "text-ember-700 hover:text-ember-500";

  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-1.5 font-sans text-sm font-semibold ${colorClasses} transition-colors group`}
    >
      {children}
      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
    </Link>
  );
}