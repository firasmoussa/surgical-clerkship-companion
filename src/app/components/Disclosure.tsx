"use client";

import { useState } from "react";

type DisclosureProps = {
  summary: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

export default function Disclosure({ summary, children, defaultOpen = false }: DisclosureProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="mt-2">
      <button
        type="button"
        className="text-xs text-secondary hover:text-ink"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {open ? "▼ " : "▶ "} {summary}
      </button>

      {open && <div className="mt-2 text-sm text-secondary">{children}</div>}
    </div>
  );
}