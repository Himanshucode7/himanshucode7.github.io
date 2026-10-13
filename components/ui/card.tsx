import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export function Card({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("rounded-card border border-border bg-surface p-6 md:p-8", className)} {...props} />;
}

export function CardLabel({ className, ...props }: ComponentProps<"h3">) {
  return <h3 className={cn("label", className)} {...props} />;
}
