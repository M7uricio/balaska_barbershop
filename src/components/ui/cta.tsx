import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "gold" | "outline" | "ghost";
type Size = "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 font-semibold tracking-wide " +
  "rounded-full transition-[background-color,color,border-color,transform] " +
  "duration-[180ms] ease-[cubic-bezier(0.4,0,0.2,1)] " +
  "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  gold:
    "bg-gold text-ink hover:bg-gold-bright shadow-[0_0_0_0_rgba(212,162,76,0.45)] " +
    "hover:shadow-[0_8px_32px_-8px_rgba(212,162,76,0.55)]",
  outline:
    "border border-line-strong text-bone hover:border-gold hover:text-gold bg-transparent",
  ghost: "text-ash hover:text-bone bg-transparent",
};

// Alvos de toque com no mínimo 44px de altura (ui-ux-pro-max, prioridade 2).
const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-14 px-8 text-base",
};

type CtaProps = {
  children: ReactNode;
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Links externos abrem em nova aba com rel de segurança. */
  external?: boolean;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

export function Cta({
  children,
  href,
  variant = "gold",
  size = "md",
  className = "",
  external,
  ...rest
}: CtaProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  const isExternal = external ?? /^https?:\/\//.test(href);

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}
