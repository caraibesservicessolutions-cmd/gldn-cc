import Link from "next/link";
import type { ComponentType, ReactNode } from "react";
import type { LucideProps } from "lucide-react";
import { clsx } from "clsx";

type CTAButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  icon?: ComponentType<LucideProps>;
  external?: boolean;
  className?: string;
};

export function CTAButton({
  href,
  children,
  variant = "primary",
  icon: Icon,
  external,
  className
}: CTAButtonProps) {
  const classes = clsx(
    "inline-flex min-h-12 max-w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-center text-sm font-bold uppercase tracking-wide transition duration-200 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-ink active:scale-[0.98]",
    variant === "primary" &&
      "bg-gold text-ink shadow-glow hover:bg-champagne hover:shadow-[0_0_30px_rgba(212,175,55,0.28)]",
    variant === "secondary" &&
      "premium-border bg-black/20 text-champagne hover:border-gold hover:bg-gold hover:text-ink",
    variant === "ghost" &&
      "text-white hover:bg-white/10",
    className
  );

  const content = (
    <>
      {Icon ? <Icon aria-hidden className="h-4 w-4 shrink-0" /> : null}
      <span>{children}</span>
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noreferrer"
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
