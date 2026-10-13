import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "sm";

const base =
  "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap select-none " +
  "transition-[background-color,border-color,color,box-shadow,transform] duration-(--duration-micro) ease-out-expo " +
  "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-foreground text-background hover:bg-foreground/85",
  secondary:
    "border border-border bg-surface/60 text-foreground backdrop-blur-sm hover:border-border-strong hover:bg-surface",
  ghost: "text-muted hover:text-foreground hover:bg-accent-soft",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-small",
  sm: "h-9 px-4 text-small",
};

export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: { variant?: Variant; size?: Size; className?: string } = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

type StyleProps = { variant?: Variant; size?: Size };

export function Button({ variant, size, className, type = "button", ...props }: ComponentProps<"button"> & StyleProps) {
  return <button type={type} className={buttonStyles({ variant, size, className })} {...props} />;
}

export function ButtonLink({ variant, size, className, ...props }: ComponentProps<typeof Link> & StyleProps) {
  return <Link className={buttonStyles({ variant, size, className })} {...props} />;
}

/** Icon that nudges along its direction when the parent button is hovered. */
export function ButtonArrow({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex transition-transform duration-(--duration-ui) ease-out-expo group-hover/button:translate-x-0.5",
        className,
      )}
    >
      {children}
    </span>
  );
}
