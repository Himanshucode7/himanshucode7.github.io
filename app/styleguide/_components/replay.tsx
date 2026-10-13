"use client";

import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

/** Remounts its children so CSS entrance animations play again. Styleguide only. */
export function Replay({ children, label = "Replay" }: { children: ReactNode; label?: string }) {
  const [run, setRun] = useState(0);
  return (
    <div className="grid gap-6">
      <div key={run}>{children}</div>
      <div>
        <Button variant="secondary" size="sm" onClick={() => setRun((value) => value + 1)}>
          {label}
        </Button>
      </div>
    </div>
  );
}
