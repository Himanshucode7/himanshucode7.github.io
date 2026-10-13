import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

/**
 * Inline link: accent text with an underline that is always present (so the link
 * is never identified by colour alone) and thickens on hover.
 */
export function TextLink({ className, ...props }: ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn(
        "text-accent-text underline decoration-accent-text/40 decoration-1 underline-offset-4",
        "transition-[text-decoration-color] duration-(--duration-micro) hover:decoration-accent-text",
        className,
      )}
      {...props}
    />
  );
}
