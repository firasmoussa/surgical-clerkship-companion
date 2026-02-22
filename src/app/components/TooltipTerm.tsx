"use client";

import { useState } from "react";

type TooltipTermProps = {
  term: string;
  definition: string;
};

export default function TooltipTerm({ term, definition }: TooltipTermProps) {
  const [open, setOpen] = useState(false);

  return (
    <span className="relative inline-block">
      <button
        type="button"
        className="underline decoration-dotted underline-offset-4 text-slate-900 hover:text-slate-700"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen((v) => !v)} // helpful on mobile
        aria-label={`Definition of ${term}`}
      >
        {term}
      </button>

      {open && (
        <span
          role="tooltip"
          className="absolute left-0 top-full z-20 mt-2 w-72 rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-700 shadow-lg"
        >
          <span className="font-medium text-slate-900">{term}:</span> {definition}
        </span>
      )}
    </span>
  );
}