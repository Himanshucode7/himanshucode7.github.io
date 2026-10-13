"use client";

import { useEffect, useRef, useState } from "react";
import { buttonStyles } from "./button";
import { CheckIcon, CopyIcon } from "./icons";
import { cn } from "@/lib/cn";

type Status = "idle" | "copied" | "error";

type Labels = { copy: string; copied: string; failed: string };

export function CopyEmailButton({ email, labels, className }: { email: string; labels: Labels; className?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const resetTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  async function copy() {
    clearTimeout(resetTimer.current);
    let next: Status;
    try {
      await navigator.clipboard.writeText(email);
      next = "copied";
    } catch {
      // Clipboard API missing (insecure context) or permission denied.
      next = "error";
    }
    setStatus(next);
    resetTimer.current = setTimeout(() => setStatus("idle"), next === "error" ? 6000 : 2200);
  }

  const copied = status === "copied";

  return (
    <div className={cn("inline-flex flex-col items-start gap-2", className)}>
      <button type="button" onClick={copy} className={buttonStyles({ variant: "secondary" })}>
        <span className="relative inline-flex size-4.5" aria-hidden="true">
          <CopyIcon
            className={cn(
              "absolute inset-0 transition-[opacity,transform] duration-(--duration-ui) ease-out-expo",
              copied ? "scale-50 opacity-0" : "scale-100 opacity-100",
            )}
          />
          <CheckIcon
            className={cn(
              "absolute inset-0 text-accent-text transition-[opacity,transform] duration-(--duration-ui) ease-out-expo",
              copied ? "scale-100 opacity-100" : "scale-50 opacity-0",
            )}
          />
        </span>
        <span>{copied ? labels.copied : labels.copy}</span>
      </button>
      <p role="status" className={cn("text-small", status === "error" ? "text-foreground" : "sr-only")}>
        {status === "copied" && `${labels.copied}: ${email}`}
        {status === "error" && labels.failed}
      </p>
    </div>
  );
}
