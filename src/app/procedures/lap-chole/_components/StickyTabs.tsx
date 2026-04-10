"use client";

import { usePathname } from "next/navigation";

const tabs = [
  { label: "Overview",      href: "/procedures/lap-chole" },
  { label: "Anatomy",       href: "/procedures/lap-chole/anatomy" },
  { label: "Steps",         href: "/procedures/lap-chole/steps" },
  { label: "Complications", href: "/procedures/lap-chole/complications" },
  { label: "Pimp",          href: "/procedures/lap-chole/pimp" },
  { label: "Quiz",          href: "/procedures/lap-chole/quiz" },
];

export default function StickyTabs() {
  const pathname = usePathname();

  return (
    <div className="sticky top-0 z-10 bg-parchment border-b border-border-warm">
      <div className="-mb-px flex gap-0 overflow-x-auto">
        {tabs.map((t) => {
          const active = pathname === t.href;
          return (
            <a
              key={t.href}
              href={t.href}
              className={`whitespace-nowrap border-b-2 px-4 py-3 text-[13px] transition-colors ${
                active
                  ? "border-ochre text-ochre font-medium"
                  : "border-transparent text-muted hover:text-secondary"
              }`}
            >
              {t.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}
