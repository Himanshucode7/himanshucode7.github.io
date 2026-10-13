"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { NavItem } from "@/content/types";
import { buttonStyles } from "@/components/ui/button";
import { MenuIcon } from "@/components/ui/icons";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/cn";

type Labels = { primaryNav: string; menu: string; themeToggle: string; contact: string };

type Indicator = { x: number; width: number };

const MENU_ID = "site-menu";

export function SiteHeader({ name, items, labels }: { name: string; items: readonly NavItem[]; labels: Labels }) {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<{ id: string; indicator: Indicator } | null>(null);
  const links = useRef(new Map<string, HTMLAnchorElement>());

  // Hide on scroll down, show on scroll up. Never hides near the top or for reduced motion.
  useEffect(() => {
    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lastY = scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = scrollY;
      setScrolled(y > 8);
      if (y < 120 || reduceMotion) {
        setHidden(false);
      } else if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY);
      }
      lastY = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    addEventListener("scroll", onScroll, { passive: true });
    return () => {
      removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Active section, home page only. The indicator geometry is measured in the
  // observer callback, never during render.
  useEffect(() => {
    if (!onHome) return;
    const visible = new Set<string>();

    const measure = (id: string): Indicator | null => {
      const link = links.current.get(id);
      return link ? { x: link.offsetLeft, width: link.offsetWidth } : null;
    };
    const sync = () => {
      const id = items.find((item) => visible.has(item.id))?.id;
      const indicator = id ? measure(id) : null;
      setActive(id && indicator ? { id, indicator } : null);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        sync();
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const item of items) {
      const section = document.getElementById(item.id);
      if (section) observer.observe(section);
    }
    addEventListener("resize", sync);
    return () => {
      observer.disconnect();
      removeEventListener("resize", sync);
    };
  }, [items, onHome]);

  const activeId = onHome ? active?.id : undefined;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-(--header-height) border-b transition-[transform,background-color,border-color] duration-(--duration-ui) ease-out-expo",
        "focus-within:translate-y-0",
        scrolled ? "border-border bg-background/75 backdrop-blur-xl backdrop-saturate-150" : "border-transparent",
        hidden && "-translate-y-full",
      )}
    >
      <div className="container-page flex h-full items-center justify-between gap-6">
        <Link href="/" className="-mx-2 rounded-full px-2 py-1 text-small font-semibold tracking-tight whitespace-nowrap">
          {name}
        </Link>

        <nav aria-label={labels.primaryNav} className="hidden md:block">
          <ul className="relative flex items-center gap-1">
            {active && onHome && (
              <li
                aria-hidden="true"
                className="absolute top-0 left-0 h-full rounded-full bg-accent-soft transition-[transform,width] duration-(--duration-ui) ease-out-expo"
                style={{ width: active.indicator.width, transform: `translateX(${active.indicator.x}px)` }}
              />
            )}
            {items.map((item) => (
              // No `relative` here: offsetLeft must be measured against the <ul>.
              <li key={item.id}>
                <Link
                  href={item.href}
                  ref={(node) => {
                    if (node) links.current.set(item.id, node);
                    else links.current.delete(item.id);
                  }}
                  aria-current={activeId === item.id ? "true" : undefined}
                  className={cn(
                    "relative inline-flex h-9 items-center rounded-full px-4 text-small transition-colors duration-(--duration-micro)",
                    activeId === item.id ? "text-foreground" : "text-muted hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle label={labels.themeToggle} />
          {/* Visibility lives on a wrapper: `hidden` would lose to the button's own inline-flex. */}
          <span className="ml-2 hidden md:inline-flex">
            <Link href="/#contact" className={buttonStyles({ size: "sm" })}>
              {labels.contact}
            </Link>
          </span>
          <button
            type="button"
            popoverTarget={MENU_ID}
            aria-label={labels.menu}
            className="inline-flex size-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-accent-soft hover:text-foreground md:hidden"
          >
            <MenuIcon />
          </button>
        </div>
      </div>

      <div
        id={MENU_ID}
        popover="auto"
        className="menu-popover rounded-card border border-border bg-surface p-2 text-foreground shadow-soft md:hidden"
      >
        <nav aria-label={labels.menu}>
          <ul className="grid">
            {items.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  onClick={() => document.getElementById(MENU_ID)?.hidePopover()}
                  className="flex h-12 items-center rounded-xl px-4 text-body transition-colors hover:bg-accent-soft"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
