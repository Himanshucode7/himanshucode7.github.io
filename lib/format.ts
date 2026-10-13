import type { YearMonth } from "@/content/types";

const monthFormatter = new Intl.DateTimeFormat("en-GB", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export function formatYearMonth(value: YearMonth): string {
  const [year, month] = value.split("-").map(Number);
  return monthFormatter.format(new Date(Date.UTC(year, month - 1, 1)));
}

export function formatRange(start: YearMonth, end: YearMonth | "present"): string {
  return `${formatYearMonth(start)} – ${end === "present" ? "Present" : formatYearMonth(end)}`;
}
