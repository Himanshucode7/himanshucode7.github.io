"use client";

import { useId, useState } from "react";
import { PlusIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

type Props = {
  role: string;
  company: string;
  location: string;
  range: string;
  summary: string;
  highlights: readonly string[];
  labels: { show: string; hide: string };
  defaultOpen?: boolean;
};

/**
 * Disclosure row. The panel animates grid-template-rows 0fr → 1fr (a one-off,
 * click-driven layout change, never during scroll) and is `inert` while closed
 * so collapsed links and text are skipped by keyboard and screen readers.
 */
export function ExperienceRow({ role, company, location, range, summary, highlights, labels, defaultOpen = false }: Props) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();
  const expandable = highlights.length > 0;

  return (
    <div className="grid gap-x-6 gap-y-3 py-8 md:grid-cols-9 md:py-10">
      <div className="md:col-span-6">
        <h3 className="text-h3 font-semibold">{role}</h3>
        <p className="mt-1 text-muted">
          {company} <span aria-hidden="true">·</span> {location}
        </p>
      </div>
      <p className="label md:col-span-3 md:pt-2 md:text-right">{range}</p>
      <p className="max-w-[60ch] md:col-span-6">{summary}</p>

      {expandable && (
        <div className="md:col-span-9">
          <button
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((value) => !value)}
            className="-mx-3 mt-1 inline-flex h-9 items-center gap-2 rounded-full px-3 text-small text-muted transition-colors duration-(--duration-micro) hover:bg-accent-soft hover:text-foreground"
          >
            <PlusIcon
              size={16}
              className={cn("transition-transform duration-(--duration-ui) ease-out-expo", open && "rotate-45")}
            />
            {open ? labels.hide : labels.show}
            <span className="sr-only">: {role}, {company}</span>
          </button>

          <div
            id={panelId}
            inert={!open}
            className="grid transition-[grid-template-rows,opacity] duration-500 ease-out-expo motion-reduce:transition-none"
            style={{ gridTemplateRows: open ? "1fr" : "0fr", opacity: open ? 1 : 0 }}
          >
            <div className="overflow-hidden">
              <ul className="grid max-w-[64ch] gap-3 pt-5">
                {highlights.map((item) => (
                  <li key={item} className="relative pl-5 text-muted">
                    <span className="absolute top-[0.7em] left-0 h-px w-2.5 bg-accent" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
