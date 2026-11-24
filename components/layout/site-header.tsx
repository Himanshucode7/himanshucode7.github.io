"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { NavItem } from "@/content/types";
import { MenuIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

type Labels = { primaryNav: string; menu: string; close: string; home: string };

const MENU_ID = "site-menu";
const HOME_ID = "top";
const WIDE = "(min-width: 1024px)";

/**
 * Fixed header in the spirit of an editorial masthead: white text blended with
 * `difference`, so it inverts automatically over black and light sections.
 * Wide screens get inline links; narrower ones a full-screen modal <dialog>
 * (focus is trapped and restored natively, Esc closes it).
 */
export function SiteHeader({ name, items, labels }: { name: string; items: readonly NavItem[]; labels: Labels }) {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [activeId, setActiveId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Active section, home page only. The sticky hero stays "visible" under the
  // About panel, so the last matching section in page order wins.
  useEffect(() => {
    if (!onHome) return;
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        const current = items.filter((item) => visible.has(item.id)).at(-1)?.id ?? null;
        setActiveId(current);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const item of items) {
      const section = document.getElementById(item.id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, [items, onHome]);

  // Keep state in sync however the dialog closes (link, button, Esc), and close
  // it if the window grows past the breakpoint where the inline nav appears.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const wide = matchMedia(WIDE);
    const onClose = () => setMenuOpen(false);
    const onWide = () => {
      if (wide.matches && dialog.open) dialog.close();
    };
    dialog.addEventListener("close", onClose);
    wide.addEventListener("change", onWide);
    return () => {
      dialog.removeEventListener("close", onClose);
      wide.removeEventListener("change", onWide);
    };
  }, []);

  function openMenu() {
    dialogRef.current?.showModal();
    setMenuOpen(true);
  }

  function closeMenu() {
    dialogRef.current?.close();
  }

  const sectionLinks = items.filter((item) => item.id !== HOME_ID);

  return (
    <header>
      <div className="header-bar pointer-events-none fixed inset-x-0 top-0 z-50">
        <div className="flex h-(--header-height) items-center justify-between gap-6 px-(--edge)">
          <Link
            href={`/#${HOME_ID}`}
            className="pointer-events-auto -mx-1 px-1 text-[0.9375rem] leading-none font-medium tracking-[-0.01em] whitespace-nowrap uppercase"
          >
            {name}
            <span className="sr-only">, {labels.home}</span>
          </Link>

          <nav aria-label={labels.primaryNav} className="pointer-events-auto hidden lg:block">
            <ul className="flex items-center gap-6 xl:gap-8">
              {sectionLinks.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    aria-current={onHome && activeId === item.id ? "true" : undefined}
                    className="nav-link group inline-flex items-center py-2 text-[0.8125rem] leading-none font-medium tracking-[0.02em] uppercase"
                  >
                    <span className="nav-bracket opacity-0 transition-opacity duration-(--duration-ui)" aria-hidden="true">
                      [&nbsp;
                    </span>
                    <span className="decoration-1 underline-offset-4 group-hover:underline">{item.label}</span>
                    <span className="nav-bracket opacity-0 transition-opacity duration-(--duration-ui)" aria-hidden="true">
                      &nbsp;]
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            onClick={openMenu}
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            aria-controls={MENU_ID}
            className="pointer-events-auto -mr-2 inline-flex h-11 items-center gap-2.5 px-2 text-[0.8125rem] leading-none font-medium tracking-[0.02em] uppercase lg:hidden"
          >
            <MenuIcon size={22} strokeWidth={1.75} />
            {labels.menu}
          </button>
        </div>
      </div>

      <dialog id={MENU_ID} ref={dialogRef} aria-label={labels.menu} className="menu-dialog tone-dark">
        <div className="flex min-h-full flex-col px-(--edge)">
          <div className="flex h-(--header-height) shrink-0 items-center justify-between">
            <span className="text-[0.9375rem] leading-none font-medium uppercase">{name}</span>
            <button
              type="button"
              onClick={closeMenu}
              className="-mr-2 inline-flex h-11 items-center px-2 text-[0.8125rem] leading-none font-medium tracking-[0.02em] uppercase"
            >
              [&nbsp;{labels.close}&nbsp;]
            </button>
          </div>
          <nav aria-label={labels.primaryNav} className="flex flex-1 flex-col justify-center py-10">
            <ul className="grid gap-1">
              {items.map((item, index) => (
                <li key={item.id} className="menu-item" style={{ "--i": index } as CSSProperties}>
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    aria-current={onHome && activeId === item.id ? "true" : undefined}
                    className={cn(
                      "group flex items-baseline gap-4 py-1.5 text-[clamp(2rem,7.5vw,3rem)] leading-[1.05] font-medium tracking-[-0.04em]",
                      "transition-colors duration-(--duration-micro) hover:text-accent-text aria-[current=true]:text-accent-text",
                    )}
                  >
                    <span className="label w-8 shrink-0 tracking-normal" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </dialog>
    </header>
  );
}
