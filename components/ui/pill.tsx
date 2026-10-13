import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Pill({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-8 items-center gap-2 rounded-full border border-border bg-surface/70 px-3 font-mono text-[0.75rem] text-muted backdrop-blur-sm",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** A small live-status dot. Meaning is always carried by adjacent text, never colour. */
export function StatusDot({ className }: { className?: string }) {
  return (
    <span className={cn("relative inline-flex size-2", className)} aria-hidden="true">
      <span className="pulse-ring absolute inset-0 rounded-full bg-accent" />
      <span className="relative size-2 rounded-full bg-accent" />
    </span>
  );
}
