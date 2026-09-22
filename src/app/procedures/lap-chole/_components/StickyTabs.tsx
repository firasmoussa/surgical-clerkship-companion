"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { label: "Overview",      href: "/procedures/lap-chole" },
  { label: "Anatomy",       href: "/procedures/lap-chole/anatomy" },
  { label: "Steps",         href: "/procedures/lap-chole/steps" },
  { label: "Complications", href: "/procedures/lap-chole/complications" },
  { label: "OR Questions",          href: "/procedures/lap-chole/pimp" },
  { label: "Quiz",          href: "/procedures/lap-chole/quiz" },
];

export default function StickyTabs() {
  const pathname = usePathname();

  return (
    <div className="sticky top-0 z-10 bg-parchment border-b border-border-warm">
      <div className="-mb-px flex gap-1 overflow-x-auto">
        {tabs.map((t) => {
          const active = pathname === t.href;
          return (
            <Link
              key={t.href}
              href={t.href}
              aria-current={active ? "page" : undefined}
              className={`whitespace-nowrap border-b-2 px-4 py-3 text-[14px] transition-colors ${
                active
                  ? "border-ochre text-ochre font-medium"
                  : "border-transparent text-secondary hover:text-ink"
              }`}
            >
              {t.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
