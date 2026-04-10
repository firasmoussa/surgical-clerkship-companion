"use client";

import { usePathname } from "next/navigation";

const tabs = [
  { label: "Overview", href: "/procedures/lap-appy" },
  { label: "Anatomy", href: "/procedures/lap-appy/anatomy" },
  { label: "Steps", href: "/procedures/lap-appy/steps" },
  { label: "Complications", href: "/procedures/lap-appy/complications" },
  { label: "Pimp", href: "/procedures/lap-appy/pimp" },
  { label: "Quiz", href: "/procedures/lap-appy/quiz" },
];

export default function StickyTabs() {
  const pathname = usePathname();

  return (
    <div className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b mt-6">
      <div className="-mb-px flex gap-6 overflow-x-auto">
        {tabs.map((t) => {
          const active = pathname === t.href;
          return (
            <a
              key={t.href}
              href={t.href}
              className={[
                "whitespace-nowrap border-b-2 py-3 text-sm",
                active
                  ? "border-slate-900 text-slate-900 font-medium"
                  : "border-transparent text-slate-500 hover:text-slate-900",
              ].join(" ")}
            >
              {t.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}
