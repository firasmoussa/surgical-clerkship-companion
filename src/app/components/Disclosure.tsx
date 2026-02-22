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
        className="text-xs text-slate-600 hover:text-slate-900"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {open ? "▼ " : "▶ "} {summary}
      </button>

      {open && <div className="mt-2 text-sm text-slate-600">{children}</div>}
    </div>
  );
}