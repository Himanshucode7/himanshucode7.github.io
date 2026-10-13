"use client";

import { useLayoutEffect, type MouseEvent } from "react";
import { THEME_STORAGE_KEY } from "@/lib/document-script";
import { cn } from "@/lib/cn";
import { MoonIcon, SunIcon } from "./icons";

type Theme = "light" | "dark";

function resolvedTheme(): Theme {
  const explicit = document.documentElement.getAttribute("data-theme");
  if (explicit === "light" || explicit === "dark") return explicit;
  return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function readStoredTheme(): Theme | null {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage unavailable (private mode): the choice lasts for this page view.
  }
}

/**
 * Icons are swapped purely by CSS (`dark:` variant), so the server markup is
 * identical for every visitor and there is nothing to mismatch on hydration.
 */
export function ThemeToggle({ label, className }: { label: string; className?: string }) {
  // Dev-only: Strict Mode's remount strips attributes the inline script set on <html>.
  useLayoutEffect(() => {
    const stored = readStoredTheme();
    if (stored) document.documentElement.setAttribute("data-theme", stored);
  }, []);

  function toggle(event: MouseEvent<HTMLButtonElement>) {
    const next: Theme = resolvedTheme() === "dark" ? "light" : "dark";
    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!document.startViewTransition || reduceMotion) {
      applyTheme(next);
      return;
    }

    // Circular reveal from the button (or the button centre for keyboard activation).
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX || rect.left + rect.width / 2;
    const y = event.clientY || rect.top + rect.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const root = document.documentElement;

    root.setAttribute("data-theme-switching", "");
    const transition = document.startViewTransition(() => applyTheme(next));
    transition.ready
      .then(() => {
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          {
            duration: 600,
            easing: "cubic-bezier(0.76, 0, 0.24, 1)",
            pseudoElement: "::view-transition-new(root)",
          },
        );
      })
      .catch(() => {});
    transition.finished.finally(() => root.removeAttribute("data-theme-switching"));
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-full text-muted",
        "transition-colors duration-(--duration-micro) hover:bg-accent-soft hover:text-foreground",
        className,
      )}
    >
      <MoonIcon className="dark:hidden" />
      <SunIcon className="hidden dark:block" />
    </button>
  );
}
