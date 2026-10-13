import { useId, type ComponentProps } from "react";
import { cn } from "@/lib/cn";

type FieldProps = ComponentProps<"input"> & {
  label: string;
  hint?: string;
  error?: string;
};

/** Labelled text input with hint and error wiring. Border meets 3:1 non-text contrast. */
export function Field({ label, hint, error, className, id, ...props }: FieldProps) {
  const generated = useId();
  const inputId = id ?? generated;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;

  return (
    <div className={cn("grid gap-2", className)}>
      <label htmlFor={inputId} className="text-small font-medium">
        {label}
      </label>
      <input
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={[hintId, errorId].filter(Boolean).join(" ") || undefined}
        className={cn(
          "h-11 rounded-xl border border-border-strong bg-surface px-4 text-body text-foreground placeholder:text-muted",
          "transition-[border-color,box-shadow] duration-(--duration-micro)",
          "focus-visible:border-accent focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent-soft",
          "aria-invalid:border-accent-text",
        )}
        {...props}
      />
      {hint && (
        <p id={hintId} className="text-small text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-small text-accent-text">
          <span className="font-medium">Error: </span>
          {error}
        </p>
      )}
    </div>
  );
}
