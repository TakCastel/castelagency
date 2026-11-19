import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "ink" | "red" | "white";

const variants: Record<Variant, string> = {
  ink: "bg-castel-ink text-white hover:bg-castel-surface",
  red: "bg-castel-red text-castel-ink hover:bg-castel-red-deep hover:text-white",
  white: "bg-white text-castel-ink hover:bg-castel-paper-warm",
};

type Props = {
  href: string;
  variant?: Variant;
  external?: boolean;
  children: ReactNode;
  className?: string;
};

export function Button({ href, variant = "ink", external, children, className = "" }: Props) {
  const cls = `inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 font-display text-base font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current ${variants[variant]} ${className}`;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
