"use client";

import { useMemo, useSyncExternalStore } from "react";

/** Notifies on every minute boundary. */
function subscribeToMinutes(onChange: () => void) {
  let timer: ReturnType<typeof setTimeout>;
  const schedule = () => {
    timer = setTimeout(() => {
      onChange();
      schedule();
    }, 60_000 - (Date.now() % 60_000));
  };
  schedule();
  return () => clearTimeout(timer);
}

/**
 * Live local time for a fixed time zone. The server (and the first client render)
 * shows a placeholder of identical width, so neither hydration nor layout shifts.
 */
export function LocalTime({ timeZone, suffix, className }: { timeZone: string; suffix: string; className?: string }) {
  const formatter = useMemo(
    () => new Intl.DateTimeFormat("en-GB", { timeZone, hour: "2-digit", minute: "2-digit", hourCycle: "h23" }),
    [timeZone],
  );

  const time = useSyncExternalStore(
    subscribeToMinutes,
    () => formatter.format(Date.now()),
    () => null,
  );

  return (
    <span className={className}>
      <time className="tabular-nums" suppressHydrationWarning>
        {time ?? "--:--"}
      </time>{" "}
      {suffix}
    </span>
  );
}
